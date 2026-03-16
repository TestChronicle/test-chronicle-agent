#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
function findDescribeBlocks(content, describePattern) {
  const blocks = [];
  let match;
  describePattern.lastIndex = 0;
  while ((match = describePattern.exec(content)) !== null) {
    const matchEnd = match.index + match[0].length;
    const afterMatch = content.substring(matchEnd);
    const braceOffset = afterMatch.indexOf("{");
    if (braceOffset === -1) continue;
    const braceStart = matchEnd + braceOffset;
    const braceEnd = findMatchingBrace(content, braceStart);
    if (braceEnd !== -1) {
      blocks.push({ name: match[2] || match[1], start: braceStart, end: braceEnd });
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

// src/core/frameworks/parameterized.ts
function extractParameterizedDataFromEach(content) {
  const eachRegex = new RegExp(
    `(?:test|describe)\\.each\\s*\\(\\s*\\[([\\s\\S]*?)\\]\\s*\\)`,
    "g"
  );
  let match;
  while ((match = eachRegex.exec(content)) !== null) {
    const dataContent = match[1];
    const paramCount = countParameterSets(dataContent);
    if (paramCount > 0) {
      return {
        count: paramCount,
        hasParameters: true
      };
    }
  }
  return null;
}
function extractParameterizedDataFromForEach(content, testName) {
  const contextStart = Math.max(0, content.lastIndexOf("\n", content.indexOf(testName)) - 1e3);
  const contextEnd = content.indexOf(testName);
  const context = content.substring(contextStart, contextEnd);
  const forEachMatch = context.match(/\b(?:users|items|data|elements|nodes)\.forEach\s*\(/i);
  const forMatch = context.match(/\bfor\s*\(\s*(?:let|var|const)\s+(\w+)\s+(?:of|in)\s+(.+?)\s*\)/);
  if (forEachMatch || forMatch) {
    const arrayDeclMatch = context.match(
      /(?:const|let|var)\s+\w+\s*=\s*\[([\s\S]*?)\]/
    );
    if (arrayDeclMatch) {
      const arrayContent = arrayDeclMatch[1];
      const count = countParameterSets(arrayContent);
      if (count > 0) {
        return {
          count,
          hasParameters: true
        };
      }
    }
    return {
      count: 0,
      // Unknown
      hasParameters: true
    };
  }
  return null;
}
function countParameterSets(dataContent) {
  let count = 0;
  let inString = false;
  let stringChar = "";
  let braceDepth = 0;
  let bracketDepth = 0;
  for (let i = 0; i < dataContent.length; i++) {
    const char = dataContent[i];
    const prevChar = i > 0 ? dataContent[i - 1] : "";
    if ((char === '"' || char === "'" || char === "`") && prevChar !== "\\") {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
      continue;
    }
    if (inString) continue;
    if (char === "{" && bracketDepth === 0) {
      braceDepth++;
    } else if (char === "}" && bracketDepth === 0) {
      braceDepth--;
      if (braceDepth === 0) {
        count++;
      }
    } else if (char === "[") {
      bracketDepth++;
    } else if (char === "]") {
      bracketDepth--;
    }
  }
  return count;
}
function generateParameterizedTestName(baseName, paramIndex, paramCount) {
  return `${baseName} [${paramIndex + 1}/${paramCount}]`;
}

// src/core/frameworks/playwright.ts
var DESCRIBE_RE = /test\.describe(?:\.(?:serial|parallel|skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/g;
var TEST_RE = /(?:^|[ \t]+)test(?:\.(?:skip|only|fixme|slow))?\s*\(\s*(['"`])([\s\S]*?)\1/gm;
var INLINE_TAG_RE = /\{\s*tag\s*:\s*(?:(['"`])([@\w\-/]+)\2|\[([^\]]+)\])/g;
function parsePlaywrightSpec(filePath, content, projectRoot) {
  const relativePath = import_path2.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const describeBlocks = findDescribeBlocks(content, DESCRIBE_RE);
  const tests = [];
  let match;
  TEST_RE.lastIndex = 0;
  while ((match = TEST_RE.exec(content)) !== null) {
    const testName = match[2];
    const matchIndex = match.index;
    const line = lineNumberAt(content, matchIndex);
    const parentDescribe = resolveParentDescribe(describeBlocks, matchIndex);
    const tags = extractInlineTags(content, matchIndex);
    const paramData = extractParameterizedDataFromEach(content);
    if (paramData?.hasParameters) {
      tags.push({ name: "@parameterized" });
      if (paramData.count > 0) {
        for (let i = 0; i < paramData.count; i++) {
          const id2 = hashId(`${relativePath}::${parentDescribe ?? ""}::${testName}::${i}`);
          const expandedName = generateParameterizedTestName(testName, i, paramData.count);
          tests.push({
            id: id2,
            name: expandedName,
            fullName: parentDescribe ? `${parentDescribe} > ${expandedName}` : expandedName,
            describe: parentDescribe,
            tags,
            line
          });
        }
        continue;
      }
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
  const describeBlocks = findDescribeBlocks(content, DESCRIBE_RE);
  let match;
  TEST_RE.lastIndex = 0;
  while ((match = TEST_RE.exec(content)) !== null) {
    const testName = match[2];
    const parentDescribe = resolveParentDescribe(describeBlocks, match.index);
    names.push(parentDescribe ? `${parentDescribe} > ${testName}` : testName);
  }
  return names;
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

// src/core/frameworks/cypress.ts
var import_path3 = __toESM(require("path"));
var DESCRIBE_RE2 = /describe\s*\(\s*(['"`])([\s\S]*?)\1/g;
var TEST_RE2 = /(?:^|[ \t]+)(?:it|specify|test)\s*(?:\.(?:skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/gm;
function parseCypressSpec(filePath, content, projectRoot) {
  const relativePath = import_path3.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const describeBlocks = findDescribeBlocks(content, DESCRIBE_RE2);
  const tests = [];
  let match;
  TEST_RE2.lastIndex = 0;
  while ((match = TEST_RE2.exec(content)) !== null) {
    const testName = match[2];
    const matchIndex = match.index;
    const line = lineNumberAt(content, matchIndex);
    const parentDescribe = resolveParentDescribe(describeBlocks, matchIndex);
    const paramData = extractParameterizedDataFromForEach(content, testName);
    if (paramData?.hasParameters && paramData.count > 0) {
      for (let i = 0; i < paramData.count; i++) {
        const id2 = hashId(`${relativePath}::${parentDescribe ?? ""}::${testName}::${i}`);
        const expandedName = generateParameterizedTestName(testName, i, paramData.count);
        tests.push({
          id: id2,
          name: expandedName,
          fullName: parentDescribe ? `${parentDescribe} > ${expandedName}` : expandedName,
          describe: parentDescribe,
          tags: [{ name: "@parameterized" }],
          line
        });
      }
      continue;
    }
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
  const describeBlocks = findDescribeBlocks(content, DESCRIBE_RE2);
  let match;
  TEST_RE2.lastIndex = 0;
  while ((match = TEST_RE2.exec(content)) !== null) {
    const testName = match[2];
    const parentDescribe = resolveParentDescribe(describeBlocks, match.index);
    names.push(parentDescribe ? `${parentDescribe} > ${testName}` : testName);
  }
  return names;
}

// src/core/frameworks/vitest.ts
var import_path4 = __toESM(require("path"));
var DESCRIBE_RE3 = /describe\s*(?:\.(?:skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/g;
var TEST_RE3 = /(?:^|[ \t]+)(?:test|it)\s*(?:\.(?:skip|only|todo))?\s*\(\s*(['"`])([\s\S]*?)\1/gm;
function parseVitestSpec(filePath, content, projectRoot) {
  const relativePath = import_path4.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const describeBlocks = findDescribeBlocks(content, DESCRIBE_RE3);
  const tests = [];
  let match;
  TEST_RE3.lastIndex = 0;
  while ((match = TEST_RE3.exec(content)) !== null) {
    const testName = match[2];
    const matchIndex = match.index;
    const line = lineNumberAt(content, matchIndex);
    const parentDescribe = resolveParentDescribe(describeBlocks, matchIndex);
    const isTodo = /\.todo\s*\(/.test(content.substring(matchIndex, matchIndex + 50));
    const tags = isTodo ? [{ name: "@todo" }] : [];
    const paramData = extractParameterizedDataFromEach(content);
    if (paramData?.hasParameters) {
      tags.push({ name: "@parameterized" });
      if (paramData.count > 0) {
        for (let i = 0; i < paramData.count; i++) {
          const id2 = hashId(`${relativePath}::${parentDescribe ?? ""}::${testName}::${i}`);
          const expandedName = generateParameterizedTestName(testName, i, paramData.count);
          tests.push({
            id: id2,
            name: expandedName,
            fullName: parentDescribe ? `${parentDescribe} > ${expandedName}` : expandedName,
            describe: parentDescribe,
            tags,
            line
          });
        }
        continue;
      }
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
    name: import_path4.default.basename(filePath),
    framework: "vitest",
    tests,
    testCount: tests.length,
    lastModified: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function extractTestNames3(content) {
  const names = [];
  const describeBlocks = findDescribeBlocks(content, DESCRIBE_RE3);
  let match;
  TEST_RE3.lastIndex = 0;
  while ((match = TEST_RE3.exec(content)) !== null) {
    const testName = match[2];
    const parentDescribe = resolveParentDescribe(describeBlocks, match.index);
    names.push(parentDescribe ? `${parentDescribe} > ${testName}` : testName);
  }
  return names;
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

// src/git/history.ts
var import_simple_git = __toESM(require("simple-git"));
var import_path8 = __toESM(require("path"));

// src/core/frameworks/testDiff.ts
function levenshteinDistance(a, b) {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        // deletion
        matrix[j - 1][i] + 1,
        // insertion
        matrix[j - 1][i - 1] + cost
        // substitution
      );
    }
  }
  return matrix[b.length][a.length];
}
function normalizeTestName(name) {
  return name.toLowerCase().replace(/[_\-\s]+/g, " ").trim();
}
function calculateSimilarity(a, b) {
  const normA = normalizeTestName(a);
  const normB = normalizeTestName(b);
  if (normA === normB) return 1;
  const distance = levenshteinDistance(normA, normB);
  const maxLength = Math.max(normA.length, normB.length);
  if (maxLength === 0) return 1;
  return 1 - distance / maxLength;
}
function isSameTest(a, b) {
  const similarity = calculateSimilarity(a, b);
  return similarity > 0.85;
}

// src/git/history.ts
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
  const errors = [];
  const warnings = [];
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
      warnings.push(`Git log failed: ${error.message}`);
    }
    return { entries: [], errors, warnings };
  }
  const commits = [...logResult.all].reverse();
  const entries = [];
  for (const commit of commits) {
    try {
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
        projectPath,
        errors
      );
      if (specChanges.length === 0) continue;
      entries.push({
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
    } catch (error) {
      errors.push({
        commit: commit.hash,
        file: "unknown",
        reason: error instanceof Error ? error.message : "Unknown error",
        partial: true
      });
    }
  }
  return { entries, errors, warnings };
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
async function buildSpecChanges(git, hash, fileChanges, framework, projectPath, errors) {
  const entries = [];
  for (const change of fileChanges) {
    if (!isSpecFile(change.path)) continue;
    try {
      const entry = await buildSpecEntry(git, hash, change, framework, projectPath);
      if (entry) entries.push(entry);
    } catch (error) {
      errors.push({
        commit: hash,
        file: change.path,
        reason: error instanceof Error ? error.message : "Unknown error",
        partial: true
      });
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
      (addedName) => !matchedAdded.has(addedName) && isSameTest(removedName, addedName)
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

// src/sync-client.ts
async function getProjectSyncRecord(dashboardUrl, apiToken, projectId) {
  const url = new URL(`/api/projects/${projectId}/sync-record`, dashboardUrl).toString();
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
    return await response.json();
  } catch (error) {
    return null;
  }
}
async function saveProjectSyncRecord(dashboardUrl, apiToken, record) {
  const url = new URL(`/api/projects/${record.projectId}/sync-record`, dashboardUrl).toString();
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiToken}`
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(record)
  });
  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(
      `Failed to save sync record: ${response.status} ${response.statusText}${errorBody ? ` - ${errorBody}` : ""}`
    );
  }
}
async function updateProjectLastSyncCommit(dashboardUrl, apiToken, projectId, commitHash) {
  const url = new URL(`/api/projects/${projectId}/sync-record/last-sync`, dashboardUrl).toString();
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiToken}`
  };
  const response = await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ lastSyncCommit: commitHash })
  });
  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(
      `Failed to update sync record: ${response.status} ${response.statusText}${errorBody ? ` - ${errorBody}` : ""}`
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

// src/sync.ts
function getChangeKey(change, specPath) {
  const path9 = specPath ?? "";
  const oldName = change.oldName ?? "";
  return `${path9}:${change.type}:${change.name}:${oldName}`;
}
function deduplicateChanges(changes, specPath) {
  const seen = /* @__PURE__ */ new Set();
  const deduplicated = [];
  for (const change of changes) {
    const key = getChangeKey(change, specPath);
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(change);
    }
  }
  return deduplicated;
}
async function syncProject(options) {
  const { projectId, apiKey, dashboardUrl } = options;
  console.log("[sync] Detecting framework...");
  const detection = detectFramework(process.cwd());
  console.log(`[sync] Detected framework: ${detection.framework}`);
  console.log(`[sync] Test directory: ${detection.testDir}`);
  console.log("[sync] Parsing test specifications...");
  const specs = parseAllSpecs(process.cwd(), detection.testDir, detection.framework);
  console.log(`[sync] Found ${specs.length} spec files`);
  const totalTests = specs.reduce((sum, spec) => sum + spec.testCount, 0);
  console.log(`[sync] Total tests: ${totalTests}`);
  console.log("[sync] Checking sync status...");
  let syncRecord = null;
  let isFirstSync = false;
  try {
    syncRecord = await getProjectSyncRecord(dashboardUrl, apiKey, projectId);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`[sync] Warning: Could not retrieve sync record: ${error.message}`);
    }
  }
  isFirstSync = !syncRecord;
  if (isFirstSync) {
    console.log("[sync] First sync detected - creating baseline");
  } else {
    console.log(
      `[sync] Subsequent sync - last synced: ${syncRecord.lastSyncCommit.substring(0, 7)}`
    );
  }
  console.log("[sync] Building git history...");
  const sinceCommit = isFirstSync ? void 0 : syncRecord.lastSyncCommit;
  const history = await buildHistory(
    process.cwd(),
    detection.testDir,
    detection.framework,
    sinceCommit,
    false
    // never do full history anymore
  );
  console.log(`[sync] Built history for ${history.entries.length} commits`);
  if (history.errors.length > 0) {
    console.warn(`[sync] Warning: ${history.errors.length} commits had processing issues:`);
    history.errors.slice(0, 5).forEach((error) => {
      console.warn(`[sync]   - ${error.commit.substring(0, 7)}: ${error.file} (${error.reason})`);
    });
    if (history.errors.length > 5) {
      console.warn(`[sync]   ... and ${history.errors.length - 5} more`);
    }
  }
  if (history.warnings.length > 0) {
    history.warnings.forEach((warning) => {
      console.warn(`[sync] Warning: ${warning}`);
    });
  }
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
  console.log("[sync] Summary");
  console.log(`[sync] Specs: ${specs.length}`);
  console.log(`[sync] Tests: ${totalTests}`);
  console.log("[sync] Syncing to dashboard...");
  const transformedSpecs = specs.map((spec) => ({
    filePath: spec.path,
    framework: spec.framework,
    tests: spec.tests.map((test) => ({
      name: test.name,
      lineNumber: test.line,
      tags: test.tags.map((tag) => tag.name)
    }))
  }));
  const transformedHistory = history.entries.map((entry) => {
    const allChanges = [];
    for (const spec of entry.specs) {
      const deduplicatedChanges = deduplicateChanges(spec.changes, spec.specPath);
      for (const change of deduplicatedChanges) {
        allChanges.push({
          specPath: spec.specPath,
          testName: change.name,
          type: change.type,
          oldName: change.oldName
        });
      }
    }
    const seenKeys = /* @__PURE__ */ new Set();
    const uniqueChanges = allChanges.filter((change) => {
      const key = getChangeKey(
        {
          type: change.type,
          name: change.testName,
          oldName: change.oldName
        },
        change.specPath
      );
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
        type: change.type === "removed" ? "deleted" : change.type,
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
  console.log("[sync] Sync successful!");
  console.log(`[sync] Synced ${specs.length} specs with ${totalTests} tests`);
  try {
    let lastHash = null;
    if (history.entries.length > 0) {
      lastHash = history.entries[history.entries.length - 1].commit.hash;
    } else {
      lastHash = await getLatestCommitHash(process.cwd());
    }
    if (!lastHash) {
      console.log("[sync] Warning: Could not determine last commit hash");
      return;
    }
    if (isFirstSync) {
      const currentCommit = await getLatestCommitHash(process.cwd());
      if (!currentCommit) {
        throw new Error("Could not determine current commit for baseline");
      }
      const newRecord = {
        projectId,
        firstSyncDate: (/* @__PURE__ */ new Date()).toISOString(),
        firstSyncCommit: currentCommit,
        baselineStats: {
          totalTests,
          totalFiles: specs.length,
          tags
        },
        lastSyncCommit: lastHash,
        detectedFramework: detection.framework
      };
      await saveProjectSyncRecord(dashboardUrl, apiKey, newRecord);
      console.log(`[sync] Created baseline: ${specs.length} files, ${totalTests} tests`);
    } else {
      await updateProjectLastSyncCommit(dashboardUrl, apiKey, projectId, lastHash);
      console.log(`[sync] Updated sync marker: ${lastHash.substring(0, 7)}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`[sync] Warning: Could not save sync record: ${error.message}`);
    }
  }
}

// src/action.ts
async function run() {
  try {
    const apiKey = process.env["INPUT_API_KEY"];
    const projectId = process.env["INPUT_PROJECT_ID"];
    const dashboardUrl = process.env["INPUT_DASHBOARD_URL"];
    if (!apiKey) {
      throw new Error("api-key input is required");
    }
    if (!projectId) {
      throw new Error("project-id input is required");
    }
    console.log("[action] Starting Test Chronicle Agent...");
    console.log(`[action] Project ID: ${projectId}`);
    const options = {
      projectId,
      apiKey,
      dashboardUrl: dashboardUrl || "http://localhost:3000"
    };
    await syncProject(options);
    console.log("[action] Test Chronicle Agent sync completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("[action] Test Chronicle Agent failed:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
run();
//# sourceMappingURL=action.js.map