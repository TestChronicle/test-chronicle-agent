#!/usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 459:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

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

// src/cli.ts
var cli_exports = {};
__export(cli_exports, {
  cli: () => main
});
module.exports = __toCommonJS(cli_exports);
var import_dotenv = __nccwpck_require__(889);

// src/core/detector.ts
var import_fs = __nccwpck_require__(896);
var import_path = __toESM(__nccwpck_require__(928));
var import_glob = __nccwpck_require__(941);
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
var import_fs2 = __nccwpck_require__(896);
var import_path7 = __toESM(__nccwpck_require__(928));
var import_glob2 = __nccwpck_require__(941);

// src/core/frameworks/playwright.ts
var import_path2 = __toESM(__nccwpck_require__(928));

// src/core/frameworks/common.ts
var import_crypto = __nccwpck_require__(982);
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
var import_path3 = __toESM(__nccwpck_require__(928));
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
var import_path4 = __toESM(__nccwpck_require__(928));
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
var import_path5 = __toESM(__nccwpck_require__(928));
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
var import_path6 = __toESM(__nccwpck_require__(928));
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
var import_simple_git = __toESM(__nccwpck_require__(65));
var import_path8 = __toESM(__nccwpck_require__(928));

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

// src/cli.ts
(0, import_dotenv.config)({ path: ".env.local" });
async function main() {
  try {
    const projectId = process.env.CHRONICLE_PROJECT_ID;
    const apiKey = process.env.CHRONICLE_API_KEY;
    const dashboardUrl = process.env.CHRONICLE_DASHBOARD_URL || "http://localhost:3000";
    if (!projectId || !apiKey) {
      console.error("Error: CHRONICLE_PROJECT_ID and CHRONICLE_API_KEY are required");
      process.exit(1);
    }
    const options = {
      projectId,
      apiKey,
      dashboardUrl
    };
    await syncProject(options);
    process.exit(0);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Fatal error:", message);
    process.exit(1);
  }
}
if (require.main === require.cache[eval('__filename')]) {
  main();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);
//# sourceMappingURL=cli.js.map

/***/ }),

/***/ 117:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", ({ value: true }));
__export(__nccwpck_require__(972));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 972:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs_1 = __nccwpck_require__(896);
const debug_1 = __importDefault(__nccwpck_require__(830));
const log = debug_1.default('@kwsites/file-exists');
function check(path, isFile, isDirectory) {
    log(`checking %s`, path);
    try {
        const stat = fs_1.statSync(path);
        if (stat.isFile() && isFile) {
            log(`[OK] path represents a file`);
            return true;
        }
        if (stat.isDirectory() && isDirectory) {
            log(`[OK] path represents a directory`);
            return true;
        }
        log(`[FAIL] path represents something other than a file or directory`);
        return false;
    }
    catch (e) {
        if (e.code === 'ENOENT') {
            log(`[FAIL] path is not accessible: %o`, e);
            return false;
        }
        log(`[FATAL] %o`, e);
        throw e;
    }
}
/**
 * Synchronous validation of a path existing either as a file or as a directory.
 *
 * @param {string} path The path to check
 * @param {number} type One or both of the exported numeric constants
 */
function exists(path, type = exports.READABLE) {
    return check(path, (type & exports.FILE) > 0, (type & exports.FOLDER) > 0);
}
exports.exists = exists;
/**
 * Constant representing a file
 */
exports.FILE = 1;
/**
 * Constant representing a folder
 */
exports.FOLDER = 2;
/**
 * Constant representing either a file or a folder
 */
exports.READABLE = exports.FILE + exports.FOLDER;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 997:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createDeferred = exports.deferred = void 0;
/**
 * Creates a new `DeferredPromise`
 *
 * ```typescript
 import {deferred} from '@kwsites/promise-deferred`;
 ```
 */
function deferred() {
    let done;
    let fail;
    let status = 'pending';
    const promise = new Promise((_done, _fail) => {
        done = _done;
        fail = _fail;
    });
    return {
        promise,
        done(result) {
            if (status === 'pending') {
                status = 'resolved';
                done(result);
            }
        },
        fail(error) {
            if (status === 'pending') {
                status = 'rejected';
                fail(error);
            }
        },
        get fulfilled() {
            return status !== 'pending';
        },
        get status() {
            return status;
        },
    };
}
exports.deferred = deferred;
/**
 * Alias of the exported `deferred` function, to help consumers wanting to use `deferred` as the
 * local variable name rather than the factory import name, without needing to rename on import.
 *
 * ```typescript
 import {createDeferred} from '@kwsites/promise-deferred`;
 ```
 */
exports.createDeferred = deferred;
/**
 * Default export allows use as:
 *
 * ```typescript
 import deferred from '@kwsites/promise-deferred`;
 ```
 */
exports["default"] = deferred;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 110:
/***/ ((module, exports, __nccwpck_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	let m;

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	// eslint-disable-next-line no-return-assign
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug') || exports.storage.getItem('DEBUG') ;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __nccwpck_require__(897)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ 897:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __nccwpck_require__(744);
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		const split = (typeof namespaces === 'string' ? namespaces : '')
			.trim()
			.replace(/\s+/g, ',')
			.split(',')
			.filter(Boolean);

		for (const ns of split) {
			if (ns[0] === '-') {
				createDebug.skips.push(ns.slice(1));
			} else {
				createDebug.names.push(ns);
			}
		}
	}

	/**
	 * Checks if the given string matches a namespace template, honoring
	 * asterisks as wildcards.
	 *
	 * @param {String} search
	 * @param {String} template
	 * @return {Boolean}
	 */
	function matchesTemplate(search, template) {
		let searchIndex = 0;
		let templateIndex = 0;
		let starIndex = -1;
		let matchIndex = 0;

		while (searchIndex < search.length) {
			if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === '*')) {
				// Match character or proceed with wildcard
				if (template[templateIndex] === '*') {
					starIndex = templateIndex;
					matchIndex = searchIndex;
					templateIndex++; // Skip the '*'
				} else {
					searchIndex++;
					templateIndex++;
				}
			} else if (starIndex !== -1) { // eslint-disable-line no-negated-condition
				// Backtrack to the last '*' and try to match more characters
				templateIndex = starIndex + 1;
				matchIndex++;
				searchIndex = matchIndex;
			} else {
				return false; // No match
			}
		}

		// Handle trailing '*' in template
		while (templateIndex < template.length && template[templateIndex] === '*') {
			templateIndex++;
		}

		return templateIndex === template.length;
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names,
			...createDebug.skips.map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		for (const skip of createDebug.skips) {
			if (matchesTemplate(name, skip)) {
				return false;
			}
		}

		for (const ns of createDebug.names) {
			if (matchesTemplate(name, ns)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ 830:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __nccwpck_require__(110);
} else {
	module.exports = __nccwpck_require__(108);
}


/***/ }),

/***/ 108:
/***/ ((module, exports, __nccwpck_require__) => {

/**
 * Module dependencies.
 */

const tty = __nccwpck_require__(18);
const util = __nccwpck_require__(23);

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(
	() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
);

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __nccwpck_require__(456);

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __nccwpck_require__(897)(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ 889:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs = __nccwpck_require__(896)
const path = __nccwpck_require__(928)
const os = __nccwpck_require__(857)
const crypto = __nccwpck_require__(982)
const packageJson = __nccwpck_require__(56)

const version = packageJson.version

// Array of tips to display randomly
const TIPS = [
  '🔐 encrypt with Dotenvx: https://dotenvx.com',
  '🔐 prevent committing .env to code: https://dotenvx.com/precommit',
  '🔐 prevent building .env in docker: https://dotenvx.com/prebuild',
  '🤖 agentic secret storage: https://dotenvx.com/as2',
  '⚡️ secrets for agents: https://dotenvx.com/as2',
  '🛡️ auth for agents: https://vestauth.com',
  '🛠️  run anywhere with `dotenvx run -- yourcommand`',
  '⚙️  specify custom .env file path with { path: \'/custom/path/.env\' }',
  '⚙️  enable debug logging with { debug: true }',
  '⚙️  override existing env vars with { override: true }',
  '⚙️  suppress all logs with { quiet: true }',
  '⚙️  write to custom object with { processEnv: myObject }',
  '⚙️  load multiple .env files with { path: [\'.env.local\', \'.env\'] }'
]

// Get a random tip from the tips array
function _getRandomTip () {
  return TIPS[Math.floor(Math.random() * TIPS.length)]
}

function parseBoolean (value) {
  if (typeof value === 'string') {
    return !['false', '0', 'no', 'off', ''].includes(value.toLowerCase())
  }
  return Boolean(value)
}

function supportsAnsi () {
  return process.stdout.isTTY // && process.env.TERM !== 'dumb'
}

function dim (text) {
  return supportsAnsi() ? `\x1b[2m${text}\x1b[0m` : text
}

const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg

// Parse src into an Object
function parse (src) {
  const obj = {}

  // Convert buffer to string
  let lines = src.toString()

  // Convert line breaks to same format
  lines = lines.replace(/\r\n?/mg, '\n')

  let match
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1]

    // Default undefined or null to empty string
    let value = (match[2] || '')

    // Remove whitespace
    value = value.trim()

    // Check if double quoted
    const maybeQuote = value[0]

    // Remove surrounding quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/mg, '$2')

    // Expand newlines if double quoted
    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, '\n')
      value = value.replace(/\\r/g, '\r')
    }

    // Add to object
    obj[key] = value
  }

  return obj
}

function _parseVault (options) {
  options = options || {}

  const vaultPath = _vaultPath(options)
  options.path = vaultPath // parse .env.vault
  const result = DotenvModule.configDotenv(options)
  if (!result.parsed) {
    const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`)
    err.code = 'MISSING_DATA'
    throw err
  }

  // handle scenario for comma separated keys - for use with key rotation
  // example: DOTENV_KEY="dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=prod,dotenv://:key_7890@dotenvx.com/vault/.env.vault?environment=prod"
  const keys = _dotenvKey(options).split(',')
  const length = keys.length

  let decrypted
  for (let i = 0; i < length; i++) {
    try {
      // Get full key
      const key = keys[i].trim()

      // Get instructions for decrypt
      const attrs = _instructions(result, key)

      // Decrypt
      decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key)

      break
    } catch (error) {
      // last key
      if (i + 1 >= length) {
        throw error
      }
      // try next key
    }
  }

  // Parse decrypted .env string
  return DotenvModule.parse(decrypted)
}

function _warn (message) {
  console.error(`[dotenv@${version}][WARN] ${message}`)
}

function _debug (message) {
  console.log(`[dotenv@${version}][DEBUG] ${message}`)
}

function _log (message) {
  console.log(`[dotenv@${version}] ${message}`)
}

function _dotenvKey (options) {
  // prioritize developer directly setting options.DOTENV_KEY
  if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
    return options.DOTENV_KEY
  }

  // secondary infra already contains a DOTENV_KEY environment variable
  if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
    return process.env.DOTENV_KEY
  }

  // fallback to empty string
  return ''
}

function _instructions (result, dotenvKey) {
  // Parse DOTENV_KEY. Format is a URI
  let uri
  try {
    uri = new URL(dotenvKey)
  } catch (error) {
    if (error.code === 'ERR_INVALID_URL') {
      const err = new Error('INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development')
      err.code = 'INVALID_DOTENV_KEY'
      throw err
    }

    throw error
  }

  // Get decrypt key
  const key = uri.password
  if (!key) {
    const err = new Error('INVALID_DOTENV_KEY: Missing key part')
    err.code = 'INVALID_DOTENV_KEY'
    throw err
  }

  // Get environment
  const environment = uri.searchParams.get('environment')
  if (!environment) {
    const err = new Error('INVALID_DOTENV_KEY: Missing environment part')
    err.code = 'INVALID_DOTENV_KEY'
    throw err
  }

  // Get ciphertext payload
  const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`
  const ciphertext = result.parsed[environmentKey] // DOTENV_VAULT_PRODUCTION
  if (!ciphertext) {
    const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`)
    err.code = 'NOT_FOUND_DOTENV_ENVIRONMENT'
    throw err
  }

  return { ciphertext, key }
}

function _vaultPath (options) {
  let possibleVaultPath = null

  if (options && options.path && options.path.length > 0) {
    if (Array.isArray(options.path)) {
      for (const filepath of options.path) {
        if (fs.existsSync(filepath)) {
          possibleVaultPath = filepath.endsWith('.vault') ? filepath : `${filepath}.vault`
        }
      }
    } else {
      possibleVaultPath = options.path.endsWith('.vault') ? options.path : `${options.path}.vault`
    }
  } else {
    possibleVaultPath = path.resolve(process.cwd(), '.env.vault')
  }

  if (fs.existsSync(possibleVaultPath)) {
    return possibleVaultPath
  }

  return null
}

function _resolveHome (envPath) {
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}

function _configVault (options) {
  const debug = parseBoolean(process.env.DOTENV_CONFIG_DEBUG || (options && options.debug))
  const quiet = parseBoolean(process.env.DOTENV_CONFIG_QUIET || (options && options.quiet))

  if (debug || !quiet) {
    _log('Loading env from encrypted .env.vault')
  }

  const parsed = DotenvModule._parseVault(options)

  let processEnv = process.env
  if (options && options.processEnv != null) {
    processEnv = options.processEnv
  }

  DotenvModule.populate(processEnv, parsed, options)

  return { parsed }
}

function configDotenv (options) {
  const dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding = 'utf8'
  let processEnv = process.env
  if (options && options.processEnv != null) {
    processEnv = options.processEnv
  }
  let debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || (options && options.debug))
  let quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || (options && options.quiet))

  if (options && options.encoding) {
    encoding = options.encoding
  } else {
    if (debug) {
      _debug('No encoding is specified. UTF-8 is used by default')
    }
  }

  let optionPaths = [dotenvPath] // default, look for .env
  if (options && options.path) {
    if (!Array.isArray(options.path)) {
      optionPaths = [_resolveHome(options.path)]
    } else {
      optionPaths = [] // reset default
      for (const filepath of options.path) {
        optionPaths.push(_resolveHome(filepath))
      }
    }
  }

  // Build the parsed data in a temporary object (because we need to return it).  Once we have the final
  // parsed data, we will combine it with process.env (or options.processEnv if provided).
  let lastError
  const parsedAll = {}
  for (const path of optionPaths) {
    try {
      // Specifying an encoding returns a string instead of a buffer
      const parsed = DotenvModule.parse(fs.readFileSync(path, { encoding }))

      DotenvModule.populate(parsedAll, parsed, options)
    } catch (e) {
      if (debug) {
        _debug(`Failed to load ${path} ${e.message}`)
      }
      lastError = e
    }
  }

  const populated = DotenvModule.populate(processEnv, parsedAll, options)

  // handle user settings DOTENV_CONFIG_ options inside .env file(s)
  debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || debug)
  quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || quiet)

  if (debug || !quiet) {
    const keysCount = Object.keys(populated).length
    const shortPaths = []
    for (const filePath of optionPaths) {
      try {
        const relative = path.relative(process.cwd(), filePath)
        shortPaths.push(relative)
      } catch (e) {
        if (debug) {
          _debug(`Failed to load ${filePath} ${e.message}`)
        }
        lastError = e
      }
    }

    _log(`injecting env (${keysCount}) from ${shortPaths.join(',')} ${dim(`-- tip: ${_getRandomTip()}`)}`)
  }

  if (lastError) {
    return { parsed: parsedAll, error: lastError }
  } else {
    return { parsed: parsedAll }
  }
}

// Populates process.env from .env file
function config (options) {
  // fallback to original dotenv if DOTENV_KEY is not set
  if (_dotenvKey(options).length === 0) {
    return DotenvModule.configDotenv(options)
  }

  const vaultPath = _vaultPath(options)

  // dotenvKey exists but .env.vault file does not exist
  if (!vaultPath) {
    _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`)

    return DotenvModule.configDotenv(options)
  }

  return DotenvModule._configVault(options)
}

function decrypt (encrypted, keyStr) {
  const key = Buffer.from(keyStr.slice(-64), 'hex')
  let ciphertext = Buffer.from(encrypted, 'base64')

  const nonce = ciphertext.subarray(0, 12)
  const authTag = ciphertext.subarray(-16)
  ciphertext = ciphertext.subarray(12, -16)

  try {
    const aesgcm = crypto.createDecipheriv('aes-256-gcm', key, nonce)
    aesgcm.setAuthTag(authTag)
    return `${aesgcm.update(ciphertext)}${aesgcm.final()}`
  } catch (error) {
    const isRange = error instanceof RangeError
    const invalidKeyLength = error.message === 'Invalid key length'
    const decryptionFailed = error.message === 'Unsupported state or unable to authenticate data'

    if (isRange || invalidKeyLength) {
      const err = new Error('INVALID_DOTENV_KEY: It must be 64 characters long (or more)')
      err.code = 'INVALID_DOTENV_KEY'
      throw err
    } else if (decryptionFailed) {
      const err = new Error('DECRYPTION_FAILED: Please check your DOTENV_KEY')
      err.code = 'DECRYPTION_FAILED'
      throw err
    } else {
      throw error
    }
  }
}

// Populate process.env with parsed values
function populate (processEnv, parsed, options = {}) {
  const debug = Boolean(options && options.debug)
  const override = Boolean(options && options.override)
  const populated = {}

  if (typeof parsed !== 'object') {
    const err = new Error('OBJECT_REQUIRED: Please check the processEnv argument being passed to populate')
    err.code = 'OBJECT_REQUIRED'
    throw err
  }

  // Set process.env
  for (const key of Object.keys(parsed)) {
    if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
      if (override === true) {
        processEnv[key] = parsed[key]
        populated[key] = parsed[key]
      }

      if (debug) {
        if (override === true) {
          _debug(`"${key}" is already defined and WAS overwritten`)
        } else {
          _debug(`"${key}" is already defined and was NOT overwritten`)
        }
      }
    } else {
      processEnv[key] = parsed[key]
      populated[key] = parsed[key]
    }
  }

  return populated
}

const DotenvModule = {
  configDotenv,
  _configVault,
  _parseVault,
  config,
  decrypt,
  parse,
  populate
}

module.exports.configDotenv = DotenvModule.configDotenv
module.exports._configVault = DotenvModule._configVault
module.exports._parseVault = DotenvModule._parseVault
module.exports.config = DotenvModule.config
module.exports.decrypt = DotenvModule.decrypt
module.exports.parse = DotenvModule.parse
module.exports.populate = DotenvModule.populate

module.exports = DotenvModule


/***/ }),

/***/ 744:
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ 65:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// src/lib/errors/git-error.ts
var GitError;
var init_git_error = __esm({
  "src/lib/errors/git-error.ts"() {
    "use strict";
    GitError = class extends Error {
      constructor(task, message) {
        super(message);
        this.task = task;
        Object.setPrototypeOf(this, new.target.prototype);
      }
    };
  }
});

// src/lib/errors/git-response-error.ts
var GitResponseError;
var init_git_response_error = __esm({
  "src/lib/errors/git-response-error.ts"() {
    "use strict";
    init_git_error();
    GitResponseError = class extends GitError {
      constructor(git, message) {
        super(void 0, message || String(git));
        this.git = git;
      }
    };
  }
});

// src/lib/args/pathspec.ts
function pathspec(...paths) {
  const key = new String(paths);
  cache.set(key, paths);
  return key;
}
function isPathSpec(path) {
  return path instanceof String && cache.has(path);
}
function toPaths(pathSpec) {
  return cache.get(pathSpec) || [];
}
var cache;
var init_pathspec = __esm({
  "src/lib/args/pathspec.ts"() {
    "use strict";
    cache = /* @__PURE__ */ new WeakMap();
  }
});

// src/lib/errors/git-construct-error.ts
var GitConstructError;
var init_git_construct_error = __esm({
  "src/lib/errors/git-construct-error.ts"() {
    "use strict";
    init_git_error();
    GitConstructError = class extends GitError {
      constructor(config, message) {
        super(void 0, message);
        this.config = config;
      }
    };
  }
});

// src/lib/errors/git-plugin-error.ts
var GitPluginError;
var init_git_plugin_error = __esm({
  "src/lib/errors/git-plugin-error.ts"() {
    "use strict";
    init_git_error();
    GitPluginError = class extends GitError {
      constructor(task, plugin, message) {
        super(task, message);
        this.task = task;
        this.plugin = plugin;
        Object.setPrototypeOf(this, new.target.prototype);
      }
    };
  }
});

// src/lib/errors/task-configuration-error.ts
var TaskConfigurationError;
var init_task_configuration_error = __esm({
  "src/lib/errors/task-configuration-error.ts"() {
    "use strict";
    init_git_error();
    TaskConfigurationError = class extends GitError {
      constructor(message) {
        super(void 0, message);
      }
    };
  }
});

// src/lib/utils/util.ts
function asFunction(source) {
  if (typeof source !== "function") {
    return NOOP;
  }
  return source;
}
function isUserFunction(source) {
  return typeof source === "function" && source !== NOOP;
}
function splitOn(input, char) {
  const index = input.indexOf(char);
  if (index <= 0) {
    return [input, ""];
  }
  return [input.substr(0, index), input.substr(index + 1)];
}
function first(input, offset = 0) {
  return isArrayLike(input) && input.length > offset ? input[offset] : void 0;
}
function last(input, offset = 0) {
  if (isArrayLike(input) && input.length > offset) {
    return input[input.length - 1 - offset];
  }
}
function isArrayLike(input) {
  return filterHasLength(input);
}
function toLinesWithContent(input = "", trimmed2 = true, separator = "\n") {
  return input.split(separator).reduce((output, line) => {
    const lineContent = trimmed2 ? line.trim() : line;
    if (lineContent) {
      output.push(lineContent);
    }
    return output;
  }, []);
}
function forEachLineWithContent(input, callback) {
  return toLinesWithContent(input, true).map((line) => callback(line));
}
function folderExists(path) {
  return (0, import_file_exists.exists)(path, import_file_exists.FOLDER);
}
function append(target, item) {
  if (Array.isArray(target)) {
    if (!target.includes(item)) {
      target.push(item);
    }
  } else {
    target.add(item);
  }
  return item;
}
function including(target, item) {
  if (Array.isArray(target) && !target.includes(item)) {
    target.push(item);
  }
  return target;
}
function remove(target, item) {
  if (Array.isArray(target)) {
    const index = target.indexOf(item);
    if (index >= 0) {
      target.splice(index, 1);
    }
  } else {
    target.delete(item);
  }
  return item;
}
function asArray(source) {
  return Array.isArray(source) ? source : [source];
}
function asCamelCase(str) {
  return str.replace(/[\s-]+(.)/g, (_all, chr) => {
    return chr.toUpperCase();
  });
}
function asStringArray(source) {
  return asArray(source).map((item) => {
    return item instanceof String ? item : String(item);
  });
}
function asNumber(source, onNaN = 0) {
  if (source == null) {
    return onNaN;
  }
  const num = parseInt(source, 10);
  return Number.isNaN(num) ? onNaN : num;
}
function prefixedArray(input, prefix) {
  const output = [];
  for (let i = 0, max = input.length; i < max; i++) {
    output.push(prefix, input[i]);
  }
  return output;
}
function bufferToString(input) {
  return (Array.isArray(input) ? import_node_buffer.Buffer.concat(input) : input).toString("utf-8");
}
function pick(source, properties) {
  const out = {};
  properties.forEach((key) => {
    if (source[key] !== void 0) {
      out[key] = source[key];
    }
  });
  return out;
}
function delay(duration = 0) {
  return new Promise((done) => setTimeout(done, duration));
}
function orVoid(input) {
  if (input === false) {
    return void 0;
  }
  return input;
}
var import_node_buffer, import_file_exists, NULL, NOOP, objectToString;
var init_util = __esm({
  "src/lib/utils/util.ts"() {
    "use strict";
    import_node_buffer = __nccwpck_require__(573);
    import_file_exists = __nccwpck_require__(117);
    init_argument_filters();
    NULL = "\0";
    NOOP = () => {
    };
    objectToString = Object.prototype.toString.call.bind(Object.prototype.toString);
  }
});

// src/lib/utils/argument-filters.ts
function filterType(input, filter, def) {
  if (filter(input)) {
    return input;
  }
  return arguments.length > 2 ? def : void 0;
}
function filterPrimitives(input, omit) {
  const type = isPathSpec(input) ? "string" : typeof input;
  return /number|string|boolean/.test(type) && (!omit || !omit.includes(type));
}
function filterPlainObject(input) {
  return !!input && objectToString(input) === "[object Object]";
}
function filterFunction(input) {
  return typeof input === "function";
}
var filterArray, filterNumber, filterString, filterStringOrStringArray, filterHasLength;
var init_argument_filters = __esm({
  "src/lib/utils/argument-filters.ts"() {
    "use strict";
    init_pathspec();
    init_util();
    filterArray = (input) => {
      return Array.isArray(input);
    };
    filterNumber = (input) => {
      return typeof input === "number";
    };
    filterString = (input) => {
      return typeof input === "string" || isPathSpec(input);
    };
    filterStringOrStringArray = (input) => {
      return filterString(input) || Array.isArray(input) && input.every(filterString);
    };
    filterHasLength = (input) => {
      if (input == null || "number|boolean|function".includes(typeof input)) {
        return false;
      }
      return typeof input.length === "number";
    };
  }
});

// src/lib/utils/exit-codes.ts
var ExitCodes;
var init_exit_codes = __esm({
  "src/lib/utils/exit-codes.ts"() {
    "use strict";
    ExitCodes = /* @__PURE__ */ ((ExitCodes2) => {
      ExitCodes2[ExitCodes2["SUCCESS"] = 0] = "SUCCESS";
      ExitCodes2[ExitCodes2["ERROR"] = 1] = "ERROR";
      ExitCodes2[ExitCodes2["NOT_FOUND"] = -2] = "NOT_FOUND";
      ExitCodes2[ExitCodes2["UNCLEAN"] = 128] = "UNCLEAN";
      return ExitCodes2;
    })(ExitCodes || {});
  }
});

// src/lib/utils/git-output-streams.ts
var GitOutputStreams;
var init_git_output_streams = __esm({
  "src/lib/utils/git-output-streams.ts"() {
    "use strict";
    GitOutputStreams = class _GitOutputStreams {
      constructor(stdOut, stdErr) {
        this.stdOut = stdOut;
        this.stdErr = stdErr;
      }
      asStrings() {
        return new _GitOutputStreams(this.stdOut.toString("utf8"), this.stdErr.toString("utf8"));
      }
    };
  }
});

// src/lib/utils/line-parser.ts
function useMatchesDefault() {
  throw new Error(`LineParser:useMatches not implemented`);
}
var LineParser, RemoteLineParser;
var init_line_parser = __esm({
  "src/lib/utils/line-parser.ts"() {
    "use strict";
    LineParser = class {
      constructor(regExp, useMatches) {
        this.matches = [];
        this.useMatches = useMatchesDefault;
        this.parse = (line, target) => {
          this.resetMatches();
          if (!this._regExp.every((reg, index) => this.addMatch(reg, index, line(index)))) {
            return false;
          }
          return this.useMatches(target, this.prepareMatches()) !== false;
        };
        this._regExp = Array.isArray(regExp) ? regExp : [regExp];
        if (useMatches) {
          this.useMatches = useMatches;
        }
      }
      resetMatches() {
        this.matches.length = 0;
      }
      prepareMatches() {
        return this.matches;
      }
      addMatch(reg, index, line) {
        const matched = line && reg.exec(line);
        if (matched) {
          this.pushMatch(index, matched);
        }
        return !!matched;
      }
      pushMatch(_index, matched) {
        this.matches.push(...matched.slice(1));
      }
    };
    RemoteLineParser = class extends LineParser {
      addMatch(reg, index, line) {
        return /^remote:\s/.test(String(line)) && super.addMatch(reg, index, line);
      }
      pushMatch(index, matched) {
        if (index > 0 || matched.length > 1) {
          super.pushMatch(index, matched);
        }
      }
    };
  }
});

// src/lib/utils/simple-git-options.ts
function createInstanceConfig(...options) {
  const baseDir = process.cwd();
  const config = Object.assign(
    { baseDir, ...defaultOptions },
    ...options.filter((o) => typeof o === "object" && o)
  );
  config.baseDir = config.baseDir || baseDir;
  config.trimmed = config.trimmed === true;
  return config;
}
var defaultOptions;
var init_simple_git_options = __esm({
  "src/lib/utils/simple-git-options.ts"() {
    "use strict";
    defaultOptions = {
      binary: "git",
      maxConcurrentProcesses: 5,
      config: [],
      trimmed: false
    };
  }
});

// src/lib/utils/task-options.ts
function appendTaskOptions(options, commands = []) {
  if (!filterPlainObject(options)) {
    return commands;
  }
  return Object.keys(options).reduce((commands2, key) => {
    const value = options[key];
    if (isPathSpec(value)) {
      commands2.push(value);
    } else if (filterPrimitives(value, ["boolean"])) {
      commands2.push(key + "=" + value);
    } else if (Array.isArray(value)) {
      for (const v of value) {
        if (!filterPrimitives(v, ["string", "number"])) {
          commands2.push(key + "=" + v);
        }
      }
    } else {
      commands2.push(key);
    }
    return commands2;
  }, commands);
}
function getTrailingOptions(args, initialPrimitive = 0, objectOnly = false) {
  const command = [];
  for (let i = 0, max = initialPrimitive < 0 ? args.length : initialPrimitive; i < max; i++) {
    if ("string|number".includes(typeof args[i])) {
      command.push(String(args[i]));
    }
  }
  appendTaskOptions(trailingOptionsArgument(args), command);
  if (!objectOnly) {
    command.push(...trailingArrayArgument(args));
  }
  return command;
}
function trailingArrayArgument(args) {
  const hasTrailingCallback = typeof last(args) === "function";
  return asStringArray(filterType(last(args, hasTrailingCallback ? 1 : 0), filterArray, []));
}
function trailingOptionsArgument(args) {
  const hasTrailingCallback = filterFunction(last(args));
  return filterType(last(args, hasTrailingCallback ? 1 : 0), filterPlainObject);
}
function trailingFunctionArgument(args, includeNoop = true) {
  const callback = asFunction(last(args));
  return includeNoop || isUserFunction(callback) ? callback : void 0;
}
var init_task_options = __esm({
  "src/lib/utils/task-options.ts"() {
    "use strict";
    init_argument_filters();
    init_util();
    init_pathspec();
  }
});

// src/lib/utils/task-parser.ts
function callTaskParser(parser4, streams) {
  return parser4(streams.stdOut, streams.stdErr);
}
function parseStringResponse(result, parsers12, texts, trim = true) {
  asArray(texts).forEach((text) => {
    for (let lines = toLinesWithContent(text, trim), i = 0, max = lines.length; i < max; i++) {
      const line = (offset = 0) => {
        if (i + offset >= max) {
          return;
        }
        return lines[i + offset];
      };
      parsers12.some(({ parse }) => parse(line, result));
    }
  });
  return result;
}
var init_task_parser = __esm({
  "src/lib/utils/task-parser.ts"() {
    "use strict";
    init_util();
  }
});

// src/lib/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  ExitCodes: () => ExitCodes,
  GitOutputStreams: () => GitOutputStreams,
  LineParser: () => LineParser,
  NOOP: () => NOOP,
  NULL: () => NULL,
  RemoteLineParser: () => RemoteLineParser,
  append: () => append,
  appendTaskOptions: () => appendTaskOptions,
  asArray: () => asArray,
  asCamelCase: () => asCamelCase,
  asFunction: () => asFunction,
  asNumber: () => asNumber,
  asStringArray: () => asStringArray,
  bufferToString: () => bufferToString,
  callTaskParser: () => callTaskParser,
  createInstanceConfig: () => createInstanceConfig,
  delay: () => delay,
  filterArray: () => filterArray,
  filterFunction: () => filterFunction,
  filterHasLength: () => filterHasLength,
  filterNumber: () => filterNumber,
  filterPlainObject: () => filterPlainObject,
  filterPrimitives: () => filterPrimitives,
  filterString: () => filterString,
  filterStringOrStringArray: () => filterStringOrStringArray,
  filterType: () => filterType,
  first: () => first,
  folderExists: () => folderExists,
  forEachLineWithContent: () => forEachLineWithContent,
  getTrailingOptions: () => getTrailingOptions,
  including: () => including,
  isUserFunction: () => isUserFunction,
  last: () => last,
  objectToString: () => objectToString,
  orVoid: () => orVoid,
  parseStringResponse: () => parseStringResponse,
  pick: () => pick,
  prefixedArray: () => prefixedArray,
  remove: () => remove,
  splitOn: () => splitOn,
  toLinesWithContent: () => toLinesWithContent,
  trailingFunctionArgument: () => trailingFunctionArgument,
  trailingOptionsArgument: () => trailingOptionsArgument
});
var init_utils = __esm({
  "src/lib/utils/index.ts"() {
    "use strict";
    init_argument_filters();
    init_exit_codes();
    init_git_output_streams();
    init_line_parser();
    init_simple_git_options();
    init_task_options();
    init_task_parser();
    init_util();
  }
});

// src/lib/tasks/check-is-repo.ts
var check_is_repo_exports = {};
__export(check_is_repo_exports, {
  CheckRepoActions: () => CheckRepoActions,
  checkIsBareRepoTask: () => checkIsBareRepoTask,
  checkIsRepoRootTask: () => checkIsRepoRootTask,
  checkIsRepoTask: () => checkIsRepoTask
});
function checkIsRepoTask(action) {
  switch (action) {
    case "bare" /* BARE */:
      return checkIsBareRepoTask();
    case "root" /* IS_REPO_ROOT */:
      return checkIsRepoRootTask();
  }
  const commands = ["rev-parse", "--is-inside-work-tree"];
  return {
    commands,
    format: "utf-8",
    onError,
    parser
  };
}
function checkIsRepoRootTask() {
  const commands = ["rev-parse", "--git-dir"];
  return {
    commands,
    format: "utf-8",
    onError,
    parser(path) {
      return /^\.(git)?$/.test(path.trim());
    }
  };
}
function checkIsBareRepoTask() {
  const commands = ["rev-parse", "--is-bare-repository"];
  return {
    commands,
    format: "utf-8",
    onError,
    parser
  };
}
function isNotRepoMessage(error) {
  return /(Not a git repository|Kein Git-Repository)/i.test(String(error));
}
var CheckRepoActions, onError, parser;
var init_check_is_repo = __esm({
  "src/lib/tasks/check-is-repo.ts"() {
    "use strict";
    init_utils();
    CheckRepoActions = /* @__PURE__ */ ((CheckRepoActions2) => {
      CheckRepoActions2["BARE"] = "bare";
      CheckRepoActions2["IN_TREE"] = "tree";
      CheckRepoActions2["IS_REPO_ROOT"] = "root";
      return CheckRepoActions2;
    })(CheckRepoActions || {});
    onError = ({ exitCode }, error, done, fail) => {
      if (exitCode === 128 /* UNCLEAN */ && isNotRepoMessage(error)) {
        return done(Buffer.from("false"));
      }
      fail(error);
    };
    parser = (text) => {
      return text.trim() === "true";
    };
  }
});

// src/lib/responses/CleanSummary.ts
function cleanSummaryParser(dryRun, text) {
  const summary = new CleanResponse(dryRun);
  const regexp = dryRun ? dryRunRemovalRegexp : removalRegexp;
  toLinesWithContent(text).forEach((line) => {
    const removed = line.replace(regexp, "");
    summary.paths.push(removed);
    (isFolderRegexp.test(removed) ? summary.folders : summary.files).push(removed);
  });
  return summary;
}
var CleanResponse, removalRegexp, dryRunRemovalRegexp, isFolderRegexp;
var init_CleanSummary = __esm({
  "src/lib/responses/CleanSummary.ts"() {
    "use strict";
    init_utils();
    CleanResponse = class {
      constructor(dryRun) {
        this.dryRun = dryRun;
        this.paths = [];
        this.files = [];
        this.folders = [];
      }
    };
    removalRegexp = /^[a-z]+\s*/i;
    dryRunRemovalRegexp = /^[a-z]+\s+[a-z]+\s*/i;
    isFolderRegexp = /\/$/;
  }
});

// src/lib/tasks/task.ts
var task_exports = {};
__export(task_exports, {
  EMPTY_COMMANDS: () => EMPTY_COMMANDS,
  adhocExecTask: () => adhocExecTask,
  configurationErrorTask: () => configurationErrorTask,
  isBufferTask: () => isBufferTask,
  isEmptyTask: () => isEmptyTask,
  straightThroughBufferTask: () => straightThroughBufferTask,
  straightThroughStringTask: () => straightThroughStringTask
});
function adhocExecTask(parser4) {
  return {
    commands: EMPTY_COMMANDS,
    format: "empty",
    parser: parser4
  };
}
function configurationErrorTask(error) {
  return {
    commands: EMPTY_COMMANDS,
    format: "empty",
    parser() {
      throw typeof error === "string" ? new TaskConfigurationError(error) : error;
    }
  };
}
function straightThroughStringTask(commands, trimmed2 = false) {
  return {
    commands,
    format: "utf-8",
    parser(text) {
      return trimmed2 ? String(text).trim() : text;
    }
  };
}
function straightThroughBufferTask(commands) {
  return {
    commands,
    format: "buffer",
    parser(buffer) {
      return buffer;
    }
  };
}
function isBufferTask(task) {
  return task.format === "buffer";
}
function isEmptyTask(task) {
  return task.format === "empty" || !task.commands.length;
}
var EMPTY_COMMANDS;
var init_task = __esm({
  "src/lib/tasks/task.ts"() {
    "use strict";
    init_task_configuration_error();
    EMPTY_COMMANDS = [];
  }
});

// src/lib/tasks/clean.ts
var clean_exports = {};
__export(clean_exports, {
  CONFIG_ERROR_INTERACTIVE_MODE: () => CONFIG_ERROR_INTERACTIVE_MODE,
  CONFIG_ERROR_MODE_REQUIRED: () => CONFIG_ERROR_MODE_REQUIRED,
  CONFIG_ERROR_UNKNOWN_OPTION: () => CONFIG_ERROR_UNKNOWN_OPTION,
  CleanOptions: () => CleanOptions,
  cleanTask: () => cleanTask,
  cleanWithOptionsTask: () => cleanWithOptionsTask,
  isCleanOptionsArray: () => isCleanOptionsArray
});
function cleanWithOptionsTask(mode, customArgs) {
  const { cleanMode, options, valid } = getCleanOptions(mode);
  if (!cleanMode) {
    return configurationErrorTask(CONFIG_ERROR_MODE_REQUIRED);
  }
  if (!valid.options) {
    return configurationErrorTask(CONFIG_ERROR_UNKNOWN_OPTION + JSON.stringify(mode));
  }
  options.push(...customArgs);
  if (options.some(isInteractiveMode)) {
    return configurationErrorTask(CONFIG_ERROR_INTERACTIVE_MODE);
  }
  return cleanTask(cleanMode, options);
}
function cleanTask(mode, customArgs) {
  const commands = ["clean", `-${mode}`, ...customArgs];
  return {
    commands,
    format: "utf-8",
    parser(text) {
      return cleanSummaryParser(mode === "n" /* DRY_RUN */, text);
    }
  };
}
function isCleanOptionsArray(input) {
  return Array.isArray(input) && input.every((test) => CleanOptionValues.has(test));
}
function getCleanOptions(input) {
  let cleanMode;
  let options = [];
  let valid = { cleanMode: false, options: true };
  input.replace(/[^a-z]i/g, "").split("").forEach((char) => {
    if (isCleanMode(char)) {
      cleanMode = char;
      valid.cleanMode = true;
    } else {
      valid.options = valid.options && isKnownOption(options[options.length] = `-${char}`);
    }
  });
  return {
    cleanMode,
    options,
    valid
  };
}
function isCleanMode(cleanMode) {
  return cleanMode === "f" /* FORCE */ || cleanMode === "n" /* DRY_RUN */;
}
function isKnownOption(option) {
  return /^-[a-z]$/i.test(option) && CleanOptionValues.has(option.charAt(1));
}
function isInteractiveMode(option) {
  if (/^-[^\-]/.test(option)) {
    return option.indexOf("i") > 0;
  }
  return option === "--interactive";
}
var CONFIG_ERROR_INTERACTIVE_MODE, CONFIG_ERROR_MODE_REQUIRED, CONFIG_ERROR_UNKNOWN_OPTION, CleanOptions, CleanOptionValues;
var init_clean = __esm({
  "src/lib/tasks/clean.ts"() {
    "use strict";
    init_CleanSummary();
    init_utils();
    init_task();
    CONFIG_ERROR_INTERACTIVE_MODE = "Git clean interactive mode is not supported";
    CONFIG_ERROR_MODE_REQUIRED = 'Git clean mode parameter ("n" or "f") is required';
    CONFIG_ERROR_UNKNOWN_OPTION = "Git clean unknown option found in: ";
    CleanOptions = /* @__PURE__ */ ((CleanOptions2) => {
      CleanOptions2["DRY_RUN"] = "n";
      CleanOptions2["FORCE"] = "f";
      CleanOptions2["IGNORED_INCLUDED"] = "x";
      CleanOptions2["IGNORED_ONLY"] = "X";
      CleanOptions2["EXCLUDING"] = "e";
      CleanOptions2["QUIET"] = "q";
      CleanOptions2["RECURSIVE"] = "d";
      return CleanOptions2;
    })(CleanOptions || {});
    CleanOptionValues = /* @__PURE__ */ new Set([
      "i",
      ...asStringArray(Object.values(CleanOptions))
    ]);
  }
});

// src/lib/responses/ConfigList.ts
function configListParser(text) {
  const config = new ConfigList();
  for (const item of configParser(text)) {
    config.addValue(item.file, String(item.key), item.value);
  }
  return config;
}
function configGetParser(text, key) {
  let value = null;
  const values = [];
  const scopes = /* @__PURE__ */ new Map();
  for (const item of configParser(text, key)) {
    if (item.key !== key) {
      continue;
    }
    values.push(value = item.value);
    if (!scopes.has(item.file)) {
      scopes.set(item.file, []);
    }
    scopes.get(item.file).push(value);
  }
  return {
    key,
    paths: Array.from(scopes.keys()),
    scopes,
    value,
    values
  };
}
function configFilePath(filePath) {
  return filePath.replace(/^(file):/, "");
}
function* configParser(text, requestedKey = null) {
  const lines = text.split("\0");
  for (let i = 0, max = lines.length - 1; i < max; ) {
    const file = configFilePath(lines[i++]);
    let value = lines[i++];
    let key = requestedKey;
    if (value.includes("\n")) {
      const line = splitOn(value, "\n");
      key = line[0];
      value = line[1];
    }
    yield { file, key, value };
  }
}
var ConfigList;
var init_ConfigList = __esm({
  "src/lib/responses/ConfigList.ts"() {
    "use strict";
    init_utils();
    ConfigList = class {
      constructor() {
        this.files = [];
        this.values = /* @__PURE__ */ Object.create(null);
      }
      get all() {
        if (!this._all) {
          this._all = this.files.reduce((all, file) => {
            return Object.assign(all, this.values[file]);
          }, {});
        }
        return this._all;
      }
      addFile(file) {
        if (!(file in this.values)) {
          const latest = last(this.files);
          this.values[file] = latest ? Object.create(this.values[latest]) : {};
          this.files.push(file);
        }
        return this.values[file];
      }
      addValue(file, key, value) {
        const values = this.addFile(file);
        if (!Object.hasOwn(values, key)) {
          values[key] = value;
        } else if (Array.isArray(values[key])) {
          values[key].push(value);
        } else {
          values[key] = [values[key], value];
        }
        this._all = void 0;
      }
    };
  }
});

// src/lib/tasks/config.ts
function asConfigScope(scope, fallback) {
  if (typeof scope === "string" && Object.hasOwn(GitConfigScope, scope)) {
    return scope;
  }
  return fallback;
}
function addConfigTask(key, value, append2, scope) {
  const commands = ["config", `--${scope}`];
  if (append2) {
    commands.push("--add");
  }
  commands.push(key, value);
  return {
    commands,
    format: "utf-8",
    parser(text) {
      return text;
    }
  };
}
function getConfigTask(key, scope) {
  const commands = ["config", "--null", "--show-origin", "--get-all", key];
  if (scope) {
    commands.splice(1, 0, `--${scope}`);
  }
  return {
    commands,
    format: "utf-8",
    parser(text) {
      return configGetParser(text, key);
    }
  };
}
function listConfigTask(scope) {
  const commands = ["config", "--list", "--show-origin", "--null"];
  if (scope) {
    commands.push(`--${scope}`);
  }
  return {
    commands,
    format: "utf-8",
    parser(text) {
      return configListParser(text);
    }
  };
}
function config_default() {
  return {
    addConfig(key, value, ...rest) {
      return this._runTask(
        addConfigTask(
          key,
          value,
          rest[0] === true,
          asConfigScope(rest[1], "local" /* local */)
        ),
        trailingFunctionArgument(arguments)
      );
    },
    getConfig(key, scope) {
      return this._runTask(
        getConfigTask(key, asConfigScope(scope, void 0)),
        trailingFunctionArgument(arguments)
      );
    },
    listConfig(...rest) {
      return this._runTask(
        listConfigTask(asConfigScope(rest[0], void 0)),
        trailingFunctionArgument(arguments)
      );
    }
  };
}
var GitConfigScope;
var init_config = __esm({
  "src/lib/tasks/config.ts"() {
    "use strict";
    init_ConfigList();
    init_utils();
    GitConfigScope = /* @__PURE__ */ ((GitConfigScope2) => {
      GitConfigScope2["system"] = "system";
      GitConfigScope2["global"] = "global";
      GitConfigScope2["local"] = "local";
      GitConfigScope2["worktree"] = "worktree";
      return GitConfigScope2;
    })(GitConfigScope || {});
  }
});

// src/lib/tasks/diff-name-status.ts
function isDiffNameStatus(input) {
  return diffNameStatus.has(input);
}
var DiffNameStatus, diffNameStatus;
var init_diff_name_status = __esm({
  "src/lib/tasks/diff-name-status.ts"() {
    "use strict";
    DiffNameStatus = /* @__PURE__ */ ((DiffNameStatus2) => {
      DiffNameStatus2["ADDED"] = "A";
      DiffNameStatus2["COPIED"] = "C";
      DiffNameStatus2["DELETED"] = "D";
      DiffNameStatus2["MODIFIED"] = "M";
      DiffNameStatus2["RENAMED"] = "R";
      DiffNameStatus2["CHANGED"] = "T";
      DiffNameStatus2["UNMERGED"] = "U";
      DiffNameStatus2["UNKNOWN"] = "X";
      DiffNameStatus2["BROKEN"] = "B";
      return DiffNameStatus2;
    })(DiffNameStatus || {});
    diffNameStatus = new Set(Object.values(DiffNameStatus));
  }
});

// src/lib/tasks/grep.ts
function grepQueryBuilder(...params) {
  return new GrepQuery().param(...params);
}
function parseGrep(grep) {
  const paths = /* @__PURE__ */ new Set();
  const results = {};
  forEachLineWithContent(grep, (input) => {
    const [path, line, preview] = input.split(NULL);
    paths.add(path);
    (results[path] = results[path] || []).push({
      line: asNumber(line),
      path,
      preview
    });
  });
  return {
    paths,
    results
  };
}
function grep_default() {
  return {
    grep(searchTerm) {
      const then = trailingFunctionArgument(arguments);
      const options = getTrailingOptions(arguments);
      for (const option of disallowedOptions) {
        if (options.includes(option)) {
          return this._runTask(
            configurationErrorTask(`git.grep: use of "${option}" is not supported.`),
            then
          );
        }
      }
      if (typeof searchTerm === "string") {
        searchTerm = grepQueryBuilder().param(searchTerm);
      }
      const commands = ["grep", "--null", "-n", "--full-name", ...options, ...searchTerm];
      return this._runTask(
        {
          commands,
          format: "utf-8",
          parser(stdOut) {
            return parseGrep(stdOut);
          }
        },
        then
      );
    }
  };
}
var disallowedOptions, Query, _a, GrepQuery;
var init_grep = __esm({
  "src/lib/tasks/grep.ts"() {
    "use strict";
    init_utils();
    init_task();
    disallowedOptions = ["-h"];
    Query = Symbol("grepQuery");
    GrepQuery = class {
      constructor() {
        this[_a] = [];
      }
      *[(_a = Query, Symbol.iterator)]() {
        for (const query of this[Query]) {
          yield query;
        }
      }
      and(...and) {
        and.length && this[Query].push("--and", "(", ...prefixedArray(and, "-e"), ")");
        return this;
      }
      param(...param) {
        this[Query].push(...prefixedArray(param, "-e"));
        return this;
      }
    };
  }
});

// src/lib/tasks/reset.ts
var reset_exports = {};
__export(reset_exports, {
  ResetMode: () => ResetMode,
  getResetMode: () => getResetMode,
  resetTask: () => resetTask
});
function resetTask(mode, customArgs) {
  const commands = ["reset"];
  if (isValidResetMode(mode)) {
    commands.push(`--${mode}`);
  }
  commands.push(...customArgs);
  return straightThroughStringTask(commands);
}
function getResetMode(mode) {
  if (isValidResetMode(mode)) {
    return mode;
  }
  switch (typeof mode) {
    case "string":
    case "undefined":
      return "soft" /* SOFT */;
  }
  return;
}
function isValidResetMode(mode) {
  return typeof mode === "string" && validResetModes.includes(mode);
}
var ResetMode, validResetModes;
var init_reset = __esm({
  "src/lib/tasks/reset.ts"() {
    "use strict";
    init_utils();
    init_task();
    ResetMode = /* @__PURE__ */ ((ResetMode2) => {
      ResetMode2["MIXED"] = "mixed";
      ResetMode2["SOFT"] = "soft";
      ResetMode2["HARD"] = "hard";
      ResetMode2["MERGE"] = "merge";
      ResetMode2["KEEP"] = "keep";
      return ResetMode2;
    })(ResetMode || {});
    validResetModes = asStringArray(Object.values(ResetMode));
  }
});

// src/lib/api.ts
var api_exports = {};
__export(api_exports, {
  CheckRepoActions: () => CheckRepoActions,
  CleanOptions: () => CleanOptions,
  DiffNameStatus: () => DiffNameStatus,
  GitConfigScope: () => GitConfigScope,
  GitConstructError: () => GitConstructError,
  GitError: () => GitError,
  GitPluginError: () => GitPluginError,
  GitResponseError: () => GitResponseError,
  ResetMode: () => ResetMode,
  TaskConfigurationError: () => TaskConfigurationError,
  grepQueryBuilder: () => grepQueryBuilder,
  pathspec: () => pathspec
});
var init_api = __esm({
  "src/lib/api.ts"() {
    "use strict";
    init_pathspec();
    init_git_construct_error();
    init_git_error();
    init_git_plugin_error();
    init_git_response_error();
    init_task_configuration_error();
    init_check_is_repo();
    init_clean();
    init_config();
    init_diff_name_status();
    init_grep();
    init_reset();
  }
});

// src/lib/plugins/abort-plugin.ts
function abortPlugin(signal) {
  if (!signal) {
    return;
  }
  const onSpawnAfter = {
    type: "spawn.after",
    action(_data, context) {
      function kill() {
        context.kill(new GitPluginError(void 0, "abort", "Abort signal received"));
      }
      signal.addEventListener("abort", kill);
      context.spawned.on("close", () => signal.removeEventListener("abort", kill));
    }
  };
  const onSpawnBefore = {
    type: "spawn.before",
    action(_data, context) {
      if (signal.aborted) {
        context.kill(new GitPluginError(void 0, "abort", "Abort already signaled"));
      }
    }
  };
  return [onSpawnBefore, onSpawnAfter];
}
var init_abort_plugin = __esm({
  "src/lib/plugins/abort-plugin.ts"() {
    "use strict";
    init_git_plugin_error();
  }
});

// src/lib/plugins/block-unsafe-operations-plugin.ts
function isConfigSwitch(arg) {
  return typeof arg === "string" && arg.trim().toLowerCase() === "-c";
}
function isCloneUploadPackSwitch(char, arg) {
  if (typeof arg !== "string" || !arg.includes(char)) {
    return false;
  }
  const cleaned = arg.trim().replace(/\0/g, "");
  return /^(--no)?-{1,2}[\dlsqvnobucj]+(\s|$)/.test(cleaned);
}
function preventConfigBuilder(config, setting, message = String(config)) {
  const regex = typeof config === "string" ? new RegExp(`\\s*${config}`, "i") : config;
  return function preventCommand(options, arg, next) {
    if (options[setting] !== true && isConfigSwitch(arg) && regex.test(next)) {
      throw new GitPluginError(
        void 0,
        "unsafe",
        `Configuring ${message} is not permitted without enabling ${setting}`
      );
    }
  };
}
function preventUploadPack(arg, method) {
  if (/^\s*--(upload|receive)-pack/.test(arg)) {
    throw new GitPluginError(
      void 0,
      "unsafe",
      `Use of --upload-pack or --receive-pack is not permitted without enabling allowUnsafePack`
    );
  }
  if (method === "clone" && isCloneUploadPackSwitch("u", arg)) {
    throw new GitPluginError(
      void 0,
      "unsafe",
      `Use of clone with option -u is not permitted without enabling allowUnsafePack`
    );
  }
  if (method === "push" && /^\s*--exec\b/.test(arg)) {
    throw new GitPluginError(
      void 0,
      "unsafe",
      `Use of push with option --exec is not permitted without enabling allowUnsafePack`
    );
  }
}
function blockUnsafeOperationsPlugin({
  allowUnsafePack = false,
  ...options
} = {}) {
  return {
    type: "spawn.args",
    action(args, context) {
      args.forEach((current, index) => {
        const next = index < args.length ? args[index + 1] : "";
        allowUnsafePack || preventUploadPack(current, context.method);
        preventUnsafeConfig.forEach((helper) => helper(options, current, next));
      });
      return args;
    }
  };
}
var preventUnsafeConfig;
var init_block_unsafe_operations_plugin = __esm({
  "src/lib/plugins/block-unsafe-operations-plugin.ts"() {
    "use strict";
    init_git_plugin_error();
    preventUnsafeConfig = [
      preventConfigBuilder(
        /^\s*protocol(.[a-z]+)?.allow/i,
        "allowUnsafeProtocolOverride",
        "protocol.allow"
      ),
      preventConfigBuilder("core.sshCommand", "allowUnsafeSshCommand"),
      preventConfigBuilder("core.gitProxy", "allowUnsafeGitProxy"),
      preventConfigBuilder("core.hooksPath", "allowUnsafeHooksPath"),
      preventConfigBuilder("diff.external", "allowUnsafeDiffExternal")
    ];
  }
});

// src/lib/plugins/command-config-prefixing-plugin.ts
function commandConfigPrefixingPlugin(configuration) {
  const prefix = prefixedArray(configuration, "-c");
  return {
    type: "spawn.args",
    action(data) {
      return [...prefix, ...data];
    }
  };
}
var init_command_config_prefixing_plugin = __esm({
  "src/lib/plugins/command-config-prefixing-plugin.ts"() {
    "use strict";
    init_utils();
  }
});

// src/lib/plugins/completion-detection.plugin.ts
function completionDetectionPlugin({
  onClose = true,
  onExit = 50
} = {}) {
  function createEvents() {
    let exitCode = -1;
    const events = {
      close: (0, import_promise_deferred.deferred)(),
      closeTimeout: (0, import_promise_deferred.deferred)(),
      exit: (0, import_promise_deferred.deferred)(),
      exitTimeout: (0, import_promise_deferred.deferred)()
    };
    const result = Promise.race([
      onClose === false ? never : events.closeTimeout.promise,
      onExit === false ? never : events.exitTimeout.promise
    ]);
    configureTimeout(onClose, events.close, events.closeTimeout);
    configureTimeout(onExit, events.exit, events.exitTimeout);
    return {
      close(code) {
        exitCode = code;
        events.close.done();
      },
      exit(code) {
        exitCode = code;
        events.exit.done();
      },
      get exitCode() {
        return exitCode;
      },
      result
    };
  }
  function configureTimeout(flag, event, timeout) {
    if (flag === false) {
      return;
    }
    (flag === true ? event.promise : event.promise.then(() => delay(flag))).then(timeout.done);
  }
  return {
    type: "spawn.after",
    async action(_data, { spawned, close }) {
      const events = createEvents();
      let deferClose = true;
      let quickClose = () => void (deferClose = false);
      spawned.stdout?.on("data", quickClose);
      spawned.stderr?.on("data", quickClose);
      spawned.on("error", quickClose);
      spawned.on("close", (code) => events.close(code));
      spawned.on("exit", (code) => events.exit(code));
      try {
        await events.result;
        if (deferClose) {
          await delay(50);
        }
        close(events.exitCode);
      } catch (err) {
        close(events.exitCode, err);
      }
    }
  };
}
var import_promise_deferred, never;
var init_completion_detection_plugin = __esm({
  "src/lib/plugins/completion-detection.plugin.ts"() {
    "use strict";
    import_promise_deferred = __nccwpck_require__(997);
    init_utils();
    never = (0, import_promise_deferred.deferred)().promise;
  }
});

// src/lib/plugins/custom-binary.plugin.ts
function isBadArgument(arg) {
  return !arg || !/^([a-z]:)?([a-z0-9/.\\_~-]+)$/i.test(arg);
}
function toBinaryConfig(input, allowUnsafe) {
  if (input.length < 1 || input.length > 2) {
    throw new GitPluginError(void 0, "binary", WRONG_NUMBER_ERR);
  }
  const isBad = input.some(isBadArgument);
  if (isBad) {
    if (allowUnsafe) {
      console.warn(WRONG_CHARS_ERR);
    } else {
      throw new GitPluginError(void 0, "binary", WRONG_CHARS_ERR);
    }
  }
  const [binary, prefix] = input;
  return {
    binary,
    prefix
  };
}
function customBinaryPlugin(plugins, input = ["git"], allowUnsafe = false) {
  let config = toBinaryConfig(asArray(input), allowUnsafe);
  plugins.on("binary", (input2) => {
    config = toBinaryConfig(asArray(input2), allowUnsafe);
  });
  plugins.append("spawn.binary", () => {
    return config.binary;
  });
  plugins.append("spawn.args", (data) => {
    return config.prefix ? [config.prefix, ...data] : data;
  });
}
var WRONG_NUMBER_ERR, WRONG_CHARS_ERR;
var init_custom_binary_plugin = __esm({
  "src/lib/plugins/custom-binary.plugin.ts"() {
    "use strict";
    init_git_plugin_error();
    init_utils();
    WRONG_NUMBER_ERR = `Invalid value supplied for custom binary, requires a single string or an array containing either one or two strings`;
    WRONG_CHARS_ERR = `Invalid value supplied for custom binary, restricted characters must be removed or supply the unsafe.allowUnsafeCustomBinary option`;
  }
});

// src/lib/plugins/error-detection.plugin.ts
function isTaskError(result) {
  return !!(result.exitCode && result.stdErr.length);
}
function getErrorMessage(result) {
  return Buffer.concat([...result.stdOut, ...result.stdErr]);
}
function errorDetectionHandler(overwrite = false, isError = isTaskError, errorMessage = getErrorMessage) {
  return (error, result) => {
    if (!overwrite && error || !isError(result)) {
      return error;
    }
    return errorMessage(result);
  };
}
function errorDetectionPlugin(config) {
  return {
    type: "task.error",
    action(data, context) {
      const error = config(data.error, {
        stdErr: context.stdErr,
        stdOut: context.stdOut,
        exitCode: context.exitCode
      });
      if (Buffer.isBuffer(error)) {
        return { error: new GitError(void 0, error.toString("utf-8")) };
      }
      return {
        error
      };
    }
  };
}
var init_error_detection_plugin = __esm({
  "src/lib/plugins/error-detection.plugin.ts"() {
    "use strict";
    init_git_error();
  }
});

// src/lib/plugins/plugin-store.ts
var import_node_events, PluginStore;
var init_plugin_store = __esm({
  "src/lib/plugins/plugin-store.ts"() {
    "use strict";
    import_node_events = __nccwpck_require__(474);
    init_utils();
    PluginStore = class {
      constructor() {
        this.plugins = /* @__PURE__ */ new Set();
        this.events = new import_node_events.EventEmitter();
      }
      on(type, listener) {
        this.events.on(type, listener);
      }
      reconfigure(type, data) {
        this.events.emit(type, data);
      }
      append(type, action) {
        const plugin = append(this.plugins, { type, action });
        return () => this.plugins.delete(plugin);
      }
      add(plugin) {
        const plugins = [];
        asArray(plugin).forEach((plugin2) => plugin2 && this.plugins.add(append(plugins, plugin2)));
        return () => {
          plugins.forEach((plugin2) => this.plugins.delete(plugin2));
        };
      }
      exec(type, data, context) {
        let output = data;
        const contextual = Object.freeze(Object.create(context));
        for (const plugin of this.plugins) {
          if (plugin.type === type) {
            output = plugin.action(output, contextual);
          }
        }
        return output;
      }
    };
  }
});

// src/lib/plugins/progress-monitor-plugin.ts
function progressMonitorPlugin(progress) {
  const progressCommand = "--progress";
  const progressMethods = ["checkout", "clone", "fetch", "pull", "push"];
  const onProgress = {
    type: "spawn.after",
    action(_data, context) {
      if (!context.commands.includes(progressCommand)) {
        return;
      }
      context.spawned.stderr?.on("data", (chunk) => {
        const message = /^([\s\S]+?):\s*(\d+)% \((\d+)\/(\d+)\)/.exec(chunk.toString("utf8"));
        if (!message) {
          return;
        }
        progress({
          method: context.method,
          stage: progressEventStage(message[1]),
          progress: asNumber(message[2]),
          processed: asNumber(message[3]),
          total: asNumber(message[4])
        });
      });
    }
  };
  const onArgs = {
    type: "spawn.args",
    action(args, context) {
      if (!progressMethods.includes(context.method)) {
        return args;
      }
      return including(args, progressCommand);
    }
  };
  return [onArgs, onProgress];
}
function progressEventStage(input) {
  return String(input.toLowerCase().split(" ", 1)) || "unknown";
}
var init_progress_monitor_plugin = __esm({
  "src/lib/plugins/progress-monitor-plugin.ts"() {
    "use strict";
    init_utils();
  }
});

// src/lib/plugins/simple-git-plugin.ts
var init_simple_git_plugin = __esm({
  "src/lib/plugins/simple-git-plugin.ts"() {
    "use strict";
  }
});

// src/lib/plugins/spawn-options-plugin.ts
function spawnOptionsPlugin(spawnOptions) {
  const options = pick(spawnOptions, ["uid", "gid"]);
  return {
    type: "spawn.options",
    action(data) {
      return { ...options, ...data };
    }
  };
}
var init_spawn_options_plugin = __esm({
  "src/lib/plugins/spawn-options-plugin.ts"() {
    "use strict";
    init_utils();
  }
});

// src/lib/plugins/timout-plugin.ts
function timeoutPlugin({
  block,
  stdErr = true,
  stdOut = true
}) {
  if (block > 0) {
    return {
      type: "spawn.after",
      action(_data, context) {
        let timeout;
        function wait() {
          timeout && clearTimeout(timeout);
          timeout = setTimeout(kill, block);
        }
        function stop() {
          context.spawned.stdout?.off("data", wait);
          context.spawned.stderr?.off("data", wait);
          context.spawned.off("exit", stop);
          context.spawned.off("close", stop);
          timeout && clearTimeout(timeout);
        }
        function kill() {
          stop();
          context.kill(new GitPluginError(void 0, "timeout", `block timeout reached`));
        }
        stdOut && context.spawned.stdout?.on("data", wait);
        stdErr && context.spawned.stderr?.on("data", wait);
        context.spawned.on("exit", stop);
        context.spawned.on("close", stop);
        wait();
      }
    };
  }
}
var init_timout_plugin = __esm({
  "src/lib/plugins/timout-plugin.ts"() {
    "use strict";
    init_git_plugin_error();
  }
});

// src/lib/plugins/index.ts
var init_plugins = __esm({
  "src/lib/plugins/index.ts"() {
    "use strict";
    init_abort_plugin();
    init_block_unsafe_operations_plugin();
    init_command_config_prefixing_plugin();
    init_completion_detection_plugin();
    init_custom_binary_plugin();
    init_error_detection_plugin();
    init_plugin_store();
    init_progress_monitor_plugin();
    init_simple_git_plugin();
    init_spawn_options_plugin();
    init_timout_plugin();
  }
});

// src/lib/plugins/suffix-paths.plugin.ts
function suffixPathsPlugin() {
  return {
    type: "spawn.args",
    action(data) {
      const prefix = [];
      let suffix;
      function append2(args) {
        (suffix = suffix || []).push(...args);
      }
      for (let i = 0; i < data.length; i++) {
        const param = data[i];
        if (isPathSpec(param)) {
          append2(toPaths(param));
          continue;
        }
        if (param === "--") {
          append2(
            data.slice(i + 1).flatMap((item) => isPathSpec(item) && toPaths(item) || item)
          );
          break;
        }
        prefix.push(param);
      }
      return !suffix ? prefix : [...prefix, "--", ...suffix.map(String)];
    }
  };
}
var init_suffix_paths_plugin = __esm({
  "src/lib/plugins/suffix-paths.plugin.ts"() {
    "use strict";
    init_pathspec();
  }
});

// src/lib/git-logger.ts
function createLog() {
  return (0, import_debug.default)("simple-git");
}
function prefixedLogger(to, prefix, forward) {
  if (!prefix || !String(prefix).replace(/\s*/, "")) {
    return !forward ? to : (message, ...args) => {
      to(message, ...args);
      forward(message, ...args);
    };
  }
  return (message, ...args) => {
    to(`%s ${message}`, prefix, ...args);
    if (forward) {
      forward(message, ...args);
    }
  };
}
function childLoggerName(name, childDebugger, { namespace: parentNamespace }) {
  if (typeof name === "string") {
    return name;
  }
  const childNamespace = childDebugger && childDebugger.namespace || "";
  if (childNamespace.startsWith(parentNamespace)) {
    return childNamespace.substr(parentNamespace.length + 1);
  }
  return childNamespace || parentNamespace;
}
function createLogger(label, verbose, initialStep, infoDebugger = createLog()) {
  const labelPrefix = label && `[${label}]` || "";
  const spawned = [];
  const debugDebugger = typeof verbose === "string" ? infoDebugger.extend(verbose) : verbose;
  const key = childLoggerName(filterType(verbose, filterString), debugDebugger, infoDebugger);
  return step(initialStep);
  function sibling(name, initial) {
    return append(
      spawned,
      createLogger(label, key.replace(/^[^:]+/, name), initial, infoDebugger)
    );
  }
  function step(phase) {
    const stepPrefix = phase && `[${phase}]` || "";
    const debug2 = debugDebugger && prefixedLogger(debugDebugger, stepPrefix) || NOOP;
    const info = prefixedLogger(infoDebugger, `${labelPrefix} ${stepPrefix}`, debug2);
    return Object.assign(debugDebugger ? debug2 : info, {
      label,
      sibling,
      info,
      step
    });
  }
}
var import_debug;
var init_git_logger = __esm({
  "src/lib/git-logger.ts"() {
    "use strict";
    import_debug = __toESM(__nccwpck_require__(830));
    init_utils();
    import_debug.default.formatters.L = (value) => String(filterHasLength(value) ? value.length : "-");
    import_debug.default.formatters.B = (value) => {
      if (Buffer.isBuffer(value)) {
        return value.toString("utf8");
      }
      return objectToString(value);
    };
  }
});

// src/lib/runners/tasks-pending-queue.ts
var TasksPendingQueue;
var init_tasks_pending_queue = __esm({
  "src/lib/runners/tasks-pending-queue.ts"() {
    "use strict";
    init_git_error();
    init_git_logger();
    TasksPendingQueue = class _TasksPendingQueue {
      constructor(logLabel = "GitExecutor") {
        this.logLabel = logLabel;
        this._queue = /* @__PURE__ */ new Map();
      }
      withProgress(task) {
        return this._queue.get(task);
      }
      createProgress(task) {
        const name = _TasksPendingQueue.getName(task.commands[0]);
        const logger = createLogger(this.logLabel, name);
        return {
          task,
          logger,
          name
        };
      }
      push(task) {
        const progress = this.createProgress(task);
        progress.logger("Adding task to the queue, commands = %o", task.commands);
        this._queue.set(task, progress);
        return progress;
      }
      fatal(err) {
        for (const [task, { logger }] of Array.from(this._queue.entries())) {
          if (task === err.task) {
            logger.info(`Failed %o`, err);
            logger(
              `Fatal exception, any as-yet un-started tasks run through this executor will not be attempted`
            );
          } else {
            logger.info(
              `A fatal exception occurred in a previous task, the queue has been purged: %o`,
              err.message
            );
          }
          this.complete(task);
        }
        if (this._queue.size !== 0) {
          throw new Error(`Queue size should be zero after fatal: ${this._queue.size}`);
        }
      }
      complete(task) {
        const progress = this.withProgress(task);
        if (progress) {
          this._queue.delete(task);
        }
      }
      attempt(task) {
        const progress = this.withProgress(task);
        if (!progress) {
          throw new GitError(void 0, "TasksPendingQueue: attempt called for an unknown task");
        }
        progress.logger("Starting task");
        return progress;
      }
      static getName(name = "empty") {
        return `task:${name}:${++_TasksPendingQueue.counter}`;
      }
      static {
        this.counter = 0;
      }
    };
  }
});

// src/lib/runners/git-executor-chain.ts
function pluginContext(task, commands) {
  return {
    method: first(task.commands) || "",
    commands
  };
}
function onErrorReceived(target, logger) {
  return (err) => {
    logger(`[ERROR] child process exception %o`, err);
    target.push(Buffer.from(String(err.stack), "ascii"));
  };
}
function onDataReceived(target, name, logger, output) {
  return (buffer) => {
    logger(`%s received %L bytes`, name, buffer);
    output(`%B`, buffer);
    target.push(buffer);
  };
}
var import_child_process, GitExecutorChain;
var init_git_executor_chain = __esm({
  "src/lib/runners/git-executor-chain.ts"() {
    "use strict";
    import_child_process = __nccwpck_require__(317);
    init_git_error();
    init_task();
    init_utils();
    init_tasks_pending_queue();
    GitExecutorChain = class {
      constructor(_executor, _scheduler, _plugins) {
        this._executor = _executor;
        this._scheduler = _scheduler;
        this._plugins = _plugins;
        this._chain = Promise.resolve();
        this._queue = new TasksPendingQueue();
      }
      get cwd() {
        return this._cwd || this._executor.cwd;
      }
      set cwd(cwd) {
        this._cwd = cwd;
      }
      get env() {
        return this._executor.env;
      }
      get outputHandler() {
        return this._executor.outputHandler;
      }
      chain() {
        return this;
      }
      push(task) {
        this._queue.push(task);
        return this._chain = this._chain.then(() => this.attemptTask(task));
      }
      async attemptTask(task) {
        const onScheduleComplete = await this._scheduler.next();
        const onQueueComplete = () => this._queue.complete(task);
        try {
          const { logger } = this._queue.attempt(task);
          return await (isEmptyTask(task) ? this.attemptEmptyTask(task, logger) : this.attemptRemoteTask(task, logger));
        } catch (e) {
          throw this.onFatalException(task, e);
        } finally {
          onQueueComplete();
          onScheduleComplete();
        }
      }
      onFatalException(task, e) {
        const gitError = e instanceof GitError ? Object.assign(e, { task }) : new GitError(task, e && String(e));
        this._chain = Promise.resolve();
        this._queue.fatal(gitError);
        return gitError;
      }
      async attemptRemoteTask(task, logger) {
        const binary = this._plugins.exec("spawn.binary", "", pluginContext(task, task.commands));
        const args = this._plugins.exec(
          "spawn.args",
          [...task.commands],
          pluginContext(task, task.commands)
        );
        const raw = await this.gitResponse(
          task,
          binary,
          args,
          this.outputHandler,
          logger.step("SPAWN")
        );
        const outputStreams = await this.handleTaskData(task, args, raw, logger.step("HANDLE"));
        logger(`passing response to task's parser as a %s`, task.format);
        if (isBufferTask(task)) {
          return callTaskParser(task.parser, outputStreams);
        }
        return callTaskParser(task.parser, outputStreams.asStrings());
      }
      async attemptEmptyTask(task, logger) {
        logger(`empty task bypassing child process to call to task's parser`);
        return task.parser(this);
      }
      handleTaskData(task, args, result, logger) {
        const { exitCode, rejection, stdOut, stdErr } = result;
        return new Promise((done, fail) => {
          logger(`Preparing to handle process response exitCode=%d stdOut=`, exitCode);
          const { error } = this._plugins.exec(
            "task.error",
            { error: rejection },
            {
              ...pluginContext(task, args),
              ...result
            }
          );
          if (error && task.onError) {
            logger.info(`exitCode=%s handling with custom error handler`);
            return task.onError(
              result,
              error,
              (newStdOut) => {
                logger.info(`custom error handler treated as success`);
                logger(`custom error returned a %s`, objectToString(newStdOut));
                done(
                  new GitOutputStreams(
                    Array.isArray(newStdOut) ? Buffer.concat(newStdOut) : newStdOut,
                    Buffer.concat(stdErr)
                  )
                );
              },
              fail
            );
          }
          if (error) {
            logger.info(
              `handling as error: exitCode=%s stdErr=%s rejection=%o`,
              exitCode,
              stdErr.length,
              rejection
            );
            return fail(error);
          }
          logger.info(`retrieving task output complete`);
          done(new GitOutputStreams(Buffer.concat(stdOut), Buffer.concat(stdErr)));
        });
      }
      async gitResponse(task, command, args, outputHandler, logger) {
        const outputLogger = logger.sibling("output");
        const spawnOptions = this._plugins.exec(
          "spawn.options",
          {
            cwd: this.cwd,
            env: this.env,
            windowsHide: true
          },
          pluginContext(task, task.commands)
        );
        return new Promise((done) => {
          const stdOut = [];
          const stdErr = [];
          logger.info(`%s %o`, command, args);
          logger("%O", spawnOptions);
          let rejection = this._beforeSpawn(task, args);
          if (rejection) {
            return done({
              stdOut,
              stdErr,
              exitCode: 9901,
              rejection
            });
          }
          this._plugins.exec("spawn.before", void 0, {
            ...pluginContext(task, args),
            kill(reason) {
              rejection = reason || rejection;
            }
          });
          const spawned = (0, import_child_process.spawn)(command, args, spawnOptions);
          spawned.stdout.on(
            "data",
            onDataReceived(stdOut, "stdOut", logger, outputLogger.step("stdOut"))
          );
          spawned.stderr.on(
            "data",
            onDataReceived(stdErr, "stdErr", logger, outputLogger.step("stdErr"))
          );
          spawned.on("error", onErrorReceived(stdErr, logger));
          if (outputHandler) {
            logger(`Passing child process stdOut/stdErr to custom outputHandler`);
            outputHandler(command, spawned.stdout, spawned.stderr, [...args]);
          }
          this._plugins.exec("spawn.after", void 0, {
            ...pluginContext(task, args),
            spawned,
            close(exitCode, reason) {
              done({
                stdOut,
                stdErr,
                exitCode,
                rejection: rejection || reason
              });
            },
            kill(reason) {
              if (spawned.killed) {
                return;
              }
              rejection = reason;
              spawned.kill("SIGINT");
            }
          });
        });
      }
      _beforeSpawn(task, args) {
        let rejection;
        this._plugins.exec("spawn.before", void 0, {
          ...pluginContext(task, args),
          kill(reason) {
            rejection = reason || rejection;
          }
        });
        return rejection;
      }
    };
  }
});

// src/lib/runners/git-executor.ts
var git_executor_exports = {};
__export(git_executor_exports, {
  GitExecutor: () => GitExecutor
});
var GitExecutor;
var init_git_executor = __esm({
  "src/lib/runners/git-executor.ts"() {
    "use strict";
    init_git_executor_chain();
    GitExecutor = class {
      constructor(cwd, _scheduler, _plugins) {
        this.cwd = cwd;
        this._scheduler = _scheduler;
        this._plugins = _plugins;
        this._chain = new GitExecutorChain(this, this._scheduler, this._plugins);
      }
      chain() {
        return new GitExecutorChain(this, this._scheduler, this._plugins);
      }
      push(task) {
        return this._chain.push(task);
      }
    };
  }
});

// src/lib/task-callback.ts
function taskCallback(task, response, callback = NOOP) {
  const onSuccess = (data) => {
    callback(null, data);
  };
  const onError2 = (err) => {
    if (err?.task === task) {
      callback(
        err instanceof GitResponseError ? addDeprecationNoticeToError(err) : err,
        void 0
      );
    }
  };
  response.then(onSuccess, onError2);
}
function addDeprecationNoticeToError(err) {
  let log = (name) => {
    console.warn(
      `simple-git deprecation notice: accessing GitResponseError.${name} should be GitResponseError.git.${name}, this will no longer be available in version 3`
    );
    log = NOOP;
  };
  return Object.create(err, Object.getOwnPropertyNames(err.git).reduce(descriptorReducer, {}));
  function descriptorReducer(all, name) {
    if (name in err) {
      return all;
    }
    all[name] = {
      enumerable: false,
      configurable: false,
      get() {
        log(name);
        return err.git[name];
      }
    };
    return all;
  }
}
var init_task_callback = __esm({
  "src/lib/task-callback.ts"() {
    "use strict";
    init_git_response_error();
    init_utils();
  }
});

// src/lib/tasks/change-working-directory.ts
function changeWorkingDirectoryTask(directory, root) {
  return adhocExecTask((instance) => {
    if (!folderExists(directory)) {
      throw new Error(`Git.cwd: cannot change to non-directory "${directory}"`);
    }
    return (root || instance).cwd = directory;
  });
}
var init_change_working_directory = __esm({
  "src/lib/tasks/change-working-directory.ts"() {
    "use strict";
    init_utils();
    init_task();
  }
});

// src/lib/tasks/checkout.ts
function checkoutTask(args) {
  const commands = ["checkout", ...args];
  if (commands[1] === "-b" && commands.includes("-B")) {
    commands[1] = remove(commands, "-B");
  }
  return straightThroughStringTask(commands);
}
function checkout_default() {
  return {
    checkout() {
      return this._runTask(
        checkoutTask(getTrailingOptions(arguments, 1)),
        trailingFunctionArgument(arguments)
      );
    },
    checkoutBranch(branchName, startPoint) {
      return this._runTask(
        checkoutTask(["-b", branchName, startPoint, ...getTrailingOptions(arguments)]),
        trailingFunctionArgument(arguments)
      );
    },
    checkoutLocalBranch(branchName) {
      return this._runTask(
        checkoutTask(["-b", branchName, ...getTrailingOptions(arguments)]),
        trailingFunctionArgument(arguments)
      );
    }
  };
}
var init_checkout = __esm({
  "src/lib/tasks/checkout.ts"() {
    "use strict";
    init_utils();
    init_task();
  }
});

// src/lib/tasks/count-objects.ts
function countObjectsResponse() {
  return {
    count: 0,
    garbage: 0,
    inPack: 0,
    packs: 0,
    prunePackable: 0,
    size: 0,
    sizeGarbage: 0,
    sizePack: 0
  };
}
function count_objects_default() {
  return {
    countObjects() {
      return this._runTask({
        commands: ["count-objects", "--verbose"],
        format: "utf-8",
        parser(stdOut) {
          return parseStringResponse(countObjectsResponse(), [parser2], stdOut);
        }
      });
    }
  };
}
var parser2;
var init_count_objects = __esm({
  "src/lib/tasks/count-objects.ts"() {
    "use strict";
    init_utils();
    parser2 = new LineParser(
      /([a-z-]+): (\d+)$/,
      (result, [key, value]) => {
        const property = asCamelCase(key);
        if (Object.hasOwn(result, property)) {
          result[property] = asNumber(value);
        }
      }
    );
  }
});

// src/lib/parsers/parse-commit.ts
function parseCommitResult(stdOut) {
  const result = {
    author: null,
    branch: "",
    commit: "",
    root: false,
    summary: {
      changes: 0,
      insertions: 0,
      deletions: 0
    }
  };
  return parseStringResponse(result, parsers, stdOut);
}
var parsers;
var init_parse_commit = __esm({
  "src/lib/parsers/parse-commit.ts"() {
    "use strict";
    init_utils();
    parsers = [
      new LineParser(/^\[([^\s]+)( \([^)]+\))? ([^\]]+)/, (result, [branch, root, commit]) => {
        result.branch = branch;
        result.commit = commit;
        result.root = !!root;
      }),
      new LineParser(/\s*Author:\s(.+)/i, (result, [author]) => {
        const parts = author.split("<");
        const email = parts.pop();
        if (!email || !email.includes("@")) {
          return;
        }
        result.author = {
          email: email.substr(0, email.length - 1),
          name: parts.join("<").trim()
        };
      }),
      new LineParser(
        /(\d+)[^,]*(?:,\s*(\d+)[^,]*)(?:,\s*(\d+))/g,
        (result, [changes, insertions, deletions]) => {
          result.summary.changes = parseInt(changes, 10) || 0;
          result.summary.insertions = parseInt(insertions, 10) || 0;
          result.summary.deletions = parseInt(deletions, 10) || 0;
        }
      ),
      new LineParser(
        /^(\d+)[^,]*(?:,\s*(\d+)[^(]+\(([+-]))?/,
        (result, [changes, lines, direction]) => {
          result.summary.changes = parseInt(changes, 10) || 0;
          const count = parseInt(lines, 10) || 0;
          if (direction === "-") {
            result.summary.deletions = count;
          } else if (direction === "+") {
            result.summary.insertions = count;
          }
        }
      )
    ];
  }
});

// src/lib/tasks/commit.ts
function commitTask(message, files, customArgs) {
  const commands = [
    "-c",
    "core.abbrev=40",
    "commit",
    ...prefixedArray(message, "-m"),
    ...files,
    ...customArgs
  ];
  return {
    commands,
    format: "utf-8",
    parser: parseCommitResult
  };
}
function commit_default() {
  return {
    commit(message, ...rest) {
      const next = trailingFunctionArgument(arguments);
      const task = rejectDeprecatedSignatures(message) || commitTask(
        asArray(message),
        asArray(filterType(rest[0], filterStringOrStringArray, [])),
        [
          ...asStringArray(filterType(rest[1], filterArray, [])),
          ...getTrailingOptions(arguments, 0, true)
        ]
      );
      return this._runTask(task, next);
    }
  };
  function rejectDeprecatedSignatures(message) {
    return !filterStringOrStringArray(message) && configurationErrorTask(
      `git.commit: requires the commit message to be supplied as a string/string[]`
    );
  }
}
var init_commit = __esm({
  "src/lib/tasks/commit.ts"() {
    "use strict";
    init_parse_commit();
    init_utils();
    init_task();
  }
});

// src/lib/tasks/first-commit.ts
function first_commit_default() {
  return {
    firstCommit() {
      return this._runTask(
        straightThroughStringTask(["rev-list", "--max-parents=0", "HEAD"], true),
        trailingFunctionArgument(arguments)
      );
    }
  };
}
var init_first_commit = __esm({
  "src/lib/tasks/first-commit.ts"() {
    "use strict";
    init_utils();
    init_task();
  }
});

// src/lib/tasks/hash-object.ts
function hashObjectTask(filePath, write) {
  const commands = ["hash-object", filePath];
  if (write) {
    commands.push("-w");
  }
  return straightThroughStringTask(commands, true);
}
var init_hash_object = __esm({
  "src/lib/tasks/hash-object.ts"() {
    "use strict";
    init_task();
  }
});

// src/lib/responses/InitSummary.ts
function parseInit(bare, path, text) {
  const response = String(text).trim();
  let result;
  if (result = initResponseRegex.exec(response)) {
    return new InitSummary(bare, path, false, result[1]);
  }
  if (result = reInitResponseRegex.exec(response)) {
    return new InitSummary(bare, path, true, result[1]);
  }
  let gitDir = "";
  const tokens = response.split(" ");
  while (tokens.length) {
    const token = tokens.shift();
    if (token === "in") {
      gitDir = tokens.join(" ");
      break;
    }
  }
  return new InitSummary(bare, path, /^re/i.test(response), gitDir);
}
var InitSummary, initResponseRegex, reInitResponseRegex;
var init_InitSummary = __esm({
  "src/lib/responses/InitSummary.ts"() {
    "use strict";
    InitSummary = class {
      constructor(bare, path, existing, gitDir) {
        this.bare = bare;
        this.path = path;
        this.existing = existing;
        this.gitDir = gitDir;
      }
    };
    initResponseRegex = /^Init.+ repository in (.+)$/;
    reInitResponseRegex = /^Rein.+ in (.+)$/;
  }
});

// src/lib/tasks/init.ts
function hasBareCommand(command) {
  return command.includes(bareCommand);
}
function initTask(bare = false, path, customArgs) {
  const commands = ["init", ...customArgs];
  if (bare && !hasBareCommand(commands)) {
    commands.splice(1, 0, bareCommand);
  }
  return {
    commands,
    format: "utf-8",
    parser(text) {
      return parseInit(commands.includes("--bare"), path, text);
    }
  };
}
var bareCommand;
var init_init = __esm({
  "src/lib/tasks/init.ts"() {
    "use strict";
    init_InitSummary();
    bareCommand = "--bare";
  }
});

// src/lib/args/log-format.ts
function logFormatFromCommand(customArgs) {
  for (let i = 0; i < customArgs.length; i++) {
    const format = logFormatRegex.exec(customArgs[i]);
    if (format) {
      return `--${format[1]}`;
    }
  }
  return "" /* NONE */;
}
function isLogFormat(customArg) {
  return logFormatRegex.test(customArg);
}
var logFormatRegex;
var init_log_format = __esm({
  "src/lib/args/log-format.ts"() {
    "use strict";
    logFormatRegex = /^--(stat|numstat|name-only|name-status)(=|$)/;
  }
});

// src/lib/responses/DiffSummary.ts
var DiffSummary;
var init_DiffSummary = __esm({
  "src/lib/responses/DiffSummary.ts"() {
    "use strict";
    DiffSummary = class {
      constructor() {
        this.changed = 0;
        this.deletions = 0;
        this.insertions = 0;
        this.files = [];
      }
    };
  }
});

// src/lib/parsers/parse-diff-summary.ts
function getDiffParser(format = "" /* NONE */) {
  const parser4 = diffSummaryParsers[format];
  return (stdOut) => parseStringResponse(new DiffSummary(), parser4, stdOut, false);
}
var statParser, numStatParser, nameOnlyParser, nameStatusParser, diffSummaryParsers;
var init_parse_diff_summary = __esm({
  "src/lib/parsers/parse-diff-summary.ts"() {
    "use strict";
    init_log_format();
    init_DiffSummary();
    init_diff_name_status();
    init_utils();
    statParser = [
      new LineParser(
        /^(.+)\s+\|\s+(\d+)(\s+[+\-]+)?$/,
        (result, [file, changes, alterations = ""]) => {
          result.files.push({
            file: file.trim(),
            changes: asNumber(changes),
            insertions: alterations.replace(/[^+]/g, "").length,
            deletions: alterations.replace(/[^-]/g, "").length,
            binary: false
          });
        }
      ),
      new LineParser(
        /^(.+) \|\s+Bin ([0-9.]+) -> ([0-9.]+) ([a-z]+)/,
        (result, [file, before, after]) => {
          result.files.push({
            file: file.trim(),
            before: asNumber(before),
            after: asNumber(after),
            binary: true
          });
        }
      ),
      new LineParser(
        /(\d+) files? changed\s*((?:, \d+ [^,]+){0,2})/,
        (result, [changed, summary]) => {
          const inserted = /(\d+) i/.exec(summary);
          const deleted = /(\d+) d/.exec(summary);
          result.changed = asNumber(changed);
          result.insertions = asNumber(inserted?.[1]);
          result.deletions = asNumber(deleted?.[1]);
        }
      )
    ];
    numStatParser = [
      new LineParser(
        /(\d+)\t(\d+)\t(.+)$/,
        (result, [changesInsert, changesDelete, file]) => {
          const insertions = asNumber(changesInsert);
          const deletions = asNumber(changesDelete);
          result.changed++;
          result.insertions += insertions;
          result.deletions += deletions;
          result.files.push({
            file,
            changes: insertions + deletions,
            insertions,
            deletions,
            binary: false
          });
        }
      ),
      new LineParser(/-\t-\t(.+)$/, (result, [file]) => {
        result.changed++;
        result.files.push({
          file,
          after: 0,
          before: 0,
          binary: true
        });
      })
    ];
    nameOnlyParser = [
      new LineParser(/(.+)$/, (result, [file]) => {
        result.changed++;
        result.files.push({
          file,
          changes: 0,
          insertions: 0,
          deletions: 0,
          binary: false
        });
      })
    ];
    nameStatusParser = [
      new LineParser(
        /([ACDMRTUXB])([0-9]{0,3})\t(.[^\t]*)(\t(.[^\t]*))?$/,
        (result, [status, similarity, from, _to, to]) => {
          result.changed++;
          result.files.push({
            file: to ?? from,
            changes: 0,
            insertions: 0,
            deletions: 0,
            binary: false,
            status: orVoid(isDiffNameStatus(status) && status),
            from: orVoid(!!to && from !== to && from),
            similarity: asNumber(similarity)
          });
        }
      )
    ];
    diffSummaryParsers = {
      ["" /* NONE */]: statParser,
      ["--stat" /* STAT */]: statParser,
      ["--numstat" /* NUM_STAT */]: numStatParser,
      ["--name-status" /* NAME_STATUS */]: nameStatusParser,
      ["--name-only" /* NAME_ONLY */]: nameOnlyParser
    };
  }
});

// src/lib/parsers/parse-list-log-summary.ts
function lineBuilder(tokens, fields) {
  return fields.reduce(
    (line, field, index) => {
      line[field] = tokens[index] || "";
      return line;
    },
    /* @__PURE__ */ Object.create({ diff: null })
  );
}
function createListLogSummaryParser(splitter = SPLITTER, fields = defaultFieldNames, logFormat = "" /* NONE */) {
  const parseDiffResult = getDiffParser(logFormat);
  return function(stdOut) {
    const all = toLinesWithContent(
      stdOut.trim(),
      false,
      START_BOUNDARY
    ).map(function(item) {
      const lineDetail = item.split(COMMIT_BOUNDARY);
      const listLogLine = lineBuilder(lineDetail[0].split(splitter), fields);
      if (lineDetail.length > 1 && !!lineDetail[1].trim()) {
        listLogLine.diff = parseDiffResult(lineDetail[1]);
      }
      return listLogLine;
    });
    return {
      all,
      latest: all.length && all[0] || null,
      total: all.length
    };
  };
}
var START_BOUNDARY, COMMIT_BOUNDARY, SPLITTER, defaultFieldNames;
var init_parse_list_log_summary = __esm({
  "src/lib/parsers/parse-list-log-summary.ts"() {
    "use strict";
    init_utils();
    init_parse_diff_summary();
    init_log_format();
    START_BOUNDARY = "\xF2\xF2\xF2\xF2\xF2\xF2 ";
    COMMIT_BOUNDARY = " \xF2\xF2";
    SPLITTER = " \xF2 ";
    defaultFieldNames = ["hash", "date", "message", "refs", "author_name", "author_email"];
  }
});

// src/lib/tasks/diff.ts
var diff_exports = {};
__export(diff_exports, {
  diffSummaryTask: () => diffSummaryTask,
  validateLogFormatConfig: () => validateLogFormatConfig
});
function diffSummaryTask(customArgs) {
  let logFormat = logFormatFromCommand(customArgs);
  const commands = ["diff"];
  if (logFormat === "" /* NONE */) {
    logFormat = "--stat" /* STAT */;
    commands.push("--stat=4096");
  }
  commands.push(...customArgs);
  return validateLogFormatConfig(commands) || {
    commands,
    format: "utf-8",
    parser: getDiffParser(logFormat)
  };
}
function validateLogFormatConfig(customArgs) {
  const flags = customArgs.filter(isLogFormat);
  if (flags.length > 1) {
    return configurationErrorTask(
      `Summary flags are mutually exclusive - pick one of ${flags.join(",")}`
    );
  }
  if (flags.length && customArgs.includes("-z")) {
    return configurationErrorTask(
      `Summary flag ${flags} parsing is not compatible with null termination option '-z'`
    );
  }
}
var init_diff = __esm({
  "src/lib/tasks/diff.ts"() {
    "use strict";
    init_log_format();
    init_parse_diff_summary();
    init_task();
  }
});

// src/lib/tasks/log.ts
function prettyFormat(format, splitter) {
  const fields = [];
  const formatStr = [];
  Object.keys(format).forEach((field) => {
    fields.push(field);
    formatStr.push(String(format[field]));
  });
  return [fields, formatStr.join(splitter)];
}
function userOptions(input) {
  return Object.keys(input).reduce((out, key) => {
    if (!(key in excludeOptions)) {
      out[key] = input[key];
    }
    return out;
  }, {});
}
function parseLogOptions(opt = {}, customArgs = []) {
  const splitter = filterType(opt.splitter, filterString, SPLITTER);
  const format = filterPlainObject(opt.format) ? opt.format : {
    hash: "%H",
    date: opt.strictDate === false ? "%ai" : "%aI",
    message: "%s",
    refs: "%D",
    body: opt.multiLine ? "%B" : "%b",
    author_name: opt.mailMap !== false ? "%aN" : "%an",
    author_email: opt.mailMap !== false ? "%aE" : "%ae"
  };
  const [fields, formatStr] = prettyFormat(format, splitter);
  const suffix = [];
  const command = [
    `--pretty=format:${START_BOUNDARY}${formatStr}${COMMIT_BOUNDARY}`,
    ...customArgs
  ];
  const maxCount = opt.n || opt["max-count"] || opt.maxCount;
  if (maxCount) {
    command.push(`--max-count=${maxCount}`);
  }
  if (opt.from || opt.to) {
    const rangeOperator = opt.symmetric !== false ? "..." : "..";
    suffix.push(`${opt.from || ""}${rangeOperator}${opt.to || ""}`);
  }
  if (filterString(opt.file)) {
    command.push("--follow", pathspec(opt.file));
  }
  appendTaskOptions(userOptions(opt), command);
  return {
    fields,
    splitter,
    commands: [...command, ...suffix]
  };
}
function logTask(splitter, fields, customArgs) {
  const parser4 = createListLogSummaryParser(splitter, fields, logFormatFromCommand(customArgs));
  return {
    commands: ["log", ...customArgs],
    format: "utf-8",
    parser: parser4
  };
}
function log_default() {
  return {
    log(...rest) {
      const next = trailingFunctionArgument(arguments);
      const options = parseLogOptions(
        trailingOptionsArgument(arguments),
        asStringArray(filterType(arguments[0], filterArray, []))
      );
      const task = rejectDeprecatedSignatures(...rest) || validateLogFormatConfig(options.commands) || createLogTask(options);
      return this._runTask(task, next);
    }
  };
  function createLogTask(options) {
    return logTask(options.splitter, options.fields, options.commands);
  }
  function rejectDeprecatedSignatures(from, to) {
    return filterString(from) && filterString(to) && configurationErrorTask(
      `git.log(string, string) should be replaced with git.log({ from: string, to: string })`
    );
  }
}
var excludeOptions;
var init_log = __esm({
  "src/lib/tasks/log.ts"() {
    "use strict";
    init_log_format();
    init_pathspec();
    init_parse_list_log_summary();
    init_utils();
    init_task();
    init_diff();
    excludeOptions = /* @__PURE__ */ ((excludeOptions2) => {
      excludeOptions2[excludeOptions2["--pretty"] = 0] = "--pretty";
      excludeOptions2[excludeOptions2["max-count"] = 1] = "max-count";
      excludeOptions2[excludeOptions2["maxCount"] = 2] = "maxCount";
      excludeOptions2[excludeOptions2["n"] = 3] = "n";
      excludeOptions2[excludeOptions2["file"] = 4] = "file";
      excludeOptions2[excludeOptions2["format"] = 5] = "format";
      excludeOptions2[excludeOptions2["from"] = 6] = "from";
      excludeOptions2[excludeOptions2["to"] = 7] = "to";
      excludeOptions2[excludeOptions2["splitter"] = 8] = "splitter";
      excludeOptions2[excludeOptions2["symmetric"] = 9] = "symmetric";
      excludeOptions2[excludeOptions2["mailMap"] = 10] = "mailMap";
      excludeOptions2[excludeOptions2["multiLine"] = 11] = "multiLine";
      excludeOptions2[excludeOptions2["strictDate"] = 12] = "strictDate";
      return excludeOptions2;
    })(excludeOptions || {});
  }
});

// src/lib/responses/MergeSummary.ts
var MergeSummaryConflict, MergeSummaryDetail;
var init_MergeSummary = __esm({
  "src/lib/responses/MergeSummary.ts"() {
    "use strict";
    MergeSummaryConflict = class {
      constructor(reason, file = null, meta) {
        this.reason = reason;
        this.file = file;
        this.meta = meta;
      }
      toString() {
        return `${this.file}:${this.reason}`;
      }
    };
    MergeSummaryDetail = class {
      constructor() {
        this.conflicts = [];
        this.merges = [];
        this.result = "success";
      }
      get failed() {
        return this.conflicts.length > 0;
      }
      get reason() {
        return this.result;
      }
      toString() {
        if (this.conflicts.length) {
          return `CONFLICTS: ${this.conflicts.join(", ")}`;
        }
        return "OK";
      }
    };
  }
});

// src/lib/responses/PullSummary.ts
var PullSummary, PullFailedSummary;
var init_PullSummary = __esm({
  "src/lib/responses/PullSummary.ts"() {
    "use strict";
    PullSummary = class {
      constructor() {
        this.remoteMessages = {
          all: []
        };
        this.created = [];
        this.deleted = [];
        this.files = [];
        this.deletions = {};
        this.insertions = {};
        this.summary = {
          changes: 0,
          deletions: 0,
          insertions: 0
        };
      }
    };
    PullFailedSummary = class {
      constructor() {
        this.remote = "";
        this.hash = {
          local: "",
          remote: ""
        };
        this.branch = {
          local: "",
          remote: ""
        };
        this.message = "";
      }
      toString() {
        return this.message;
      }
    };
  }
});

// src/lib/parsers/parse-remote-objects.ts
function objectEnumerationResult(remoteMessages) {
  return remoteMessages.objects = remoteMessages.objects || {
    compressing: 0,
    counting: 0,
    enumerating: 0,
    packReused: 0,
    reused: { count: 0, delta: 0 },
    total: { count: 0, delta: 0 }
  };
}
function asObjectCount(source) {
  const count = /^\s*(\d+)/.exec(source);
  const delta = /delta (\d+)/i.exec(source);
  return {
    count: asNumber(count && count[1] || "0"),
    delta: asNumber(delta && delta[1] || "0")
  };
}
var remoteMessagesObjectParsers;
var init_parse_remote_objects = __esm({
  "src/lib/parsers/parse-remote-objects.ts"() {
    "use strict";
    init_utils();
    remoteMessagesObjectParsers = [
      new RemoteLineParser(
        /^remote:\s*(enumerating|counting|compressing) objects: (\d+),/i,
        (result, [action, count]) => {
          const key = action.toLowerCase();
          const enumeration = objectEnumerationResult(result.remoteMessages);
          Object.assign(enumeration, { [key]: asNumber(count) });
        }
      ),
      new RemoteLineParser(
        /^remote:\s*(enumerating|counting|compressing) objects: \d+% \(\d+\/(\d+)\),/i,
        (result, [action, count]) => {
          const key = action.toLowerCase();
          const enumeration = objectEnumerationResult(result.remoteMessages);
          Object.assign(enumeration, { [key]: asNumber(count) });
        }
      ),
      new RemoteLineParser(
        /total ([^,]+), reused ([^,]+), pack-reused (\d+)/i,
        (result, [total, reused, packReused]) => {
          const objects = objectEnumerationResult(result.remoteMessages);
          objects.total = asObjectCount(total);
          objects.reused = asObjectCount(reused);
          objects.packReused = asNumber(packReused);
        }
      )
    ];
  }
});

// src/lib/parsers/parse-remote-messages.ts
function parseRemoteMessages(_stdOut, stdErr) {
  return parseStringResponse({ remoteMessages: new RemoteMessageSummary() }, parsers2, stdErr);
}
var parsers2, RemoteMessageSummary;
var init_parse_remote_messages = __esm({
  "src/lib/parsers/parse-remote-messages.ts"() {
    "use strict";
    init_utils();
    init_parse_remote_objects();
    parsers2 = [
      new RemoteLineParser(/^remote:\s*(.+)$/, (result, [text]) => {
        result.remoteMessages.all.push(text.trim());
        return false;
      }),
      ...remoteMessagesObjectParsers,
      new RemoteLineParser(
        [/create a (?:pull|merge) request/i, /\s(https?:\/\/\S+)$/],
        (result, [pullRequestUrl]) => {
          result.remoteMessages.pullRequestUrl = pullRequestUrl;
        }
      ),
      new RemoteLineParser(
        [/found (\d+) vulnerabilities.+\(([^)]+)\)/i, /\s(https?:\/\/\S+)$/],
        (result, [count, summary, url]) => {
          result.remoteMessages.vulnerabilities = {
            count: asNumber(count),
            summary,
            url
          };
        }
      )
    ];
    RemoteMessageSummary = class {
      constructor() {
        this.all = [];
      }
    };
  }
});

// src/lib/parsers/parse-pull.ts
function parsePullErrorResult(stdOut, stdErr) {
  const pullError = parseStringResponse(new PullFailedSummary(), errorParsers, [stdOut, stdErr]);
  return pullError.message && pullError;
}
var FILE_UPDATE_REGEX, SUMMARY_REGEX, ACTION_REGEX, parsers3, errorParsers, parsePullDetail, parsePullResult;
var init_parse_pull = __esm({
  "src/lib/parsers/parse-pull.ts"() {
    "use strict";
    init_PullSummary();
    init_utils();
    init_parse_remote_messages();
    FILE_UPDATE_REGEX = /^\s*(.+?)\s+\|\s+\d+\s*(\+*)(-*)/;
    SUMMARY_REGEX = /(\d+)\D+((\d+)\D+\(\+\))?(\D+(\d+)\D+\(-\))?/;
    ACTION_REGEX = /^(create|delete) mode \d+ (.+)/;
    parsers3 = [
      new LineParser(FILE_UPDATE_REGEX, (result, [file, insertions, deletions]) => {
        result.files.push(file);
        if (insertions) {
          result.insertions[file] = insertions.length;
        }
        if (deletions) {
          result.deletions[file] = deletions.length;
        }
      }),
      new LineParser(SUMMARY_REGEX, (result, [changes, , insertions, , deletions]) => {
        if (insertions !== void 0 || deletions !== void 0) {
          result.summary.changes = +changes || 0;
          result.summary.insertions = +insertions || 0;
          result.summary.deletions = +deletions || 0;
          return true;
        }
        return false;
      }),
      new LineParser(ACTION_REGEX, (result, [action, file]) => {
        append(result.files, file);
        append(action === "create" ? result.created : result.deleted, file);
      })
    ];
    errorParsers = [
      new LineParser(/^from\s(.+)$/i, (result, [remote]) => void (result.remote = remote)),
      new LineParser(/^fatal:\s(.+)$/, (result, [message]) => void (result.message = message)),
      new LineParser(
        /([a-z0-9]+)\.\.([a-z0-9]+)\s+(\S+)\s+->\s+(\S+)$/,
        (result, [hashLocal, hashRemote, branchLocal, branchRemote]) => {
          result.branch.local = branchLocal;
          result.hash.local = hashLocal;
          result.branch.remote = branchRemote;
          result.hash.remote = hashRemote;
        }
      )
    ];
    parsePullDetail = (stdOut, stdErr) => {
      return parseStringResponse(new PullSummary(), parsers3, [stdOut, stdErr]);
    };
    parsePullResult = (stdOut, stdErr) => {
      return Object.assign(
        new PullSummary(),
        parsePullDetail(stdOut, stdErr),
        parseRemoteMessages(stdOut, stdErr)
      );
    };
  }
});

// src/lib/parsers/parse-merge.ts
var parsers4, parseMergeResult, parseMergeDetail;
var init_parse_merge = __esm({
  "src/lib/parsers/parse-merge.ts"() {
    "use strict";
    init_MergeSummary();
    init_utils();
    init_parse_pull();
    parsers4 = [
      new LineParser(/^Auto-merging\s+(.+)$/, (summary, [autoMerge]) => {
        summary.merges.push(autoMerge);
      }),
      new LineParser(/^CONFLICT\s+\((.+)\): Merge conflict in (.+)$/, (summary, [reason, file]) => {
        summary.conflicts.push(new MergeSummaryConflict(reason, file));
      }),
      new LineParser(
        /^CONFLICT\s+\((.+\/delete)\): (.+) deleted in (.+) and/,
        (summary, [reason, file, deleteRef]) => {
          summary.conflicts.push(new MergeSummaryConflict(reason, file, { deleteRef }));
        }
      ),
      new LineParser(/^CONFLICT\s+\((.+)\):/, (summary, [reason]) => {
        summary.conflicts.push(new MergeSummaryConflict(reason, null));
      }),
      new LineParser(/^Automatic merge failed;\s+(.+)$/, (summary, [result]) => {
        summary.result = result;
      })
    ];
    parseMergeResult = (stdOut, stdErr) => {
      return Object.assign(parseMergeDetail(stdOut, stdErr), parsePullResult(stdOut, stdErr));
    };
    parseMergeDetail = (stdOut) => {
      return parseStringResponse(new MergeSummaryDetail(), parsers4, stdOut);
    };
  }
});

// src/lib/tasks/merge.ts
function mergeTask(customArgs) {
  if (!customArgs.length) {
    return configurationErrorTask("Git.merge requires at least one option");
  }
  return {
    commands: ["merge", ...customArgs],
    format: "utf-8",
    parser(stdOut, stdErr) {
      const merge = parseMergeResult(stdOut, stdErr);
      if (merge.failed) {
        throw new GitResponseError(merge);
      }
      return merge;
    }
  };
}
var init_merge = __esm({
  "src/lib/tasks/merge.ts"() {
    "use strict";
    init_git_response_error();
    init_parse_merge();
    init_task();
  }
});

// src/lib/parsers/parse-push.ts
function pushResultPushedItem(local, remote, status) {
  const deleted = status.includes("deleted");
  const tag = status.includes("tag") || /^refs\/tags/.test(local);
  const alreadyUpdated = !status.includes("new");
  return {
    deleted,
    tag,
    branch: !tag,
    new: !alreadyUpdated,
    alreadyUpdated,
    local,
    remote
  };
}
var parsers5, parsePushResult, parsePushDetail;
var init_parse_push = __esm({
  "src/lib/parsers/parse-push.ts"() {
    "use strict";
    init_utils();
    init_parse_remote_messages();
    parsers5 = [
      new LineParser(/^Pushing to (.+)$/, (result, [repo]) => {
        result.repo = repo;
      }),
      new LineParser(/^updating local tracking ref '(.+)'/, (result, [local]) => {
        result.ref = {
          ...result.ref || {},
          local
        };
      }),
      new LineParser(/^[=*-]\s+([^:]+):(\S+)\s+\[(.+)]$/, (result, [local, remote, type]) => {
        result.pushed.push(pushResultPushedItem(local, remote, type));
      }),
      new LineParser(
        /^Branch '([^']+)' set up to track remote branch '([^']+)' from '([^']+)'/,
        (result, [local, remote, remoteName]) => {
          result.branch = {
            ...result.branch || {},
            local,
            remote,
            remoteName
          };
        }
      ),
      new LineParser(
        /^([^:]+):(\S+)\s+([a-z0-9]+)\.\.([a-z0-9]+)$/,
        (result, [local, remote, from, to]) => {
          result.update = {
            head: {
              local,
              remote
            },
            hash: {
              from,
              to
            }
          };
        }
      )
    ];
    parsePushResult = (stdOut, stdErr) => {
      const pushDetail = parsePushDetail(stdOut, stdErr);
      const responseDetail = parseRemoteMessages(stdOut, stdErr);
      return {
        ...pushDetail,
        ...responseDetail
      };
    };
    parsePushDetail = (stdOut, stdErr) => {
      return parseStringResponse({ pushed: [] }, parsers5, [stdOut, stdErr]);
    };
  }
});

// src/lib/tasks/push.ts
var push_exports = {};
__export(push_exports, {
  pushTagsTask: () => pushTagsTask,
  pushTask: () => pushTask
});
function pushTagsTask(ref = {}, customArgs) {
  append(customArgs, "--tags");
  return pushTask(ref, customArgs);
}
function pushTask(ref = {}, customArgs) {
  const commands = ["push", ...customArgs];
  if (ref.branch) {
    commands.splice(1, 0, ref.branch);
  }
  if (ref.remote) {
    commands.splice(1, 0, ref.remote);
  }
  remove(commands, "-v");
  append(commands, "--verbose");
  append(commands, "--porcelain");
  return {
    commands,
    format: "utf-8",
    parser: parsePushResult
  };
}
var init_push = __esm({
  "src/lib/tasks/push.ts"() {
    "use strict";
    init_parse_push();
    init_utils();
  }
});

// src/lib/tasks/show.ts
function show_default() {
  return {
    showBuffer() {
      const commands = ["show", ...getTrailingOptions(arguments, 1)];
      if (!commands.includes("--binary")) {
        commands.splice(1, 0, "--binary");
      }
      return this._runTask(
        straightThroughBufferTask(commands),
        trailingFunctionArgument(arguments)
      );
    },
    show() {
      const commands = ["show", ...getTrailingOptions(arguments, 1)];
      return this._runTask(
        straightThroughStringTask(commands),
        trailingFunctionArgument(arguments)
      );
    }
  };
}
var init_show = __esm({
  "src/lib/tasks/show.ts"() {
    "use strict";
    init_utils();
    init_task();
  }
});

// src/lib/responses/FileStatusSummary.ts
var fromPathRegex, FileStatusSummary;
var init_FileStatusSummary = __esm({
  "src/lib/responses/FileStatusSummary.ts"() {
    "use strict";
    fromPathRegex = /^(.+)\0(.+)$/;
    FileStatusSummary = class {
      constructor(path, index, working_dir) {
        this.path = path;
        this.index = index;
        this.working_dir = working_dir;
        if (index === "R" || working_dir === "R") {
          const detail = fromPathRegex.exec(path) || [null, path, path];
          this.from = detail[2] || "";
          this.path = detail[1] || "";
        }
      }
    };
  }
});

// src/lib/responses/StatusSummary.ts
function renamedFile(line) {
  const [to, from] = line.split(NULL);
  return {
    from: from || to,
    to
  };
}
function parser3(indexX, indexY, handler) {
  return [`${indexX}${indexY}`, handler];
}
function conflicts(indexX, ...indexY) {
  return indexY.map((y) => parser3(indexX, y, (result, file) => result.conflicted.push(file)));
}
function splitLine(result, lineStr) {
  const trimmed2 = lineStr.trim();
  switch (" ") {
    case trimmed2.charAt(2):
      return data(trimmed2.charAt(0), trimmed2.charAt(1), trimmed2.slice(3));
    case trimmed2.charAt(1):
      return data(" " /* NONE */, trimmed2.charAt(0), trimmed2.slice(2));
    default:
      return;
  }
  function data(index, workingDir, path) {
    const raw = `${index}${workingDir}`;
    const handler = parsers6.get(raw);
    if (handler) {
      handler(result, path);
    }
    if (raw !== "##" && raw !== "!!") {
      result.files.push(new FileStatusSummary(path, index, workingDir));
    }
  }
}
var StatusSummary, parsers6, parseStatusSummary;
var init_StatusSummary = __esm({
  "src/lib/responses/StatusSummary.ts"() {
    "use strict";
    init_utils();
    init_FileStatusSummary();
    StatusSummary = class {
      constructor() {
        this.not_added = [];
        this.conflicted = [];
        this.created = [];
        this.deleted = [];
        this.ignored = void 0;
        this.modified = [];
        this.renamed = [];
        this.files = [];
        this.staged = [];
        this.ahead = 0;
        this.behind = 0;
        this.current = null;
        this.tracking = null;
        this.detached = false;
        this.isClean = () => {
          return !this.files.length;
        };
      }
    };
    parsers6 = new Map([
      parser3(
        " " /* NONE */,
        "A" /* ADDED */,
        (result, file) => result.created.push(file)
      ),
      parser3(
        " " /* NONE */,
        "D" /* DELETED */,
        (result, file) => result.deleted.push(file)
      ),
      parser3(
        " " /* NONE */,
        "M" /* MODIFIED */,
        (result, file) => result.modified.push(file)
      ),
      parser3("A" /* ADDED */, " " /* NONE */, (result, file) => {
        result.created.push(file);
        result.staged.push(file);
      }),
      parser3("A" /* ADDED */, "M" /* MODIFIED */, (result, file) => {
        result.created.push(file);
        result.staged.push(file);
        result.modified.push(file);
      }),
      parser3("D" /* DELETED */, " " /* NONE */, (result, file) => {
        result.deleted.push(file);
        result.staged.push(file);
      }),
      parser3("M" /* MODIFIED */, " " /* NONE */, (result, file) => {
        result.modified.push(file);
        result.staged.push(file);
      }),
      parser3("M" /* MODIFIED */, "M" /* MODIFIED */, (result, file) => {
        result.modified.push(file);
        result.staged.push(file);
      }),
      parser3("R" /* RENAMED */, " " /* NONE */, (result, file) => {
        result.renamed.push(renamedFile(file));
      }),
      parser3("R" /* RENAMED */, "M" /* MODIFIED */, (result, file) => {
        const renamed = renamedFile(file);
        result.renamed.push(renamed);
        result.modified.push(renamed.to);
      }),
      parser3("!" /* IGNORED */, "!" /* IGNORED */, (_result, _file) => {
        (_result.ignored = _result.ignored || []).push(_file);
      }),
      parser3(
        "?" /* UNTRACKED */,
        "?" /* UNTRACKED */,
        (result, file) => result.not_added.push(file)
      ),
      ...conflicts("A" /* ADDED */, "A" /* ADDED */, "U" /* UNMERGED */),
      ...conflicts(
        "D" /* DELETED */,
        "D" /* DELETED */,
        "U" /* UNMERGED */
      ),
      ...conflicts(
        "U" /* UNMERGED */,
        "A" /* ADDED */,
        "D" /* DELETED */,
        "U" /* UNMERGED */
      ),
      [
        "##",
        (result, line) => {
          const aheadReg = /ahead (\d+)/;
          const behindReg = /behind (\d+)/;
          const currentReg = /^(.+?(?=(?:\.{3}|\s|$)))/;
          const trackingReg = /\.{3}(\S*)/;
          const onEmptyBranchReg = /\son\s(\S+?)(?=\.{3}|$)/;
          let regexResult = aheadReg.exec(line);
          result.ahead = regexResult && +regexResult[1] || 0;
          regexResult = behindReg.exec(line);
          result.behind = regexResult && +regexResult[1] || 0;
          regexResult = currentReg.exec(line);
          result.current = filterType(regexResult?.[1], filterString, null);
          regexResult = trackingReg.exec(line);
          result.tracking = filterType(regexResult?.[1], filterString, null);
          regexResult = onEmptyBranchReg.exec(line);
          if (regexResult) {
            result.current = filterType(regexResult?.[1], filterString, result.current);
          }
          result.detached = /\(no branch\)/.test(line);
        }
      ]
    ]);
    parseStatusSummary = function(text) {
      const lines = text.split(NULL);
      const status = new StatusSummary();
      for (let i = 0, l = lines.length; i < l; ) {
        let line = lines[i++].trim();
        if (!line) {
          continue;
        }
        if (line.charAt(0) === "R" /* RENAMED */) {
          line += NULL + (lines[i++] || "");
        }
        splitLine(status, line);
      }
      return status;
    };
  }
});

// src/lib/tasks/status.ts
function statusTask(customArgs) {
  const commands = [
    "status",
    "--porcelain",
    "-b",
    "-u",
    "--null",
    ...customArgs.filter((arg) => !ignoredOptions.includes(arg))
  ];
  return {
    format: "utf-8",
    commands,
    parser(text) {
      return parseStatusSummary(text);
    }
  };
}
var ignoredOptions;
var init_status = __esm({
  "src/lib/tasks/status.ts"() {
    "use strict";
    init_StatusSummary();
    ignoredOptions = ["--null", "-z"];
  }
});

// src/lib/tasks/version.ts
function versionResponse(major = 0, minor = 0, patch = 0, agent = "", installed = true) {
  return Object.defineProperty(
    {
      major,
      minor,
      patch,
      agent,
      installed
    },
    "toString",
    {
      value() {
        return `${this.major}.${this.minor}.${this.patch}`;
      },
      configurable: false,
      enumerable: false
    }
  );
}
function notInstalledResponse() {
  return versionResponse(0, 0, 0, "", false);
}
function version_default() {
  return {
    version() {
      return this._runTask({
        commands: ["--version"],
        format: "utf-8",
        parser: versionParser,
        onError(result, error, done, fail) {
          if (result.exitCode === -2 /* NOT_FOUND */) {
            return done(Buffer.from(NOT_INSTALLED));
          }
          fail(error);
        }
      });
    }
  };
}
function versionParser(stdOut) {
  if (stdOut === NOT_INSTALLED) {
    return notInstalledResponse();
  }
  return parseStringResponse(versionResponse(0, 0, 0, stdOut), parsers7, stdOut);
}
var NOT_INSTALLED, parsers7;
var init_version = __esm({
  "src/lib/tasks/version.ts"() {
    "use strict";
    init_utils();
    NOT_INSTALLED = "installed=false";
    parsers7 = [
      new LineParser(
        /version (\d+)\.(\d+)\.(\d+)(?:\s*\((.+)\))?/,
        (result, [major, minor, patch, agent = ""]) => {
          Object.assign(
            result,
            versionResponse(asNumber(major), asNumber(minor), asNumber(patch), agent)
          );
        }
      ),
      new LineParser(
        /version (\d+)\.(\d+)\.(\D+)(.+)?$/,
        (result, [major, minor, patch, agent = ""]) => {
          Object.assign(result, versionResponse(asNumber(major), asNumber(minor), patch, agent));
        }
      )
    ];
  }
});

// src/lib/tasks/clone.ts
function createCloneTask(api, task, repoPath, ...args) {
  if (!filterString(repoPath)) {
    return configurationErrorTask(`git.${api}() requires a string 'repoPath'`);
  }
  return task(repoPath, filterType(args[0], filterString), getTrailingOptions(arguments));
}
function clone_default() {
  return {
    clone(repo, ...rest) {
      return this._runTask(
        createCloneTask("clone", cloneTask, filterType(repo, filterString), ...rest),
        trailingFunctionArgument(arguments)
      );
    },
    mirror(repo, ...rest) {
      return this._runTask(
        createCloneTask("mirror", cloneMirrorTask, filterType(repo, filterString), ...rest),
        trailingFunctionArgument(arguments)
      );
    }
  };
}
var cloneTask, cloneMirrorTask;
var init_clone = __esm({
  "src/lib/tasks/clone.ts"() {
    "use strict";
    init_task();
    init_utils();
    init_pathspec();
    cloneTask = (repo, directory, customArgs) => {
      const commands = ["clone", ...customArgs];
      filterString(repo) && commands.push(pathspec(repo));
      filterString(directory) && commands.push(pathspec(directory));
      return straightThroughStringTask(commands);
    };
    cloneMirrorTask = (repo, directory, customArgs) => {
      append(customArgs, "--mirror");
      return cloneTask(repo, directory, customArgs);
    };
  }
});

// src/lib/simple-git-api.ts
var simple_git_api_exports = {};
__export(simple_git_api_exports, {
  SimpleGitApi: () => SimpleGitApi
});
var SimpleGitApi;
var init_simple_git_api = __esm({
  "src/lib/simple-git-api.ts"() {
    "use strict";
    init_task_callback();
    init_change_working_directory();
    init_checkout();
    init_count_objects();
    init_commit();
    init_config();
    init_first_commit();
    init_grep();
    init_hash_object();
    init_init();
    init_log();
    init_merge();
    init_push();
    init_show();
    init_status();
    init_task();
    init_version();
    init_utils();
    init_clone();
    SimpleGitApi = class {
      constructor(_executor) {
        this._executor = _executor;
      }
      _runTask(task, then) {
        const chain = this._executor.chain();
        const promise = chain.push(task);
        if (then) {
          taskCallback(task, promise, then);
        }
        return Object.create(this, {
          then: { value: promise.then.bind(promise) },
          catch: { value: promise.catch.bind(promise) },
          _executor: { value: chain }
        });
      }
      add(files) {
        return this._runTask(
          straightThroughStringTask(["add", ...asArray(files)]),
          trailingFunctionArgument(arguments)
        );
      }
      cwd(directory) {
        const next = trailingFunctionArgument(arguments);
        if (typeof directory === "string") {
          return this._runTask(changeWorkingDirectoryTask(directory, this._executor), next);
        }
        if (typeof directory?.path === "string") {
          return this._runTask(
            changeWorkingDirectoryTask(
              directory.path,
              directory.root && this._executor || void 0
            ),
            next
          );
        }
        return this._runTask(
          configurationErrorTask("Git.cwd: workingDirectory must be supplied as a string"),
          next
        );
      }
      hashObject(path, write) {
        return this._runTask(
          hashObjectTask(path, write === true),
          trailingFunctionArgument(arguments)
        );
      }
      init(bare) {
        return this._runTask(
          initTask(bare === true, this._executor.cwd, getTrailingOptions(arguments)),
          trailingFunctionArgument(arguments)
        );
      }
      merge() {
        return this._runTask(
          mergeTask(getTrailingOptions(arguments)),
          trailingFunctionArgument(arguments)
        );
      }
      mergeFromTo(remote, branch) {
        if (!(filterString(remote) && filterString(branch))) {
          return this._runTask(
            configurationErrorTask(
              `Git.mergeFromTo requires that the 'remote' and 'branch' arguments are supplied as strings`
            )
          );
        }
        return this._runTask(
          mergeTask([remote, branch, ...getTrailingOptions(arguments)]),
          trailingFunctionArgument(arguments, false)
        );
      }
      outputHandler(handler) {
        this._executor.outputHandler = handler;
        return this;
      }
      push() {
        const task = pushTask(
          {
            remote: filterType(arguments[0], filterString),
            branch: filterType(arguments[1], filterString)
          },
          getTrailingOptions(arguments)
        );
        return this._runTask(task, trailingFunctionArgument(arguments));
      }
      stash() {
        return this._runTask(
          straightThroughStringTask(["stash", ...getTrailingOptions(arguments)]),
          trailingFunctionArgument(arguments)
        );
      }
      status() {
        return this._runTask(
          statusTask(getTrailingOptions(arguments)),
          trailingFunctionArgument(arguments)
        );
      }
    };
    Object.assign(
      SimpleGitApi.prototype,
      checkout_default(),
      clone_default(),
      commit_default(),
      config_default(),
      count_objects_default(),
      first_commit_default(),
      grep_default(),
      log_default(),
      show_default(),
      version_default()
    );
  }
});

// src/lib/runners/scheduler.ts
var scheduler_exports = {};
__export(scheduler_exports, {
  Scheduler: () => Scheduler
});
var import_promise_deferred2, createScheduledTask, Scheduler;
var init_scheduler = __esm({
  "src/lib/runners/scheduler.ts"() {
    "use strict";
    init_utils();
    import_promise_deferred2 = __nccwpck_require__(997);
    init_git_logger();
    createScheduledTask = /* @__PURE__ */ (() => {
      let id = 0;
      return () => {
        id++;
        const { promise, done } = (0, import_promise_deferred2.createDeferred)();
        return {
          promise,
          done,
          id
        };
      };
    })();
    Scheduler = class {
      constructor(concurrency = 2) {
        this.concurrency = concurrency;
        this.logger = createLogger("", "scheduler");
        this.pending = [];
        this.running = [];
        this.logger(`Constructed, concurrency=%s`, concurrency);
      }
      schedule() {
        if (!this.pending.length || this.running.length >= this.concurrency) {
          this.logger(
            `Schedule attempt ignored, pending=%s running=%s concurrency=%s`,
            this.pending.length,
            this.running.length,
            this.concurrency
          );
          return;
        }
        const task = append(this.running, this.pending.shift());
        this.logger(`Attempting id=%s`, task.id);
        task.done(() => {
          this.logger(`Completing id=`, task.id);
          remove(this.running, task);
          this.schedule();
        });
      }
      next() {
        const { promise, id } = append(this.pending, createScheduledTask());
        this.logger(`Scheduling id=%s`, id);
        this.schedule();
        return promise;
      }
    };
  }
});

// src/lib/tasks/apply-patch.ts
var apply_patch_exports = {};
__export(apply_patch_exports, {
  applyPatchTask: () => applyPatchTask
});
function applyPatchTask(patches, customArgs) {
  return straightThroughStringTask(["apply", ...customArgs, ...patches]);
}
var init_apply_patch = __esm({
  "src/lib/tasks/apply-patch.ts"() {
    "use strict";
    init_task();
  }
});

// src/lib/responses/BranchDeleteSummary.ts
function branchDeletionSuccess(branch, hash) {
  return {
    branch,
    hash,
    success: true
  };
}
function branchDeletionFailure(branch) {
  return {
    branch,
    hash: null,
    success: false
  };
}
var BranchDeletionBatch;
var init_BranchDeleteSummary = __esm({
  "src/lib/responses/BranchDeleteSummary.ts"() {
    "use strict";
    BranchDeletionBatch = class {
      constructor() {
        this.all = [];
        this.branches = {};
        this.errors = [];
      }
      get success() {
        return !this.errors.length;
      }
    };
  }
});

// src/lib/parsers/parse-branch-delete.ts
function hasBranchDeletionError(data, processExitCode) {
  return processExitCode === 1 /* ERROR */ && deleteErrorRegex.test(data);
}
var deleteSuccessRegex, deleteErrorRegex, parsers8, parseBranchDeletions;
var init_parse_branch_delete = __esm({
  "src/lib/parsers/parse-branch-delete.ts"() {
    "use strict";
    init_BranchDeleteSummary();
    init_utils();
    deleteSuccessRegex = /(\S+)\s+\(\S+\s([^)]+)\)/;
    deleteErrorRegex = /^error[^']+'([^']+)'/m;
    parsers8 = [
      new LineParser(deleteSuccessRegex, (result, [branch, hash]) => {
        const deletion = branchDeletionSuccess(branch, hash);
        result.all.push(deletion);
        result.branches[branch] = deletion;
      }),
      new LineParser(deleteErrorRegex, (result, [branch]) => {
        const deletion = branchDeletionFailure(branch);
        result.errors.push(deletion);
        result.all.push(deletion);
        result.branches[branch] = deletion;
      })
    ];
    parseBranchDeletions = (stdOut, stdErr) => {
      return parseStringResponse(new BranchDeletionBatch(), parsers8, [stdOut, stdErr]);
    };
  }
});

// src/lib/responses/BranchSummary.ts
var BranchSummaryResult;
var init_BranchSummary = __esm({
  "src/lib/responses/BranchSummary.ts"() {
    "use strict";
    BranchSummaryResult = class {
      constructor() {
        this.all = [];
        this.branches = {};
        this.current = "";
        this.detached = false;
      }
      push(status, detached, name, commit, label) {
        if (status === "*" /* CURRENT */) {
          this.detached = detached;
          this.current = name;
        }
        this.all.push(name);
        this.branches[name] = {
          current: status === "*" /* CURRENT */,
          linkedWorkTree: status === "+" /* LINKED */,
          name,
          commit,
          label
        };
      }
    };
  }
});

// src/lib/parsers/parse-branch.ts
function branchStatus(input) {
  return input ? input.charAt(0) : "";
}
function parseBranchSummary(stdOut, currentOnly = false) {
  return parseStringResponse(
    new BranchSummaryResult(),
    currentOnly ? [currentBranchParser] : parsers9,
    stdOut
  );
}
var parsers9, currentBranchParser;
var init_parse_branch = __esm({
  "src/lib/parsers/parse-branch.ts"() {
    "use strict";
    init_BranchSummary();
    init_utils();
    parsers9 = [
      new LineParser(
        /^([*+]\s)?\((?:HEAD )?detached (?:from|at) (\S+)\)\s+([a-z0-9]+)\s(.*)$/,
        (result, [current, name, commit, label]) => {
          result.push(branchStatus(current), true, name, commit, label);
        }
      ),
      new LineParser(
        /^([*+]\s)?(\S+)\s+([a-z0-9]+)\s?(.*)$/s,
        (result, [current, name, commit, label]) => {
          result.push(branchStatus(current), false, name, commit, label);
        }
      )
    ];
    currentBranchParser = new LineParser(/^(\S+)$/s, (result, [name]) => {
      result.push("*" /* CURRENT */, false, name, "", "");
    });
  }
});

// src/lib/tasks/branch.ts
var branch_exports = {};
__export(branch_exports, {
  branchLocalTask: () => branchLocalTask,
  branchTask: () => branchTask,
  containsDeleteBranchCommand: () => containsDeleteBranchCommand,
  deleteBranchTask: () => deleteBranchTask,
  deleteBranchesTask: () => deleteBranchesTask
});
function containsDeleteBranchCommand(commands) {
  const deleteCommands = ["-d", "-D", "--delete"];
  return commands.some((command) => deleteCommands.includes(command));
}
function branchTask(customArgs) {
  const isDelete = containsDeleteBranchCommand(customArgs);
  const isCurrentOnly = customArgs.includes("--show-current");
  const commands = ["branch", ...customArgs];
  if (commands.length === 1) {
    commands.push("-a");
  }
  if (!commands.includes("-v")) {
    commands.splice(1, 0, "-v");
  }
  return {
    format: "utf-8",
    commands,
    parser(stdOut, stdErr) {
      if (isDelete) {
        return parseBranchDeletions(stdOut, stdErr).all[0];
      }
      return parseBranchSummary(stdOut, isCurrentOnly);
    }
  };
}
function branchLocalTask() {
  return {
    format: "utf-8",
    commands: ["branch", "-v"],
    parser(stdOut) {
      return parseBranchSummary(stdOut);
    }
  };
}
function deleteBranchesTask(branches, forceDelete = false) {
  return {
    format: "utf-8",
    commands: ["branch", "-v", forceDelete ? "-D" : "-d", ...branches],
    parser(stdOut, stdErr) {
      return parseBranchDeletions(stdOut, stdErr);
    },
    onError({ exitCode, stdOut }, error, done, fail) {
      if (!hasBranchDeletionError(String(error), exitCode)) {
        return fail(error);
      }
      done(stdOut);
    }
  };
}
function deleteBranchTask(branch, forceDelete = false) {
  const task = {
    format: "utf-8",
    commands: ["branch", "-v", forceDelete ? "-D" : "-d", branch],
    parser(stdOut, stdErr) {
      return parseBranchDeletions(stdOut, stdErr).branches[branch];
    },
    onError({ exitCode, stdErr, stdOut }, error, _, fail) {
      if (!hasBranchDeletionError(String(error), exitCode)) {
        return fail(error);
      }
      throw new GitResponseError(
        task.parser(bufferToString(stdOut), bufferToString(stdErr)),
        String(error)
      );
    }
  };
  return task;
}
var init_branch = __esm({
  "src/lib/tasks/branch.ts"() {
    "use strict";
    init_git_response_error();
    init_parse_branch_delete();
    init_parse_branch();
    init_utils();
  }
});

// src/lib/responses/CheckIgnore.ts
function toPath(input) {
  const path = input.trim().replace(/^["']|["']$/g, "");
  return path && (0, import_node_path.normalize)(path);
}
var import_node_path, parseCheckIgnore;
var init_CheckIgnore = __esm({
  "src/lib/responses/CheckIgnore.ts"() {
    "use strict";
    import_node_path = __nccwpck_require__(760);
    parseCheckIgnore = (text) => {
      return text.split(/\n/g).map(toPath).filter(Boolean);
    };
  }
});

// src/lib/tasks/check-ignore.ts
var check_ignore_exports = {};
__export(check_ignore_exports, {
  checkIgnoreTask: () => checkIgnoreTask
});
function checkIgnoreTask(paths) {
  return {
    commands: ["check-ignore", ...paths],
    format: "utf-8",
    parser: parseCheckIgnore
  };
}
var init_check_ignore = __esm({
  "src/lib/tasks/check-ignore.ts"() {
    "use strict";
    init_CheckIgnore();
  }
});

// src/lib/parsers/parse-fetch.ts
function parseFetchResult(stdOut, stdErr) {
  const result = {
    raw: stdOut,
    remote: null,
    branches: [],
    tags: [],
    updated: [],
    deleted: []
  };
  return parseStringResponse(result, parsers10, [stdOut, stdErr]);
}
var parsers10;
var init_parse_fetch = __esm({
  "src/lib/parsers/parse-fetch.ts"() {
    "use strict";
    init_utils();
    parsers10 = [
      new LineParser(/From (.+)$/, (result, [remote]) => {
        result.remote = remote;
      }),
      new LineParser(/\* \[new branch]\s+(\S+)\s*-> (.+)$/, (result, [name, tracking]) => {
        result.branches.push({
          name,
          tracking
        });
      }),
      new LineParser(/\* \[new tag]\s+(\S+)\s*-> (.+)$/, (result, [name, tracking]) => {
        result.tags.push({
          name,
          tracking
        });
      }),
      new LineParser(/- \[deleted]\s+\S+\s*-> (.+)$/, (result, [tracking]) => {
        result.deleted.push({
          tracking
        });
      }),
      new LineParser(
        /\s*([^.]+)\.\.(\S+)\s+(\S+)\s*-> (.+)$/,
        (result, [from, to, name, tracking]) => {
          result.updated.push({
            name,
            tracking,
            to,
            from
          });
        }
      )
    ];
  }
});

// src/lib/tasks/fetch.ts
var fetch_exports = {};
__export(fetch_exports, {
  fetchTask: () => fetchTask
});
function disallowedCommand(command) {
  return /^--upload-pack(=|$)/.test(command);
}
function fetchTask(remote, branch, customArgs) {
  const commands = ["fetch", ...customArgs];
  if (remote && branch) {
    commands.push(remote, branch);
  }
  const banned = commands.find(disallowedCommand);
  if (banned) {
    return configurationErrorTask(`git.fetch: potential exploit argument blocked.`);
  }
  return {
    commands,
    format: "utf-8",
    parser: parseFetchResult
  };
}
var init_fetch = __esm({
  "src/lib/tasks/fetch.ts"() {
    "use strict";
    init_parse_fetch();
    init_task();
  }
});

// src/lib/parsers/parse-move.ts
function parseMoveResult(stdOut) {
  return parseStringResponse({ moves: [] }, parsers11, stdOut);
}
var parsers11;
var init_parse_move = __esm({
  "src/lib/parsers/parse-move.ts"() {
    "use strict";
    init_utils();
    parsers11 = [
      new LineParser(/^Renaming (.+) to (.+)$/, (result, [from, to]) => {
        result.moves.push({ from, to });
      })
    ];
  }
});

// src/lib/tasks/move.ts
var move_exports = {};
__export(move_exports, {
  moveTask: () => moveTask
});
function moveTask(from, to) {
  return {
    commands: ["mv", "-v", ...asArray(from), to],
    format: "utf-8",
    parser: parseMoveResult
  };
}
var init_move = __esm({
  "src/lib/tasks/move.ts"() {
    "use strict";
    init_parse_move();
    init_utils();
  }
});

// src/lib/tasks/pull.ts
var pull_exports = {};
__export(pull_exports, {
  pullTask: () => pullTask
});
function pullTask(remote, branch, customArgs) {
  const commands = ["pull", ...customArgs];
  if (remote && branch) {
    commands.splice(1, 0, remote, branch);
  }
  return {
    commands,
    format: "utf-8",
    parser(stdOut, stdErr) {
      return parsePullResult(stdOut, stdErr);
    },
    onError(result, _error, _done, fail) {
      const pullError = parsePullErrorResult(
        bufferToString(result.stdOut),
        bufferToString(result.stdErr)
      );
      if (pullError) {
        return fail(new GitResponseError(pullError));
      }
      fail(_error);
    }
  };
}
var init_pull = __esm({
  "src/lib/tasks/pull.ts"() {
    "use strict";
    init_git_response_error();
    init_parse_pull();
    init_utils();
  }
});

// src/lib/responses/GetRemoteSummary.ts
function parseGetRemotes(text) {
  const remotes = {};
  forEach(text, ([name]) => remotes[name] = { name });
  return Object.values(remotes);
}
function parseGetRemotesVerbose(text) {
  const remotes = {};
  forEach(text, ([name, url, purpose]) => {
    if (!Object.hasOwn(remotes, name)) {
      remotes[name] = {
        name,
        refs: { fetch: "", push: "" }
      };
    }
    if (purpose && url) {
      remotes[name].refs[purpose.replace(/[^a-z]/g, "")] = url;
    }
  });
  return Object.values(remotes);
}
function forEach(text, handler) {
  forEachLineWithContent(text, (line) => handler(line.split(/\s+/)));
}
var init_GetRemoteSummary = __esm({
  "src/lib/responses/GetRemoteSummary.ts"() {
    "use strict";
    init_utils();
  }
});

// src/lib/tasks/remote.ts
var remote_exports = {};
__export(remote_exports, {
  addRemoteTask: () => addRemoteTask,
  getRemotesTask: () => getRemotesTask,
  listRemotesTask: () => listRemotesTask,
  remoteTask: () => remoteTask,
  removeRemoteTask: () => removeRemoteTask
});
function addRemoteTask(remoteName, remoteRepo, customArgs) {
  return straightThroughStringTask(["remote", "add", ...customArgs, remoteName, remoteRepo]);
}
function getRemotesTask(verbose) {
  const commands = ["remote"];
  if (verbose) {
    commands.push("-v");
  }
  return {
    commands,
    format: "utf-8",
    parser: verbose ? parseGetRemotesVerbose : parseGetRemotes
  };
}
function listRemotesTask(customArgs) {
  const commands = [...customArgs];
  if (commands[0] !== "ls-remote") {
    commands.unshift("ls-remote");
  }
  return straightThroughStringTask(commands);
}
function remoteTask(customArgs) {
  const commands = [...customArgs];
  if (commands[0] !== "remote") {
    commands.unshift("remote");
  }
  return straightThroughStringTask(commands);
}
function removeRemoteTask(remoteName) {
  return straightThroughStringTask(["remote", "remove", remoteName]);
}
var init_remote = __esm({
  "src/lib/tasks/remote.ts"() {
    "use strict";
    init_GetRemoteSummary();
    init_task();
  }
});

// src/lib/tasks/stash-list.ts
var stash_list_exports = {};
__export(stash_list_exports, {
  stashListTask: () => stashListTask
});
function stashListTask(opt = {}, customArgs) {
  const options = parseLogOptions(opt);
  const commands = ["stash", "list", ...options.commands, ...customArgs];
  const parser4 = createListLogSummaryParser(
    options.splitter,
    options.fields,
    logFormatFromCommand(commands)
  );
  return validateLogFormatConfig(commands) || {
    commands,
    format: "utf-8",
    parser: parser4
  };
}
var init_stash_list = __esm({
  "src/lib/tasks/stash-list.ts"() {
    "use strict";
    init_log_format();
    init_parse_list_log_summary();
    init_diff();
    init_log();
  }
});

// src/lib/tasks/sub-module.ts
var sub_module_exports = {};
__export(sub_module_exports, {
  addSubModuleTask: () => addSubModuleTask,
  initSubModuleTask: () => initSubModuleTask,
  subModuleTask: () => subModuleTask,
  updateSubModuleTask: () => updateSubModuleTask
});
function addSubModuleTask(repo, path) {
  return subModuleTask(["add", repo, path]);
}
function initSubModuleTask(customArgs) {
  return subModuleTask(["init", ...customArgs]);
}
function subModuleTask(customArgs) {
  const commands = [...customArgs];
  if (commands[0] !== "submodule") {
    commands.unshift("submodule");
  }
  return straightThroughStringTask(commands);
}
function updateSubModuleTask(customArgs) {
  return subModuleTask(["update", ...customArgs]);
}
var init_sub_module = __esm({
  "src/lib/tasks/sub-module.ts"() {
    "use strict";
    init_task();
  }
});

// src/lib/responses/TagList.ts
function singleSorted(a, b) {
  const aIsNum = Number.isNaN(a);
  const bIsNum = Number.isNaN(b);
  if (aIsNum !== bIsNum) {
    return aIsNum ? 1 : -1;
  }
  return aIsNum ? sorted(a, b) : 0;
}
function sorted(a, b) {
  return a === b ? 0 : a > b ? 1 : -1;
}
function trimmed(input) {
  return input.trim();
}
function toNumber(input) {
  if (typeof input === "string") {
    return parseInt(input.replace(/^\D+/g, ""), 10) || 0;
  }
  return 0;
}
var TagList, parseTagList;
var init_TagList = __esm({
  "src/lib/responses/TagList.ts"() {
    "use strict";
    TagList = class {
      constructor(all, latest) {
        this.all = all;
        this.latest = latest;
      }
    };
    parseTagList = function(data, customSort = false) {
      const tags = data.split("\n").map(trimmed).filter(Boolean);
      if (!customSort) {
        tags.sort(function(tagA, tagB) {
          const partsA = tagA.split(".");
          const partsB = tagB.split(".");
          if (partsA.length === 1 || partsB.length === 1) {
            return singleSorted(toNumber(partsA[0]), toNumber(partsB[0]));
          }
          for (let i = 0, l = Math.max(partsA.length, partsB.length); i < l; i++) {
            const diff = sorted(toNumber(partsA[i]), toNumber(partsB[i]));
            if (diff) {
              return diff;
            }
          }
          return 0;
        });
      }
      const latest = customSort ? tags[0] : [...tags].reverse().find((tag) => tag.indexOf(".") >= 0);
      return new TagList(tags, latest);
    };
  }
});

// src/lib/tasks/tag.ts
var tag_exports = {};
__export(tag_exports, {
  addAnnotatedTagTask: () => addAnnotatedTagTask,
  addTagTask: () => addTagTask,
  tagListTask: () => tagListTask
});
function tagListTask(customArgs = []) {
  const hasCustomSort = customArgs.some((option) => /^--sort=/.test(option));
  return {
    format: "utf-8",
    commands: ["tag", "-l", ...customArgs],
    parser(text) {
      return parseTagList(text, hasCustomSort);
    }
  };
}
function addTagTask(name) {
  return {
    format: "utf-8",
    commands: ["tag", name],
    parser() {
      return { name };
    }
  };
}
function addAnnotatedTagTask(name, tagMessage) {
  return {
    format: "utf-8",
    commands: ["tag", "-a", "-m", tagMessage, name],
    parser() {
      return { name };
    }
  };
}
var init_tag = __esm({
  "src/lib/tasks/tag.ts"() {
    "use strict";
    init_TagList();
  }
});

// src/git.js
var require_git = __commonJS({
  "src/git.js"(exports2, module2) {
    "use strict";
    var { GitExecutor: GitExecutor2 } = (init_git_executor(), __toCommonJS(git_executor_exports));
    var { SimpleGitApi: SimpleGitApi2 } = (init_simple_git_api(), __toCommonJS(simple_git_api_exports));
    var { Scheduler: Scheduler2 } = (init_scheduler(), __toCommonJS(scheduler_exports));
    var { adhocExecTask: adhocExecTask2, configurationErrorTask: configurationErrorTask2 } = (init_task(), __toCommonJS(task_exports));
    var {
      asArray: asArray2,
      filterArray: filterArray2,
      filterPrimitives: filterPrimitives2,
      filterString: filterString2,
      filterStringOrStringArray: filterStringOrStringArray2,
      filterType: filterType2,
      getTrailingOptions: getTrailingOptions2,
      trailingFunctionArgument: trailingFunctionArgument2,
      trailingOptionsArgument: trailingOptionsArgument2
    } = (init_utils(), __toCommonJS(utils_exports));
    var { applyPatchTask: applyPatchTask2 } = (init_apply_patch(), __toCommonJS(apply_patch_exports));
    var {
      branchTask: branchTask2,
      branchLocalTask: branchLocalTask2,
      deleteBranchesTask: deleteBranchesTask2,
      deleteBranchTask: deleteBranchTask2
    } = (init_branch(), __toCommonJS(branch_exports));
    var { checkIgnoreTask: checkIgnoreTask2 } = (init_check_ignore(), __toCommonJS(check_ignore_exports));
    var { checkIsRepoTask: checkIsRepoTask2 } = (init_check_is_repo(), __toCommonJS(check_is_repo_exports));
    var { cleanWithOptionsTask: cleanWithOptionsTask2, isCleanOptionsArray: isCleanOptionsArray2 } = (init_clean(), __toCommonJS(clean_exports));
    var { diffSummaryTask: diffSummaryTask2 } = (init_diff(), __toCommonJS(diff_exports));
    var { fetchTask: fetchTask2 } = (init_fetch(), __toCommonJS(fetch_exports));
    var { moveTask: moveTask2 } = (init_move(), __toCommonJS(move_exports));
    var { pullTask: pullTask2 } = (init_pull(), __toCommonJS(pull_exports));
    var { pushTagsTask: pushTagsTask2 } = (init_push(), __toCommonJS(push_exports));
    var {
      addRemoteTask: addRemoteTask2,
      getRemotesTask: getRemotesTask2,
      listRemotesTask: listRemotesTask2,
      remoteTask: remoteTask2,
      removeRemoteTask: removeRemoteTask2
    } = (init_remote(), __toCommonJS(remote_exports));
    var { getResetMode: getResetMode2, resetTask: resetTask2 } = (init_reset(), __toCommonJS(reset_exports));
    var { stashListTask: stashListTask2 } = (init_stash_list(), __toCommonJS(stash_list_exports));
    var {
      addSubModuleTask: addSubModuleTask2,
      initSubModuleTask: initSubModuleTask2,
      subModuleTask: subModuleTask2,
      updateSubModuleTask: updateSubModuleTask2
    } = (init_sub_module(), __toCommonJS(sub_module_exports));
    var { addAnnotatedTagTask: addAnnotatedTagTask2, addTagTask: addTagTask2, tagListTask: tagListTask2 } = (init_tag(), __toCommonJS(tag_exports));
    var { straightThroughBufferTask: straightThroughBufferTask2, straightThroughStringTask: straightThroughStringTask2 } = (init_task(), __toCommonJS(task_exports));
    function Git2(options, plugins) {
      this._plugins = plugins;
      this._executor = new GitExecutor2(
        options.baseDir,
        new Scheduler2(options.maxConcurrentProcesses),
        plugins
      );
      this._trimmed = options.trimmed;
    }
    (Git2.prototype = Object.create(SimpleGitApi2.prototype)).constructor = Git2;
    Git2.prototype.customBinary = function(command) {
      this._plugins.reconfigure("binary", command);
      return this;
    };
    Git2.prototype.env = function(name, value) {
      if (arguments.length === 1 && typeof name === "object") {
        this._executor.env = name;
      } else {
        (this._executor.env = this._executor.env || {})[name] = value;
      }
      return this;
    };
    Git2.prototype.stashList = function(options) {
      return this._runTask(
        stashListTask2(
          trailingOptionsArgument2(arguments) || {},
          filterArray2(options) && options || []
        ),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.mv = function(from, to) {
      return this._runTask(moveTask2(from, to), trailingFunctionArgument2(arguments));
    };
    Git2.prototype.checkoutLatestTag = function(then) {
      var git = this;
      return this.pull(function() {
        git.tags(function(err, tags) {
          git.checkout(tags.latest, then);
        });
      });
    };
    Git2.prototype.pull = function(remote, branch, options, then) {
      return this._runTask(
        pullTask2(
          filterType2(remote, filterString2),
          filterType2(branch, filterString2),
          getTrailingOptions2(arguments)
        ),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.fetch = function(remote, branch) {
      return this._runTask(
        fetchTask2(
          filterType2(remote, filterString2),
          filterType2(branch, filterString2),
          getTrailingOptions2(arguments)
        ),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.silent = function(silence) {
      return this._runTask(
        adhocExecTask2(
          () => console.warn(
            "simple-git deprecation notice: git.silent: logging should be configured using the `debug` library / `DEBUG` environment variable, this method will be removed."
          )
        )
      );
    };
    Git2.prototype.tags = function(options, then) {
      return this._runTask(
        tagListTask2(getTrailingOptions2(arguments)),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.rebase = function() {
      return this._runTask(
        straightThroughStringTask2(["rebase", ...getTrailingOptions2(arguments)]),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.reset = function(mode) {
      return this._runTask(
        resetTask2(getResetMode2(mode), getTrailingOptions2(arguments)),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.revert = function(commit) {
      const next = trailingFunctionArgument2(arguments);
      if (typeof commit !== "string") {
        return this._runTask(configurationErrorTask2("Commit must be a string"), next);
      }
      return this._runTask(
        straightThroughStringTask2(["revert", ...getTrailingOptions2(arguments, 0, true), commit]),
        next
      );
    };
    Git2.prototype.addTag = function(name) {
      const task = typeof name === "string" ? addTagTask2(name) : configurationErrorTask2("Git.addTag requires a tag name");
      return this._runTask(task, trailingFunctionArgument2(arguments));
    };
    Git2.prototype.addAnnotatedTag = function(tagName, tagMessage) {
      return this._runTask(
        addAnnotatedTagTask2(tagName, tagMessage),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.deleteLocalBranch = function(branchName, forceDelete, then) {
      return this._runTask(
        deleteBranchTask2(branchName, typeof forceDelete === "boolean" ? forceDelete : false),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.deleteLocalBranches = function(branchNames, forceDelete, then) {
      return this._runTask(
        deleteBranchesTask2(branchNames, typeof forceDelete === "boolean" ? forceDelete : false),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.branch = function(options, then) {
      return this._runTask(
        branchTask2(getTrailingOptions2(arguments)),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.branchLocal = function(then) {
      return this._runTask(branchLocalTask2(), trailingFunctionArgument2(arguments));
    };
    Git2.prototype.raw = function(commands) {
      const createRestCommands = !Array.isArray(commands);
      const command = [].slice.call(createRestCommands ? arguments : commands, 0);
      for (let i = 0; i < command.length && createRestCommands; i++) {
        if (!filterPrimitives2(command[i])) {
          command.splice(i, command.length - i);
          break;
        }
      }
      command.push(...getTrailingOptions2(arguments, 0, true));
      var next = trailingFunctionArgument2(arguments);
      if (!command.length) {
        return this._runTask(
          configurationErrorTask2("Raw: must supply one or more command to execute"),
          next
        );
      }
      return this._runTask(straightThroughStringTask2(command, this._trimmed), next);
    };
    Git2.prototype.submoduleAdd = function(repo, path, then) {
      return this._runTask(addSubModuleTask2(repo, path), trailingFunctionArgument2(arguments));
    };
    Git2.prototype.submoduleUpdate = function(args, then) {
      return this._runTask(
        updateSubModuleTask2(getTrailingOptions2(arguments, true)),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.submoduleInit = function(args, then) {
      return this._runTask(
        initSubModuleTask2(getTrailingOptions2(arguments, true)),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.subModule = function(options, then) {
      return this._runTask(
        subModuleTask2(getTrailingOptions2(arguments)),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.listRemote = function() {
      return this._runTask(
        listRemotesTask2(getTrailingOptions2(arguments)),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.addRemote = function(remoteName, remoteRepo, then) {
      return this._runTask(
        addRemoteTask2(remoteName, remoteRepo, getTrailingOptions2(arguments)),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.removeRemote = function(remoteName, then) {
      return this._runTask(removeRemoteTask2(remoteName), trailingFunctionArgument2(arguments));
    };
    Git2.prototype.getRemotes = function(verbose, then) {
      return this._runTask(getRemotesTask2(verbose === true), trailingFunctionArgument2(arguments));
    };
    Git2.prototype.remote = function(options, then) {
      return this._runTask(
        remoteTask2(getTrailingOptions2(arguments)),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.tag = function(options, then) {
      const command = getTrailingOptions2(arguments);
      if (command[0] !== "tag") {
        command.unshift("tag");
      }
      return this._runTask(straightThroughStringTask2(command), trailingFunctionArgument2(arguments));
    };
    Git2.prototype.updateServerInfo = function(then) {
      return this._runTask(
        straightThroughStringTask2(["update-server-info"]),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.pushTags = function(remote, then) {
      const task = pushTagsTask2(
        { remote: filterType2(remote, filterString2) },
        getTrailingOptions2(arguments)
      );
      return this._runTask(task, trailingFunctionArgument2(arguments));
    };
    Git2.prototype.rm = function(files) {
      return this._runTask(
        straightThroughStringTask2(["rm", "-f", ...asArray2(files)]),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.rmKeepLocal = function(files) {
      return this._runTask(
        straightThroughStringTask2(["rm", "--cached", ...asArray2(files)]),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.catFile = function(options, then) {
      return this._catFile("utf-8", arguments);
    };
    Git2.prototype.binaryCatFile = function() {
      return this._catFile("buffer", arguments);
    };
    Git2.prototype._catFile = function(format, args) {
      var handler = trailingFunctionArgument2(args);
      var command = ["cat-file"];
      var options = args[0];
      if (typeof options === "string") {
        return this._runTask(
          configurationErrorTask2("Git.catFile: options must be supplied as an array of strings"),
          handler
        );
      }
      if (Array.isArray(options)) {
        command.push.apply(command, options);
      }
      const task = format === "buffer" ? straightThroughBufferTask2(command) : straightThroughStringTask2(command);
      return this._runTask(task, handler);
    };
    Git2.prototype.diff = function(options, then) {
      const task = filterString2(options) ? configurationErrorTask2(
        "git.diff: supplying options as a single string is no longer supported, switch to an array of strings"
      ) : straightThroughStringTask2(["diff", ...getTrailingOptions2(arguments)]);
      return this._runTask(task, trailingFunctionArgument2(arguments));
    };
    Git2.prototype.diffSummary = function() {
      return this._runTask(
        diffSummaryTask2(getTrailingOptions2(arguments, 1)),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.applyPatch = function(patches) {
      const task = !filterStringOrStringArray2(patches) ? configurationErrorTask2(
        `git.applyPatch requires one or more string patches as the first argument`
      ) : applyPatchTask2(asArray2(patches), getTrailingOptions2([].slice.call(arguments, 1)));
      return this._runTask(task, trailingFunctionArgument2(arguments));
    };
    Git2.prototype.revparse = function() {
      const commands = ["rev-parse", ...getTrailingOptions2(arguments, true)];
      return this._runTask(
        straightThroughStringTask2(commands, true),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.clean = function(mode, options, then) {
      const usingCleanOptionsArray = isCleanOptionsArray2(mode);
      const cleanMode = usingCleanOptionsArray && mode.join("") || filterType2(mode, filterString2) || "";
      const customArgs = getTrailingOptions2([].slice.call(arguments, usingCleanOptionsArray ? 1 : 0));
      return this._runTask(
        cleanWithOptionsTask2(cleanMode, customArgs),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.exec = function(then) {
      const task = {
        commands: [],
        format: "utf-8",
        parser() {
          if (typeof then === "function") {
            then();
          }
        }
      };
      return this._runTask(task);
    };
    Git2.prototype.clearQueue = function() {
      return this._runTask(
        adhocExecTask2(
          () => console.warn(
            "simple-git deprecation notice: clearQueue() is deprecated and will be removed, switch to using the abortPlugin instead."
          )
        )
      );
    };
    Git2.prototype.checkIgnore = function(pathnames, then) {
      return this._runTask(
        checkIgnoreTask2(asArray2(filterType2(pathnames, filterStringOrStringArray2, []))),
        trailingFunctionArgument2(arguments)
      );
    };
    Git2.prototype.checkIsRepo = function(checkType, then) {
      return this._runTask(
        checkIsRepoTask2(filterType2(checkType, filterString2)),
        trailingFunctionArgument2(arguments)
      );
    };
    module2.exports = Git2;
  }
});

// src/lib/git-factory.ts
var git_factory_exports = {};
__export(git_factory_exports, {
  esModuleFactory: () => esModuleFactory,
  gitExportFactory: () => gitExportFactory,
  gitInstanceFactory: () => gitInstanceFactory
});
function esModuleFactory(defaultExport) {
  return Object.defineProperties(defaultExport, {
    __esModule: { value: true },
    default: { value: defaultExport }
  });
}
function gitExportFactory(factory) {
  return Object.assign(factory.bind(null), api_exports);
}
function gitInstanceFactory(baseDir, options) {
  const plugins = new PluginStore();
  const config = createInstanceConfig(
    baseDir && (typeof baseDir === "string" ? { baseDir } : baseDir) || {},
    options
  );
  if (!folderExists(config.baseDir)) {
    throw new GitConstructError(
      config,
      `Cannot use simple-git on a directory that does not exist`
    );
  }
  if (Array.isArray(config.config)) {
    plugins.add(commandConfigPrefixingPlugin(config.config));
  }
  plugins.add(blockUnsafeOperationsPlugin(config.unsafe));
  plugins.add(completionDetectionPlugin(config.completion));
  config.abort && plugins.add(abortPlugin(config.abort));
  config.progress && plugins.add(progressMonitorPlugin(config.progress));
  config.timeout && plugins.add(timeoutPlugin(config.timeout));
  config.spawnOptions && plugins.add(spawnOptionsPlugin(config.spawnOptions));
  plugins.add(suffixPathsPlugin());
  plugins.add(errorDetectionPlugin(errorDetectionHandler(true)));
  config.errors && plugins.add(errorDetectionPlugin(config.errors));
  customBinaryPlugin(plugins, config.binary, config.unsafe?.allowUnsafeCustomBinary);
  return new Git(config, plugins);
}
var Git;
var init_git_factory = __esm({
  "src/lib/git-factory.ts"() {
    "use strict";
    init_api();
    init_plugins();
    init_suffix_paths_plugin();
    init_utils();
    Git = require_git();
  }
});

// src/lib/runners/promise-wrapped.ts
var promise_wrapped_exports = {};
__export(promise_wrapped_exports, {
  gitP: () => gitP
});
function gitP(...args) {
  let git;
  let chain = Promise.resolve();
  try {
    git = gitInstanceFactory(...args);
  } catch (e) {
    chain = Promise.reject(e);
  }
  function builderReturn() {
    return promiseApi;
  }
  function chainReturn() {
    return chain;
  }
  const promiseApi = [...functionNamesBuilderApi, ...functionNamesPromiseApi].reduce(
    (api, name) => {
      const isAsync = functionNamesPromiseApi.includes(name);
      const valid = isAsync ? asyncWrapper(name, git) : syncWrapper(name, git, api);
      const alternative = isAsync ? chainReturn : builderReturn;
      Object.defineProperty(api, name, {
        enumerable: false,
        configurable: false,
        value: git ? valid : alternative
      });
      return api;
    },
    {}
  );
  return promiseApi;
  function asyncWrapper(fn, git2) {
    return function(...args2) {
      if (typeof args2[args2.length] === "function") {
        throw new TypeError(
          "Promise interface requires that handlers are not supplied inline, trailing function not allowed in call to " + fn
        );
      }
      return chain.then(function() {
        return new Promise(function(resolve, reject) {
          const callback = (err, result) => {
            if (err) {
              return reject(toError(err));
            }
            resolve(result);
          };
          args2.push(callback);
          git2[fn].apply(git2, args2);
        });
      });
    };
  }
  function syncWrapper(fn, git2, api) {
    return (...args2) => {
      git2[fn](...args2);
      return api;
    };
  }
}
function toError(error) {
  if (error instanceof Error) {
    return error;
  }
  if (typeof error === "string") {
    return new Error(error);
  }
  return new GitResponseError(error);
}
var functionNamesBuilderApi, functionNamesPromiseApi;
var init_promise_wrapped = __esm({
  "src/lib/runners/promise-wrapped.ts"() {
    "use strict";
    init_git_response_error();
    init_git_factory();
    functionNamesBuilderApi = ["customBinary", "env", "outputHandler", "silent"];
    functionNamesPromiseApi = [
      "add",
      "addAnnotatedTag",
      "addConfig",
      "addRemote",
      "addTag",
      "applyPatch",
      "binaryCatFile",
      "branch",
      "branchLocal",
      "catFile",
      "checkIgnore",
      "checkIsRepo",
      "checkout",
      "checkoutBranch",
      "checkoutLatestTag",
      "checkoutLocalBranch",
      "clean",
      "clone",
      "commit",
      "cwd",
      "deleteLocalBranch",
      "deleteLocalBranches",
      "diff",
      "diffSummary",
      "exec",
      "fetch",
      "getRemotes",
      "init",
      "listConfig",
      "listRemote",
      "log",
      "merge",
      "mergeFromTo",
      "mirror",
      "mv",
      "pull",
      "push",
      "pushTags",
      "raw",
      "rebase",
      "remote",
      "removeRemote",
      "reset",
      "revert",
      "revparse",
      "rm",
      "rmKeepLocal",
      "show",
      "stash",
      "stashList",
      "status",
      "subModule",
      "submoduleAdd",
      "submoduleInit",
      "submoduleUpdate",
      "tag",
      "tags",
      "updateServerInfo"
    ];
  }
});

// src/index.js
var { gitP: gitP2 } = (init_promise_wrapped(), __toCommonJS(promise_wrapped_exports));
var { esModuleFactory: esModuleFactory2, gitInstanceFactory: gitInstanceFactory2, gitExportFactory: gitExportFactory2 } = (init_git_factory(), __toCommonJS(git_factory_exports));
var simpleGit = esModuleFactory2(gitExportFactory2(gitInstanceFactory2));
module.exports = Object.assign(simpleGit, { gitP: gitP2, simpleGit });
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 456:
/***/ ((module) => {

module.exports = eval("require")("supports-color");


/***/ }),

/***/ 317:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 982:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 896:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 573:
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ 474:
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ 24:
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ 455:
/***/ ((module) => {

"use strict";
module.exports = require("node:fs/promises");

/***/ }),

/***/ 760:
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ 75:
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ 193:
/***/ ((module) => {

"use strict";
module.exports = require("node:string_decoder");

/***/ }),

/***/ 136:
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ 857:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 928:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 18:
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 23:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 941:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
var R=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports);var Ge=R(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.range=Y.balanced=void 0;var Gs=(n,t,e)=>{let s=n instanceof RegExp?Ie(n,e):n,i=t instanceof RegExp?Ie(t,e):t,r=s!==null&&i!=null&&(0,Y.range)(s,i,e);return r&&{start:r[0],end:r[1],pre:e.slice(0,r[0]),body:e.slice(r[0]+s.length,r[1]),post:e.slice(r[1]+i.length)}};Y.balanced=Gs;var Ie=(n,t)=>{let e=t.match(n);return e?e[0]:null},zs=(n,t,e)=>{let s,i,r,h,o,a=e.indexOf(n),l=e.indexOf(t,a+1),f=a;if(a>=0&&l>0){if(n===t)return[a,l];for(s=[],r=e.length;f>=0&&!o;){if(f===a)s.push(f),a=e.indexOf(n,f+1);else if(s.length===1){let c=s.pop();c!==void 0&&(o=[c,l])}else i=s.pop(),i!==void 0&&i<r&&(r=i,h=l),l=e.indexOf(t,f+1);f=a<l&&a>=0?a:l}s.length&&h!==void 0&&(o=[r,h])}return o};Y.range=zs});var Ke=R(it=>{"use strict";Object.defineProperty(it,"__esModule",{value:!0});it.EXPANSION_MAX=void 0;it.expand=ei;var ze=Ge(),Ue="\0SLASH"+Math.random()+"\0",$e="\0OPEN"+Math.random()+"\0",ue="\0CLOSE"+Math.random()+"\0",qe="\0COMMA"+Math.random()+"\0",He="\0PERIOD"+Math.random()+"\0",Us=new RegExp(Ue,"g"),$s=new RegExp($e,"g"),qs=new RegExp(ue,"g"),Hs=new RegExp(qe,"g"),Vs=new RegExp(He,"g"),Ks=/\\\\/g,Xs=/\\{/g,Ys=/\\}/g,Js=/\\,/g,Zs=/\\./g;it.EXPANSION_MAX=1e5;function ce(n){return isNaN(n)?n.charCodeAt(0):parseInt(n,10)}function Qs(n){return n.replace(Ks,Ue).replace(Xs,$e).replace(Ys,ue).replace(Js,qe).replace(Zs,He)}function ti(n){return n.replace(Us,"\\").replace($s,"{").replace(qs,"}").replace(Hs,",").replace(Vs,".")}function Ve(n){if(!n)return[""];let t=[],e=(0,ze.balanced)("{","}",n);if(!e)return n.split(",");let{pre:s,body:i,post:r}=e,h=s.split(",");h[h.length-1]+="{"+i+"}";let o=Ve(r);return r.length&&(h[h.length-1]+=o.shift(),h.push.apply(h,o)),t.push.apply(t,h),t}function ei(n,t={}){if(!n)return[];let{max:e=it.EXPANSION_MAX}=t;return n.slice(0,2)==="{}"&&(n="\\{\\}"+n.slice(2)),ht(Qs(n),e,!0).map(ti)}function si(n){return"{"+n+"}"}function ii(n){return/^-?0\d/.test(n)}function ri(n,t){return n<=t}function ni(n,t){return n>=t}function ht(n,t,e){let s=[],i=(0,ze.balanced)("{","}",n);if(!i)return[n];let r=i.pre,h=i.post.length?ht(i.post,t,!1):[""];if(/\$$/.test(i.pre))for(let o=0;o<h.length&&o<t;o++){let a=r+"{"+i.body+"}"+h[o];s.push(a)}else{let o=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(i.body),a=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(i.body),l=o||a,f=i.body.indexOf(",")>=0;if(!l&&!f)return i.post.match(/,(?!,).*\}/)?(n=i.pre+"{"+i.body+ue+i.post,ht(n,t,!0)):[n];let c;if(l)c=i.body.split(/\.\./);else if(c=Ve(i.body),c.length===1&&c[0]!==void 0&&(c=ht(c[0],t,!1).map(si),c.length===1))return h.map(u=>i.pre+c[0]+u);let d;if(l&&c[0]!==void 0&&c[1]!==void 0){let u=ce(c[0]),m=ce(c[1]),p=Math.max(c[0].length,c[1].length),b=c.length===3&&c[2]!==void 0?Math.abs(ce(c[2])):1,w=ri;m<u&&(b*=-1,w=ni);let E=c.some(ii);d=[];for(let y=u;w(y,m);y+=b){let S;if(a)S=String.fromCharCode(y),S==="\\"&&(S="");else if(S=String(y),E){let B=p-S.length;if(B>0){let U=new Array(B+1).join("0");y<0?S="-"+U+S.slice(1):S=U+S}}d.push(S)}}else{d=[];for(let u=0;u<c.length;u++)d.push.apply(d,ht(c[u],t,!1))}for(let u=0;u<d.length;u++)for(let m=0;m<h.length&&s.length<t;m++){let p=r+d[u]+h[m];(!e||l||p)&&s.push(p)}}return s}});var Xe=R(Ct=>{"use strict";Object.defineProperty(Ct,"__esModule",{value:!0});Ct.assertValidPattern=void 0;var hi=1024*64,oi=n=>{if(typeof n!="string")throw new TypeError("invalid pattern");if(n.length>hi)throw new TypeError("pattern is too long")};Ct.assertValidPattern=oi});var Je=R(Rt=>{"use strict";Object.defineProperty(Rt,"__esModule",{value:!0});Rt.parseClass=void 0;var ai={"[:alnum:]":["\\p{L}\\p{Nl}\\p{Nd}",!0],"[:alpha:]":["\\p{L}\\p{Nl}",!0],"[:ascii:]":["\\x00-\\x7f",!1],"[:blank:]":["\\p{Zs}\\t",!0],"[:cntrl:]":["\\p{Cc}",!0],"[:digit:]":["\\p{Nd}",!0],"[:graph:]":["\\p{Z}\\p{C}",!0,!0],"[:lower:]":["\\p{Ll}",!0],"[:print:]":["\\p{C}",!0],"[:punct:]":["\\p{P}",!0],"[:space:]":["\\p{Z}\\t\\r\\n\\v\\f",!0],"[:upper:]":["\\p{Lu}",!0],"[:word:]":["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}",!0],"[:xdigit:]":["A-Fa-f0-9",!1]},ot=n=>n.replace(/[[\]\\-]/g,"\\$&"),li=n=>n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),Ye=n=>n.join(""),ci=(n,t)=>{let e=t;if(n.charAt(e)!=="[")throw new Error("not in a brace expression");let s=[],i=[],r=e+1,h=!1,o=!1,a=!1,l=!1,f=e,c="";t:for(;r<n.length;){let p=n.charAt(r);if((p==="!"||p==="^")&&r===e+1){l=!0,r++;continue}if(p==="]"&&h&&!a){f=r+1;break}if(h=!0,p==="\\"&&!a){a=!0,r++;continue}if(p==="["&&!a){for(let[b,[w,v,E]]of Object.entries(ai))if(n.startsWith(b,r)){if(c)return["$.",!1,n.length-e,!0];r+=b.length,E?i.push(w):s.push(w),o=o||v;continue t}}if(a=!1,c){p>c?s.push(ot(c)+"-"+ot(p)):p===c&&s.push(ot(p)),c="",r++;continue}if(n.startsWith("-]",r+1)){s.push(ot(p+"-")),r+=2;continue}if(n.startsWith("-",r+1)){c=p,r+=2;continue}s.push(ot(p)),r++}if(f<r)return["",!1,0,!1];if(!s.length&&!i.length)return["$.",!1,n.length-e,!0];if(i.length===0&&s.length===1&&/^\\?.$/.test(s[0])&&!l){let p=s[0].length===2?s[0].slice(-1):s[0];return[li(p),!1,f-e,!1]}let d="["+(l?"^":"")+Ye(s)+"]",u="["+(l?"":"^")+Ye(i)+"]";return[s.length&&i.length?"("+d+"|"+u+")":s.length?d:u,o,f-e,!0]};Rt.parseClass=ci});var kt=R(At=>{"use strict";Object.defineProperty(At,"__esModule",{value:!0});At.unescape=void 0;var ui=(n,{windowsPathsNoEscape:t=!1,magicalBraces:e=!0}={})=>e?t?n.replace(/\[([^\/\\])\]/g,"$1"):n.replace(/((?!\\).|^)\[([^\/\\])\]/g,"$1$2").replace(/\\([^\/])/g,"$1"):t?n.replace(/\[([^\/\\{}])\]/g,"$1"):n.replace(/((?!\\).|^)\[([^\/\\{}])\]/g,"$1$2").replace(/\\([^\/{}])/g,"$1");At.unescape=ui});var pe=R(Dt=>{"use strict";Object.defineProperty(Dt,"__esModule",{value:!0});Dt.AST=void 0;var fi=Je(),Mt=kt(),di=new Set(["!","?","+","*","@"]),Ze=n=>di.has(n),pi="(?!(?:^|/)\\.\\.?(?:$|/))",Pt="(?!\\.)",mi=new Set(["[","."]),gi=new Set(["..","."]),wi=new Set("().*{}+?[]^$\\!"),bi=n=>n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),de="[^/]",Qe=de+"*?",ts=de+"+?",fe=class n{type;#t;#s;#n=!1;#r=[];#h;#S;#w;#c=!1;#o;#f;#u=!1;constructor(t,e,s={}){this.type=t,t&&(this.#s=!0),this.#h=e,this.#t=this.#h?this.#h.#t:this,this.#o=this.#t===this?s:this.#t.#o,this.#w=this.#t===this?[]:this.#t.#w,t==="!"&&!this.#t.#c&&this.#w.push(this),this.#S=this.#h?this.#h.#r.length:0}get hasMagic(){if(this.#s!==void 0)return this.#s;for(let t of this.#r)if(typeof t!="string"&&(t.type||t.hasMagic))return this.#s=!0;return this.#s}toString(){return this.#f!==void 0?this.#f:this.type?this.#f=this.type+"("+this.#r.map(t=>String(t)).join("|")+")":this.#f=this.#r.map(t=>String(t)).join("")}#a(){if(this!==this.#t)throw new Error("should only call on root");if(this.#c)return this;this.toString(),this.#c=!0;let t;for(;t=this.#w.pop();){if(t.type!=="!")continue;let e=t,s=e.#h;for(;s;){for(let i=e.#S+1;!s.type&&i<s.#r.length;i++)for(let r of t.#r){if(typeof r=="string")throw new Error("string part in extglob AST??");r.copyIn(s.#r[i])}e=s,s=e.#h}}return this}push(...t){for(let e of t)if(e!==""){if(typeof e!="string"&&!(e instanceof n&&e.#h===this))throw new Error("invalid part: "+e);this.#r.push(e)}}toJSON(){let t=this.type===null?this.#r.slice().map(e=>typeof e=="string"?e:e.toJSON()):[this.type,...this.#r.map(e=>e.toJSON())];return this.isStart()&&!this.type&&t.unshift([]),this.isEnd()&&(this===this.#t||this.#t.#c&&this.#h?.type==="!")&&t.push({}),t}isStart(){if(this.#t===this)return!0;if(!this.#h?.isStart())return!1;if(this.#S===0)return!0;let t=this.#h;for(let e=0;e<this.#S;e++){let s=t.#r[e];if(!(s instanceof n&&s.type==="!"))return!1}return!0}isEnd(){if(this.#t===this||this.#h?.type==="!")return!0;if(!this.#h?.isEnd())return!1;if(!this.type)return this.#h?.isEnd();let t=this.#h?this.#h.#r.length:0;return this.#S===t-1}copyIn(t){typeof t=="string"?this.push(t):this.push(t.clone(this))}clone(t){let e=new n(this.type,t);for(let s of this.#r)e.copyIn(s);return e}static#i(t,e,s,i){let r=!1,h=!1,o=-1,a=!1;if(e.type===null){let u=s,m="";for(;u<t.length;){let p=t.charAt(u++);if(r||p==="\\"){r=!r,m+=p;continue}if(h){u===o+1?(p==="^"||p==="!")&&(a=!0):p==="]"&&!(u===o+2&&a)&&(h=!1),m+=p;continue}else if(p==="["){h=!0,o=u,a=!1,m+=p;continue}if(!i.noext&&Ze(p)&&t.charAt(u)==="("){e.push(m),m="";let b=new n(p,e);u=n.#i(t,b,u,i),e.push(b);continue}m+=p}return e.push(m),u}let l=s+1,f=new n(null,e),c=[],d="";for(;l<t.length;){let u=t.charAt(l++);if(r||u==="\\"){r=!r,d+=u;continue}if(h){l===o+1?(u==="^"||u==="!")&&(a=!0):u==="]"&&!(l===o+2&&a)&&(h=!1),d+=u;continue}else if(u==="["){h=!0,o=l,a=!1,d+=u;continue}if(Ze(u)&&t.charAt(l)==="("){f.push(d),d="";let m=new n(u,f);f.push(m),l=n.#i(t,m,l,i);continue}if(u==="|"){f.push(d),d="",c.push(f),f=new n(null,e);continue}if(u===")")return d===""&&e.#r.length===0&&(e.#u=!0),f.push(d),d="",e.push(...c,f),l;d+=u}return e.type=null,e.#s=void 0,e.#r=[t.substring(s-1)],l}static fromGlob(t,e={}){let s=new n(null,void 0,e);return n.#i(t,s,0,e),s}toMMPattern(){if(this!==this.#t)return this.#t.toMMPattern();let t=this.toString(),[e,s,i,r]=this.toRegExpSource();if(!(i||this.#s||this.#o.nocase&&!this.#o.nocaseMagicOnly&&t.toUpperCase()!==t.toLowerCase()))return s;let o=(this.#o.nocase?"i":"")+(r?"u":"");return Object.assign(new RegExp(`^${e}$`,o),{_src:e,_glob:t})}get options(){return this.#o}toRegExpSource(t){let e=t??!!this.#o.dot;if(this.#t===this&&this.#a(),!this.type){let a=this.isStart()&&this.isEnd()&&!this.#r.some(u=>typeof u!="string"),l=this.#r.map(u=>{let[m,p,b,w]=typeof u=="string"?n.#v(u,this.#s,a):u.toRegExpSource(t);return this.#s=this.#s||b,this.#n=this.#n||w,m}).join(""),f="";if(this.isStart()&&typeof this.#r[0]=="string"&&!(this.#r.length===1&&gi.has(this.#r[0]))){let m=mi,p=e&&m.has(l.charAt(0))||l.startsWith("\\.")&&m.has(l.charAt(2))||l.startsWith("\\.\\.")&&m.has(l.charAt(4)),b=!e&&!t&&m.has(l.charAt(0));f=p?pi:b?Pt:""}let c="";return this.isEnd()&&this.#t.#c&&this.#h?.type==="!"&&(c="(?:$|\\/)"),[f+l+c,(0,Mt.unescape)(l),this.#s=!!this.#s,this.#n]}let s=this.type==="*"||this.type==="+",i=this.type==="!"?"(?:(?!(?:":"(?:",r=this.#d(e);if(this.isStart()&&this.isEnd()&&!r&&this.type!=="!"){let a=this.toString();return this.#r=[a],this.type=null,this.#s=void 0,[a,(0,Mt.unescape)(this.toString()),!1,!1]}let h=!s||t||e||!Pt?"":this.#d(!0);h===r&&(h=""),h&&(r=`(?:${r})(?:${h})*?`);let o="";if(this.type==="!"&&this.#u)o=(this.isStart()&&!e?Pt:"")+ts;else{let a=this.type==="!"?"))"+(this.isStart()&&!e&&!t?Pt:"")+Qe+")":this.type==="@"?")":this.type==="?"?")?":this.type==="+"&&h?")":this.type==="*"&&h?")?":`)${this.type}`;o=i+r+a}return[o,(0,Mt.unescape)(r),this.#s=!!this.#s,this.#n]}#d(t){return this.#r.map(e=>{if(typeof e=="string")throw new Error("string type in extglob ast??");let[s,i,r,h]=e.toRegExpSource(t);return this.#n=this.#n||h,s}).filter(e=>!(this.isStart()&&this.isEnd())||!!e).join("|")}static#v(t,e,s=!1){let i=!1,r="",h=!1,o=!1;for(let a=0;a<t.length;a++){let l=t.charAt(a);if(i){i=!1,r+=(wi.has(l)?"\\":"")+l;continue}if(l==="*"){if(o)continue;o=!0,r+=s&&/^[*]+$/.test(t)?ts:Qe,e=!0;continue}else o=!1;if(l==="\\"){a===t.length-1?r+="\\\\":i=!0;continue}if(l==="["){let[f,c,d,u]=(0,fi.parseClass)(t,a);if(d){r+=f,h=h||c,a+=d-1,e=e||u;continue}}if(l==="?"){r+=de,e=!0;continue}r+=bi(l)}return[r,(0,Mt.unescape)(t),!!e,h]}};Dt.AST=fe});var me=R(Ft=>{"use strict";Object.defineProperty(Ft,"__esModule",{value:!0});Ft.escape=void 0;var yi=(n,{windowsPathsNoEscape:t=!1,magicalBraces:e=!1}={})=>e?t?n.replace(/[?*()[\]{}]/g,"[$&]"):n.replace(/[?*()[\]\\{}]/g,"\\$&"):t?n.replace(/[?*()[\]]/g,"[$&]"):n.replace(/[?*()[\]\\]/g,"\\$&");Ft.escape=yi});var H=R(g=>{"use strict";Object.defineProperty(g,"__esModule",{value:!0});g.unescape=g.escape=g.AST=g.Minimatch=g.match=g.makeRe=g.braceExpand=g.defaults=g.filter=g.GLOBSTAR=g.sep=g.minimatch=void 0;var Si=Ke(),jt=Xe(),is=pe(),vi=me(),Ei=kt(),_i=(n,t,e={})=>((0,jt.assertValidPattern)(t),!e.nocomment&&t.charAt(0)==="#"?!1:new J(t,e).match(n));g.minimatch=_i;var Oi=/^\*+([^+@!?\*\[\(]*)$/,xi=n=>t=>!t.startsWith(".")&&t.endsWith(n),Ti=n=>t=>t.endsWith(n),Ci=n=>(n=n.toLowerCase(),t=>!t.startsWith(".")&&t.toLowerCase().endsWith(n)),Ri=n=>(n=n.toLowerCase(),t=>t.toLowerCase().endsWith(n)),Ai=/^\*+\.\*+$/,ki=n=>!n.startsWith(".")&&n.includes("."),Mi=n=>n!=="."&&n!==".."&&n.includes("."),Pi=/^\.\*+$/,Di=n=>n!=="."&&n!==".."&&n.startsWith("."),Fi=/^\*+$/,ji=n=>n.length!==0&&!n.startsWith("."),Ni=n=>n.length!==0&&n!=="."&&n!=="..",Li=/^\?+([^+@!?\*\[\(]*)?$/,Wi=([n,t=""])=>{let e=rs([n]);return t?(t=t.toLowerCase(),s=>e(s)&&s.toLowerCase().endsWith(t)):e},Bi=([n,t=""])=>{let e=ns([n]);return t?(t=t.toLowerCase(),s=>e(s)&&s.toLowerCase().endsWith(t)):e},Ii=([n,t=""])=>{let e=ns([n]);return t?s=>e(s)&&s.endsWith(t):e},Gi=([n,t=""])=>{let e=rs([n]);return t?s=>e(s)&&s.endsWith(t):e},rs=([n])=>{let t=n.length;return e=>e.length===t&&!e.startsWith(".")},ns=([n])=>{let t=n.length;return e=>e.length===t&&e!=="."&&e!==".."},hs=typeof process=="object"&&process?typeof process.env=="object"&&process.env&&process.env.__MINIMATCH_TESTING_PLATFORM__||process.platform:"posix",es={win32:{sep:"\\"},posix:{sep:"/"}};g.sep=hs==="win32"?es.win32.sep:es.posix.sep;g.minimatch.sep=g.sep;g.GLOBSTAR=Symbol("globstar **");g.minimatch.GLOBSTAR=g.GLOBSTAR;var zi="[^/]",Ui=zi+"*?",$i="(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",qi="(?:(?!(?:\\/|^)\\.).)*?",Hi=(n,t={})=>e=>(0,g.minimatch)(e,n,t);g.filter=Hi;g.minimatch.filter=g.filter;var F=(n,t={})=>Object.assign({},n,t),Vi=n=>{if(!n||typeof n!="object"||!Object.keys(n).length)return g.minimatch;let t=g.minimatch;return Object.assign((s,i,r={})=>t(s,i,F(n,r)),{Minimatch:class extends t.Minimatch{constructor(i,r={}){super(i,F(n,r))}static defaults(i){return t.defaults(F(n,i)).Minimatch}},AST:class extends t.AST{constructor(i,r,h={}){super(i,r,F(n,h))}static fromGlob(i,r={}){return t.AST.fromGlob(i,F(n,r))}},unescape:(s,i={})=>t.unescape(s,F(n,i)),escape:(s,i={})=>t.escape(s,F(n,i)),filter:(s,i={})=>t.filter(s,F(n,i)),defaults:s=>t.defaults(F(n,s)),makeRe:(s,i={})=>t.makeRe(s,F(n,i)),braceExpand:(s,i={})=>t.braceExpand(s,F(n,i)),match:(s,i,r={})=>t.match(s,i,F(n,r)),sep:t.sep,GLOBSTAR:g.GLOBSTAR})};g.defaults=Vi;g.minimatch.defaults=g.defaults;var Ki=(n,t={})=>((0,jt.assertValidPattern)(n),t.nobrace||!/\{(?:(?!\{).)*\}/.test(n)?[n]:(0,Si.expand)(n,{max:t.braceExpandMax}));g.braceExpand=Ki;g.minimatch.braceExpand=g.braceExpand;var Xi=(n,t={})=>new J(n,t).makeRe();g.makeRe=Xi;g.minimatch.makeRe=g.makeRe;var Yi=(n,t,e={})=>{let s=new J(t,e);return n=n.filter(i=>s.match(i)),s.options.nonull&&!n.length&&n.push(t),n};g.match=Yi;g.minimatch.match=g.match;var ss=/[?*]|[+@!]\(.*?\)|\[|\]/,Ji=n=>n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),J=class{options;set;pattern;windowsPathsNoEscape;nonegate;negate;comment;empty;preserveMultipleSlashes;partial;globSet;globParts;nocase;isWindows;platform;windowsNoMagicRoot;regexp;constructor(t,e={}){(0,jt.assertValidPattern)(t),e=e||{},this.options=e,this.pattern=t,this.platform=e.platform||hs,this.isWindows=this.platform==="win32";let s="allowWindowsEscape";this.windowsPathsNoEscape=!!e.windowsPathsNoEscape||e[s]===!1,this.windowsPathsNoEscape&&(this.pattern=this.pattern.replace(/\\/g,"/")),this.preserveMultipleSlashes=!!e.preserveMultipleSlashes,this.regexp=null,this.negate=!1,this.nonegate=!!e.nonegate,this.comment=!1,this.empty=!1,this.partial=!!e.partial,this.nocase=!!this.options.nocase,this.windowsNoMagicRoot=e.windowsNoMagicRoot!==void 0?e.windowsNoMagicRoot:!!(this.isWindows&&this.nocase),this.globSet=[],this.globParts=[],this.set=[],this.make()}hasMagic(){if(this.options.magicalBraces&&this.set.length>1)return!0;for(let t of this.set)for(let e of t)if(typeof e!="string")return!0;return!1}debug(...t){}make(){let t=this.pattern,e=this.options;if(!e.nocomment&&t.charAt(0)==="#"){this.comment=!0;return}if(!t){this.empty=!0;return}this.parseNegate(),this.globSet=[...new Set(this.braceExpand())],e.debug&&(this.debug=(...r)=>console.error(...r)),this.debug(this.pattern,this.globSet);let s=this.globSet.map(r=>this.slashSplit(r));this.globParts=this.preprocess(s),this.debug(this.pattern,this.globParts);let i=this.globParts.map((r,h,o)=>{if(this.isWindows&&this.windowsNoMagicRoot){let a=r[0]===""&&r[1]===""&&(r[2]==="?"||!ss.test(r[2]))&&!ss.test(r[3]),l=/^[a-z]:/i.test(r[0]);if(a)return[...r.slice(0,4),...r.slice(4).map(f=>this.parse(f))];if(l)return[r[0],...r.slice(1).map(f=>this.parse(f))]}return r.map(a=>this.parse(a))});if(this.debug(this.pattern,i),this.set=i.filter(r=>r.indexOf(!1)===-1),this.isWindows)for(let r=0;r<this.set.length;r++){let h=this.set[r];h[0]===""&&h[1]===""&&this.globParts[r][2]==="?"&&typeof h[3]=="string"&&/^[a-z]:$/i.test(h[3])&&(h[2]="?")}this.debug(this.pattern,this.set)}preprocess(t){if(this.options.noglobstar)for(let s=0;s<t.length;s++)for(let i=0;i<t[s].length;i++)t[s][i]==="**"&&(t[s][i]="*");let{optimizationLevel:e=1}=this.options;return e>=2?(t=this.firstPhasePreProcess(t),t=this.secondPhasePreProcess(t)):e>=1?t=this.levelOneOptimize(t):t=this.adjascentGlobstarOptimize(t),t}adjascentGlobstarOptimize(t){return t.map(e=>{let s=-1;for(;(s=e.indexOf("**",s+1))!==-1;){let i=s;for(;e[i+1]==="**";)i++;i!==s&&e.splice(s,i-s)}return e})}levelOneOptimize(t){return t.map(e=>(e=e.reduce((s,i)=>{let r=s[s.length-1];return i==="**"&&r==="**"?s:i===".."&&r&&r!==".."&&r!=="."&&r!=="**"?(s.pop(),s):(s.push(i),s)},[]),e.length===0?[""]:e))}levelTwoFileOptimize(t){Array.isArray(t)||(t=this.slashSplit(t));let e=!1;do{if(e=!1,!this.preserveMultipleSlashes){for(let i=1;i<t.length-1;i++){let r=t[i];i===1&&r===""&&t[0]===""||(r==="."||r==="")&&(e=!0,t.splice(i,1),i--)}t[0]==="."&&t.length===2&&(t[1]==="."||t[1]==="")&&(e=!0,t.pop())}let s=0;for(;(s=t.indexOf("..",s+1))!==-1;){let i=t[s-1];i&&i!=="."&&i!==".."&&i!=="**"&&(e=!0,t.splice(s-1,2),s-=2)}}while(e);return t.length===0?[""]:t}firstPhasePreProcess(t){let e=!1;do{e=!1;for(let s of t){let i=-1;for(;(i=s.indexOf("**",i+1))!==-1;){let h=i;for(;s[h+1]==="**";)h++;h>i&&s.splice(i+1,h-i);let o=s[i+1],a=s[i+2],l=s[i+3];if(o!==".."||!a||a==="."||a===".."||!l||l==="."||l==="..")continue;e=!0,s.splice(i,1);let f=s.slice(0);f[i]="**",t.push(f),i--}if(!this.preserveMultipleSlashes){for(let h=1;h<s.length-1;h++){let o=s[h];h===1&&o===""&&s[0]===""||(o==="."||o==="")&&(e=!0,s.splice(h,1),h--)}s[0]==="."&&s.length===2&&(s[1]==="."||s[1]==="")&&(e=!0,s.pop())}let r=0;for(;(r=s.indexOf("..",r+1))!==-1;){let h=s[r-1];if(h&&h!=="."&&h!==".."&&h!=="**"){e=!0;let a=r===1&&s[r+1]==="**"?["."]:[];s.splice(r-1,2,...a),s.length===0&&s.push(""),r-=2}}}}while(e);return t}secondPhasePreProcess(t){for(let e=0;e<t.length-1;e++)for(let s=e+1;s<t.length;s++){let i=this.partsMatch(t[e],t[s],!this.preserveMultipleSlashes);if(i){t[e]=[],t[s]=i;break}}return t.filter(e=>e.length)}partsMatch(t,e,s=!1){let i=0,r=0,h=[],o="";for(;i<t.length&&r<e.length;)if(t[i]===e[r])h.push(o==="b"?e[r]:t[i]),i++,r++;else if(s&&t[i]==="**"&&e[r]===t[i+1])h.push(t[i]),i++;else if(s&&e[r]==="**"&&t[i]===e[r+1])h.push(e[r]),r++;else if(t[i]==="*"&&e[r]&&(this.options.dot||!e[r].startsWith("."))&&e[r]!=="**"){if(o==="b")return!1;o="a",h.push(t[i]),i++,r++}else if(e[r]==="*"&&t[i]&&(this.options.dot||!t[i].startsWith("."))&&t[i]!=="**"){if(o==="a")return!1;o="b",h.push(e[r]),i++,r++}else return!1;return t.length===e.length&&h}parseNegate(){if(this.nonegate)return;let t=this.pattern,e=!1,s=0;for(let i=0;i<t.length&&t.charAt(i)==="!";i++)e=!e,s++;s&&(this.pattern=t.slice(s)),this.negate=e}matchOne(t,e,s=!1){let i=this.options;if(this.isWindows){let p=typeof t[0]=="string"&&/^[a-z]:$/i.test(t[0]),b=!p&&t[0]===""&&t[1]===""&&t[2]==="?"&&/^[a-z]:$/i.test(t[3]),w=typeof e[0]=="string"&&/^[a-z]:$/i.test(e[0]),v=!w&&e[0]===""&&e[1]===""&&e[2]==="?"&&typeof e[3]=="string"&&/^[a-z]:$/i.test(e[3]),E=b?3:p?0:void 0,y=v?3:w?0:void 0;if(typeof E=="number"&&typeof y=="number"){let[S,B]=[t[E],e[y]];S.toLowerCase()===B.toLowerCase()&&(e[y]=S,y>E?e=e.slice(y):E>y&&(t=t.slice(E)))}}let{optimizationLevel:r=1}=this.options;r>=2&&(t=this.levelTwoFileOptimize(t)),this.debug("matchOne",this,{file:t,pattern:e}),this.debug("matchOne",t.length,e.length);for(var h=0,o=0,a=t.length,l=e.length;h<a&&o<l;h++,o++){this.debug("matchOne loop");var f=e[o],c=t[h];if(this.debug(e,f,c),f===!1)return!1;if(f===g.GLOBSTAR){this.debug("GLOBSTAR",[e,f,c]);var d=h,u=o+1;if(u===l){for(this.debug("** at the end");h<a;h++)if(t[h]==="."||t[h]===".."||!i.dot&&t[h].charAt(0)===".")return!1;return!0}for(;d<a;){var m=t[d];if(this.debug(`
globstar while`,t,d,e,u,m),this.matchOne(t.slice(d),e.slice(u),s))return this.debug("globstar found match!",d,a,m),!0;if(m==="."||m===".."||!i.dot&&m.charAt(0)==="."){this.debug("dot detected!",t,d,e,u);break}this.debug("globstar swallow a segment, and continue"),d++}return!!(s&&(this.debug(`
>>> no match, partial?`,t,d,e,u),d===a))}let p;if(typeof f=="string"?(p=c===f,this.debug("string match",f,c,p)):(p=f.test(c),this.debug("pattern match",f,c,p)),!p)return!1}if(h===a&&o===l)return!0;if(h===a)return s;if(o===l)return h===a-1&&t[h]==="";throw new Error("wtf?")}braceExpand(){return(0,g.braceExpand)(this.pattern,this.options)}parse(t){(0,jt.assertValidPattern)(t);let e=this.options;if(t==="**")return g.GLOBSTAR;if(t==="")return"";let s,i=null;(s=t.match(Fi))?i=e.dot?Ni:ji:(s=t.match(Oi))?i=(e.nocase?e.dot?Ri:Ci:e.dot?Ti:xi)(s[1]):(s=t.match(Li))?i=(e.nocase?e.dot?Bi:Wi:e.dot?Ii:Gi)(s):(s=t.match(Ai))?i=e.dot?Mi:ki:(s=t.match(Pi))&&(i=Di);let r=is.AST.fromGlob(t,this.options).toMMPattern();return i&&typeof r=="object"&&Reflect.defineProperty(r,"test",{value:i}),r}makeRe(){if(this.regexp||this.regexp===!1)return this.regexp;let t=this.set;if(!t.length)return this.regexp=!1,this.regexp;let e=this.options,s=e.noglobstar?Ui:e.dot?$i:qi,i=new Set(e.nocase?["i"]:[]),r=t.map(a=>{let l=a.map(c=>{if(c instanceof RegExp)for(let d of c.flags.split(""))i.add(d);return typeof c=="string"?Ji(c):c===g.GLOBSTAR?g.GLOBSTAR:c._src});l.forEach((c,d)=>{let u=l[d+1],m=l[d-1];c!==g.GLOBSTAR||m===g.GLOBSTAR||(m===void 0?u!==void 0&&u!==g.GLOBSTAR?l[d+1]="(?:\\/|"+s+"\\/)?"+u:l[d]=s:u===void 0?l[d-1]=m+"(?:\\/|\\/"+s+")?":u!==g.GLOBSTAR&&(l[d-1]=m+"(?:\\/|\\/"+s+"\\/)"+u,l[d+1]=g.GLOBSTAR))});let f=l.filter(c=>c!==g.GLOBSTAR);if(this.partial&&f.length>=1){let c=[];for(let d=1;d<=f.length;d++)c.push(f.slice(0,d).join("/"));return"(?:"+c.join("|")+")"}return f.join("/")}).join("|"),[h,o]=t.length>1?["(?:",")"]:["",""];r="^"+h+r+o+"$",this.partial&&(r="^(?:\\/|"+h+r.slice(1,-1)+o+")$"),this.negate&&(r="^(?!"+r+").+$");try{this.regexp=new RegExp(r,[...i].join(""))}catch{this.regexp=!1}return this.regexp}slashSplit(t){return this.preserveMultipleSlashes?t.split("/"):this.isWindows&&/^\/\/[^\/]+/.test(t)?["",...t.split(/\/+/)]:t.split(/\/+/)}match(t,e=this.partial){if(this.debug("match",t,this.pattern),this.comment)return!1;if(this.empty)return t==="";if(t==="/"&&e)return!0;let s=this.options;this.isWindows&&(t=t.split("\\").join("/"));let i=this.slashSplit(t);this.debug(this.pattern,"split",i);let r=this.set;this.debug(this.pattern,"set",r);let h=i[i.length-1];if(!h)for(let o=i.length-2;!h&&o>=0;o--)h=i[o];for(let o=0;o<r.length;o++){let a=r[o],l=i;if(s.matchBase&&a.length===1&&(l=[h]),this.matchOne(l,a,e))return s.flipNegate?!0:!this.negate}return s.flipNegate?!1:this.negate}static defaults(t){return g.minimatch.defaults(t).Minimatch}};g.Minimatch=J;var Zi=pe();Object.defineProperty(g,"AST",{enumerable:!0,get:function(){return Zi.AST}});var Qi=me();Object.defineProperty(g,"escape",{enumerable:!0,get:function(){return Qi.escape}});var tr=kt();Object.defineProperty(g,"unescape",{enumerable:!0,get:function(){return tr.unescape}});g.minimatch.AST=is.AST;g.minimatch.Minimatch=J;g.minimatch.escape=vi.escape;g.minimatch.unescape=Ei.unescape});var fs=R(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});Wt.LRUCache=void 0;var er=typeof performance=="object"&&performance&&typeof performance.now=="function"?performance:Date,as=new Set,ge=typeof process=="object"&&process?process:{},ls=(n,t,e,s)=>{typeof ge.emitWarning=="function"?ge.emitWarning(n,t,e,s):console.error(`[${e}] ${t}: ${n}`)},Lt=globalThis.AbortController,os=globalThis.AbortSignal;if(typeof Lt>"u"){os=class{onabort;_onabort=[];reason;aborted=!1;addEventListener(e,s){this._onabort.push(s)}},Lt=class{constructor(){t()}signal=new os;abort(e){if(!this.signal.aborted){this.signal.reason=e,this.signal.aborted=!0;for(let s of this.signal._onabort)s(e);this.signal.onabort?.(e)}}};let n=ge.env?.LRU_CACHE_IGNORE_AC_WARNING!=="1",t=()=>{n&&(n=!1,ls("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.","NO_ABORT_CONTROLLER","ENOTSUP",t))}}var sr=n=>!as.has(n),V=n=>n&&n===Math.floor(n)&&n>0&&isFinite(n),cs=n=>V(n)?n<=Math.pow(2,8)?Uint8Array:n<=Math.pow(2,16)?Uint16Array:n<=Math.pow(2,32)?Uint32Array:n<=Number.MAX_SAFE_INTEGER?Nt:null:null,Nt=class extends Array{constructor(n){super(n),this.fill(0)}},ir=class at{heap;length;static#t=!1;static create(t){let e=cs(t);if(!e)return[];at.#t=!0;let s=new at(t,e);return at.#t=!1,s}constructor(t,e){if(!at.#t)throw new TypeError("instantiate Stack using Stack.create(n)");this.heap=new e(t),this.length=0}push(t){this.heap[this.length++]=t}pop(){return this.heap[--this.length]}},rr=class us{#t;#s;#n;#r;#h;#S;#w;#c;get perf(){return this.#c}ttl;ttlResolution;ttlAutopurge;updateAgeOnGet;updateAgeOnHas;allowStale;noDisposeOnSet;noUpdateTTL;maxEntrySize;sizeCalculation;noDeleteOnFetchRejection;noDeleteOnStaleGet;allowStaleOnFetchAbort;allowStaleOnFetchRejection;ignoreFetchAbort;#o;#f;#u;#a;#i;#d;#v;#y;#p;#R;#m;#O;#x;#g;#b;#E;#T;#e;#F;static unsafeExposeInternals(t){return{starts:t.#x,ttls:t.#g,autopurgeTimers:t.#b,sizes:t.#O,keyMap:t.#u,keyList:t.#a,valList:t.#i,next:t.#d,prev:t.#v,get head(){return t.#y},get tail(){return t.#p},free:t.#R,isBackgroundFetch:e=>t.#l(e),backgroundFetch:(e,s,i,r)=>t.#z(e,s,i,r),moveToTail:e=>t.#N(e),indexes:e=>t.#k(e),rindexes:e=>t.#M(e),isStale:e=>t.#_(e)}}get max(){return this.#t}get maxSize(){return this.#s}get calculatedSize(){return this.#f}get size(){return this.#o}get fetchMethod(){return this.#S}get memoMethod(){return this.#w}get dispose(){return this.#n}get onInsert(){return this.#r}get disposeAfter(){return this.#h}constructor(t){let{max:e=0,ttl:s,ttlResolution:i=1,ttlAutopurge:r,updateAgeOnGet:h,updateAgeOnHas:o,allowStale:a,dispose:l,onInsert:f,disposeAfter:c,noDisposeOnSet:d,noUpdateTTL:u,maxSize:m=0,maxEntrySize:p=0,sizeCalculation:b,fetchMethod:w,memoMethod:v,noDeleteOnFetchRejection:E,noDeleteOnStaleGet:y,allowStaleOnFetchRejection:S,allowStaleOnFetchAbort:B,ignoreFetchAbort:U,perf:et}=t;if(et!==void 0&&typeof et?.now!="function")throw new TypeError("perf option must have a now() method if specified");if(this.#c=et??er,e!==0&&!V(e))throw new TypeError("max option must be a nonnegative integer");let st=e?cs(e):Array;if(!st)throw new Error("invalid max value: "+e);if(this.#t=e,this.#s=m,this.maxEntrySize=p||this.#s,this.sizeCalculation=b,this.sizeCalculation){if(!this.#s&&!this.maxEntrySize)throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");if(typeof this.sizeCalculation!="function")throw new TypeError("sizeCalculation set to non-function")}if(v!==void 0&&typeof v!="function")throw new TypeError("memoMethod must be a function if defined");if(this.#w=v,w!==void 0&&typeof w!="function")throw new TypeError("fetchMethod must be a function if specified");if(this.#S=w,this.#T=!!w,this.#u=new Map,this.#a=new Array(e).fill(void 0),this.#i=new Array(e).fill(void 0),this.#d=new st(e),this.#v=new st(e),this.#y=0,this.#p=0,this.#R=ir.create(e),this.#o=0,this.#f=0,typeof l=="function"&&(this.#n=l),typeof f=="function"&&(this.#r=f),typeof c=="function"?(this.#h=c,this.#m=[]):(this.#h=void 0,this.#m=void 0),this.#E=!!this.#n,this.#F=!!this.#r,this.#e=!!this.#h,this.noDisposeOnSet=!!d,this.noUpdateTTL=!!u,this.noDeleteOnFetchRejection=!!E,this.allowStaleOnFetchRejection=!!S,this.allowStaleOnFetchAbort=!!B,this.ignoreFetchAbort=!!U,this.maxEntrySize!==0){if(this.#s!==0&&!V(this.#s))throw new TypeError("maxSize must be a positive integer if specified");if(!V(this.maxEntrySize))throw new TypeError("maxEntrySize must be a positive integer if specified");this.#$()}if(this.allowStale=!!a,this.noDeleteOnStaleGet=!!y,this.updateAgeOnGet=!!h,this.updateAgeOnHas=!!o,this.ttlResolution=V(i)||i===0?i:1,this.ttlAutopurge=!!r,this.ttl=s||0,this.ttl){if(!V(this.ttl))throw new TypeError("ttl must be a positive integer if specified");this.#P()}if(this.#t===0&&this.ttl===0&&this.#s===0)throw new TypeError("At least one of max, maxSize, or ttl is required");if(!this.ttlAutopurge&&!this.#t&&!this.#s){let le="LRU_CACHE_UNBOUNDED";sr(le)&&(as.add(le),ls("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.","UnboundedCacheWarning",le,us))}}getRemainingTTL(t){return this.#u.has(t)?1/0:0}#P(){let t=new Nt(this.#t),e=new Nt(this.#t);this.#g=t,this.#x=e;let s=this.ttlAutopurge?new Array(this.#t):void 0;this.#b=s,this.#W=(h,o,a=this.#c.now())=>{if(e[h]=o!==0?a:0,t[h]=o,s?.[h]&&(clearTimeout(s[h]),s[h]=void 0),o!==0&&s){let l=setTimeout(()=>{this.#_(h)&&this.#A(this.#a[h],"expire")},o+1);l.unref&&l.unref(),s[h]=l}},this.#C=h=>{e[h]=t[h]!==0?this.#c.now():0},this.#D=(h,o)=>{if(t[o]){let a=t[o],l=e[o];if(!a||!l)return;h.ttl=a,h.start=l,h.now=i||r();let f=h.now-l;h.remainingTTL=a-f}};let i=0,r=()=>{let h=this.#c.now();if(this.ttlResolution>0){i=h;let o=setTimeout(()=>i=0,this.ttlResolution);o.unref&&o.unref()}return h};this.getRemainingTTL=h=>{let o=this.#u.get(h);if(o===void 0)return 0;let a=t[o],l=e[o];if(!a||!l)return 1/0;let f=(i||r())-l;return a-f},this.#_=h=>{let o=e[h],a=t[h];return!!a&&!!o&&(i||r())-o>a}}#C=()=>{};#D=()=>{};#W=()=>{};#_=()=>!1;#$(){let t=new Nt(this.#t);this.#f=0,this.#O=t,this.#L=e=>{this.#f-=t[e],t[e]=0},this.#B=(e,s,i,r)=>{if(this.#l(s))return 0;if(!V(i))if(r){if(typeof r!="function")throw new TypeError("sizeCalculation must be a function");if(i=r(s,e),!V(i))throw new TypeError("sizeCalculation return invalid (expect positive integer)")}else throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");return i},this.#j=(e,s,i)=>{if(t[e]=s,this.#s){let r=this.#s-t[e];for(;this.#f>r;)this.#G(!0)}this.#f+=t[e],i&&(i.entrySize=s,i.totalCalculatedSize=this.#f)}}#L=t=>{};#j=(t,e,s)=>{};#B=(t,e,s,i)=>{if(s||i)throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");return 0};*#k({allowStale:t=this.allowStale}={}){if(this.#o)for(let e=this.#p;!(!this.#I(e)||((t||!this.#_(e))&&(yield e),e===this.#y));)e=this.#v[e]}*#M({allowStale:t=this.allowStale}={}){if(this.#o)for(let e=this.#y;!(!this.#I(e)||((t||!this.#_(e))&&(yield e),e===this.#p));)e=this.#d[e]}#I(t){return t!==void 0&&this.#u.get(this.#a[t])===t}*entries(){for(let t of this.#k())this.#i[t]!==void 0&&this.#a[t]!==void 0&&!this.#l(this.#i[t])&&(yield[this.#a[t],this.#i[t]])}*rentries(){for(let t of this.#M())this.#i[t]!==void 0&&this.#a[t]!==void 0&&!this.#l(this.#i[t])&&(yield[this.#a[t],this.#i[t]])}*keys(){for(let t of this.#k()){let e=this.#a[t];e!==void 0&&!this.#l(this.#i[t])&&(yield e)}}*rkeys(){for(let t of this.#M()){let e=this.#a[t];e!==void 0&&!this.#l(this.#i[t])&&(yield e)}}*values(){for(let t of this.#k())this.#i[t]!==void 0&&!this.#l(this.#i[t])&&(yield this.#i[t])}*rvalues(){for(let t of this.#M())this.#i[t]!==void 0&&!this.#l(this.#i[t])&&(yield this.#i[t])}[Symbol.iterator](){return this.entries()}[Symbol.toStringTag]="LRUCache";find(t,e={}){for(let s of this.#k()){let i=this.#i[s],r=this.#l(i)?i.__staleWhileFetching:i;if(r!==void 0&&t(r,this.#a[s],this))return this.get(this.#a[s],e)}}forEach(t,e=this){for(let s of this.#k()){let i=this.#i[s],r=this.#l(i)?i.__staleWhileFetching:i;r!==void 0&&t.call(e,r,this.#a[s],this)}}rforEach(t,e=this){for(let s of this.#M()){let i=this.#i[s],r=this.#l(i)?i.__staleWhileFetching:i;r!==void 0&&t.call(e,r,this.#a[s],this)}}purgeStale(){let t=!1;for(let e of this.#M({allowStale:!0}))this.#_(e)&&(this.#A(this.#a[e],"expire"),t=!0);return t}info(t){let e=this.#u.get(t);if(e===void 0)return;let s=this.#i[e],i=this.#l(s)?s.__staleWhileFetching:s;if(i===void 0)return;let r={value:i};if(this.#g&&this.#x){let h=this.#g[e],o=this.#x[e];if(h&&o){let a=h-(this.#c.now()-o);r.ttl=a,r.start=Date.now()}}return this.#O&&(r.size=this.#O[e]),r}dump(){let t=[];for(let e of this.#k({allowStale:!0})){let s=this.#a[e],i=this.#i[e],r=this.#l(i)?i.__staleWhileFetching:i;if(r===void 0||s===void 0)continue;let h={value:r};if(this.#g&&this.#x){h.ttl=this.#g[e];let o=this.#c.now()-this.#x[e];h.start=Math.floor(Date.now()-o)}this.#O&&(h.size=this.#O[e]),t.unshift([s,h])}return t}load(t){this.clear();for(let[e,s]of t){if(s.start){let i=Date.now()-s.start;s.start=this.#c.now()-i}this.set(e,s.value,s)}}set(t,e,s={}){if(e===void 0)return this.delete(t),this;let{ttl:i=this.ttl,start:r,noDisposeOnSet:h=this.noDisposeOnSet,sizeCalculation:o=this.sizeCalculation,status:a}=s,{noUpdateTTL:l=this.noUpdateTTL}=s,f=this.#B(t,e,s.size||0,o);if(this.maxEntrySize&&f>this.maxEntrySize)return a&&(a.set="miss",a.maxEntrySizeExceeded=!0),this.#A(t,"set"),this;let c=this.#o===0?void 0:this.#u.get(t);if(c===void 0)c=this.#o===0?this.#p:this.#R.length!==0?this.#R.pop():this.#o===this.#t?this.#G(!1):this.#o,this.#a[c]=t,this.#i[c]=e,this.#u.set(t,c),this.#d[this.#p]=c,this.#v[c]=this.#p,this.#p=c,this.#o++,this.#j(c,f,a),a&&(a.set="add"),l=!1,this.#F&&this.#r?.(e,t,"add");else{this.#N(c);let d=this.#i[c];if(e!==d){if(this.#T&&this.#l(d)){d.__abortController.abort(new Error("replaced"));let{__staleWhileFetching:u}=d;u!==void 0&&!h&&(this.#E&&this.#n?.(u,t,"set"),this.#e&&this.#m?.push([u,t,"set"]))}else h||(this.#E&&this.#n?.(d,t,"set"),this.#e&&this.#m?.push([d,t,"set"]));if(this.#L(c),this.#j(c,f,a),this.#i[c]=e,a){a.set="replace";let u=d&&this.#l(d)?d.__staleWhileFetching:d;u!==void 0&&(a.oldValue=u)}}else a&&(a.set="update");this.#F&&this.onInsert?.(e,t,e===d?"update":"replace")}if(i!==0&&!this.#g&&this.#P(),this.#g&&(l||this.#W(c,i,r),a&&this.#D(a,c)),!h&&this.#e&&this.#m){let d=this.#m,u;for(;u=d?.shift();)this.#h?.(...u)}return this}pop(){try{for(;this.#o;){let t=this.#i[this.#y];if(this.#G(!0),this.#l(t)){if(t.__staleWhileFetching)return t.__staleWhileFetching}else if(t!==void 0)return t}}finally{if(this.#e&&this.#m){let t=this.#m,e;for(;e=t?.shift();)this.#h?.(...e)}}}#G(t){let e=this.#y,s=this.#a[e],i=this.#i[e];return this.#T&&this.#l(i)?i.__abortController.abort(new Error("evicted")):(this.#E||this.#e)&&(this.#E&&this.#n?.(i,s,"evict"),this.#e&&this.#m?.push([i,s,"evict"])),this.#L(e),this.#b?.[e]&&(clearTimeout(this.#b[e]),this.#b[e]=void 0),t&&(this.#a[e]=void 0,this.#i[e]=void 0,this.#R.push(e)),this.#o===1?(this.#y=this.#p=0,this.#R.length=0):this.#y=this.#d[e],this.#u.delete(s),this.#o--,e}has(t,e={}){let{updateAgeOnHas:s=this.updateAgeOnHas,status:i}=e,r=this.#u.get(t);if(r!==void 0){let h=this.#i[r];if(this.#l(h)&&h.__staleWhileFetching===void 0)return!1;if(this.#_(r))i&&(i.has="stale",this.#D(i,r));else return s&&this.#C(r),i&&(i.has="hit",this.#D(i,r)),!0}else i&&(i.has="miss");return!1}peek(t,e={}){let{allowStale:s=this.allowStale}=e,i=this.#u.get(t);if(i===void 0||!s&&this.#_(i))return;let r=this.#i[i];return this.#l(r)?r.__staleWhileFetching:r}#z(t,e,s,i){let r=e===void 0?void 0:this.#i[e];if(this.#l(r))return r;let h=new Lt,{signal:o}=s;o?.addEventListener("abort",()=>h.abort(o.reason),{signal:h.signal});let a={signal:h.signal,options:s,context:i},l=(p,b=!1)=>{let{aborted:w}=h.signal,v=s.ignoreFetchAbort&&p!==void 0,E=s.ignoreFetchAbort||!!(s.allowStaleOnFetchAbort&&p!==void 0);if(s.status&&(w&&!b?(s.status.fetchAborted=!0,s.status.fetchError=h.signal.reason,v&&(s.status.fetchAbortIgnored=!0)):s.status.fetchResolved=!0),w&&!v&&!b)return c(h.signal.reason,E);let y=u,S=this.#i[e];return(S===u||v&&b&&S===void 0)&&(p===void 0?y.__staleWhileFetching!==void 0?this.#i[e]=y.__staleWhileFetching:this.#A(t,"fetch"):(s.status&&(s.status.fetchUpdated=!0),this.set(t,p,a.options))),p},f=p=>(s.status&&(s.status.fetchRejected=!0,s.status.fetchError=p),c(p,!1)),c=(p,b)=>{let{aborted:w}=h.signal,v=w&&s.allowStaleOnFetchAbort,E=v||s.allowStaleOnFetchRejection,y=E||s.noDeleteOnFetchRejection,S=u;if(this.#i[e]===u&&(!y||!b&&S.__staleWhileFetching===void 0?this.#A(t,"fetch"):v||(this.#i[e]=S.__staleWhileFetching)),E)return s.status&&S.__staleWhileFetching!==void 0&&(s.status.returnedStale=!0),S.__staleWhileFetching;if(S.__returned===S)throw p},d=(p,b)=>{let w=this.#S?.(t,r,a);w&&w instanceof Promise&&w.then(v=>p(v===void 0?void 0:v),b),h.signal.addEventListener("abort",()=>{(!s.ignoreFetchAbort||s.allowStaleOnFetchAbort)&&(p(void 0),s.allowStaleOnFetchAbort&&(p=v=>l(v,!0)))})};s.status&&(s.status.fetchDispatched=!0);let u=new Promise(d).then(l,f),m=Object.assign(u,{__abortController:h,__staleWhileFetching:r,__returned:void 0});return e===void 0?(this.set(t,m,{...a.options,status:void 0}),e=this.#u.get(t)):this.#i[e]=m,m}#l(t){if(!this.#T)return!1;let e=t;return!!e&&e instanceof Promise&&e.hasOwnProperty("__staleWhileFetching")&&e.__abortController instanceof Lt}async fetch(t,e={}){let{allowStale:s=this.allowStale,updateAgeOnGet:i=this.updateAgeOnGet,noDeleteOnStaleGet:r=this.noDeleteOnStaleGet,ttl:h=this.ttl,noDisposeOnSet:o=this.noDisposeOnSet,size:a=0,sizeCalculation:l=this.sizeCalculation,noUpdateTTL:f=this.noUpdateTTL,noDeleteOnFetchRejection:c=this.noDeleteOnFetchRejection,allowStaleOnFetchRejection:d=this.allowStaleOnFetchRejection,ignoreFetchAbort:u=this.ignoreFetchAbort,allowStaleOnFetchAbort:m=this.allowStaleOnFetchAbort,context:p,forceRefresh:b=!1,status:w,signal:v}=e;if(!this.#T)return w&&(w.fetch="get"),this.get(t,{allowStale:s,updateAgeOnGet:i,noDeleteOnStaleGet:r,status:w});let E={allowStale:s,updateAgeOnGet:i,noDeleteOnStaleGet:r,ttl:h,noDisposeOnSet:o,size:a,sizeCalculation:l,noUpdateTTL:f,noDeleteOnFetchRejection:c,allowStaleOnFetchRejection:d,allowStaleOnFetchAbort:m,ignoreFetchAbort:u,status:w,signal:v},y=this.#u.get(t);if(y===void 0){w&&(w.fetch="miss");let S=this.#z(t,y,E,p);return S.__returned=S}else{let S=this.#i[y];if(this.#l(S)){let st=s&&S.__staleWhileFetching!==void 0;return w&&(w.fetch="inflight",st&&(w.returnedStale=!0)),st?S.__staleWhileFetching:S.__returned=S}let B=this.#_(y);if(!b&&!B)return w&&(w.fetch="hit"),this.#N(y),i&&this.#C(y),w&&this.#D(w,y),S;let U=this.#z(t,y,E,p),et=U.__staleWhileFetching!==void 0&&s;return w&&(w.fetch=B?"stale":"refresh",et&&B&&(w.returnedStale=!0)),et?U.__staleWhileFetching:U.__returned=U}}async forceFetch(t,e={}){let s=await this.fetch(t,e);if(s===void 0)throw new Error("fetch() returned undefined");return s}memo(t,e={}){let s=this.#w;if(!s)throw new Error("no memoMethod provided to constructor");let{context:i,forceRefresh:r,...h}=e,o=this.get(t,h);if(!r&&o!==void 0)return o;let a=s(t,o,{options:h,context:i});return this.set(t,a,h),a}get(t,e={}){let{allowStale:s=this.allowStale,updateAgeOnGet:i=this.updateAgeOnGet,noDeleteOnStaleGet:r=this.noDeleteOnStaleGet,status:h}=e,o=this.#u.get(t);if(o!==void 0){let a=this.#i[o],l=this.#l(a);return h&&this.#D(h,o),this.#_(o)?(h&&(h.get="stale"),l?(h&&s&&a.__staleWhileFetching!==void 0&&(h.returnedStale=!0),s?a.__staleWhileFetching:void 0):(r||this.#A(t,"expire"),h&&s&&(h.returnedStale=!0),s?a:void 0)):(h&&(h.get="hit"),l?a.__staleWhileFetching:(this.#N(o),i&&this.#C(o),a))}else h&&(h.get="miss")}#U(t,e){this.#v[e]=t,this.#d[t]=e}#N(t){t!==this.#p&&(t===this.#y?this.#y=this.#d[t]:this.#U(this.#v[t],this.#d[t]),this.#U(this.#p,t),this.#p=t)}delete(t){return this.#A(t,"delete")}#A(t,e){let s=!1;if(this.#o!==0){let i=this.#u.get(t);if(i!==void 0)if(this.#b?.[i]&&(clearTimeout(this.#b?.[i]),this.#b[i]=void 0),s=!0,this.#o===1)this.#q(e);else{this.#L(i);let r=this.#i[i];if(this.#l(r)?r.__abortController.abort(new Error("deleted")):(this.#E||this.#e)&&(this.#E&&this.#n?.(r,t,e),this.#e&&this.#m?.push([r,t,e])),this.#u.delete(t),this.#a[i]=void 0,this.#i[i]=void 0,i===this.#p)this.#p=this.#v[i];else if(i===this.#y)this.#y=this.#d[i];else{let h=this.#v[i];this.#d[h]=this.#d[i];let o=this.#d[i];this.#v[o]=this.#v[i]}this.#o--,this.#R.push(i)}}if(this.#e&&this.#m?.length){let i=this.#m,r;for(;r=i?.shift();)this.#h?.(...r)}return s}clear(){return this.#q("delete")}#q(t){for(let e of this.#M({allowStale:!0})){let s=this.#i[e];if(this.#l(s))s.__abortController.abort(new Error("deleted"));else{let i=this.#a[e];this.#E&&this.#n?.(s,i,t),this.#e&&this.#m?.push([s,i,t])}}if(this.#u.clear(),this.#i.fill(void 0),this.#a.fill(void 0),this.#g&&this.#x){this.#g.fill(0),this.#x.fill(0);for(let e of this.#b??[])e!==void 0&&clearTimeout(e);this.#b?.fill(void 0)}if(this.#O&&this.#O.fill(0),this.#y=0,this.#p=0,this.#R.length=0,this.#f=0,this.#o=0,this.#e&&this.#m){let e=this.#m,s;for(;s=e?.shift();)this.#h?.(...s)}}};Wt.LRUCache=rr});var Oe=R(P=>{"use strict";var nr=P&&P.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(P,"__esModule",{value:!0});P.Minipass=P.isWritable=P.isReadable=P.isStream=void 0;var ds=typeof process=="object"&&process?process:{stdout:null,stderr:null},_e=__nccwpck_require__(474),ws=nr(__nccwpck_require__(75)),hr=__nccwpck_require__(193),or=n=>!!n&&typeof n=="object"&&(n instanceof qt||n instanceof ws.default||(0,P.isReadable)(n)||(0,P.isWritable)(n));P.isStream=or;var ar=n=>!!n&&typeof n=="object"&&n instanceof _e.EventEmitter&&typeof n.pipe=="function"&&n.pipe!==ws.default.Writable.prototype.pipe;P.isReadable=ar;var lr=n=>!!n&&typeof n=="object"&&n instanceof _e.EventEmitter&&typeof n.write=="function"&&typeof n.end=="function";P.isWritable=lr;var $=Symbol("EOF"),q=Symbol("maybeEmitEnd"),K=Symbol("emittedEnd"),Bt=Symbol("emittingEnd"),lt=Symbol("emittedError"),It=Symbol("closed"),ps=Symbol("read"),Gt=Symbol("flush"),ms=Symbol("flushChunk"),L=Symbol("encoding"),rt=Symbol("decoder"),x=Symbol("flowing"),ct=Symbol("paused"),nt=Symbol("resume"),T=Symbol("buffer"),M=Symbol("pipes"),C=Symbol("bufferLength"),we=Symbol("bufferPush"),zt=Symbol("bufferShift"),k=Symbol("objectMode"),O=Symbol("destroyed"),be=Symbol("error"),ye=Symbol("emitData"),gs=Symbol("emitEnd"),Se=Symbol("emitEnd2"),I=Symbol("async"),ve=Symbol("abort"),Ut=Symbol("aborted"),ut=Symbol("signal"),Z=Symbol("dataListeners"),D=Symbol("discarded"),ft=n=>Promise.resolve().then(n),cr=n=>n(),ur=n=>n==="end"||n==="finish"||n==="prefinish",fr=n=>n instanceof ArrayBuffer||!!n&&typeof n=="object"&&n.constructor&&n.constructor.name==="ArrayBuffer"&&n.byteLength>=0,dr=n=>!Buffer.isBuffer(n)&&ArrayBuffer.isView(n),$t=class{src;dest;opts;ondrain;constructor(t,e,s){this.src=t,this.dest=e,this.opts=s,this.ondrain=()=>t[nt](),this.dest.on("drain",this.ondrain)}unpipe(){this.dest.removeListener("drain",this.ondrain)}proxyErrors(t){}end(){this.unpipe(),this.opts.end&&this.dest.end()}},Ee=class extends $t{unpipe(){this.src.removeListener("error",this.proxyErrors),super.unpipe()}constructor(t,e,s){super(t,e,s),this.proxyErrors=i=>this.dest.emit("error",i),t.on("error",this.proxyErrors)}},pr=n=>!!n.objectMode,mr=n=>!n.objectMode&&!!n.encoding&&n.encoding!=="buffer",qt=class extends _e.EventEmitter{[x]=!1;[ct]=!1;[M]=[];[T]=[];[k];[L];[I];[rt];[$]=!1;[K]=!1;[Bt]=!1;[It]=!1;[lt]=null;[C]=0;[O]=!1;[ut];[Ut]=!1;[Z]=0;[D]=!1;writable=!0;readable=!0;constructor(...t){let e=t[0]||{};if(super(),e.objectMode&&typeof e.encoding=="string")throw new TypeError("Encoding and objectMode may not be used together");pr(e)?(this[k]=!0,this[L]=null):mr(e)?(this[L]=e.encoding,this[k]=!1):(this[k]=!1,this[L]=null),this[I]=!!e.async,this[rt]=this[L]?new hr.StringDecoder(this[L]):null,e&&e.debugExposeBuffer===!0&&Object.defineProperty(this,"buffer",{get:()=>this[T]}),e&&e.debugExposePipes===!0&&Object.defineProperty(this,"pipes",{get:()=>this[M]});let{signal:s}=e;s&&(this[ut]=s,s.aborted?this[ve]():s.addEventListener("abort",()=>this[ve]()))}get bufferLength(){return this[C]}get encoding(){return this[L]}set encoding(t){throw new Error("Encoding must be set at instantiation time")}setEncoding(t){throw new Error("Encoding must be set at instantiation time")}get objectMode(){return this[k]}set objectMode(t){throw new Error("objectMode must be set at instantiation time")}get async(){return this[I]}set async(t){this[I]=this[I]||!!t}[ve](){this[Ut]=!0,this.emit("abort",this[ut]?.reason),this.destroy(this[ut]?.reason)}get aborted(){return this[Ut]}set aborted(t){}write(t,e,s){if(this[Ut])return!1;if(this[$])throw new Error("write after end");if(this[O])return this.emit("error",Object.assign(new Error("Cannot call write after a stream was destroyed"),{code:"ERR_STREAM_DESTROYED"})),!0;typeof e=="function"&&(s=e,e="utf8"),e||(e="utf8");let i=this[I]?ft:cr;if(!this[k]&&!Buffer.isBuffer(t)){if(dr(t))t=Buffer.from(t.buffer,t.byteOffset,t.byteLength);else if(fr(t))t=Buffer.from(t);else if(typeof t!="string")throw new Error("Non-contiguous data written to non-objectMode stream")}return this[k]?(this[x]&&this[C]!==0&&this[Gt](!0),this[x]?this.emit("data",t):this[we](t),this[C]!==0&&this.emit("readable"),s&&i(s),this[x]):t.length?(typeof t=="string"&&!(e===this[L]&&!this[rt]?.lastNeed)&&(t=Buffer.from(t,e)),Buffer.isBuffer(t)&&this[L]&&(t=this[rt].write(t)),this[x]&&this[C]!==0&&this[Gt](!0),this[x]?this.emit("data",t):this[we](t),this[C]!==0&&this.emit("readable"),s&&i(s),this[x]):(this[C]!==0&&this.emit("readable"),s&&i(s),this[x])}read(t){if(this[O])return null;if(this[D]=!1,this[C]===0||t===0||t&&t>this[C])return this[q](),null;this[k]&&(t=null),this[T].length>1&&!this[k]&&(this[T]=[this[L]?this[T].join(""):Buffer.concat(this[T],this[C])]);let e=this[ps](t||null,this[T][0]);return this[q](),e}[ps](t,e){if(this[k])this[zt]();else{let s=e;t===s.length||t===null?this[zt]():typeof s=="string"?(this[T][0]=s.slice(t),e=s.slice(0,t),this[C]-=t):(this[T][0]=s.subarray(t),e=s.subarray(0,t),this[C]-=t)}return this.emit("data",e),!this[T].length&&!this[$]&&this.emit("drain"),e}end(t,e,s){return typeof t=="function"&&(s=t,t=void 0),typeof e=="function"&&(s=e,e="utf8"),t!==void 0&&this.write(t,e),s&&this.once("end",s),this[$]=!0,this.writable=!1,(this[x]||!this[ct])&&this[q](),this}[nt](){this[O]||(!this[Z]&&!this[M].length&&(this[D]=!0),this[ct]=!1,this[x]=!0,this.emit("resume"),this[T].length?this[Gt]():this[$]?this[q]():this.emit("drain"))}resume(){return this[nt]()}pause(){this[x]=!1,this[ct]=!0,this[D]=!1}get destroyed(){return this[O]}get flowing(){return this[x]}get paused(){return this[ct]}[we](t){this[k]?this[C]+=1:this[C]+=t.length,this[T].push(t)}[zt](){return this[k]?this[C]-=1:this[C]-=this[T][0].length,this[T].shift()}[Gt](t=!1){do;while(this[ms](this[zt]())&&this[T].length);!t&&!this[T].length&&!this[$]&&this.emit("drain")}[ms](t){return this.emit("data",t),this[x]}pipe(t,e){if(this[O])return t;this[D]=!1;let s=this[K];return e=e||{},t===ds.stdout||t===ds.stderr?e.end=!1:e.end=e.end!==!1,e.proxyErrors=!!e.proxyErrors,s?e.end&&t.end():(this[M].push(e.proxyErrors?new Ee(this,t,e):new $t(this,t,e)),this[I]?ft(()=>this[nt]()):this[nt]()),t}unpipe(t){let e=this[M].find(s=>s.dest===t);e&&(this[M].length===1?(this[x]&&this[Z]===0&&(this[x]=!1),this[M]=[]):this[M].splice(this[M].indexOf(e),1),e.unpipe())}addListener(t,e){return this.on(t,e)}on(t,e){let s=super.on(t,e);if(t==="data")this[D]=!1,this[Z]++,!this[M].length&&!this[x]&&this[nt]();else if(t==="readable"&&this[C]!==0)super.emit("readable");else if(ur(t)&&this[K])super.emit(t),this.removeAllListeners(t);else if(t==="error"&&this[lt]){let i=e;this[I]?ft(()=>i.call(this,this[lt])):i.call(this,this[lt])}return s}removeListener(t,e){return this.off(t,e)}off(t,e){let s=super.off(t,e);return t==="data"&&(this[Z]=this.listeners("data").length,this[Z]===0&&!this[D]&&!this[M].length&&(this[x]=!1)),s}removeAllListeners(t){let e=super.removeAllListeners(t);return(t==="data"||t===void 0)&&(this[Z]=0,!this[D]&&!this[M].length&&(this[x]=!1)),e}get emittedEnd(){return this[K]}[q](){!this[Bt]&&!this[K]&&!this[O]&&this[T].length===0&&this[$]&&(this[Bt]=!0,this.emit("end"),this.emit("prefinish"),this.emit("finish"),this[It]&&this.emit("close"),this[Bt]=!1)}emit(t,...e){let s=e[0];if(t!=="error"&&t!=="close"&&t!==O&&this[O])return!1;if(t==="data")return!this[k]&&!s?!1:this[I]?(ft(()=>this[ye](s)),!0):this[ye](s);if(t==="end")return this[gs]();if(t==="close"){if(this[It]=!0,!this[K]&&!this[O])return!1;let r=super.emit("close");return this.removeAllListeners("close"),r}else if(t==="error"){this[lt]=s,super.emit(be,s);let r=!this[ut]||this.listeners("error").length?super.emit("error",s):!1;return this[q](),r}else if(t==="resume"){let r=super.emit("resume");return this[q](),r}else if(t==="finish"||t==="prefinish"){let r=super.emit(t);return this.removeAllListeners(t),r}let i=super.emit(t,...e);return this[q](),i}[ye](t){for(let s of this[M])s.dest.write(t)===!1&&this.pause();let e=this[D]?!1:super.emit("data",t);return this[q](),e}[gs](){return this[K]?!1:(this[K]=!0,this.readable=!1,this[I]?(ft(()=>this[Se]()),!0):this[Se]())}[Se](){if(this[rt]){let e=this[rt].end();if(e){for(let s of this[M])s.dest.write(e);this[D]||super.emit("data",e)}}for(let e of this[M])e.end();let t=super.emit("end");return this.removeAllListeners("end"),t}async collect(){let t=Object.assign([],{dataLength:0});this[k]||(t.dataLength=0);let e=this.promise();return this.on("data",s=>{t.push(s),this[k]||(t.dataLength+=s.length)}),await e,t}async concat(){if(this[k])throw new Error("cannot concat in objectMode");let t=await this.collect();return this[L]?t.join(""):Buffer.concat(t,t.dataLength)}async promise(){return new Promise((t,e)=>{this.on(O,()=>e(new Error("stream destroyed"))),this.on("error",s=>e(s)),this.on("end",()=>t())})}[Symbol.asyncIterator](){this[D]=!1;let t=!1,e=async()=>(this.pause(),t=!0,{value:void 0,done:!0});return{next:()=>{if(t)return e();let i=this.read();if(i!==null)return Promise.resolve({done:!1,value:i});if(this[$])return e();let r,h,o=c=>{this.off("data",a),this.off("end",l),this.off(O,f),e(),h(c)},a=c=>{this.off("error",o),this.off("end",l),this.off(O,f),this.pause(),r({value:c,done:!!this[$]})},l=()=>{this.off("error",o),this.off("data",a),this.off(O,f),e(),r({done:!0,value:void 0})},f=()=>o(new Error("stream destroyed"));return new Promise((c,d)=>{h=d,r=c,this.once(O,f),this.once("error",o),this.once("end",l),this.once("data",a)})},throw:e,return:e,[Symbol.asyncIterator](){return this},[Symbol.asyncDispose]:async()=>{}}}[Symbol.iterator](){this[D]=!1;let t=!1,e=()=>(this.pause(),this.off(be,e),this.off(O,e),this.off("end",e),t=!0,{done:!0,value:void 0}),s=()=>{if(t)return e();let i=this.read();return i===null?e():{done:!1,value:i}};return this.once("end",e),this.once(be,e),this.once(O,e),{next:s,throw:e,return:e,[Symbol.iterator](){return this},[Symbol.dispose]:()=>{}}}destroy(t){if(this[O])return t?this.emit("error",t):this.emit(O),this;this[O]=!0,this[D]=!0,this[T].length=0,this[C]=0;let e=this;return typeof e.close=="function"&&!this[It]&&e.close(),t?this.emit("error",t):this.emit(O),this}static get isStream(){return P.isStream}};P.Minipass=qt});var Ms=R(_=>{"use strict";var gr=_&&_.__createBinding||(Object.create?(function(n,t,e,s){s===void 0&&(s=e);var i=Object.getOwnPropertyDescriptor(t,e);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[e]}}),Object.defineProperty(n,s,i)}):(function(n,t,e,s){s===void 0&&(s=e),n[s]=t[e]})),wr=_&&_.__setModuleDefault||(Object.create?(function(n,t){Object.defineProperty(n,"default",{enumerable:!0,value:t})}):function(n,t){n.default=t}),br=_&&_.__importStar||function(n){if(n&&n.__esModule)return n;var t={};if(n!=null)for(var e in n)e!=="default"&&Object.prototype.hasOwnProperty.call(n,e)&&gr(t,n,e);return wr(t,n),t};Object.defineProperty(_,"__esModule",{value:!0});_.PathScurry=_.Path=_.PathScurryDarwin=_.PathScurryPosix=_.PathScurryWin32=_.PathScurryBase=_.PathPosix=_.PathWin32=_.PathBase=_.ChildrenCache=_.ResolveCache=void 0;var Qt=fs(),Yt=__nccwpck_require__(760),yr=__nccwpck_require__(136),pt=__nccwpck_require__(896),Sr=br(__nccwpck_require__(24)),vr=pt.realpathSync.native,Ht=__nccwpck_require__(455),bs=Oe(),mt={lstatSync:pt.lstatSync,readdir:pt.readdir,readdirSync:pt.readdirSync,readlinkSync:pt.readlinkSync,realpathSync:vr,promises:{lstat:Ht.lstat,readdir:Ht.readdir,readlink:Ht.readlink,realpath:Ht.realpath}},_s=n=>!n||n===mt||n===Sr?mt:{...mt,...n,promises:{...mt.promises,...n.promises||{}}},Os=/^\\\\\?\\([a-z]:)\\?$/i,Er=n=>n.replace(/\//g,"\\").replace(Os,"$1\\"),_r=/[\\\/]/,N=0,xs=1,Ts=2,G=4,Cs=6,Rs=8,Q=10,As=12,j=15,dt=~j,xe=16,ys=32,gt=64,W=128,Vt=256,Xt=512,Ss=gt|W|Xt,Or=1023,Te=n=>n.isFile()?Rs:n.isDirectory()?G:n.isSymbolicLink()?Q:n.isCharacterDevice()?Ts:n.isBlockDevice()?Cs:n.isSocket()?As:n.isFIFO()?xs:N,vs=new Qt.LRUCache({max:2**12}),wt=n=>{let t=vs.get(n);if(t)return t;let e=n.normalize("NFKD");return vs.set(n,e),e},Es=new Qt.LRUCache({max:2**12}),Kt=n=>{let t=Es.get(n);if(t)return t;let e=wt(n.toLowerCase());return Es.set(n,e),e},bt=class extends Qt.LRUCache{constructor(){super({max:256})}};_.ResolveCache=bt;var Jt=class extends Qt.LRUCache{constructor(t=16*1024){super({maxSize:t,sizeCalculation:e=>e.length+1})}};_.ChildrenCache=Jt;var ks=Symbol("PathScurry setAsCwd"),A=class{name;root;roots;parent;nocase;isCWD=!1;#t;#s;get dev(){return this.#s}#n;get mode(){return this.#n}#r;get nlink(){return this.#r}#h;get uid(){return this.#h}#S;get gid(){return this.#S}#w;get rdev(){return this.#w}#c;get blksize(){return this.#c}#o;get ino(){return this.#o}#f;get size(){return this.#f}#u;get blocks(){return this.#u}#a;get atimeMs(){return this.#a}#i;get mtimeMs(){return this.#i}#d;get ctimeMs(){return this.#d}#v;get birthtimeMs(){return this.#v}#y;get atime(){return this.#y}#p;get mtime(){return this.#p}#R;get ctime(){return this.#R}#m;get birthtime(){return this.#m}#O;#x;#g;#b;#E;#T;#e;#F;#P;#C;get parentPath(){return(this.parent||this).fullpath()}get path(){return this.parentPath}constructor(t,e=N,s,i,r,h,o){this.name=t,this.#O=r?Kt(t):wt(t),this.#e=e&Or,this.nocase=r,this.roots=i,this.root=s||this,this.#F=h,this.#g=o.fullpath,this.#E=o.relative,this.#T=o.relativePosix,this.parent=o.parent,this.parent?this.#t=this.parent.#t:this.#t=_s(o.fs)}depth(){return this.#x!==void 0?this.#x:this.parent?this.#x=this.parent.depth()+1:this.#x=0}childrenCache(){return this.#F}resolve(t){if(!t)return this;let e=this.getRootString(t),i=t.substring(e.length).split(this.splitSep);return e?this.getRoot(e).#D(i):this.#D(i)}#D(t){let e=this;for(let s of t)e=e.child(s);return e}children(){let t=this.#F.get(this);if(t)return t;let e=Object.assign([],{provisional:0});return this.#F.set(this,e),this.#e&=~xe,e}child(t,e){if(t===""||t===".")return this;if(t==="..")return this.parent||this;let s=this.children(),i=this.nocase?Kt(t):wt(t);for(let a of s)if(a.#O===i)return a;let r=this.parent?this.sep:"",h=this.#g?this.#g+r+t:void 0,o=this.newChild(t,N,{...e,parent:this,fullpath:h});return this.canReaddir()||(o.#e|=W),s.push(o),o}relative(){if(this.isCWD)return"";if(this.#E!==void 0)return this.#E;let t=this.name,e=this.parent;if(!e)return this.#E=this.name;let s=e.relative();return s+(!s||!e.parent?"":this.sep)+t}relativePosix(){if(this.sep==="/")return this.relative();if(this.isCWD)return"";if(this.#T!==void 0)return this.#T;let t=this.name,e=this.parent;if(!e)return this.#T=this.fullpathPosix();let s=e.relativePosix();return s+(!s||!e.parent?"":"/")+t}fullpath(){if(this.#g!==void 0)return this.#g;let t=this.name,e=this.parent;if(!e)return this.#g=this.name;let i=e.fullpath()+(e.parent?this.sep:"")+t;return this.#g=i}fullpathPosix(){if(this.#b!==void 0)return this.#b;if(this.sep==="/")return this.#b=this.fullpath();if(!this.parent){let i=this.fullpath().replace(/\\/g,"/");return/^[a-z]:\//i.test(i)?this.#b=`//?/${i}`:this.#b=i}let t=this.parent,e=t.fullpathPosix(),s=e+(!e||!t.parent?"":"/")+this.name;return this.#b=s}isUnknown(){return(this.#e&j)===N}isType(t){return this[`is${t}`]()}getType(){return this.isUnknown()?"Unknown":this.isDirectory()?"Directory":this.isFile()?"File":this.isSymbolicLink()?"SymbolicLink":this.isFIFO()?"FIFO":this.isCharacterDevice()?"CharacterDevice":this.isBlockDevice()?"BlockDevice":this.isSocket()?"Socket":"Unknown"}isFile(){return(this.#e&j)===Rs}isDirectory(){return(this.#e&j)===G}isCharacterDevice(){return(this.#e&j)===Ts}isBlockDevice(){return(this.#e&j)===Cs}isFIFO(){return(this.#e&j)===xs}isSocket(){return(this.#e&j)===As}isSymbolicLink(){return(this.#e&Q)===Q}lstatCached(){return this.#e&ys?this:void 0}readlinkCached(){return this.#P}realpathCached(){return this.#C}readdirCached(){let t=this.children();return t.slice(0,t.provisional)}canReadlink(){if(this.#P)return!0;if(!this.parent)return!1;let t=this.#e&j;return!(t!==N&&t!==Q||this.#e&Vt||this.#e&W)}calledReaddir(){return!!(this.#e&xe)}isENOENT(){return!!(this.#e&W)}isNamed(t){return this.nocase?this.#O===Kt(t):this.#O===wt(t)}async readlink(){let t=this.#P;if(t)return t;if(this.canReadlink()&&this.parent)try{let e=await this.#t.promises.readlink(this.fullpath()),s=(await this.parent.realpath())?.resolve(e);if(s)return this.#P=s}catch(e){this.#M(e.code);return}}readlinkSync(){let t=this.#P;if(t)return t;if(this.canReadlink()&&this.parent)try{let e=this.#t.readlinkSync(this.fullpath()),s=this.parent.realpathSync()?.resolve(e);if(s)return this.#P=s}catch(e){this.#M(e.code);return}}#W(t){this.#e|=xe;for(let e=t.provisional;e<t.length;e++){let s=t[e];s&&s.#_()}}#_(){this.#e&W||(this.#e=(this.#e|W)&dt,this.#$())}#$(){let t=this.children();t.provisional=0;for(let e of t)e.#_()}#L(){this.#e|=Xt,this.#j()}#j(){if(this.#e&gt)return;let t=this.#e;(t&j)===G&&(t&=dt),this.#e=t|gt,this.#$()}#B(t=""){t==="ENOTDIR"||t==="EPERM"?this.#j():t==="ENOENT"?this.#_():this.children().provisional=0}#k(t=""){t==="ENOTDIR"?this.parent.#j():t==="ENOENT"&&this.#_()}#M(t=""){let e=this.#e;e|=Vt,t==="ENOENT"&&(e|=W),(t==="EINVAL"||t==="UNKNOWN")&&(e&=dt),this.#e=e,t==="ENOTDIR"&&this.parent&&this.parent.#j()}#I(t,e){return this.#z(t,e)||this.#G(t,e)}#G(t,e){let s=Te(t),i=this.newChild(t.name,s,{parent:this}),r=i.#e&j;return r!==G&&r!==Q&&r!==N&&(i.#e|=gt),e.unshift(i),e.provisional++,i}#z(t,e){for(let s=e.provisional;s<e.length;s++){let i=e[s];if((this.nocase?Kt(t.name):wt(t.name))===i.#O)return this.#l(t,i,s,e)}}#l(t,e,s,i){let r=e.name;return e.#e=e.#e&dt|Te(t),r!==t.name&&(e.name=t.name),s!==i.provisional&&(s===i.length-1?i.pop():i.splice(s,1),i.unshift(e)),i.provisional++,e}async lstat(){if((this.#e&W)===0)try{return this.#U(await this.#t.promises.lstat(this.fullpath())),this}catch(t){this.#k(t.code)}}lstatSync(){if((this.#e&W)===0)try{return this.#U(this.#t.lstatSync(this.fullpath())),this}catch(t){this.#k(t.code)}}#U(t){let{atime:e,atimeMs:s,birthtime:i,birthtimeMs:r,blksize:h,blocks:o,ctime:a,ctimeMs:l,dev:f,gid:c,ino:d,mode:u,mtime:m,mtimeMs:p,nlink:b,rdev:w,size:v,uid:E}=t;this.#y=e,this.#a=s,this.#m=i,this.#v=r,this.#c=h,this.#u=o,this.#R=a,this.#d=l,this.#s=f,this.#S=c,this.#o=d,this.#n=u,this.#p=m,this.#i=p,this.#r=b,this.#w=w,this.#f=v,this.#h=E;let y=Te(t);this.#e=this.#e&dt|y|ys,y!==N&&y!==G&&y!==Q&&(this.#e|=gt)}#N=[];#A=!1;#q(t){this.#A=!1;let e=this.#N.slice();this.#N.length=0,e.forEach(s=>s(null,t))}readdirCB(t,e=!1){if(!this.canReaddir()){e?t(null,[]):queueMicrotask(()=>t(null,[]));return}let s=this.children();if(this.calledReaddir()){let r=s.slice(0,s.provisional);e?t(null,r):queueMicrotask(()=>t(null,r));return}if(this.#N.push(t),this.#A)return;this.#A=!0;let i=this.fullpath();this.#t.readdir(i,{withFileTypes:!0},(r,h)=>{if(r)this.#B(r.code),s.provisional=0;else{for(let o of h)this.#I(o,s);this.#W(s)}this.#q(s.slice(0,s.provisional))})}#H;async readdir(){if(!this.canReaddir())return[];let t=this.children();if(this.calledReaddir())return t.slice(0,t.provisional);let e=this.fullpath();if(this.#H)await this.#H;else{let s=()=>{};this.#H=new Promise(i=>s=i);try{for(let i of await this.#t.promises.readdir(e,{withFileTypes:!0}))this.#I(i,t);this.#W(t)}catch(i){this.#B(i.code),t.provisional=0}this.#H=void 0,s()}return t.slice(0,t.provisional)}readdirSync(){if(!this.canReaddir())return[];let t=this.children();if(this.calledReaddir())return t.slice(0,t.provisional);let e=this.fullpath();try{for(let s of this.#t.readdirSync(e,{withFileTypes:!0}))this.#I(s,t);this.#W(t)}catch(s){this.#B(s.code),t.provisional=0}return t.slice(0,t.provisional)}canReaddir(){if(this.#e&Ss)return!1;let t=j&this.#e;return t===N||t===G||t===Q}shouldWalk(t,e){return(this.#e&G)===G&&!(this.#e&Ss)&&!t.has(this)&&(!e||e(this))}async realpath(){if(this.#C)return this.#C;if(!((Xt|Vt|W)&this.#e))try{let t=await this.#t.promises.realpath(this.fullpath());return this.#C=this.resolve(t)}catch{this.#L()}}realpathSync(){if(this.#C)return this.#C;if(!((Xt|Vt|W)&this.#e))try{let t=this.#t.realpathSync(this.fullpath());return this.#C=this.resolve(t)}catch{this.#L()}}[ks](t){if(t===this)return;t.isCWD=!1,this.isCWD=!0;let e=new Set([]),s=[],i=this;for(;i&&i.parent;)e.add(i),i.#E=s.join(this.sep),i.#T=s.join("/"),i=i.parent,s.push("..");for(i=t;i&&i.parent&&!e.has(i);)i.#E=void 0,i.#T=void 0,i=i.parent}};_.PathBase=A;var yt=class n extends A{sep="\\";splitSep=_r;constructor(t,e=N,s,i,r,h,o){super(t,e,s,i,r,h,o)}newChild(t,e=N,s={}){return new n(t,e,this.root,this.roots,this.nocase,this.childrenCache(),s)}getRootString(t){return Yt.win32.parse(t).root}getRoot(t){if(t=Er(t.toUpperCase()),t===this.root.name)return this.root;for(let[e,s]of Object.entries(this.roots))if(this.sameRoot(t,e))return this.roots[t]=s;return this.roots[t]=new Et(t,this).root}sameRoot(t,e=this.root.name){return t=t.toUpperCase().replace(/\//g,"\\").replace(Os,"$1\\"),t===e}};_.PathWin32=yt;var St=class n extends A{splitSep="/";sep="/";constructor(t,e=N,s,i,r,h,o){super(t,e,s,i,r,h,o)}getRootString(t){return t.startsWith("/")?"/":""}getRoot(t){return this.root}newChild(t,e=N,s={}){return new n(t,e,this.root,this.roots,this.nocase,this.childrenCache(),s)}};_.PathPosix=St;var vt=class{root;rootPath;roots;cwd;#t;#s;#n;nocase;#r;constructor(t=process.cwd(),e,s,{nocase:i,childrenCacheSize:r=16*1024,fs:h=mt}={}){this.#r=_s(h),(t instanceof URL||t.startsWith("file://"))&&(t=(0,yr.fileURLToPath)(t));let o=e.resolve(t);this.roots=Object.create(null),this.rootPath=this.parseRootPath(o),this.#t=new bt,this.#s=new bt,this.#n=new Jt(r);let a=o.substring(this.rootPath.length).split(s);if(a.length===1&&!a[0]&&a.pop(),i===void 0)throw new TypeError("must provide nocase setting to PathScurryBase ctor");this.nocase=i,this.root=this.newRoot(this.#r),this.roots[this.rootPath]=this.root;let l=this.root,f=a.length-1,c=e.sep,d=this.rootPath,u=!1;for(let m of a){let p=f--;l=l.child(m,{relative:new Array(p).fill("..").join(c),relativePosix:new Array(p).fill("..").join("/"),fullpath:d+=(u?"":c)+m}),u=!0}this.cwd=l}depth(t=this.cwd){return typeof t=="string"&&(t=this.cwd.resolve(t)),t.depth()}childrenCache(){return this.#n}resolve(...t){let e="";for(let r=t.length-1;r>=0;r--){let h=t[r];if(!(!h||h===".")&&(e=e?`${h}/${e}`:h,this.isAbsolute(h)))break}let s=this.#t.get(e);if(s!==void 0)return s;let i=this.cwd.resolve(e).fullpath();return this.#t.set(e,i),i}resolvePosix(...t){let e="";for(let r=t.length-1;r>=0;r--){let h=t[r];if(!(!h||h===".")&&(e=e?`${h}/${e}`:h,this.isAbsolute(h)))break}let s=this.#s.get(e);if(s!==void 0)return s;let i=this.cwd.resolve(e).fullpathPosix();return this.#s.set(e,i),i}relative(t=this.cwd){return typeof t=="string"&&(t=this.cwd.resolve(t)),t.relative()}relativePosix(t=this.cwd){return typeof t=="string"&&(t=this.cwd.resolve(t)),t.relativePosix()}basename(t=this.cwd){return typeof t=="string"&&(t=this.cwd.resolve(t)),t.name}dirname(t=this.cwd){return typeof t=="string"&&(t=this.cwd.resolve(t)),(t.parent||t).fullpath()}async readdir(t=this.cwd,e={withFileTypes:!0}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof A||(e=t,t=this.cwd);let{withFileTypes:s}=e;if(t.canReaddir()){let i=await t.readdir();return s?i:i.map(r=>r.name)}else return[]}readdirSync(t=this.cwd,e={withFileTypes:!0}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof A||(e=t,t=this.cwd);let{withFileTypes:s=!0}=e;return t.canReaddir()?s?t.readdirSync():t.readdirSync().map(i=>i.name):[]}async lstat(t=this.cwd){return typeof t=="string"&&(t=this.cwd.resolve(t)),t.lstat()}lstatSync(t=this.cwd){return typeof t=="string"&&(t=this.cwd.resolve(t)),t.lstatSync()}async readlink(t=this.cwd,{withFileTypes:e}={withFileTypes:!1}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof A||(e=t.withFileTypes,t=this.cwd);let s=await t.readlink();return e?s:s?.fullpath()}readlinkSync(t=this.cwd,{withFileTypes:e}={withFileTypes:!1}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof A||(e=t.withFileTypes,t=this.cwd);let s=t.readlinkSync();return e?s:s?.fullpath()}async realpath(t=this.cwd,{withFileTypes:e}={withFileTypes:!1}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof A||(e=t.withFileTypes,t=this.cwd);let s=await t.realpath();return e?s:s?.fullpath()}realpathSync(t=this.cwd,{withFileTypes:e}={withFileTypes:!1}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof A||(e=t.withFileTypes,t=this.cwd);let s=t.realpathSync();return e?s:s?.fullpath()}async walk(t=this.cwd,e={}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof A||(e=t,t=this.cwd);let{withFileTypes:s=!0,follow:i=!1,filter:r,walkFilter:h}=e,o=[];(!r||r(t))&&o.push(s?t:t.fullpath());let a=new Set,l=(c,d)=>{a.add(c),c.readdirCB((u,m)=>{if(u)return d(u);let p=m.length;if(!p)return d();let b=()=>{--p===0&&d()};for(let w of m)(!r||r(w))&&o.push(s?w:w.fullpath()),i&&w.isSymbolicLink()?w.realpath().then(v=>v?.isUnknown()?v.lstat():v).then(v=>v?.shouldWalk(a,h)?l(v,b):b()):w.shouldWalk(a,h)?l(w,b):b()},!0)},f=t;return new Promise((c,d)=>{l(f,u=>{if(u)return d(u);c(o)})})}walkSync(t=this.cwd,e={}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof A||(e=t,t=this.cwd);let{withFileTypes:s=!0,follow:i=!1,filter:r,walkFilter:h}=e,o=[];(!r||r(t))&&o.push(s?t:t.fullpath());let a=new Set([t]);for(let l of a){let f=l.readdirSync();for(let c of f){(!r||r(c))&&o.push(s?c:c.fullpath());let d=c;if(c.isSymbolicLink()){if(!(i&&(d=c.realpathSync())))continue;d.isUnknown()&&d.lstatSync()}d.shouldWalk(a,h)&&a.add(d)}}return o}[Symbol.asyncIterator](){return this.iterate()}iterate(t=this.cwd,e={}){return typeof t=="string"?t=this.cwd.resolve(t):t instanceof A||(e=t,t=this.cwd),this.stream(t,e)[Symbol.asyncIterator]()}[Symbol.iterator](){return this.iterateSync()}*iterateSync(t=this.cwd,e={}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof A||(e=t,t=this.cwd);let{withFileTypes:s=!0,follow:i=!1,filter:r,walkFilter:h}=e;(!r||r(t))&&(yield s?t:t.fullpath());let o=new Set([t]);for(let a of o){let l=a.readdirSync();for(let f of l){(!r||r(f))&&(yield s?f:f.fullpath());let c=f;if(f.isSymbolicLink()){if(!(i&&(c=f.realpathSync())))continue;c.isUnknown()&&c.lstatSync()}c.shouldWalk(o,h)&&o.add(c)}}}stream(t=this.cwd,e={}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof A||(e=t,t=this.cwd);let{withFileTypes:s=!0,follow:i=!1,filter:r,walkFilter:h}=e,o=new bs.Minipass({objectMode:!0});(!r||r(t))&&o.write(s?t:t.fullpath());let a=new Set,l=[t],f=0,c=()=>{let d=!1;for(;!d;){let u=l.shift();if(!u){f===0&&o.end();return}f++,a.add(u);let m=(b,w,v=!1)=>{if(b)return o.emit("error",b);if(i&&!v){let E=[];for(let y of w)y.isSymbolicLink()&&E.push(y.realpath().then(S=>S?.isUnknown()?S.lstat():S));if(E.length){Promise.all(E).then(()=>m(null,w,!0));return}}for(let E of w)E&&(!r||r(E))&&(o.write(s?E:E.fullpath())||(d=!0));f--;for(let E of w){let y=E.realpathCached()||E;y.shouldWalk(a,h)&&l.push(y)}d&&!o.flowing?o.once("drain",c):p||c()},p=!0;u.readdirCB(m,!0),p=!1}};return c(),o}streamSync(t=this.cwd,e={}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof A||(e=t,t=this.cwd);let{withFileTypes:s=!0,follow:i=!1,filter:r,walkFilter:h}=e,o=new bs.Minipass({objectMode:!0}),a=new Set;(!r||r(t))&&o.write(s?t:t.fullpath());let l=[t],f=0,c=()=>{let d=!1;for(;!d;){let u=l.shift();if(!u){f===0&&o.end();return}f++,a.add(u);let m=u.readdirSync();for(let p of m)(!r||r(p))&&(o.write(s?p:p.fullpath())||(d=!0));f--;for(let p of m){let b=p;if(p.isSymbolicLink()){if(!(i&&(b=p.realpathSync())))continue;b.isUnknown()&&b.lstatSync()}b.shouldWalk(a,h)&&l.push(b)}}d&&!o.flowing&&o.once("drain",c)};return c(),o}chdir(t=this.cwd){let e=this.cwd;this.cwd=typeof t=="string"?this.cwd.resolve(t):t,this.cwd[ks](e)}};_.PathScurryBase=vt;var Et=class extends vt{sep="\\";constructor(t=process.cwd(),e={}){let{nocase:s=!0}=e;super(t,Yt.win32,"\\",{...e,nocase:s}),this.nocase=s;for(let i=this.cwd;i;i=i.parent)i.nocase=this.nocase}parseRootPath(t){return Yt.win32.parse(t).root.toUpperCase()}newRoot(t){return new yt(this.rootPath,G,void 0,this.roots,this.nocase,this.childrenCache(),{fs:t})}isAbsolute(t){return t.startsWith("/")||t.startsWith("\\")||/^[a-z]:(\/|\\)/i.test(t)}};_.PathScurryWin32=Et;var _t=class extends vt{sep="/";constructor(t=process.cwd(),e={}){let{nocase:s=!1}=e;super(t,Yt.posix,"/",{...e,nocase:s}),this.nocase=s}parseRootPath(t){return"/"}newRoot(t){return new St(this.rootPath,G,void 0,this.roots,this.nocase,this.childrenCache(),{fs:t})}isAbsolute(t){return t.startsWith("/")}};_.PathScurryPosix=_t;var Zt=class extends _t{constructor(t=process.cwd(),e={}){let{nocase:s=!0}=e;super(t,{...e,nocase:s})}};_.PathScurryDarwin=Zt;_.Path=process.platform==="win32"?yt:St;_.PathScurry=process.platform==="win32"?Et:process.platform==="darwin"?Zt:_t});var Re=R(te=>{"use strict";Object.defineProperty(te,"__esModule",{value:!0});te.Pattern=void 0;var xr=H(),Tr=n=>n.length>=1,Cr=n=>n.length>=1,Rr=Symbol.for("nodejs.util.inspect.custom"),Ce=class n{#t;#s;#n;length;#r;#h;#S;#w;#c;#o;#f=!0;constructor(t,e,s,i){if(!Tr(t))throw new TypeError("empty pattern list");if(!Cr(e))throw new TypeError("empty glob list");if(e.length!==t.length)throw new TypeError("mismatched pattern list and glob list lengths");if(this.length=t.length,s<0||s>=this.length)throw new TypeError("index out of range");if(this.#t=t,this.#s=e,this.#n=s,this.#r=i,this.#n===0){if(this.isUNC()){let[r,h,o,a,...l]=this.#t,[f,c,d,u,...m]=this.#s;l[0]===""&&(l.shift(),m.shift());let p=[r,h,o,a,""].join("/"),b=[f,c,d,u,""].join("/");this.#t=[p,...l],this.#s=[b,...m],this.length=this.#t.length}else if(this.isDrive()||this.isAbsolute()){let[r,...h]=this.#t,[o,...a]=this.#s;h[0]===""&&(h.shift(),a.shift());let l=r+"/",f=o+"/";this.#t=[l,...h],this.#s=[f,...a],this.length=this.#t.length}}}[Rr](){return"Pattern <"+this.#s.slice(this.#n).join("/")+">"}pattern(){return this.#t[this.#n]}isString(){return typeof this.#t[this.#n]=="string"}isGlobstar(){return this.#t[this.#n]===xr.GLOBSTAR}isRegExp(){return this.#t[this.#n]instanceof RegExp}globString(){return this.#S=this.#S||(this.#n===0?this.isAbsolute()?this.#s[0]+this.#s.slice(1).join("/"):this.#s.join("/"):this.#s.slice(this.#n).join("/"))}hasMore(){return this.length>this.#n+1}rest(){return this.#h!==void 0?this.#h:this.hasMore()?(this.#h=new n(this.#t,this.#s,this.#n+1,this.#r),this.#h.#o=this.#o,this.#h.#c=this.#c,this.#h.#w=this.#w,this.#h):this.#h=null}isUNC(){let t=this.#t;return this.#c!==void 0?this.#c:this.#c=this.#r==="win32"&&this.#n===0&&t[0]===""&&t[1]===""&&typeof t[2]=="string"&&!!t[2]&&typeof t[3]=="string"&&!!t[3]}isDrive(){let t=this.#t;return this.#w!==void 0?this.#w:this.#w=this.#r==="win32"&&this.#n===0&&this.length>1&&typeof t[0]=="string"&&/^[a-z]:$/i.test(t[0])}isAbsolute(){let t=this.#t;return this.#o!==void 0?this.#o:this.#o=t[0]===""&&t.length>1||this.isDrive()||this.isUNC()}root(){let t=this.#t[0];return typeof t=="string"&&this.isAbsolute()&&this.#n===0?t:""}checkFollowGlobstar(){return!(this.#n===0||!this.isGlobstar()||!this.#f)}markFollowGlobstar(){return this.#n===0||!this.isGlobstar()||!this.#f?!1:(this.#f=!1,!0)}};te.Pattern=Ce});var ke=R(ee=>{"use strict";Object.defineProperty(ee,"__esModule",{value:!0});ee.Ignore=void 0;var Ps=H(),Ar=Re(),kr=typeof process=="object"&&process&&typeof process.platform=="string"?process.platform:"linux",Ae=class{relative;relativeChildren;absolute;absoluteChildren;platform;mmopts;constructor(t,{nobrace:e,nocase:s,noext:i,noglobstar:r,platform:h=kr}){this.relative=[],this.absolute=[],this.relativeChildren=[],this.absoluteChildren=[],this.platform=h,this.mmopts={dot:!0,nobrace:e,nocase:s,noext:i,noglobstar:r,optimizationLevel:2,platform:h,nocomment:!0,nonegate:!0};for(let o of t)this.add(o)}add(t){let e=new Ps.Minimatch(t,this.mmopts);for(let s=0;s<e.set.length;s++){let i=e.set[s],r=e.globParts[s];if(!i||!r)throw new Error("invalid pattern object");for(;i[0]==="."&&r[0]===".";)i.shift(),r.shift();let h=new Ar.Pattern(i,r,0,this.platform),o=new Ps.Minimatch(h.globString(),this.mmopts),a=r[r.length-1]==="**",l=h.isAbsolute();l?this.absolute.push(o):this.relative.push(o),a&&(l?this.absoluteChildren.push(o):this.relativeChildren.push(o))}}ignored(t){let e=t.fullpath(),s=`${e}/`,i=t.relative()||".",r=`${i}/`;for(let h of this.relative)if(h.match(i)||h.match(r))return!0;for(let h of this.absolute)if(h.match(e)||h.match(s))return!0;return!1}childrenIgnored(t){let e=t.fullpath()+"/",s=(t.relative()||".")+"/";for(let i of this.relativeChildren)if(i.match(s))return!0;for(let i of this.absoluteChildren)if(i.match(e))return!0;return!1}};ee.Ignore=Ae});var Fs=R(z=>{"use strict";Object.defineProperty(z,"__esModule",{value:!0});z.Processor=z.SubWalks=z.MatchRecord=z.HasWalkedCache=void 0;var Ds=H(),se=class n{store;constructor(t=new Map){this.store=t}copy(){return new n(new Map(this.store))}hasWalked(t,e){return this.store.get(t.fullpath())?.has(e.globString())}storeWalked(t,e){let s=t.fullpath(),i=this.store.get(s);i?i.add(e.globString()):this.store.set(s,new Set([e.globString()]))}};z.HasWalkedCache=se;var ie=class{store=new Map;add(t,e,s){let i=(e?2:0)|(s?1:0),r=this.store.get(t);this.store.set(t,r===void 0?i:i&r)}entries(){return[...this.store.entries()].map(([t,e])=>[t,!!(e&2),!!(e&1)])}};z.MatchRecord=ie;var re=class{store=new Map;add(t,e){if(!t.canReaddir())return;let s=this.store.get(t);s?s.find(i=>i.globString()===e.globString())||s.push(e):this.store.set(t,[e])}get(t){let e=this.store.get(t);if(!e)throw new Error("attempting to walk unknown path");return e}entries(){return this.keys().map(t=>[t,this.store.get(t)])}keys(){return[...this.store.keys()].filter(t=>t.canReaddir())}};z.SubWalks=re;var Me=class n{hasWalkedCache;matches=new ie;subwalks=new re;patterns;follow;dot;opts;constructor(t,e){this.opts=t,this.follow=!!t.follow,this.dot=!!t.dot,this.hasWalkedCache=e?e.copy():new se}processPatterns(t,e){this.patterns=e;let s=e.map(i=>[t,i]);for(let[i,r]of s){this.hasWalkedCache.storeWalked(i,r);let h=r.root(),o=r.isAbsolute()&&this.opts.absolute!==!1;if(h){i=i.resolve(h==="/"&&this.opts.root!==void 0?this.opts.root:h);let c=r.rest();if(c)r=c;else{this.matches.add(i,!0,!1);continue}}if(i.isENOENT())continue;let a,l,f=!1;for(;typeof(a=r.pattern())=="string"&&(l=r.rest());)i=i.resolve(a),r=l,f=!0;if(a=r.pattern(),l=r.rest(),f){if(this.hasWalkedCache.hasWalked(i,r))continue;this.hasWalkedCache.storeWalked(i,r)}if(typeof a=="string"){let c=a===".."||a===""||a===".";this.matches.add(i.resolve(a),o,c);continue}else if(a===Ds.GLOBSTAR){(!i.isSymbolicLink()||this.follow||r.checkFollowGlobstar())&&this.subwalks.add(i,r);let c=l?.pattern(),d=l?.rest();if(!l||(c===""||c===".")&&!d)this.matches.add(i,o,c===""||c===".");else if(c===".."){let u=i.parent||i;d?this.hasWalkedCache.hasWalked(u,d)||this.subwalks.add(u,d):this.matches.add(u,o,!0)}}else a instanceof RegExp&&this.subwalks.add(i,r)}return this}subwalkTargets(){return this.subwalks.keys()}child(){return new n(this.opts,this.hasWalkedCache)}filterEntries(t,e){let s=this.subwalks.get(t),i=this.child();for(let r of e)for(let h of s){let o=h.isAbsolute(),a=h.pattern(),l=h.rest();a===Ds.GLOBSTAR?i.testGlobstar(r,h,l,o):a instanceof RegExp?i.testRegExp(r,a,l,o):i.testString(r,a,l,o)}return i}testGlobstar(t,e,s,i){if((this.dot||!t.name.startsWith("."))&&(e.hasMore()||this.matches.add(t,i,!1),t.canReaddir()&&(this.follow||!t.isSymbolicLink()?this.subwalks.add(t,e):t.isSymbolicLink()&&(s&&e.checkFollowGlobstar()?this.subwalks.add(t,s):e.markFollowGlobstar()&&this.subwalks.add(t,e)))),s){let r=s.pattern();if(typeof r=="string"&&r!==".."&&r!==""&&r!==".")this.testString(t,r,s.rest(),i);else if(r===".."){let h=t.parent||t;this.subwalks.add(h,s)}else r instanceof RegExp&&this.testRegExp(t,r,s.rest(),i)}}testRegExp(t,e,s,i){e.test(t.name)&&(s?this.subwalks.add(t,s):this.matches.add(t,i,!1))}testString(t,e,s,i){t.isNamed(e)&&(s?this.subwalks.add(t,s):this.matches.add(t,i,!1))}};z.Processor=Me});var Ls=R(X=>{"use strict";Object.defineProperty(X,"__esModule",{value:!0});X.GlobStream=X.GlobWalker=X.GlobUtil=void 0;var Mr=Oe(),js=ke(),Ns=Fs(),Pr=(n,t)=>typeof n=="string"?new js.Ignore([n],t):Array.isArray(n)?new js.Ignore(n,t):n,Ot=class{path;patterns;opts;seen=new Set;paused=!1;aborted=!1;#t=[];#s;#n;signal;maxDepth;includeChildMatches;constructor(t,e,s){if(this.patterns=t,this.path=e,this.opts=s,this.#n=!s.posix&&s.platform==="win32"?"\\":"/",this.includeChildMatches=s.includeChildMatches!==!1,(s.ignore||!this.includeChildMatches)&&(this.#s=Pr(s.ignore??[],s),!this.includeChildMatches&&typeof this.#s.add!="function")){let i="cannot ignore child matches, ignore lacks add() method.";throw new Error(i)}this.maxDepth=s.maxDepth||1/0,s.signal&&(this.signal=s.signal,this.signal.addEventListener("abort",()=>{this.#t.length=0}))}#r(t){return this.seen.has(t)||!!this.#s?.ignored?.(t)}#h(t){return!!this.#s?.childrenIgnored?.(t)}pause(){this.paused=!0}resume(){if(this.signal?.aborted)return;this.paused=!1;let t;for(;!this.paused&&(t=this.#t.shift());)t()}onResume(t){this.signal?.aborted||(this.paused?this.#t.push(t):t())}async matchCheck(t,e){if(e&&this.opts.nodir)return;let s;if(this.opts.realpath){if(s=t.realpathCached()||await t.realpath(),!s)return;t=s}let r=t.isUnknown()||this.opts.stat?await t.lstat():t;if(this.opts.follow&&this.opts.nodir&&r?.isSymbolicLink()){let h=await r.realpath();h&&(h.isUnknown()||this.opts.stat)&&await h.lstat()}return this.matchCheckTest(r,e)}matchCheckTest(t,e){return t&&(this.maxDepth===1/0||t.depth()<=this.maxDepth)&&(!e||t.canReaddir())&&(!this.opts.nodir||!t.isDirectory())&&(!this.opts.nodir||!this.opts.follow||!t.isSymbolicLink()||!t.realpathCached()?.isDirectory())&&!this.#r(t)?t:void 0}matchCheckSync(t,e){if(e&&this.opts.nodir)return;let s;if(this.opts.realpath){if(s=t.realpathCached()||t.realpathSync(),!s)return;t=s}let r=t.isUnknown()||this.opts.stat?t.lstatSync():t;if(this.opts.follow&&this.opts.nodir&&r?.isSymbolicLink()){let h=r.realpathSync();h&&(h?.isUnknown()||this.opts.stat)&&h.lstatSync()}return this.matchCheckTest(r,e)}matchFinish(t,e){if(this.#r(t))return;if(!this.includeChildMatches&&this.#s?.add){let r=`${t.relativePosix()}/**`;this.#s.add(r)}let s=this.opts.absolute===void 0?e:this.opts.absolute;this.seen.add(t);let i=this.opts.mark&&t.isDirectory()?this.#n:"";if(this.opts.withFileTypes)this.matchEmit(t);else if(s){let r=this.opts.posix?t.fullpathPosix():t.fullpath();this.matchEmit(r+i)}else{let r=this.opts.posix?t.relativePosix():t.relative(),h=this.opts.dotRelative&&!r.startsWith(".."+this.#n)?"."+this.#n:"";this.matchEmit(r?h+r+i:"."+i)}}async match(t,e,s){let i=await this.matchCheck(t,s);i&&this.matchFinish(i,e)}matchSync(t,e,s){let i=this.matchCheckSync(t,s);i&&this.matchFinish(i,e)}walkCB(t,e,s){this.signal?.aborted&&s(),this.walkCB2(t,e,new Ns.Processor(this.opts),s)}walkCB2(t,e,s,i){if(this.#h(t))return i();if(this.signal?.aborted&&i(),this.paused){this.onResume(()=>this.walkCB2(t,e,s,i));return}s.processPatterns(t,e);let r=1,h=()=>{--r===0&&i()};for(let[o,a,l]of s.matches.entries())this.#r(o)||(r++,this.match(o,a,l).then(()=>h()));for(let o of s.subwalkTargets()){if(this.maxDepth!==1/0&&o.depth()>=this.maxDepth)continue;r++;let a=o.readdirCached();o.calledReaddir()?this.walkCB3(o,a,s,h):o.readdirCB((l,f)=>this.walkCB3(o,f,s,h),!0)}h()}walkCB3(t,e,s,i){s=s.filterEntries(t,e);let r=1,h=()=>{--r===0&&i()};for(let[o,a,l]of s.matches.entries())this.#r(o)||(r++,this.match(o,a,l).then(()=>h()));for(let[o,a]of s.subwalks.entries())r++,this.walkCB2(o,a,s.child(),h);h()}walkCBSync(t,e,s){this.signal?.aborted&&s(),this.walkCB2Sync(t,e,new Ns.Processor(this.opts),s)}walkCB2Sync(t,e,s,i){if(this.#h(t))return i();if(this.signal?.aborted&&i(),this.paused){this.onResume(()=>this.walkCB2Sync(t,e,s,i));return}s.processPatterns(t,e);let r=1,h=()=>{--r===0&&i()};for(let[o,a,l]of s.matches.entries())this.#r(o)||this.matchSync(o,a,l);for(let o of s.subwalkTargets()){if(this.maxDepth!==1/0&&o.depth()>=this.maxDepth)continue;r++;let a=o.readdirSync();this.walkCB3Sync(o,a,s,h)}h()}walkCB3Sync(t,e,s,i){s=s.filterEntries(t,e);let r=1,h=()=>{--r===0&&i()};for(let[o,a,l]of s.matches.entries())this.#r(o)||this.matchSync(o,a,l);for(let[o,a]of s.subwalks.entries())r++,this.walkCB2Sync(o,a,s.child(),h);h()}};X.GlobUtil=Ot;var Pe=class extends Ot{matches=new Set;constructor(t,e,s){super(t,e,s)}matchEmit(t){this.matches.add(t)}async walk(){if(this.signal?.aborted)throw this.signal.reason;return this.path.isUnknown()&&await this.path.lstat(),await new Promise((t,e)=>{this.walkCB(this.path,this.patterns,()=>{this.signal?.aborted?e(this.signal.reason):t(this.matches)})}),this.matches}walkSync(){if(this.signal?.aborted)throw this.signal.reason;return this.path.isUnknown()&&this.path.lstatSync(),this.walkCBSync(this.path,this.patterns,()=>{if(this.signal?.aborted)throw this.signal.reason}),this.matches}};X.GlobWalker=Pe;var De=class extends Ot{results;constructor(t,e,s){super(t,e,s),this.results=new Mr.Minipass({signal:this.signal,objectMode:!0}),this.results.on("drain",()=>this.resume()),this.results.on("resume",()=>this.resume())}matchEmit(t){this.results.write(t),this.results.flowing||this.pause()}stream(){let t=this.path;return t.isUnknown()?t.lstat().then(()=>{this.walkCB(t,this.patterns,()=>this.results.end())}):this.walkCB(t,this.patterns,()=>this.results.end()),this.results}streamSync(){return this.path.isUnknown()&&this.path.lstatSync(),this.walkCBSync(this.path,this.patterns,()=>this.results.end()),this.results}};X.GlobStream=De});var je=R(oe=>{"use strict";Object.defineProperty(oe,"__esModule",{value:!0});oe.Glob=void 0;var Dr=H(),Fr=__nccwpck_require__(136),ne=Ms(),jr=Re(),he=Ls(),Nr=typeof process=="object"&&process&&typeof process.platform=="string"?process.platform:"linux",Fe=class{absolute;cwd;root;dot;dotRelative;follow;ignore;magicalBraces;mark;matchBase;maxDepth;nobrace;nocase;nodir;noext;noglobstar;pattern;platform;realpath;scurry;stat;signal;windowsPathsNoEscape;withFileTypes;includeChildMatches;opts;patterns;constructor(t,e){if(!e)throw new TypeError("glob options required");if(this.withFileTypes=!!e.withFileTypes,this.signal=e.signal,this.follow=!!e.follow,this.dot=!!e.dot,this.dotRelative=!!e.dotRelative,this.nodir=!!e.nodir,this.mark=!!e.mark,e.cwd?(e.cwd instanceof URL||e.cwd.startsWith("file://"))&&(e.cwd=(0,Fr.fileURLToPath)(e.cwd)):this.cwd="",this.cwd=e.cwd||"",this.root=e.root,this.magicalBraces=!!e.magicalBraces,this.nobrace=!!e.nobrace,this.noext=!!e.noext,this.realpath=!!e.realpath,this.absolute=e.absolute,this.includeChildMatches=e.includeChildMatches!==!1,this.noglobstar=!!e.noglobstar,this.matchBase=!!e.matchBase,this.maxDepth=typeof e.maxDepth=="number"?e.maxDepth:1/0,this.stat=!!e.stat,this.ignore=e.ignore,this.withFileTypes&&this.absolute!==void 0)throw new Error("cannot set absolute and withFileTypes:true");if(typeof t=="string"&&(t=[t]),this.windowsPathsNoEscape=!!e.windowsPathsNoEscape||e.allowWindowsEscape===!1,this.windowsPathsNoEscape&&(t=t.map(a=>a.replace(/\\/g,"/"))),this.matchBase){if(e.noglobstar)throw new TypeError("base matching requires globstar");t=t.map(a=>a.includes("/")?a:`./**/${a}`)}if(this.pattern=t,this.platform=e.platform||Nr,this.opts={...e,platform:this.platform},e.scurry){if(this.scurry=e.scurry,e.nocase!==void 0&&e.nocase!==e.scurry.nocase)throw new Error("nocase option contradicts provided scurry option")}else{let a=e.platform==="win32"?ne.PathScurryWin32:e.platform==="darwin"?ne.PathScurryDarwin:e.platform?ne.PathScurryPosix:ne.PathScurry;this.scurry=new a(this.cwd,{nocase:e.nocase,fs:e.fs})}this.nocase=this.scurry.nocase;let s=this.platform==="darwin"||this.platform==="win32",i={braceExpandMax:1e4,...e,dot:this.dot,matchBase:this.matchBase,nobrace:this.nobrace,nocase:this.nocase,nocaseMagicOnly:s,nocomment:!0,noext:this.noext,nonegate:!0,optimizationLevel:2,platform:this.platform,windowsPathsNoEscape:this.windowsPathsNoEscape,debug:!!this.opts.debug},r=this.pattern.map(a=>new Dr.Minimatch(a,i)),[h,o]=r.reduce((a,l)=>(a[0].push(...l.set),a[1].push(...l.globParts),a),[[],[]]);this.patterns=h.map((a,l)=>{let f=o[l];if(!f)throw new Error("invalid pattern object");return new jr.Pattern(a,f,0,this.platform)})}async walk(){return[...await new he.GlobWalker(this.patterns,this.scurry.cwd,{...this.opts,maxDepth:this.maxDepth!==1/0?this.maxDepth+this.scurry.cwd.depth():1/0,platform:this.platform,nocase:this.nocase,includeChildMatches:this.includeChildMatches}).walk()]}walkSync(){return[...new he.GlobWalker(this.patterns,this.scurry.cwd,{...this.opts,maxDepth:this.maxDepth!==1/0?this.maxDepth+this.scurry.cwd.depth():1/0,platform:this.platform,nocase:this.nocase,includeChildMatches:this.includeChildMatches}).walkSync()]}stream(){return new he.GlobStream(this.patterns,this.scurry.cwd,{...this.opts,maxDepth:this.maxDepth!==1/0?this.maxDepth+this.scurry.cwd.depth():1/0,platform:this.platform,nocase:this.nocase,includeChildMatches:this.includeChildMatches}).stream()}streamSync(){return new he.GlobStream(this.patterns,this.scurry.cwd,{...this.opts,maxDepth:this.maxDepth!==1/0?this.maxDepth+this.scurry.cwd.depth():1/0,platform:this.platform,nocase:this.nocase,includeChildMatches:this.includeChildMatches}).streamSync()}iterateSync(){return this.streamSync()[Symbol.iterator]()}[Symbol.iterator](){return this.iterateSync()}iterate(){return this.stream()[Symbol.asyncIterator]()}[Symbol.asyncIterator](){return this.iterate()}};oe.Glob=Fe});var Ne=R(ae=>{"use strict";Object.defineProperty(ae,"__esModule",{value:!0});ae.hasMagic=void 0;var Lr=H(),Wr=(n,t={})=>{Array.isArray(n)||(n=[n]);for(let e of n)if(new Lr.Minimatch(e,t).hasMagic())return!0;return!1};ae.hasMagic=Wr});Object.defineProperty(exports, "__esModule", ({value:!0}));exports.glob=exports.sync=exports.iterate=exports.iterateSync=exports.stream=exports.streamSync=exports.Ignore=exports.hasMagic=exports.Glob=exports.unescape=exports.escape=void 0;exports.globStreamSync=xt;exports.globStream=Le;exports.globSync=We;exports.globIterateSync=Tt;exports.globIterate=Be;var Ws=H(),tt=je(),Br=Ne(),Is=H();Object.defineProperty(exports, "escape", ({enumerable:!0,get:function(){return Is.escape}}));Object.defineProperty(exports, "unescape", ({enumerable:!0,get:function(){return Is.unescape}}));var Ir=je();Object.defineProperty(exports, "Glob", ({enumerable:!0,get:function(){return Ir.Glob}}));var Gr=Ne();Object.defineProperty(exports, "hasMagic", ({enumerable:!0,get:function(){return Gr.hasMagic}}));var zr=ke();Object.defineProperty(exports, "Ignore", ({enumerable:!0,get:function(){return zr.Ignore}}));function xt(n,t={}){return new tt.Glob(n,t).streamSync()}function Le(n,t={}){return new tt.Glob(n,t).stream()}function We(n,t={}){return new tt.Glob(n,t).walkSync()}async function Bs(n,t={}){return new tt.Glob(n,t).walk()}function Tt(n,t={}){return new tt.Glob(n,t).iterateSync()}function Be(n,t={}){return new tt.Glob(n,t).iterate()}exports.streamSync=xt;exports.stream=Object.assign(Le,{sync:xt});exports.iterateSync=Tt;exports.iterate=Object.assign(Be,{sync:Tt});exports.sync=Object.assign(We,{stream:xt,iterate:Tt});exports.glob=Object.assign(Bs,{glob:Bs,globSync:We,sync:exports.sync,globStream:Le,stream:exports.stream,globStreamSync:xt,streamSync:exports.streamSync,globIterate:Be,iterate:exports.iterate,globIterateSync:Tt,iterateSync:exports.iterateSync,Glob:tt.Glob,hasMagic:Br.hasMagic,escape:Ws.escape,unescape:Ws.unescape});exports.glob.glob=exports.glob;
//# sourceMappingURL=index.min.js.map


/***/ }),

/***/ 56:
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"dotenv","version":"17.3.1","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"types":"./lib/main.d.ts","require":"./lib/main.js","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","pretest":"npm run lint && npm run dts-check","test":"tap run tests/**/*.js --allow-empty-coverage --disable-coverage --timeout=60000","test:coverage":"tap run tests/**/*.js --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"homepage":"https://github.com/motdotla/dotenv#readme","funding":"https://dotenvx.com","keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@types/node":"^18.11.3","decache":"^4.6.2","sinon":"^14.0.1","standard":"^17.0.0","standard-version":"^9.5.0","tap":"^19.2.0","typescript":"^4.8.4"},"engines":{"node":">=12"},"browser":{"fs":false}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(459);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;