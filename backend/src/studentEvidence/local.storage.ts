import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import type { StudentEvidenceStorage } from "./storage";

const storageKeyPattern = /^[0-9a-f]{64}\.(pdf|jpg|png)$/;

export class LocalStudentEvidenceStorage implements StudentEvidenceStorage {
  private readonly root: string;

  constructor(rootDirectory: string) {
    this.root = path.resolve(rootDirectory);
  }

  private resolveKey(storageKey: string): string {
    if (!storageKeyPattern.test(storageKey))
      throw new Error("Invalid evidence storage key");
    const target = path.resolve(this.root, storageKey);
    if (path.dirname(target) !== this.root)
      throw new Error("Invalid evidence storage path");
    return target;
  }

  private async ensureRoot(): Promise<void> {
    await mkdir(this.root, { recursive: true, mode: 0o700 });
  }

  async store(storageKey: string, bytes: Buffer): Promise<void> {
    await this.ensureRoot();
    await writeFile(this.resolveKey(storageKey), bytes, {
      flag: "wx",
      mode: 0o600,
    });
  }

  async retrieve(storageKey: string): Promise<Buffer> {
    return readFile(this.resolveKey(storageKey));
  }

  async delete(storageKey: string): Promise<void> {
    await rm(this.resolveKey(storageKey), { force: true });
  }
}
