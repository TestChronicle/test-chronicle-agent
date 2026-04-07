#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});

// node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "node_modules/tsup/assets/cjs_shims.js"() {
    "use strict";
  }
});

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports2, module2) {
    module2.exports = {
      name: "dotenv",
      version: "17.3.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        pretest: "npm run lint && npm run dts-check",
        test: "tap run tests/**/*.js --allow-empty-coverage --disable-coverage --timeout=60000",
        "test:coverage": "tap run tests/**/*.js --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      homepage: "https://github.com/motdotla/dotenv#readme",
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^18.11.3",
        decache: "^4.6.2",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-version": "^9.5.0",
        tap: "^19.2.0",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var fs3 = require("fs");
    var path10 = require("path");
    var os2 = require("os");
    var crypto = require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var TIPS = [
      "\u{1F510} encrypt with Dotenvx: https://dotenvx.com",
      "\u{1F510} prevent committing .env to code: https://dotenvx.com/precommit",
      "\u{1F510} prevent building .env in docker: https://dotenvx.com/prebuild",
      "\u{1F916} agentic secret storage: https://dotenvx.com/as2",
      "\u26A1\uFE0F secrets for agents: https://dotenvx.com/as2",
      "\u{1F6E1}\uFE0F auth for agents: https://vestauth.com",
      "\u{1F6E0}\uFE0F  run anywhere with `dotenvx run -- yourcommand`",
      "\u2699\uFE0F  specify custom .env file path with { path: '/custom/path/.env' }",
      "\u2699\uFE0F  enable debug logging with { debug: true }",
      "\u2699\uFE0F  override existing env vars with { override: true }",
      "\u2699\uFE0F  suppress all logs with { quiet: true }",
      "\u2699\uFE0F  write to custom object with { processEnv: myObject }",
      "\u2699\uFE0F  load multiple .env files with { path: ['.env.local', '.env'] }"
    ];
    function _getRandomTip() {
      return TIPS[Math.floor(Math.random() * TIPS.length)];
    }
    function parseBoolean(value) {
      if (typeof value === "string") {
        return !["false", "0", "no", "off", ""].includes(value.toLowerCase());
      }
      return Boolean(value);
    }
    function supportsAnsi() {
      return process.stdout.isTTY;
    }
    function dim(text) {
      return supportsAnsi() ? `\x1B[2m${text}\x1B[0m` : text;
    }
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message) {
      console.error(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _log(message) {
      console.log(`[dotenv@${version}] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs3.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path10.resolve(process.cwd(), ".env.vault");
      }
      if (fs3.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path10.join(os2.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug2 = parseBoolean(process.env.DOTENV_CONFIG_DEBUG || options && options.debug);
      const quiet = parseBoolean(process.env.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (debug2 || !quiet) {
        _log("Loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path10.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      let debug2 = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || options && options.debug);
      let quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug2) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path11 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs3.readFileSync(path11, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug2) {
            _debug(`Failed to load ${path11} ${e.message}`);
          }
          lastError = e;
        }
      }
      const populated = DotenvModule.populate(processEnv, parsedAll, options);
      debug2 = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || debug2);
      quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || quiet);
      if (debug2 || !quiet) {
        const keysCount = Object.keys(populated).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path10.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug2) {
              _debug(`Failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injecting env (${keysCount}) from ${shortPaths.join(",")} ${dim(`-- tip: ${_getRandomTip()}`)}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config2(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug2 = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      const populated = {};
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
            populated[key] = parsed[key];
          }
          if (debug2) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
          populated[key] = parsed[key];
        }
      }
      return populated;
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config2,
      decrypt,
      parse,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
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
      var n5 = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n5 * y;
        case "weeks":
        case "week":
        case "w":
          return n5 * w;
        case "days":
        case "day":
        case "d":
          return n5 * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n5 * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n5 * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n5 * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n5;
        default:
          return void 0;
      }
    }
    function fmtShort(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d) {
        return Math.round(ms2 / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms2 / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms2 / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms2 / s) + "s";
      }
      return ms2 + "ms";
    }
    function fmtLong(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d) {
        return plural(ms2, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms2, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms2, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms2, msAbs, s, "second");
      }
      return ms2 + " ms";
    }
    function plural(ms2, msAbs, n5, name) {
      var isPlural = msAbs >= n5 * 1.5;
      return Math.round(ms2 / n5) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug2(...args) {
          if (!debug2.enabled) {
            return;
          }
          const self = debug2;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms2 = curr - (prevTime || curr);
          self.diff = ms2;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug2.namespace = namespace;
        debug2.useColors = createDebug.useColors();
        debug2.color = createDebug.selectColor(namespace);
        debug2.extend = extend;
        debug2.destroy = createDebug.destroy;
        Object.defineProperty(debug2, "enabled", {
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
          set: (v2) => {
            enableOverride = v2;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug2);
        }
        return debug2;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns2 of split) {
          if (ns2[0] === "-") {
            createDebug.skips.push(ns2.slice(1));
          } else {
            createDebug.names.push(ns2);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns2 of createDebug.names) {
          if (matchesTemplate(name, ns2)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug") || exports2.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v2) {
      try {
        return JSON.stringify(v2);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var tty = require("tty");
    var util = require("util");
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require("supports-color");
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
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
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_2, k2) => {
        return k2.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports2.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug2) {
      debug2.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug2.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v2) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v2, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v2) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v2, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/@kwsites/file-exists/dist/src/index.js
var require_src2 = __commonJS({
  "node_modules/@kwsites/file-exists/dist/src/index.js"(exports2) {
    "use strict";
    init_cjs_shims();
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fs_1 = require("fs");
    var debug_1 = __importDefault(require_src());
    var log = debug_1.default("@kwsites/file-exists");
    function check(path10, isFile, isDirectory) {
      log(`checking %s`, path10);
      try {
        const stat = fs_1.statSync(path10);
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
      } catch (e) {
        if (e.code === "ENOENT") {
          log(`[FAIL] path is not accessible: %o`, e);
          return false;
        }
        log(`[FATAL] %o`, e);
        throw e;
      }
    }
    function exists2(path10, type = exports2.READABLE) {
      return check(path10, (type & exports2.FILE) > 0, (type & exports2.FOLDER) > 0);
    }
    exports2.exists = exists2;
    exports2.FILE = 1;
    exports2.FOLDER = 2;
    exports2.READABLE = exports2.FILE + exports2.FOLDER;
  }
});

// node_modules/@kwsites/file-exists/dist/index.js
var require_dist = __commonJS({
  "node_modules/@kwsites/file-exists/dist/index.js"(exports2) {
    "use strict";
    init_cjs_shims();
    function __export3(m) {
      for (var p in m) if (!exports2.hasOwnProperty(p)) exports2[p] = m[p];
    }
    Object.defineProperty(exports2, "__esModule", { value: true });
    __export3(require_src2());
  }
});

// node_modules/@kwsites/promise-deferred/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/@kwsites/promise-deferred/dist/index.js"(exports2) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createDeferred = exports2.deferred = void 0;
    function deferred2() {
      let done;
      let fail;
      let status = "pending";
      const promise = new Promise((_done, _fail) => {
        done = _done;
        fail = _fail;
      });
      return {
        promise,
        done(result) {
          if (status === "pending") {
            status = "resolved";
            done(result);
          }
        },
        fail(error) {
          if (status === "pending") {
            status = "rejected";
            fail(error);
          }
        },
        get fulfilled() {
          return status !== "pending";
        },
        get status() {
          return status;
        }
      };
    }
    exports2.deferred = deferred2;
    exports2.createDeferred = deferred2;
    exports2.default = deferred2;
  }
});

// src/cli.ts
var cli_exports = {};
__export(cli_exports, {
  cli: () => main
});
module.exports = __toCommonJS(cli_exports);
init_cjs_shims();
var import_dotenv2 = __toESM(require_main());

// src/sync.ts
init_cjs_shims();
var import_path9 = __toESM(require("path"));
var import_fs4 = __toESM(require("fs"));
var import_dotenv = __toESM(require_main());

// src/core/index.ts
init_cjs_shims();

// src/core/detector.ts
init_cjs_shims();
var import_fs2 = require("fs");
var import_path = __toESM(require("path"));

// node_modules/glob/dist/esm/index.min.js
init_cjs_shims();
var import_node_url = require("url");
var import_node_path = require("path");
var import_node_url2 = require("url");
var import_fs = require("fs");
var xi = __toESM(require("fs"), 1);
var import_promises = require("fs/promises");
var import_node_events = require("events");
var import_node_stream = __toESM(require("stream"), 1);
var import_node_string_decoder = require("string_decoder");
var Gt = (n5, t, e) => {
  let s = n5 instanceof RegExp ? ce(n5, e) : n5, i = t instanceof RegExp ? ce(t, e) : t, r = s !== null && i != null && ss(s, i, e);
  return r && { start: r[0], end: r[1], pre: e.slice(0, r[0]), body: e.slice(r[0] + s.length, r[1]), post: e.slice(r[1] + i.length) };
};
var ce = (n5, t) => {
  let e = t.match(n5);
  return e ? e[0] : null;
};
var ss = (n5, t, e) => {
  let s, i, r, o, h, a = e.indexOf(n5), l = e.indexOf(t, a + 1), u = a;
  if (a >= 0 && l > 0) {
    if (n5 === t) return [a, l];
    for (s = [], r = e.length; u >= 0 && !h; ) {
      if (u === a) s.push(u), a = e.indexOf(n5, u + 1);
      else if (s.length === 1) {
        let c = s.pop();
        c !== void 0 && (h = [c, l]);
      } else i = s.pop(), i !== void 0 && i < r && (r = i, o = l), l = e.indexOf(t, u + 1);
      u = a < l && a >= 0 ? a : l;
    }
    s.length && o !== void 0 && (h = [r, o]);
  }
  return h;
};
var fe = "\0SLASH" + Math.random() + "\0";
var ue = "\0OPEN" + Math.random() + "\0";
var qt = "\0CLOSE" + Math.random() + "\0";
var de = "\0COMMA" + Math.random() + "\0";
var pe = "\0PERIOD" + Math.random() + "\0";
var is = new RegExp(fe, "g");
var rs = new RegExp(ue, "g");
var ns = new RegExp(qt, "g");
var os = new RegExp(de, "g");
var hs = new RegExp(pe, "g");
var as = /\\\\/g;
var ls = /\\{/g;
var cs = /\\}/g;
var fs = /\\,/g;
var us = /\\./g;
var ds = 1e5;
function Ht(n5) {
  return isNaN(n5) ? n5.charCodeAt(0) : parseInt(n5, 10);
}
function ps(n5) {
  return n5.replace(as, fe).replace(ls, ue).replace(cs, qt).replace(fs, de).replace(us, pe);
}
function ms(n5) {
  return n5.replace(is, "\\").replace(rs, "{").replace(ns, "}").replace(os, ",").replace(hs, ".");
}
function me(n5) {
  if (!n5) return [""];
  let t = [], e = Gt("{", "}", n5);
  if (!e) return n5.split(",");
  let { pre: s, body: i, post: r } = e, o = s.split(",");
  o[o.length - 1] += "{" + i + "}";
  let h = me(r);
  return r.length && (o[o.length - 1] += h.shift(), o.push.apply(o, h)), t.push.apply(t, o), t;
}
function ge(n5, t = {}) {
  if (!n5) return [];
  let { max: e = ds } = t;
  return n5.slice(0, 2) === "{}" && (n5 = "\\{\\}" + n5.slice(2)), ht(ps(n5), e, true).map(ms);
}
function gs(n5) {
  return "{" + n5 + "}";
}
function ws(n5) {
  return /^-?0\d/.test(n5);
}
function ys(n5, t) {
  return n5 <= t;
}
function bs(n5, t) {
  return n5 >= t;
}
function ht(n5, t, e) {
  let s = [], i = Gt("{", "}", n5);
  if (!i) return [n5];
  let r = i.pre, o = i.post.length ? ht(i.post, t, false) : [""];
  if (/\$$/.test(i.pre)) for (let h = 0; h < o.length && h < t; h++) {
    let a = r + "{" + i.body + "}" + o[h];
    s.push(a);
  }
  else {
    let h = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(i.body), a = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(i.body), l = h || a, u = i.body.indexOf(",") >= 0;
    if (!l && !u) return i.post.match(/,(?!,).*\}/) ? (n5 = i.pre + "{" + i.body + qt + i.post, ht(n5, t, true)) : [n5];
    let c;
    if (l) c = i.body.split(/\.\./);
    else if (c = me(i.body), c.length === 1 && c[0] !== void 0 && (c = ht(c[0], t, false).map(gs), c.length === 1)) return o.map((f) => i.pre + c[0] + f);
    let d;
    if (l && c[0] !== void 0 && c[1] !== void 0) {
      let f = Ht(c[0]), m = Ht(c[1]), p = Math.max(c[0].length, c[1].length), w = c.length === 3 && c[2] !== void 0 ? Math.abs(Ht(c[2])) : 1, g = ys;
      m < f && (w *= -1, g = bs);
      let E = c.some(ws);
      d = [];
      for (let y = f; g(y, m); y += w) {
        let b;
        if (a) b = String.fromCharCode(y), b === "\\" && (b = "");
        else if (b = String(y), E) {
          let z = p - b.length;
          if (z > 0) {
            let $ = new Array(z + 1).join("0");
            y < 0 ? b = "-" + $ + b.slice(1) : b = $ + b;
          }
        }
        d.push(b);
      }
    } else {
      d = [];
      for (let f = 0; f < c.length; f++) d.push.apply(d, ht(c[f], t, false));
    }
    for (let f = 0; f < d.length; f++) for (let m = 0; m < o.length && s.length < t; m++) {
      let p = r + d[f] + o[m];
      (!e || l || p) && s.push(p);
    }
  }
  return s;
}
var at = (n5) => {
  if (typeof n5 != "string") throw new TypeError("invalid pattern");
  if (n5.length > 65536) throw new TypeError("pattern is too long");
};
var Ss = { "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true], "[:alpha:]": ["\\p{L}\\p{Nl}", true], "[:ascii:]": ["\\x00-\\x7f", false], "[:blank:]": ["\\p{Zs}\\t", true], "[:cntrl:]": ["\\p{Cc}", true], "[:digit:]": ["\\p{Nd}", true], "[:graph:]": ["\\p{Z}\\p{C}", true, true], "[:lower:]": ["\\p{Ll}", true], "[:print:]": ["\\p{C}", true], "[:punct:]": ["\\p{P}", true], "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true], "[:upper:]": ["\\p{Lu}", true], "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true], "[:xdigit:]": ["A-Fa-f0-9", false] };
var lt = (n5) => n5.replace(/[[\]\\-]/g, "\\$&");
var Es = (n5) => n5.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var we = (n5) => n5.join("");
var ye = (n5, t) => {
  let e = t;
  if (n5.charAt(e) !== "[") throw new Error("not in a brace expression");
  let s = [], i = [], r = e + 1, o = false, h = false, a = false, l = false, u = e, c = "";
  t: for (; r < n5.length; ) {
    let p = n5.charAt(r);
    if ((p === "!" || p === "^") && r === e + 1) {
      l = true, r++;
      continue;
    }
    if (p === "]" && o && !a) {
      u = r + 1;
      break;
    }
    if (o = true, p === "\\" && !a) {
      a = true, r++;
      continue;
    }
    if (p === "[" && !a) {
      for (let [w, [g, S, E]] of Object.entries(Ss)) if (n5.startsWith(w, r)) {
        if (c) return ["$.", false, n5.length - e, true];
        r += w.length, E ? i.push(g) : s.push(g), h = h || S;
        continue t;
      }
    }
    if (a = false, c) {
      p > c ? s.push(lt(c) + "-" + lt(p)) : p === c && s.push(lt(p)), c = "", r++;
      continue;
    }
    if (n5.startsWith("-]", r + 1)) {
      s.push(lt(p + "-")), r += 2;
      continue;
    }
    if (n5.startsWith("-", r + 1)) {
      c = p, r += 2;
      continue;
    }
    s.push(lt(p)), r++;
  }
  if (u < r) return ["", false, 0, false];
  if (!s.length && !i.length) return ["$.", false, n5.length - e, true];
  if (i.length === 0 && s.length === 1 && /^\\?.$/.test(s[0]) && !l) {
    let p = s[0].length === 2 ? s[0].slice(-1) : s[0];
    return [Es(p), false, u - e, false];
  }
  let d = "[" + (l ? "^" : "") + we(s) + "]", f = "[" + (l ? "" : "^") + we(i) + "]";
  return [s.length && i.length ? "(" + d + "|" + f + ")" : s.length ? d : f, h, u - e, true];
};
var W = (n5, { windowsPathsNoEscape: t = false, magicalBraces: e = true } = {}) => e ? t ? n5.replace(/\[([^\/\\])\]/g, "$1") : n5.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1") : t ? n5.replace(/\[([^\/\\{}])\]/g, "$1") : n5.replace(/((?!\\).|^)\[([^\/\\{}])\]/g, "$1$2").replace(/\\([^\/{}])/g, "$1");
var xs = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]);
var be = (n5) => xs.has(n5);
var vs = "(?!(?:^|/)\\.\\.?(?:$|/))";
var Ct = "(?!\\.)";
var Cs = /* @__PURE__ */ new Set(["[", "."]);
var Ts = /* @__PURE__ */ new Set(["..", "."]);
var As = new Set("().*{}+?[]^$\\!");
var ks = (n5) => n5.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var Kt = "[^/]";
var Se = Kt + "*?";
var Ee = Kt + "+?";
var _t, _s, _n, _r, _o, _S, _w, _c, _h, _u, _f, _n_instances, a_fn, _n_static, _a, i_fn, d_fn, E_fn;
var Q = (_a = class {
  constructor(t, e, s = {}) {
    __privateAdd(this, _n_instances);
    __publicField(this, "type");
    __privateAdd(this, _t);
    __privateAdd(this, _s);
    __privateAdd(this, _n, false);
    __privateAdd(this, _r, []);
    __privateAdd(this, _o);
    __privateAdd(this, _S);
    __privateAdd(this, _w);
    __privateAdd(this, _c, false);
    __privateAdd(this, _h);
    __privateAdd(this, _u);
    __privateAdd(this, _f, false);
    this.type = t, t && __privateSet(this, _s, true), __privateSet(this, _o, e), __privateSet(this, _t, __privateGet(this, _o) ? __privateGet(__privateGet(this, _o), _t) : this), __privateSet(this, _h, __privateGet(this, _t) === this ? s : __privateGet(__privateGet(this, _t), _h)), __privateSet(this, _w, __privateGet(this, _t) === this ? [] : __privateGet(__privateGet(this, _t), _w)), t === "!" && !__privateGet(__privateGet(this, _t), _c) && __privateGet(this, _w).push(this), __privateSet(this, _S, __privateGet(this, _o) ? __privateGet(__privateGet(this, _o), _r).length : 0);
  }
  get hasMagic() {
    if (__privateGet(this, _s) !== void 0) return __privateGet(this, _s);
    for (let t of __privateGet(this, _r)) if (typeof t != "string" && (t.type || t.hasMagic)) return __privateSet(this, _s, true);
    return __privateGet(this, _s);
  }
  toString() {
    return __privateGet(this, _u) !== void 0 ? __privateGet(this, _u) : this.type ? __privateSet(this, _u, this.type + "(" + __privateGet(this, _r).map((t) => String(t)).join("|") + ")") : __privateSet(this, _u, __privateGet(this, _r).map((t) => String(t)).join(""));
  }
  push(...t) {
    for (let e of t) if (e !== "") {
      if (typeof e != "string" && !(e instanceof _a && __privateGet(e, _o) === this)) throw new Error("invalid part: " + e);
      __privateGet(this, _r).push(e);
    }
  }
  toJSON() {
    let t = this.type === null ? __privateGet(this, _r).slice().map((e) => typeof e == "string" ? e : e.toJSON()) : [this.type, ...__privateGet(this, _r).map((e) => e.toJSON())];
    return this.isStart() && !this.type && t.unshift([]), this.isEnd() && (this === __privateGet(this, _t) || __privateGet(__privateGet(this, _t), _c) && __privateGet(this, _o)?.type === "!") && t.push({}), t;
  }
  isStart() {
    if (__privateGet(this, _t) === this) return true;
    if (!__privateGet(this, _o)?.isStart()) return false;
    if (__privateGet(this, _S) === 0) return true;
    let t = __privateGet(this, _o);
    for (let e = 0; e < __privateGet(this, _S); e++) {
      let s = __privateGet(t, _r)[e];
      if (!(s instanceof _a && s.type === "!")) return false;
    }
    return true;
  }
  isEnd() {
    if (__privateGet(this, _t) === this || __privateGet(this, _o)?.type === "!") return true;
    if (!__privateGet(this, _o)?.isEnd()) return false;
    if (!this.type) return __privateGet(this, _o)?.isEnd();
    let t = __privateGet(this, _o) ? __privateGet(__privateGet(this, _o), _r).length : 0;
    return __privateGet(this, _S) === t - 1;
  }
  copyIn(t) {
    typeof t == "string" ? this.push(t) : this.push(t.clone(this));
  }
  clone(t) {
    let e = new _a(this.type, t);
    for (let s of __privateGet(this, _r)) e.copyIn(s);
    return e;
  }
  static fromGlob(t, e = {}) {
    var _a12;
    let s = new _a(null, void 0, e);
    return __privateMethod(_a12 = _a, _n_static, i_fn).call(_a12, t, s, 0, e), s;
  }
  toMMPattern() {
    if (this !== __privateGet(this, _t)) return __privateGet(this, _t).toMMPattern();
    let t = this.toString(), [e, s, i, r] = this.toRegExpSource();
    if (!(i || __privateGet(this, _s) || __privateGet(this, _h).nocase && !__privateGet(this, _h).nocaseMagicOnly && t.toUpperCase() !== t.toLowerCase())) return s;
    let h = (__privateGet(this, _h).nocase ? "i" : "") + (r ? "u" : "");
    return Object.assign(new RegExp(`^${e}$`, h), { _src: e, _glob: t });
  }
  get options() {
    return __privateGet(this, _h);
  }
  toRegExpSource(t) {
    let e = t ?? !!__privateGet(this, _h).dot;
    if (__privateGet(this, _t) === this && __privateMethod(this, _n_instances, a_fn).call(this), !this.type) {
      let a = this.isStart() && this.isEnd() && !__privateGet(this, _r).some((f) => typeof f != "string"), l = __privateGet(this, _r).map((f) => {
        var _a12;
        let [m, p, w, g] = typeof f == "string" ? __privateMethod(_a12 = _a, _n_static, E_fn).call(_a12, f, __privateGet(this, _s), a) : f.toRegExpSource(t);
        return __privateSet(this, _s, __privateGet(this, _s) || w), __privateSet(this, _n, __privateGet(this, _n) || g), m;
      }).join(""), u = "";
      if (this.isStart() && typeof __privateGet(this, _r)[0] == "string" && !(__privateGet(this, _r).length === 1 && Ts.has(__privateGet(this, _r)[0]))) {
        let m = Cs, p = e && m.has(l.charAt(0)) || l.startsWith("\\.") && m.has(l.charAt(2)) || l.startsWith("\\.\\.") && m.has(l.charAt(4)), w = !e && !t && m.has(l.charAt(0));
        u = p ? vs : w ? Ct : "";
      }
      let c = "";
      return this.isEnd() && __privateGet(__privateGet(this, _t), _c) && __privateGet(this, _o)?.type === "!" && (c = "(?:$|\\/)"), [u + l + c, W(l), __privateSet(this, _s, !!__privateGet(this, _s)), __privateGet(this, _n)];
    }
    let s = this.type === "*" || this.type === "+", i = this.type === "!" ? "(?:(?!(?:" : "(?:", r = __privateMethod(this, _n_instances, d_fn).call(this, e);
    if (this.isStart() && this.isEnd() && !r && this.type !== "!") {
      let a = this.toString();
      return __privateSet(this, _r, [a]), this.type = null, __privateSet(this, _s, void 0), [a, W(this.toString()), false, false];
    }
    let o = !s || t || e || !Ct ? "" : __privateMethod(this, _n_instances, d_fn).call(this, true);
    o === r && (o = ""), o && (r = `(?:${r})(?:${o})*?`);
    let h = "";
    if (this.type === "!" && __privateGet(this, _f)) h = (this.isStart() && !e ? Ct : "") + Ee;
    else {
      let a = this.type === "!" ? "))" + (this.isStart() && !e && !t ? Ct : "") + Se + ")" : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && o ? ")" : this.type === "*" && o ? ")?" : `)${this.type}`;
      h = i + r + a;
    }
    return [h, W(r), __privateSet(this, _s, !!__privateGet(this, _s)), __privateGet(this, _n)];
  }
}, _t = new WeakMap(), _s = new WeakMap(), _n = new WeakMap(), _r = new WeakMap(), _o = new WeakMap(), _S = new WeakMap(), _w = new WeakMap(), _c = new WeakMap(), _h = new WeakMap(), _u = new WeakMap(), _f = new WeakMap(), _n_instances = new WeakSet(), a_fn = function() {
  if (this !== __privateGet(this, _t)) throw new Error("should only call on root");
  if (__privateGet(this, _c)) return this;
  this.toString(), __privateSet(this, _c, true);
  let t;
  for (; t = __privateGet(this, _w).pop(); ) {
    if (t.type !== "!") continue;
    let e = t, s = __privateGet(e, _o);
    for (; s; ) {
      for (let i = __privateGet(e, _S) + 1; !s.type && i < __privateGet(s, _r).length; i++) for (let r of __privateGet(t, _r)) {
        if (typeof r == "string") throw new Error("string part in extglob AST??");
        r.copyIn(__privateGet(s, _r)[i]);
      }
      e = s, s = __privateGet(e, _o);
    }
  }
  return this;
}, _n_static = new WeakSet(), i_fn = function(t, e, s, i) {
  var _a12, _b5;
  let r = false, o = false, h = -1, a = false;
  if (e.type === null) {
    let f = s, m = "";
    for (; f < t.length; ) {
      let p = t.charAt(f++);
      if (r || p === "\\") {
        r = !r, m += p;
        continue;
      }
      if (o) {
        f === h + 1 ? (p === "^" || p === "!") && (a = true) : p === "]" && !(f === h + 2 && a) && (o = false), m += p;
        continue;
      } else if (p === "[") {
        o = true, h = f, a = false, m += p;
        continue;
      }
      if (!i.noext && be(p) && t.charAt(f) === "(") {
        e.push(m), m = "";
        let w = new _a(p, e);
        f = __privateMethod(_a12 = _a, _n_static, i_fn).call(_a12, t, w, f, i), e.push(w);
        continue;
      }
      m += p;
    }
    return e.push(m), f;
  }
  let l = s + 1, u = new _a(null, e), c = [], d = "";
  for (; l < t.length; ) {
    let f = t.charAt(l++);
    if (r || f === "\\") {
      r = !r, d += f;
      continue;
    }
    if (o) {
      l === h + 1 ? (f === "^" || f === "!") && (a = true) : f === "]" && !(l === h + 2 && a) && (o = false), d += f;
      continue;
    } else if (f === "[") {
      o = true, h = l, a = false, d += f;
      continue;
    }
    if (be(f) && t.charAt(l) === "(") {
      u.push(d), d = "";
      let m = new _a(f, u);
      u.push(m), l = __privateMethod(_b5 = _a, _n_static, i_fn).call(_b5, t, m, l, i);
      continue;
    }
    if (f === "|") {
      u.push(d), d = "", c.push(u), u = new _a(null, e);
      continue;
    }
    if (f === ")") return d === "" && __privateGet(e, _r).length === 0 && __privateSet(e, _f, true), u.push(d), d = "", e.push(...c, u), l;
    d += f;
  }
  return e.type = null, __privateSet(e, _s, void 0), __privateSet(e, _r, [t.substring(s - 1)]), l;
}, d_fn = function(t) {
  return __privateGet(this, _r).map((e) => {
    if (typeof e == "string") throw new Error("string type in extglob ast??");
    let [s, i, r, o] = e.toRegExpSource(t);
    return __privateSet(this, _n, __privateGet(this, _n) || o), s;
  }).filter((e) => !(this.isStart() && this.isEnd()) || !!e).join("|");
}, E_fn = function(t, e, s = false) {
  let i = false, r = "", o = false, h = false;
  for (let a = 0; a < t.length; a++) {
    let l = t.charAt(a);
    if (i) {
      i = false, r += (As.has(l) ? "\\" : "") + l;
      continue;
    }
    if (l === "*") {
      if (h) continue;
      h = true, r += s && /^[*]+$/.test(t) ? Ee : Se, e = true;
      continue;
    } else h = false;
    if (l === "\\") {
      a === t.length - 1 ? r += "\\\\" : i = true;
      continue;
    }
    if (l === "[") {
      let [u, c, d, f] = ye(t, a);
      if (d) {
        r += u, o = o || c, a += d - 1, e = e || f;
        continue;
      }
    }
    if (l === "?") {
      r += Kt, e = true;
      continue;
    }
    r += ks(l);
  }
  return [r, W(t), !!e, o];
}, __privateAdd(_a, _n_static), _a);
var tt = (n5, { windowsPathsNoEscape: t = false, magicalBraces: e = false } = {}) => e ? t ? n5.replace(/[?*()[\]{}]/g, "[$&]") : n5.replace(/[?*()[\]\\{}]/g, "\\$&") : t ? n5.replace(/[?*()[\]]/g, "[$&]") : n5.replace(/[?*()[\]\\]/g, "\\$&");
var O = (n5, t, e = {}) => (at(t), !e.nocomment && t.charAt(0) === "#" ? false : new D(t, e).match(n5));
var Rs = /^\*+([^+@!?\*\[\(]*)$/;
var Os = (n5) => (t) => !t.startsWith(".") && t.endsWith(n5);
var Fs = (n5) => (t) => t.endsWith(n5);
var Ds = (n5) => (n5 = n5.toLowerCase(), (t) => !t.startsWith(".") && t.toLowerCase().endsWith(n5));
var Ms = (n5) => (n5 = n5.toLowerCase(), (t) => t.toLowerCase().endsWith(n5));
var Ns = /^\*+\.\*+$/;
var _s2 = (n5) => !n5.startsWith(".") && n5.includes(".");
var Ls = (n5) => n5 !== "." && n5 !== ".." && n5.includes(".");
var Ws = /^\.\*+$/;
var Ps = (n5) => n5 !== "." && n5 !== ".." && n5.startsWith(".");
var js = /^\*+$/;
var Is = (n5) => n5.length !== 0 && !n5.startsWith(".");
var zs = (n5) => n5.length !== 0 && n5 !== "." && n5 !== "..";
var Bs = /^\?+([^+@!?\*\[\(]*)?$/;
var Us = ([n5, t = ""]) => {
  let e = Ce([n5]);
  return t ? (t = t.toLowerCase(), (s) => e(s) && s.toLowerCase().endsWith(t)) : e;
};
var $s = ([n5, t = ""]) => {
  let e = Te([n5]);
  return t ? (t = t.toLowerCase(), (s) => e(s) && s.toLowerCase().endsWith(t)) : e;
};
var Gs = ([n5, t = ""]) => {
  let e = Te([n5]);
  return t ? (s) => e(s) && s.endsWith(t) : e;
};
var Hs = ([n5, t = ""]) => {
  let e = Ce([n5]);
  return t ? (s) => e(s) && s.endsWith(t) : e;
};
var Ce = ([n5]) => {
  let t = n5.length;
  return (e) => e.length === t && !e.startsWith(".");
};
var Te = ([n5]) => {
  let t = n5.length;
  return (e) => e.length === t && e !== "." && e !== "..";
};
var Ae = typeof process == "object" && process ? typeof process.env == "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
var xe = { win32: { sep: "\\" }, posix: { sep: "/" } };
var qs = Ae === "win32" ? xe.win32.sep : xe.posix.sep;
O.sep = qs;
var A = /* @__PURE__ */ Symbol("globstar **");
O.GLOBSTAR = A;
var Ks = "[^/]";
var Vs = Ks + "*?";
var Ys = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
var Xs = "(?:(?!(?:\\/|^)\\.).)*?";
var Js = (n5, t = {}) => (e) => O(e, n5, t);
O.filter = Js;
var N = (n5, t = {}) => Object.assign({}, n5, t);
var Zs = (n5) => {
  if (!n5 || typeof n5 != "object" || !Object.keys(n5).length) return O;
  let t = O;
  return Object.assign((s, i, r = {}) => t(s, i, N(n5, r)), { Minimatch: class extends t.Minimatch {
    constructor(i, r = {}) {
      super(i, N(n5, r));
    }
    static defaults(i) {
      return t.defaults(N(n5, i)).Minimatch;
    }
  }, AST: class extends t.AST {
    constructor(i, r, o = {}) {
      super(i, r, N(n5, o));
    }
    static fromGlob(i, r = {}) {
      return t.AST.fromGlob(i, N(n5, r));
    }
  }, unescape: (s, i = {}) => t.unescape(s, N(n5, i)), escape: (s, i = {}) => t.escape(s, N(n5, i)), filter: (s, i = {}) => t.filter(s, N(n5, i)), defaults: (s) => t.defaults(N(n5, s)), makeRe: (s, i = {}) => t.makeRe(s, N(n5, i)), braceExpand: (s, i = {}) => t.braceExpand(s, N(n5, i)), match: (s, i, r = {}) => t.match(s, i, N(n5, r)), sep: t.sep, GLOBSTAR: A });
};
O.defaults = Zs;
var ke = (n5, t = {}) => (at(n5), t.nobrace || !/\{(?:(?!\{).)*\}/.test(n5) ? [n5] : ge(n5, { max: t.braceExpandMax }));
O.braceExpand = ke;
var Qs = (n5, t = {}) => new D(n5, t).makeRe();
O.makeRe = Qs;
var ti = (n5, t, e = {}) => {
  let s = new D(t, e);
  return n5 = n5.filter((i) => s.match(i)), s.options.nonull && !n5.length && n5.push(t), n5;
};
O.match = ti;
var ve = /[?*]|[+@!]\(.*?\)|\[|\]/;
var ei = (n5) => n5.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var D = class {
  constructor(t, e = {}) {
    __publicField(this, "options");
    __publicField(this, "set");
    __publicField(this, "pattern");
    __publicField(this, "windowsPathsNoEscape");
    __publicField(this, "nonegate");
    __publicField(this, "negate");
    __publicField(this, "comment");
    __publicField(this, "empty");
    __publicField(this, "preserveMultipleSlashes");
    __publicField(this, "partial");
    __publicField(this, "globSet");
    __publicField(this, "globParts");
    __publicField(this, "nocase");
    __publicField(this, "isWindows");
    __publicField(this, "platform");
    __publicField(this, "windowsNoMagicRoot");
    __publicField(this, "regexp");
    at(t), e = e || {}, this.options = e, this.pattern = t, this.platform = e.platform || Ae, this.isWindows = this.platform === "win32";
    let s = "allowWindowsEscape";
    this.windowsPathsNoEscape = !!e.windowsPathsNoEscape || e[s] === false, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!e.preserveMultipleSlashes, this.regexp = null, this.negate = false, this.nonegate = !!e.nonegate, this.comment = false, this.empty = false, this.partial = !!e.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = e.windowsNoMagicRoot !== void 0 ? e.windowsNoMagicRoot : !!(this.isWindows && this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) return true;
    for (let t of this.set) for (let e of t) if (typeof e != "string") return true;
    return false;
  }
  debug(...t) {
  }
  make() {
    let t = this.pattern, e = this.options;
    if (!e.nocomment && t.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!t) {
      this.empty = true;
      return;
    }
    this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], e.debug && (this.debug = (...r) => console.error(...r)), this.debug(this.pattern, this.globSet);
    let s = this.globSet.map((r) => this.slashSplit(r));
    this.globParts = this.preprocess(s), this.debug(this.pattern, this.globParts);
    let i = this.globParts.map((r, o, h) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        let a = r[0] === "" && r[1] === "" && (r[2] === "?" || !ve.test(r[2])) && !ve.test(r[3]), l = /^[a-z]:/i.test(r[0]);
        if (a) return [...r.slice(0, 4), ...r.slice(4).map((u) => this.parse(u))];
        if (l) return [r[0], ...r.slice(1).map((u) => this.parse(u))];
      }
      return r.map((a) => this.parse(a));
    });
    if (this.debug(this.pattern, i), this.set = i.filter((r) => r.indexOf(false) === -1), this.isWindows) for (let r = 0; r < this.set.length; r++) {
      let o = this.set[r];
      o[0] === "" && o[1] === "" && this.globParts[r][2] === "?" && typeof o[3] == "string" && /^[a-z]:$/i.test(o[3]) && (o[2] = "?");
    }
    this.debug(this.pattern, this.set);
  }
  preprocess(t) {
    if (this.options.noglobstar) for (let s = 0; s < t.length; s++) for (let i = 0; i < t[s].length; i++) t[s][i] === "**" && (t[s][i] = "*");
    let { optimizationLevel: e = 1 } = this.options;
    return e >= 2 ? (t = this.firstPhasePreProcess(t), t = this.secondPhasePreProcess(t)) : e >= 1 ? t = this.levelOneOptimize(t) : t = this.adjascentGlobstarOptimize(t), t;
  }
  adjascentGlobstarOptimize(t) {
    return t.map((e) => {
      let s = -1;
      for (; (s = e.indexOf("**", s + 1)) !== -1; ) {
        let i = s;
        for (; e[i + 1] === "**"; ) i++;
        i !== s && e.splice(s, i - s);
      }
      return e;
    });
  }
  levelOneOptimize(t) {
    return t.map((e) => (e = e.reduce((s, i) => {
      let r = s[s.length - 1];
      return i === "**" && r === "**" ? s : i === ".." && r && r !== ".." && r !== "." && r !== "**" ? (s.pop(), s) : (s.push(i), s);
    }, []), e.length === 0 ? [""] : e));
  }
  levelTwoFileOptimize(t) {
    Array.isArray(t) || (t = this.slashSplit(t));
    let e = false;
    do {
      if (e = false, !this.preserveMultipleSlashes) {
        for (let i = 1; i < t.length - 1; i++) {
          let r = t[i];
          i === 1 && r === "" && t[0] === "" || (r === "." || r === "") && (e = true, t.splice(i, 1), i--);
        }
        t[0] === "." && t.length === 2 && (t[1] === "." || t[1] === "") && (e = true, t.pop());
      }
      let s = 0;
      for (; (s = t.indexOf("..", s + 1)) !== -1; ) {
        let i = t[s - 1];
        i && i !== "." && i !== ".." && i !== "**" && (e = true, t.splice(s - 1, 2), s -= 2);
      }
    } while (e);
    return t.length === 0 ? [""] : t;
  }
  firstPhasePreProcess(t) {
    let e = false;
    do {
      e = false;
      for (let s of t) {
        let i = -1;
        for (; (i = s.indexOf("**", i + 1)) !== -1; ) {
          let o = i;
          for (; s[o + 1] === "**"; ) o++;
          o > i && s.splice(i + 1, o - i);
          let h = s[i + 1], a = s[i + 2], l = s[i + 3];
          if (h !== ".." || !a || a === "." || a === ".." || !l || l === "." || l === "..") continue;
          e = true, s.splice(i, 1);
          let u = s.slice(0);
          u[i] = "**", t.push(u), i--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let o = 1; o < s.length - 1; o++) {
            let h = s[o];
            o === 1 && h === "" && s[0] === "" || (h === "." || h === "") && (e = true, s.splice(o, 1), o--);
          }
          s[0] === "." && s.length === 2 && (s[1] === "." || s[1] === "") && (e = true, s.pop());
        }
        let r = 0;
        for (; (r = s.indexOf("..", r + 1)) !== -1; ) {
          let o = s[r - 1];
          if (o && o !== "." && o !== ".." && o !== "**") {
            e = true;
            let a = r === 1 && s[r + 1] === "**" ? ["."] : [];
            s.splice(r - 1, 2, ...a), s.length === 0 && s.push(""), r -= 2;
          }
        }
      }
    } while (e);
    return t;
  }
  secondPhasePreProcess(t) {
    for (let e = 0; e < t.length - 1; e++) for (let s = e + 1; s < t.length; s++) {
      let i = this.partsMatch(t[e], t[s], !this.preserveMultipleSlashes);
      if (i) {
        t[e] = [], t[s] = i;
        break;
      }
    }
    return t.filter((e) => e.length);
  }
  partsMatch(t, e, s = false) {
    let i = 0, r = 0, o = [], h = "";
    for (; i < t.length && r < e.length; ) if (t[i] === e[r]) o.push(h === "b" ? e[r] : t[i]), i++, r++;
    else if (s && t[i] === "**" && e[r] === t[i + 1]) o.push(t[i]), i++;
    else if (s && e[r] === "**" && t[i] === e[r + 1]) o.push(e[r]), r++;
    else if (t[i] === "*" && e[r] && (this.options.dot || !e[r].startsWith(".")) && e[r] !== "**") {
      if (h === "b") return false;
      h = "a", o.push(t[i]), i++, r++;
    } else if (e[r] === "*" && t[i] && (this.options.dot || !t[i].startsWith(".")) && t[i] !== "**") {
      if (h === "a") return false;
      h = "b", o.push(e[r]), i++, r++;
    } else return false;
    return t.length === e.length && o;
  }
  parseNegate() {
    if (this.nonegate) return;
    let t = this.pattern, e = false, s = 0;
    for (let i = 0; i < t.length && t.charAt(i) === "!"; i++) e = !e, s++;
    s && (this.pattern = t.slice(s)), this.negate = e;
  }
  matchOne(t, e, s = false) {
    let i = this.options;
    if (this.isWindows) {
      let p = typeof t[0] == "string" && /^[a-z]:$/i.test(t[0]), w = !p && t[0] === "" && t[1] === "" && t[2] === "?" && /^[a-z]:$/i.test(t[3]), g = typeof e[0] == "string" && /^[a-z]:$/i.test(e[0]), S = !g && e[0] === "" && e[1] === "" && e[2] === "?" && typeof e[3] == "string" && /^[a-z]:$/i.test(e[3]), E = w ? 3 : p ? 0 : void 0, y = S ? 3 : g ? 0 : void 0;
      if (typeof E == "number" && typeof y == "number") {
        let [b, z] = [t[E], e[y]];
        b.toLowerCase() === z.toLowerCase() && (e[y] = b, y > E ? e = e.slice(y) : E > y && (t = t.slice(E)));
      }
    }
    let { optimizationLevel: r = 1 } = this.options;
    r >= 2 && (t = this.levelTwoFileOptimize(t)), this.debug("matchOne", this, { file: t, pattern: e }), this.debug("matchOne", t.length, e.length);
    for (var o = 0, h = 0, a = t.length, l = e.length; o < a && h < l; o++, h++) {
      this.debug("matchOne loop");
      var u = e[h], c = t[o];
      if (this.debug(e, u, c), u === false) return false;
      if (u === A) {
        this.debug("GLOBSTAR", [e, u, c]);
        var d = o, f = h + 1;
        if (f === l) {
          for (this.debug("** at the end"); o < a; o++) if (t[o] === "." || t[o] === ".." || !i.dot && t[o].charAt(0) === ".") return false;
          return true;
        }
        for (; d < a; ) {
          var m = t[d];
          if (this.debug(`
globstar while`, t, d, e, f, m), this.matchOne(t.slice(d), e.slice(f), s)) return this.debug("globstar found match!", d, a, m), true;
          if (m === "." || m === ".." || !i.dot && m.charAt(0) === ".") {
            this.debug("dot detected!", t, d, e, f);
            break;
          }
          this.debug("globstar swallow a segment, and continue"), d++;
        }
        return !!(s && (this.debug(`
>>> no match, partial?`, t, d, e, f), d === a));
      }
      let p;
      if (typeof u == "string" ? (p = c === u, this.debug("string match", u, c, p)) : (p = u.test(c), this.debug("pattern match", u, c, p)), !p) return false;
    }
    if (o === a && h === l) return true;
    if (o === a) return s;
    if (h === l) return o === a - 1 && t[o] === "";
    throw new Error("wtf?");
  }
  braceExpand() {
    return ke(this.pattern, this.options);
  }
  parse(t) {
    at(t);
    let e = this.options;
    if (t === "**") return A;
    if (t === "") return "";
    let s, i = null;
    (s = t.match(js)) ? i = e.dot ? zs : Is : (s = t.match(Rs)) ? i = (e.nocase ? e.dot ? Ms : Ds : e.dot ? Fs : Os)(s[1]) : (s = t.match(Bs)) ? i = (e.nocase ? e.dot ? $s : Us : e.dot ? Gs : Hs)(s) : (s = t.match(Ns)) ? i = e.dot ? Ls : _s2 : (s = t.match(Ws)) && (i = Ps);
    let r = Q.fromGlob(t, this.options).toMMPattern();
    return i && typeof r == "object" && Reflect.defineProperty(r, "test", { value: i }), r;
  }
  makeRe() {
    if (this.regexp || this.regexp === false) return this.regexp;
    let t = this.set;
    if (!t.length) return this.regexp = false, this.regexp;
    let e = this.options, s = e.noglobstar ? Vs : e.dot ? Ys : Xs, i = new Set(e.nocase ? ["i"] : []), r = t.map((a) => {
      let l = a.map((c) => {
        if (c instanceof RegExp) for (let d of c.flags.split("")) i.add(d);
        return typeof c == "string" ? ei(c) : c === A ? A : c._src;
      });
      l.forEach((c, d) => {
        let f = l[d + 1], m = l[d - 1];
        c !== A || m === A || (m === void 0 ? f !== void 0 && f !== A ? l[d + 1] = "(?:\\/|" + s + "\\/)?" + f : l[d] = s : f === void 0 ? l[d - 1] = m + "(?:\\/|\\/" + s + ")?" : f !== A && (l[d - 1] = m + "(?:\\/|\\/" + s + "\\/)" + f, l[d + 1] = A));
      });
      let u = l.filter((c) => c !== A);
      if (this.partial && u.length >= 1) {
        let c = [];
        for (let d = 1; d <= u.length; d++) c.push(u.slice(0, d).join("/"));
        return "(?:" + c.join("|") + ")";
      }
      return u.join("/");
    }).join("|"), [o, h] = t.length > 1 ? ["(?:", ")"] : ["", ""];
    r = "^" + o + r + h + "$", this.partial && (r = "^(?:\\/|" + o + r.slice(1, -1) + h + ")$"), this.negate && (r = "^(?!" + r + ").+$");
    try {
      this.regexp = new RegExp(r, [...i].join(""));
    } catch {
      this.regexp = false;
    }
    return this.regexp;
  }
  slashSplit(t) {
    return this.preserveMultipleSlashes ? t.split("/") : this.isWindows && /^\/\/[^\/]+/.test(t) ? ["", ...t.split(/\/+/)] : t.split(/\/+/);
  }
  match(t, e = this.partial) {
    if (this.debug("match", t, this.pattern), this.comment) return false;
    if (this.empty) return t === "";
    if (t === "/" && e) return true;
    let s = this.options;
    this.isWindows && (t = t.split("\\").join("/"));
    let i = this.slashSplit(t);
    this.debug(this.pattern, "split", i);
    let r = this.set;
    this.debug(this.pattern, "set", r);
    let o = i[i.length - 1];
    if (!o) for (let h = i.length - 2; !o && h >= 0; h--) o = i[h];
    for (let h = 0; h < r.length; h++) {
      let a = r[h], l = i;
      if (s.matchBase && a.length === 1 && (l = [o]), this.matchOne(l, a, e)) return s.flipNegate ? true : !this.negate;
    }
    return s.flipNegate ? false : this.negate;
  }
  static defaults(t) {
    return O.defaults(t).Minimatch;
  }
};
O.AST = Q;
O.Minimatch = D;
O.escape = tt;
O.unescape = W;
var si = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date;
var Oe = /* @__PURE__ */ new Set();
var Vt = typeof process == "object" && process ? process : {};
var Fe = (n5, t, e, s) => {
  typeof Vt.emitWarning == "function" ? Vt.emitWarning(n5, t, e, s) : console.error(`[${e}] ${t}: ${n5}`);
};
var At = globalThis.AbortController;
var Re = globalThis.AbortSignal;
if (typeof At > "u") {
  Re = class {
    constructor() {
      __publicField(this, "onabort");
      __publicField(this, "_onabort", []);
      __publicField(this, "reason");
      __publicField(this, "aborted", false);
    }
    addEventListener(e, s) {
      this._onabort.push(s);
    }
  }, At = class {
    constructor() {
      __publicField(this, "signal", new Re());
      t();
    }
    abort(e) {
      if (!this.signal.aborted) {
        this.signal.reason = e, this.signal.aborted = true;
        for (let s of this.signal._onabort) s(e);
        this.signal.onabort?.(e);
      }
    }
  };
  let n5 = Vt.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1", t = () => {
    n5 && (n5 = false, Fe("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", t));
  };
}
var ii = (n5) => !Oe.has(n5);
var q = (n5) => n5 && n5 === Math.floor(n5) && n5 > 0 && isFinite(n5);
var De = (n5) => q(n5) ? n5 <= Math.pow(2, 8) ? Uint8Array : n5 <= Math.pow(2, 16) ? Uint16Array : n5 <= Math.pow(2, 32) ? Uint32Array : n5 <= Number.MAX_SAFE_INTEGER ? Tt : null : null;
var Tt = class extends Array {
  constructor(n5) {
    super(n5), this.fill(0);
  }
};
var _a2, _t2;
var ri = (_a2 = class {
  constructor(t, e) {
    __publicField(this, "heap");
    __publicField(this, "length");
    if (!__privateGet(_a2, _t2)) throw new TypeError("instantiate Stack using Stack.create(n)");
    this.heap = new e(t), this.length = 0;
  }
  static create(t) {
    let e = De(t);
    if (!e) return [];
    __privateSet(_a2, _t2, true);
    let s = new _a2(t, e);
    return __privateSet(_a2, _t2, false), s;
  }
  push(t) {
    this.heap[this.length++] = t;
  }
  pop() {
    return this.heap[--this.length];
  }
}, _t2 = new WeakMap(), __privateAdd(_a2, _t2, false), _a2);
var _a3, _b, _t3, _s3, _n2, _r2, _o2, _S2, _w2, _c3, _h2, _u2, _f2, _a4, _i, _d, _E, _b2, _p, _R, _m, _C, _T, _g, _y, _x, _A, _e, __, _Me_instances, M_fn, _k, _N, _j, _v, G_fn, _P, _L, _I, F_fn, D_fn, z_fn, B_fn, U_fn, l_fn, $_fn, W_fn, O_fn, H_fn, _c2;
var ft = (_c2 = class {
  constructor(t) {
    __privateAdd(this, _Me_instances);
    __privateAdd(this, _t3);
    __privateAdd(this, _s3);
    __privateAdd(this, _n2);
    __privateAdd(this, _r2);
    __privateAdd(this, _o2);
    __privateAdd(this, _S2);
    __privateAdd(this, _w2);
    __privateAdd(this, _c3);
    __publicField(this, "ttl");
    __publicField(this, "ttlResolution");
    __publicField(this, "ttlAutopurge");
    __publicField(this, "updateAgeOnGet");
    __publicField(this, "updateAgeOnHas");
    __publicField(this, "allowStale");
    __publicField(this, "noDisposeOnSet");
    __publicField(this, "noUpdateTTL");
    __publicField(this, "maxEntrySize");
    __publicField(this, "sizeCalculation");
    __publicField(this, "noDeleteOnFetchRejection");
    __publicField(this, "noDeleteOnStaleGet");
    __publicField(this, "allowStaleOnFetchAbort");
    __publicField(this, "allowStaleOnFetchRejection");
    __publicField(this, "ignoreFetchAbort");
    __privateAdd(this, _h2);
    __privateAdd(this, _u2);
    __privateAdd(this, _f2);
    __privateAdd(this, _a4);
    __privateAdd(this, _i);
    __privateAdd(this, _d);
    __privateAdd(this, _E);
    __privateAdd(this, _b2);
    __privateAdd(this, _p);
    __privateAdd(this, _R);
    __privateAdd(this, _m);
    __privateAdd(this, _C);
    __privateAdd(this, _T);
    __privateAdd(this, _g);
    __privateAdd(this, _y);
    __privateAdd(this, _x);
    __privateAdd(this, _A);
    __privateAdd(this, _e);
    __privateAdd(this, __);
    __privateAdd(this, _k, () => {
    });
    __privateAdd(this, _N, () => {
    });
    __privateAdd(this, _j, () => {
    });
    __privateAdd(this, _v, () => false);
    __privateAdd(this, _P, (t) => {
    });
    __privateAdd(this, _L, (t, e, s) => {
    });
    __privateAdd(this, _I, (t, e, s, i) => {
      if (s || i) throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
      return 0;
    });
    __publicField(this, _a3, "LRUCache");
    let { max: e = 0, ttl: s, ttlResolution: i = 1, ttlAutopurge: r, updateAgeOnGet: o, updateAgeOnHas: h, allowStale: a, dispose: l, onInsert: u, disposeAfter: c, noDisposeOnSet: d, noUpdateTTL: f, maxSize: m = 0, maxEntrySize: p = 0, sizeCalculation: w, fetchMethod: g, memoMethod: S, noDeleteOnFetchRejection: E, noDeleteOnStaleGet: y, allowStaleOnFetchRejection: b, allowStaleOnFetchAbort: z, ignoreFetchAbort: $, perf: J } = t;
    if (J !== void 0 && typeof J?.now != "function") throw new TypeError("perf option must have a now() method if specified");
    if (__privateSet(this, _c3, J ?? si), e !== 0 && !q(e)) throw new TypeError("max option must be a nonnegative integer");
    let Z = e ? De(e) : Array;
    if (!Z) throw new Error("invalid max value: " + e);
    if (__privateSet(this, _t3, e), __privateSet(this, _s3, m), this.maxEntrySize = p || __privateGet(this, _s3), this.sizeCalculation = w, this.sizeCalculation) {
      if (!__privateGet(this, _s3) && !this.maxEntrySize) throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      if (typeof this.sizeCalculation != "function") throw new TypeError("sizeCalculation set to non-function");
    }
    if (S !== void 0 && typeof S != "function") throw new TypeError("memoMethod must be a function if defined");
    if (__privateSet(this, _w2, S), g !== void 0 && typeof g != "function") throw new TypeError("fetchMethod must be a function if specified");
    if (__privateSet(this, _S2, g), __privateSet(this, _A, !!g), __privateSet(this, _f2, /* @__PURE__ */ new Map()), __privateSet(this, _a4, new Array(e).fill(void 0)), __privateSet(this, _i, new Array(e).fill(void 0)), __privateSet(this, _d, new Z(e)), __privateSet(this, _E, new Z(e)), __privateSet(this, _b2, 0), __privateSet(this, _p, 0), __privateSet(this, _R, ri.create(e)), __privateSet(this, _h2, 0), __privateSet(this, _u2, 0), typeof l == "function" && __privateSet(this, _n2, l), typeof u == "function" && __privateSet(this, _r2, u), typeof c == "function" ? (__privateSet(this, _o2, c), __privateSet(this, _m, [])) : (__privateSet(this, _o2, void 0), __privateSet(this, _m, void 0)), __privateSet(this, _x, !!__privateGet(this, _n2)), __privateSet(this, __, !!__privateGet(this, _r2)), __privateSet(this, _e, !!__privateGet(this, _o2)), this.noDisposeOnSet = !!d, this.noUpdateTTL = !!f, this.noDeleteOnFetchRejection = !!E, this.allowStaleOnFetchRejection = !!b, this.allowStaleOnFetchAbort = !!z, this.ignoreFetchAbort = !!$, this.maxEntrySize !== 0) {
      if (__privateGet(this, _s3) !== 0 && !q(__privateGet(this, _s3))) throw new TypeError("maxSize must be a positive integer if specified");
      if (!q(this.maxEntrySize)) throw new TypeError("maxEntrySize must be a positive integer if specified");
      __privateMethod(this, _Me_instances, G_fn).call(this);
    }
    if (this.allowStale = !!a, this.noDeleteOnStaleGet = !!y, this.updateAgeOnGet = !!o, this.updateAgeOnHas = !!h, this.ttlResolution = q(i) || i === 0 ? i : 1, this.ttlAutopurge = !!r, this.ttl = s || 0, this.ttl) {
      if (!q(this.ttl)) throw new TypeError("ttl must be a positive integer if specified");
      __privateMethod(this, _Me_instances, M_fn).call(this);
    }
    if (__privateGet(this, _t3) === 0 && this.ttl === 0 && __privateGet(this, _s3) === 0) throw new TypeError("At least one of max, maxSize, or ttl is required");
    if (!this.ttlAutopurge && !__privateGet(this, _t3) && !__privateGet(this, _s3)) {
      let $t = "LRU_CACHE_UNBOUNDED";
      ii($t) && (Oe.add($t), Fe("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", $t, _c2));
    }
  }
  get perf() {
    return __privateGet(this, _c3);
  }
  static unsafeExposeInternals(t) {
    return { starts: __privateGet(t, _T), ttls: __privateGet(t, _g), autopurgeTimers: __privateGet(t, _y), sizes: __privateGet(t, _C), keyMap: __privateGet(t, _f2), keyList: __privateGet(t, _a4), valList: __privateGet(t, _i), next: __privateGet(t, _d), prev: __privateGet(t, _E), get head() {
      return __privateGet(t, _b2);
    }, get tail() {
      return __privateGet(t, _p);
    }, free: __privateGet(t, _R), isBackgroundFetch: (e) => {
      var _a12;
      return __privateMethod(_a12 = t, _Me_instances, l_fn).call(_a12, e);
    }, backgroundFetch: (e, s, i, r) => {
      var _a12;
      return __privateMethod(_a12 = t, _Me_instances, U_fn).call(_a12, e, s, i, r);
    }, moveToTail: (e) => {
      var _a12;
      return __privateMethod(_a12 = t, _Me_instances, W_fn).call(_a12, e);
    }, indexes: (e) => {
      var _a12;
      return __privateMethod(_a12 = t, _Me_instances, F_fn).call(_a12, e);
    }, rindexes: (e) => {
      var _a12;
      return __privateMethod(_a12 = t, _Me_instances, D_fn).call(_a12, e);
    }, isStale: (e) => {
      var _a12;
      return __privateGet(_a12 = t, _v).call(_a12, e);
    } };
  }
  get max() {
    return __privateGet(this, _t3);
  }
  get maxSize() {
    return __privateGet(this, _s3);
  }
  get calculatedSize() {
    return __privateGet(this, _u2);
  }
  get size() {
    return __privateGet(this, _h2);
  }
  get fetchMethod() {
    return __privateGet(this, _S2);
  }
  get memoMethod() {
    return __privateGet(this, _w2);
  }
  get dispose() {
    return __privateGet(this, _n2);
  }
  get onInsert() {
    return __privateGet(this, _r2);
  }
  get disposeAfter() {
    return __privateGet(this, _o2);
  }
  getRemainingTTL(t) {
    return __privateGet(this, _f2).has(t) ? 1 / 0 : 0;
  }
  *entries() {
    for (let t of __privateMethod(this, _Me_instances, F_fn).call(this)) __privateGet(this, _i)[t] !== void 0 && __privateGet(this, _a4)[t] !== void 0 && !__privateMethod(this, _Me_instances, l_fn).call(this, __privateGet(this, _i)[t]) && (yield [__privateGet(this, _a4)[t], __privateGet(this, _i)[t]]);
  }
  *rentries() {
    for (let t of __privateMethod(this, _Me_instances, D_fn).call(this)) __privateGet(this, _i)[t] !== void 0 && __privateGet(this, _a4)[t] !== void 0 && !__privateMethod(this, _Me_instances, l_fn).call(this, __privateGet(this, _i)[t]) && (yield [__privateGet(this, _a4)[t], __privateGet(this, _i)[t]]);
  }
  *keys() {
    for (let t of __privateMethod(this, _Me_instances, F_fn).call(this)) {
      let e = __privateGet(this, _a4)[t];
      e !== void 0 && !__privateMethod(this, _Me_instances, l_fn).call(this, __privateGet(this, _i)[t]) && (yield e);
    }
  }
  *rkeys() {
    for (let t of __privateMethod(this, _Me_instances, D_fn).call(this)) {
      let e = __privateGet(this, _a4)[t];
      e !== void 0 && !__privateMethod(this, _Me_instances, l_fn).call(this, __privateGet(this, _i)[t]) && (yield e);
    }
  }
  *values() {
    for (let t of __privateMethod(this, _Me_instances, F_fn).call(this)) __privateGet(this, _i)[t] !== void 0 && !__privateMethod(this, _Me_instances, l_fn).call(this, __privateGet(this, _i)[t]) && (yield __privateGet(this, _i)[t]);
  }
  *rvalues() {
    for (let t of __privateMethod(this, _Me_instances, D_fn).call(this)) __privateGet(this, _i)[t] !== void 0 && !__privateMethod(this, _Me_instances, l_fn).call(this, __privateGet(this, _i)[t]) && (yield __privateGet(this, _i)[t]);
  }
  [(_b = Symbol.iterator, _a3 = Symbol.toStringTag, _b)]() {
    return this.entries();
  }
  find(t, e = {}) {
    for (let s of __privateMethod(this, _Me_instances, F_fn).call(this)) {
      let i = __privateGet(this, _i)[s], r = __privateMethod(this, _Me_instances, l_fn).call(this, i) ? i.__staleWhileFetching : i;
      if (r !== void 0 && t(r, __privateGet(this, _a4)[s], this)) return this.get(__privateGet(this, _a4)[s], e);
    }
  }
  forEach(t, e = this) {
    for (let s of __privateMethod(this, _Me_instances, F_fn).call(this)) {
      let i = __privateGet(this, _i)[s], r = __privateMethod(this, _Me_instances, l_fn).call(this, i) ? i.__staleWhileFetching : i;
      r !== void 0 && t.call(e, r, __privateGet(this, _a4)[s], this);
    }
  }
  rforEach(t, e = this) {
    for (let s of __privateMethod(this, _Me_instances, D_fn).call(this)) {
      let i = __privateGet(this, _i)[s], r = __privateMethod(this, _Me_instances, l_fn).call(this, i) ? i.__staleWhileFetching : i;
      r !== void 0 && t.call(e, r, __privateGet(this, _a4)[s], this);
    }
  }
  purgeStale() {
    let t = false;
    for (let e of __privateMethod(this, _Me_instances, D_fn).call(this, { allowStale: true })) __privateGet(this, _v).call(this, e) && (__privateMethod(this, _Me_instances, O_fn).call(this, __privateGet(this, _a4)[e], "expire"), t = true);
    return t;
  }
  info(t) {
    let e = __privateGet(this, _f2).get(t);
    if (e === void 0) return;
    let s = __privateGet(this, _i)[e], i = __privateMethod(this, _Me_instances, l_fn).call(this, s) ? s.__staleWhileFetching : s;
    if (i === void 0) return;
    let r = { value: i };
    if (__privateGet(this, _g) && __privateGet(this, _T)) {
      let o = __privateGet(this, _g)[e], h = __privateGet(this, _T)[e];
      if (o && h) {
        let a = o - (__privateGet(this, _c3).now() - h);
        r.ttl = a, r.start = Date.now();
      }
    }
    return __privateGet(this, _C) && (r.size = __privateGet(this, _C)[e]), r;
  }
  dump() {
    let t = [];
    for (let e of __privateMethod(this, _Me_instances, F_fn).call(this, { allowStale: true })) {
      let s = __privateGet(this, _a4)[e], i = __privateGet(this, _i)[e], r = __privateMethod(this, _Me_instances, l_fn).call(this, i) ? i.__staleWhileFetching : i;
      if (r === void 0 || s === void 0) continue;
      let o = { value: r };
      if (__privateGet(this, _g) && __privateGet(this, _T)) {
        o.ttl = __privateGet(this, _g)[e];
        let h = __privateGet(this, _c3).now() - __privateGet(this, _T)[e];
        o.start = Math.floor(Date.now() - h);
      }
      __privateGet(this, _C) && (o.size = __privateGet(this, _C)[e]), t.unshift([s, o]);
    }
    return t;
  }
  load(t) {
    this.clear();
    for (let [e, s] of t) {
      if (s.start) {
        let i = Date.now() - s.start;
        s.start = __privateGet(this, _c3).now() - i;
      }
      this.set(e, s.value, s);
    }
  }
  set(t, e, s = {}) {
    var _a12, _b5, _c7, _d4;
    if (e === void 0) return this.delete(t), this;
    let { ttl: i = this.ttl, start: r, noDisposeOnSet: o = this.noDisposeOnSet, sizeCalculation: h = this.sizeCalculation, status: a } = s, { noUpdateTTL: l = this.noUpdateTTL } = s, u = __privateGet(this, _I).call(this, t, e, s.size || 0, h);
    if (this.maxEntrySize && u > this.maxEntrySize) return a && (a.set = "miss", a.maxEntrySizeExceeded = true), __privateMethod(this, _Me_instances, O_fn).call(this, t, "set"), this;
    let c = __privateGet(this, _h2) === 0 ? void 0 : __privateGet(this, _f2).get(t);
    if (c === void 0) c = __privateGet(this, _h2) === 0 ? __privateGet(this, _p) : __privateGet(this, _R).length !== 0 ? __privateGet(this, _R).pop() : __privateGet(this, _h2) === __privateGet(this, _t3) ? __privateMethod(this, _Me_instances, B_fn).call(this, false) : __privateGet(this, _h2), __privateGet(this, _a4)[c] = t, __privateGet(this, _i)[c] = e, __privateGet(this, _f2).set(t, c), __privateGet(this, _d)[__privateGet(this, _p)] = c, __privateGet(this, _E)[c] = __privateGet(this, _p), __privateSet(this, _p, c), __privateWrapper(this, _h2)._++, __privateGet(this, _L).call(this, c, u, a), a && (a.set = "add"), l = false, __privateGet(this, __) && ((_a12 = __privateGet(this, _r2)) == null ? void 0 : _a12.call(this, e, t, "add"));
    else {
      __privateMethod(this, _Me_instances, W_fn).call(this, c);
      let d = __privateGet(this, _i)[c];
      if (e !== d) {
        if (__privateGet(this, _A) && __privateMethod(this, _Me_instances, l_fn).call(this, d)) {
          d.__abortController.abort(new Error("replaced"));
          let { __staleWhileFetching: f } = d;
          f !== void 0 && !o && (__privateGet(this, _x) && ((_b5 = __privateGet(this, _n2)) == null ? void 0 : _b5.call(this, f, t, "set")), __privateGet(this, _e) && __privateGet(this, _m)?.push([f, t, "set"]));
        } else o || (__privateGet(this, _x) && ((_c7 = __privateGet(this, _n2)) == null ? void 0 : _c7.call(this, d, t, "set")), __privateGet(this, _e) && __privateGet(this, _m)?.push([d, t, "set"]));
        if (__privateGet(this, _P).call(this, c), __privateGet(this, _L).call(this, c, u, a), __privateGet(this, _i)[c] = e, a) {
          a.set = "replace";
          let f = d && __privateMethod(this, _Me_instances, l_fn).call(this, d) ? d.__staleWhileFetching : d;
          f !== void 0 && (a.oldValue = f);
        }
      } else a && (a.set = "update");
      __privateGet(this, __) && this.onInsert?.(e, t, e === d ? "update" : "replace");
    }
    if (i !== 0 && !__privateGet(this, _g) && __privateMethod(this, _Me_instances, M_fn).call(this), __privateGet(this, _g) && (l || __privateGet(this, _j).call(this, c, i, r), a && __privateGet(this, _N).call(this, a, c)), !o && __privateGet(this, _e) && __privateGet(this, _m)) {
      let d = __privateGet(this, _m), f;
      for (; f = d?.shift(); ) (_d4 = __privateGet(this, _o2)) == null ? void 0 : _d4.call(this, ...f);
    }
    return this;
  }
  pop() {
    var _a12;
    try {
      for (; __privateGet(this, _h2); ) {
        let t = __privateGet(this, _i)[__privateGet(this, _b2)];
        if (__privateMethod(this, _Me_instances, B_fn).call(this, true), __privateMethod(this, _Me_instances, l_fn).call(this, t)) {
          if (t.__staleWhileFetching) return t.__staleWhileFetching;
        } else if (t !== void 0) return t;
      }
    } finally {
      if (__privateGet(this, _e) && __privateGet(this, _m)) {
        let t = __privateGet(this, _m), e;
        for (; e = t?.shift(); ) (_a12 = __privateGet(this, _o2)) == null ? void 0 : _a12.call(this, ...e);
      }
    }
  }
  has(t, e = {}) {
    let { updateAgeOnHas: s = this.updateAgeOnHas, status: i } = e, r = __privateGet(this, _f2).get(t);
    if (r !== void 0) {
      let o = __privateGet(this, _i)[r];
      if (__privateMethod(this, _Me_instances, l_fn).call(this, o) && o.__staleWhileFetching === void 0) return false;
      if (__privateGet(this, _v).call(this, r)) i && (i.has = "stale", __privateGet(this, _N).call(this, i, r));
      else return s && __privateGet(this, _k).call(this, r), i && (i.has = "hit", __privateGet(this, _N).call(this, i, r)), true;
    } else i && (i.has = "miss");
    return false;
  }
  peek(t, e = {}) {
    let { allowStale: s = this.allowStale } = e, i = __privateGet(this, _f2).get(t);
    if (i === void 0 || !s && __privateGet(this, _v).call(this, i)) return;
    let r = __privateGet(this, _i)[i];
    return __privateMethod(this, _Me_instances, l_fn).call(this, r) ? r.__staleWhileFetching : r;
  }
  async fetch(t, e = {}) {
    let { allowStale: s = this.allowStale, updateAgeOnGet: i = this.updateAgeOnGet, noDeleteOnStaleGet: r = this.noDeleteOnStaleGet, ttl: o = this.ttl, noDisposeOnSet: h = this.noDisposeOnSet, size: a = 0, sizeCalculation: l = this.sizeCalculation, noUpdateTTL: u = this.noUpdateTTL, noDeleteOnFetchRejection: c = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection: d = this.allowStaleOnFetchRejection, ignoreFetchAbort: f = this.ignoreFetchAbort, allowStaleOnFetchAbort: m = this.allowStaleOnFetchAbort, context: p, forceRefresh: w = false, status: g, signal: S } = e;
    if (!__privateGet(this, _A)) return g && (g.fetch = "get"), this.get(t, { allowStale: s, updateAgeOnGet: i, noDeleteOnStaleGet: r, status: g });
    let E = { allowStale: s, updateAgeOnGet: i, noDeleteOnStaleGet: r, ttl: o, noDisposeOnSet: h, size: a, sizeCalculation: l, noUpdateTTL: u, noDeleteOnFetchRejection: c, allowStaleOnFetchRejection: d, allowStaleOnFetchAbort: m, ignoreFetchAbort: f, status: g, signal: S }, y = __privateGet(this, _f2).get(t);
    if (y === void 0) {
      g && (g.fetch = "miss");
      let b = __privateMethod(this, _Me_instances, U_fn).call(this, t, y, E, p);
      return b.__returned = b;
    } else {
      let b = __privateGet(this, _i)[y];
      if (__privateMethod(this, _Me_instances, l_fn).call(this, b)) {
        let Z = s && b.__staleWhileFetching !== void 0;
        return g && (g.fetch = "inflight", Z && (g.returnedStale = true)), Z ? b.__staleWhileFetching : b.__returned = b;
      }
      let z = __privateGet(this, _v).call(this, y);
      if (!w && !z) return g && (g.fetch = "hit"), __privateMethod(this, _Me_instances, W_fn).call(this, y), i && __privateGet(this, _k).call(this, y), g && __privateGet(this, _N).call(this, g, y), b;
      let $ = __privateMethod(this, _Me_instances, U_fn).call(this, t, y, E, p), J = $.__staleWhileFetching !== void 0 && s;
      return g && (g.fetch = z ? "stale" : "refresh", J && z && (g.returnedStale = true)), J ? $.__staleWhileFetching : $.__returned = $;
    }
  }
  async forceFetch(t, e = {}) {
    let s = await this.fetch(t, e);
    if (s === void 0) throw new Error("fetch() returned undefined");
    return s;
  }
  memo(t, e = {}) {
    let s = __privateGet(this, _w2);
    if (!s) throw new Error("no memoMethod provided to constructor");
    let { context: i, forceRefresh: r, ...o } = e, h = this.get(t, o);
    if (!r && h !== void 0) return h;
    let a = s(t, h, { options: o, context: i });
    return this.set(t, a, o), a;
  }
  get(t, e = {}) {
    let { allowStale: s = this.allowStale, updateAgeOnGet: i = this.updateAgeOnGet, noDeleteOnStaleGet: r = this.noDeleteOnStaleGet, status: o } = e, h = __privateGet(this, _f2).get(t);
    if (h !== void 0) {
      let a = __privateGet(this, _i)[h], l = __privateMethod(this, _Me_instances, l_fn).call(this, a);
      return o && __privateGet(this, _N).call(this, o, h), __privateGet(this, _v).call(this, h) ? (o && (o.get = "stale"), l ? (o && s && a.__staleWhileFetching !== void 0 && (o.returnedStale = true), s ? a.__staleWhileFetching : void 0) : (r || __privateMethod(this, _Me_instances, O_fn).call(this, t, "expire"), o && s && (o.returnedStale = true), s ? a : void 0)) : (o && (o.get = "hit"), l ? a.__staleWhileFetching : (__privateMethod(this, _Me_instances, W_fn).call(this, h), i && __privateGet(this, _k).call(this, h), a));
    } else o && (o.get = "miss");
  }
  delete(t) {
    return __privateMethod(this, _Me_instances, O_fn).call(this, t, "delete");
  }
  clear() {
    return __privateMethod(this, _Me_instances, H_fn).call(this, "delete");
  }
}, _t3 = new WeakMap(), _s3 = new WeakMap(), _n2 = new WeakMap(), _r2 = new WeakMap(), _o2 = new WeakMap(), _S2 = new WeakMap(), _w2 = new WeakMap(), _c3 = new WeakMap(), _h2 = new WeakMap(), _u2 = new WeakMap(), _f2 = new WeakMap(), _a4 = new WeakMap(), _i = new WeakMap(), _d = new WeakMap(), _E = new WeakMap(), _b2 = new WeakMap(), _p = new WeakMap(), _R = new WeakMap(), _m = new WeakMap(), _C = new WeakMap(), _T = new WeakMap(), _g = new WeakMap(), _y = new WeakMap(), _x = new WeakMap(), _A = new WeakMap(), _e = new WeakMap(), __ = new WeakMap(), _Me_instances = new WeakSet(), M_fn = function() {
  let t = new Tt(__privateGet(this, _t3)), e = new Tt(__privateGet(this, _t3));
  __privateSet(this, _g, t), __privateSet(this, _T, e);
  let s = this.ttlAutopurge ? new Array(__privateGet(this, _t3)) : void 0;
  __privateSet(this, _y, s), __privateSet(this, _j, (o, h, a = __privateGet(this, _c3).now()) => {
    if (e[o] = h !== 0 ? a : 0, t[o] = h, s?.[o] && (clearTimeout(s[o]), s[o] = void 0), h !== 0 && s) {
      let l = setTimeout(() => {
        __privateGet(this, _v).call(this, o) && __privateMethod(this, _Me_instances, O_fn).call(this, __privateGet(this, _a4)[o], "expire");
      }, h + 1);
      l.unref && l.unref(), s[o] = l;
    }
  }), __privateSet(this, _k, (o) => {
    e[o] = t[o] !== 0 ? __privateGet(this, _c3).now() : 0;
  }), __privateSet(this, _N, (o, h) => {
    if (t[h]) {
      let a = t[h], l = e[h];
      if (!a || !l) return;
      o.ttl = a, o.start = l, o.now = i || r();
      let u = o.now - l;
      o.remainingTTL = a - u;
    }
  });
  let i = 0, r = () => {
    let o = __privateGet(this, _c3).now();
    if (this.ttlResolution > 0) {
      i = o;
      let h = setTimeout(() => i = 0, this.ttlResolution);
      h.unref && h.unref();
    }
    return o;
  };
  this.getRemainingTTL = (o) => {
    let h = __privateGet(this, _f2).get(o);
    if (h === void 0) return 0;
    let a = t[h], l = e[h];
    if (!a || !l) return 1 / 0;
    let u = (i || r()) - l;
    return a - u;
  }, __privateSet(this, _v, (o) => {
    let h = e[o], a = t[o];
    return !!a && !!h && (i || r()) - h > a;
  });
}, _k = new WeakMap(), _N = new WeakMap(), _j = new WeakMap(), _v = new WeakMap(), G_fn = function() {
  let t = new Tt(__privateGet(this, _t3));
  __privateSet(this, _u2, 0), __privateSet(this, _C, t), __privateSet(this, _P, (e) => {
    __privateSet(this, _u2, __privateGet(this, _u2) - t[e]), t[e] = 0;
  }), __privateSet(this, _I, (e, s, i, r) => {
    if (__privateMethod(this, _Me_instances, l_fn).call(this, s)) return 0;
    if (!q(i)) if (r) {
      if (typeof r != "function") throw new TypeError("sizeCalculation must be a function");
      if (i = r(s, e), !q(i)) throw new TypeError("sizeCalculation return invalid (expect positive integer)");
    } else throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
    return i;
  }), __privateSet(this, _L, (e, s, i) => {
    if (t[e] = s, __privateGet(this, _s3)) {
      let r = __privateGet(this, _s3) - t[e];
      for (; __privateGet(this, _u2) > r; ) __privateMethod(this, _Me_instances, B_fn).call(this, true);
    }
    __privateSet(this, _u2, __privateGet(this, _u2) + t[e]), i && (i.entrySize = s, i.totalCalculatedSize = __privateGet(this, _u2));
  });
}, _P = new WeakMap(), _L = new WeakMap(), _I = new WeakMap(), F_fn = function* ({ allowStale: t = this.allowStale } = {}) {
  if (__privateGet(this, _h2)) for (let e = __privateGet(this, _p); !(!__privateMethod(this, _Me_instances, z_fn).call(this, e) || ((t || !__privateGet(this, _v).call(this, e)) && (yield e), e === __privateGet(this, _b2))); ) e = __privateGet(this, _E)[e];
}, D_fn = function* ({ allowStale: t = this.allowStale } = {}) {
  if (__privateGet(this, _h2)) for (let e = __privateGet(this, _b2); !(!__privateMethod(this, _Me_instances, z_fn).call(this, e) || ((t || !__privateGet(this, _v).call(this, e)) && (yield e), e === __privateGet(this, _p))); ) e = __privateGet(this, _d)[e];
}, z_fn = function(t) {
  return t !== void 0 && __privateGet(this, _f2).get(__privateGet(this, _a4)[t]) === t;
}, B_fn = function(t) {
  var _a12;
  let e = __privateGet(this, _b2), s = __privateGet(this, _a4)[e], i = __privateGet(this, _i)[e];
  return __privateGet(this, _A) && __privateMethod(this, _Me_instances, l_fn).call(this, i) ? i.__abortController.abort(new Error("evicted")) : (__privateGet(this, _x) || __privateGet(this, _e)) && (__privateGet(this, _x) && ((_a12 = __privateGet(this, _n2)) == null ? void 0 : _a12.call(this, i, s, "evict")), __privateGet(this, _e) && __privateGet(this, _m)?.push([i, s, "evict"])), __privateGet(this, _P).call(this, e), __privateGet(this, _y)?.[e] && (clearTimeout(__privateGet(this, _y)[e]), __privateGet(this, _y)[e] = void 0), t && (__privateGet(this, _a4)[e] = void 0, __privateGet(this, _i)[e] = void 0, __privateGet(this, _R).push(e)), __privateGet(this, _h2) === 1 ? (__privateSet(this, _b2, __privateSet(this, _p, 0)), __privateGet(this, _R).length = 0) : __privateSet(this, _b2, __privateGet(this, _d)[e]), __privateGet(this, _f2).delete(s), __privateWrapper(this, _h2)._--, e;
}, U_fn = function(t, e, s, i) {
  let r = e === void 0 ? void 0 : __privateGet(this, _i)[e];
  if (__privateMethod(this, _Me_instances, l_fn).call(this, r)) return r;
  let o = new At(), { signal: h } = s;
  h?.addEventListener("abort", () => o.abort(h.reason), { signal: o.signal });
  let a = { signal: o.signal, options: s, context: i }, l = (p, w = false) => {
    let { aborted: g } = o.signal, S = s.ignoreFetchAbort && p !== void 0, E = s.ignoreFetchAbort || !!(s.allowStaleOnFetchAbort && p !== void 0);
    if (s.status && (g && !w ? (s.status.fetchAborted = true, s.status.fetchError = o.signal.reason, S && (s.status.fetchAbortIgnored = true)) : s.status.fetchResolved = true), g && !S && !w) return c(o.signal.reason, E);
    let y = f, b = __privateGet(this, _i)[e];
    return (b === f || S && w && b === void 0) && (p === void 0 ? y.__staleWhileFetching !== void 0 ? __privateGet(this, _i)[e] = y.__staleWhileFetching : __privateMethod(this, _Me_instances, O_fn).call(this, t, "fetch") : (s.status && (s.status.fetchUpdated = true), this.set(t, p, a.options))), p;
  }, u = (p) => (s.status && (s.status.fetchRejected = true, s.status.fetchError = p), c(p, false)), c = (p, w) => {
    let { aborted: g } = o.signal, S = g && s.allowStaleOnFetchAbort, E = S || s.allowStaleOnFetchRejection, y = E || s.noDeleteOnFetchRejection, b = f;
    if (__privateGet(this, _i)[e] === f && (!y || !w && b.__staleWhileFetching === void 0 ? __privateMethod(this, _Me_instances, O_fn).call(this, t, "fetch") : S || (__privateGet(this, _i)[e] = b.__staleWhileFetching)), E) return s.status && b.__staleWhileFetching !== void 0 && (s.status.returnedStale = true), b.__staleWhileFetching;
    if (b.__returned === b) throw p;
  }, d = (p, w) => {
    var _a12;
    let g = (_a12 = __privateGet(this, _S2)) == null ? void 0 : _a12.call(this, t, r, a);
    g && g instanceof Promise && g.then((S) => p(S === void 0 ? void 0 : S), w), o.signal.addEventListener("abort", () => {
      (!s.ignoreFetchAbort || s.allowStaleOnFetchAbort) && (p(void 0), s.allowStaleOnFetchAbort && (p = (S) => l(S, true)));
    });
  };
  s.status && (s.status.fetchDispatched = true);
  let f = new Promise(d).then(l, u), m = Object.assign(f, { __abortController: o, __staleWhileFetching: r, __returned: void 0 });
  return e === void 0 ? (this.set(t, m, { ...a.options, status: void 0 }), e = __privateGet(this, _f2).get(t)) : __privateGet(this, _i)[e] = m, m;
}, l_fn = function(t) {
  if (!__privateGet(this, _A)) return false;
  let e = t;
  return !!e && e instanceof Promise && e.hasOwnProperty("__staleWhileFetching") && e.__abortController instanceof At;
}, $_fn = function(t, e) {
  __privateGet(this, _E)[e] = t, __privateGet(this, _d)[t] = e;
}, W_fn = function(t) {
  t !== __privateGet(this, _p) && (t === __privateGet(this, _b2) ? __privateSet(this, _b2, __privateGet(this, _d)[t]) : __privateMethod(this, _Me_instances, $_fn).call(this, __privateGet(this, _E)[t], __privateGet(this, _d)[t]), __privateMethod(this, _Me_instances, $_fn).call(this, __privateGet(this, _p), t), __privateSet(this, _p, t));
}, O_fn = function(t, e) {
  var _a12, _b5;
  let s = false;
  if (__privateGet(this, _h2) !== 0) {
    let i = __privateGet(this, _f2).get(t);
    if (i !== void 0) if (__privateGet(this, _y)?.[i] && (clearTimeout(__privateGet(this, _y)?.[i]), __privateGet(this, _y)[i] = void 0), s = true, __privateGet(this, _h2) === 1) __privateMethod(this, _Me_instances, H_fn).call(this, e);
    else {
      __privateGet(this, _P).call(this, i);
      let r = __privateGet(this, _i)[i];
      if (__privateMethod(this, _Me_instances, l_fn).call(this, r) ? r.__abortController.abort(new Error("deleted")) : (__privateGet(this, _x) || __privateGet(this, _e)) && (__privateGet(this, _x) && ((_a12 = __privateGet(this, _n2)) == null ? void 0 : _a12.call(this, r, t, e)), __privateGet(this, _e) && __privateGet(this, _m)?.push([r, t, e])), __privateGet(this, _f2).delete(t), __privateGet(this, _a4)[i] = void 0, __privateGet(this, _i)[i] = void 0, i === __privateGet(this, _p)) __privateSet(this, _p, __privateGet(this, _E)[i]);
      else if (i === __privateGet(this, _b2)) __privateSet(this, _b2, __privateGet(this, _d)[i]);
      else {
        let o = __privateGet(this, _E)[i];
        __privateGet(this, _d)[o] = __privateGet(this, _d)[i];
        let h = __privateGet(this, _d)[i];
        __privateGet(this, _E)[h] = __privateGet(this, _E)[i];
      }
      __privateWrapper(this, _h2)._--, __privateGet(this, _R).push(i);
    }
  }
  if (__privateGet(this, _e) && __privateGet(this, _m)?.length) {
    let i = __privateGet(this, _m), r;
    for (; r = i?.shift(); ) (_b5 = __privateGet(this, _o2)) == null ? void 0 : _b5.call(this, ...r);
  }
  return s;
}, H_fn = function(t) {
  var _a12, _b5;
  for (let e of __privateMethod(this, _Me_instances, D_fn).call(this, { allowStale: true })) {
    let s = __privateGet(this, _i)[e];
    if (__privateMethod(this, _Me_instances, l_fn).call(this, s)) s.__abortController.abort(new Error("deleted"));
    else {
      let i = __privateGet(this, _a4)[e];
      __privateGet(this, _x) && ((_a12 = __privateGet(this, _n2)) == null ? void 0 : _a12.call(this, s, i, t)), __privateGet(this, _e) && __privateGet(this, _m)?.push([s, i, t]);
    }
  }
  if (__privateGet(this, _f2).clear(), __privateGet(this, _i).fill(void 0), __privateGet(this, _a4).fill(void 0), __privateGet(this, _g) && __privateGet(this, _T)) {
    __privateGet(this, _g).fill(0), __privateGet(this, _T).fill(0);
    for (let e of __privateGet(this, _y) ?? []) e !== void 0 && clearTimeout(e);
    __privateGet(this, _y)?.fill(void 0);
  }
  if (__privateGet(this, _C) && __privateGet(this, _C).fill(0), __privateSet(this, _b2, 0), __privateSet(this, _p, 0), __privateGet(this, _R).length = 0, __privateSet(this, _u2, 0), __privateSet(this, _h2, 0), __privateGet(this, _e) && __privateGet(this, _m)) {
    let e = __privateGet(this, _m), s;
    for (; s = e?.shift(); ) (_b5 = __privateGet(this, _o2)) == null ? void 0 : _b5.call(this, ...s);
  }
}, _c2);
var Ne = typeof process == "object" && process ? process : { stdout: null, stderr: null };
var oi = (n5) => !!n5 && typeof n5 == "object" && (n5 instanceof V || n5 instanceof import_node_stream.default || hi(n5) || ai(n5));
var hi = (n5) => !!n5 && typeof n5 == "object" && n5 instanceof import_node_events.EventEmitter && typeof n5.pipe == "function" && n5.pipe !== import_node_stream.default.Writable.prototype.pipe;
var ai = (n5) => !!n5 && typeof n5 == "object" && n5 instanceof import_node_events.EventEmitter && typeof n5.write == "function" && typeof n5.end == "function";
var G = /* @__PURE__ */ Symbol("EOF");
var H = /* @__PURE__ */ Symbol("maybeEmitEnd");
var K = /* @__PURE__ */ Symbol("emittedEnd");
var kt = /* @__PURE__ */ Symbol("emittingEnd");
var ut = /* @__PURE__ */ Symbol("emittedError");
var Rt = /* @__PURE__ */ Symbol("closed");
var _e2 = /* @__PURE__ */ Symbol("read");
var Ot = /* @__PURE__ */ Symbol("flush");
var Le = /* @__PURE__ */ Symbol("flushChunk");
var P = /* @__PURE__ */ Symbol("encoding");
var et = /* @__PURE__ */ Symbol("decoder");
var v = /* @__PURE__ */ Symbol("flowing");
var dt = /* @__PURE__ */ Symbol("paused");
var st = /* @__PURE__ */ Symbol("resume");
var C = /* @__PURE__ */ Symbol("buffer");
var F = /* @__PURE__ */ Symbol("pipes");
var T = /* @__PURE__ */ Symbol("bufferLength");
var Yt = /* @__PURE__ */ Symbol("bufferPush");
var Ft = /* @__PURE__ */ Symbol("bufferShift");
var k = /* @__PURE__ */ Symbol("objectMode");
var x = /* @__PURE__ */ Symbol("destroyed");
var Xt = /* @__PURE__ */ Symbol("error");
var Jt = /* @__PURE__ */ Symbol("emitData");
var We = /* @__PURE__ */ Symbol("emitEnd");
var Zt = /* @__PURE__ */ Symbol("emitEnd2");
var B = /* @__PURE__ */ Symbol("async");
var Qt = /* @__PURE__ */ Symbol("abort");
var Dt = /* @__PURE__ */ Symbol("aborted");
var pt = /* @__PURE__ */ Symbol("signal");
var Y = /* @__PURE__ */ Symbol("dataListeners");
var M = /* @__PURE__ */ Symbol("discarded");
var mt = (n5) => Promise.resolve().then(n5);
var li = (n5) => n5();
var ci = (n5) => n5 === "end" || n5 === "finish" || n5 === "prefinish";
var fi = (n5) => n5 instanceof ArrayBuffer || !!n5 && typeof n5 == "object" && n5.constructor && n5.constructor.name === "ArrayBuffer" && n5.byteLength >= 0;
var ui = (n5) => !Buffer.isBuffer(n5) && ArrayBuffer.isView(n5);
var Mt = class {
  constructor(t, e, s) {
    __publicField(this, "src");
    __publicField(this, "dest");
    __publicField(this, "opts");
    __publicField(this, "ondrain");
    this.src = t, this.dest = e, this.opts = s, this.ondrain = () => t[st](), this.dest.on("drain", this.ondrain);
  }
  unpipe() {
    this.dest.removeListener("drain", this.ondrain);
  }
  proxyErrors(t) {
  }
  end() {
    this.unpipe(), this.opts.end && this.dest.end();
  }
};
var te = class extends Mt {
  unpipe() {
    this.src.removeListener("error", this.proxyErrors), super.unpipe();
  }
  constructor(t, e, s) {
    super(t, e, s), this.proxyErrors = (i) => this.dest.emit("error", i), t.on("error", this.proxyErrors);
  }
};
var di = (n5) => !!n5.objectMode;
var pi = (n5) => !n5.objectMode && !!n5.encoding && n5.encoding !== "buffer";
var _a5, _b3, _c4, _d2, _e3, _f3, _g2, _h3, _i2, _j2, _k2, _l, _m2, _n3, _o3, _p2, _q, _r3, _s4;
var V = class extends import_node_events.EventEmitter {
  constructor(...t) {
    let e = t[0] || {};
    super();
    __publicField(this, _s4, false);
    __publicField(this, _r3, false);
    __publicField(this, _q, []);
    __publicField(this, _p2, []);
    __publicField(this, _o3);
    __publicField(this, _n3);
    __publicField(this, _m2);
    __publicField(this, _l);
    __publicField(this, _k2, false);
    __publicField(this, _j2, false);
    __publicField(this, _i2, false);
    __publicField(this, _h3, false);
    __publicField(this, _g2, null);
    __publicField(this, _f3, 0);
    __publicField(this, _e3, false);
    __publicField(this, _d2);
    __publicField(this, _c4, false);
    __publicField(this, _b3, 0);
    __publicField(this, _a5, false);
    __publicField(this, "writable", true);
    __publicField(this, "readable", true);
    if (e.objectMode && typeof e.encoding == "string") throw new TypeError("Encoding and objectMode may not be used together");
    di(e) ? (this[k] = true, this[P] = null) : pi(e) ? (this[P] = e.encoding, this[k] = false) : (this[k] = false, this[P] = null), this[B] = !!e.async, this[et] = this[P] ? new import_node_string_decoder.StringDecoder(this[P]) : null, e && e.debugExposeBuffer === true && Object.defineProperty(this, "buffer", { get: () => this[C] }), e && e.debugExposePipes === true && Object.defineProperty(this, "pipes", { get: () => this[F] });
    let { signal: s } = e;
    s && (this[pt] = s, s.aborted ? this[Qt]() : s.addEventListener("abort", () => this[Qt]()));
  }
  get bufferLength() {
    return this[T];
  }
  get encoding() {
    return this[P];
  }
  set encoding(t) {
    throw new Error("Encoding must be set at instantiation time");
  }
  setEncoding(t) {
    throw new Error("Encoding must be set at instantiation time");
  }
  get objectMode() {
    return this[k];
  }
  set objectMode(t) {
    throw new Error("objectMode must be set at instantiation time");
  }
  get async() {
    return this[B];
  }
  set async(t) {
    this[B] = this[B] || !!t;
  }
  [(_s4 = v, _r3 = dt, _q = F, _p2 = C, _o3 = k, _n3 = P, _m2 = B, _l = et, _k2 = G, _j2 = K, _i2 = kt, _h3 = Rt, _g2 = ut, _f3 = T, _e3 = x, _d2 = pt, _c4 = Dt, _b3 = Y, _a5 = M, Qt)]() {
    this[Dt] = true, this.emit("abort", this[pt]?.reason), this.destroy(this[pt]?.reason);
  }
  get aborted() {
    return this[Dt];
  }
  set aborted(t) {
  }
  write(t, e, s) {
    if (this[Dt]) return false;
    if (this[G]) throw new Error("write after end");
    if (this[x]) return this.emit("error", Object.assign(new Error("Cannot call write after a stream was destroyed"), { code: "ERR_STREAM_DESTROYED" })), true;
    typeof e == "function" && (s = e, e = "utf8"), e || (e = "utf8");
    let i = this[B] ? mt : li;
    if (!this[k] && !Buffer.isBuffer(t)) {
      if (ui(t)) t = Buffer.from(t.buffer, t.byteOffset, t.byteLength);
      else if (fi(t)) t = Buffer.from(t);
      else if (typeof t != "string") throw new Error("Non-contiguous data written to non-objectMode stream");
    }
    return this[k] ? (this[v] && this[T] !== 0 && this[Ot](true), this[v] ? this.emit("data", t) : this[Yt](t), this[T] !== 0 && this.emit("readable"), s && i(s), this[v]) : t.length ? (typeof t == "string" && !(e === this[P] && !this[et]?.lastNeed) && (t = Buffer.from(t, e)), Buffer.isBuffer(t) && this[P] && (t = this[et].write(t)), this[v] && this[T] !== 0 && this[Ot](true), this[v] ? this.emit("data", t) : this[Yt](t), this[T] !== 0 && this.emit("readable"), s && i(s), this[v]) : (this[T] !== 0 && this.emit("readable"), s && i(s), this[v]);
  }
  read(t) {
    if (this[x]) return null;
    if (this[M] = false, this[T] === 0 || t === 0 || t && t > this[T]) return this[H](), null;
    this[k] && (t = null), this[C].length > 1 && !this[k] && (this[C] = [this[P] ? this[C].join("") : Buffer.concat(this[C], this[T])]);
    let e = this[_e2](t || null, this[C][0]);
    return this[H](), e;
  }
  [_e2](t, e) {
    if (this[k]) this[Ft]();
    else {
      let s = e;
      t === s.length || t === null ? this[Ft]() : typeof s == "string" ? (this[C][0] = s.slice(t), e = s.slice(0, t), this[T] -= t) : (this[C][0] = s.subarray(t), e = s.subarray(0, t), this[T] -= t);
    }
    return this.emit("data", e), !this[C].length && !this[G] && this.emit("drain"), e;
  }
  end(t, e, s) {
    return typeof t == "function" && (s = t, t = void 0), typeof e == "function" && (s = e, e = "utf8"), t !== void 0 && this.write(t, e), s && this.once("end", s), this[G] = true, this.writable = false, (this[v] || !this[dt]) && this[H](), this;
  }
  [st]() {
    this[x] || (!this[Y] && !this[F].length && (this[M] = true), this[dt] = false, this[v] = true, this.emit("resume"), this[C].length ? this[Ot]() : this[G] ? this[H]() : this.emit("drain"));
  }
  resume() {
    return this[st]();
  }
  pause() {
    this[v] = false, this[dt] = true, this[M] = false;
  }
  get destroyed() {
    return this[x];
  }
  get flowing() {
    return this[v];
  }
  get paused() {
    return this[dt];
  }
  [Yt](t) {
    this[k] ? this[T] += 1 : this[T] += t.length, this[C].push(t);
  }
  [Ft]() {
    return this[k] ? this[T] -= 1 : this[T] -= this[C][0].length, this[C].shift();
  }
  [Ot](t = false) {
    do
      ;
    while (this[Le](this[Ft]()) && this[C].length);
    !t && !this[C].length && !this[G] && this.emit("drain");
  }
  [Le](t) {
    return this.emit("data", t), this[v];
  }
  pipe(t, e) {
    if (this[x]) return t;
    this[M] = false;
    let s = this[K];
    return e = e || {}, t === Ne.stdout || t === Ne.stderr ? e.end = false : e.end = e.end !== false, e.proxyErrors = !!e.proxyErrors, s ? e.end && t.end() : (this[F].push(e.proxyErrors ? new te(this, t, e) : new Mt(this, t, e)), this[B] ? mt(() => this[st]()) : this[st]()), t;
  }
  unpipe(t) {
    let e = this[F].find((s) => s.dest === t);
    e && (this[F].length === 1 ? (this[v] && this[Y] === 0 && (this[v] = false), this[F] = []) : this[F].splice(this[F].indexOf(e), 1), e.unpipe());
  }
  addListener(t, e) {
    return this.on(t, e);
  }
  on(t, e) {
    let s = super.on(t, e);
    if (t === "data") this[M] = false, this[Y]++, !this[F].length && !this[v] && this[st]();
    else if (t === "readable" && this[T] !== 0) super.emit("readable");
    else if (ci(t) && this[K]) super.emit(t), this.removeAllListeners(t);
    else if (t === "error" && this[ut]) {
      let i = e;
      this[B] ? mt(() => i.call(this, this[ut])) : i.call(this, this[ut]);
    }
    return s;
  }
  removeListener(t, e) {
    return this.off(t, e);
  }
  off(t, e) {
    let s = super.off(t, e);
    return t === "data" && (this[Y] = this.listeners("data").length, this[Y] === 0 && !this[M] && !this[F].length && (this[v] = false)), s;
  }
  removeAllListeners(t) {
    let e = super.removeAllListeners(t);
    return (t === "data" || t === void 0) && (this[Y] = 0, !this[M] && !this[F].length && (this[v] = false)), e;
  }
  get emittedEnd() {
    return this[K];
  }
  [H]() {
    !this[kt] && !this[K] && !this[x] && this[C].length === 0 && this[G] && (this[kt] = true, this.emit("end"), this.emit("prefinish"), this.emit("finish"), this[Rt] && this.emit("close"), this[kt] = false);
  }
  emit(t, ...e) {
    let s = e[0];
    if (t !== "error" && t !== "close" && t !== x && this[x]) return false;
    if (t === "data") return !this[k] && !s ? false : this[B] ? (mt(() => this[Jt](s)), true) : this[Jt](s);
    if (t === "end") return this[We]();
    if (t === "close") {
      if (this[Rt] = true, !this[K] && !this[x]) return false;
      let r = super.emit("close");
      return this.removeAllListeners("close"), r;
    } else if (t === "error") {
      this[ut] = s, super.emit(Xt, s);
      let r = !this[pt] || this.listeners("error").length ? super.emit("error", s) : false;
      return this[H](), r;
    } else if (t === "resume") {
      let r = super.emit("resume");
      return this[H](), r;
    } else if (t === "finish" || t === "prefinish") {
      let r = super.emit(t);
      return this.removeAllListeners(t), r;
    }
    let i = super.emit(t, ...e);
    return this[H](), i;
  }
  [Jt](t) {
    for (let s of this[F]) s.dest.write(t) === false && this.pause();
    let e = this[M] ? false : super.emit("data", t);
    return this[H](), e;
  }
  [We]() {
    return this[K] ? false : (this[K] = true, this.readable = false, this[B] ? (mt(() => this[Zt]()), true) : this[Zt]());
  }
  [Zt]() {
    if (this[et]) {
      let e = this[et].end();
      if (e) {
        for (let s of this[F]) s.dest.write(e);
        this[M] || super.emit("data", e);
      }
    }
    for (let e of this[F]) e.end();
    let t = super.emit("end");
    return this.removeAllListeners("end"), t;
  }
  async collect() {
    let t = Object.assign([], { dataLength: 0 });
    this[k] || (t.dataLength = 0);
    let e = this.promise();
    return this.on("data", (s) => {
      t.push(s), this[k] || (t.dataLength += s.length);
    }), await e, t;
  }
  async concat() {
    if (this[k]) throw new Error("cannot concat in objectMode");
    let t = await this.collect();
    return this[P] ? t.join("") : Buffer.concat(t, t.dataLength);
  }
  async promise() {
    return new Promise((t, e) => {
      this.on(x, () => e(new Error("stream destroyed"))), this.on("error", (s) => e(s)), this.on("end", () => t());
    });
  }
  [Symbol.asyncIterator]() {
    this[M] = false;
    let t = false, e = async () => (this.pause(), t = true, { value: void 0, done: true });
    return { next: () => {
      if (t) return e();
      let i = this.read();
      if (i !== null) return Promise.resolve({ done: false, value: i });
      if (this[G]) return e();
      let r, o, h = (c) => {
        this.off("data", a), this.off("end", l), this.off(x, u), e(), o(c);
      }, a = (c) => {
        this.off("error", h), this.off("end", l), this.off(x, u), this.pause(), r({ value: c, done: !!this[G] });
      }, l = () => {
        this.off("error", h), this.off("data", a), this.off(x, u), e(), r({ done: true, value: void 0 });
      }, u = () => h(new Error("stream destroyed"));
      return new Promise((c, d) => {
        o = d, r = c, this.once(x, u), this.once("error", h), this.once("end", l), this.once("data", a);
      });
    }, throw: e, return: e, [Symbol.asyncIterator]() {
      return this;
    }, [Symbol.asyncDispose]: async () => {
    } };
  }
  [Symbol.iterator]() {
    this[M] = false;
    let t = false, e = () => (this.pause(), this.off(Xt, e), this.off(x, e), this.off("end", e), t = true, { done: true, value: void 0 }), s = () => {
      if (t) return e();
      let i = this.read();
      return i === null ? e() : { done: false, value: i };
    };
    return this.once("end", e), this.once(Xt, e), this.once(x, e), { next: s, throw: e, return: e, [Symbol.iterator]() {
      return this;
    }, [Symbol.dispose]: () => {
    } };
  }
  destroy(t) {
    if (this[x]) return t ? this.emit("error", t) : this.emit(x), this;
    this[x] = true, this[M] = true, this[C].length = 0, this[T] = 0;
    let e = this;
    return typeof e.close == "function" && !this[Rt] && e.close(), t ? this.emit("error", t) : this.emit(x), this;
  }
  static get isStream() {
    return oi;
  }
};
var vi = import_fs.realpathSync.native;
var wt = { lstatSync: import_fs.lstatSync, readdir: import_fs.readdir, readdirSync: import_fs.readdirSync, readlinkSync: import_fs.readlinkSync, realpathSync: vi, promises: { lstat: import_promises.lstat, readdir: import_promises.readdir, readlink: import_promises.readlink, realpath: import_promises.realpath } };
var Ue = (n5) => !n5 || n5 === wt || n5 === xi ? wt : { ...wt, ...n5, promises: { ...wt.promises, ...n5.promises || {} } };
var $e = /^\\\\\?\\([a-z]:)\\?$/i;
var Ri = (n5) => n5.replace(/\//g, "\\").replace($e, "$1\\");
var Oi = /[\\\/]/;
var L = 0;
var Ge = 1;
var He = 2;
var U = 4;
var qe = 6;
var Ke = 8;
var X = 10;
var Ve = 12;
var _ = 15;
var gt = ~_;
var se = 16;
var je = 32;
var yt = 64;
var j = 128;
var Nt = 256;
var Lt = 512;
var Ie = yt | j | Lt;
var Fi = 1023;
var ie = (n5) => n5.isFile() ? Ke : n5.isDirectory() ? U : n5.isSymbolicLink() ? X : n5.isCharacterDevice() ? He : n5.isBlockDevice() ? qe : n5.isSocket() ? Ve : n5.isFIFO() ? Ge : L;
var ze = new ft({ max: 2 ** 12 });
var bt = (n5) => {
  let t = ze.get(n5);
  if (t) return t;
  let e = n5.normalize("NFKD");
  return ze.set(n5, e), e;
};
var Be = new ft({ max: 2 ** 12 });
var _t4 = (n5) => {
  let t = Be.get(n5);
  if (t) return t;
  let e = bt(n5.toLowerCase());
  return Be.set(n5, e), e;
};
var Wt = class extends ft {
  constructor() {
    super({ max: 256 });
  }
};
var ne = class extends ft {
  constructor(t = 16 * 1024) {
    super({ maxSize: t, sizeCalculation: (e) => e.length + 1 });
  }
};
var Ye = /* @__PURE__ */ Symbol("PathScurry setAsCwd");
var _t5, _s5, _n4, _r4, _o4, _S3, _w3, _c5, _h4, _u3, _f4, _a6, _i3, _d3, _E2, _b4, _p3, _R2, _m3, _C2, _T2, _g3, _y2, _x2, _A2, _e4, __2, _M, _k3, _R_instances, N_fn, j_fn, v_fn, G_fn2, P_fn, L_fn, I_fn, F_fn2, D_fn2, z_fn2, B_fn2, U_fn2, l_fn2, $_fn2, _W, _O, H_fn2, _q2, _a7;
var R = (_a7 = class {
  constructor(t, e = L, s, i, r, o, h) {
    __privateAdd(this, _R_instances);
    __publicField(this, "name");
    __publicField(this, "root");
    __publicField(this, "roots");
    __publicField(this, "parent");
    __publicField(this, "nocase");
    __publicField(this, "isCWD", false);
    __privateAdd(this, _t5);
    __privateAdd(this, _s5);
    __privateAdd(this, _n4);
    __privateAdd(this, _r4);
    __privateAdd(this, _o4);
    __privateAdd(this, _S3);
    __privateAdd(this, _w3);
    __privateAdd(this, _c5);
    __privateAdd(this, _h4);
    __privateAdd(this, _u3);
    __privateAdd(this, _f4);
    __privateAdd(this, _a6);
    __privateAdd(this, _i3);
    __privateAdd(this, _d3);
    __privateAdd(this, _E2);
    __privateAdd(this, _b4);
    __privateAdd(this, _p3);
    __privateAdd(this, _R2);
    __privateAdd(this, _m3);
    __privateAdd(this, _C2);
    __privateAdd(this, _T2);
    __privateAdd(this, _g3);
    __privateAdd(this, _y2);
    __privateAdd(this, _x2);
    __privateAdd(this, _A2);
    __privateAdd(this, _e4);
    __privateAdd(this, __2);
    __privateAdd(this, _M);
    __privateAdd(this, _k3);
    __privateAdd(this, _W, []);
    __privateAdd(this, _O, false);
    __privateAdd(this, _q2);
    this.name = t, __privateSet(this, _C2, r ? _t4(t) : bt(t)), __privateSet(this, _e4, e & Fi), this.nocase = r, this.roots = i, this.root = s || this, __privateSet(this, __2, o), __privateSet(this, _g3, h.fullpath), __privateSet(this, _x2, h.relative), __privateSet(this, _A2, h.relativePosix), this.parent = h.parent, this.parent ? __privateSet(this, _t5, __privateGet(this.parent, _t5)) : __privateSet(this, _t5, Ue(h.fs));
  }
  get dev() {
    return __privateGet(this, _s5);
  }
  get mode() {
    return __privateGet(this, _n4);
  }
  get nlink() {
    return __privateGet(this, _r4);
  }
  get uid() {
    return __privateGet(this, _o4);
  }
  get gid() {
    return __privateGet(this, _S3);
  }
  get rdev() {
    return __privateGet(this, _w3);
  }
  get blksize() {
    return __privateGet(this, _c5);
  }
  get ino() {
    return __privateGet(this, _h4);
  }
  get size() {
    return __privateGet(this, _u3);
  }
  get blocks() {
    return __privateGet(this, _f4);
  }
  get atimeMs() {
    return __privateGet(this, _a6);
  }
  get mtimeMs() {
    return __privateGet(this, _i3);
  }
  get ctimeMs() {
    return __privateGet(this, _d3);
  }
  get birthtimeMs() {
    return __privateGet(this, _E2);
  }
  get atime() {
    return __privateGet(this, _b4);
  }
  get mtime() {
    return __privateGet(this, _p3);
  }
  get ctime() {
    return __privateGet(this, _R2);
  }
  get birthtime() {
    return __privateGet(this, _m3);
  }
  get parentPath() {
    return (this.parent || this).fullpath();
  }
  get path() {
    return this.parentPath;
  }
  depth() {
    return __privateGet(this, _T2) !== void 0 ? __privateGet(this, _T2) : this.parent ? __privateSet(this, _T2, this.parent.depth() + 1) : __privateSet(this, _T2, 0);
  }
  childrenCache() {
    return __privateGet(this, __2);
  }
  resolve(t) {
    var _a12;
    if (!t) return this;
    let e = this.getRootString(t), i = t.substring(e.length).split(this.splitSep);
    return e ? __privateMethod(_a12 = this.getRoot(e), _R_instances, N_fn).call(_a12, i) : __privateMethod(this, _R_instances, N_fn).call(this, i);
  }
  children() {
    let t = __privateGet(this, __2).get(this);
    if (t) return t;
    let e = Object.assign([], { provisional: 0 });
    return __privateGet(this, __2).set(this, e), __privateSet(this, _e4, __privateGet(this, _e4) & ~se), e;
  }
  child(t, e) {
    if (t === "" || t === ".") return this;
    if (t === "..") return this.parent || this;
    let s = this.children(), i = this.nocase ? _t4(t) : bt(t);
    for (let a of s) if (__privateGet(a, _C2) === i) return a;
    let r = this.parent ? this.sep : "", o = __privateGet(this, _g3) ? __privateGet(this, _g3) + r + t : void 0, h = this.newChild(t, L, { ...e, parent: this, fullpath: o });
    return this.canReaddir() || __privateSet(h, _e4, __privateGet(h, _e4) | j), s.push(h), h;
  }
  relative() {
    if (this.isCWD) return "";
    if (__privateGet(this, _x2) !== void 0) return __privateGet(this, _x2);
    let t = this.name, e = this.parent;
    if (!e) return __privateSet(this, _x2, this.name);
    let s = e.relative();
    return s + (!s || !e.parent ? "" : this.sep) + t;
  }
  relativePosix() {
    if (this.sep === "/") return this.relative();
    if (this.isCWD) return "";
    if (__privateGet(this, _A2) !== void 0) return __privateGet(this, _A2);
    let t = this.name, e = this.parent;
    if (!e) return __privateSet(this, _A2, this.fullpathPosix());
    let s = e.relativePosix();
    return s + (!s || !e.parent ? "" : "/") + t;
  }
  fullpath() {
    if (__privateGet(this, _g3) !== void 0) return __privateGet(this, _g3);
    let t = this.name, e = this.parent;
    if (!e) return __privateSet(this, _g3, this.name);
    let i = e.fullpath() + (e.parent ? this.sep : "") + t;
    return __privateSet(this, _g3, i);
  }
  fullpathPosix() {
    if (__privateGet(this, _y2) !== void 0) return __privateGet(this, _y2);
    if (this.sep === "/") return __privateSet(this, _y2, this.fullpath());
    if (!this.parent) {
      let i = this.fullpath().replace(/\\/g, "/");
      return /^[a-z]:\//i.test(i) ? __privateSet(this, _y2, `//?/${i}`) : __privateSet(this, _y2, i);
    }
    let t = this.parent, e = t.fullpathPosix(), s = e + (!e || !t.parent ? "" : "/") + this.name;
    return __privateSet(this, _y2, s);
  }
  isUnknown() {
    return (__privateGet(this, _e4) & _) === L;
  }
  isType(t) {
    return this[`is${t}`]();
  }
  getType() {
    return this.isUnknown() ? "Unknown" : this.isDirectory() ? "Directory" : this.isFile() ? "File" : this.isSymbolicLink() ? "SymbolicLink" : this.isFIFO() ? "FIFO" : this.isCharacterDevice() ? "CharacterDevice" : this.isBlockDevice() ? "BlockDevice" : this.isSocket() ? "Socket" : "Unknown";
  }
  isFile() {
    return (__privateGet(this, _e4) & _) === Ke;
  }
  isDirectory() {
    return (__privateGet(this, _e4) & _) === U;
  }
  isCharacterDevice() {
    return (__privateGet(this, _e4) & _) === He;
  }
  isBlockDevice() {
    return (__privateGet(this, _e4) & _) === qe;
  }
  isFIFO() {
    return (__privateGet(this, _e4) & _) === Ge;
  }
  isSocket() {
    return (__privateGet(this, _e4) & _) === Ve;
  }
  isSymbolicLink() {
    return (__privateGet(this, _e4) & X) === X;
  }
  lstatCached() {
    return __privateGet(this, _e4) & je ? this : void 0;
  }
  readlinkCached() {
    return __privateGet(this, _M);
  }
  realpathCached() {
    return __privateGet(this, _k3);
  }
  readdirCached() {
    let t = this.children();
    return t.slice(0, t.provisional);
  }
  canReadlink() {
    if (__privateGet(this, _M)) return true;
    if (!this.parent) return false;
    let t = __privateGet(this, _e4) & _;
    return !(t !== L && t !== X || __privateGet(this, _e4) & Nt || __privateGet(this, _e4) & j);
  }
  calledReaddir() {
    return !!(__privateGet(this, _e4) & se);
  }
  isENOENT() {
    return !!(__privateGet(this, _e4) & j);
  }
  isNamed(t) {
    return this.nocase ? __privateGet(this, _C2) === _t4(t) : __privateGet(this, _C2) === bt(t);
  }
  async readlink() {
    let t = __privateGet(this, _M);
    if (t) return t;
    if (this.canReadlink() && this.parent) try {
      let e = await __privateGet(this, _t5).promises.readlink(this.fullpath()), s = (await this.parent.realpath())?.resolve(e);
      if (s) return __privateSet(this, _M, s);
    } catch (e) {
      __privateMethod(this, _R_instances, D_fn2).call(this, e.code);
      return;
    }
  }
  readlinkSync() {
    let t = __privateGet(this, _M);
    if (t) return t;
    if (this.canReadlink() && this.parent) try {
      let e = __privateGet(this, _t5).readlinkSync(this.fullpath()), s = this.parent.realpathSync()?.resolve(e);
      if (s) return __privateSet(this, _M, s);
    } catch (e) {
      __privateMethod(this, _R_instances, D_fn2).call(this, e.code);
      return;
    }
  }
  async lstat() {
    if ((__privateGet(this, _e4) & j) === 0) try {
      return __privateMethod(this, _R_instances, $_fn2).call(this, await __privateGet(this, _t5).promises.lstat(this.fullpath())), this;
    } catch (t) {
      __privateMethod(this, _R_instances, F_fn2).call(this, t.code);
    }
  }
  lstatSync() {
    if ((__privateGet(this, _e4) & j) === 0) try {
      return __privateMethod(this, _R_instances, $_fn2).call(this, __privateGet(this, _t5).lstatSync(this.fullpath())), this;
    } catch (t) {
      __privateMethod(this, _R_instances, F_fn2).call(this, t.code);
    }
  }
  readdirCB(t, e = false) {
    if (!this.canReaddir()) {
      e ? t(null, []) : queueMicrotask(() => t(null, []));
      return;
    }
    let s = this.children();
    if (this.calledReaddir()) {
      let r = s.slice(0, s.provisional);
      e ? t(null, r) : queueMicrotask(() => t(null, r));
      return;
    }
    if (__privateGet(this, _W).push(t), __privateGet(this, _O)) return;
    __privateSet(this, _O, true);
    let i = this.fullpath();
    __privateGet(this, _t5).readdir(i, { withFileTypes: true }, (r, o) => {
      if (r) __privateMethod(this, _R_instances, I_fn).call(this, r.code), s.provisional = 0;
      else {
        for (let h of o) __privateMethod(this, _R_instances, z_fn2).call(this, h, s);
        __privateMethod(this, _R_instances, j_fn).call(this, s);
      }
      __privateMethod(this, _R_instances, H_fn2).call(this, s.slice(0, s.provisional));
    });
  }
  async readdir() {
    if (!this.canReaddir()) return [];
    let t = this.children();
    if (this.calledReaddir()) return t.slice(0, t.provisional);
    let e = this.fullpath();
    if (__privateGet(this, _q2)) await __privateGet(this, _q2);
    else {
      let s = () => {
      };
      __privateSet(this, _q2, new Promise((i) => s = i));
      try {
        for (let i of await __privateGet(this, _t5).promises.readdir(e, { withFileTypes: true })) __privateMethod(this, _R_instances, z_fn2).call(this, i, t);
        __privateMethod(this, _R_instances, j_fn).call(this, t);
      } catch (i) {
        __privateMethod(this, _R_instances, I_fn).call(this, i.code), t.provisional = 0;
      }
      __privateSet(this, _q2, void 0), s();
    }
    return t.slice(0, t.provisional);
  }
  readdirSync() {
    if (!this.canReaddir()) return [];
    let t = this.children();
    if (this.calledReaddir()) return t.slice(0, t.provisional);
    let e = this.fullpath();
    try {
      for (let s of __privateGet(this, _t5).readdirSync(e, { withFileTypes: true })) __privateMethod(this, _R_instances, z_fn2).call(this, s, t);
      __privateMethod(this, _R_instances, j_fn).call(this, t);
    } catch (s) {
      __privateMethod(this, _R_instances, I_fn).call(this, s.code), t.provisional = 0;
    }
    return t.slice(0, t.provisional);
  }
  canReaddir() {
    if (__privateGet(this, _e4) & Ie) return false;
    let t = _ & __privateGet(this, _e4);
    return t === L || t === U || t === X;
  }
  shouldWalk(t, e) {
    return (__privateGet(this, _e4) & U) === U && !(__privateGet(this, _e4) & Ie) && !t.has(this) && (!e || e(this));
  }
  async realpath() {
    if (__privateGet(this, _k3)) return __privateGet(this, _k3);
    if (!((Lt | Nt | j) & __privateGet(this, _e4))) try {
      let t = await __privateGet(this, _t5).promises.realpath(this.fullpath());
      return __privateSet(this, _k3, this.resolve(t));
    } catch {
      __privateMethod(this, _R_instances, P_fn).call(this);
    }
  }
  realpathSync() {
    if (__privateGet(this, _k3)) return __privateGet(this, _k3);
    if (!((Lt | Nt | j) & __privateGet(this, _e4))) try {
      let t = __privateGet(this, _t5).realpathSync(this.fullpath());
      return __privateSet(this, _k3, this.resolve(t));
    } catch {
      __privateMethod(this, _R_instances, P_fn).call(this);
    }
  }
  [Ye](t) {
    if (t === this) return;
    t.isCWD = false, this.isCWD = true;
    let e = /* @__PURE__ */ new Set([]), s = [], i = this;
    for (; i && i.parent; ) e.add(i), __privateSet(i, _x2, s.join(this.sep)), __privateSet(i, _A2, s.join("/")), i = i.parent, s.push("..");
    for (i = t; i && i.parent && !e.has(i); ) __privateSet(i, _x2, void 0), __privateSet(i, _A2, void 0), i = i.parent;
  }
}, _t5 = new WeakMap(), _s5 = new WeakMap(), _n4 = new WeakMap(), _r4 = new WeakMap(), _o4 = new WeakMap(), _S3 = new WeakMap(), _w3 = new WeakMap(), _c5 = new WeakMap(), _h4 = new WeakMap(), _u3 = new WeakMap(), _f4 = new WeakMap(), _a6 = new WeakMap(), _i3 = new WeakMap(), _d3 = new WeakMap(), _E2 = new WeakMap(), _b4 = new WeakMap(), _p3 = new WeakMap(), _R2 = new WeakMap(), _m3 = new WeakMap(), _C2 = new WeakMap(), _T2 = new WeakMap(), _g3 = new WeakMap(), _y2 = new WeakMap(), _x2 = new WeakMap(), _A2 = new WeakMap(), _e4 = new WeakMap(), __2 = new WeakMap(), _M = new WeakMap(), _k3 = new WeakMap(), _R_instances = new WeakSet(), N_fn = function(t) {
  let e = this;
  for (let s of t) e = e.child(s);
  return e;
}, j_fn = function(t) {
  var _a12;
  __privateSet(this, _e4, __privateGet(this, _e4) | se);
  for (let e = t.provisional; e < t.length; e++) {
    let s = t[e];
    s && __privateMethod(_a12 = s, _R_instances, v_fn).call(_a12);
  }
}, v_fn = function() {
  __privateGet(this, _e4) & j || (__privateSet(this, _e4, (__privateGet(this, _e4) | j) & gt), __privateMethod(this, _R_instances, G_fn2).call(this));
}, G_fn2 = function() {
  var _a12;
  let t = this.children();
  t.provisional = 0;
  for (let e of t) __privateMethod(_a12 = e, _R_instances, v_fn).call(_a12);
}, P_fn = function() {
  __privateSet(this, _e4, __privateGet(this, _e4) | Lt), __privateMethod(this, _R_instances, L_fn).call(this);
}, L_fn = function() {
  if (__privateGet(this, _e4) & yt) return;
  let t = __privateGet(this, _e4);
  (t & _) === U && (t &= gt), __privateSet(this, _e4, t | yt), __privateMethod(this, _R_instances, G_fn2).call(this);
}, I_fn = function(t = "") {
  t === "ENOTDIR" || t === "EPERM" ? __privateMethod(this, _R_instances, L_fn).call(this) : t === "ENOENT" ? __privateMethod(this, _R_instances, v_fn).call(this) : this.children().provisional = 0;
}, F_fn2 = function(t = "") {
  var _a12;
  t === "ENOTDIR" ? __privateMethod(_a12 = this.parent, _R_instances, L_fn).call(_a12) : t === "ENOENT" && __privateMethod(this, _R_instances, v_fn).call(this);
}, D_fn2 = function(t = "") {
  var _a12;
  let e = __privateGet(this, _e4);
  e |= Nt, t === "ENOENT" && (e |= j), (t === "EINVAL" || t === "UNKNOWN") && (e &= gt), __privateSet(this, _e4, e), t === "ENOTDIR" && this.parent && __privateMethod(_a12 = this.parent, _R_instances, L_fn).call(_a12);
}, z_fn2 = function(t, e) {
  return __privateMethod(this, _R_instances, U_fn2).call(this, t, e) || __privateMethod(this, _R_instances, B_fn2).call(this, t, e);
}, B_fn2 = function(t, e) {
  let s = ie(t), i = this.newChild(t.name, s, { parent: this }), r = __privateGet(i, _e4) & _;
  return r !== U && r !== X && r !== L && __privateSet(i, _e4, __privateGet(i, _e4) | yt), e.unshift(i), e.provisional++, i;
}, U_fn2 = function(t, e) {
  for (let s = e.provisional; s < e.length; s++) {
    let i = e[s];
    if ((this.nocase ? _t4(t.name) : bt(t.name)) === __privateGet(i, _C2)) return __privateMethod(this, _R_instances, l_fn2).call(this, t, i, s, e);
  }
}, l_fn2 = function(t, e, s, i) {
  let r = e.name;
  return __privateSet(e, _e4, __privateGet(e, _e4) & gt | ie(t)), r !== t.name && (e.name = t.name), s !== i.provisional && (s === i.length - 1 ? i.pop() : i.splice(s, 1), i.unshift(e)), i.provisional++, e;
}, $_fn2 = function(t) {
  let { atime: e, atimeMs: s, birthtime: i, birthtimeMs: r, blksize: o, blocks: h, ctime: a, ctimeMs: l, dev: u, gid: c, ino: d, mode: f, mtime: m, mtimeMs: p, nlink: w, rdev: g, size: S, uid: E } = t;
  __privateSet(this, _b4, e), __privateSet(this, _a6, s), __privateSet(this, _m3, i), __privateSet(this, _E2, r), __privateSet(this, _c5, o), __privateSet(this, _f4, h), __privateSet(this, _R2, a), __privateSet(this, _d3, l), __privateSet(this, _s5, u), __privateSet(this, _S3, c), __privateSet(this, _h4, d), __privateSet(this, _n4, f), __privateSet(this, _p3, m), __privateSet(this, _i3, p), __privateSet(this, _r4, w), __privateSet(this, _w3, g), __privateSet(this, _u3, S), __privateSet(this, _o4, E);
  let y = ie(t);
  __privateSet(this, _e4, __privateGet(this, _e4) & gt | y | je), y !== L && y !== U && y !== X && __privateSet(this, _e4, __privateGet(this, _e4) | yt);
}, _W = new WeakMap(), _O = new WeakMap(), H_fn2 = function(t) {
  __privateSet(this, _O, false);
  let e = __privateGet(this, _W).slice();
  __privateGet(this, _W).length = 0, e.forEach((s) => s(null, t));
}, _q2 = new WeakMap(), _a7);
var Pt = class n extends R {
  constructor(t, e = L, s, i, r, o, h) {
    super(t, e, s, i, r, o, h);
    __publicField(this, "sep", "\\");
    __publicField(this, "splitSep", Oi);
  }
  newChild(t, e = L, s = {}) {
    return new n(t, e, this.root, this.roots, this.nocase, this.childrenCache(), s);
  }
  getRootString(t) {
    return import_node_path.win32.parse(t).root;
  }
  getRoot(t) {
    if (t = Ri(t.toUpperCase()), t === this.root.name) return this.root;
    for (let [e, s] of Object.entries(this.roots)) if (this.sameRoot(t, e)) return this.roots[t] = s;
    return this.roots[t] = new it(t, this).root;
  }
  sameRoot(t, e = this.root.name) {
    return t = t.toUpperCase().replace(/\//g, "\\").replace($e, "$1\\"), t === e;
  }
};
var jt = class n2 extends R {
  constructor(t, e = L, s, i, r, o, h) {
    super(t, e, s, i, r, o, h);
    __publicField(this, "splitSep", "/");
    __publicField(this, "sep", "/");
  }
  getRootString(t) {
    return t.startsWith("/") ? "/" : "";
  }
  getRoot(t) {
    return this.root;
  }
  newChild(t, e = L, s = {}) {
    return new n2(t, e, this.root, this.roots, this.nocase, this.childrenCache(), s);
  }
};
var _t6, _s6, _n5, _r5, _a8;
var It = (_a8 = class {
  constructor(t = process.cwd(), e, s, { nocase: i, childrenCacheSize: r = 16 * 1024, fs: o = wt } = {}) {
    __publicField(this, "root");
    __publicField(this, "rootPath");
    __publicField(this, "roots");
    __publicField(this, "cwd");
    __privateAdd(this, _t6);
    __privateAdd(this, _s6);
    __privateAdd(this, _n5);
    __publicField(this, "nocase");
    __privateAdd(this, _r5);
    __privateSet(this, _r5, Ue(o)), (t instanceof URL || t.startsWith("file://")) && (t = (0, import_node_url2.fileURLToPath)(t));
    let h = e.resolve(t);
    this.roots = /* @__PURE__ */ Object.create(null), this.rootPath = this.parseRootPath(h), __privateSet(this, _t6, new Wt()), __privateSet(this, _s6, new Wt()), __privateSet(this, _n5, new ne(r));
    let a = h.substring(this.rootPath.length).split(s);
    if (a.length === 1 && !a[0] && a.pop(), i === void 0) throw new TypeError("must provide nocase setting to PathScurryBase ctor");
    this.nocase = i, this.root = this.newRoot(__privateGet(this, _r5)), this.roots[this.rootPath] = this.root;
    let l = this.root, u = a.length - 1, c = e.sep, d = this.rootPath, f = false;
    for (let m of a) {
      let p = u--;
      l = l.child(m, { relative: new Array(p).fill("..").join(c), relativePosix: new Array(p).fill("..").join("/"), fullpath: d += (f ? "" : c) + m }), f = true;
    }
    this.cwd = l;
  }
  depth(t = this.cwd) {
    return typeof t == "string" && (t = this.cwd.resolve(t)), t.depth();
  }
  childrenCache() {
    return __privateGet(this, _n5);
  }
  resolve(...t) {
    let e = "";
    for (let r = t.length - 1; r >= 0; r--) {
      let o = t[r];
      if (!(!o || o === ".") && (e = e ? `${o}/${e}` : o, this.isAbsolute(o))) break;
    }
    let s = __privateGet(this, _t6).get(e);
    if (s !== void 0) return s;
    let i = this.cwd.resolve(e).fullpath();
    return __privateGet(this, _t6).set(e, i), i;
  }
  resolvePosix(...t) {
    let e = "";
    for (let r = t.length - 1; r >= 0; r--) {
      let o = t[r];
      if (!(!o || o === ".") && (e = e ? `${o}/${e}` : o, this.isAbsolute(o))) break;
    }
    let s = __privateGet(this, _s6).get(e);
    if (s !== void 0) return s;
    let i = this.cwd.resolve(e).fullpathPosix();
    return __privateGet(this, _s6).set(e, i), i;
  }
  relative(t = this.cwd) {
    return typeof t == "string" && (t = this.cwd.resolve(t)), t.relative();
  }
  relativePosix(t = this.cwd) {
    return typeof t == "string" && (t = this.cwd.resolve(t)), t.relativePosix();
  }
  basename(t = this.cwd) {
    return typeof t == "string" && (t = this.cwd.resolve(t)), t.name;
  }
  dirname(t = this.cwd) {
    return typeof t == "string" && (t = this.cwd.resolve(t)), (t.parent || t).fullpath();
  }
  async readdir(t = this.cwd, e = { withFileTypes: true }) {
    typeof t == "string" ? t = this.cwd.resolve(t) : t instanceof R || (e = t, t = this.cwd);
    let { withFileTypes: s } = e;
    if (t.canReaddir()) {
      let i = await t.readdir();
      return s ? i : i.map((r) => r.name);
    } else return [];
  }
  readdirSync(t = this.cwd, e = { withFileTypes: true }) {
    typeof t == "string" ? t = this.cwd.resolve(t) : t instanceof R || (e = t, t = this.cwd);
    let { withFileTypes: s = true } = e;
    return t.canReaddir() ? s ? t.readdirSync() : t.readdirSync().map((i) => i.name) : [];
  }
  async lstat(t = this.cwd) {
    return typeof t == "string" && (t = this.cwd.resolve(t)), t.lstat();
  }
  lstatSync(t = this.cwd) {
    return typeof t == "string" && (t = this.cwd.resolve(t)), t.lstatSync();
  }
  async readlink(t = this.cwd, { withFileTypes: e } = { withFileTypes: false }) {
    typeof t == "string" ? t = this.cwd.resolve(t) : t instanceof R || (e = t.withFileTypes, t = this.cwd);
    let s = await t.readlink();
    return e ? s : s?.fullpath();
  }
  readlinkSync(t = this.cwd, { withFileTypes: e } = { withFileTypes: false }) {
    typeof t == "string" ? t = this.cwd.resolve(t) : t instanceof R || (e = t.withFileTypes, t = this.cwd);
    let s = t.readlinkSync();
    return e ? s : s?.fullpath();
  }
  async realpath(t = this.cwd, { withFileTypes: e } = { withFileTypes: false }) {
    typeof t == "string" ? t = this.cwd.resolve(t) : t instanceof R || (e = t.withFileTypes, t = this.cwd);
    let s = await t.realpath();
    return e ? s : s?.fullpath();
  }
  realpathSync(t = this.cwd, { withFileTypes: e } = { withFileTypes: false }) {
    typeof t == "string" ? t = this.cwd.resolve(t) : t instanceof R || (e = t.withFileTypes, t = this.cwd);
    let s = t.realpathSync();
    return e ? s : s?.fullpath();
  }
  async walk(t = this.cwd, e = {}) {
    typeof t == "string" ? t = this.cwd.resolve(t) : t instanceof R || (e = t, t = this.cwd);
    let { withFileTypes: s = true, follow: i = false, filter: r, walkFilter: o } = e, h = [];
    (!r || r(t)) && h.push(s ? t : t.fullpath());
    let a = /* @__PURE__ */ new Set(), l = (c, d) => {
      a.add(c), c.readdirCB((f, m) => {
        if (f) return d(f);
        let p = m.length;
        if (!p) return d();
        let w = () => {
          --p === 0 && d();
        };
        for (let g of m) (!r || r(g)) && h.push(s ? g : g.fullpath()), i && g.isSymbolicLink() ? g.realpath().then((S) => S?.isUnknown() ? S.lstat() : S).then((S) => S?.shouldWalk(a, o) ? l(S, w) : w()) : g.shouldWalk(a, o) ? l(g, w) : w();
      }, true);
    }, u = t;
    return new Promise((c, d) => {
      l(u, (f) => {
        if (f) return d(f);
        c(h);
      });
    });
  }
  walkSync(t = this.cwd, e = {}) {
    typeof t == "string" ? t = this.cwd.resolve(t) : t instanceof R || (e = t, t = this.cwd);
    let { withFileTypes: s = true, follow: i = false, filter: r, walkFilter: o } = e, h = [];
    (!r || r(t)) && h.push(s ? t : t.fullpath());
    let a = /* @__PURE__ */ new Set([t]);
    for (let l of a) {
      let u = l.readdirSync();
      for (let c of u) {
        (!r || r(c)) && h.push(s ? c : c.fullpath());
        let d = c;
        if (c.isSymbolicLink()) {
          if (!(i && (d = c.realpathSync()))) continue;
          d.isUnknown() && d.lstatSync();
        }
        d.shouldWalk(a, o) && a.add(d);
      }
    }
    return h;
  }
  [Symbol.asyncIterator]() {
    return this.iterate();
  }
  iterate(t = this.cwd, e = {}) {
    return typeof t == "string" ? t = this.cwd.resolve(t) : t instanceof R || (e = t, t = this.cwd), this.stream(t, e)[Symbol.asyncIterator]();
  }
  [Symbol.iterator]() {
    return this.iterateSync();
  }
  *iterateSync(t = this.cwd, e = {}) {
    typeof t == "string" ? t = this.cwd.resolve(t) : t instanceof R || (e = t, t = this.cwd);
    let { withFileTypes: s = true, follow: i = false, filter: r, walkFilter: o } = e;
    (!r || r(t)) && (yield s ? t : t.fullpath());
    let h = /* @__PURE__ */ new Set([t]);
    for (let a of h) {
      let l = a.readdirSync();
      for (let u of l) {
        (!r || r(u)) && (yield s ? u : u.fullpath());
        let c = u;
        if (u.isSymbolicLink()) {
          if (!(i && (c = u.realpathSync()))) continue;
          c.isUnknown() && c.lstatSync();
        }
        c.shouldWalk(h, o) && h.add(c);
      }
    }
  }
  stream(t = this.cwd, e = {}) {
    typeof t == "string" ? t = this.cwd.resolve(t) : t instanceof R || (e = t, t = this.cwd);
    let { withFileTypes: s = true, follow: i = false, filter: r, walkFilter: o } = e, h = new V({ objectMode: true });
    (!r || r(t)) && h.write(s ? t : t.fullpath());
    let a = /* @__PURE__ */ new Set(), l = [t], u = 0, c = () => {
      let d = false;
      for (; !d; ) {
        let f = l.shift();
        if (!f) {
          u === 0 && h.end();
          return;
        }
        u++, a.add(f);
        let m = (w, g, S = false) => {
          if (w) return h.emit("error", w);
          if (i && !S) {
            let E = [];
            for (let y of g) y.isSymbolicLink() && E.push(y.realpath().then((b) => b?.isUnknown() ? b.lstat() : b));
            if (E.length) {
              Promise.all(E).then(() => m(null, g, true));
              return;
            }
          }
          for (let E of g) E && (!r || r(E)) && (h.write(s ? E : E.fullpath()) || (d = true));
          u--;
          for (let E of g) {
            let y = E.realpathCached() || E;
            y.shouldWalk(a, o) && l.push(y);
          }
          d && !h.flowing ? h.once("drain", c) : p || c();
        }, p = true;
        f.readdirCB(m, true), p = false;
      }
    };
    return c(), h;
  }
  streamSync(t = this.cwd, e = {}) {
    typeof t == "string" ? t = this.cwd.resolve(t) : t instanceof R || (e = t, t = this.cwd);
    let { withFileTypes: s = true, follow: i = false, filter: r, walkFilter: o } = e, h = new V({ objectMode: true }), a = /* @__PURE__ */ new Set();
    (!r || r(t)) && h.write(s ? t : t.fullpath());
    let l = [t], u = 0, c = () => {
      let d = false;
      for (; !d; ) {
        let f = l.shift();
        if (!f) {
          u === 0 && h.end();
          return;
        }
        u++, a.add(f);
        let m = f.readdirSync();
        for (let p of m) (!r || r(p)) && (h.write(s ? p : p.fullpath()) || (d = true));
        u--;
        for (let p of m) {
          let w = p;
          if (p.isSymbolicLink()) {
            if (!(i && (w = p.realpathSync()))) continue;
            w.isUnknown() && w.lstatSync();
          }
          w.shouldWalk(a, o) && l.push(w);
        }
      }
      d && !h.flowing && h.once("drain", c);
    };
    return c(), h;
  }
  chdir(t = this.cwd) {
    let e = this.cwd;
    this.cwd = typeof t == "string" ? this.cwd.resolve(t) : t, this.cwd[Ye](e);
  }
}, _t6 = new WeakMap(), _s6 = new WeakMap(), _n5 = new WeakMap(), _r5 = new WeakMap(), _a8);
var it = class extends It {
  constructor(t = process.cwd(), e = {}) {
    let { nocase: s = true } = e;
    super(t, import_node_path.win32, "\\", { ...e, nocase: s });
    __publicField(this, "sep", "\\");
    this.nocase = s;
    for (let i = this.cwd; i; i = i.parent) i.nocase = this.nocase;
  }
  parseRootPath(t) {
    return import_node_path.win32.parse(t).root.toUpperCase();
  }
  newRoot(t) {
    return new Pt(this.rootPath, U, void 0, this.roots, this.nocase, this.childrenCache(), { fs: t });
  }
  isAbsolute(t) {
    return t.startsWith("/") || t.startsWith("\\") || /^[a-z]:(\/|\\)/i.test(t);
  }
};
var rt = class extends It {
  constructor(t = process.cwd(), e = {}) {
    let { nocase: s = false } = e;
    super(t, import_node_path.posix, "/", { ...e, nocase: s });
    __publicField(this, "sep", "/");
    this.nocase = s;
  }
  parseRootPath(t) {
    return "/";
  }
  newRoot(t) {
    return new jt(this.rootPath, U, void 0, this.roots, this.nocase, this.childrenCache(), { fs: t });
  }
  isAbsolute(t) {
    return t.startsWith("/");
  }
};
var St = class extends rt {
  constructor(t = process.cwd(), e = {}) {
    let { nocase: s = true } = e;
    super(t, { ...e, nocase: s });
  }
};
var Cr = process.platform === "win32" ? Pt : jt;
var Xe = process.platform === "win32" ? it : process.platform === "darwin" ? St : rt;
var Di = (n5) => n5.length >= 1;
var Mi = (n5) => n5.length >= 1;
var Ni = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
var _t7, _s7, _n6, _r6, _o5, _S4, _w4, _c6, _h5, _u4, _a9;
var nt = (_a9 = class {
  constructor(t, e, s, i) {
    __privateAdd(this, _t7);
    __privateAdd(this, _s7);
    __privateAdd(this, _n6);
    __publicField(this, "length");
    __privateAdd(this, _r6);
    __privateAdd(this, _o5);
    __privateAdd(this, _S4);
    __privateAdd(this, _w4);
    __privateAdd(this, _c6);
    __privateAdd(this, _h5);
    __privateAdd(this, _u4, true);
    if (!Di(t)) throw new TypeError("empty pattern list");
    if (!Mi(e)) throw new TypeError("empty glob list");
    if (e.length !== t.length) throw new TypeError("mismatched pattern list and glob list lengths");
    if (this.length = t.length, s < 0 || s >= this.length) throw new TypeError("index out of range");
    if (__privateSet(this, _t7, t), __privateSet(this, _s7, e), __privateSet(this, _n6, s), __privateSet(this, _r6, i), __privateGet(this, _n6) === 0) {
      if (this.isUNC()) {
        let [r, o, h, a, ...l] = __privateGet(this, _t7), [u, c, d, f, ...m] = __privateGet(this, _s7);
        l[0] === "" && (l.shift(), m.shift());
        let p = [r, o, h, a, ""].join("/"), w = [u, c, d, f, ""].join("/");
        __privateSet(this, _t7, [p, ...l]), __privateSet(this, _s7, [w, ...m]), this.length = __privateGet(this, _t7).length;
      } else if (this.isDrive() || this.isAbsolute()) {
        let [r, ...o] = __privateGet(this, _t7), [h, ...a] = __privateGet(this, _s7);
        o[0] === "" && (o.shift(), a.shift());
        let l = r + "/", u = h + "/";
        __privateSet(this, _t7, [l, ...o]), __privateSet(this, _s7, [u, ...a]), this.length = __privateGet(this, _t7).length;
      }
    }
  }
  [Ni]() {
    return "Pattern <" + __privateGet(this, _s7).slice(__privateGet(this, _n6)).join("/") + ">";
  }
  pattern() {
    return __privateGet(this, _t7)[__privateGet(this, _n6)];
  }
  isString() {
    return typeof __privateGet(this, _t7)[__privateGet(this, _n6)] == "string";
  }
  isGlobstar() {
    return __privateGet(this, _t7)[__privateGet(this, _n6)] === A;
  }
  isRegExp() {
    return __privateGet(this, _t7)[__privateGet(this, _n6)] instanceof RegExp;
  }
  globString() {
    return __privateSet(this, _S4, __privateGet(this, _S4) || (__privateGet(this, _n6) === 0 ? this.isAbsolute() ? __privateGet(this, _s7)[0] + __privateGet(this, _s7).slice(1).join("/") : __privateGet(this, _s7).join("/") : __privateGet(this, _s7).slice(__privateGet(this, _n6)).join("/")));
  }
  hasMore() {
    return this.length > __privateGet(this, _n6) + 1;
  }
  rest() {
    return __privateGet(this, _o5) !== void 0 ? __privateGet(this, _o5) : this.hasMore() ? (__privateSet(this, _o5, new _a9(__privateGet(this, _t7), __privateGet(this, _s7), __privateGet(this, _n6) + 1, __privateGet(this, _r6))), __privateSet(__privateGet(this, _o5), _h5, __privateGet(this, _h5)), __privateSet(__privateGet(this, _o5), _c6, __privateGet(this, _c6)), __privateSet(__privateGet(this, _o5), _w4, __privateGet(this, _w4)), __privateGet(this, _o5)) : __privateSet(this, _o5, null);
  }
  isUNC() {
    let t = __privateGet(this, _t7);
    return __privateGet(this, _c6) !== void 0 ? __privateGet(this, _c6) : __privateSet(this, _c6, __privateGet(this, _r6) === "win32" && __privateGet(this, _n6) === 0 && t[0] === "" && t[1] === "" && typeof t[2] == "string" && !!t[2] && typeof t[3] == "string" && !!t[3]);
  }
  isDrive() {
    let t = __privateGet(this, _t7);
    return __privateGet(this, _w4) !== void 0 ? __privateGet(this, _w4) : __privateSet(this, _w4, __privateGet(this, _r6) === "win32" && __privateGet(this, _n6) === 0 && this.length > 1 && typeof t[0] == "string" && /^[a-z]:$/i.test(t[0]));
  }
  isAbsolute() {
    let t = __privateGet(this, _t7);
    return __privateGet(this, _h5) !== void 0 ? __privateGet(this, _h5) : __privateSet(this, _h5, t[0] === "" && t.length > 1 || this.isDrive() || this.isUNC());
  }
  root() {
    let t = __privateGet(this, _t7)[0];
    return typeof t == "string" && this.isAbsolute() && __privateGet(this, _n6) === 0 ? t : "";
  }
  checkFollowGlobstar() {
    return !(__privateGet(this, _n6) === 0 || !this.isGlobstar() || !__privateGet(this, _u4));
  }
  markFollowGlobstar() {
    return __privateGet(this, _n6) === 0 || !this.isGlobstar() || !__privateGet(this, _u4) ? false : (__privateSet(this, _u4, false), true);
  }
}, _t7 = new WeakMap(), _s7 = new WeakMap(), _n6 = new WeakMap(), _r6 = new WeakMap(), _o5 = new WeakMap(), _S4 = new WeakMap(), _w4 = new WeakMap(), _c6 = new WeakMap(), _h5 = new WeakMap(), _u4 = new WeakMap(), _a9);
var _i4 = typeof process == "object" && process && typeof process.platform == "string" ? process.platform : "linux";
var ot = class {
  constructor(t, { nobrace: e, nocase: s, noext: i, noglobstar: r, platform: o = _i4 }) {
    __publicField(this, "relative");
    __publicField(this, "relativeChildren");
    __publicField(this, "absolute");
    __publicField(this, "absoluteChildren");
    __publicField(this, "platform");
    __publicField(this, "mmopts");
    this.relative = [], this.absolute = [], this.relativeChildren = [], this.absoluteChildren = [], this.platform = o, this.mmopts = { dot: true, nobrace: e, nocase: s, noext: i, noglobstar: r, optimizationLevel: 2, platform: o, nocomment: true, nonegate: true };
    for (let h of t) this.add(h);
  }
  add(t) {
    let e = new D(t, this.mmopts);
    for (let s = 0; s < e.set.length; s++) {
      let i = e.set[s], r = e.globParts[s];
      if (!i || !r) throw new Error("invalid pattern object");
      for (; i[0] === "." && r[0] === "."; ) i.shift(), r.shift();
      let o = new nt(i, r, 0, this.platform), h = new D(o.globString(), this.mmopts), a = r[r.length - 1] === "**", l = o.isAbsolute();
      l ? this.absolute.push(h) : this.relative.push(h), a && (l ? this.absoluteChildren.push(h) : this.relativeChildren.push(h));
    }
  }
  ignored(t) {
    let e = t.fullpath(), s = `${e}/`, i = t.relative() || ".", r = `${i}/`;
    for (let o of this.relative) if (o.match(i) || o.match(r)) return true;
    for (let o of this.absolute) if (o.match(e) || o.match(s)) return true;
    return false;
  }
  childrenIgnored(t) {
    let e = t.fullpath() + "/", s = (t.relative() || ".") + "/";
    for (let i of this.relativeChildren) if (i.match(s)) return true;
    for (let i of this.absoluteChildren) if (i.match(e)) return true;
    return false;
  }
};
var oe = class n3 {
  constructor(t = /* @__PURE__ */ new Map()) {
    __publicField(this, "store");
    this.store = t;
  }
  copy() {
    return new n3(new Map(this.store));
  }
  hasWalked(t, e) {
    return this.store.get(t.fullpath())?.has(e.globString());
  }
  storeWalked(t, e) {
    let s = t.fullpath(), i = this.store.get(s);
    i ? i.add(e.globString()) : this.store.set(s, /* @__PURE__ */ new Set([e.globString()]));
  }
};
var he = class {
  constructor() {
    __publicField(this, "store", /* @__PURE__ */ new Map());
  }
  add(t, e, s) {
    let i = (e ? 2 : 0) | (s ? 1 : 0), r = this.store.get(t);
    this.store.set(t, r === void 0 ? i : i & r);
  }
  entries() {
    return [...this.store.entries()].map(([t, e]) => [t, !!(e & 2), !!(e & 1)]);
  }
};
var ae = class {
  constructor() {
    __publicField(this, "store", /* @__PURE__ */ new Map());
  }
  add(t, e) {
    if (!t.canReaddir()) return;
    let s = this.store.get(t);
    s ? s.find((i) => i.globString() === e.globString()) || s.push(e) : this.store.set(t, [e]);
  }
  get(t) {
    let e = this.store.get(t);
    if (!e) throw new Error("attempting to walk unknown path");
    return e;
  }
  entries() {
    return this.keys().map((t) => [t, this.store.get(t)]);
  }
  keys() {
    return [...this.store.keys()].filter((t) => t.canReaddir());
  }
};
var Et = class n4 {
  constructor(t, e) {
    __publicField(this, "hasWalkedCache");
    __publicField(this, "matches", new he());
    __publicField(this, "subwalks", new ae());
    __publicField(this, "patterns");
    __publicField(this, "follow");
    __publicField(this, "dot");
    __publicField(this, "opts");
    this.opts = t, this.follow = !!t.follow, this.dot = !!t.dot, this.hasWalkedCache = e ? e.copy() : new oe();
  }
  processPatterns(t, e) {
    this.patterns = e;
    let s = e.map((i) => [t, i]);
    for (let [i, r] of s) {
      this.hasWalkedCache.storeWalked(i, r);
      let o = r.root(), h = r.isAbsolute() && this.opts.absolute !== false;
      if (o) {
        i = i.resolve(o === "/" && this.opts.root !== void 0 ? this.opts.root : o);
        let c = r.rest();
        if (c) r = c;
        else {
          this.matches.add(i, true, false);
          continue;
        }
      }
      if (i.isENOENT()) continue;
      let a, l, u = false;
      for (; typeof (a = r.pattern()) == "string" && (l = r.rest()); ) i = i.resolve(a), r = l, u = true;
      if (a = r.pattern(), l = r.rest(), u) {
        if (this.hasWalkedCache.hasWalked(i, r)) continue;
        this.hasWalkedCache.storeWalked(i, r);
      }
      if (typeof a == "string") {
        let c = a === ".." || a === "" || a === ".";
        this.matches.add(i.resolve(a), h, c);
        continue;
      } else if (a === A) {
        (!i.isSymbolicLink() || this.follow || r.checkFollowGlobstar()) && this.subwalks.add(i, r);
        let c = l?.pattern(), d = l?.rest();
        if (!l || (c === "" || c === ".") && !d) this.matches.add(i, h, c === "" || c === ".");
        else if (c === "..") {
          let f = i.parent || i;
          d ? this.hasWalkedCache.hasWalked(f, d) || this.subwalks.add(f, d) : this.matches.add(f, h, true);
        }
      } else a instanceof RegExp && this.subwalks.add(i, r);
    }
    return this;
  }
  subwalkTargets() {
    return this.subwalks.keys();
  }
  child() {
    return new n4(this.opts, this.hasWalkedCache);
  }
  filterEntries(t, e) {
    let s = this.subwalks.get(t), i = this.child();
    for (let r of e) for (let o of s) {
      let h = o.isAbsolute(), a = o.pattern(), l = o.rest();
      a === A ? i.testGlobstar(r, o, l, h) : a instanceof RegExp ? i.testRegExp(r, a, l, h) : i.testString(r, a, l, h);
    }
    return i;
  }
  testGlobstar(t, e, s, i) {
    if ((this.dot || !t.name.startsWith(".")) && (e.hasMore() || this.matches.add(t, i, false), t.canReaddir() && (this.follow || !t.isSymbolicLink() ? this.subwalks.add(t, e) : t.isSymbolicLink() && (s && e.checkFollowGlobstar() ? this.subwalks.add(t, s) : e.markFollowGlobstar() && this.subwalks.add(t, e)))), s) {
      let r = s.pattern();
      if (typeof r == "string" && r !== ".." && r !== "" && r !== ".") this.testString(t, r, s.rest(), i);
      else if (r === "..") {
        let o = t.parent || t;
        this.subwalks.add(o, s);
      } else r instanceof RegExp && this.testRegExp(t, r, s.rest(), i);
    }
  }
  testRegExp(t, e, s, i) {
    e.test(t.name) && (s ? this.subwalks.add(t, s) : this.matches.add(t, i, false));
  }
  testString(t, e, s, i) {
    t.isNamed(e) && (s ? this.subwalks.add(t, s) : this.matches.add(t, i, false));
  }
};
var Li = (n5, t) => typeof n5 == "string" ? new ot([n5], t) : Array.isArray(n5) ? new ot(n5, t) : n5;
var _t8, _s8, _n7, _zt_instances, r_fn, o_fn, _a10;
var zt = (_a10 = class {
  constructor(t, e, s) {
    __privateAdd(this, _zt_instances);
    __publicField(this, "path");
    __publicField(this, "patterns");
    __publicField(this, "opts");
    __publicField(this, "seen", /* @__PURE__ */ new Set());
    __publicField(this, "paused", false);
    __publicField(this, "aborted", false);
    __privateAdd(this, _t8, []);
    __privateAdd(this, _s8);
    __privateAdd(this, _n7);
    __publicField(this, "signal");
    __publicField(this, "maxDepth");
    __publicField(this, "includeChildMatches");
    if (this.patterns = t, this.path = e, this.opts = s, __privateSet(this, _n7, !s.posix && s.platform === "win32" ? "\\" : "/"), this.includeChildMatches = s.includeChildMatches !== false, (s.ignore || !this.includeChildMatches) && (__privateSet(this, _s8, Li(s.ignore ?? [], s)), !this.includeChildMatches && typeof __privateGet(this, _s8).add != "function")) {
      let i = "cannot ignore child matches, ignore lacks add() method.";
      throw new Error(i);
    }
    this.maxDepth = s.maxDepth || 1 / 0, s.signal && (this.signal = s.signal, this.signal.addEventListener("abort", () => {
      __privateGet(this, _t8).length = 0;
    }));
  }
  pause() {
    this.paused = true;
  }
  resume() {
    if (this.signal?.aborted) return;
    this.paused = false;
    let t;
    for (; !this.paused && (t = __privateGet(this, _t8).shift()); ) t();
  }
  onResume(t) {
    this.signal?.aborted || (this.paused ? __privateGet(this, _t8).push(t) : t());
  }
  async matchCheck(t, e) {
    if (e && this.opts.nodir) return;
    let s;
    if (this.opts.realpath) {
      if (s = t.realpathCached() || await t.realpath(), !s) return;
      t = s;
    }
    let r = t.isUnknown() || this.opts.stat ? await t.lstat() : t;
    if (this.opts.follow && this.opts.nodir && r?.isSymbolicLink()) {
      let o = await r.realpath();
      o && (o.isUnknown() || this.opts.stat) && await o.lstat();
    }
    return this.matchCheckTest(r, e);
  }
  matchCheckTest(t, e) {
    return t && (this.maxDepth === 1 / 0 || t.depth() <= this.maxDepth) && (!e || t.canReaddir()) && (!this.opts.nodir || !t.isDirectory()) && (!this.opts.nodir || !this.opts.follow || !t.isSymbolicLink() || !t.realpathCached()?.isDirectory()) && !__privateMethod(this, _zt_instances, r_fn).call(this, t) ? t : void 0;
  }
  matchCheckSync(t, e) {
    if (e && this.opts.nodir) return;
    let s;
    if (this.opts.realpath) {
      if (s = t.realpathCached() || t.realpathSync(), !s) return;
      t = s;
    }
    let r = t.isUnknown() || this.opts.stat ? t.lstatSync() : t;
    if (this.opts.follow && this.opts.nodir && r?.isSymbolicLink()) {
      let o = r.realpathSync();
      o && (o?.isUnknown() || this.opts.stat) && o.lstatSync();
    }
    return this.matchCheckTest(r, e);
  }
  matchFinish(t, e) {
    if (__privateMethod(this, _zt_instances, r_fn).call(this, t)) return;
    if (!this.includeChildMatches && __privateGet(this, _s8)?.add) {
      let r = `${t.relativePosix()}/**`;
      __privateGet(this, _s8).add(r);
    }
    let s = this.opts.absolute === void 0 ? e : this.opts.absolute;
    this.seen.add(t);
    let i = this.opts.mark && t.isDirectory() ? __privateGet(this, _n7) : "";
    if (this.opts.withFileTypes) this.matchEmit(t);
    else if (s) {
      let r = this.opts.posix ? t.fullpathPosix() : t.fullpath();
      this.matchEmit(r + i);
    } else {
      let r = this.opts.posix ? t.relativePosix() : t.relative(), o = this.opts.dotRelative && !r.startsWith(".." + __privateGet(this, _n7)) ? "." + __privateGet(this, _n7) : "";
      this.matchEmit(r ? o + r + i : "." + i);
    }
  }
  async match(t, e, s) {
    let i = await this.matchCheck(t, s);
    i && this.matchFinish(i, e);
  }
  matchSync(t, e, s) {
    let i = this.matchCheckSync(t, s);
    i && this.matchFinish(i, e);
  }
  walkCB(t, e, s) {
    this.signal?.aborted && s(), this.walkCB2(t, e, new Et(this.opts), s);
  }
  walkCB2(t, e, s, i) {
    if (__privateMethod(this, _zt_instances, o_fn).call(this, t)) return i();
    if (this.signal?.aborted && i(), this.paused) {
      this.onResume(() => this.walkCB2(t, e, s, i));
      return;
    }
    s.processPatterns(t, e);
    let r = 1, o = () => {
      --r === 0 && i();
    };
    for (let [h, a, l] of s.matches.entries()) __privateMethod(this, _zt_instances, r_fn).call(this, h) || (r++, this.match(h, a, l).then(() => o()));
    for (let h of s.subwalkTargets()) {
      if (this.maxDepth !== 1 / 0 && h.depth() >= this.maxDepth) continue;
      r++;
      let a = h.readdirCached();
      h.calledReaddir() ? this.walkCB3(h, a, s, o) : h.readdirCB((l, u) => this.walkCB3(h, u, s, o), true);
    }
    o();
  }
  walkCB3(t, e, s, i) {
    s = s.filterEntries(t, e);
    let r = 1, o = () => {
      --r === 0 && i();
    };
    for (let [h, a, l] of s.matches.entries()) __privateMethod(this, _zt_instances, r_fn).call(this, h) || (r++, this.match(h, a, l).then(() => o()));
    for (let [h, a] of s.subwalks.entries()) r++, this.walkCB2(h, a, s.child(), o);
    o();
  }
  walkCBSync(t, e, s) {
    this.signal?.aborted && s(), this.walkCB2Sync(t, e, new Et(this.opts), s);
  }
  walkCB2Sync(t, e, s, i) {
    if (__privateMethod(this, _zt_instances, o_fn).call(this, t)) return i();
    if (this.signal?.aborted && i(), this.paused) {
      this.onResume(() => this.walkCB2Sync(t, e, s, i));
      return;
    }
    s.processPatterns(t, e);
    let r = 1, o = () => {
      --r === 0 && i();
    };
    for (let [h, a, l] of s.matches.entries()) __privateMethod(this, _zt_instances, r_fn).call(this, h) || this.matchSync(h, a, l);
    for (let h of s.subwalkTargets()) {
      if (this.maxDepth !== 1 / 0 && h.depth() >= this.maxDepth) continue;
      r++;
      let a = h.readdirSync();
      this.walkCB3Sync(h, a, s, o);
    }
    o();
  }
  walkCB3Sync(t, e, s, i) {
    s = s.filterEntries(t, e);
    let r = 1, o = () => {
      --r === 0 && i();
    };
    for (let [h, a, l] of s.matches.entries()) __privateMethod(this, _zt_instances, r_fn).call(this, h) || this.matchSync(h, a, l);
    for (let [h, a] of s.subwalks.entries()) r++, this.walkCB2Sync(h, a, s.child(), o);
    o();
  }
}, _t8 = new WeakMap(), _s8 = new WeakMap(), _n7 = new WeakMap(), _zt_instances = new WeakSet(), r_fn = function(t) {
  return this.seen.has(t) || !!__privateGet(this, _s8)?.ignored?.(t);
}, o_fn = function(t) {
  return !!__privateGet(this, _s8)?.childrenIgnored?.(t);
}, _a10);
var xt = class extends zt {
  constructor(t, e, s) {
    super(t, e, s);
    __publicField(this, "matches", /* @__PURE__ */ new Set());
  }
  matchEmit(t) {
    this.matches.add(t);
  }
  async walk() {
    if (this.signal?.aborted) throw this.signal.reason;
    return this.path.isUnknown() && await this.path.lstat(), await new Promise((t, e) => {
      this.walkCB(this.path, this.patterns, () => {
        this.signal?.aborted ? e(this.signal.reason) : t(this.matches);
      });
    }), this.matches;
  }
  walkSync() {
    if (this.signal?.aborted) throw this.signal.reason;
    return this.path.isUnknown() && this.path.lstatSync(), this.walkCBSync(this.path, this.patterns, () => {
      if (this.signal?.aborted) throw this.signal.reason;
    }), this.matches;
  }
};
var vt = class extends zt {
  constructor(t, e, s) {
    super(t, e, s);
    __publicField(this, "results");
    this.results = new V({ signal: this.signal, objectMode: true }), this.results.on("drain", () => this.resume()), this.results.on("resume", () => this.resume());
  }
  matchEmit(t) {
    this.results.write(t), this.results.flowing || this.pause();
  }
  stream() {
    let t = this.path;
    return t.isUnknown() ? t.lstat().then(() => {
      this.walkCB(t, this.patterns, () => this.results.end());
    }) : this.walkCB(t, this.patterns, () => this.results.end()), this.results;
  }
  streamSync() {
    return this.path.isUnknown() && this.path.lstatSync(), this.walkCBSync(this.path, this.patterns, () => this.results.end()), this.results;
  }
};
var Pi = typeof process == "object" && process && typeof process.platform == "string" ? process.platform : "linux";
var I = class {
  constructor(t, e) {
    __publicField(this, "absolute");
    __publicField(this, "cwd");
    __publicField(this, "root");
    __publicField(this, "dot");
    __publicField(this, "dotRelative");
    __publicField(this, "follow");
    __publicField(this, "ignore");
    __publicField(this, "magicalBraces");
    __publicField(this, "mark");
    __publicField(this, "matchBase");
    __publicField(this, "maxDepth");
    __publicField(this, "nobrace");
    __publicField(this, "nocase");
    __publicField(this, "nodir");
    __publicField(this, "noext");
    __publicField(this, "noglobstar");
    __publicField(this, "pattern");
    __publicField(this, "platform");
    __publicField(this, "realpath");
    __publicField(this, "scurry");
    __publicField(this, "stat");
    __publicField(this, "signal");
    __publicField(this, "windowsPathsNoEscape");
    __publicField(this, "withFileTypes");
    __publicField(this, "includeChildMatches");
    __publicField(this, "opts");
    __publicField(this, "patterns");
    if (!e) throw new TypeError("glob options required");
    if (this.withFileTypes = !!e.withFileTypes, this.signal = e.signal, this.follow = !!e.follow, this.dot = !!e.dot, this.dotRelative = !!e.dotRelative, this.nodir = !!e.nodir, this.mark = !!e.mark, e.cwd ? (e.cwd instanceof URL || e.cwd.startsWith("file://")) && (e.cwd = (0, import_node_url.fileURLToPath)(e.cwd)) : this.cwd = "", this.cwd = e.cwd || "", this.root = e.root, this.magicalBraces = !!e.magicalBraces, this.nobrace = !!e.nobrace, this.noext = !!e.noext, this.realpath = !!e.realpath, this.absolute = e.absolute, this.includeChildMatches = e.includeChildMatches !== false, this.noglobstar = !!e.noglobstar, this.matchBase = !!e.matchBase, this.maxDepth = typeof e.maxDepth == "number" ? e.maxDepth : 1 / 0, this.stat = !!e.stat, this.ignore = e.ignore, this.withFileTypes && this.absolute !== void 0) throw new Error("cannot set absolute and withFileTypes:true");
    if (typeof t == "string" && (t = [t]), this.windowsPathsNoEscape = !!e.windowsPathsNoEscape || e.allowWindowsEscape === false, this.windowsPathsNoEscape && (t = t.map((a) => a.replace(/\\/g, "/"))), this.matchBase) {
      if (e.noglobstar) throw new TypeError("base matching requires globstar");
      t = t.map((a) => a.includes("/") ? a : `./**/${a}`);
    }
    if (this.pattern = t, this.platform = e.platform || Pi, this.opts = { ...e, platform: this.platform }, e.scurry) {
      if (this.scurry = e.scurry, e.nocase !== void 0 && e.nocase !== e.scurry.nocase) throw new Error("nocase option contradicts provided scurry option");
    } else {
      let a = e.platform === "win32" ? it : e.platform === "darwin" ? St : e.platform ? rt : Xe;
      this.scurry = new a(this.cwd, { nocase: e.nocase, fs: e.fs });
    }
    this.nocase = this.scurry.nocase;
    let s = this.platform === "darwin" || this.platform === "win32", i = { braceExpandMax: 1e4, ...e, dot: this.dot, matchBase: this.matchBase, nobrace: this.nobrace, nocase: this.nocase, nocaseMagicOnly: s, nocomment: true, noext: this.noext, nonegate: true, optimizationLevel: 2, platform: this.platform, windowsPathsNoEscape: this.windowsPathsNoEscape, debug: !!this.opts.debug }, r = this.pattern.map((a) => new D(a, i)), [o, h] = r.reduce((a, l) => (a[0].push(...l.set), a[1].push(...l.globParts), a), [[], []]);
    this.patterns = o.map((a, l) => {
      let u = h[l];
      if (!u) throw new Error("invalid pattern object");
      return new nt(a, u, 0, this.platform);
    });
  }
  async walk() {
    return [...await new xt(this.patterns, this.scurry.cwd, { ...this.opts, maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0, platform: this.platform, nocase: this.nocase, includeChildMatches: this.includeChildMatches }).walk()];
  }
  walkSync() {
    return [...new xt(this.patterns, this.scurry.cwd, { ...this.opts, maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0, platform: this.platform, nocase: this.nocase, includeChildMatches: this.includeChildMatches }).walkSync()];
  }
  stream() {
    return new vt(this.patterns, this.scurry.cwd, { ...this.opts, maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0, platform: this.platform, nocase: this.nocase, includeChildMatches: this.includeChildMatches }).stream();
  }
  streamSync() {
    return new vt(this.patterns, this.scurry.cwd, { ...this.opts, maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0, platform: this.platform, nocase: this.nocase, includeChildMatches: this.includeChildMatches }).streamSync();
  }
  iterateSync() {
    return this.streamSync()[Symbol.iterator]();
  }
  [Symbol.iterator]() {
    return this.iterateSync();
  }
  iterate() {
    return this.stream()[Symbol.asyncIterator]();
  }
  [Symbol.asyncIterator]() {
    return this.iterate();
  }
};
var le = (n5, t = {}) => {
  Array.isArray(n5) || (n5 = [n5]);
  for (let e of n5) if (new D(e, t).hasMagic()) return true;
  return false;
};
function Bt(n5, t = {}) {
  return new I(n5, t).streamSync();
}
function Qe(n5, t = {}) {
  return new I(n5, t).stream();
}
function ts(n5, t = {}) {
  return new I(n5, t).walkSync();
}
async function Je(n5, t = {}) {
  return new I(n5, t).walk();
}
function Ut(n5, t = {}) {
  return new I(n5, t).iterateSync();
}
function es(n5, t = {}) {
  return new I(n5, t).iterate();
}
var ji = Bt;
var Ii = Object.assign(Qe, { sync: Bt });
var zi = Ut;
var Bi = Object.assign(es, { sync: Ut });
var Ui = Object.assign(ts, { stream: Bt, iterate: Ut });
var Ze = Object.assign(Je, { glob: Je, globSync: ts, sync: Ui, globStream: Qe, stream: Ii, globStreamSync: Bt, streamSync: ji, globIterate: es, iterate: Bi, globIterateSync: Ut, iterateSync: zi, Glob: I, hasMagic: le, escape: tt, unescape: W });
Ze.glob = Ze;

// src/core/detector.ts
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
      if ((0, import_fs2.existsSync)(fullPath)) {
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
  const nestedPlaywright = ts("**/playwright.config.{ts,js,mjs}", {
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
    const content = (0, import_fs2.readFileSync)(configPath, "utf-8");
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
    if ((0, import_fs2.existsSync)(import_path.default.join(projectPath, candidate))) {
      return candidate;
    }
  }
  return "./tests";
}
function detectFromPackageJson(projectPath) {
  const pkgPath = import_path.default.join(projectPath, "package.json");
  if (!(0, import_fs2.existsSync)(pkgPath)) return null;
  try {
    const pkg = JSON.parse((0, import_fs2.readFileSync)(pkgPath, "utf-8"));
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
init_cjs_shims();
var import_fs3 = require("fs");
var import_path7 = __toESM(require("path"));

// src/core/frameworks/playwright.ts
init_cjs_shims();
var import_path2 = __toESM(require("path"));

// src/core/frameworks/common.ts
init_cjs_shims();
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
  const window2 = content.substring(testIndex, testIndex + 300);
  const tags = [];
  let match;
  INLINE_TAG_RE.lastIndex = 0;
  while ((match = INLINE_TAG_RE.exec(window2)) !== null) {
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
init_cjs_shims();
var import_path3 = __toESM(require("path"));

// src/core/frameworks/parameterized.ts
init_cjs_shims();
function extractParameterizedDataFromForEach(content, testName) {
  const contextStart = Math.max(0, content.lastIndexOf("\n", content.indexOf(testName)) - 1e3);
  const contextEnd = content.indexOf(testName);
  const context = content.substring(contextStart, contextEnd);
  const forEachMatch = context.match(/\b(?:users|items|data|elements|nodes)\.forEach\s*\(/i);
  const forMatch = context.match(/\bfor\s*\(\s*(?:let|var|const)\s+(\w+)\s+(?:of|in)\s+(.+?)\s*\)/);
  if (forEachMatch || forMatch) {
    const arrayDeclMatch = context.match(/(?:const|let|var)\s+\w+\s*=\s*\[([\s\S]*?)\]/);
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

// src/core/frameworks/cypress.ts
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
init_cjs_shims();
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
init_cjs_shims();
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
init_cjs_shims();
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
    spec.lastModified = (0, import_fs3.statSync)(filePath).mtime.toISOString();
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
function extractTestsWithLinesFromContent(content, framework) {
  const dummyPath = "/__git_history__/test.spec.ts";
  const dummyRoot = "/__git_history__";
  let spec;
  switch (framework) {
    case "playwright":
      spec = parsePlaywrightSpec(dummyPath, content, dummyRoot);
      break;
    case "cypress":
      spec = parseCypressSpec(dummyPath, content, dummyRoot);
      break;
    case "vitest":
      spec = parseVitestSpec(dummyPath, content, dummyRoot);
      break;
    case "testng":
      spec = parseTestNGSpec(dummyPath, content, dummyRoot);
      break;
    case "junit":
      spec = parseJUnitSpec(dummyPath, content, dummyRoot);
      break;
    default:
      return [];
  }
  return spec.tests.map((t) => ({ name: t.fullName, line: t.line }));
}
function findSpecFiles(projectRoot, testDir, framework) {
  const patterns = getTestFilePatterns(framework);
  const baseDir = import_path7.default.resolve(projectRoot, testDir);
  return ts(patterns, {
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
    const content = (0, import_fs3.readFileSync)(filePath, "utf-8");
    return parseSpecFile(filePath, content, projectRoot, framework);
  });
}

// src/git/index.ts
init_cjs_shims();

// src/git/history.ts
init_cjs_shims();

// node_modules/simple-git/dist/esm/index.js
init_cjs_shims();
var import_node_buffer = require("buffer");
var import_file_exists = __toESM(require_dist(), 1);
var import_debug = __toESM(require_src(), 1);
var import_child_process = require("child_process");
var import_promise_deferred = __toESM(require_dist2(), 1);
var import_node_path2 = require("path");
var import_promise_deferred2 = __toESM(require_dist2(), 1);
var import_node_events2 = require("events");
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __esm2 = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
};
var __commonJS2 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export2 = (target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
function pathspec(...paths) {
  const key = new String(paths);
  cache.set(key, paths);
  return key;
}
function isPathSpec(path10) {
  return path10 instanceof String && cache.has(path10);
}
function toPaths(pathSpec) {
  return cache.get(pathSpec) || [];
}
var cache;
var init_pathspec = __esm2({
  "src/lib/args/pathspec.ts"() {
    "use strict";
    cache = /* @__PURE__ */ new WeakMap();
  }
});
var GitError;
var init_git_error = __esm2({
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
var GitResponseError;
var init_git_response_error = __esm2({
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
var TaskConfigurationError;
var init_task_configuration_error = __esm2({
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
function folderExists(path10) {
  return (0, import_file_exists.exists)(path10, import_file_exists.FOLDER);
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
var NULL;
var NOOP;
var objectToString;
var init_util = __esm2({
  "src/lib/utils/util.ts"() {
    "use strict";
    init_argument_filters();
    NULL = "\0";
    NOOP = () => {
    };
    objectToString = Object.prototype.toString.call.bind(Object.prototype.toString);
  }
});
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
var filterArray;
var filterNumber;
var filterString;
var filterStringOrStringArray;
var filterHasLength;
var init_argument_filters = __esm2({
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
var ExitCodes;
var init_exit_codes = __esm2({
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
var GitOutputStreams;
var init_git_output_streams = __esm2({
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
function useMatchesDefault() {
  throw new Error(`LineParser:useMatches not implemented`);
}
var LineParser;
var RemoteLineParser;
var init_line_parser = __esm2({
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
function createInstanceConfig(...options) {
  const baseDir = process.cwd();
  const config2 = Object.assign(
    { baseDir, ...defaultOptions },
    ...options.filter((o) => typeof o === "object" && o)
  );
  config2.baseDir = config2.baseDir || baseDir;
  config2.trimmed = config2.trimmed === true;
  return config2;
}
var defaultOptions;
var init_simple_git_options = __esm2({
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
      for (const v2 of value) {
        if (!filterPrimitives(v2, ["string", "number"])) {
          commands2.push(key + "=" + v2);
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
var init_task_options = __esm2({
  "src/lib/utils/task-options.ts"() {
    "use strict";
    init_argument_filters();
    init_util();
    init_pathspec();
  }
});
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
var init_task_parser = __esm2({
  "src/lib/utils/task-parser.ts"() {
    "use strict";
    init_util();
  }
});
var utils_exports = {};
__export2(utils_exports, {
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
var init_utils = __esm2({
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
var check_is_repo_exports = {};
__export2(check_is_repo_exports, {
  CheckRepoActions: () => CheckRepoActions,
  checkIsBareRepoTask: () => checkIsBareRepoTask,
  checkIsRepoRootTask: () => checkIsRepoRootTask,
  checkIsRepoTask: () => checkIsRepoTask
});
function checkIsRepoTask(action) {
  switch (action) {
    case "bare":
      return checkIsBareRepoTask();
    case "root":
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
    parser(path10) {
      return /^\.(git)?$/.test(path10.trim());
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
var CheckRepoActions;
var onError;
var parser;
var init_check_is_repo = __esm2({
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
      if (exitCode === 128 && isNotRepoMessage(error)) {
        return done(Buffer.from("false"));
      }
      fail(error);
    };
    parser = (text) => {
      return text.trim() === "true";
    };
  }
});
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
var CleanResponse;
var removalRegexp;
var dryRunRemovalRegexp;
var isFolderRegexp;
var init_CleanSummary = __esm2({
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
var task_exports = {};
__export2(task_exports, {
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
var init_task = __esm2({
  "src/lib/tasks/task.ts"() {
    "use strict";
    init_task_configuration_error();
    EMPTY_COMMANDS = [];
  }
});
var clean_exports = {};
__export2(clean_exports, {
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
      return cleanSummaryParser(mode === "n", text);
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
  return cleanMode === "f" || cleanMode === "n";
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
var CONFIG_ERROR_INTERACTIVE_MODE;
var CONFIG_ERROR_MODE_REQUIRED;
var CONFIG_ERROR_UNKNOWN_OPTION;
var CleanOptions;
var CleanOptionValues;
var init_clean = __esm2({
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
function configListParser(text) {
  const config2 = new ConfigList();
  for (const item of configParser(text)) {
    config2.addValue(item.file, String(item.key), item.value);
  }
  return config2;
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
var init_ConfigList = __esm2({
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
          asConfigScope(
            rest[1],
            "local"
            /* local */
          )
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
var init_config = __esm2({
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
function isDiffNameStatus(input) {
  return diffNameStatus.has(input);
}
var DiffNameStatus;
var diffNameStatus;
var init_diff_name_status = __esm2({
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
function grepQueryBuilder(...params) {
  return new GrepQuery().param(...params);
}
function parseGrep(grep) {
  const paths = /* @__PURE__ */ new Set();
  const results = {};
  forEachLineWithContent(grep, (input) => {
    const [path10, line, preview] = input.split(NULL);
    paths.add(path10);
    (results[path10] = results[path10] || []).push({
      line: asNumber(line),
      path: path10,
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
var disallowedOptions;
var Query;
var _a11;
var GrepQuery;
var init_grep = __esm2({
  "src/lib/tasks/grep.ts"() {
    "use strict";
    init_utils();
    init_task();
    disallowedOptions = ["-h"];
    Query = /* @__PURE__ */ Symbol("grepQuery");
    GrepQuery = class {
      constructor() {
        this[_a11] = [];
      }
      *[(_a11 = Query, Symbol.iterator)]() {
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
var reset_exports = {};
__export2(reset_exports, {
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
      return "soft";
  }
  return;
}
function isValidResetMode(mode) {
  return typeof mode === "string" && validResetModes.includes(mode);
}
var ResetMode;
var validResetModes;
var init_reset = __esm2({
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
var init_git_logger = __esm2({
  "src/lib/git-logger.ts"() {
    "use strict";
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
var TasksPendingQueue;
var init_tasks_pending_queue = __esm2({
  "src/lib/runners/tasks-pending-queue.ts"() {
    "use strict";
    var _a12;
    init_git_error();
    init_git_logger();
    TasksPendingQueue = (_a12 = class {
      constructor(logLabel = "GitExecutor") {
        this.logLabel = logLabel;
        this._queue = /* @__PURE__ */ new Map();
      }
      withProgress(task) {
        return this._queue.get(task);
      }
      createProgress(task) {
        const name = _a12.getName(task.commands[0]);
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
        return `task:${name}:${++_a12.counter}`;
      }
    }, _a12.counter = 0, _a12);
  }
});
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
var GitExecutorChain;
var init_git_executor_chain = __esm2({
  "src/lib/runners/git-executor-chain.ts"() {
    "use strict";
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
var git_executor_exports = {};
__export2(git_executor_exports, {
  GitExecutor: () => GitExecutor
});
var GitExecutor;
var init_git_executor = __esm2({
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
var init_task_callback = __esm2({
  "src/lib/task-callback.ts"() {
    "use strict";
    init_git_response_error();
    init_utils();
  }
});
function changeWorkingDirectoryTask(directory, root) {
  return adhocExecTask((instance) => {
    if (!folderExists(directory)) {
      throw new Error(`Git.cwd: cannot change to non-directory "${directory}"`);
    }
    return (root || instance).cwd = directory;
  });
}
var init_change_working_directory = __esm2({
  "src/lib/tasks/change-working-directory.ts"() {
    "use strict";
    init_utils();
    init_task();
  }
});
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
var init_checkout = __esm2({
  "src/lib/tasks/checkout.ts"() {
    "use strict";
    init_utils();
    init_task();
  }
});
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
var init_count_objects = __esm2({
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
var init_parse_commit = __esm2({
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
var init_commit = __esm2({
  "src/lib/tasks/commit.ts"() {
    "use strict";
    init_parse_commit();
    init_utils();
    init_task();
  }
});
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
var init_first_commit = __esm2({
  "src/lib/tasks/first-commit.ts"() {
    "use strict";
    init_utils();
    init_task();
  }
});
function hashObjectTask(filePath, write) {
  const commands = ["hash-object", filePath];
  if (write) {
    commands.push("-w");
  }
  return straightThroughStringTask(commands, true);
}
var init_hash_object = __esm2({
  "src/lib/tasks/hash-object.ts"() {
    "use strict";
    init_task();
  }
});
function parseInit(bare, path10, text) {
  const response = String(text).trim();
  let result;
  if (result = initResponseRegex.exec(response)) {
    return new InitSummary(bare, path10, false, result[1]);
  }
  if (result = reInitResponseRegex.exec(response)) {
    return new InitSummary(bare, path10, true, result[1]);
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
  return new InitSummary(bare, path10, /^re/i.test(response), gitDir);
}
var InitSummary;
var initResponseRegex;
var reInitResponseRegex;
var init_InitSummary = __esm2({
  "src/lib/responses/InitSummary.ts"() {
    "use strict";
    InitSummary = class {
      constructor(bare, path10, existing, gitDir) {
        this.bare = bare;
        this.path = path10;
        this.existing = existing;
        this.gitDir = gitDir;
      }
    };
    initResponseRegex = /^Init.+ repository in (.+)$/;
    reInitResponseRegex = /^Rein.+ in (.+)$/;
  }
});
function hasBareCommand(command) {
  return command.includes(bareCommand);
}
function initTask(bare = false, path10, customArgs) {
  const commands = ["init", ...customArgs];
  if (bare && !hasBareCommand(commands)) {
    commands.splice(1, 0, bareCommand);
  }
  return {
    commands,
    format: "utf-8",
    parser(text) {
      return parseInit(commands.includes("--bare"), path10, text);
    }
  };
}
var bareCommand;
var init_init = __esm2({
  "src/lib/tasks/init.ts"() {
    "use strict";
    init_InitSummary();
    bareCommand = "--bare";
  }
});
function logFormatFromCommand(customArgs) {
  for (let i = 0; i < customArgs.length; i++) {
    const format = logFormatRegex.exec(customArgs[i]);
    if (format) {
      return `--${format[1]}`;
    }
  }
  return "";
}
function isLogFormat(customArg) {
  return logFormatRegex.test(customArg);
}
var logFormatRegex;
var init_log_format = __esm2({
  "src/lib/args/log-format.ts"() {
    "use strict";
    logFormatRegex = /^--(stat|numstat|name-only|name-status)(=|$)/;
  }
});
var DiffSummary;
var init_DiffSummary = __esm2({
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
function getDiffParser(format = "") {
  const parser4 = diffSummaryParsers[format];
  return (stdOut) => parseStringResponse(new DiffSummary(), parser4, stdOut, false);
}
var statParser;
var numStatParser;
var nameOnlyParser;
var nameStatusParser;
var diffSummaryParsers;
var init_parse_diff_summary = __esm2({
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
      [
        ""
        /* NONE */
      ]: statParser,
      [
        "--stat"
        /* STAT */
      ]: statParser,
      [
        "--numstat"
        /* NUM_STAT */
      ]: numStatParser,
      [
        "--name-status"
        /* NAME_STATUS */
      ]: nameStatusParser,
      [
        "--name-only"
        /* NAME_ONLY */
      ]: nameOnlyParser
    };
  }
});
function lineBuilder(tokens, fields) {
  return fields.reduce(
    (line, field, index) => {
      line[field] = tokens[index] || "";
      return line;
    },
    /* @__PURE__ */ Object.create({ diff: null })
  );
}
function createListLogSummaryParser(splitter = SPLITTER, fields = defaultFieldNames, logFormat = "") {
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
var START_BOUNDARY;
var COMMIT_BOUNDARY;
var SPLITTER;
var defaultFieldNames;
var init_parse_list_log_summary = __esm2({
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
var diff_exports = {};
__export2(diff_exports, {
  diffSummaryTask: () => diffSummaryTask,
  validateLogFormatConfig: () => validateLogFormatConfig
});
function diffSummaryTask(customArgs) {
  let logFormat = logFormatFromCommand(customArgs);
  const commands = ["diff"];
  if (logFormat === "") {
    logFormat = "--stat";
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
var init_diff = __esm2({
  "src/lib/tasks/diff.ts"() {
    "use strict";
    init_log_format();
    init_parse_diff_summary();
    init_task();
  }
});
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
var init_log = __esm2({
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
var MergeSummaryConflict;
var MergeSummaryDetail;
var init_MergeSummary = __esm2({
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
var PullSummary;
var PullFailedSummary;
var init_PullSummary = __esm2({
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
var init_parse_remote_objects = __esm2({
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
function parseRemoteMessages(_stdOut, stdErr) {
  return parseStringResponse({ remoteMessages: new RemoteMessageSummary() }, parsers2, stdErr);
}
var parsers2;
var RemoteMessageSummary;
var init_parse_remote_messages = __esm2({
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
function parsePullErrorResult(stdOut, stdErr) {
  const pullError = parseStringResponse(new PullFailedSummary(), errorParsers, [stdOut, stdErr]);
  return pullError.message && pullError;
}
var FILE_UPDATE_REGEX;
var SUMMARY_REGEX;
var ACTION_REGEX;
var parsers3;
var errorParsers;
var parsePullDetail;
var parsePullResult;
var init_parse_pull = __esm2({
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
var parsers4;
var parseMergeResult;
var parseMergeDetail;
var init_parse_merge = __esm2({
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
var init_merge = __esm2({
  "src/lib/tasks/merge.ts"() {
    "use strict";
    init_git_response_error();
    init_parse_merge();
    init_task();
  }
});
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
var parsers5;
var parsePushResult;
var parsePushDetail;
var init_parse_push = __esm2({
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
var push_exports = {};
__export2(push_exports, {
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
var init_push = __esm2({
  "src/lib/tasks/push.ts"() {
    "use strict";
    init_parse_push();
    init_utils();
  }
});
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
var init_show = __esm2({
  "src/lib/tasks/show.ts"() {
    "use strict";
    init_utils();
    init_task();
  }
});
var fromPathRegex;
var FileStatusSummary;
var init_FileStatusSummary = __esm2({
  "src/lib/responses/FileStatusSummary.ts"() {
    "use strict";
    fromPathRegex = /^(.+)\0(.+)$/;
    FileStatusSummary = class {
      constructor(path10, index, working_dir) {
        this.path = path10;
        this.index = index;
        this.working_dir = working_dir;
        if (index === "R" || working_dir === "R") {
          const detail = fromPathRegex.exec(path10) || [null, path10, path10];
          this.from = detail[2] || "";
          this.path = detail[1] || "";
        }
      }
    };
  }
});
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
      return data(" ", trimmed2.charAt(0), trimmed2.slice(2));
    default:
      return;
  }
  function data(index, workingDir, path10) {
    const raw = `${index}${workingDir}`;
    const handler = parsers6.get(raw);
    if (handler) {
      handler(result, path10);
    }
    if (raw !== "##" && raw !== "!!") {
      result.files.push(new FileStatusSummary(path10, index, workingDir));
    }
  }
}
var StatusSummary;
var parsers6;
var parseStatusSummary;
var init_StatusSummary = __esm2({
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
        " ",
        "A",
        (result, file) => result.created.push(file)
      ),
      parser3(
        " ",
        "D",
        (result, file) => result.deleted.push(file)
      ),
      parser3(
        " ",
        "M",
        (result, file) => result.modified.push(file)
      ),
      parser3("A", " ", (result, file) => {
        result.created.push(file);
        result.staged.push(file);
      }),
      parser3("A", "M", (result, file) => {
        result.created.push(file);
        result.staged.push(file);
        result.modified.push(file);
      }),
      parser3("D", " ", (result, file) => {
        result.deleted.push(file);
        result.staged.push(file);
      }),
      parser3("M", " ", (result, file) => {
        result.modified.push(file);
        result.staged.push(file);
      }),
      parser3("M", "M", (result, file) => {
        result.modified.push(file);
        result.staged.push(file);
      }),
      parser3("R", " ", (result, file) => {
        result.renamed.push(renamedFile(file));
      }),
      parser3("R", "M", (result, file) => {
        const renamed = renamedFile(file);
        result.renamed.push(renamed);
        result.modified.push(renamed.to);
      }),
      parser3("!", "!", (_result, _file) => {
        (_result.ignored = _result.ignored || []).push(_file);
      }),
      parser3(
        "?",
        "?",
        (result, file) => result.not_added.push(file)
      ),
      ...conflicts(
        "A",
        "A",
        "U"
        /* UNMERGED */
      ),
      ...conflicts(
        "D",
        "D",
        "U"
        /* UNMERGED */
      ),
      ...conflicts(
        "U",
        "A",
        "D",
        "U"
        /* UNMERGED */
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
        if (line.charAt(0) === "R") {
          line += NULL + (lines[i++] || "");
        }
        splitLine(status, line);
      }
      return status;
    };
  }
});
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
var init_status = __esm2({
  "src/lib/tasks/status.ts"() {
    "use strict";
    init_StatusSummary();
    ignoredOptions = ["--null", "-z"];
  }
});
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
          if (result.exitCode === -2) {
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
var NOT_INSTALLED;
var parsers7;
var init_version = __esm2({
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
var cloneTask;
var cloneMirrorTask;
var init_clone = __esm2({
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
var simple_git_api_exports = {};
__export2(simple_git_api_exports, {
  SimpleGitApi: () => SimpleGitApi
});
var SimpleGitApi;
var init_simple_git_api = __esm2({
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
      hashObject(path10, write) {
        return this._runTask(
          hashObjectTask(path10, write === true),
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
var scheduler_exports = {};
__export2(scheduler_exports, {
  Scheduler: () => Scheduler
});
var createScheduledTask;
var Scheduler;
var init_scheduler = __esm2({
  "src/lib/runners/scheduler.ts"() {
    "use strict";
    init_utils();
    init_git_logger();
    createScheduledTask = /* @__PURE__ */ (() => {
      let id = 0;
      return () => {
        id++;
        const { promise, done } = (0, import_promise_deferred.createDeferred)();
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
var apply_patch_exports = {};
__export2(apply_patch_exports, {
  applyPatchTask: () => applyPatchTask
});
function applyPatchTask(patches, customArgs) {
  return straightThroughStringTask(["apply", ...customArgs, ...patches]);
}
var init_apply_patch = __esm2({
  "src/lib/tasks/apply-patch.ts"() {
    "use strict";
    init_task();
  }
});
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
var init_BranchDeleteSummary = __esm2({
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
function hasBranchDeletionError(data, processExitCode) {
  return processExitCode === 1 && deleteErrorRegex.test(data);
}
var deleteSuccessRegex;
var deleteErrorRegex;
var parsers8;
var parseBranchDeletions;
var init_parse_branch_delete = __esm2({
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
var BranchSummaryResult;
var init_BranchSummary = __esm2({
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
        if (status === "*") {
          this.detached = detached;
          this.current = name;
        }
        this.all.push(name);
        this.branches[name] = {
          current: status === "*",
          linkedWorkTree: status === "+",
          name,
          commit,
          label
        };
      }
    };
  }
});
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
var parsers9;
var currentBranchParser;
var init_parse_branch = __esm2({
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
      result.push("*", false, name, "", "");
    });
  }
});
var branch_exports = {};
__export2(branch_exports, {
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
    onError({ exitCode, stdErr, stdOut }, error, _2, fail) {
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
var init_branch = __esm2({
  "src/lib/tasks/branch.ts"() {
    "use strict";
    init_git_response_error();
    init_parse_branch_delete();
    init_parse_branch();
    init_utils();
  }
});
function toPath(input) {
  const path10 = input.trim().replace(/^["']|["']$/g, "");
  return path10 && (0, import_node_path2.normalize)(path10);
}
var parseCheckIgnore;
var init_CheckIgnore = __esm2({
  "src/lib/responses/CheckIgnore.ts"() {
    "use strict";
    parseCheckIgnore = (text) => {
      return text.split(/\n/g).map(toPath).filter(Boolean);
    };
  }
});
var check_ignore_exports = {};
__export2(check_ignore_exports, {
  checkIgnoreTask: () => checkIgnoreTask
});
function checkIgnoreTask(paths) {
  return {
    commands: ["check-ignore", ...paths],
    format: "utf-8",
    parser: parseCheckIgnore
  };
}
var init_check_ignore = __esm2({
  "src/lib/tasks/check-ignore.ts"() {
    "use strict";
    init_CheckIgnore();
  }
});
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
var init_parse_fetch = __esm2({
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
var fetch_exports = {};
__export2(fetch_exports, {
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
var init_fetch = __esm2({
  "src/lib/tasks/fetch.ts"() {
    "use strict";
    init_parse_fetch();
    init_task();
  }
});
function parseMoveResult(stdOut) {
  return parseStringResponse({ moves: [] }, parsers11, stdOut);
}
var parsers11;
var init_parse_move = __esm2({
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
var move_exports = {};
__export2(move_exports, {
  moveTask: () => moveTask
});
function moveTask(from, to) {
  return {
    commands: ["mv", "-v", ...asArray(from), to],
    format: "utf-8",
    parser: parseMoveResult
  };
}
var init_move = __esm2({
  "src/lib/tasks/move.ts"() {
    "use strict";
    init_parse_move();
    init_utils();
  }
});
var pull_exports = {};
__export2(pull_exports, {
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
var init_pull = __esm2({
  "src/lib/tasks/pull.ts"() {
    "use strict";
    init_git_response_error();
    init_parse_pull();
    init_utils();
  }
});
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
var init_GetRemoteSummary = __esm2({
  "src/lib/responses/GetRemoteSummary.ts"() {
    "use strict";
    init_utils();
  }
});
var remote_exports = {};
__export2(remote_exports, {
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
var init_remote = __esm2({
  "src/lib/tasks/remote.ts"() {
    "use strict";
    init_GetRemoteSummary();
    init_task();
  }
});
var stash_list_exports = {};
__export2(stash_list_exports, {
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
var init_stash_list = __esm2({
  "src/lib/tasks/stash-list.ts"() {
    "use strict";
    init_log_format();
    init_parse_list_log_summary();
    init_diff();
    init_log();
  }
});
var sub_module_exports = {};
__export2(sub_module_exports, {
  addSubModuleTask: () => addSubModuleTask,
  initSubModuleTask: () => initSubModuleTask,
  subModuleTask: () => subModuleTask,
  updateSubModuleTask: () => updateSubModuleTask
});
function addSubModuleTask(repo, path10) {
  return subModuleTask(["add", repo, path10]);
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
var init_sub_module = __esm2({
  "src/lib/tasks/sub-module.ts"() {
    "use strict";
    init_task();
  }
});
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
var TagList;
var parseTagList;
var init_TagList = __esm2({
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
var tag_exports = {};
__export2(tag_exports, {
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
var init_tag = __esm2({
  "src/lib/tasks/tag.ts"() {
    "use strict";
    init_TagList();
  }
});
var require_git = __commonJS2({
  "src/git.js"(exports2, module2) {
    "use strict";
    var { GitExecutor: GitExecutor2 } = (init_git_executor(), __toCommonJS2(git_executor_exports));
    var { SimpleGitApi: SimpleGitApi2 } = (init_simple_git_api(), __toCommonJS2(simple_git_api_exports));
    var { Scheduler: Scheduler2 } = (init_scheduler(), __toCommonJS2(scheduler_exports));
    var { adhocExecTask: adhocExecTask2, configurationErrorTask: configurationErrorTask2 } = (init_task(), __toCommonJS2(task_exports));
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
    } = (init_utils(), __toCommonJS2(utils_exports));
    var { applyPatchTask: applyPatchTask2 } = (init_apply_patch(), __toCommonJS2(apply_patch_exports));
    var {
      branchTask: branchTask2,
      branchLocalTask: branchLocalTask2,
      deleteBranchesTask: deleteBranchesTask2,
      deleteBranchTask: deleteBranchTask2
    } = (init_branch(), __toCommonJS2(branch_exports));
    var { checkIgnoreTask: checkIgnoreTask2 } = (init_check_ignore(), __toCommonJS2(check_ignore_exports));
    var { checkIsRepoTask: checkIsRepoTask2 } = (init_check_is_repo(), __toCommonJS2(check_is_repo_exports));
    var { cleanWithOptionsTask: cleanWithOptionsTask2, isCleanOptionsArray: isCleanOptionsArray2 } = (init_clean(), __toCommonJS2(clean_exports));
    var { diffSummaryTask: diffSummaryTask2 } = (init_diff(), __toCommonJS2(diff_exports));
    var { fetchTask: fetchTask2 } = (init_fetch(), __toCommonJS2(fetch_exports));
    var { moveTask: moveTask2 } = (init_move(), __toCommonJS2(move_exports));
    var { pullTask: pullTask2 } = (init_pull(), __toCommonJS2(pull_exports));
    var { pushTagsTask: pushTagsTask2 } = (init_push(), __toCommonJS2(push_exports));
    var {
      addRemoteTask: addRemoteTask2,
      getRemotesTask: getRemotesTask2,
      listRemotesTask: listRemotesTask2,
      remoteTask: remoteTask2,
      removeRemoteTask: removeRemoteTask2
    } = (init_remote(), __toCommonJS2(remote_exports));
    var { getResetMode: getResetMode2, resetTask: resetTask2 } = (init_reset(), __toCommonJS2(reset_exports));
    var { stashListTask: stashListTask2 } = (init_stash_list(), __toCommonJS2(stash_list_exports));
    var {
      addSubModuleTask: addSubModuleTask2,
      initSubModuleTask: initSubModuleTask2,
      subModuleTask: subModuleTask2,
      updateSubModuleTask: updateSubModuleTask2
    } = (init_sub_module(), __toCommonJS2(sub_module_exports));
    var { addAnnotatedTagTask: addAnnotatedTagTask2, addTagTask: addTagTask2, tagListTask: tagListTask2 } = (init_tag(), __toCommonJS2(tag_exports));
    var { straightThroughBufferTask: straightThroughBufferTask2, straightThroughStringTask: straightThroughStringTask2 } = (init_task(), __toCommonJS2(task_exports));
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
    Git2.prototype.submoduleAdd = function(repo, path10, then) {
      return this._runTask(addSubModuleTask2(repo, path10), trailingFunctionArgument2(arguments));
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
init_pathspec();
init_git_error();
var GitConstructError = class extends GitError {
  constructor(config2, message) {
    super(void 0, message);
    this.config = config2;
  }
};
init_git_error();
init_git_error();
var GitPluginError = class extends GitError {
  constructor(task, plugin, message) {
    super(task, message);
    this.task = task;
    this.plugin = plugin;
    Object.setPrototypeOf(this, new.target.prototype);
  }
};
init_git_response_error();
init_task_configuration_error();
init_check_is_repo();
init_clean();
init_config();
init_diff_name_status();
init_grep();
init_reset();
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
function preventConfigBuilder(config2, setting, message = String(config2)) {
  const regex = typeof config2 === "string" ? new RegExp(`\\s*${config2}`, "i") : config2;
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
var preventUnsafeConfig = [
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
init_utils();
function commandConfigPrefixingPlugin(configuration) {
  const prefix = prefixedArray(configuration, "-c");
  return {
    type: "spawn.args",
    action(data) {
      return [...prefix, ...data];
    }
  };
}
init_utils();
var never = (0, import_promise_deferred2.deferred)().promise;
function completionDetectionPlugin({
  onClose = true,
  onExit = 50
} = {}) {
  function createEvents() {
    let exitCode = -1;
    const events = {
      close: (0, import_promise_deferred2.deferred)(),
      closeTimeout: (0, import_promise_deferred2.deferred)(),
      exit: (0, import_promise_deferred2.deferred)(),
      exitTimeout: (0, import_promise_deferred2.deferred)()
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
init_utils();
var WRONG_NUMBER_ERR = `Invalid value supplied for custom binary, requires a single string or an array containing either one or two strings`;
var WRONG_CHARS_ERR = `Invalid value supplied for custom binary, restricted characters must be removed or supply the unsafe.allowUnsafeCustomBinary option`;
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
  let config2 = toBinaryConfig(asArray(input), allowUnsafe);
  plugins.on("binary", (input2) => {
    config2 = toBinaryConfig(asArray(input2), allowUnsafe);
  });
  plugins.append("spawn.binary", () => {
    return config2.binary;
  });
  plugins.append("spawn.args", (data) => {
    return config2.prefix ? [config2.prefix, ...data] : data;
  });
}
init_git_error();
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
function errorDetectionPlugin(config2) {
  return {
    type: "task.error",
    action(data, context) {
      const error = config2(data.error, {
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
init_utils();
var PluginStore = class {
  constructor() {
    this.plugins = /* @__PURE__ */ new Set();
    this.events = new import_node_events2.EventEmitter();
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
init_utils();
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
init_utils();
function spawnOptionsPlugin(spawnOptions) {
  const options = pick(spawnOptions, ["uid", "gid"]);
  return {
    type: "spawn.options",
    action(data) {
      return { ...options, ...data };
    }
  };
}
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
init_pathspec();
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
init_utils();
var Git = require_git();
function gitInstanceFactory(baseDir, options) {
  const plugins = new PluginStore();
  const config2 = createInstanceConfig(
    baseDir && (typeof baseDir === "string" ? { baseDir } : baseDir) || {},
    options
  );
  if (!folderExists(config2.baseDir)) {
    throw new GitConstructError(
      config2,
      `Cannot use simple-git on a directory that does not exist`
    );
  }
  if (Array.isArray(config2.config)) {
    plugins.add(commandConfigPrefixingPlugin(config2.config));
  }
  plugins.add(blockUnsafeOperationsPlugin(config2.unsafe));
  plugins.add(completionDetectionPlugin(config2.completion));
  config2.abort && plugins.add(abortPlugin(config2.abort));
  config2.progress && plugins.add(progressMonitorPlugin(config2.progress));
  config2.timeout && plugins.add(timeoutPlugin(config2.timeout));
  config2.spawnOptions && plugins.add(spawnOptionsPlugin(config2.spawnOptions));
  plugins.add(suffixPathsPlugin());
  plugins.add(errorDetectionPlugin(errorDetectionHandler(true)));
  config2.errors && plugins.add(errorDetectionPlugin(config2.errors));
  customBinaryPlugin(plugins, config2.binary, config2.unsafe?.allowUnsafeCustomBinary);
  return new Git(config2, plugins);
}
init_git_response_error();
var esm_default = gitInstanceFactory;

// src/git/history.ts
var import_path8 = __toESM(require("path"));

// src/core/frameworks/testDiff.ts
init_cjs_shims();
function levenshteinDistance(a, b) {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j2 = 0; j2 <= b.length; j2++) matrix[j2][0] = j2;
  for (let j2 = 1; j2 <= b.length; j2++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j2 - 1] ? 0 : 1;
      matrix[j2][i] = Math.min(
        matrix[j2][i - 1] + 1,
        // deletion
        matrix[j2 - 1][i] + 1,
        // insertion
        matrix[j2 - 1][i - 1] + cost
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
  const git = esm_default(projectPath);
  try {
    const log = await git.log({ maxCount: 1 });
    return log.latest?.hash ?? null;
  } catch {
    return null;
  }
}
async function buildHistory(projectPath, testDir, framework, sinceCommit, fullHistory) {
  const git = esm_default(projectPath);
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
      const fileChanges = await getCommitFileChanges(git, commit.hash, fullHistory ? void 0 : relativeTestDir);
      const specChanges = await buildSpecChanges(
        git,
        commit.hash,
        fileChanges,
        framework,
        projectPath,
        errors,
        fullHistory ? void 0 : relativeTestDir
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
  const normalised = testDir.endsWith("/") ? testDir : testDir + "/";
  return filePath.startsWith(normalised) || import_path8.default.dirname(filePath) + "/" === normalised;
}
function mapGitStatus(status) {
  switch (status[0]) {
    case "A":
      return "added";
    case "D":
      return "deleted";
    case "M":
      return "changed";
    default:
      return null;
  }
}
async function buildSpecChanges(git, hash, fileChanges, framework, projectPath, errors, testDir) {
  const entries = [];
  for (const change of fileChanges) {
    if (!isSpecFile(change.path)) continue;
    let effectiveChange = change;
    if (change.status === "renamed" && change.oldPath && testDir) {
      const oldInTestDir = isInTestDir(change.oldPath, testDir);
      const newInTestDir = isInTestDir(change.path, testDir);
      if (!oldInTestDir && newInTestDir) {
        effectiveChange = { path: change.path, status: "added" };
      } else if (oldInTestDir && !newInTestDir) {
        effectiveChange = { path: change.oldPath, status: "deleted" };
      }
    }
    try {
      const entry = await buildSpecEntry(git, hash, effectiveChange, framework, projectPath);
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
    if (tests.length === 0) return null;
    return {
      specPath: change.path,
      fileStatus: "added",
      changes: tests.map((name) => ({ type: "added", name }))
    };
  }
  if (change.status === "deleted") {
    const content = await getFileAtCommit(git, `${hash}^`, change.path);
    const tests = extractTestNamesFromContent(content, framework);
    if (tests.length === 0) return null;
    return {
      specPath: change.path,
      fileStatus: "deleted",
      changes: tests.map((name) => ({ type: "deleted", name }))
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
    if (testChanges.length === 0) return null;
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
  const maintenanceChanges = detectMaintenanceChanges(previous, current, framework, changes);
  const allChanges = [...changes, ...maintenanceChanges];
  if (allChanges.length === 0) return null;
  return {
    specPath: change.path,
    fileStatus: "changed",
    changes: allChanges
  };
}
async function getFileAtCommit(git, ref, filePath) {
  return git.show([`${ref}:${filePath}`]);
}
function isSpecFile(filePath) {
  return /\.(spec|test)\.[jt]s$/.test(filePath);
}
function detectMaintenanceChanges(previousContent, currentContent, framework, alreadyChangedTests) {
  if (!previousContent || !currentContent) return [];
  const prevTests = extractTestsWithLinesFromContent(previousContent, framework);
  const currTests = extractTestsWithLinesFromContent(currentContent, framework);
  if (prevTests.length === 0 || currTests.length === 0) return [];
  const alreadyChangedNames = new Set(
    alreadyChangedTests.flatMap((c) => c.oldName ? [c.name, c.oldName] : [c.name])
  );
  const prevNames = new Set(prevTests.map((t) => t.name));
  const currNames = new Set(currTests.map((t) => t.name));
  const stableNames = [...currNames].filter((name) => prevNames.has(name) && !alreadyChangedNames.has(name));
  if (stableNames.length === 0) return [];
  const prevLines = previousContent.split("\n");
  const currLines = currentContent.split("\n");
  function getTestSpan(tests, name, lines) {
    const sorted2 = [...tests].sort((a, b) => a.line - b.line);
    const idx = sorted2.findIndex((t) => t.name === name);
    if (idx === -1) return "";
    const start = sorted2[idx].line - 1;
    const end = idx + 1 < sorted2.length ? sorted2[idx + 1].line - 1 : lines.length;
    return lines.slice(start, end).join("\n");
  }
  const results = [];
  for (const name of stableNames) {
    const prevSpan = getTestSpan(prevTests, name, prevLines);
    const currSpan = getTestSpan(currTests, name, currLines);
    if (prevSpan !== currSpan) {
      results.push({ type: "maintenance", name });
    }
  }
  return results;
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
      changes.push({ type: "renamed", name: renameCandidate, oldName: removedName });
      matchedAdded.add(renameCandidate);
    } else {
      changes.push({ type: "deleted", name: removedName });
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
init_cjs_shims();
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

// src/sync.ts
function getChangeKey(change, specPath) {
  const path10 = specPath ?? "";
  const oldName = change.oldName ?? "";
  return `${path10}:${change.type}:${change.name}:${oldName}`;
}
async function syncProject(options) {
  const { projectId, apiKey, dashboardUrl } = options;
  const envLocalPath = import_path9.default.join(process.cwd(), ".env.local");
  if (import_fs4.default.existsSync(envLocalPath)) {
    import_dotenv.default.config({ path: envLocalPath, debug: false });
  }
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
  let lastSyncCommit = null;
  let isFirstSync = false;
  try {
    lastSyncCommit = await getSyncMarker(dashboardUrl, apiKey, projectId);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`[sync] Warning: Could not retrieve sync marker: ${error.message}`);
    }
  }
  isFirstSync = !lastSyncCommit;
  if (isFirstSync) {
    console.log("[sync] First sync detected - creating baseline");
  } else {
    console.log(`[sync] Subsequent sync - last synced: ${lastSyncCommit.substring(0, 7)}`);
  }
  console.log("[sync] Building git history...");
  const sinceCommit = isFirstSync ? void 0 : lastSyncCommit;
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
      for (const change of spec.changes) {
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
    const removedByName = /* @__PURE__ */ new Map();
    uniqueChanges.forEach((c, i) => {
      if (c.type === "deleted") {
        const existing = removedByName.get(c.testName) ?? [];
        existing.push(i);
        removedByName.set(c.testName, existing);
      }
    });
    const suppressedRemoves = /* @__PURE__ */ new Set();
    uniqueChanges.forEach((c) => {
      if (c.type === "added") {
        const removeIndices = removedByName.get(c.testName);
        if (removeIndices) {
          const crossSpecIdx = removeIndices.find(
            (i) => !suppressedRemoves.has(i) && uniqueChanges[i].specPath !== c.specPath
          );
          if (crossSpecIdx !== void 0) {
            suppressedRemoves.add(crossSpecIdx);
          }
        }
      }
    });
    const deduplicatedChanges = uniqueChanges.filter((_2, i) => !suppressedRemoves.has(i));
    return {
      commitHash: entry.commit.hash,
      commitMessage: entry.commit.message,
      author: entry.commit.author,
      commitDate: entry.commit.date,
      changes: deduplicatedChanges.map((change) => ({
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
    await saveSyncMarker(dashboardUrl, apiKey, projectId, lastHash);
    if (isFirstSync) {
      console.log(`[sync] Created baseline: ${specs.length} files, ${totalTests} tests`);
    } else {
      console.log(`[sync] Updated sync marker: ${lastHash.substring(0, 7)}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(`[sync] Warning: Could not save sync marker: ${error.message}`);
    }
  }
}

// src/cli.ts
(0, import_dotenv2.config)({ path: ".env.local" });
async function main() {
  try {
    const projectId = process.env.PROJECT_ID;
    const apiKey = process.env.API_KEY;
    const dashboardUrl = process.env.CHRONICLE_DASHBOARD_URL || "http://localhost:3000";
    if (!projectId || !apiKey) {
      console.error("Error: PROJECT_ID and API_KEY are required");
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
if (require.main === module) {
  main();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cli
});
//# sourceMappingURL=cli.js.map