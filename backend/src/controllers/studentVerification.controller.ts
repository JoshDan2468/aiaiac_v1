import type { NextFunction, Request, RequestHandler, Response } from "express";
import { createPublicError } from "../middleware/error.middleware";
import {
  DelegatePackageUnavailableError,
  DuplicateDelegateRegistrationError,
} from "../repositories/delegate.repository";
import type { StudentVerificationService } from "../services/studentVerification.service";
import {
  StudentEvidenceAuthorizationError,
  StudentEvidenceNotAvailableError,
  type StudentEvidenceService,
} from "../services/studentEvidence.service";
import {
  StudentEvidenceReplacementNotFoundError,
  StudentEvidenceSlotOccupiedError,
  StudentEvidenceUploadIneligibleError,
  StudentEvidenceVersionLimitError,
} from "../repositories/studentEvidence.repository";
import {
  InvalidStudentEvidenceFileError,
  StudentEvidenceFileTooLargeError,
  studentContinuationTokenSchema,
  studentEvidenceReferenceParamsSchema,
  studentEvidenceReplacementParamsSchema,
  studentEvidenceTypeSchema,
} from "../validators/studentEvidence.validator";
import {
  parseStudentVerificationListFilters,
  studentApplicationSchema,
} from "../validators/studentVerification.validator";

export function createStudentVerificationController(
  service: StudentVerificationService,
  evidenceService?: StudentEvidenceService,
) {
  const createApplication: RequestHandler = async (request, response, next) => {
    try {
      const parsed = studentApplicationSchema.safeParse(request.body);
      if (!parsed.success) {
        next(createPublicError(400, "Invalid Student Delegate application"));
        return;
      }
      const application = await service.createApplication(parsed.data);
      response.status(201).json({
        success: true,
        message: "Student Delegate application saved",
        data: application,
      });
    } catch (error) {
      if (error instanceof DuplicateDelegateRegistrationError) {
        next(
          createPublicError(
            409,
            "A registration already exists for this email and package.",
          ),
        );
        return;
      }
      if (error instanceof DelegatePackageUnavailableError) {
        next(
          createPublicError(
            400,
            "The Student Delegate package is unavailable.",
          ),
        );
        return;
      }
      next(error);
    }
  };

  const list: RequestHandler = async (request, response, next) => {
    try {
      const filters = parseStudentVerificationListFilters(request.query);
      if (!filters) {
        next(createPublicError(400, "Invalid Student verification filters"));
        return;
      }
      const verifications = await service.list(filters);
      response.status(200).json({ success: true, data: { verifications } });
    } catch (error) {
      next(error);
    }
  };

  const authorizeEvidenceAccess: RequestHandler = async (
    request,
    response,
    next,
  ) => {
    try {
      if (!evidenceService)
        throw new Error("Student evidence service is unavailable");
      const params = studentEvidenceReferenceParamsSchema.safeParse({
        reference: request.params["reference"],
      });
      const token = studentContinuationTokenSchema.safeParse(
        request.header("x-aiaiac-continuation-token"),
      );
      if (!params.success || !token.success)
        throw new StudentEvidenceAuthorizationError();
      response.locals.studentEvidenceAuthorization =
        await evidenceService.authorizeContinuation(
          params.data.reference,
          token.data,
        );
      next();
    } catch (error) {
      if (error instanceof StudentEvidenceAuthorizationError) {
        next(
          createPublicError(
            401,
            "Student evidence authorization is invalid or expired",
          ),
        );
        return;
      }
      next(error);
    }
  };

  const authorizeEvidenceUpload: RequestHandler = async (
    request,
    response,
    next,
  ) => {
    const evidenceType = studentEvidenceTypeSchema.safeParse(
      request.header("x-aiaiac-evidence-type"),
    );
    if (!evidenceType.success) {
      next(createPublicError(400, "Invalid Student evidence type"));
      return;
    }
    response.locals.studentEvidenceType = evidenceType.data;
    void authorizeEvidenceAccess(request, response, next);
  };

  const listEvidence: RequestHandler = async (_request, response, next) => {
    try {
      if (!evidenceService || !response.locals.studentEvidenceAuthorization) {
        throw new StudentEvidenceAuthorizationError();
      }
      const evidence = await evidenceService.list(
        response.locals.studentEvidenceAuthorization,
      );
      response.status(200).json({ success: true, data: { evidence } });
    } catch (error) {
      next(error);
    }
  };

  const handleEvidenceUpload = async (
    request: Request,
    response: Response,
    next: NextFunction,
    replacementEvidenceId?: string,
  ) => {
    try {
      if (
        !evidenceService ||
        !response.locals.studentEvidenceAuthorization ||
        !response.locals.studentEvidenceType ||
        !request.file
      ) {
        next(createPublicError(400, "A Student evidence file is required"));
        return;
      }
      const result = await evidenceService.upload(
        response.locals.studentEvidenceAuthorization,
        response.locals.studentEvidenceType,
        request.file,
        replacementEvidenceId,
      );
      response.status(201).json({
        success: true,
        message: replacementEvidenceId
          ? "Student evidence replacement received"
          : "Student evidence received",
        data: result,
      });
    } catch (error) {
      if (error instanceof StudentEvidenceFileTooLargeError) {
        next(createPublicError(413, "Evidence file exceeds the 5 MB limit"));
        return;
      }
      if (error instanceof InvalidStudentEvidenceFileError) {
        next(
          createPublicError(400, "The uploaded evidence file is not accepted"),
        );
        return;
      }
      if (error instanceof StudentEvidenceSlotOccupiedError) {
        next(
          createPublicError(
            409,
            "Replace the existing evidence for this category",
          ),
        );
        return;
      }
      if (error instanceof StudentEvidenceReplacementNotFoundError) {
        next(createPublicError(404, "Evidence replacement target not found"));
        return;
      }
      if (error instanceof StudentEvidenceVersionLimitError) {
        next(createPublicError(409, "Evidence replacement limit reached"));
        return;
      }
      if (error instanceof StudentEvidenceUploadIneligibleError) {
        next(
          createPublicError(409, "This verification cannot accept evidence"),
        );
        return;
      }
      next(error);
    }
  };

  const uploadEvidence: RequestHandler = (request, response, next) =>
    void handleEvidenceUpload(request, response, next);

  const replaceEvidence: RequestHandler = (request, response, next) => {
    const params = studentEvidenceReplacementParamsSchema.safeParse(
      request.params,
    );
    if (!params.success) {
      next(createPublicError(400, "Invalid evidence replacement request"));
      return;
    }
    void handleEvidenceUpload(request, response, next, params.data.evidenceId);
  };

  const downloadEvidence: RequestHandler = async (request, response, next) => {
    try {
      if (!evidenceService)
        throw new Error("Student evidence service is unavailable");
      const params = studentEvidenceReplacementParamsSchema.safeParse(
        request.params,
      );
      const admin = response.locals.admin;
      if (!params.success || !admin) {
        next(createPublicError(400, "Invalid evidence download request"));
        return;
      }
      const download = await evidenceService.downloadForAdmin(
        params.data.reference,
        params.data.evidenceId,
        admin.id,
      );
      const asciiFilename = download.displayFilename.replace(
        /[^\x20-\x7e]|["\\]/g,
        "_",
      );
      const encodedFilename = encodeURIComponent(
        download.displayFilename,
      ).replace(
        /['()*]/g,
        (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
      );
      response.set({
        "Content-Type": download.detectedMimeType,
        "Content-Length": String(download.bytes.length),
        "Content-Disposition": `attachment; filename="${asciiFilename}"; filename*=UTF-8''${encodedFilename}`,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-store, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      });
      response.status(200).send(download.bytes);
    } catch (error) {
      if (error instanceof StudentEvidenceNotAvailableError) {
        next(createPublicError(404, "Evidence document is not available"));
        return;
      }
      next(error);
    }
  };

  return {
    createApplication,
    list,
    authorizeEvidenceAccess,
    authorizeEvidenceUpload,
    listEvidence,
    uploadEvidence,
    replaceEvidence,
    downloadEvidence,
  };
}
