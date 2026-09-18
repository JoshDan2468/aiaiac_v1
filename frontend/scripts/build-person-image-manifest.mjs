import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicAssetsDir = path.join(projectRoot, "public", "assets", "aiaiac-2027");

const manifestOutputPath1 = path.join(projectRoot, "src", "generated", "personImageManifest.ts");
const manifestOutputPath2 = path.join(projectRoot, "src", "generated", "aiaiacPeopleImages.ts");

/**
 * Standard Normalizer with camelCase splitting, typo tolerance (egnr), and role suffix handling
 */
function normalizePersonName(name) {
  if (!name) return "";
  let str = name.replace(/\.(webp|jpg|jpeg|png|avif)$/i, "");
  str = str.replace(/[’'`]/g, "'");
  str = str.replace(/-\s*(conference director|director|chair|member).*/gi, " ");
  str = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  const titleRegex =
    /\b(dr|engr|engineer|egnr|prof|professor|mr|mrs|ms|fnse|fnipr|arc|surv|chief|elder|high chief)\b/gi;
  str = str.replace(titleRegex, " ");
  str = str.replace(/[()]/g, " ");
  str = str.replace(/[^a-zA-Z0-9]/g, " ");
  const tokens = str
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 0);
  return tokens.join("-");
}

/** Section folder configuration on disk */
const sectionsConfig = {
  "advisory-board": "advisory-board",
  "organising-committee": "organising-committee",
  "asset-integrity": "technical-committees/asset-integrity",
  "artificial-intelligence": "technical-committees/artificial-intelligence",
  "automation-cybersecurity": "technical-committees/automation-cybersecurity",
  "keynote-speakers": "ket-note-speakers",
  "technical-chairman": "technical-chairman",
};

/** Datasets */
const advisoryBoardMembers = [
  "Dr. Engr. Isaac Adekanye",
  "Engr. Olalekan Oyeleye",
  "Engr. Sooravan Tharmalingam",
  "Engr. Ester Christopher",
  "Omar Rugebani",
  "Engr. Nnanna Charles Ukaegbu",
  "Dr. Mrs. Tina Isichei",
  "Engr. Abel Onyemaechi Nwobodo",
  "Engr. Ayo Giwa",
  "Raj Mohandoss",
  "Kayode Adeleke",
  "Dr. Kola Fagbayi",
];

const organisingCommitteeMembers = [
  "Bunmi Daramola",
  "Omowunmi Oladele",
  "Brumilda Haslund",
  "Joseph Fatoye",
  "Nonye Nketa",
  "Ezeji Stephanie",
  "Victory Adabhie",
  "Wilbert Adri",
  "Emmanuel Samson",
  "Adedoyin Yusuf",
  "Maria Henshaw",
];

const assetIntegrityMembers = [
  "Engr. David Oni",
  "Engr. Ikenna Ikonta",
  "Engr. Olalekan Adeaga",
  "Engr. Olawale Onasoga",
  "Engr. Paul Aminadokiruaru",
  "Dr. (Engr.) Mavis Sika Okyere",
  "Engr. Eric Oguama",
  "Engr. Razaq Shuaib",
  "Engr. Collins Okaru",
  "Engr. (Dr.) Henry Osabohien",
  "Dr. Tamuonemi Efebeli",
  "Engr. Abduganiyu Teslim",
  "Engr. Ikedi Uche",
  "Engr. Albert Okechukwu Echibe",
  "Engr. Franklin Okafor",
  "Engr. Olusola Aina",
  "Engr. Jeremiah Amodu Peter",
  "Engr. Edgar Njeje",
  "Dr. Chukwu Emeke",
  "Engr. Oluwasegun Lamidi",
  "Allison Gabriel",
];

const artificialIntelligenceMembers = [
  "Engr. Olugbenga Abimbola Oredeko",
  "Engr. Opubo Edwin Atiegoba",
  "Dr. Engr. Onasoga Olukayode A",
  "Engr. Taiwo Lawal",
  "Oluwatomisin Asere",
  "Effiong Okwong",
];

const automationCybersecurityMembers = [
  "Prof. Joseph S. Ojo",
  "Dr. Umar Sa’ad",
  "Emmanuel Omoke",
  "Ahmed Barrak",
  "Dr. Ademola Agboola",
  "Engr. Desmond Inyamah",
  "Olabode Agboola",
  "Engr. Marshal Abraham",
  "Tolulope Longe",
  "Cynthia Kevin-Nwahiri",
  "Prof. Boniface Kayode Alese",
  "Mohammed Al Abbadi",
  "Belarmino Van Dunem",
  "Engr. Oladapo Ojo",
  "Engr. Emmanuel Eno",
  "Engr. Awe Afolabi Thomas",
  "Engr. Wasiu Abiola Salami",
];

const keynoteMembers = ["Dr. James Makinde"];

const technicalChairmanMembers = ["Dr. (Engr.) Gbenga Ayodele Owolabi"];

const membersBySection = {
  "advisory-board": advisoryBoardMembers,
  "organising-committee": organisingCommitteeMembers,
  "asset-integrity": assetIntegrityMembers,
  "artificial-intelligence": artificialIntelligenceMembers,
  "automation-cybersecurity": automationCybersecurityMembers,
  "keynote-speakers": keynoteMembers,
  "technical-chairman": technicalChairmanMembers,
};

/** Explicit aliases for short names physically present in folders */
const explicitAliases = {
  "asset-integrity": {
    "david-oni": "egnr-David.webp",
    "mavis-sika-okyere": "MavisSika.webp",
    "razaq-shuaib": "Razaq.webp",
    "collins-okaru": "collin.webp",
    "tamuonemi-efebeli": "Tamuonemi.webp",
    "ikedi-uche": "Ikedi.webp",
    "franklin-okafor": "Franklin.webp",
    "olusola-aina": "Olusola.webp",
    "jeremiah-amodu-peter": "Jeremiah.webp",
    "edgar-njeje": "Edgar.webp",
    "allison-gabriel": "Allison.webp",
  },
  "technical-chairman": {
    "gbenga-ayodele-owolabi": "Gbenga-Ayodele-Owolabi.webp",
  },
};

function buildManifest() {
  console.log("=== AIAIAC AFRICA: BUILDING PERSON IMAGE MANIFEST ===");
  console.log(`Assets Directory: ${publicAssetsDir}\n`);

  const manifest = {};
  const structuredManifest = {
    keynoteSpeaker: {},
    technicalChairman: {},
    advisoryBoard: {},
    technicalCommittee: {
      assetIntegrity: {},
      artificialIntelligence: {},
      automationCybersecurity: {},
    },
    organisingCommittee: {},
  };

  const auditReport = {};
  const assignedGlobally = {};
  const unusedFilesBySection = {};
  const largeFiles = [];

  for (const [secKey, relFolder] of Object.entries(sectionsConfig)) {
    const folderPath = path.join(publicAssetsDir, relFolder);
    let filesInFolder = [];
    if (fs.existsSync(folderPath)) {
      filesInFolder = fs
        .readdirSync(folderPath)
        .filter(
          (f) =>
            !fs.statSync(path.join(folderPath, f)).isDirectory() &&
            f !== ".gitkeep" &&
            /\.(webp|jpg|jpeg|png|avif)$/i.test(f),
        );
    }

    manifest[secKey] = {};
    auditReport[secKey] = {
      total: (membersBySection[secKey] || []).length,
      matched: 0,
      missing: 0,
      details: [],
    };

    const secMembers = membersBySection[secKey] || [];
    const secAliases = explicitAliases[secKey] || {};
    const usedFilesInSec = new Set();

    for (const memberName of secMembers) {
      const memberSlug = normalizePersonName(memberName);
      let matchedFilename = null;
      let matchType = null;

      // Level 0: Explicit Alias (prefer WebP variant if alias names png/jpg)
      if (secAliases[memberSlug]) {
        const aliasFile = secAliases[memberSlug];
        const webpVariant = aliasFile.replace(/\.(jpg|jpeg|png)$/i, ".webp");
        if (filesInFolder.includes(webpVariant)) {
          matchedFilename = webpVariant;
          matchType = "EXPLICIT_ALIAS_WEBP";
        } else if (filesInFolder.includes(aliasFile)) {
          matchedFilename = aliasFile;
          matchType = "EXPLICIT_ALIAS";
        }
      }

      // Level 1: Exact Normalized Name Match (.webp prioritized)
      if (!matchedFilename) {
        const sortedFiles = [...filesInFolder].sort((a, b) => {
          const aIsWebp = a.endsWith(".webp") ? 0 : 1;
          const bIsWebp = b.endsWith(".webp") ? 0 : 1;
          return aIsWebp - bIsWebp;
        });

        for (const fname of sortedFiles) {
          if (normalizePersonName(fname) === memberSlug) {
            matchedFilename = fname;
            matchType = fname.endsWith(".webp") ? "EXACT_NORMALIZED_WEBP" : "EXACT_NORMALIZED";
            break;
          }
        }
      }

      if (matchedFilename) {
        usedFilesInSec.add(matchedFilename);
        const publicPath = `/assets/aiaiac-2027/${relFolder}/${matchedFilename}`.replace(
          /\\/g,
          "/",
        );

        // Check file size
        const fullFilePath = path.join(folderPath, matchedFilename);
        const stat = fs.statSync(fullFilePath);
        const sizeKb = stat.size / 1024;
        if (sizeKb > 200) {
          largeFiles.push({
            path: publicPath,
            sizeKb: sizeKb.toFixed(1),
            section: secKey,
          });
        }

        manifest[secKey][memberSlug] = publicPath;
        manifest[secKey][memberName] = publicPath;

        // Structured manifest routing
        if (secKey === "keynote-speakers") {
          structuredManifest.keynoteSpeaker[memberSlug] = publicPath;
        } else if (secKey === "technical-chairman") {
          structuredManifest.technicalChairman[memberSlug] = publicPath;
        } else if (secKey === "advisory-board") {
          structuredManifest.advisoryBoard[memberSlug] = publicPath;
        } else if (secKey === "organising-committee") {
          structuredManifest.organisingCommittee[memberSlug] = publicPath;
        } else if (secKey === "asset-integrity") {
          structuredManifest.technicalCommittee.assetIntegrity[memberSlug] = publicPath;
        } else if (secKey === "artificial-intelligence") {
          structuredManifest.technicalCommittee.artificialIntelligence[memberSlug] = publicPath;
        } else if (secKey === "automation-cybersecurity") {
          structuredManifest.technicalCommittee.automationCybersecurity[memberSlug] = publicPath;
        }

        auditReport[secKey].matched++;
        auditReport[secKey].details.push({
          name: memberName,
          slug: memberSlug,
          status: "MATCHED",
          filename: matchedFilename,
          path: publicPath,
          sizeKb: sizeKb.toFixed(1),
          matchType,
        });

        // Duplicate check within section
        if (assignedGlobally[`${secKey}:${publicPath}`]) {
          console.warn(
            `[DUPLICATE WARNING] Image '${publicPath}' assigned to both '${memberName}' and '${assignedGlobally[`${secKey}:${publicPath}`]}'`,
          );
        } else {
          assignedGlobally[`${secKey}:${publicPath}`] = memberName;
        }
      } else {
        auditReport[secKey].missing++;
        auditReport[secKey].details.push({
          name: memberName,
          slug: memberSlug,
          status: "MISSING — initials fallback",
        });
      }
    }

    // Unused files in folder
    unusedFilesBySection[secKey] = filesInFolder.filter((f) => !usedFilesInSec.has(f));
  }

  // Ensure target generated dir exists
  const genDir = path.dirname(manifestOutputPath1);
  if (!fs.existsSync(genDir)) {
    fs.mkdirSync(genDir, { recursive: true });
  }

  // 1. Output legacy/resolver compatible personImageManifest.ts
  const content1 = `/**
 * AIAIAC Person Image Manifest
 * Automatically generated by scripts/build-person-image-manifest.mjs
 * DO NOT EDIT DIRECTLY.
 */

export const personImageManifest: Record<string, Record<string, string>> = ${JSON.stringify(
    manifest,
    null,
    2,
  )} as const;
`;
  fs.writeFileSync(manifestOutputPath1, content1, "utf8");
  console.log(`Generated: ${manifestOutputPath1}`);

  // 2. Output structured aiaiacPeopleImages.ts
  const content2 = `/**
 * AIAIAC People Images — Structured Manifest
 * Automatically generated from physical filesystem discovery.
 * DO NOT EDIT DIRECTLY.
 */

export const peopleImages = ${JSON.stringify(structuredManifest, null, 2)} as const;
`;
  fs.writeFileSync(manifestOutputPath2, content2, "utf8");
  console.log(`Generated: ${manifestOutputPath2}`);

  // Print Full Audit Report
  console.log("\n==================================================");
  console.log("         AIAIAC PERSON PORTRAIT AUDIT REPORT");
  console.log("==================================================");

  for (const [sec, data] of Object.entries(auditReport)) {
    console.log(
      `\n[${sec.toUpperCase()}] Total: ${data.total} | Matched: ${data.matched} | Missing: ${data.missing}`,
    );
    for (const d of data.details) {
      if (d.status === "MATCHED") {
        console.log(`  [OK] ${d.name} -> ${d.filename} (${d.sizeKb} KB, ${d.matchType})`);
      } else {
        console.log(`  [FAIL] ${d.name} -> ${d.status}`);
      }
    }
  }

  console.log("\n==================================================");
  console.log("             UNUSED FILES REPORT");
  console.log("==================================================");
  for (const [sec, files] of Object.entries(unusedFilesBySection)) {
    if (files.length > 0) {
      console.log(`\n[${sec}] ${files.length} unused files:`);
      files.forEach((f) => console.log(`  - ${f}`));
    }
  }

  if (largeFiles.length > 0) {
    console.log("\n==================================================");
    console.log("       LARGE FILES WARNING (>200 KB)");
    console.log("==================================================");
    largeFiles.forEach((f) => console.log(`  [WARN] ${f.path} (${f.sizeKb} KB)`));
  } else {
    console.log("\nAll matched images are well within size thresholds (<= 200 KB).");
  }

  console.log("\nManifest build finished successfully.\n");
}

buildManifest();
