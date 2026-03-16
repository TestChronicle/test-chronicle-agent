#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Core: () => core_exports,
  Git: () => git_exports,
  buildHistory: () => buildHistory,
  cli: () => cli,
  detectFramework: () => detectFramework,
  extractTestNamesFromContent: () => extractTestNamesFromContent,
  findSpecFiles: () => findSpecFiles,
  getLatestCommitHash: () => getLatestCommitHash,
  parseAllSpecs: () => parseAllSpecs,
  parseSpecFile: () => parseSpecFile
});
module.exports = __toCommonJS(src_exports);

// src/cli.ts
var import_commander2 = require("commander");

// src/commands/sync.ts
var import_commander = require("commander");
var import_chalk = __toESM(require("chalk"));
var import_dotenv = __toESM(require("dotenv"));

// src/core/index.ts
var core_exports = {};
__export(core_exports, {
  detectFramework: () => detectFramework,
  extractTestNamesFromContent: () => extractTestNamesFromContent,
  findSpecFiles: () => findSpecFiles,
  parseAllSpecs: () => parseAllSpecs,
  parseSpecFile: () => parseSpecFile
});

// src/core/detector.ts
var import_fs = require("fs");
var import_path = __toESM(require("path"));
var import_glob = require("glob");
var SIGNATURES = {
  playwright: {
    configFiles: ["playwright.config.ts", "playwright.config.js", "playwright.config.mjs"],
    packageDeps: ["@playwright/test", "playwright"]
  },
  cypress: {
    configFiles: ["cypress.config.ts", "cypress.config.js", "cypress.json"],
    packageDeps: ["cypress"]
  },
  testng: {
    configFiles: ["testng.xml"],
    packageDeps: ["org.testng:testng"]
  },
  junit: {
    configFiles: [],
    packageDeps: ["junit:junit"]
  },
  vitest: {
    configFiles: ["vitest.config.ts", "vitest.config.js"],
    packageDeps: ["vitest"]
  }
};
function detectFramework(projectPath) {
  for (const [framework, sig] of Object.entries(SIGNATURES)) {
    for (const configFile of sig.configFiles) {
      const fullPath = import_path.default.join(projectPath, configFile);
      if ((0, import_fs.existsSync)(fullPath)) {
        let testDir;
        if (framework === "playwright") {
          testDir = extractPlaywrightTestDir(fullPath, projectPath);
        } else if (framework === "vitest") {
          testDir = extractVitestTestDir(fullPath, projectPath);
        } else {
          testDir = guessTestDir(projectPath);
        }
        return { framework, testDir, confidence: "high" };
      }
    }
  }
  const nestedPlaywright = (0, import_glob.globSync)("**/playwright.config.{ts,js,mjs}", {
    cwd: projectPath,
    ignore: ["**/node_modules/**", "**/dist/**"],
    absolute: true
  });
  if (nestedPlaywright.length > 0) {
    const configPath = nestedPlaywright[0];
    const testDir = extractPlaywrightTestDir(configPath, projectPath);
    return { framework: "playwright", testDir, confidence: "high" };
  }
  const depsResult = detectFromPackageJson(projectPath);
  if (depsResult) return depsResult;
  return { framework: "unknown", testDir: "./tests", confidence: "low" };
}
function extractPlaywrightTestDir(configPath, projectPath) {
  try {
    const content = (0, import_fs.readFileSync)(configPath, "utf-8");
    const match = content.match(/testDir\s*:\s*['"`]([^'"`]+)['"`]/);
    if (match) {
      const configDir = import_path.default.dirname(configPath);
      const absoluteTestDir = import_path.default.resolve(configDir, match[1]);
      return "./" + import_path.default.relative(projectPath, absoluteTestDir);
    }
  } catch {
  }
  return guessTestDir(projectPath);
}
function extractVitestTestDir(_configPath, projectPath) {
  return guessTestDir(projectPath);
}
function guessTestDir(projectPath) {
  const candidates = [
    "./tests",
    "./test",
    "./e2e",
    "./src",
    "./playwright/e2e/tests",
    "./playwright/tests",
    "./src/tests",
    "./src/test"
  ];
  for (const candidate of candidates) {
    if ((0, import_fs.existsSync)(import_path.default.join(projectPath, candidate))) {
      return candidate;
    }
  }
  return "./tests";
}
function detectFromPackageJson(projectPath) {
  const pkgPath = import_path.default.join(projectPath, "package.json");
  if (!(0, import_fs.existsSync)(pkgPath)) return null;
  try {
    const pkg = JSON.parse((0, import_fs.readFileSync)(pkgPath, "utf-8"));
    const allDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies
    };
    for (const [framework, sig] of Object.entries(SIGNATURES)) {
      if (sig.packageDeps.some((dep) => dep in allDeps)) {
        return {
          framework,
          testDir: guessTestDir(projectPath),
          confidence: "medium"
        };
      }
    }
  } catch {
  }
  return null;
}

// src/core/parser.ts
var import_fs2 = require("fs");
var import_path7 = __toESM(require("path"));
var import_glob2 = require("glob");

// src/core/frameworks/playwright.ts
var import_path2 = __toESM(require("path"));

// src/core/frameworks/common.ts
var import_crypto = require("crypto");
function hashId(input) {
  return (0, import_crypto.createHash)("md5").update(input).digest("hex").substring(0, 8);
}
function lineNumberAt(content, position) {
  return content.substring(0, position).split("\n").length;
}
function findMatchingBrace(content, openPos) {
  let depth = 0;
  for (let i = openPos; i < content.length; i++) {
    if (content[i] === "{") {
      depth++;
    } else if (content[i] === "}") {
      depth--;
      if (depth === 0) {
        return i;
      }
    }
  }
  return -1;
}

// src/core/frameworks/playwright.ts
var DESCRIBE_RE = /test\.describe(?:\.(?:serial|parallel|skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/g;
var TEST_RE = /(?:^|[ \t]+)test(?:\.(?:skip|only|fixme|slow))?\s*\(\s*(['"`])([\s\S]*?)\1/gm;
var INLINE_TAG_RE = /\{\s*tag\s*:\s*(?:(['"`])([@\w\-/]+)\2|\[([^\]]+)\])/g;
function parsePlaywrightSpec(filePath, content, projectRoot) {
  const relativePath = import_path2.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const describeBlocks = findDescribeBlocks(content);
  const tests = [];
  let match;
  TEST_RE.lastIndex = 0;
  while ((match = TEST_RE.exec(content)) !== null) {
    const testName = match[2];
    const matchIndex = match.index;
    const line = lineNumberAt(content, matchIndex);
    const parentDescribe = resolveParentDescribe(describeBlocks, matchIndex);
    const tags = extractInlineTags(content, matchIndex);
    const isParameterized = isParameterizedTest(content, matchIndex);
    if (isParameterized) {
      tags.push({ name: "@parameterized" });
    }
    const id = hashId(`${relativePath}::${parentDescribe ?? ""}::${testName}`);
    tests.push({
      id,
      name: testName,
      fullName: parentDescribe ? `${parentDescribe} > ${testName}` : testName,
      describe: parentDescribe,
      tags,
      line
    });
  }
  return {
    id: hashId(relativePath),
    path: relativePath,
    name: import_path2.default.basename(filePath),
    framework: "playwright",
    tests,
    testCount: tests.length,
    lastModified: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function extractTestNames(content) {
  const names = [];
  const describeBlocks = findDescribeBlocks(content);
  let match;
  TEST_RE.lastIndex = 0;
  while ((match = TEST_RE.exec(content)) !== null) {
    const testName = match[2];
    const parentDescribe = resolveParentDescribe(describeBlocks, match.index);
    names.push(parentDescribe ? `${parentDescribe} > ${testName}` : testName);
  }
  return names;
}
function findDescribeBlocks(content) {
  const blocks = [];
  let match;
  DESCRIBE_RE.lastIndex = 0;
  while ((match = DESCRIBE_RE.exec(content)) !== null) {
    const matchEnd = match.index + match[0].length;
    const afterMatch = content.substring(matchEnd);
    const braceOffset = afterMatch.indexOf("{");
    if (braceOffset === -1) continue;
    const braceStart = matchEnd + braceOffset;
    const braceEnd = findMatchingBrace(content, braceStart);
    if (braceEnd !== -1) {
      blocks.push({ name: match[2], start: braceStart, end: braceEnd });
    }
  }
  return blocks;
}
function resolveParentDescribe(blocks, index) {
  let innermost;
  for (const block of blocks) {
    if (index > block.start && index < block.end) {
      if (!innermost || block.start > innermost.start) {
        innermost = block;
      }
    }
  }
  return innermost?.name;
}
function extractInlineTags(content, testIndex) {
  const window = content.substring(testIndex, testIndex + 300);
  const tags = [];
  let match;
  INLINE_TAG_RE.lastIndex = 0;
  while ((match = INLINE_TAG_RE.exec(window)) !== null) {
    if (match[2]) {
      tags.push({ name: match[2] });
    } else if (match[3]) {
      const tagList = match[3].split(",").map((t) => t.trim().replace(/^['"`]|['"`]$/g, "")).filter((t) => t.length > 0);
      tagList.forEach((t) => tags.push({ name: t }));
    }
  }
  return tags;
}
function isParameterizedTest(content, testIndex) {
  const window = content.substring(Math.max(0, testIndex - 50), testIndex);
  return /\.each\s*\(/.test(window);
}

// src/core/frameworks/cypress.ts
var import_path3 = __toESM(require("path"));
var DESCRIBE_RE2 = /describe\s*\(\s*(['"`])([\s\S]*?)\1/g;
var TEST_RE2 = /(?:^|[ \t]+)(?:it|specify|test)\s*(?:\.(?:skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/gm;
function parseCypressSpec(filePath, content, projectRoot) {
  const relativePath = import_path3.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const describeBlocks = findDescribeBlocks2(content);
  const tests = [];
  let match;
  TEST_RE2.lastIndex = 0;
  while ((match = TEST_RE2.exec(content)) !== null) {
    const testName = match[2];
    const matchIndex = match.index;
    const line = lineNumberAt(content, matchIndex);
    const parentDescribe = resolveParentDescribe2(describeBlocks, matchIndex);
    const id = hashId(`${relativePath}::${parentDescribe ?? ""}::${testName}`);
    tests.push({
      id,
      name: testName,
      fullName: parentDescribe ? `${parentDescribe} > ${testName}` : testName,
      describe: parentDescribe,
      tags: [],
      line
    });
  }
  return {
    id: hashId(relativePath),
    path: relativePath,
    name: import_path3.default.basename(filePath),
    framework: "cypress",
    tests,
    testCount: tests.length,
    lastModified: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function extractTestNames2(content) {
  const names = [];
  const describeBlocks = findDescribeBlocks2(content);
  let match;
  TEST_RE2.lastIndex = 0;
  while ((match = TEST_RE2.exec(content)) !== null) {
    const testName = match[2];
    const parentDescribe = resolveParentDescribe2(describeBlocks, match.index);
    names.push(parentDescribe ? `${parentDescribe} > ${testName}` : testName);
  }
  return names;
}
function findDescribeBlocks2(content) {
  const blocks = [];
  let match;
  DESCRIBE_RE2.lastIndex = 0;
  while ((match = DESCRIBE_RE2.exec(content)) !== null) {
    const matchEnd = match.index + match[0].length;
    const afterMatch = content.substring(matchEnd);
    const braceOffset = afterMatch.indexOf("{");
    if (braceOffset === -1) continue;
    const braceStart = matchEnd + braceOffset;
    const braceEnd = findMatchingBrace(content, braceStart);
    if (braceEnd !== -1) {
      blocks.push({ name: match[2], start: braceStart, end: braceEnd });
    }
  }
  return blocks;
}
function resolveParentDescribe2(blocks, index) {
  let innermost;
  for (const block of blocks) {
    if (index > block.start && index < block.end) {
      if (!innermost || block.start > innermost.start) {
        innermost = block;
      }
    }
  }
  return innermost?.name;
}

// src/core/frameworks/vitest.ts
var import_path4 = __toESM(require("path"));
var DESCRIBE_RE3 = /describe\s*(?:\.(?:skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/g;
var TEST_RE3 = /(?:^|[ \t]+)(?:test|it)\s*(?:\.(?:skip|only|todo))?\s*\(\s*(['"`])([\s\S]*?)\1/gm;
function parseVitestSpec(filePath, content, projectRoot) {
  const relativePath = import_path4.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const describeBlocks = findDescribeBlocks3(content);
  const tests = [];
  let match;
  TEST_RE3.lastIndex = 0;
  while ((match = TEST_RE3.exec(content)) !== null) {
    const testName = match[2];
    const matchIndex = match.index;
    const line = lineNumberAt(content, matchIndex);
    const parentDescribe = resolveParentDescribe3(describeBlocks, matchIndex);
    const isTodo = /\.todo\s*\(/.test(content.substring(matchIndex, matchIndex + 50));
    const tags = isTodo ? [{ name: "@todo" }] : [];
    const id = hashId(`${relativePath}::${parentDescribe ?? ""}::${testName}`);
    tests.push({
      id,
      name: testName,
      fullName: parentDescribe ? `${parentDescribe} > ${testName}` : testName,
      describe: parentDescribe,
      tags,
      line
    });
  }
  return {
    id: hashId(relativePath),
    path: relativePath,
    name: import_path4.default.basename(filePath),
    framework: "vitest",
    tests,
    testCount: tests.length,
    lastModified: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function extractTestNames3(content) {
  const names = [];
  const describeBlocks = findDescribeBlocks3(content);
  let match;
  TEST_RE3.lastIndex = 0;
  while ((match = TEST_RE3.exec(content)) !== null) {
    const testName = match[2];
    const parentDescribe = resolveParentDescribe3(describeBlocks, match.index);
    names.push(parentDescribe ? `${parentDescribe} > ${testName}` : testName);
  }
  return names;
}
function findDescribeBlocks3(content) {
  const blocks = [];
  let match;
  DESCRIBE_RE3.lastIndex = 0;
  while ((match = DESCRIBE_RE3.exec(content)) !== null) {
    const matchEnd = match.index + match[0].length;
    const afterMatch = content.substring(matchEnd);
    const braceOffset = afterMatch.indexOf("{");
    if (braceOffset === -1) continue;
    const braceStart = matchEnd + braceOffset;
    const braceEnd = findMatchingBrace(content, braceStart);
    if (braceEnd !== -1) {
      blocks.push({ name: match[2], start: braceStart, end: braceEnd });
    }
  }
  return blocks;
}
function resolveParentDescribe3(blocks, index) {
  let innermost;
  for (const block of blocks) {
    if (index > block.start && index < block.end) {
      if (!innermost || block.start > innermost.start) {
        innermost = block;
      }
    }
  }
  return innermost?.name;
}

// src/core/frameworks/testng.ts
var import_path5 = __toESM(require("path"));
var TEST_METHOD_RE = /@Test\s*(?:\([^)]*\))?\s+(?:public\s+)?(?:void|[\w<>]+)\s+(\w+)\s*\(/gm;
var CLASS_DECLARATION_RE = /(?:public\s+)?class\s+(\w+)/;
var ENABLED_RE = /enabled\s*=\s*(false|true)/;
var GROUPS_RE = /groups\s*=\s*\{\s*"?([^}\"]+)"?\s*\}/;
function parseTestNGSpec(filePath, content, projectRoot) {
  const relativePath = import_path5.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const className = extractClassName(content);
  const tests = [];
  let match;
  TEST_METHOD_RE.lastIndex = 0;
  while ((match = TEST_METHOD_RE.exec(content)) !== null) {
    const testName = match[1];
    const matchIndex = match.index;
    const line = lineNumberAt(content, matchIndex);
    const annotationStart = content.lastIndexOf("@Test", matchIndex);
    if (annotationStart === -1) continue;
    const annotationText = content.substring(annotationStart, matchIndex);
    const tags = extractTestNGTags(annotationText);
    const isEnabled = isTestEnabled(annotationText);
    if (!isEnabled) {
      continue;
    }
    const id = hashId(`${relativePath}::${className}::${testName}`);
    tests.push({
      id,
      name: testName,
      fullName: className ? `${className} > ${testName}` : testName,
      describe: className,
      tags,
      line
    });
  }
  return {
    id: hashId(relativePath),
    path: relativePath,
    name: import_path5.default.basename(filePath),
    framework: "testng",
    tests,
    testCount: tests.length,
    lastModified: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function extractTestNames4(content) {
  const className = extractClassName(content);
  const names = [];
  let match;
  TEST_METHOD_RE.lastIndex = 0;
  while ((match = TEST_METHOD_RE.exec(content)) !== null) {
    const testName = match[1];
    const matchIndex = match.index;
    const annotationStart = content.lastIndexOf("@Test", matchIndex);
    if (annotationStart !== -1) {
      const annotationText = content.substring(annotationStart, matchIndex);
      if (!isTestEnabled(annotationText)) {
        continue;
      }
    }
    names.push(className ? `${className} > ${testName}` : testName);
  }
  return names;
}
function extractClassName(content) {
  const match = CLASS_DECLARATION_RE.exec(content);
  return match ? match[1] : void 0;
}
function isTestEnabled(annotationText) {
  const match = ENABLED_RE.exec(annotationText);
  if (match) {
    return match[1] === "true";
  }
  return true;
}
function extractTestNGTags(annotationText) {
  const tags = [];
  const groupMatch = GROUPS_RE.exec(annotationText);
  if (groupMatch) {
    const groups = groupMatch[1].split(",").map((g) => g.trim().replace(/^"|"$/g, "")).filter((g) => g.length > 0);
    groups.forEach((g) => {
      tags.push({ name: g });
    });
  }
  return tags;
}

// src/core/frameworks/junit.ts
var import_path6 = __toESM(require("path"));
var TEST_METHOD_RE2 = /@Test\s+(?:public\s+)?(?:void|[\w<>]+)\s+(\w+)\s*\(/gm;
var CLASS_DECLARATION_RE2 = /(?:public\s+)?class\s+(\w+)/;
var IGNORE_RE = /@Ignore/;
var TAG_RE = /@Tag\s*\(\s*"([^"]+)"\s*\)/g;
function parseJUnitSpec(filePath, content, projectRoot) {
  const relativePath = import_path6.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const className = extractClassName2(content);
  const tests = [];
  let match;
  TEST_METHOD_RE2.lastIndex = 0;
  while ((match = TEST_METHOD_RE2.exec(content)) !== null) {
    const testName = match[1];
    const matchIndex = match.index;
    const line = lineNumberAt(content, matchIndex);
    const methodStart = content.lastIndexOf("@Test", matchIndex);
    if (methodStart === -1) continue;
    const annotationBlockStart = Math.max(0, methodStart - 500);
    const annotationBlock = content.substring(annotationBlockStart, matchIndex);
    if (IGNORE_RE.test(annotationBlock)) {
      continue;
    }
    const tags = extractJUnitTags(annotationBlock);
    const id = hashId(`${relativePath}::${className}::${testName}`);
    tests.push({
      id,
      name: testName,
      fullName: className ? `${className} > ${testName}` : testName,
      describe: className,
      tags,
      line
    });
  }
  return {
    id: hashId(relativePath),
    path: relativePath,
    name: import_path6.default.basename(filePath),
    framework: "junit",
    tests,
    testCount: tests.length,
    lastModified: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function extractTestNames5(content) {
  const className = extractClassName2(content);
  const names = [];
  let match;
  TEST_METHOD_RE2.lastIndex = 0;
  while ((match = TEST_METHOD_RE2.exec(content)) !== null) {
    const testName = match[1];
    const matchIndex = match.index;
    const methodStart = content.lastIndexOf("@Test", matchIndex);
    if (methodStart !== -1) {
      const annotationBlockStart = Math.max(0, methodStart - 500);
      const annotationBlock = content.substring(annotationBlockStart, matchIndex);
      if (IGNORE_RE.test(annotationBlock)) {
        continue;
      }
    }
    names.push(className ? `${className} > ${testName}` : testName);
  }
  return names;
}
function extractClassName2(content) {
  const match = CLASS_DECLARATION_RE2.exec(content);
  return match ? match[1] : void 0;
}
function extractJUnitTags(annotationBlock) {
  const tags = [];
  let tagMatch;
  TAG_RE.lastIndex = 0;
  while ((tagMatch = TAG_RE.exec(annotationBlock)) !== null) {
    if (tagMatch[1]) {
      tags.push({ name: tagMatch[1] });
    }
  }
  return tags;
}

// src/core/parser.ts
function parseSpecFile(filePath, content, projectRoot, framework) {
  let spec;
  switch (framework) {
    case "playwright":
      spec = parsePlaywrightSpec(filePath, content, projectRoot);
      break;
    case "cypress":
      spec = parseCypressSpec(filePath, content, projectRoot);
      break;
    case "vitest":
      spec = parseVitestSpec(filePath, content, projectRoot);
      break;
    case "testng":
      spec = parseTestNGSpec(filePath, content, projectRoot);
      break;
    case "junit":
      spec = parseJUnitSpec(filePath, content, projectRoot);
      break;
    default:
      throw new Error(`Framework '${framework}' not supported`);
  }
  try {
    spec.lastModified = (0, import_fs2.statSync)(filePath).mtime.toISOString();
  } catch {
  }
  return spec;
}
function extractTestNamesFromContent(content, framework) {
  switch (framework) {
    case "playwright":
      return extractTestNames(content);
    case "cypress":
      return extractTestNames2(content);
    case "vitest":
      return extractTestNames3(content);
    case "testng":
      return extractTestNames4(content);
    case "junit":
      return extractTestNames5(content);
    default:
      return [];
  }
}
function findSpecFiles(projectRoot, testDir, framework) {
  const patterns = getTestFilePatterns(framework);
  const baseDir = import_path7.default.resolve(projectRoot, testDir);
  return (0, import_glob2.globSync)(patterns, {
    cwd: baseDir,
    absolute: true,
    ignore: ["**/node_modules/**"]
  });
}
function getTestFilePatterns(framework) {
  switch (framework) {
    case "playwright":
      return ["**/*.spec.ts", "**/*.spec.js", "**/*.spec.mjs"];
    case "cypress":
      return ["**/*.cy.ts", "**/*.cy.js", "**/*.spec.ts", "**/*.spec.js"];
    case "vitest":
      return ["**/*.test.ts", "**/*.test.js", "**/*.spec.ts", "**/*.spec.js"];
    case "testng":
      return ["**/*Test.java", "**/*Tests.java", "**/*TestCase.java"];
    case "junit":
      return ["**/*Test.java", "**/*Tests.java", "**/*TestCase.java"];
    default:
      return ["**/*.spec.ts", "**/*.spec.js", "**/*.test.ts", "**/*.test.js"];
  }
}
function parseAllSpecs(projectRoot, testDir, framework) {
  const files = findSpecFiles(projectRoot, testDir, framework);
  return files.map((filePath) => {
    const content = (0, import_fs2.readFileSync)(filePath, "utf-8");
    return parseSpecFile(filePath, content, projectRoot, framework);
  });
}

// src/git/index.ts
var git_exports = {};
__export(git_exports, {
  buildHistory: () => buildHistory,
  getLatestCommitHash: () => getLatestCommitHash
});

// src/git/history.ts
var import_simple_git = __toESM(require("simple-git"));
var import_path8 = __toESM(require("path"));
async function getLatestCommitHash(projectPath) {
  const git = (0, import_simple_git.default)(projectPath);
  try {
    const log = await git.log({ maxCount: 1 });
    return log.latest?.hash ?? null;
  } catch {
    return null;
  }
}
async function buildHistory(projectPath, testDir, framework, sinceCommit, fullHistory) {
  const git = (0, import_simple_git.default)(projectPath);
  const relativeTestDir = testDir.replace(/^\.\//, "");
  let logArgs;
  if (sinceCommit) {
    logArgs = [`${sinceCommit}..HEAD`, "--", relativeTestDir];
  } else if (fullHistory) {
    logArgs = ["--all"];
  } else {
    logArgs = ["--all", "--", relativeTestDir];
  }
  let logResult;
  try {
    logResult = await git.log(logArgs);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[DEBUG] Git log error: ${error.message} with args: ${JSON.stringify(logArgs)}`);
    }
    return [];
  }
  const commits = [...logResult.all].reverse();
  const history = [];
  for (const commit of commits) {
    const fileChanges = await getCommitFileChanges(
      git,
      commit.hash,
      fullHistory ? void 0 : relativeTestDir
    );
    const specChanges = await buildSpecChanges(
      git,
      commit.hash,
      fileChanges,
      framework,
      projectPath
    );
    if (specChanges.length === 0) continue;
    history.push({
      commit: {
        hash: commit.hash,
        shortHash: commit.hash.substring(0, 7),
        message: commit.message,
        author: commit.author_name,
        date: new Date(commit.date).toISOString(),
        changes: fileChanges
      },
      specs: specChanges
    });
  }
  return history;
}
async function getCommitFileChanges(git, hash, testDir) {
  try {
    const raw = await git.raw([
      "diff-tree",
      "--no-commit-id",
      "-r",
      "--name-status",
      "-M",
      // detect renames
      hash
    ]);
    const changes = [];
    for (const line of raw.trim().split("\n")) {
      if (!line) continue;
      const parts = line.split("	");
      const status = parts[0];
      if (status.startsWith("R")) {
        const oldPath = parts[1];
        const newPath = parts[2];
        if (!testDir || isInTestDir(newPath, testDir) || isInTestDir(oldPath, testDir)) {
          changes.push({ path: newPath, oldPath, status: "renamed" });
        }
      } else {
        const filePath = parts[1];
        if (testDir && !isInTestDir(filePath, testDir)) continue;
        const mapped = mapGitStatus(status);
        if (mapped) changes.push({ path: filePath, status: mapped });
      }
    }
    return changes;
  } catch {
    return [];
  }
}
function isInTestDir(filePath, testDir) {
  return filePath.startsWith(testDir) || import_path8.default.dirname(filePath) === testDir;
}
function mapGitStatus(status) {
  switch (status[0]) {
    case "A":
      return "added";
    case "D":
      return "deleted";
    case "M":
      return "modified";
    default:
      return null;
  }
}
async function buildSpecChanges(git, hash, fileChanges, framework, projectPath) {
  const entries = [];
  for (const change of fileChanges) {
    if (!isSpecFile(change.path)) continue;
    try {
      const entry = await buildSpecEntry(git, hash, change, framework, projectPath);
      if (entry) entries.push(entry);
    } catch {
    }
  }
  return entries;
}
async function buildSpecEntry(git, hash, change, framework, _projectPath) {
  if (change.status === "added") {
    const content = await getFileAtCommit(git, hash, change.path);
    const tests = extractTestNamesFromContent(content, framework);
    return {
      specPath: change.path,
      fileStatus: "added",
      changes: tests.map((name) => ({ type: "added", name }))
    };
  }
  if (change.status === "deleted") {
    const content = await getFileAtCommit(git, `${hash}^`, change.path);
    const tests = extractTestNamesFromContent(content, framework);
    return {
      specPath: change.path,
      fileStatus: "deleted",
      changes: tests.map((name) => ({ type: "removed", name }))
    };
  }
  if (change.status === "renamed" && change.oldPath) {
    const [currentContent, previousContent] = await Promise.all([
      getFileAtCommit(git, hash, change.path),
      getFileAtCommit(git, `${hash}^`, change.oldPath).catch(() => "")
    ]);
    const currentTests2 = new Set(extractTestNamesFromContent(currentContent, framework));
    const previousTests2 = new Set(extractTestNamesFromContent(previousContent, framework));
    const testChanges = diffTestNames(previousTests2, currentTests2);
    return {
      specPath: change.path,
      fileStatus: "renamed",
      changes: testChanges
    };
  }
  const [current, previous] = await Promise.all([
    getFileAtCommit(git, hash, change.path),
    getFileAtCommit(git, `${hash}^`, change.path).catch(() => "")
  ]);
  const currentTests = new Set(extractTestNamesFromContent(current, framework));
  const previousTests = new Set(extractTestNamesFromContent(previous, framework));
  const changes = diffTestNames(previousTests, currentTests);
  if (changes.length === 0) return null;
  return {
    specPath: change.path,
    fileStatus: "modified",
    changes
  };
}
async function getFileAtCommit(git, ref, filePath) {
  return git.show([`${ref}:${filePath}`]);
}
function isSpecFile(filePath) {
  return /\.(spec|test)\.[jt]s$/.test(filePath);
}
function diffTestNames(previous, current) {
  const added = [...current].filter((t) => !previous.has(t));
  const removed = [...previous].filter((t) => !current.has(t));
  const changes = [];
  const matchedAdded = /* @__PURE__ */ new Set();
  for (const removedName of removed) {
    const renameCandidate = added.find(
      (addedName) => !matchedAdded.has(addedName) && similarNames(removedName, addedName)
    );
    if (renameCandidate) {
      changes.push({ type: "modified", name: renameCandidate, oldName: removedName });
      matchedAdded.add(renameCandidate);
    } else {
      changes.push({ type: "removed", name: removedName });
    }
  }
  for (const addedName of added) {
    if (!matchedAdded.has(addedName)) {
      changes.push({ type: "added", name: addedName });
    }
  }
  return changes;
}
function similarNames(a, b) {
  const wordsA = new Set(a.toLowerCase().split(/\s+/));
  const wordsB = new Set(b.toLowerCase().split(/\s+/));
  const intersection = [...wordsA].filter((w) => wordsB.has(w)).length;
  const union = (/* @__PURE__ */ new Set([...wordsA, ...wordsB])).size;
  return union > 0 && intersection / union > 0.5;
}

// src/sync-client.ts
async function getSyncMarker(dashboardUrl, apiToken, projectId) {
  const url = new URL(`/api/projects/${projectId}/sync-marker`, dashboardUrl).toString();
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiToken}`
  };
  try {
    const response = await fetch(url, {
      method: "GET",
      headers
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      const errorBody = await response.text().catch(() => "");
      throw new Error(`Failed with status ${response.status}${errorBody ? ` - ${errorBody}` : ""}`);
    }
    const data = await response.json();
    return data?.lastSyncedCommit || data?.commitHash || null;
  } catch (error) {
    return null;
  }
}
async function saveSyncMarker(dashboardUrl, apiToken, projectId, commitHash) {
  const url = new URL(`/api/projects/${projectId}/sync-marker`, dashboardUrl).toString();
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiToken}`
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ commitHash })
  });
  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(
      `Failed to save sync marker: ${response.status} ${response.statusText}${errorBody ? ` - ${errorBody}` : ""}`
    );
  }
}
async function syncToDashboard(dashboardUrl, apiToken, payload) {
  const url = new URL(`/api/projects/${payload.projectId}/sync`, dashboardUrl).toString();
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiToken}`
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(
      `Sync failed with status ${response.status}: ${response.statusText}${errorBody ? ` - ${errorBody}` : ""}`
    );
  }
  return response.json();
}

// src/commands/sync.ts
var import_path9 = __toESM(require("path"));
var import_fs3 = __toESM(require("fs"));
import_dotenv.default.config({ debug: false });
function deduplicateChanges(changes) {
  const seen = /* @__PURE__ */ new Set();
  const deduplicated = [];
  for (const change of changes) {
    const key = `${change.type}:${change.name}:${change.oldName ?? ""}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(change);
    }
  }
  return deduplicated;
}
var syncCommand = new import_commander.Command("sync").description("Sync test data to dashboard").option("--project-id <id>", "Project ID from init").option("--dashboard-url <url>", "Dashboard URL").option("--full-history", "Scan all commits in repo (use for projects that moved tests)").action(async (options) => {
  try {
    const projectPath = process.cwd();
    const envLocalPath = import_path9.default.join(projectPath, ".env.local");
    if (import_fs3.default.existsSync(envLocalPath)) {
      import_dotenv.default.config({ path: envLocalPath, debug: false });
    }
    const projectId = options.projectId || process.env.CHRONICLE_PROJECT_ID;
    const dashboardUrl = options.dashboardUrl || process.env.CHRONICLE_DASHBOARD_URL || "http://localhost:3000";
    const apiKey = process.env.CHRONICLE_API_KEY;
    if (!projectId) {
      console.error(import_chalk.default.red("Error: Missing project ID"));
      console.log(import_chalk.default.yellow("\nSet CHRONICLE_PROJECT_ID in .env.local:"));
      console.log(import_chalk.default.white("  CHRONICLE_PROJECT_ID=<id-from-init-command>"));
      console.log(import_chalk.default.gray("Or use --project-id flag"));
      process.exit(1);
    }
    if (!dashboardUrl) {
      console.error(import_chalk.default.red("Error: Missing dashboard URL"));
      console.log(import_chalk.default.yellow("Set CHRONICLE_DASHBOARD_URL in .env.local or use --dashboard-url"));
      process.exit(1);
    }
    if (!apiKey) {
      console.error(import_chalk.default.red("Error: Missing API key"));
      console.log(import_chalk.default.yellow("\nAdd your API key to .env.local:"));
      console.log(import_chalk.default.white("  CHRONICLE_API_KEY=<your-api-key>"));
      console.log(import_chalk.default.gray("Or visit http://localhost:3000/auth/settings to retrieve your key"));
      process.exit(1);
    }
    console.log(import_chalk.default.blue("\u{1F50D} Detecting framework..."));
    const detection = detectFramework(projectPath);
    console.log(import_chalk.default.green(`\u2713 Detected framework: ${detection.framework}`));
    console.log(import_chalk.default.gray(`  Test directory: ${detection.testDir}`));
    console.log(import_chalk.default.blue("\u{1F4DD} Parsing test specifications..."));
    const specs = parseAllSpecs(projectPath, detection.testDir, detection.framework);
    console.log(import_chalk.default.green(`\u2713 Found ${specs.length} spec files`));
    const totalTests = specs.reduce((sum, spec) => sum + spec.testCount, 0);
    console.log(import_chalk.default.gray(`  Total tests: ${totalTests}`));
    console.log(import_chalk.default.blue("\u{1F4DA} Building git history..."));
    let sinceCommit;
    if (!options.fullHistory) {
      try {
        const marker = await getSyncMarker(dashboardUrl, apiKey, projectId);
        if (marker) {
          sinceCommit = marker;
          console.log(import_chalk.default.gray(`  Last synced: ${marker.substring(0, 7)}`));
        } else {
          console.log(import_chalk.default.gray("  No prior sync marker found, syncing full history"));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(import_chalk.default.gray(`  Warning: ${error.message}`));
        }
      }
    } else {
      console.log(import_chalk.default.gray("  Full history mode: scanning all commits"));
    }
    const history = await buildHistory(projectPath, detection.testDir, detection.framework, sinceCommit, options.fullHistory);
    console.log(import_chalk.default.green(`\u2713 Built history for ${history.length} commits`));
    const tags = {};
    specs.forEach((spec) => {
      spec.tests.forEach((test) => {
        test.tags?.forEach((tag) => {
          tags[tag.name] = (tags[tag.name] || 0) + 1;
        });
      });
    });
    const stats = {
      totalSpecs: specs.length,
      totalTests,
      tags
    };
    console.log();
    console.log(import_chalk.default.blue("\u{1F4CA} Summary"));
    console.log(import_chalk.default.gray(`  Specs: ${specs.length}`));
    console.log(import_chalk.default.gray(`  Tests: ${totalTests}`));
    console.log();
    console.log(import_chalk.default.blue("\u{1F680} Syncing to dashboard..."));
    const transformedSpecs = specs.map((spec) => ({
      filePath: spec.path,
      framework: spec.framework,
      tests: spec.tests.map((test) => ({
        name: test.name,
        lineNumber: test.line,
        tags: test.tags.map((tag) => tag.name)
      }))
    }));
    const transformedHistory = history.map((entry) => {
      const allChanges = [];
      for (const spec of entry.specs) {
        const deduplicatedChanges = deduplicateChanges(spec.changes);
        for (const change of deduplicatedChanges) {
          allChanges.push({
            specPath: spec.specPath,
            testName: change.name,
            type: change.type === "removed" ? "deleted" : change.type,
            oldName: change.oldName
          });
        }
      }
      const seenKeys = /* @__PURE__ */ new Set();
      const uniqueChanges = allChanges.filter((change) => {
        const key = `${change.specPath}:${change.type}:${change.testName}`;
        if (seenKeys.has(key)) return false;
        seenKeys.add(key);
        return true;
      });
      return {
        commitHash: entry.commit.hash,
        commitMessage: entry.commit.message,
        author: entry.commit.author,
        commitDate: entry.commit.date,
        changes: uniqueChanges.map((change) => ({
          specFile: change.specPath,
          testName: change.testName,
          type: change.type,
          details: change.oldName ? { old_name: change.oldName } : void 0
        }))
      };
    });
    const payload = {
      projectId,
      specs: transformedSpecs,
      history: transformedHistory,
      stats,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    await syncToDashboard(dashboardUrl, apiKey, payload);
    console.log(import_chalk.default.green("\u2713 Sync successful!"));
    console.log(import_chalk.default.gray(`  Synced ${specs.length} specs with ${totalTests} tests`));
    if (history.length > 0) {
      try {
        const lastHash = history[history.length - 1].commit.hash;
        await saveSyncMarker(dashboardUrl, apiKey, projectId, lastHash);
        console.log(import_chalk.default.gray(`  Saved sync marker: ${lastHash.substring(0, 7)}`));
      } catch (error) {
        if (error instanceof Error) {
          console.log(import_chalk.default.yellow(`  Warning: Could not save sync marker: ${error.message}`));
        }
      }
    }
  } catch (error) {
    console.error(import_chalk.default.red("Error during sync:"));
    if (error instanceof Error) {
      console.error(import_chalk.default.red(`  ${error.message}`));
    } else {
      console.error(import_chalk.default.red(`  ${String(error)}`));
    }
    process.exit(1);
  }
});

// src/cli.ts
var cli = new import_commander2.Command().name("test-chronicle-agent").description("CLI agent for syncing test data to test-chronicle dashboard").version("0.1.0");
cli.addCommand(syncCommand);
async function main() {
  try {
    await cli.parseAsync(process.argv);
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}
if (require.main === module) {
  main();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Core,
  Git,
  buildHistory,
  cli,
  detectFramework,
  extractTestNamesFromContent,
  findSpecFiles,
  getLatestCommitHash,
  parseAllSpecs,
  parseSpecFile
});
//# sourceMappingURL=index.js.map