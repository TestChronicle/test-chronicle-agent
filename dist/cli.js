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

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var fs3 = require("fs");
    var path10 = require("path");
    var os2 = require("os");
    var crypto = require("crypto");
    var TIPS = [
      "\u25C8 encrypted .env [www.dotenvx.com]",
      "\u25C8 secrets for agents [www.dotenvx.com]",
      "\u2301 auth for agents [www.vestauth.com]",
      "\u2318 custom filepath { path: '/custom/path/.env' }",
      "\u2318 enable debugging { debug: true }",
      "\u2318 override existing { override: true }",
      "\u2318 suppress logs { quiet: true }",
      "\u2318 multiple files { path: ['.env.local', '.env'] }"
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
      for (let i2 = 0; i2 < length; i2++) {
        try {
          const key = keys[i2].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i2 + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message) {
      console.error(`\u26A0 ${message}`);
    }
    function _debug(message) {
      console.log(`\u2506 ${message}`);
    }
    function _log(message) {
      console.log(`\u25C7 ${message}`);
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
        _log("loading env from encrypted .env.vault");
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
          _debug("no encoding is specified (UTF-8 is used by default)");
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
            _debug(`failed to load ${path11} ${e.message}`);
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
              _debug(`failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injected env (${keysCount}) from ${shortPaths.join(",")} ${dim(`// tip: ${_getRandomTip()}`)}`);
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
        _warn(`you set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}`);
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
    var h2 = m * 60;
    var d = h2 * 24;
    var w = d * 7;
    var y2 = d * 365.25;
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
          return n5 * y2;
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
          return n5 * h2;
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
      if (msAbs >= h2) {
        return Math.round(ms2 / h2) + "h";
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
      if (msAbs >= h2) {
        return plural(ms2, msAbs, h2, "hour");
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
        for (let i2 = 0; i2 < namespace.length; i2++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i2);
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
      const c3 = "color: " + this.color;
      args.splice(1, 0, c3, "color: inherit");
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
      args.splice(lastC, 0, c3);
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
      let r2;
      try {
        r2 = exports2.storage.getItem("debug") || exports2.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r2 && typeof process !== "undefined" && "env" in process) {
        r2 = process.env.DEBUG;
      }
      return r2;
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
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_3, k3) => {
        return k3.toUpperCase();
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
        const c3 = this.color;
        const colorCode = "\x1B[3" + (c3 < 8 ? c3 : "8;5;" + c3);
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
      for (let i2 = 0; i2 < keys.length; i2++) {
        debug2.inspectOpts[keys[i2]] = exports2.inspectOpts[keys[i2]];
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
      for (var p2 in m) if (!exports2.hasOwnProperty(p2)) exports2[p2] = m[p2];
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
var Gt = (n5, t2, e) => {
  let s = n5 instanceof RegExp ? ce(n5, e) : n5, i2 = t2 instanceof RegExp ? ce(t2, e) : t2, r2 = s !== null && i2 != null && ss(s, i2, e);
  return r2 && { start: r2[0], end: r2[1], pre: e.slice(0, r2[0]), body: e.slice(r2[0] + s.length, r2[1]), post: e.slice(r2[1] + i2.length) };
};
var ce = (n5, t2) => {
  let e = t2.match(n5);
  return e ? e[0] : null;
};
var ss = (n5, t2, e) => {
  let s, i2, r2, o2, h2, a = e.indexOf(n5), l = e.indexOf(t2, a + 1), u = a;
  if (a >= 0 && l > 0) {
    if (n5 === t2) return [a, l];
    for (s = [], r2 = e.length; u >= 0 && !h2; ) {
      if (u === a) s.push(u), a = e.indexOf(n5, u + 1);
      else if (s.length === 1) {
        let c3 = s.pop();
        c3 !== void 0 && (h2 = [c3, l]);
      } else i2 = s.pop(), i2 !== void 0 && i2 < r2 && (r2 = i2, o2 = l), l = e.indexOf(t2, u + 1);
      u = a < l && a >= 0 ? a : l;
    }
    s.length && o2 !== void 0 && (h2 = [r2, o2]);
  }
  return h2;
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
  let t2 = [], e = Gt("{", "}", n5);
  if (!e) return n5.split(",");
  let { pre: s, body: i2, post: r2 } = e, o2 = s.split(",");
  o2[o2.length - 1] += "{" + i2 + "}";
  let h2 = me(r2);
  return r2.length && (o2[o2.length - 1] += h2.shift(), o2.push.apply(o2, h2)), t2.push.apply(t2, o2), t2;
}
function ge(n5, t2 = {}) {
  if (!n5) return [];
  let { max: e = ds } = t2;
  return n5.slice(0, 2) === "{}" && (n5 = "\\{\\}" + n5.slice(2)), ht(ps(n5), e, true).map(ms);
}
function gs(n5) {
  return "{" + n5 + "}";
}
function ws(n5) {
  return /^-?0\d/.test(n5);
}
function ys(n5, t2) {
  return n5 <= t2;
}
function bs(n5, t2) {
  return n5 >= t2;
}
function ht(n5, t2, e) {
  let s = [], i2 = Gt("{", "}", n5);
  if (!i2) return [n5];
  let r2 = i2.pre, o2 = i2.post.length ? ht(i2.post, t2, false) : [""];
  if (/\$$/.test(i2.pre)) for (let h2 = 0; h2 < o2.length && h2 < t2; h2++) {
    let a = r2 + "{" + i2.body + "}" + o2[h2];
    s.push(a);
  }
  else {
    let h2 = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(i2.body), a = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(i2.body), l = h2 || a, u = i2.body.indexOf(",") >= 0;
    if (!l && !u) return i2.post.match(/,(?!,).*\}/) ? (n5 = i2.pre + "{" + i2.body + qt + i2.post, ht(n5, t2, true)) : [n5];
    let c3;
    if (l) c3 = i2.body.split(/\.\./);
    else if (c3 = me(i2.body), c3.length === 1 && c3[0] !== void 0 && (c3 = ht(c3[0], t2, false).map(gs), c3.length === 1)) return o2.map((f) => i2.pre + c3[0] + f);
    let d;
    if (l && c3[0] !== void 0 && c3[1] !== void 0) {
      let f = Ht(c3[0]), m = Ht(c3[1]), p2 = Math.max(c3[0].length, c3[1].length), w = c3.length === 3 && c3[2] !== void 0 ? Math.abs(Ht(c3[2])) : 1, g = ys;
      m < f && (w *= -1, g = bs);
      let E2 = c3.some(ws);
      d = [];
      for (let y2 = f; g(y2, m); y2 += w) {
        let b2;
        if (a) b2 = String.fromCharCode(y2), b2 === "\\" && (b2 = "");
        else if (b2 = String(y2), E2) {
          let z2 = p2 - b2.length;
          if (z2 > 0) {
            let $2 = new Array(z2 + 1).join("0");
            y2 < 0 ? b2 = "-" + $2 + b2.slice(1) : b2 = $2 + b2;
          }
        }
        d.push(b2);
      }
    } else {
      d = [];
      for (let f = 0; f < c3.length; f++) d.push.apply(d, ht(c3[f], t2, false));
    }
    for (let f = 0; f < d.length; f++) for (let m = 0; m < o2.length && s.length < t2; m++) {
      let p2 = r2 + d[f] + o2[m];
      (!e || l || p2) && s.push(p2);
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
var ye = (n5, t2) => {
  let e = t2;
  if (n5.charAt(e) !== "[") throw new Error("not in a brace expression");
  let s = [], i2 = [], r2 = e + 1, o2 = false, h2 = false, a = false, l = false, u = e, c3 = "";
  t: for (; r2 < n5.length; ) {
    let p2 = n5.charAt(r2);
    if ((p2 === "!" || p2 === "^") && r2 === e + 1) {
      l = true, r2++;
      continue;
    }
    if (p2 === "]" && o2 && !a) {
      u = r2 + 1;
      break;
    }
    if (o2 = true, p2 === "\\" && !a) {
      a = true, r2++;
      continue;
    }
    if (p2 === "[" && !a) {
      for (let [w, [g, S2, E2]] of Object.entries(Ss)) if (n5.startsWith(w, r2)) {
        if (c3) return ["$.", false, n5.length - e, true];
        r2 += w.length, E2 ? i2.push(g) : s.push(g), h2 = h2 || S2;
        continue t;
      }
    }
    if (a = false, c3) {
      p2 > c3 ? s.push(lt(c3) + "-" + lt(p2)) : p2 === c3 && s.push(lt(p2)), c3 = "", r2++;
      continue;
    }
    if (n5.startsWith("-]", r2 + 1)) {
      s.push(lt(p2 + "-")), r2 += 2;
      continue;
    }
    if (n5.startsWith("-", r2 + 1)) {
      c3 = p2, r2 += 2;
      continue;
    }
    s.push(lt(p2)), r2++;
  }
  if (u < r2) return ["", false, 0, false];
  if (!s.length && !i2.length) return ["$.", false, n5.length - e, true];
  if (i2.length === 0 && s.length === 1 && /^\\?.$/.test(s[0]) && !l) {
    let p2 = s[0].length === 2 ? s[0].slice(-1) : s[0];
    return [Es(p2), false, u - e, false];
  }
  let d = "[" + (l ? "^" : "") + we(s) + "]", f = "[" + (l ? "" : "^") + we(i2) + "]";
  return [s.length && i2.length ? "(" + d + "|" + f + ")" : s.length ? d : f, h2, u - e, true];
};
var W = (n5, { windowsPathsNoEscape: t2 = false, magicalBraces: e = true } = {}) => e ? t2 ? n5.replace(/\[([^\/\\])\]/g, "$1") : n5.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1") : t2 ? n5.replace(/\[([^\/\\{}])\]/g, "$1") : n5.replace(/((?!\\).|^)\[([^\/\\{}])\]/g, "$1$2").replace(/\\([^\/{}])/g, "$1");
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
  constructor(t2, e, s = {}) {
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
    this.type = t2, t2 && __privateSet(this, _s, true), __privateSet(this, _o, e), __privateSet(this, _t, __privateGet(this, _o) ? __privateGet(__privateGet(this, _o), _t) : this), __privateSet(this, _h, __privateGet(this, _t) === this ? s : __privateGet(__privateGet(this, _t), _h)), __privateSet(this, _w, __privateGet(this, _t) === this ? [] : __privateGet(__privateGet(this, _t), _w)), t2 === "!" && !__privateGet(__privateGet(this, _t), _c) && __privateGet(this, _w).push(this), __privateSet(this, _S, __privateGet(this, _o) ? __privateGet(__privateGet(this, _o), _r).length : 0);
  }
  get hasMagic() {
    if (__privateGet(this, _s) !== void 0) return __privateGet(this, _s);
    for (let t2 of __privateGet(this, _r)) if (typeof t2 != "string" && (t2.type || t2.hasMagic)) return __privateSet(this, _s, true);
    return __privateGet(this, _s);
  }
  toString() {
    return __privateGet(this, _u) !== void 0 ? __privateGet(this, _u) : this.type ? __privateSet(this, _u, this.type + "(" + __privateGet(this, _r).map((t2) => String(t2)).join("|") + ")") : __privateSet(this, _u, __privateGet(this, _r).map((t2) => String(t2)).join(""));
  }
  push(...t2) {
    for (let e of t2) if (e !== "") {
      if (typeof e != "string" && !(e instanceof _a && __privateGet(e, _o) === this)) throw new Error("invalid part: " + e);
      __privateGet(this, _r).push(e);
    }
  }
  toJSON() {
    let t2 = this.type === null ? __privateGet(this, _r).slice().map((e) => typeof e == "string" ? e : e.toJSON()) : [this.type, ...__privateGet(this, _r).map((e) => e.toJSON())];
    return this.isStart() && !this.type && t2.unshift([]), this.isEnd() && (this === __privateGet(this, _t) || __privateGet(__privateGet(this, _t), _c) && __privateGet(this, _o)?.type === "!") && t2.push({}), t2;
  }
  isStart() {
    if (__privateGet(this, _t) === this) return true;
    if (!__privateGet(this, _o)?.isStart()) return false;
    if (__privateGet(this, _S) === 0) return true;
    let t2 = __privateGet(this, _o);
    for (let e = 0; e < __privateGet(this, _S); e++) {
      let s = __privateGet(t2, _r)[e];
      if (!(s instanceof _a && s.type === "!")) return false;
    }
    return true;
  }
  isEnd() {
    if (__privateGet(this, _t) === this || __privateGet(this, _o)?.type === "!") return true;
    if (!__privateGet(this, _o)?.isEnd()) return false;
    if (!this.type) return __privateGet(this, _o)?.isEnd();
    let t2 = __privateGet(this, _o) ? __privateGet(__privateGet(this, _o), _r).length : 0;
    return __privateGet(this, _S) === t2 - 1;
  }
  copyIn(t2) {
    typeof t2 == "string" ? this.push(t2) : this.push(t2.clone(this));
  }
  clone(t2) {
    let e = new _a(this.type, t2);
    for (let s of __privateGet(this, _r)) e.copyIn(s);
    return e;
  }
  static fromGlob(t2, e = {}) {
    var _a12;
    let s = new _a(null, void 0, e);
    return __privateMethod(_a12 = _a, _n_static, i_fn).call(_a12, t2, s, 0, e), s;
  }
  toMMPattern() {
    if (this !== __privateGet(this, _t)) return __privateGet(this, _t).toMMPattern();
    let t2 = this.toString(), [e, s, i2, r2] = this.toRegExpSource();
    if (!(i2 || __privateGet(this, _s) || __privateGet(this, _h).nocase && !__privateGet(this, _h).nocaseMagicOnly && t2.toUpperCase() !== t2.toLowerCase())) return s;
    let h2 = (__privateGet(this, _h).nocase ? "i" : "") + (r2 ? "u" : "");
    return Object.assign(new RegExp(`^${e}$`, h2), { _src: e, _glob: t2 });
  }
  get options() {
    return __privateGet(this, _h);
  }
  toRegExpSource(t2) {
    let e = t2 ?? !!__privateGet(this, _h).dot;
    if (__privateGet(this, _t) === this && __privateMethod(this, _n_instances, a_fn).call(this), !this.type) {
      let a = this.isStart() && this.isEnd() && !__privateGet(this, _r).some((f) => typeof f != "string"), l = __privateGet(this, _r).map((f) => {
        var _a12;
        let [m, p2, w, g] = typeof f == "string" ? __privateMethod(_a12 = _a, _n_static, E_fn).call(_a12, f, __privateGet(this, _s), a) : f.toRegExpSource(t2);
        return __privateSet(this, _s, __privateGet(this, _s) || w), __privateSet(this, _n, __privateGet(this, _n) || g), m;
      }).join(""), u = "";
      if (this.isStart() && typeof __privateGet(this, _r)[0] == "string" && !(__privateGet(this, _r).length === 1 && Ts.has(__privateGet(this, _r)[0]))) {
        let m = Cs, p2 = e && m.has(l.charAt(0)) || l.startsWith("\\.") && m.has(l.charAt(2)) || l.startsWith("\\.\\.") && m.has(l.charAt(4)), w = !e && !t2 && m.has(l.charAt(0));
        u = p2 ? vs : w ? Ct : "";
      }
      let c3 = "";
      return this.isEnd() && __privateGet(__privateGet(this, _t), _c) && __privateGet(this, _o)?.type === "!" && (c3 = "(?:$|\\/)"), [u + l + c3, W(l), __privateSet(this, _s, !!__privateGet(this, _s)), __privateGet(this, _n)];
    }
    let s = this.type === "*" || this.type === "+", i2 = this.type === "!" ? "(?:(?!(?:" : "(?:", r2 = __privateMethod(this, _n_instances, d_fn).call(this, e);
    if (this.isStart() && this.isEnd() && !r2 && this.type !== "!") {
      let a = this.toString();
      return __privateSet(this, _r, [a]), this.type = null, __privateSet(this, _s, void 0), [a, W(this.toString()), false, false];
    }
    let o2 = !s || t2 || e || !Ct ? "" : __privateMethod(this, _n_instances, d_fn).call(this, true);
    o2 === r2 && (o2 = ""), o2 && (r2 = `(?:${r2})(?:${o2})*?`);
    let h2 = "";
    if (this.type === "!" && __privateGet(this, _f)) h2 = (this.isStart() && !e ? Ct : "") + Ee;
    else {
      let a = this.type === "!" ? "))" + (this.isStart() && !e && !t2 ? Ct : "") + Se + ")" : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && o2 ? ")" : this.type === "*" && o2 ? ")?" : `)${this.type}`;
      h2 = i2 + r2 + a;
    }
    return [h2, W(r2), __privateSet(this, _s, !!__privateGet(this, _s)), __privateGet(this, _n)];
  }
}, _t = new WeakMap(), _s = new WeakMap(), _n = new WeakMap(), _r = new WeakMap(), _o = new WeakMap(), _S = new WeakMap(), _w = new WeakMap(), _c = new WeakMap(), _h = new WeakMap(), _u = new WeakMap(), _f = new WeakMap(), _n_instances = new WeakSet(), a_fn = function() {
  if (this !== __privateGet(this, _t)) throw new Error("should only call on root");
  if (__privateGet(this, _c)) return this;
  this.toString(), __privateSet(this, _c, true);
  let t2;
  for (; t2 = __privateGet(this, _w).pop(); ) {
    if (t2.type !== "!") continue;
    let e = t2, s = __privateGet(e, _o);
    for (; s; ) {
      for (let i2 = __privateGet(e, _S) + 1; !s.type && i2 < __privateGet(s, _r).length; i2++) for (let r2 of __privateGet(t2, _r)) {
        if (typeof r2 == "string") throw new Error("string part in extglob AST??");
        r2.copyIn(__privateGet(s, _r)[i2]);
      }
      e = s, s = __privateGet(e, _o);
    }
  }
  return this;
}, _n_static = new WeakSet(), i_fn = function(t2, e, s, i2) {
  var _a12, _b5;
  let r2 = false, o2 = false, h2 = -1, a = false;
  if (e.type === null) {
    let f = s, m = "";
    for (; f < t2.length; ) {
      let p2 = t2.charAt(f++);
      if (r2 || p2 === "\\") {
        r2 = !r2, m += p2;
        continue;
      }
      if (o2) {
        f === h2 + 1 ? (p2 === "^" || p2 === "!") && (a = true) : p2 === "]" && !(f === h2 + 2 && a) && (o2 = false), m += p2;
        continue;
      } else if (p2 === "[") {
        o2 = true, h2 = f, a = false, m += p2;
        continue;
      }
      if (!i2.noext && be(p2) && t2.charAt(f) === "(") {
        e.push(m), m = "";
        let w = new _a(p2, e);
        f = __privateMethod(_a12 = _a, _n_static, i_fn).call(_a12, t2, w, f, i2), e.push(w);
        continue;
      }
      m += p2;
    }
    return e.push(m), f;
  }
  let l = s + 1, u = new _a(null, e), c3 = [], d = "";
  for (; l < t2.length; ) {
    let f = t2.charAt(l++);
    if (r2 || f === "\\") {
      r2 = !r2, d += f;
      continue;
    }
    if (o2) {
      l === h2 + 1 ? (f === "^" || f === "!") && (a = true) : f === "]" && !(l === h2 + 2 && a) && (o2 = false), d += f;
      continue;
    } else if (f === "[") {
      o2 = true, h2 = l, a = false, d += f;
      continue;
    }
    if (be(f) && t2.charAt(l) === "(") {
      u.push(d), d = "";
      let m = new _a(f, u);
      u.push(m), l = __privateMethod(_b5 = _a, _n_static, i_fn).call(_b5, t2, m, l, i2);
      continue;
    }
    if (f === "|") {
      u.push(d), d = "", c3.push(u), u = new _a(null, e);
      continue;
    }
    if (f === ")") return d === "" && __privateGet(e, _r).length === 0 && __privateSet(e, _f, true), u.push(d), d = "", e.push(...c3, u), l;
    d += f;
  }
  return e.type = null, __privateSet(e, _s, void 0), __privateSet(e, _r, [t2.substring(s - 1)]), l;
}, d_fn = function(t2) {
  return __privateGet(this, _r).map((e) => {
    if (typeof e == "string") throw new Error("string type in extglob ast??");
    let [s, i2, r2, o2] = e.toRegExpSource(t2);
    return __privateSet(this, _n, __privateGet(this, _n) || o2), s;
  }).filter((e) => !(this.isStart() && this.isEnd()) || !!e).join("|");
}, E_fn = function(t2, e, s = false) {
  let i2 = false, r2 = "", o2 = false, h2 = false;
  for (let a = 0; a < t2.length; a++) {
    let l = t2.charAt(a);
    if (i2) {
      i2 = false, r2 += (As.has(l) ? "\\" : "") + l;
      continue;
    }
    if (l === "*") {
      if (h2) continue;
      h2 = true, r2 += s && /^[*]+$/.test(t2) ? Ee : Se, e = true;
      continue;
    } else h2 = false;
    if (l === "\\") {
      a === t2.length - 1 ? r2 += "\\\\" : i2 = true;
      continue;
    }
    if (l === "[") {
      let [u, c3, d, f] = ye(t2, a);
      if (d) {
        r2 += u, o2 = o2 || c3, a += d - 1, e = e || f;
        continue;
      }
    }
    if (l === "?") {
      r2 += Kt, e = true;
      continue;
    }
    r2 += ks(l);
  }
  return [r2, W(t2), !!e, o2];
}, __privateAdd(_a, _n_static), _a);
var tt = (n5, { windowsPathsNoEscape: t2 = false, magicalBraces: e = false } = {}) => e ? t2 ? n5.replace(/[?*()[\]{}]/g, "[$&]") : n5.replace(/[?*()[\]\\{}]/g, "\\$&") : t2 ? n5.replace(/[?*()[\]]/g, "[$&]") : n5.replace(/[?*()[\]\\]/g, "\\$&");
var O = (n5, t2, e = {}) => (at(t2), !e.nocomment && t2.charAt(0) === "#" ? false : new D(t2, e).match(n5));
var Rs = /^\*+([^+@!?\*\[\(]*)$/;
var Os = (n5) => (t2) => !t2.startsWith(".") && t2.endsWith(n5);
var Fs = (n5) => (t2) => t2.endsWith(n5);
var Ds = (n5) => (n5 = n5.toLowerCase(), (t2) => !t2.startsWith(".") && t2.toLowerCase().endsWith(n5));
var Ms = (n5) => (n5 = n5.toLowerCase(), (t2) => t2.toLowerCase().endsWith(n5));
var Ns = /^\*+\.\*+$/;
var _s2 = (n5) => !n5.startsWith(".") && n5.includes(".");
var Ls = (n5) => n5 !== "." && n5 !== ".." && n5.includes(".");
var Ws = /^\.\*+$/;
var Ps = (n5) => n5 !== "." && n5 !== ".." && n5.startsWith(".");
var js = /^\*+$/;
var Is = (n5) => n5.length !== 0 && !n5.startsWith(".");
var zs = (n5) => n5.length !== 0 && n5 !== "." && n5 !== "..";
var Bs = /^\?+([^+@!?\*\[\(]*)?$/;
var Us = ([n5, t2 = ""]) => {
  let e = Ce([n5]);
  return t2 ? (t2 = t2.toLowerCase(), (s) => e(s) && s.toLowerCase().endsWith(t2)) : e;
};
var $s = ([n5, t2 = ""]) => {
  let e = Te([n5]);
  return t2 ? (t2 = t2.toLowerCase(), (s) => e(s) && s.toLowerCase().endsWith(t2)) : e;
};
var Gs = ([n5, t2 = ""]) => {
  let e = Te([n5]);
  return t2 ? (s) => e(s) && s.endsWith(t2) : e;
};
var Hs = ([n5, t2 = ""]) => {
  let e = Ce([n5]);
  return t2 ? (s) => e(s) && s.endsWith(t2) : e;
};
var Ce = ([n5]) => {
  let t2 = n5.length;
  return (e) => e.length === t2 && !e.startsWith(".");
};
var Te = ([n5]) => {
  let t2 = n5.length;
  return (e) => e.length === t2 && e !== "." && e !== "..";
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
var Js = (n5, t2 = {}) => (e) => O(e, n5, t2);
O.filter = Js;
var N = (n5, t2 = {}) => Object.assign({}, n5, t2);
var Zs = (n5) => {
  if (!n5 || typeof n5 != "object" || !Object.keys(n5).length) return O;
  let t2 = O;
  return Object.assign((s, i2, r2 = {}) => t2(s, i2, N(n5, r2)), { Minimatch: class extends t2.Minimatch {
    constructor(i2, r2 = {}) {
      super(i2, N(n5, r2));
    }
    static defaults(i2) {
      return t2.defaults(N(n5, i2)).Minimatch;
    }
  }, AST: class extends t2.AST {
    constructor(i2, r2, o2 = {}) {
      super(i2, r2, N(n5, o2));
    }
    static fromGlob(i2, r2 = {}) {
      return t2.AST.fromGlob(i2, N(n5, r2));
    }
  }, unescape: (s, i2 = {}) => t2.unescape(s, N(n5, i2)), escape: (s, i2 = {}) => t2.escape(s, N(n5, i2)), filter: (s, i2 = {}) => t2.filter(s, N(n5, i2)), defaults: (s) => t2.defaults(N(n5, s)), makeRe: (s, i2 = {}) => t2.makeRe(s, N(n5, i2)), braceExpand: (s, i2 = {}) => t2.braceExpand(s, N(n5, i2)), match: (s, i2, r2 = {}) => t2.match(s, i2, N(n5, r2)), sep: t2.sep, GLOBSTAR: A });
};
O.defaults = Zs;
var ke = (n5, t2 = {}) => (at(n5), t2.nobrace || !/\{(?:(?!\{).)*\}/.test(n5) ? [n5] : ge(n5, { max: t2.braceExpandMax }));
O.braceExpand = ke;
var Qs = (n5, t2 = {}) => new D(n5, t2).makeRe();
O.makeRe = Qs;
var ti = (n5, t2, e = {}) => {
  let s = new D(t2, e);
  return n5 = n5.filter((i2) => s.match(i2)), s.options.nonull && !n5.length && n5.push(t2), n5;
};
O.match = ti;
var ve = /[?*]|[+@!]\(.*?\)|\[|\]/;
var ei = (n5) => n5.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var D = class {
  constructor(t2, e = {}) {
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
    at(t2), e = e || {}, this.options = e, this.pattern = t2, this.platform = e.platform || Ae, this.isWindows = this.platform === "win32";
    let s = "allowWindowsEscape";
    this.windowsPathsNoEscape = !!e.windowsPathsNoEscape || e[s] === false, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!e.preserveMultipleSlashes, this.regexp = null, this.negate = false, this.nonegate = !!e.nonegate, this.comment = false, this.empty = false, this.partial = !!e.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = e.windowsNoMagicRoot !== void 0 ? e.windowsNoMagicRoot : !!(this.isWindows && this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) return true;
    for (let t2 of this.set) for (let e of t2) if (typeof e != "string") return true;
    return false;
  }
  debug(...t2) {
  }
  make() {
    let t2 = this.pattern, e = this.options;
    if (!e.nocomment && t2.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!t2) {
      this.empty = true;
      return;
    }
    this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], e.debug && (this.debug = (...r2) => console.error(...r2)), this.debug(this.pattern, this.globSet);
    let s = this.globSet.map((r2) => this.slashSplit(r2));
    this.globParts = this.preprocess(s), this.debug(this.pattern, this.globParts);
    let i2 = this.globParts.map((r2, o2, h2) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        let a = r2[0] === "" && r2[1] === "" && (r2[2] === "?" || !ve.test(r2[2])) && !ve.test(r2[3]), l = /^[a-z]:/i.test(r2[0]);
        if (a) return [...r2.slice(0, 4), ...r2.slice(4).map((u) => this.parse(u))];
        if (l) return [r2[0], ...r2.slice(1).map((u) => this.parse(u))];
      }
      return r2.map((a) => this.parse(a));
    });
    if (this.debug(this.pattern, i2), this.set = i2.filter((r2) => r2.indexOf(false) === -1), this.isWindows) for (let r2 = 0; r2 < this.set.length; r2++) {
      let o2 = this.set[r2];
      o2[0] === "" && o2[1] === "" && this.globParts[r2][2] === "?" && typeof o2[3] == "string" && /^[a-z]:$/i.test(o2[3]) && (o2[2] = "?");
    }
    this.debug(this.pattern, this.set);
  }
  preprocess(t2) {
    if (this.options.noglobstar) for (let s = 0; s < t2.length; s++) for (let i2 = 0; i2 < t2[s].length; i2++) t2[s][i2] === "**" && (t2[s][i2] = "*");
    let { optimizationLevel: e = 1 } = this.options;
    return e >= 2 ? (t2 = this.firstPhasePreProcess(t2), t2 = this.secondPhasePreProcess(t2)) : e >= 1 ? t2 = this.levelOneOptimize(t2) : t2 = this.adjascentGlobstarOptimize(t2), t2;
  }
  adjascentGlobstarOptimize(t2) {
    return t2.map((e) => {
      let s = -1;
      for (; (s = e.indexOf("**", s + 1)) !== -1; ) {
        let i2 = s;
        for (; e[i2 + 1] === "**"; ) i2++;
        i2 !== s && e.splice(s, i2 - s);
      }
      return e;
    });
  }
  levelOneOptimize(t2) {
    return t2.map((e) => (e = e.reduce((s, i2) => {
      let r2 = s[s.length - 1];
      return i2 === "**" && r2 === "**" ? s : i2 === ".." && r2 && r2 !== ".." && r2 !== "." && r2 !== "**" ? (s.pop(), s) : (s.push(i2), s);
    }, []), e.length === 0 ? [""] : e));
  }
  levelTwoFileOptimize(t2) {
    Array.isArray(t2) || (t2 = this.slashSplit(t2));
    let e = false;
    do {
      if (e = false, !this.preserveMultipleSlashes) {
        for (let i2 = 1; i2 < t2.length - 1; i2++) {
          let r2 = t2[i2];
          i2 === 1 && r2 === "" && t2[0] === "" || (r2 === "." || r2 === "") && (e = true, t2.splice(i2, 1), i2--);
        }
        t2[0] === "." && t2.length === 2 && (t2[1] === "." || t2[1] === "") && (e = true, t2.pop());
      }
      let s = 0;
      for (; (s = t2.indexOf("..", s + 1)) !== -1; ) {
        let i2 = t2[s - 1];
        i2 && i2 !== "." && i2 !== ".." && i2 !== "**" && (e = true, t2.splice(s - 1, 2), s -= 2);
      }
    } while (e);
    return t2.length === 0 ? [""] : t2;
  }
  firstPhasePreProcess(t2) {
    let e = false;
    do {
      e = false;
      for (let s of t2) {
        let i2 = -1;
        for (; (i2 = s.indexOf("**", i2 + 1)) !== -1; ) {
          let o2 = i2;
          for (; s[o2 + 1] === "**"; ) o2++;
          o2 > i2 && s.splice(i2 + 1, o2 - i2);
          let h2 = s[i2 + 1], a = s[i2 + 2], l = s[i2 + 3];
          if (h2 !== ".." || !a || a === "." || a === ".." || !l || l === "." || l === "..") continue;
          e = true, s.splice(i2, 1);
          let u = s.slice(0);
          u[i2] = "**", t2.push(u), i2--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let o2 = 1; o2 < s.length - 1; o2++) {
            let h2 = s[o2];
            o2 === 1 && h2 === "" && s[0] === "" || (h2 === "." || h2 === "") && (e = true, s.splice(o2, 1), o2--);
          }
          s[0] === "." && s.length === 2 && (s[1] === "." || s[1] === "") && (e = true, s.pop());
        }
        let r2 = 0;
        for (; (r2 = s.indexOf("..", r2 + 1)) !== -1; ) {
          let o2 = s[r2 - 1];
          if (o2 && o2 !== "." && o2 !== ".." && o2 !== "**") {
            e = true;
            let a = r2 === 1 && s[r2 + 1] === "**" ? ["."] : [];
            s.splice(r2 - 1, 2, ...a), s.length === 0 && s.push(""), r2 -= 2;
          }
        }
      }
    } while (e);
    return t2;
  }
  secondPhasePreProcess(t2) {
    for (let e = 0; e < t2.length - 1; e++) for (let s = e + 1; s < t2.length; s++) {
      let i2 = this.partsMatch(t2[e], t2[s], !this.preserveMultipleSlashes);
      if (i2) {
        t2[e] = [], t2[s] = i2;
        break;
      }
    }
    return t2.filter((e) => e.length);
  }
  partsMatch(t2, e, s = false) {
    let i2 = 0, r2 = 0, o2 = [], h2 = "";
    for (; i2 < t2.length && r2 < e.length; ) if (t2[i2] === e[r2]) o2.push(h2 === "b" ? e[r2] : t2[i2]), i2++, r2++;
    else if (s && t2[i2] === "**" && e[r2] === t2[i2 + 1]) o2.push(t2[i2]), i2++;
    else if (s && e[r2] === "**" && t2[i2] === e[r2 + 1]) o2.push(e[r2]), r2++;
    else if (t2[i2] === "*" && e[r2] && (this.options.dot || !e[r2].startsWith(".")) && e[r2] !== "**") {
      if (h2 === "b") return false;
      h2 = "a", o2.push(t2[i2]), i2++, r2++;
    } else if (e[r2] === "*" && t2[i2] && (this.options.dot || !t2[i2].startsWith(".")) && t2[i2] !== "**") {
      if (h2 === "a") return false;
      h2 = "b", o2.push(e[r2]), i2++, r2++;
    } else return false;
    return t2.length === e.length && o2;
  }
  parseNegate() {
    if (this.nonegate) return;
    let t2 = this.pattern, e = false, s = 0;
    for (let i2 = 0; i2 < t2.length && t2.charAt(i2) === "!"; i2++) e = !e, s++;
    s && (this.pattern = t2.slice(s)), this.negate = e;
  }
  matchOne(t2, e, s = false) {
    let i2 = this.options;
    if (this.isWindows) {
      let p2 = typeof t2[0] == "string" && /^[a-z]:$/i.test(t2[0]), w = !p2 && t2[0] === "" && t2[1] === "" && t2[2] === "?" && /^[a-z]:$/i.test(t2[3]), g = typeof e[0] == "string" && /^[a-z]:$/i.test(e[0]), S2 = !g && e[0] === "" && e[1] === "" && e[2] === "?" && typeof e[3] == "string" && /^[a-z]:$/i.test(e[3]), E2 = w ? 3 : p2 ? 0 : void 0, y2 = S2 ? 3 : g ? 0 : void 0;
      if (typeof E2 == "number" && typeof y2 == "number") {
        let [b2, z2] = [t2[E2], e[y2]];
        b2.toLowerCase() === z2.toLowerCase() && (e[y2] = b2, y2 > E2 ? e = e.slice(y2) : E2 > y2 && (t2 = t2.slice(E2)));
      }
    }
    let { optimizationLevel: r2 = 1 } = this.options;
    r2 >= 2 && (t2 = this.levelTwoFileOptimize(t2)), this.debug("matchOne", this, { file: t2, pattern: e }), this.debug("matchOne", t2.length, e.length);
    for (var o2 = 0, h2 = 0, a = t2.length, l = e.length; o2 < a && h2 < l; o2++, h2++) {
      this.debug("matchOne loop");
      var u = e[h2], c3 = t2[o2];
      if (this.debug(e, u, c3), u === false) return false;
      if (u === A) {
        this.debug("GLOBSTAR", [e, u, c3]);
        var d = o2, f = h2 + 1;
        if (f === l) {
          for (this.debug("** at the end"); o2 < a; o2++) if (t2[o2] === "." || t2[o2] === ".." || !i2.dot && t2[o2].charAt(0) === ".") return false;
          return true;
        }
        for (; d < a; ) {
          var m = t2[d];
          if (this.debug(`
globstar while`, t2, d, e, f, m), this.matchOne(t2.slice(d), e.slice(f), s)) return this.debug("globstar found match!", d, a, m), true;
          if (m === "." || m === ".." || !i2.dot && m.charAt(0) === ".") {
            this.debug("dot detected!", t2, d, e, f);
            break;
          }
          this.debug("globstar swallow a segment, and continue"), d++;
        }
        return !!(s && (this.debug(`
>>> no match, partial?`, t2, d, e, f), d === a));
      }
      let p2;
      if (typeof u == "string" ? (p2 = c3 === u, this.debug("string match", u, c3, p2)) : (p2 = u.test(c3), this.debug("pattern match", u, c3, p2)), !p2) return false;
    }
    if (o2 === a && h2 === l) return true;
    if (o2 === a) return s;
    if (h2 === l) return o2 === a - 1 && t2[o2] === "";
    throw new Error("wtf?");
  }
  braceExpand() {
    return ke(this.pattern, this.options);
  }
  parse(t2) {
    at(t2);
    let e = this.options;
    if (t2 === "**") return A;
    if (t2 === "") return "";
    let s, i2 = null;
    (s = t2.match(js)) ? i2 = e.dot ? zs : Is : (s = t2.match(Rs)) ? i2 = (e.nocase ? e.dot ? Ms : Ds : e.dot ? Fs : Os)(s[1]) : (s = t2.match(Bs)) ? i2 = (e.nocase ? e.dot ? $s : Us : e.dot ? Gs : Hs)(s) : (s = t2.match(Ns)) ? i2 = e.dot ? Ls : _s2 : (s = t2.match(Ws)) && (i2 = Ps);
    let r2 = Q.fromGlob(t2, this.options).toMMPattern();
    return i2 && typeof r2 == "object" && Reflect.defineProperty(r2, "test", { value: i2 }), r2;
  }
  makeRe() {
    if (this.regexp || this.regexp === false) return this.regexp;
    let t2 = this.set;
    if (!t2.length) return this.regexp = false, this.regexp;
    let e = this.options, s = e.noglobstar ? Vs : e.dot ? Ys : Xs, i2 = new Set(e.nocase ? ["i"] : []), r2 = t2.map((a) => {
      let l = a.map((c3) => {
        if (c3 instanceof RegExp) for (let d of c3.flags.split("")) i2.add(d);
        return typeof c3 == "string" ? ei(c3) : c3 === A ? A : c3._src;
      });
      l.forEach((c3, d) => {
        let f = l[d + 1], m = l[d - 1];
        c3 !== A || m === A || (m === void 0 ? f !== void 0 && f !== A ? l[d + 1] = "(?:\\/|" + s + "\\/)?" + f : l[d] = s : f === void 0 ? l[d - 1] = m + "(?:\\/|\\/" + s + ")?" : f !== A && (l[d - 1] = m + "(?:\\/|\\/" + s + "\\/)" + f, l[d + 1] = A));
      });
      let u = l.filter((c3) => c3 !== A);
      if (this.partial && u.length >= 1) {
        let c3 = [];
        for (let d = 1; d <= u.length; d++) c3.push(u.slice(0, d).join("/"));
        return "(?:" + c3.join("|") + ")";
      }
      return u.join("/");
    }).join("|"), [o2, h2] = t2.length > 1 ? ["(?:", ")"] : ["", ""];
    r2 = "^" + o2 + r2 + h2 + "$", this.partial && (r2 = "^(?:\\/|" + o2 + r2.slice(1, -1) + h2 + ")$"), this.negate && (r2 = "^(?!" + r2 + ").+$");
    try {
      this.regexp = new RegExp(r2, [...i2].join(""));
    } catch {
      this.regexp = false;
    }
    return this.regexp;
  }
  slashSplit(t2) {
    return this.preserveMultipleSlashes ? t2.split("/") : this.isWindows && /^\/\/[^\/]+/.test(t2) ? ["", ...t2.split(/\/+/)] : t2.split(/\/+/);
  }
  match(t2, e = this.partial) {
    if (this.debug("match", t2, this.pattern), this.comment) return false;
    if (this.empty) return t2 === "";
    if (t2 === "/" && e) return true;
    let s = this.options;
    this.isWindows && (t2 = t2.split("\\").join("/"));
    let i2 = this.slashSplit(t2);
    this.debug(this.pattern, "split", i2);
    let r2 = this.set;
    this.debug(this.pattern, "set", r2);
    let o2 = i2[i2.length - 1];
    if (!o2) for (let h2 = i2.length - 2; !o2 && h2 >= 0; h2--) o2 = i2[h2];
    for (let h2 = 0; h2 < r2.length; h2++) {
      let a = r2[h2], l = i2;
      if (s.matchBase && a.length === 1 && (l = [o2]), this.matchOne(l, a, e)) return s.flipNegate ? true : !this.negate;
    }
    return s.flipNegate ? false : this.negate;
  }
  static defaults(t2) {
    return O.defaults(t2).Minimatch;
  }
};
O.AST = Q;
O.Minimatch = D;
O.escape = tt;
O.unescape = W;
var si = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date;
var Oe = /* @__PURE__ */ new Set();
var Vt = typeof process == "object" && process ? process : {};
var Fe = (n5, t2, e, s) => {
  typeof Vt.emitWarning == "function" ? Vt.emitWarning(n5, t2, e, s) : console.error(`[${e}] ${t2}: ${n5}`);
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
      t2();
    }
    abort(e) {
      if (!this.signal.aborted) {
        this.signal.reason = e, this.signal.aborted = true;
        for (let s of this.signal._onabort) s(e);
        this.signal.onabort?.(e);
      }
    }
  };
  let n5 = Vt.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1", t2 = () => {
    n5 && (n5 = false, Fe("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", t2));
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
  constructor(t2, e) {
    __publicField(this, "heap");
    __publicField(this, "length");
    if (!__privateGet(_a2, _t2)) throw new TypeError("instantiate Stack using Stack.create(n)");
    this.heap = new e(t2), this.length = 0;
  }
  static create(t2) {
    let e = De(t2);
    if (!e) return [];
    __privateSet(_a2, _t2, true);
    let s = new _a2(t2, e);
    return __privateSet(_a2, _t2, false), s;
  }
  push(t2) {
    this.heap[this.length++] = t2;
  }
  pop() {
    return this.heap[--this.length];
  }
}, _t2 = new WeakMap(), __privateAdd(_a2, _t2, false), _a2);
var _a3, _b, _t3, _s3, _n2, _r2, _o2, _S2, _w2, _c3, _h2, _u2, _f2, _a4, _i, _d, _E, _b2, _p, _R, _m, _C, _T, _g, _y, _x, _A, _e, __, _Me_instances, M_fn, _k, _N, _j, _v, G_fn, _P, _L, _I, F_fn, D_fn, z_fn, B_fn, U_fn, l_fn, $_fn, W_fn, O_fn, H_fn, _c2;
var ft = (_c2 = class {
  constructor(t2) {
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
    __privateAdd(this, _P, (t2) => {
    });
    __privateAdd(this, _L, (t2, e, s) => {
    });
    __privateAdd(this, _I, (t2, e, s, i2) => {
      if (s || i2) throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
      return 0;
    });
    __publicField(this, _a3, "LRUCache");
    let { max: e = 0, ttl: s, ttlResolution: i2 = 1, ttlAutopurge: r2, updateAgeOnGet: o2, updateAgeOnHas: h2, allowStale: a, dispose: l, onInsert: u, disposeAfter: c3, noDisposeOnSet: d, noUpdateTTL: f, maxSize: m = 0, maxEntrySize: p2 = 0, sizeCalculation: w, fetchMethod: g, memoMethod: S2, noDeleteOnFetchRejection: E2, noDeleteOnStaleGet: y2, allowStaleOnFetchRejection: b2, allowStaleOnFetchAbort: z2, ignoreFetchAbort: $2, perf: J2 } = t2;
    if (J2 !== void 0 && typeof J2?.now != "function") throw new TypeError("perf option must have a now() method if specified");
    if (__privateSet(this, _c3, J2 ?? si), e !== 0 && !q(e)) throw new TypeError("max option must be a nonnegative integer");
    let Z2 = e ? De(e) : Array;
    if (!Z2) throw new Error("invalid max value: " + e);
    if (__privateSet(this, _t3, e), __privateSet(this, _s3, m), this.maxEntrySize = p2 || __privateGet(this, _s3), this.sizeCalculation = w, this.sizeCalculation) {
      if (!__privateGet(this, _s3) && !this.maxEntrySize) throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      if (typeof this.sizeCalculation != "function") throw new TypeError("sizeCalculation set to non-function");
    }
    if (S2 !== void 0 && typeof S2 != "function") throw new TypeError("memoMethod must be a function if defined");
    if (__privateSet(this, _w2, S2), g !== void 0 && typeof g != "function") throw new TypeError("fetchMethod must be a function if specified");
    if (__privateSet(this, _S2, g), __privateSet(this, _A, !!g), __privateSet(this, _f2, /* @__PURE__ */ new Map()), __privateSet(this, _a4, new Array(e).fill(void 0)), __privateSet(this, _i, new Array(e).fill(void 0)), __privateSet(this, _d, new Z2(e)), __privateSet(this, _E, new Z2(e)), __privateSet(this, _b2, 0), __privateSet(this, _p, 0), __privateSet(this, _R, ri.create(e)), __privateSet(this, _h2, 0), __privateSet(this, _u2, 0), typeof l == "function" && __privateSet(this, _n2, l), typeof u == "function" && __privateSet(this, _r2, u), typeof c3 == "function" ? (__privateSet(this, _o2, c3), __privateSet(this, _m, [])) : (__privateSet(this, _o2, void 0), __privateSet(this, _m, void 0)), __privateSet(this, _x, !!__privateGet(this, _n2)), __privateSet(this, __, !!__privateGet(this, _r2)), __privateSet(this, _e, !!__privateGet(this, _o2)), this.noDisposeOnSet = !!d, this.noUpdateTTL = !!f, this.noDeleteOnFetchRejection = !!E2, this.allowStaleOnFetchRejection = !!b2, this.allowStaleOnFetchAbort = !!z2, this.ignoreFetchAbort = !!$2, this.maxEntrySize !== 0) {
      if (__privateGet(this, _s3) !== 0 && !q(__privateGet(this, _s3))) throw new TypeError("maxSize must be a positive integer if specified");
      if (!q(this.maxEntrySize)) throw new TypeError("maxEntrySize must be a positive integer if specified");
      __privateMethod(this, _Me_instances, G_fn).call(this);
    }
    if (this.allowStale = !!a, this.noDeleteOnStaleGet = !!y2, this.updateAgeOnGet = !!o2, this.updateAgeOnHas = !!h2, this.ttlResolution = q(i2) || i2 === 0 ? i2 : 1, this.ttlAutopurge = !!r2, this.ttl = s || 0, this.ttl) {
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
  static unsafeExposeInternals(t2) {
    return { starts: __privateGet(t2, _T), ttls: __privateGet(t2, _g), autopurgeTimers: __privateGet(t2, _y), sizes: __privateGet(t2, _C), keyMap: __privateGet(t2, _f2), keyList: __privateGet(t2, _a4), valList: __privateGet(t2, _i), next: __privateGet(t2, _d), prev: __privateGet(t2, _E), get head() {
      return __privateGet(t2, _b2);
    }, get tail() {
      return __privateGet(t2, _p);
    }, free: __privateGet(t2, _R), isBackgroundFetch: (e) => {
      var _a12;
      return __privateMethod(_a12 = t2, _Me_instances, l_fn).call(_a12, e);
    }, backgroundFetch: (e, s, i2, r2) => {
      var _a12;
      return __privateMethod(_a12 = t2, _Me_instances, U_fn).call(_a12, e, s, i2, r2);
    }, moveToTail: (e) => {
      var _a12;
      return __privateMethod(_a12 = t2, _Me_instances, W_fn).call(_a12, e);
    }, indexes: (e) => {
      var _a12;
      return __privateMethod(_a12 = t2, _Me_instances, F_fn).call(_a12, e);
    }, rindexes: (e) => {
      var _a12;
      return __privateMethod(_a12 = t2, _Me_instances, D_fn).call(_a12, e);
    }, isStale: (e) => {
      var _a12;
      return __privateGet(_a12 = t2, _v).call(_a12, e);
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
  getRemainingTTL(t2) {
    return __privateGet(this, _f2).has(t2) ? 1 / 0 : 0;
  }
  *entries() {
    for (let t2 of __privateMethod(this, _Me_instances, F_fn).call(this)) __privateGet(this, _i)[t2] !== void 0 && __privateGet(this, _a4)[t2] !== void 0 && !__privateMethod(this, _Me_instances, l_fn).call(this, __privateGet(this, _i)[t2]) && (yield [__privateGet(this, _a4)[t2], __privateGet(this, _i)[t2]]);
  }
  *rentries() {
    for (let t2 of __privateMethod(this, _Me_instances, D_fn).call(this)) __privateGet(this, _i)[t2] !== void 0 && __privateGet(this, _a4)[t2] !== void 0 && !__privateMethod(this, _Me_instances, l_fn).call(this, __privateGet(this, _i)[t2]) && (yield [__privateGet(this, _a4)[t2], __privateGet(this, _i)[t2]]);
  }
  *keys() {
    for (let t2 of __privateMethod(this, _Me_instances, F_fn).call(this)) {
      let e = __privateGet(this, _a4)[t2];
      e !== void 0 && !__privateMethod(this, _Me_instances, l_fn).call(this, __privateGet(this, _i)[t2]) && (yield e);
    }
  }
  *rkeys() {
    for (let t2 of __privateMethod(this, _Me_instances, D_fn).call(this)) {
      let e = __privateGet(this, _a4)[t2];
      e !== void 0 && !__privateMethod(this, _Me_instances, l_fn).call(this, __privateGet(this, _i)[t2]) && (yield e);
    }
  }
  *values() {
    for (let t2 of __privateMethod(this, _Me_instances, F_fn).call(this)) __privateGet(this, _i)[t2] !== void 0 && !__privateMethod(this, _Me_instances, l_fn).call(this, __privateGet(this, _i)[t2]) && (yield __privateGet(this, _i)[t2]);
  }
  *rvalues() {
    for (let t2 of __privateMethod(this, _Me_instances, D_fn).call(this)) __privateGet(this, _i)[t2] !== void 0 && !__privateMethod(this, _Me_instances, l_fn).call(this, __privateGet(this, _i)[t2]) && (yield __privateGet(this, _i)[t2]);
  }
  [(_b = Symbol.iterator, _a3 = Symbol.toStringTag, _b)]() {
    return this.entries();
  }
  find(t2, e = {}) {
    for (let s of __privateMethod(this, _Me_instances, F_fn).call(this)) {
      let i2 = __privateGet(this, _i)[s], r2 = __privateMethod(this, _Me_instances, l_fn).call(this, i2) ? i2.__staleWhileFetching : i2;
      if (r2 !== void 0 && t2(r2, __privateGet(this, _a4)[s], this)) return this.get(__privateGet(this, _a4)[s], e);
    }
  }
  forEach(t2, e = this) {
    for (let s of __privateMethod(this, _Me_instances, F_fn).call(this)) {
      let i2 = __privateGet(this, _i)[s], r2 = __privateMethod(this, _Me_instances, l_fn).call(this, i2) ? i2.__staleWhileFetching : i2;
      r2 !== void 0 && t2.call(e, r2, __privateGet(this, _a4)[s], this);
    }
  }
  rforEach(t2, e = this) {
    for (let s of __privateMethod(this, _Me_instances, D_fn).call(this)) {
      let i2 = __privateGet(this, _i)[s], r2 = __privateMethod(this, _Me_instances, l_fn).call(this, i2) ? i2.__staleWhileFetching : i2;
      r2 !== void 0 && t2.call(e, r2, __privateGet(this, _a4)[s], this);
    }
  }
  purgeStale() {
    let t2 = false;
    for (let e of __privateMethod(this, _Me_instances, D_fn).call(this, { allowStale: true })) __privateGet(this, _v).call(this, e) && (__privateMethod(this, _Me_instances, O_fn).call(this, __privateGet(this, _a4)[e], "expire"), t2 = true);
    return t2;
  }
  info(t2) {
    let e = __privateGet(this, _f2).get(t2);
    if (e === void 0) return;
    let s = __privateGet(this, _i)[e], i2 = __privateMethod(this, _Me_instances, l_fn).call(this, s) ? s.__staleWhileFetching : s;
    if (i2 === void 0) return;
    let r2 = { value: i2 };
    if (__privateGet(this, _g) && __privateGet(this, _T)) {
      let o2 = __privateGet(this, _g)[e], h2 = __privateGet(this, _T)[e];
      if (o2 && h2) {
        let a = o2 - (__privateGet(this, _c3).now() - h2);
        r2.ttl = a, r2.start = Date.now();
      }
    }
    return __privateGet(this, _C) && (r2.size = __privateGet(this, _C)[e]), r2;
  }
  dump() {
    let t2 = [];
    for (let e of __privateMethod(this, _Me_instances, F_fn).call(this, { allowStale: true })) {
      let s = __privateGet(this, _a4)[e], i2 = __privateGet(this, _i)[e], r2 = __privateMethod(this, _Me_instances, l_fn).call(this, i2) ? i2.__staleWhileFetching : i2;
      if (r2 === void 0 || s === void 0) continue;
      let o2 = { value: r2 };
      if (__privateGet(this, _g) && __privateGet(this, _T)) {
        o2.ttl = __privateGet(this, _g)[e];
        let h2 = __privateGet(this, _c3).now() - __privateGet(this, _T)[e];
        o2.start = Math.floor(Date.now() - h2);
      }
      __privateGet(this, _C) && (o2.size = __privateGet(this, _C)[e]), t2.unshift([s, o2]);
    }
    return t2;
  }
  load(t2) {
    this.clear();
    for (let [e, s] of t2) {
      if (s.start) {
        let i2 = Date.now() - s.start;
        s.start = __privateGet(this, _c3).now() - i2;
      }
      this.set(e, s.value, s);
    }
  }
  set(t2, e, s = {}) {
    var _a12, _b5, _c7, _d4;
    if (e === void 0) return this.delete(t2), this;
    let { ttl: i2 = this.ttl, start: r2, noDisposeOnSet: o2 = this.noDisposeOnSet, sizeCalculation: h2 = this.sizeCalculation, status: a } = s, { noUpdateTTL: l = this.noUpdateTTL } = s, u = __privateGet(this, _I).call(this, t2, e, s.size || 0, h2);
    if (this.maxEntrySize && u > this.maxEntrySize) return a && (a.set = "miss", a.maxEntrySizeExceeded = true), __privateMethod(this, _Me_instances, O_fn).call(this, t2, "set"), this;
    let c3 = __privateGet(this, _h2) === 0 ? void 0 : __privateGet(this, _f2).get(t2);
    if (c3 === void 0) c3 = __privateGet(this, _h2) === 0 ? __privateGet(this, _p) : __privateGet(this, _R).length !== 0 ? __privateGet(this, _R).pop() : __privateGet(this, _h2) === __privateGet(this, _t3) ? __privateMethod(this, _Me_instances, B_fn).call(this, false) : __privateGet(this, _h2), __privateGet(this, _a4)[c3] = t2, __privateGet(this, _i)[c3] = e, __privateGet(this, _f2).set(t2, c3), __privateGet(this, _d)[__privateGet(this, _p)] = c3, __privateGet(this, _E)[c3] = __privateGet(this, _p), __privateSet(this, _p, c3), __privateWrapper(this, _h2)._++, __privateGet(this, _L).call(this, c3, u, a), a && (a.set = "add"), l = false, __privateGet(this, __) && ((_a12 = __privateGet(this, _r2)) == null ? void 0 : _a12.call(this, e, t2, "add"));
    else {
      __privateMethod(this, _Me_instances, W_fn).call(this, c3);
      let d = __privateGet(this, _i)[c3];
      if (e !== d) {
        if (__privateGet(this, _A) && __privateMethod(this, _Me_instances, l_fn).call(this, d)) {
          d.__abortController.abort(new Error("replaced"));
          let { __staleWhileFetching: f } = d;
          f !== void 0 && !o2 && (__privateGet(this, _x) && ((_b5 = __privateGet(this, _n2)) == null ? void 0 : _b5.call(this, f, t2, "set")), __privateGet(this, _e) && __privateGet(this, _m)?.push([f, t2, "set"]));
        } else o2 || (__privateGet(this, _x) && ((_c7 = __privateGet(this, _n2)) == null ? void 0 : _c7.call(this, d, t2, "set")), __privateGet(this, _e) && __privateGet(this, _m)?.push([d, t2, "set"]));
        if (__privateGet(this, _P).call(this, c3), __privateGet(this, _L).call(this, c3, u, a), __privateGet(this, _i)[c3] = e, a) {
          a.set = "replace";
          let f = d && __privateMethod(this, _Me_instances, l_fn).call(this, d) ? d.__staleWhileFetching : d;
          f !== void 0 && (a.oldValue = f);
        }
      } else a && (a.set = "update");
      __privateGet(this, __) && this.onInsert?.(e, t2, e === d ? "update" : "replace");
    }
    if (i2 !== 0 && !__privateGet(this, _g) && __privateMethod(this, _Me_instances, M_fn).call(this), __privateGet(this, _g) && (l || __privateGet(this, _j).call(this, c3, i2, r2), a && __privateGet(this, _N).call(this, a, c3)), !o2 && __privateGet(this, _e) && __privateGet(this, _m)) {
      let d = __privateGet(this, _m), f;
      for (; f = d?.shift(); ) (_d4 = __privateGet(this, _o2)) == null ? void 0 : _d4.call(this, ...f);
    }
    return this;
  }
  pop() {
    var _a12;
    try {
      for (; __privateGet(this, _h2); ) {
        let t2 = __privateGet(this, _i)[__privateGet(this, _b2)];
        if (__privateMethod(this, _Me_instances, B_fn).call(this, true), __privateMethod(this, _Me_instances, l_fn).call(this, t2)) {
          if (t2.__staleWhileFetching) return t2.__staleWhileFetching;
        } else if (t2 !== void 0) return t2;
      }
    } finally {
      if (__privateGet(this, _e) && __privateGet(this, _m)) {
        let t2 = __privateGet(this, _m), e;
        for (; e = t2?.shift(); ) (_a12 = __privateGet(this, _o2)) == null ? void 0 : _a12.call(this, ...e);
      }
    }
  }
  has(t2, e = {}) {
    let { updateAgeOnHas: s = this.updateAgeOnHas, status: i2 } = e, r2 = __privateGet(this, _f2).get(t2);
    if (r2 !== void 0) {
      let o2 = __privateGet(this, _i)[r2];
      if (__privateMethod(this, _Me_instances, l_fn).call(this, o2) && o2.__staleWhileFetching === void 0) return false;
      if (__privateGet(this, _v).call(this, r2)) i2 && (i2.has = "stale", __privateGet(this, _N).call(this, i2, r2));
      else return s && __privateGet(this, _k).call(this, r2), i2 && (i2.has = "hit", __privateGet(this, _N).call(this, i2, r2)), true;
    } else i2 && (i2.has = "miss");
    return false;
  }
  peek(t2, e = {}) {
    let { allowStale: s = this.allowStale } = e, i2 = __privateGet(this, _f2).get(t2);
    if (i2 === void 0 || !s && __privateGet(this, _v).call(this, i2)) return;
    let r2 = __privateGet(this, _i)[i2];
    return __privateMethod(this, _Me_instances, l_fn).call(this, r2) ? r2.__staleWhileFetching : r2;
  }
  async fetch(t2, e = {}) {
    let { allowStale: s = this.allowStale, updateAgeOnGet: i2 = this.updateAgeOnGet, noDeleteOnStaleGet: r2 = this.noDeleteOnStaleGet, ttl: o2 = this.ttl, noDisposeOnSet: h2 = this.noDisposeOnSet, size: a = 0, sizeCalculation: l = this.sizeCalculation, noUpdateTTL: u = this.noUpdateTTL, noDeleteOnFetchRejection: c3 = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection: d = this.allowStaleOnFetchRejection, ignoreFetchAbort: f = this.ignoreFetchAbort, allowStaleOnFetchAbort: m = this.allowStaleOnFetchAbort, context: p2, forceRefresh: w = false, status: g, signal: S2 } = e;
    if (!__privateGet(this, _A)) return g && (g.fetch = "get"), this.get(t2, { allowStale: s, updateAgeOnGet: i2, noDeleteOnStaleGet: r2, status: g });
    let E2 = { allowStale: s, updateAgeOnGet: i2, noDeleteOnStaleGet: r2, ttl: o2, noDisposeOnSet: h2, size: a, sizeCalculation: l, noUpdateTTL: u, noDeleteOnFetchRejection: c3, allowStaleOnFetchRejection: d, allowStaleOnFetchAbort: m, ignoreFetchAbort: f, status: g, signal: S2 }, y2 = __privateGet(this, _f2).get(t2);
    if (y2 === void 0) {
      g && (g.fetch = "miss");
      let b2 = __privateMethod(this, _Me_instances, U_fn).call(this, t2, y2, E2, p2);
      return b2.__returned = b2;
    } else {
      let b2 = __privateGet(this, _i)[y2];
      if (__privateMethod(this, _Me_instances, l_fn).call(this, b2)) {
        let Z2 = s && b2.__staleWhileFetching !== void 0;
        return g && (g.fetch = "inflight", Z2 && (g.returnedStale = true)), Z2 ? b2.__staleWhileFetching : b2.__returned = b2;
      }
      let z2 = __privateGet(this, _v).call(this, y2);
      if (!w && !z2) return g && (g.fetch = "hit"), __privateMethod(this, _Me_instances, W_fn).call(this, y2), i2 && __privateGet(this, _k).call(this, y2), g && __privateGet(this, _N).call(this, g, y2), b2;
      let $2 = __privateMethod(this, _Me_instances, U_fn).call(this, t2, y2, E2, p2), J2 = $2.__staleWhileFetching !== void 0 && s;
      return g && (g.fetch = z2 ? "stale" : "refresh", J2 && z2 && (g.returnedStale = true)), J2 ? $2.__staleWhileFetching : $2.__returned = $2;
    }
  }
  async forceFetch(t2, e = {}) {
    let s = await this.fetch(t2, e);
    if (s === void 0) throw new Error("fetch() returned undefined");
    return s;
  }
  memo(t2, e = {}) {
    let s = __privateGet(this, _w2);
    if (!s) throw new Error("no memoMethod provided to constructor");
    let { context: i2, forceRefresh: r2, ...o2 } = e, h2 = this.get(t2, o2);
    if (!r2 && h2 !== void 0) return h2;
    let a = s(t2, h2, { options: o2, context: i2 });
    return this.set(t2, a, o2), a;
  }
  get(t2, e = {}) {
    let { allowStale: s = this.allowStale, updateAgeOnGet: i2 = this.updateAgeOnGet, noDeleteOnStaleGet: r2 = this.noDeleteOnStaleGet, status: o2 } = e, h2 = __privateGet(this, _f2).get(t2);
    if (h2 !== void 0) {
      let a = __privateGet(this, _i)[h2], l = __privateMethod(this, _Me_instances, l_fn).call(this, a);
      return o2 && __privateGet(this, _N).call(this, o2, h2), __privateGet(this, _v).call(this, h2) ? (o2 && (o2.get = "stale"), l ? (o2 && s && a.__staleWhileFetching !== void 0 && (o2.returnedStale = true), s ? a.__staleWhileFetching : void 0) : (r2 || __privateMethod(this, _Me_instances, O_fn).call(this, t2, "expire"), o2 && s && (o2.returnedStale = true), s ? a : void 0)) : (o2 && (o2.get = "hit"), l ? a.__staleWhileFetching : (__privateMethod(this, _Me_instances, W_fn).call(this, h2), i2 && __privateGet(this, _k).call(this, h2), a));
    } else o2 && (o2.get = "miss");
  }
  delete(t2) {
    return __privateMethod(this, _Me_instances, O_fn).call(this, t2, "delete");
  }
  clear() {
    return __privateMethod(this, _Me_instances, H_fn).call(this, "delete");
  }
}, _t3 = new WeakMap(), _s3 = new WeakMap(), _n2 = new WeakMap(), _r2 = new WeakMap(), _o2 = new WeakMap(), _S2 = new WeakMap(), _w2 = new WeakMap(), _c3 = new WeakMap(), _h2 = new WeakMap(), _u2 = new WeakMap(), _f2 = new WeakMap(), _a4 = new WeakMap(), _i = new WeakMap(), _d = new WeakMap(), _E = new WeakMap(), _b2 = new WeakMap(), _p = new WeakMap(), _R = new WeakMap(), _m = new WeakMap(), _C = new WeakMap(), _T = new WeakMap(), _g = new WeakMap(), _y = new WeakMap(), _x = new WeakMap(), _A = new WeakMap(), _e = new WeakMap(), __ = new WeakMap(), _Me_instances = new WeakSet(), M_fn = function() {
  let t2 = new Tt(__privateGet(this, _t3)), e = new Tt(__privateGet(this, _t3));
  __privateSet(this, _g, t2), __privateSet(this, _T, e);
  let s = this.ttlAutopurge ? new Array(__privateGet(this, _t3)) : void 0;
  __privateSet(this, _y, s), __privateSet(this, _j, (o2, h2, a = __privateGet(this, _c3).now()) => {
    if (e[o2] = h2 !== 0 ? a : 0, t2[o2] = h2, s?.[o2] && (clearTimeout(s[o2]), s[o2] = void 0), h2 !== 0 && s) {
      let l = setTimeout(() => {
        __privateGet(this, _v).call(this, o2) && __privateMethod(this, _Me_instances, O_fn).call(this, __privateGet(this, _a4)[o2], "expire");
      }, h2 + 1);
      l.unref && l.unref(), s[o2] = l;
    }
  }), __privateSet(this, _k, (o2) => {
    e[o2] = t2[o2] !== 0 ? __privateGet(this, _c3).now() : 0;
  }), __privateSet(this, _N, (o2, h2) => {
    if (t2[h2]) {
      let a = t2[h2], l = e[h2];
      if (!a || !l) return;
      o2.ttl = a, o2.start = l, o2.now = i2 || r2();
      let u = o2.now - l;
      o2.remainingTTL = a - u;
    }
  });
  let i2 = 0, r2 = () => {
    let o2 = __privateGet(this, _c3).now();
    if (this.ttlResolution > 0) {
      i2 = o2;
      let h2 = setTimeout(() => i2 = 0, this.ttlResolution);
      h2.unref && h2.unref();
    }
    return o2;
  };
  this.getRemainingTTL = (o2) => {
    let h2 = __privateGet(this, _f2).get(o2);
    if (h2 === void 0) return 0;
    let a = t2[h2], l = e[h2];
    if (!a || !l) return 1 / 0;
    let u = (i2 || r2()) - l;
    return a - u;
  }, __privateSet(this, _v, (o2) => {
    let h2 = e[o2], a = t2[o2];
    return !!a && !!h2 && (i2 || r2()) - h2 > a;
  });
}, _k = new WeakMap(), _N = new WeakMap(), _j = new WeakMap(), _v = new WeakMap(), G_fn = function() {
  let t2 = new Tt(__privateGet(this, _t3));
  __privateSet(this, _u2, 0), __privateSet(this, _C, t2), __privateSet(this, _P, (e) => {
    __privateSet(this, _u2, __privateGet(this, _u2) - t2[e]), t2[e] = 0;
  }), __privateSet(this, _I, (e, s, i2, r2) => {
    if (__privateMethod(this, _Me_instances, l_fn).call(this, s)) return 0;
    if (!q(i2)) if (r2) {
      if (typeof r2 != "function") throw new TypeError("sizeCalculation must be a function");
      if (i2 = r2(s, e), !q(i2)) throw new TypeError("sizeCalculation return invalid (expect positive integer)");
    } else throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
    return i2;
  }), __privateSet(this, _L, (e, s, i2) => {
    if (t2[e] = s, __privateGet(this, _s3)) {
      let r2 = __privateGet(this, _s3) - t2[e];
      for (; __privateGet(this, _u2) > r2; ) __privateMethod(this, _Me_instances, B_fn).call(this, true);
    }
    __privateSet(this, _u2, __privateGet(this, _u2) + t2[e]), i2 && (i2.entrySize = s, i2.totalCalculatedSize = __privateGet(this, _u2));
  });
}, _P = new WeakMap(), _L = new WeakMap(), _I = new WeakMap(), F_fn = function* ({ allowStale: t2 = this.allowStale } = {}) {
  if (__privateGet(this, _h2)) for (let e = __privateGet(this, _p); !(!__privateMethod(this, _Me_instances, z_fn).call(this, e) || ((t2 || !__privateGet(this, _v).call(this, e)) && (yield e), e === __privateGet(this, _b2))); ) e = __privateGet(this, _E)[e];
}, D_fn = function* ({ allowStale: t2 = this.allowStale } = {}) {
  if (__privateGet(this, _h2)) for (let e = __privateGet(this, _b2); !(!__privateMethod(this, _Me_instances, z_fn).call(this, e) || ((t2 || !__privateGet(this, _v).call(this, e)) && (yield e), e === __privateGet(this, _p))); ) e = __privateGet(this, _d)[e];
}, z_fn = function(t2) {
  return t2 !== void 0 && __privateGet(this, _f2).get(__privateGet(this, _a4)[t2]) === t2;
}, B_fn = function(t2) {
  var _a12;
  let e = __privateGet(this, _b2), s = __privateGet(this, _a4)[e], i2 = __privateGet(this, _i)[e];
  return __privateGet(this, _A) && __privateMethod(this, _Me_instances, l_fn).call(this, i2) ? i2.__abortController.abort(new Error("evicted")) : (__privateGet(this, _x) || __privateGet(this, _e)) && (__privateGet(this, _x) && ((_a12 = __privateGet(this, _n2)) == null ? void 0 : _a12.call(this, i2, s, "evict")), __privateGet(this, _e) && __privateGet(this, _m)?.push([i2, s, "evict"])), __privateGet(this, _P).call(this, e), __privateGet(this, _y)?.[e] && (clearTimeout(__privateGet(this, _y)[e]), __privateGet(this, _y)[e] = void 0), t2 && (__privateGet(this, _a4)[e] = void 0, __privateGet(this, _i)[e] = void 0, __privateGet(this, _R).push(e)), __privateGet(this, _h2) === 1 ? (__privateSet(this, _b2, __privateSet(this, _p, 0)), __privateGet(this, _R).length = 0) : __privateSet(this, _b2, __privateGet(this, _d)[e]), __privateGet(this, _f2).delete(s), __privateWrapper(this, _h2)._--, e;
}, U_fn = function(t2, e, s, i2) {
  let r2 = e === void 0 ? void 0 : __privateGet(this, _i)[e];
  if (__privateMethod(this, _Me_instances, l_fn).call(this, r2)) return r2;
  let o2 = new At(), { signal: h2 } = s;
  h2?.addEventListener("abort", () => o2.abort(h2.reason), { signal: o2.signal });
  let a = { signal: o2.signal, options: s, context: i2 }, l = (p2, w = false) => {
    let { aborted: g } = o2.signal, S2 = s.ignoreFetchAbort && p2 !== void 0, E2 = s.ignoreFetchAbort || !!(s.allowStaleOnFetchAbort && p2 !== void 0);
    if (s.status && (g && !w ? (s.status.fetchAborted = true, s.status.fetchError = o2.signal.reason, S2 && (s.status.fetchAbortIgnored = true)) : s.status.fetchResolved = true), g && !S2 && !w) return c3(o2.signal.reason, E2);
    let y2 = f, b2 = __privateGet(this, _i)[e];
    return (b2 === f || S2 && w && b2 === void 0) && (p2 === void 0 ? y2.__staleWhileFetching !== void 0 ? __privateGet(this, _i)[e] = y2.__staleWhileFetching : __privateMethod(this, _Me_instances, O_fn).call(this, t2, "fetch") : (s.status && (s.status.fetchUpdated = true), this.set(t2, p2, a.options))), p2;
  }, u = (p2) => (s.status && (s.status.fetchRejected = true, s.status.fetchError = p2), c3(p2, false)), c3 = (p2, w) => {
    let { aborted: g } = o2.signal, S2 = g && s.allowStaleOnFetchAbort, E2 = S2 || s.allowStaleOnFetchRejection, y2 = E2 || s.noDeleteOnFetchRejection, b2 = f;
    if (__privateGet(this, _i)[e] === f && (!y2 || !w && b2.__staleWhileFetching === void 0 ? __privateMethod(this, _Me_instances, O_fn).call(this, t2, "fetch") : S2 || (__privateGet(this, _i)[e] = b2.__staleWhileFetching)), E2) return s.status && b2.__staleWhileFetching !== void 0 && (s.status.returnedStale = true), b2.__staleWhileFetching;
    if (b2.__returned === b2) throw p2;
  }, d = (p2, w) => {
    var _a12;
    let g = (_a12 = __privateGet(this, _S2)) == null ? void 0 : _a12.call(this, t2, r2, a);
    g && g instanceof Promise && g.then((S2) => p2(S2 === void 0 ? void 0 : S2), w), o2.signal.addEventListener("abort", () => {
      (!s.ignoreFetchAbort || s.allowStaleOnFetchAbort) && (p2(void 0), s.allowStaleOnFetchAbort && (p2 = (S2) => l(S2, true)));
    });
  };
  s.status && (s.status.fetchDispatched = true);
  let f = new Promise(d).then(l, u), m = Object.assign(f, { __abortController: o2, __staleWhileFetching: r2, __returned: void 0 });
  return e === void 0 ? (this.set(t2, m, { ...a.options, status: void 0 }), e = __privateGet(this, _f2).get(t2)) : __privateGet(this, _i)[e] = m, m;
}, l_fn = function(t2) {
  if (!__privateGet(this, _A)) return false;
  let e = t2;
  return !!e && e instanceof Promise && e.hasOwnProperty("__staleWhileFetching") && e.__abortController instanceof At;
}, $_fn = function(t2, e) {
  __privateGet(this, _E)[e] = t2, __privateGet(this, _d)[t2] = e;
}, W_fn = function(t2) {
  t2 !== __privateGet(this, _p) && (t2 === __privateGet(this, _b2) ? __privateSet(this, _b2, __privateGet(this, _d)[t2]) : __privateMethod(this, _Me_instances, $_fn).call(this, __privateGet(this, _E)[t2], __privateGet(this, _d)[t2]), __privateMethod(this, _Me_instances, $_fn).call(this, __privateGet(this, _p), t2), __privateSet(this, _p, t2));
}, O_fn = function(t2, e) {
  var _a12, _b5;
  let s = false;
  if (__privateGet(this, _h2) !== 0) {
    let i2 = __privateGet(this, _f2).get(t2);
    if (i2 !== void 0) if (__privateGet(this, _y)?.[i2] && (clearTimeout(__privateGet(this, _y)?.[i2]), __privateGet(this, _y)[i2] = void 0), s = true, __privateGet(this, _h2) === 1) __privateMethod(this, _Me_instances, H_fn).call(this, e);
    else {
      __privateGet(this, _P).call(this, i2);
      let r2 = __privateGet(this, _i)[i2];
      if (__privateMethod(this, _Me_instances, l_fn).call(this, r2) ? r2.__abortController.abort(new Error("deleted")) : (__privateGet(this, _x) || __privateGet(this, _e)) && (__privateGet(this, _x) && ((_a12 = __privateGet(this, _n2)) == null ? void 0 : _a12.call(this, r2, t2, e)), __privateGet(this, _e) && __privateGet(this, _m)?.push([r2, t2, e])), __privateGet(this, _f2).delete(t2), __privateGet(this, _a4)[i2] = void 0, __privateGet(this, _i)[i2] = void 0, i2 === __privateGet(this, _p)) __privateSet(this, _p, __privateGet(this, _E)[i2]);
      else if (i2 === __privateGet(this, _b2)) __privateSet(this, _b2, __privateGet(this, _d)[i2]);
      else {
        let o2 = __privateGet(this, _E)[i2];
        __privateGet(this, _d)[o2] = __privateGet(this, _d)[i2];
        let h2 = __privateGet(this, _d)[i2];
        __privateGet(this, _E)[h2] = __privateGet(this, _E)[i2];
      }
      __privateWrapper(this, _h2)._--, __privateGet(this, _R).push(i2);
    }
  }
  if (__privateGet(this, _e) && __privateGet(this, _m)?.length) {
    let i2 = __privateGet(this, _m), r2;
    for (; r2 = i2?.shift(); ) (_b5 = __privateGet(this, _o2)) == null ? void 0 : _b5.call(this, ...r2);
  }
  return s;
}, H_fn = function(t2) {
  var _a12, _b5;
  for (let e of __privateMethod(this, _Me_instances, D_fn).call(this, { allowStale: true })) {
    let s = __privateGet(this, _i)[e];
    if (__privateMethod(this, _Me_instances, l_fn).call(this, s)) s.__abortController.abort(new Error("deleted"));
    else {
      let i2 = __privateGet(this, _a4)[e];
      __privateGet(this, _x) && ((_a12 = __privateGet(this, _n2)) == null ? void 0 : _a12.call(this, s, i2, t2)), __privateGet(this, _e) && __privateGet(this, _m)?.push([s, i2, t2]);
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
  constructor(t2, e, s) {
    __publicField(this, "src");
    __publicField(this, "dest");
    __publicField(this, "opts");
    __publicField(this, "ondrain");
    this.src = t2, this.dest = e, this.opts = s, this.ondrain = () => t2[st](), this.dest.on("drain", this.ondrain);
  }
  unpipe() {
    this.dest.removeListener("drain", this.ondrain);
  }
  proxyErrors(t2) {
  }
  end() {
    this.unpipe(), this.opts.end && this.dest.end();
  }
};
var te = class extends Mt {
  unpipe() {
    this.src.removeListener("error", this.proxyErrors), super.unpipe();
  }
  constructor(t2, e, s) {
    super(t2, e, s), this.proxyErrors = (i2) => this.dest.emit("error", i2), t2.on("error", this.proxyErrors);
  }
};
var di = (n5) => !!n5.objectMode;
var pi = (n5) => !n5.objectMode && !!n5.encoding && n5.encoding !== "buffer";
var _a5, _b3, _c4, _d2, _e3, _f3, _g2, _h3, _i2, _j2, _k2, _l, _m2, _n3, _o3, _p2, _q, _r3, _s4;
var V = class extends import_node_events.EventEmitter {
  constructor(...t2) {
    let e = t2[0] || {};
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
  set encoding(t2) {
    throw new Error("Encoding must be set at instantiation time");
  }
  setEncoding(t2) {
    throw new Error("Encoding must be set at instantiation time");
  }
  get objectMode() {
    return this[k];
  }
  set objectMode(t2) {
    throw new Error("objectMode must be set at instantiation time");
  }
  get async() {
    return this[B];
  }
  set async(t2) {
    this[B] = this[B] || !!t2;
  }
  [(_s4 = v, _r3 = dt, _q = F, _p2 = C, _o3 = k, _n3 = P, _m2 = B, _l = et, _k2 = G, _j2 = K, _i2 = kt, _h3 = Rt, _g2 = ut, _f3 = T, _e3 = x, _d2 = pt, _c4 = Dt, _b3 = Y, _a5 = M, Qt)]() {
    this[Dt] = true, this.emit("abort", this[pt]?.reason), this.destroy(this[pt]?.reason);
  }
  get aborted() {
    return this[Dt];
  }
  set aborted(t2) {
  }
  write(t2, e, s) {
    if (this[Dt]) return false;
    if (this[G]) throw new Error("write after end");
    if (this[x]) return this.emit("error", Object.assign(new Error("Cannot call write after a stream was destroyed"), { code: "ERR_STREAM_DESTROYED" })), true;
    typeof e == "function" && (s = e, e = "utf8"), e || (e = "utf8");
    let i2 = this[B] ? mt : li;
    if (!this[k] && !Buffer.isBuffer(t2)) {
      if (ui(t2)) t2 = Buffer.from(t2.buffer, t2.byteOffset, t2.byteLength);
      else if (fi(t2)) t2 = Buffer.from(t2);
      else if (typeof t2 != "string") throw new Error("Non-contiguous data written to non-objectMode stream");
    }
    return this[k] ? (this[v] && this[T] !== 0 && this[Ot](true), this[v] ? this.emit("data", t2) : this[Yt](t2), this[T] !== 0 && this.emit("readable"), s && i2(s), this[v]) : t2.length ? (typeof t2 == "string" && !(e === this[P] && !this[et]?.lastNeed) && (t2 = Buffer.from(t2, e)), Buffer.isBuffer(t2) && this[P] && (t2 = this[et].write(t2)), this[v] && this[T] !== 0 && this[Ot](true), this[v] ? this.emit("data", t2) : this[Yt](t2), this[T] !== 0 && this.emit("readable"), s && i2(s), this[v]) : (this[T] !== 0 && this.emit("readable"), s && i2(s), this[v]);
  }
  read(t2) {
    if (this[x]) return null;
    if (this[M] = false, this[T] === 0 || t2 === 0 || t2 && t2 > this[T]) return this[H](), null;
    this[k] && (t2 = null), this[C].length > 1 && !this[k] && (this[C] = [this[P] ? this[C].join("") : Buffer.concat(this[C], this[T])]);
    let e = this[_e2](t2 || null, this[C][0]);
    return this[H](), e;
  }
  [_e2](t2, e) {
    if (this[k]) this[Ft]();
    else {
      let s = e;
      t2 === s.length || t2 === null ? this[Ft]() : typeof s == "string" ? (this[C][0] = s.slice(t2), e = s.slice(0, t2), this[T] -= t2) : (this[C][0] = s.subarray(t2), e = s.subarray(0, t2), this[T] -= t2);
    }
    return this.emit("data", e), !this[C].length && !this[G] && this.emit("drain"), e;
  }
  end(t2, e, s) {
    return typeof t2 == "function" && (s = t2, t2 = void 0), typeof e == "function" && (s = e, e = "utf8"), t2 !== void 0 && this.write(t2, e), s && this.once("end", s), this[G] = true, this.writable = false, (this[v] || !this[dt]) && this[H](), this;
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
  [Yt](t2) {
    this[k] ? this[T] += 1 : this[T] += t2.length, this[C].push(t2);
  }
  [Ft]() {
    return this[k] ? this[T] -= 1 : this[T] -= this[C][0].length, this[C].shift();
  }
  [Ot](t2 = false) {
    do
      ;
    while (this[Le](this[Ft]()) && this[C].length);
    !t2 && !this[C].length && !this[G] && this.emit("drain");
  }
  [Le](t2) {
    return this.emit("data", t2), this[v];
  }
  pipe(t2, e) {
    if (this[x]) return t2;
    this[M] = false;
    let s = this[K];
    return e = e || {}, t2 === Ne.stdout || t2 === Ne.stderr ? e.end = false : e.end = e.end !== false, e.proxyErrors = !!e.proxyErrors, s ? e.end && t2.end() : (this[F].push(e.proxyErrors ? new te(this, t2, e) : new Mt(this, t2, e)), this[B] ? mt(() => this[st]()) : this[st]()), t2;
  }
  unpipe(t2) {
    let e = this[F].find((s) => s.dest === t2);
    e && (this[F].length === 1 ? (this[v] && this[Y] === 0 && (this[v] = false), this[F] = []) : this[F].splice(this[F].indexOf(e), 1), e.unpipe());
  }
  addListener(t2, e) {
    return this.on(t2, e);
  }
  on(t2, e) {
    let s = super.on(t2, e);
    if (t2 === "data") this[M] = false, this[Y]++, !this[F].length && !this[v] && this[st]();
    else if (t2 === "readable" && this[T] !== 0) super.emit("readable");
    else if (ci(t2) && this[K]) super.emit(t2), this.removeAllListeners(t2);
    else if (t2 === "error" && this[ut]) {
      let i2 = e;
      this[B] ? mt(() => i2.call(this, this[ut])) : i2.call(this, this[ut]);
    }
    return s;
  }
  removeListener(t2, e) {
    return this.off(t2, e);
  }
  off(t2, e) {
    let s = super.off(t2, e);
    return t2 === "data" && (this[Y] = this.listeners("data").length, this[Y] === 0 && !this[M] && !this[F].length && (this[v] = false)), s;
  }
  removeAllListeners(t2) {
    let e = super.removeAllListeners(t2);
    return (t2 === "data" || t2 === void 0) && (this[Y] = 0, !this[M] && !this[F].length && (this[v] = false)), e;
  }
  get emittedEnd() {
    return this[K];
  }
  [H]() {
    !this[kt] && !this[K] && !this[x] && this[C].length === 0 && this[G] && (this[kt] = true, this.emit("end"), this.emit("prefinish"), this.emit("finish"), this[Rt] && this.emit("close"), this[kt] = false);
  }
  emit(t2, ...e) {
    let s = e[0];
    if (t2 !== "error" && t2 !== "close" && t2 !== x && this[x]) return false;
    if (t2 === "data") return !this[k] && !s ? false : this[B] ? (mt(() => this[Jt](s)), true) : this[Jt](s);
    if (t2 === "end") return this[We]();
    if (t2 === "close") {
      if (this[Rt] = true, !this[K] && !this[x]) return false;
      let r2 = super.emit("close");
      return this.removeAllListeners("close"), r2;
    } else if (t2 === "error") {
      this[ut] = s, super.emit(Xt, s);
      let r2 = !this[pt] || this.listeners("error").length ? super.emit("error", s) : false;
      return this[H](), r2;
    } else if (t2 === "resume") {
      let r2 = super.emit("resume");
      return this[H](), r2;
    } else if (t2 === "finish" || t2 === "prefinish") {
      let r2 = super.emit(t2);
      return this.removeAllListeners(t2), r2;
    }
    let i2 = super.emit(t2, ...e);
    return this[H](), i2;
  }
  [Jt](t2) {
    for (let s of this[F]) s.dest.write(t2) === false && this.pause();
    let e = this[M] ? false : super.emit("data", t2);
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
    let t2 = super.emit("end");
    return this.removeAllListeners("end"), t2;
  }
  async collect() {
    let t2 = Object.assign([], { dataLength: 0 });
    this[k] || (t2.dataLength = 0);
    let e = this.promise();
    return this.on("data", (s) => {
      t2.push(s), this[k] || (t2.dataLength += s.length);
    }), await e, t2;
  }
  async concat() {
    if (this[k]) throw new Error("cannot concat in objectMode");
    let t2 = await this.collect();
    return this[P] ? t2.join("") : Buffer.concat(t2, t2.dataLength);
  }
  async promise() {
    return new Promise((t2, e) => {
      this.on(x, () => e(new Error("stream destroyed"))), this.on("error", (s) => e(s)), this.on("end", () => t2());
    });
  }
  [Symbol.asyncIterator]() {
    this[M] = false;
    let t2 = false, e = async () => (this.pause(), t2 = true, { value: void 0, done: true });
    return { next: () => {
      if (t2) return e();
      let i2 = this.read();
      if (i2 !== null) return Promise.resolve({ done: false, value: i2 });
      if (this[G]) return e();
      let r2, o2, h2 = (c3) => {
        this.off("data", a), this.off("end", l), this.off(x, u), e(), o2(c3);
      }, a = (c3) => {
        this.off("error", h2), this.off("end", l), this.off(x, u), this.pause(), r2({ value: c3, done: !!this[G] });
      }, l = () => {
        this.off("error", h2), this.off("data", a), this.off(x, u), e(), r2({ done: true, value: void 0 });
      }, u = () => h2(new Error("stream destroyed"));
      return new Promise((c3, d) => {
        o2 = d, r2 = c3, this.once(x, u), this.once("error", h2), this.once("end", l), this.once("data", a);
      });
    }, throw: e, return: e, [Symbol.asyncIterator]() {
      return this;
    }, [Symbol.asyncDispose]: async () => {
    } };
  }
  [Symbol.iterator]() {
    this[M] = false;
    let t2 = false, e = () => (this.pause(), this.off(Xt, e), this.off(x, e), this.off("end", e), t2 = true, { done: true, value: void 0 }), s = () => {
      if (t2) return e();
      let i2 = this.read();
      return i2 === null ? e() : { done: false, value: i2 };
    };
    return this.once("end", e), this.once(Xt, e), this.once(x, e), { next: s, throw: e, return: e, [Symbol.iterator]() {
      return this;
    }, [Symbol.dispose]: () => {
    } };
  }
  destroy(t2) {
    if (this[x]) return t2 ? this.emit("error", t2) : this.emit(x), this;
    this[x] = true, this[M] = true, this[C].length = 0, this[T] = 0;
    let e = this;
    return typeof e.close == "function" && !this[Rt] && e.close(), t2 ? this.emit("error", t2) : this.emit(x), this;
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
  let t2 = ze.get(n5);
  if (t2) return t2;
  let e = n5.normalize("NFKD");
  return ze.set(n5, e), e;
};
var Be = new ft({ max: 2 ** 12 });
var _t4 = (n5) => {
  let t2 = Be.get(n5);
  if (t2) return t2;
  let e = bt(n5.toLowerCase());
  return Be.set(n5, e), e;
};
var Wt = class extends ft {
  constructor() {
    super({ max: 256 });
  }
};
var ne = class extends ft {
  constructor(t2 = 16 * 1024) {
    super({ maxSize: t2, sizeCalculation: (e) => e.length + 1 });
  }
};
var Ye = /* @__PURE__ */ Symbol("PathScurry setAsCwd");
var _t5, _s5, _n4, _r4, _o4, _S3, _w3, _c5, _h4, _u3, _f4, _a6, _i3, _d3, _E2, _b4, _p3, _R2, _m3, _C2, _T2, _g3, _y2, _x2, _A2, _e4, __2, _M, _k3, _R_instances, N_fn, j_fn, v_fn, G_fn2, P_fn, L_fn, I_fn, F_fn2, D_fn2, z_fn2, B_fn2, U_fn2, l_fn2, $_fn2, _W, _O, H_fn2, _q2, _a7;
var R = (_a7 = class {
  constructor(t2, e = L, s, i2, r2, o2, h2) {
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
    this.name = t2, __privateSet(this, _C2, r2 ? _t4(t2) : bt(t2)), __privateSet(this, _e4, e & Fi), this.nocase = r2, this.roots = i2, this.root = s || this, __privateSet(this, __2, o2), __privateSet(this, _g3, h2.fullpath), __privateSet(this, _x2, h2.relative), __privateSet(this, _A2, h2.relativePosix), this.parent = h2.parent, this.parent ? __privateSet(this, _t5, __privateGet(this.parent, _t5)) : __privateSet(this, _t5, Ue(h2.fs));
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
  resolve(t2) {
    var _a12;
    if (!t2) return this;
    let e = this.getRootString(t2), i2 = t2.substring(e.length).split(this.splitSep);
    return e ? __privateMethod(_a12 = this.getRoot(e), _R_instances, N_fn).call(_a12, i2) : __privateMethod(this, _R_instances, N_fn).call(this, i2);
  }
  children() {
    let t2 = __privateGet(this, __2).get(this);
    if (t2) return t2;
    let e = Object.assign([], { provisional: 0 });
    return __privateGet(this, __2).set(this, e), __privateSet(this, _e4, __privateGet(this, _e4) & ~se), e;
  }
  child(t2, e) {
    if (t2 === "" || t2 === ".") return this;
    if (t2 === "..") return this.parent || this;
    let s = this.children(), i2 = this.nocase ? _t4(t2) : bt(t2);
    for (let a of s) if (__privateGet(a, _C2) === i2) return a;
    let r2 = this.parent ? this.sep : "", o2 = __privateGet(this, _g3) ? __privateGet(this, _g3) + r2 + t2 : void 0, h2 = this.newChild(t2, L, { ...e, parent: this, fullpath: o2 });
    return this.canReaddir() || __privateSet(h2, _e4, __privateGet(h2, _e4) | j), s.push(h2), h2;
  }
  relative() {
    if (this.isCWD) return "";
    if (__privateGet(this, _x2) !== void 0) return __privateGet(this, _x2);
    let t2 = this.name, e = this.parent;
    if (!e) return __privateSet(this, _x2, this.name);
    let s = e.relative();
    return s + (!s || !e.parent ? "" : this.sep) + t2;
  }
  relativePosix() {
    if (this.sep === "/") return this.relative();
    if (this.isCWD) return "";
    if (__privateGet(this, _A2) !== void 0) return __privateGet(this, _A2);
    let t2 = this.name, e = this.parent;
    if (!e) return __privateSet(this, _A2, this.fullpathPosix());
    let s = e.relativePosix();
    return s + (!s || !e.parent ? "" : "/") + t2;
  }
  fullpath() {
    if (__privateGet(this, _g3) !== void 0) return __privateGet(this, _g3);
    let t2 = this.name, e = this.parent;
    if (!e) return __privateSet(this, _g3, this.name);
    let i2 = e.fullpath() + (e.parent ? this.sep : "") + t2;
    return __privateSet(this, _g3, i2);
  }
  fullpathPosix() {
    if (__privateGet(this, _y2) !== void 0) return __privateGet(this, _y2);
    if (this.sep === "/") return __privateSet(this, _y2, this.fullpath());
    if (!this.parent) {
      let i2 = this.fullpath().replace(/\\/g, "/");
      return /^[a-z]:\//i.test(i2) ? __privateSet(this, _y2, `//?/${i2}`) : __privateSet(this, _y2, i2);
    }
    let t2 = this.parent, e = t2.fullpathPosix(), s = e + (!e || !t2.parent ? "" : "/") + this.name;
    return __privateSet(this, _y2, s);
  }
  isUnknown() {
    return (__privateGet(this, _e4) & _) === L;
  }
  isType(t2) {
    return this[`is${t2}`]();
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
    let t2 = this.children();
    return t2.slice(0, t2.provisional);
  }
  canReadlink() {
    if (__privateGet(this, _M)) return true;
    if (!this.parent) return false;
    let t2 = __privateGet(this, _e4) & _;
    return !(t2 !== L && t2 !== X || __privateGet(this, _e4) & Nt || __privateGet(this, _e4) & j);
  }
  calledReaddir() {
    return !!(__privateGet(this, _e4) & se);
  }
  isENOENT() {
    return !!(__privateGet(this, _e4) & j);
  }
  isNamed(t2) {
    return this.nocase ? __privateGet(this, _C2) === _t4(t2) : __privateGet(this, _C2) === bt(t2);
  }
  async readlink() {
    let t2 = __privateGet(this, _M);
    if (t2) return t2;
    if (this.canReadlink() && this.parent) try {
      let e = await __privateGet(this, _t5).promises.readlink(this.fullpath()), s = (await this.parent.realpath())?.resolve(e);
      if (s) return __privateSet(this, _M, s);
    } catch (e) {
      __privateMethod(this, _R_instances, D_fn2).call(this, e.code);
      return;
    }
  }
  readlinkSync() {
    let t2 = __privateGet(this, _M);
    if (t2) return t2;
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
    } catch (t2) {
      __privateMethod(this, _R_instances, F_fn2).call(this, t2.code);
    }
  }
  lstatSync() {
    if ((__privateGet(this, _e4) & j) === 0) try {
      return __privateMethod(this, _R_instances, $_fn2).call(this, __privateGet(this, _t5).lstatSync(this.fullpath())), this;
    } catch (t2) {
      __privateMethod(this, _R_instances, F_fn2).call(this, t2.code);
    }
  }
  readdirCB(t2, e = false) {
    if (!this.canReaddir()) {
      e ? t2(null, []) : queueMicrotask(() => t2(null, []));
      return;
    }
    let s = this.children();
    if (this.calledReaddir()) {
      let r2 = s.slice(0, s.provisional);
      e ? t2(null, r2) : queueMicrotask(() => t2(null, r2));
      return;
    }
    if (__privateGet(this, _W).push(t2), __privateGet(this, _O)) return;
    __privateSet(this, _O, true);
    let i2 = this.fullpath();
    __privateGet(this, _t5).readdir(i2, { withFileTypes: true }, (r2, o2) => {
      if (r2) __privateMethod(this, _R_instances, I_fn).call(this, r2.code), s.provisional = 0;
      else {
        for (let h2 of o2) __privateMethod(this, _R_instances, z_fn2).call(this, h2, s);
        __privateMethod(this, _R_instances, j_fn).call(this, s);
      }
      __privateMethod(this, _R_instances, H_fn2).call(this, s.slice(0, s.provisional));
    });
  }
  async readdir() {
    if (!this.canReaddir()) return [];
    let t2 = this.children();
    if (this.calledReaddir()) return t2.slice(0, t2.provisional);
    let e = this.fullpath();
    if (__privateGet(this, _q2)) await __privateGet(this, _q2);
    else {
      let s = () => {
      };
      __privateSet(this, _q2, new Promise((i2) => s = i2));
      try {
        for (let i2 of await __privateGet(this, _t5).promises.readdir(e, { withFileTypes: true })) __privateMethod(this, _R_instances, z_fn2).call(this, i2, t2);
        __privateMethod(this, _R_instances, j_fn).call(this, t2);
      } catch (i2) {
        __privateMethod(this, _R_instances, I_fn).call(this, i2.code), t2.provisional = 0;
      }
      __privateSet(this, _q2, void 0), s();
    }
    return t2.slice(0, t2.provisional);
  }
  readdirSync() {
    if (!this.canReaddir()) return [];
    let t2 = this.children();
    if (this.calledReaddir()) return t2.slice(0, t2.provisional);
    let e = this.fullpath();
    try {
      for (let s of __privateGet(this, _t5).readdirSync(e, { withFileTypes: true })) __privateMethod(this, _R_instances, z_fn2).call(this, s, t2);
      __privateMethod(this, _R_instances, j_fn).call(this, t2);
    } catch (s) {
      __privateMethod(this, _R_instances, I_fn).call(this, s.code), t2.provisional = 0;
    }
    return t2.slice(0, t2.provisional);
  }
  canReaddir() {
    if (__privateGet(this, _e4) & Ie) return false;
    let t2 = _ & __privateGet(this, _e4);
    return t2 === L || t2 === U || t2 === X;
  }
  shouldWalk(t2, e) {
    return (__privateGet(this, _e4) & U) === U && !(__privateGet(this, _e4) & Ie) && !t2.has(this) && (!e || e(this));
  }
  async realpath() {
    if (__privateGet(this, _k3)) return __privateGet(this, _k3);
    if (!((Lt | Nt | j) & __privateGet(this, _e4))) try {
      let t2 = await __privateGet(this, _t5).promises.realpath(this.fullpath());
      return __privateSet(this, _k3, this.resolve(t2));
    } catch {
      __privateMethod(this, _R_instances, P_fn).call(this);
    }
  }
  realpathSync() {
    if (__privateGet(this, _k3)) return __privateGet(this, _k3);
    if (!((Lt | Nt | j) & __privateGet(this, _e4))) try {
      let t2 = __privateGet(this, _t5).realpathSync(this.fullpath());
      return __privateSet(this, _k3, this.resolve(t2));
    } catch {
      __privateMethod(this, _R_instances, P_fn).call(this);
    }
  }
  [Ye](t2) {
    if (t2 === this) return;
    t2.isCWD = false, this.isCWD = true;
    let e = /* @__PURE__ */ new Set([]), s = [], i2 = this;
    for (; i2 && i2.parent; ) e.add(i2), __privateSet(i2, _x2, s.join(this.sep)), __privateSet(i2, _A2, s.join("/")), i2 = i2.parent, s.push("..");
    for (i2 = t2; i2 && i2.parent && !e.has(i2); ) __privateSet(i2, _x2, void 0), __privateSet(i2, _A2, void 0), i2 = i2.parent;
  }
}, _t5 = new WeakMap(), _s5 = new WeakMap(), _n4 = new WeakMap(), _r4 = new WeakMap(), _o4 = new WeakMap(), _S3 = new WeakMap(), _w3 = new WeakMap(), _c5 = new WeakMap(), _h4 = new WeakMap(), _u3 = new WeakMap(), _f4 = new WeakMap(), _a6 = new WeakMap(), _i3 = new WeakMap(), _d3 = new WeakMap(), _E2 = new WeakMap(), _b4 = new WeakMap(), _p3 = new WeakMap(), _R2 = new WeakMap(), _m3 = new WeakMap(), _C2 = new WeakMap(), _T2 = new WeakMap(), _g3 = new WeakMap(), _y2 = new WeakMap(), _x2 = new WeakMap(), _A2 = new WeakMap(), _e4 = new WeakMap(), __2 = new WeakMap(), _M = new WeakMap(), _k3 = new WeakMap(), _R_instances = new WeakSet(), N_fn = function(t2) {
  let e = this;
  for (let s of t2) e = e.child(s);
  return e;
}, j_fn = function(t2) {
  var _a12;
  __privateSet(this, _e4, __privateGet(this, _e4) | se);
  for (let e = t2.provisional; e < t2.length; e++) {
    let s = t2[e];
    s && __privateMethod(_a12 = s, _R_instances, v_fn).call(_a12);
  }
}, v_fn = function() {
  __privateGet(this, _e4) & j || (__privateSet(this, _e4, (__privateGet(this, _e4) | j) & gt), __privateMethod(this, _R_instances, G_fn2).call(this));
}, G_fn2 = function() {
  var _a12;
  let t2 = this.children();
  t2.provisional = 0;
  for (let e of t2) __privateMethod(_a12 = e, _R_instances, v_fn).call(_a12);
}, P_fn = function() {
  __privateSet(this, _e4, __privateGet(this, _e4) | Lt), __privateMethod(this, _R_instances, L_fn).call(this);
}, L_fn = function() {
  if (__privateGet(this, _e4) & yt) return;
  let t2 = __privateGet(this, _e4);
  (t2 & _) === U && (t2 &= gt), __privateSet(this, _e4, t2 | yt), __privateMethod(this, _R_instances, G_fn2).call(this);
}, I_fn = function(t2 = "") {
  t2 === "ENOTDIR" || t2 === "EPERM" ? __privateMethod(this, _R_instances, L_fn).call(this) : t2 === "ENOENT" ? __privateMethod(this, _R_instances, v_fn).call(this) : this.children().provisional = 0;
}, F_fn2 = function(t2 = "") {
  var _a12;
  t2 === "ENOTDIR" ? __privateMethod(_a12 = this.parent, _R_instances, L_fn).call(_a12) : t2 === "ENOENT" && __privateMethod(this, _R_instances, v_fn).call(this);
}, D_fn2 = function(t2 = "") {
  var _a12;
  let e = __privateGet(this, _e4);
  e |= Nt, t2 === "ENOENT" && (e |= j), (t2 === "EINVAL" || t2 === "UNKNOWN") && (e &= gt), __privateSet(this, _e4, e), t2 === "ENOTDIR" && this.parent && __privateMethod(_a12 = this.parent, _R_instances, L_fn).call(_a12);
}, z_fn2 = function(t2, e) {
  return __privateMethod(this, _R_instances, U_fn2).call(this, t2, e) || __privateMethod(this, _R_instances, B_fn2).call(this, t2, e);
}, B_fn2 = function(t2, e) {
  let s = ie(t2), i2 = this.newChild(t2.name, s, { parent: this }), r2 = __privateGet(i2, _e4) & _;
  return r2 !== U && r2 !== X && r2 !== L && __privateSet(i2, _e4, __privateGet(i2, _e4) | yt), e.unshift(i2), e.provisional++, i2;
}, U_fn2 = function(t2, e) {
  for (let s = e.provisional; s < e.length; s++) {
    let i2 = e[s];
    if ((this.nocase ? _t4(t2.name) : bt(t2.name)) === __privateGet(i2, _C2)) return __privateMethod(this, _R_instances, l_fn2).call(this, t2, i2, s, e);
  }
}, l_fn2 = function(t2, e, s, i2) {
  let r2 = e.name;
  return __privateSet(e, _e4, __privateGet(e, _e4) & gt | ie(t2)), r2 !== t2.name && (e.name = t2.name), s !== i2.provisional && (s === i2.length - 1 ? i2.pop() : i2.splice(s, 1), i2.unshift(e)), i2.provisional++, e;
}, $_fn2 = function(t2) {
  let { atime: e, atimeMs: s, birthtime: i2, birthtimeMs: r2, blksize: o2, blocks: h2, ctime: a, ctimeMs: l, dev: u, gid: c3, ino: d, mode: f, mtime: m, mtimeMs: p2, nlink: w, rdev: g, size: S2, uid: E2 } = t2;
  __privateSet(this, _b4, e), __privateSet(this, _a6, s), __privateSet(this, _m3, i2), __privateSet(this, _E2, r2), __privateSet(this, _c5, o2), __privateSet(this, _f4, h2), __privateSet(this, _R2, a), __privateSet(this, _d3, l), __privateSet(this, _s5, u), __privateSet(this, _S3, c3), __privateSet(this, _h4, d), __privateSet(this, _n4, f), __privateSet(this, _p3, m), __privateSet(this, _i3, p2), __privateSet(this, _r4, w), __privateSet(this, _w3, g), __privateSet(this, _u3, S2), __privateSet(this, _o4, E2);
  let y2 = ie(t2);
  __privateSet(this, _e4, __privateGet(this, _e4) & gt | y2 | je), y2 !== L && y2 !== U && y2 !== X && __privateSet(this, _e4, __privateGet(this, _e4) | yt);
}, _W = new WeakMap(), _O = new WeakMap(), H_fn2 = function(t2) {
  __privateSet(this, _O, false);
  let e = __privateGet(this, _W).slice();
  __privateGet(this, _W).length = 0, e.forEach((s) => s(null, t2));
}, _q2 = new WeakMap(), _a7);
var Pt = class n extends R {
  constructor(t2, e = L, s, i2, r2, o2, h2) {
    super(t2, e, s, i2, r2, o2, h2);
    __publicField(this, "sep", "\\");
    __publicField(this, "splitSep", Oi);
  }
  newChild(t2, e = L, s = {}) {
    return new n(t2, e, this.root, this.roots, this.nocase, this.childrenCache(), s);
  }
  getRootString(t2) {
    return import_node_path.win32.parse(t2).root;
  }
  getRoot(t2) {
    if (t2 = Ri(t2.toUpperCase()), t2 === this.root.name) return this.root;
    for (let [e, s] of Object.entries(this.roots)) if (this.sameRoot(t2, e)) return this.roots[t2] = s;
    return this.roots[t2] = new it(t2, this).root;
  }
  sameRoot(t2, e = this.root.name) {
    return t2 = t2.toUpperCase().replace(/\//g, "\\").replace($e, "$1\\"), t2 === e;
  }
};
var jt = class n2 extends R {
  constructor(t2, e = L, s, i2, r2, o2, h2) {
    super(t2, e, s, i2, r2, o2, h2);
    __publicField(this, "splitSep", "/");
    __publicField(this, "sep", "/");
  }
  getRootString(t2) {
    return t2.startsWith("/") ? "/" : "";
  }
  getRoot(t2) {
    return this.root;
  }
  newChild(t2, e = L, s = {}) {
    return new n2(t2, e, this.root, this.roots, this.nocase, this.childrenCache(), s);
  }
};
var _t6, _s6, _n5, _r5, _a8;
var It = (_a8 = class {
  constructor(t2 = process.cwd(), e, s, { nocase: i2, childrenCacheSize: r2 = 16 * 1024, fs: o2 = wt } = {}) {
    __publicField(this, "root");
    __publicField(this, "rootPath");
    __publicField(this, "roots");
    __publicField(this, "cwd");
    __privateAdd(this, _t6);
    __privateAdd(this, _s6);
    __privateAdd(this, _n5);
    __publicField(this, "nocase");
    __privateAdd(this, _r5);
    __privateSet(this, _r5, Ue(o2)), (t2 instanceof URL || t2.startsWith("file://")) && (t2 = (0, import_node_url2.fileURLToPath)(t2));
    let h2 = e.resolve(t2);
    this.roots = /* @__PURE__ */ Object.create(null), this.rootPath = this.parseRootPath(h2), __privateSet(this, _t6, new Wt()), __privateSet(this, _s6, new Wt()), __privateSet(this, _n5, new ne(r2));
    let a = h2.substring(this.rootPath.length).split(s);
    if (a.length === 1 && !a[0] && a.pop(), i2 === void 0) throw new TypeError("must provide nocase setting to PathScurryBase ctor");
    this.nocase = i2, this.root = this.newRoot(__privateGet(this, _r5)), this.roots[this.rootPath] = this.root;
    let l = this.root, u = a.length - 1, c3 = e.sep, d = this.rootPath, f = false;
    for (let m of a) {
      let p2 = u--;
      l = l.child(m, { relative: new Array(p2).fill("..").join(c3), relativePosix: new Array(p2).fill("..").join("/"), fullpath: d += (f ? "" : c3) + m }), f = true;
    }
    this.cwd = l;
  }
  depth(t2 = this.cwd) {
    return typeof t2 == "string" && (t2 = this.cwd.resolve(t2)), t2.depth();
  }
  childrenCache() {
    return __privateGet(this, _n5);
  }
  resolve(...t2) {
    let e = "";
    for (let r2 = t2.length - 1; r2 >= 0; r2--) {
      let o2 = t2[r2];
      if (!(!o2 || o2 === ".") && (e = e ? `${o2}/${e}` : o2, this.isAbsolute(o2))) break;
    }
    let s = __privateGet(this, _t6).get(e);
    if (s !== void 0) return s;
    let i2 = this.cwd.resolve(e).fullpath();
    return __privateGet(this, _t6).set(e, i2), i2;
  }
  resolvePosix(...t2) {
    let e = "";
    for (let r2 = t2.length - 1; r2 >= 0; r2--) {
      let o2 = t2[r2];
      if (!(!o2 || o2 === ".") && (e = e ? `${o2}/${e}` : o2, this.isAbsolute(o2))) break;
    }
    let s = __privateGet(this, _s6).get(e);
    if (s !== void 0) return s;
    let i2 = this.cwd.resolve(e).fullpathPosix();
    return __privateGet(this, _s6).set(e, i2), i2;
  }
  relative(t2 = this.cwd) {
    return typeof t2 == "string" && (t2 = this.cwd.resolve(t2)), t2.relative();
  }
  relativePosix(t2 = this.cwd) {
    return typeof t2 == "string" && (t2 = this.cwd.resolve(t2)), t2.relativePosix();
  }
  basename(t2 = this.cwd) {
    return typeof t2 == "string" && (t2 = this.cwd.resolve(t2)), t2.name;
  }
  dirname(t2 = this.cwd) {
    return typeof t2 == "string" && (t2 = this.cwd.resolve(t2)), (t2.parent || t2).fullpath();
  }
  async readdir(t2 = this.cwd, e = { withFileTypes: true }) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2, t2 = this.cwd);
    let { withFileTypes: s } = e;
    if (t2.canReaddir()) {
      let i2 = await t2.readdir();
      return s ? i2 : i2.map((r2) => r2.name);
    } else return [];
  }
  readdirSync(t2 = this.cwd, e = { withFileTypes: true }) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2, t2 = this.cwd);
    let { withFileTypes: s = true } = e;
    return t2.canReaddir() ? s ? t2.readdirSync() : t2.readdirSync().map((i2) => i2.name) : [];
  }
  async lstat(t2 = this.cwd) {
    return typeof t2 == "string" && (t2 = this.cwd.resolve(t2)), t2.lstat();
  }
  lstatSync(t2 = this.cwd) {
    return typeof t2 == "string" && (t2 = this.cwd.resolve(t2)), t2.lstatSync();
  }
  async readlink(t2 = this.cwd, { withFileTypes: e } = { withFileTypes: false }) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2.withFileTypes, t2 = this.cwd);
    let s = await t2.readlink();
    return e ? s : s?.fullpath();
  }
  readlinkSync(t2 = this.cwd, { withFileTypes: e } = { withFileTypes: false }) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2.withFileTypes, t2 = this.cwd);
    let s = t2.readlinkSync();
    return e ? s : s?.fullpath();
  }
  async realpath(t2 = this.cwd, { withFileTypes: e } = { withFileTypes: false }) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2.withFileTypes, t2 = this.cwd);
    let s = await t2.realpath();
    return e ? s : s?.fullpath();
  }
  realpathSync(t2 = this.cwd, { withFileTypes: e } = { withFileTypes: false }) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2.withFileTypes, t2 = this.cwd);
    let s = t2.realpathSync();
    return e ? s : s?.fullpath();
  }
  async walk(t2 = this.cwd, e = {}) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2, t2 = this.cwd);
    let { withFileTypes: s = true, follow: i2 = false, filter: r2, walkFilter: o2 } = e, h2 = [];
    (!r2 || r2(t2)) && h2.push(s ? t2 : t2.fullpath());
    let a = /* @__PURE__ */ new Set(), l = (c3, d) => {
      a.add(c3), c3.readdirCB((f, m) => {
        if (f) return d(f);
        let p2 = m.length;
        if (!p2) return d();
        let w = () => {
          --p2 === 0 && d();
        };
        for (let g of m) (!r2 || r2(g)) && h2.push(s ? g : g.fullpath()), i2 && g.isSymbolicLink() ? g.realpath().then((S2) => S2?.isUnknown() ? S2.lstat() : S2).then((S2) => S2?.shouldWalk(a, o2) ? l(S2, w) : w()) : g.shouldWalk(a, o2) ? l(g, w) : w();
      }, true);
    }, u = t2;
    return new Promise((c3, d) => {
      l(u, (f) => {
        if (f) return d(f);
        c3(h2);
      });
    });
  }
  walkSync(t2 = this.cwd, e = {}) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2, t2 = this.cwd);
    let { withFileTypes: s = true, follow: i2 = false, filter: r2, walkFilter: o2 } = e, h2 = [];
    (!r2 || r2(t2)) && h2.push(s ? t2 : t2.fullpath());
    let a = /* @__PURE__ */ new Set([t2]);
    for (let l of a) {
      let u = l.readdirSync();
      for (let c3 of u) {
        (!r2 || r2(c3)) && h2.push(s ? c3 : c3.fullpath());
        let d = c3;
        if (c3.isSymbolicLink()) {
          if (!(i2 && (d = c3.realpathSync()))) continue;
          d.isUnknown() && d.lstatSync();
        }
        d.shouldWalk(a, o2) && a.add(d);
      }
    }
    return h2;
  }
  [Symbol.asyncIterator]() {
    return this.iterate();
  }
  iterate(t2 = this.cwd, e = {}) {
    return typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2, t2 = this.cwd), this.stream(t2, e)[Symbol.asyncIterator]();
  }
  [Symbol.iterator]() {
    return this.iterateSync();
  }
  *iterateSync(t2 = this.cwd, e = {}) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2, t2 = this.cwd);
    let { withFileTypes: s = true, follow: i2 = false, filter: r2, walkFilter: o2 } = e;
    (!r2 || r2(t2)) && (yield s ? t2 : t2.fullpath());
    let h2 = /* @__PURE__ */ new Set([t2]);
    for (let a of h2) {
      let l = a.readdirSync();
      for (let u of l) {
        (!r2 || r2(u)) && (yield s ? u : u.fullpath());
        let c3 = u;
        if (u.isSymbolicLink()) {
          if (!(i2 && (c3 = u.realpathSync()))) continue;
          c3.isUnknown() && c3.lstatSync();
        }
        c3.shouldWalk(h2, o2) && h2.add(c3);
      }
    }
  }
  stream(t2 = this.cwd, e = {}) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2, t2 = this.cwd);
    let { withFileTypes: s = true, follow: i2 = false, filter: r2, walkFilter: o2 } = e, h2 = new V({ objectMode: true });
    (!r2 || r2(t2)) && h2.write(s ? t2 : t2.fullpath());
    let a = /* @__PURE__ */ new Set(), l = [t2], u = 0, c3 = () => {
      let d = false;
      for (; !d; ) {
        let f = l.shift();
        if (!f) {
          u === 0 && h2.end();
          return;
        }
        u++, a.add(f);
        let m = (w, g, S2 = false) => {
          if (w) return h2.emit("error", w);
          if (i2 && !S2) {
            let E2 = [];
            for (let y2 of g) y2.isSymbolicLink() && E2.push(y2.realpath().then((b2) => b2?.isUnknown() ? b2.lstat() : b2));
            if (E2.length) {
              Promise.all(E2).then(() => m(null, g, true));
              return;
            }
          }
          for (let E2 of g) E2 && (!r2 || r2(E2)) && (h2.write(s ? E2 : E2.fullpath()) || (d = true));
          u--;
          for (let E2 of g) {
            let y2 = E2.realpathCached() || E2;
            y2.shouldWalk(a, o2) && l.push(y2);
          }
          d && !h2.flowing ? h2.once("drain", c3) : p2 || c3();
        }, p2 = true;
        f.readdirCB(m, true), p2 = false;
      }
    };
    return c3(), h2;
  }
  streamSync(t2 = this.cwd, e = {}) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2, t2 = this.cwd);
    let { withFileTypes: s = true, follow: i2 = false, filter: r2, walkFilter: o2 } = e, h2 = new V({ objectMode: true }), a = /* @__PURE__ */ new Set();
    (!r2 || r2(t2)) && h2.write(s ? t2 : t2.fullpath());
    let l = [t2], u = 0, c3 = () => {
      let d = false;
      for (; !d; ) {
        let f = l.shift();
        if (!f) {
          u === 0 && h2.end();
          return;
        }
        u++, a.add(f);
        let m = f.readdirSync();
        for (let p2 of m) (!r2 || r2(p2)) && (h2.write(s ? p2 : p2.fullpath()) || (d = true));
        u--;
        for (let p2 of m) {
          let w = p2;
          if (p2.isSymbolicLink()) {
            if (!(i2 && (w = p2.realpathSync()))) continue;
            w.isUnknown() && w.lstatSync();
          }
          w.shouldWalk(a, o2) && l.push(w);
        }
      }
      d && !h2.flowing && h2.once("drain", c3);
    };
    return c3(), h2;
  }
  chdir(t2 = this.cwd) {
    let e = this.cwd;
    this.cwd = typeof t2 == "string" ? this.cwd.resolve(t2) : t2, this.cwd[Ye](e);
  }
}, _t6 = new WeakMap(), _s6 = new WeakMap(), _n5 = new WeakMap(), _r5 = new WeakMap(), _a8);
var it = class extends It {
  constructor(t2 = process.cwd(), e = {}) {
    let { nocase: s = true } = e;
    super(t2, import_node_path.win32, "\\", { ...e, nocase: s });
    __publicField(this, "sep", "\\");
    this.nocase = s;
    for (let i2 = this.cwd; i2; i2 = i2.parent) i2.nocase = this.nocase;
  }
  parseRootPath(t2) {
    return import_node_path.win32.parse(t2).root.toUpperCase();
  }
  newRoot(t2) {
    return new Pt(this.rootPath, U, void 0, this.roots, this.nocase, this.childrenCache(), { fs: t2 });
  }
  isAbsolute(t2) {
    return t2.startsWith("/") || t2.startsWith("\\") || /^[a-z]:(\/|\\)/i.test(t2);
  }
};
var rt = class extends It {
  constructor(t2 = process.cwd(), e = {}) {
    let { nocase: s = false } = e;
    super(t2, import_node_path.posix, "/", { ...e, nocase: s });
    __publicField(this, "sep", "/");
    this.nocase = s;
  }
  parseRootPath(t2) {
    return "/";
  }
  newRoot(t2) {
    return new jt(this.rootPath, U, void 0, this.roots, this.nocase, this.childrenCache(), { fs: t2 });
  }
  isAbsolute(t2) {
    return t2.startsWith("/");
  }
};
var St = class extends rt {
  constructor(t2 = process.cwd(), e = {}) {
    let { nocase: s = true } = e;
    super(t2, { ...e, nocase: s });
  }
};
var Cr = process.platform === "win32" ? Pt : jt;
var Xe = process.platform === "win32" ? it : process.platform === "darwin" ? St : rt;
var Di = (n5) => n5.length >= 1;
var Mi = (n5) => n5.length >= 1;
var Ni = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
var _t7, _s7, _n6, _r6, _o5, _S4, _w4, _c6, _h5, _u4, _a9;
var nt = (_a9 = class {
  constructor(t2, e, s, i2) {
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
    if (!Di(t2)) throw new TypeError("empty pattern list");
    if (!Mi(e)) throw new TypeError("empty glob list");
    if (e.length !== t2.length) throw new TypeError("mismatched pattern list and glob list lengths");
    if (this.length = t2.length, s < 0 || s >= this.length) throw new TypeError("index out of range");
    if (__privateSet(this, _t7, t2), __privateSet(this, _s7, e), __privateSet(this, _n6, s), __privateSet(this, _r6, i2), __privateGet(this, _n6) === 0) {
      if (this.isUNC()) {
        let [r2, o2, h2, a, ...l] = __privateGet(this, _t7), [u, c3, d, f, ...m] = __privateGet(this, _s7);
        l[0] === "" && (l.shift(), m.shift());
        let p2 = [r2, o2, h2, a, ""].join("/"), w = [u, c3, d, f, ""].join("/");
        __privateSet(this, _t7, [p2, ...l]), __privateSet(this, _s7, [w, ...m]), this.length = __privateGet(this, _t7).length;
      } else if (this.isDrive() || this.isAbsolute()) {
        let [r2, ...o2] = __privateGet(this, _t7), [h2, ...a] = __privateGet(this, _s7);
        o2[0] === "" && (o2.shift(), a.shift());
        let l = r2 + "/", u = h2 + "/";
        __privateSet(this, _t7, [l, ...o2]), __privateSet(this, _s7, [u, ...a]), this.length = __privateGet(this, _t7).length;
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
    let t2 = __privateGet(this, _t7);
    return __privateGet(this, _c6) !== void 0 ? __privateGet(this, _c6) : __privateSet(this, _c6, __privateGet(this, _r6) === "win32" && __privateGet(this, _n6) === 0 && t2[0] === "" && t2[1] === "" && typeof t2[2] == "string" && !!t2[2] && typeof t2[3] == "string" && !!t2[3]);
  }
  isDrive() {
    let t2 = __privateGet(this, _t7);
    return __privateGet(this, _w4) !== void 0 ? __privateGet(this, _w4) : __privateSet(this, _w4, __privateGet(this, _r6) === "win32" && __privateGet(this, _n6) === 0 && this.length > 1 && typeof t2[0] == "string" && /^[a-z]:$/i.test(t2[0]));
  }
  isAbsolute() {
    let t2 = __privateGet(this, _t7);
    return __privateGet(this, _h5) !== void 0 ? __privateGet(this, _h5) : __privateSet(this, _h5, t2[0] === "" && t2.length > 1 || this.isDrive() || this.isUNC());
  }
  root() {
    let t2 = __privateGet(this, _t7)[0];
    return typeof t2 == "string" && this.isAbsolute() && __privateGet(this, _n6) === 0 ? t2 : "";
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
  constructor(t2, { nobrace: e, nocase: s, noext: i2, noglobstar: r2, platform: o2 = _i4 }) {
    __publicField(this, "relative");
    __publicField(this, "relativeChildren");
    __publicField(this, "absolute");
    __publicField(this, "absoluteChildren");
    __publicField(this, "platform");
    __publicField(this, "mmopts");
    this.relative = [], this.absolute = [], this.relativeChildren = [], this.absoluteChildren = [], this.platform = o2, this.mmopts = { dot: true, nobrace: e, nocase: s, noext: i2, noglobstar: r2, optimizationLevel: 2, platform: o2, nocomment: true, nonegate: true };
    for (let h2 of t2) this.add(h2);
  }
  add(t2) {
    let e = new D(t2, this.mmopts);
    for (let s = 0; s < e.set.length; s++) {
      let i2 = e.set[s], r2 = e.globParts[s];
      if (!i2 || !r2) throw new Error("invalid pattern object");
      for (; i2[0] === "." && r2[0] === "."; ) i2.shift(), r2.shift();
      let o2 = new nt(i2, r2, 0, this.platform), h2 = new D(o2.globString(), this.mmopts), a = r2[r2.length - 1] === "**", l = o2.isAbsolute();
      l ? this.absolute.push(h2) : this.relative.push(h2), a && (l ? this.absoluteChildren.push(h2) : this.relativeChildren.push(h2));
    }
  }
  ignored(t2) {
    let e = t2.fullpath(), s = `${e}/`, i2 = t2.relative() || ".", r2 = `${i2}/`;
    for (let o2 of this.relative) if (o2.match(i2) || o2.match(r2)) return true;
    for (let o2 of this.absolute) if (o2.match(e) || o2.match(s)) return true;
    return false;
  }
  childrenIgnored(t2) {
    let e = t2.fullpath() + "/", s = (t2.relative() || ".") + "/";
    for (let i2 of this.relativeChildren) if (i2.match(s)) return true;
    for (let i2 of this.absoluteChildren) if (i2.match(e)) return true;
    return false;
  }
};
var oe = class n3 {
  constructor(t2 = /* @__PURE__ */ new Map()) {
    __publicField(this, "store");
    this.store = t2;
  }
  copy() {
    return new n3(new Map(this.store));
  }
  hasWalked(t2, e) {
    return this.store.get(t2.fullpath())?.has(e.globString());
  }
  storeWalked(t2, e) {
    let s = t2.fullpath(), i2 = this.store.get(s);
    i2 ? i2.add(e.globString()) : this.store.set(s, /* @__PURE__ */ new Set([e.globString()]));
  }
};
var he = class {
  constructor() {
    __publicField(this, "store", /* @__PURE__ */ new Map());
  }
  add(t2, e, s) {
    let i2 = (e ? 2 : 0) | (s ? 1 : 0), r2 = this.store.get(t2);
    this.store.set(t2, r2 === void 0 ? i2 : i2 & r2);
  }
  entries() {
    return [...this.store.entries()].map(([t2, e]) => [t2, !!(e & 2), !!(e & 1)]);
  }
};
var ae = class {
  constructor() {
    __publicField(this, "store", /* @__PURE__ */ new Map());
  }
  add(t2, e) {
    if (!t2.canReaddir()) return;
    let s = this.store.get(t2);
    s ? s.find((i2) => i2.globString() === e.globString()) || s.push(e) : this.store.set(t2, [e]);
  }
  get(t2) {
    let e = this.store.get(t2);
    if (!e) throw new Error("attempting to walk unknown path");
    return e;
  }
  entries() {
    return this.keys().map((t2) => [t2, this.store.get(t2)]);
  }
  keys() {
    return [...this.store.keys()].filter((t2) => t2.canReaddir());
  }
};
var Et = class n4 {
  constructor(t2, e) {
    __publicField(this, "hasWalkedCache");
    __publicField(this, "matches", new he());
    __publicField(this, "subwalks", new ae());
    __publicField(this, "patterns");
    __publicField(this, "follow");
    __publicField(this, "dot");
    __publicField(this, "opts");
    this.opts = t2, this.follow = !!t2.follow, this.dot = !!t2.dot, this.hasWalkedCache = e ? e.copy() : new oe();
  }
  processPatterns(t2, e) {
    this.patterns = e;
    let s = e.map((i2) => [t2, i2]);
    for (let [i2, r2] of s) {
      this.hasWalkedCache.storeWalked(i2, r2);
      let o2 = r2.root(), h2 = r2.isAbsolute() && this.opts.absolute !== false;
      if (o2) {
        i2 = i2.resolve(o2 === "/" && this.opts.root !== void 0 ? this.opts.root : o2);
        let c3 = r2.rest();
        if (c3) r2 = c3;
        else {
          this.matches.add(i2, true, false);
          continue;
        }
      }
      if (i2.isENOENT()) continue;
      let a, l, u = false;
      for (; typeof (a = r2.pattern()) == "string" && (l = r2.rest()); ) i2 = i2.resolve(a), r2 = l, u = true;
      if (a = r2.pattern(), l = r2.rest(), u) {
        if (this.hasWalkedCache.hasWalked(i2, r2)) continue;
        this.hasWalkedCache.storeWalked(i2, r2);
      }
      if (typeof a == "string") {
        let c3 = a === ".." || a === "" || a === ".";
        this.matches.add(i2.resolve(a), h2, c3);
        continue;
      } else if (a === A) {
        (!i2.isSymbolicLink() || this.follow || r2.checkFollowGlobstar()) && this.subwalks.add(i2, r2);
        let c3 = l?.pattern(), d = l?.rest();
        if (!l || (c3 === "" || c3 === ".") && !d) this.matches.add(i2, h2, c3 === "" || c3 === ".");
        else if (c3 === "..") {
          let f = i2.parent || i2;
          d ? this.hasWalkedCache.hasWalked(f, d) || this.subwalks.add(f, d) : this.matches.add(f, h2, true);
        }
      } else a instanceof RegExp && this.subwalks.add(i2, r2);
    }
    return this;
  }
  subwalkTargets() {
    return this.subwalks.keys();
  }
  child() {
    return new n4(this.opts, this.hasWalkedCache);
  }
  filterEntries(t2, e) {
    let s = this.subwalks.get(t2), i2 = this.child();
    for (let r2 of e) for (let o2 of s) {
      let h2 = o2.isAbsolute(), a = o2.pattern(), l = o2.rest();
      a === A ? i2.testGlobstar(r2, o2, l, h2) : a instanceof RegExp ? i2.testRegExp(r2, a, l, h2) : i2.testString(r2, a, l, h2);
    }
    return i2;
  }
  testGlobstar(t2, e, s, i2) {
    if ((this.dot || !t2.name.startsWith(".")) && (e.hasMore() || this.matches.add(t2, i2, false), t2.canReaddir() && (this.follow || !t2.isSymbolicLink() ? this.subwalks.add(t2, e) : t2.isSymbolicLink() && (s && e.checkFollowGlobstar() ? this.subwalks.add(t2, s) : e.markFollowGlobstar() && this.subwalks.add(t2, e)))), s) {
      let r2 = s.pattern();
      if (typeof r2 == "string" && r2 !== ".." && r2 !== "" && r2 !== ".") this.testString(t2, r2, s.rest(), i2);
      else if (r2 === "..") {
        let o2 = t2.parent || t2;
        this.subwalks.add(o2, s);
      } else r2 instanceof RegExp && this.testRegExp(t2, r2, s.rest(), i2);
    }
  }
  testRegExp(t2, e, s, i2) {
    e.test(t2.name) && (s ? this.subwalks.add(t2, s) : this.matches.add(t2, i2, false));
  }
  testString(t2, e, s, i2) {
    t2.isNamed(e) && (s ? this.subwalks.add(t2, s) : this.matches.add(t2, i2, false));
  }
};
var Li = (n5, t2) => typeof n5 == "string" ? new ot([n5], t2) : Array.isArray(n5) ? new ot(n5, t2) : n5;
var _t8, _s8, _n7, _zt_instances, r_fn, o_fn, _a10;
var zt = (_a10 = class {
  constructor(t2, e, s) {
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
    if (this.patterns = t2, this.path = e, this.opts = s, __privateSet(this, _n7, !s.posix && s.platform === "win32" ? "\\" : "/"), this.includeChildMatches = s.includeChildMatches !== false, (s.ignore || !this.includeChildMatches) && (__privateSet(this, _s8, Li(s.ignore ?? [], s)), !this.includeChildMatches && typeof __privateGet(this, _s8).add != "function")) {
      let i2 = "cannot ignore child matches, ignore lacks add() method.";
      throw new Error(i2);
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
    let t2;
    for (; !this.paused && (t2 = __privateGet(this, _t8).shift()); ) t2();
  }
  onResume(t2) {
    this.signal?.aborted || (this.paused ? __privateGet(this, _t8).push(t2) : t2());
  }
  async matchCheck(t2, e) {
    if (e && this.opts.nodir) return;
    let s;
    if (this.opts.realpath) {
      if (s = t2.realpathCached() || await t2.realpath(), !s) return;
      t2 = s;
    }
    let r2 = t2.isUnknown() || this.opts.stat ? await t2.lstat() : t2;
    if (this.opts.follow && this.opts.nodir && r2?.isSymbolicLink()) {
      let o2 = await r2.realpath();
      o2 && (o2.isUnknown() || this.opts.stat) && await o2.lstat();
    }
    return this.matchCheckTest(r2, e);
  }
  matchCheckTest(t2, e) {
    return t2 && (this.maxDepth === 1 / 0 || t2.depth() <= this.maxDepth) && (!e || t2.canReaddir()) && (!this.opts.nodir || !t2.isDirectory()) && (!this.opts.nodir || !this.opts.follow || !t2.isSymbolicLink() || !t2.realpathCached()?.isDirectory()) && !__privateMethod(this, _zt_instances, r_fn).call(this, t2) ? t2 : void 0;
  }
  matchCheckSync(t2, e) {
    if (e && this.opts.nodir) return;
    let s;
    if (this.opts.realpath) {
      if (s = t2.realpathCached() || t2.realpathSync(), !s) return;
      t2 = s;
    }
    let r2 = t2.isUnknown() || this.opts.stat ? t2.lstatSync() : t2;
    if (this.opts.follow && this.opts.nodir && r2?.isSymbolicLink()) {
      let o2 = r2.realpathSync();
      o2 && (o2?.isUnknown() || this.opts.stat) && o2.lstatSync();
    }
    return this.matchCheckTest(r2, e);
  }
  matchFinish(t2, e) {
    if (__privateMethod(this, _zt_instances, r_fn).call(this, t2)) return;
    if (!this.includeChildMatches && __privateGet(this, _s8)?.add) {
      let r2 = `${t2.relativePosix()}/**`;
      __privateGet(this, _s8).add(r2);
    }
    let s = this.opts.absolute === void 0 ? e : this.opts.absolute;
    this.seen.add(t2);
    let i2 = this.opts.mark && t2.isDirectory() ? __privateGet(this, _n7) : "";
    if (this.opts.withFileTypes) this.matchEmit(t2);
    else if (s) {
      let r2 = this.opts.posix ? t2.fullpathPosix() : t2.fullpath();
      this.matchEmit(r2 + i2);
    } else {
      let r2 = this.opts.posix ? t2.relativePosix() : t2.relative(), o2 = this.opts.dotRelative && !r2.startsWith(".." + __privateGet(this, _n7)) ? "." + __privateGet(this, _n7) : "";
      this.matchEmit(r2 ? o2 + r2 + i2 : "." + i2);
    }
  }
  async match(t2, e, s) {
    let i2 = await this.matchCheck(t2, s);
    i2 && this.matchFinish(i2, e);
  }
  matchSync(t2, e, s) {
    let i2 = this.matchCheckSync(t2, s);
    i2 && this.matchFinish(i2, e);
  }
  walkCB(t2, e, s) {
    this.signal?.aborted && s(), this.walkCB2(t2, e, new Et(this.opts), s);
  }
  walkCB2(t2, e, s, i2) {
    if (__privateMethod(this, _zt_instances, o_fn).call(this, t2)) return i2();
    if (this.signal?.aborted && i2(), this.paused) {
      this.onResume(() => this.walkCB2(t2, e, s, i2));
      return;
    }
    s.processPatterns(t2, e);
    let r2 = 1, o2 = () => {
      --r2 === 0 && i2();
    };
    for (let [h2, a, l] of s.matches.entries()) __privateMethod(this, _zt_instances, r_fn).call(this, h2) || (r2++, this.match(h2, a, l).then(() => o2()));
    for (let h2 of s.subwalkTargets()) {
      if (this.maxDepth !== 1 / 0 && h2.depth() >= this.maxDepth) continue;
      r2++;
      let a = h2.readdirCached();
      h2.calledReaddir() ? this.walkCB3(h2, a, s, o2) : h2.readdirCB((l, u) => this.walkCB3(h2, u, s, o2), true);
    }
    o2();
  }
  walkCB3(t2, e, s, i2) {
    s = s.filterEntries(t2, e);
    let r2 = 1, o2 = () => {
      --r2 === 0 && i2();
    };
    for (let [h2, a, l] of s.matches.entries()) __privateMethod(this, _zt_instances, r_fn).call(this, h2) || (r2++, this.match(h2, a, l).then(() => o2()));
    for (let [h2, a] of s.subwalks.entries()) r2++, this.walkCB2(h2, a, s.child(), o2);
    o2();
  }
  walkCBSync(t2, e, s) {
    this.signal?.aborted && s(), this.walkCB2Sync(t2, e, new Et(this.opts), s);
  }
  walkCB2Sync(t2, e, s, i2) {
    if (__privateMethod(this, _zt_instances, o_fn).call(this, t2)) return i2();
    if (this.signal?.aborted && i2(), this.paused) {
      this.onResume(() => this.walkCB2Sync(t2, e, s, i2));
      return;
    }
    s.processPatterns(t2, e);
    let r2 = 1, o2 = () => {
      --r2 === 0 && i2();
    };
    for (let [h2, a, l] of s.matches.entries()) __privateMethod(this, _zt_instances, r_fn).call(this, h2) || this.matchSync(h2, a, l);
    for (let h2 of s.subwalkTargets()) {
      if (this.maxDepth !== 1 / 0 && h2.depth() >= this.maxDepth) continue;
      r2++;
      let a = h2.readdirSync();
      this.walkCB3Sync(h2, a, s, o2);
    }
    o2();
  }
  walkCB3Sync(t2, e, s, i2) {
    s = s.filterEntries(t2, e);
    let r2 = 1, o2 = () => {
      --r2 === 0 && i2();
    };
    for (let [h2, a, l] of s.matches.entries()) __privateMethod(this, _zt_instances, r_fn).call(this, h2) || this.matchSync(h2, a, l);
    for (let [h2, a] of s.subwalks.entries()) r2++, this.walkCB2Sync(h2, a, s.child(), o2);
    o2();
  }
}, _t8 = new WeakMap(), _s8 = new WeakMap(), _n7 = new WeakMap(), _zt_instances = new WeakSet(), r_fn = function(t2) {
  return this.seen.has(t2) || !!__privateGet(this, _s8)?.ignored?.(t2);
}, o_fn = function(t2) {
  return !!__privateGet(this, _s8)?.childrenIgnored?.(t2);
}, _a10);
var xt = class extends zt {
  constructor(t2, e, s) {
    super(t2, e, s);
    __publicField(this, "matches", /* @__PURE__ */ new Set());
  }
  matchEmit(t2) {
    this.matches.add(t2);
  }
  async walk() {
    if (this.signal?.aborted) throw this.signal.reason;
    return this.path.isUnknown() && await this.path.lstat(), await new Promise((t2, e) => {
      this.walkCB(this.path, this.patterns, () => {
        this.signal?.aborted ? e(this.signal.reason) : t2(this.matches);
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
  constructor(t2, e, s) {
    super(t2, e, s);
    __publicField(this, "results");
    this.results = new V({ signal: this.signal, objectMode: true }), this.results.on("drain", () => this.resume()), this.results.on("resume", () => this.resume());
  }
  matchEmit(t2) {
    this.results.write(t2), this.results.flowing || this.pause();
  }
  stream() {
    let t2 = this.path;
    return t2.isUnknown() ? t2.lstat().then(() => {
      this.walkCB(t2, this.patterns, () => this.results.end());
    }) : this.walkCB(t2, this.patterns, () => this.results.end()), this.results;
  }
  streamSync() {
    return this.path.isUnknown() && this.path.lstatSync(), this.walkCBSync(this.path, this.patterns, () => this.results.end()), this.results;
  }
};
var Pi = typeof process == "object" && process && typeof process.platform == "string" ? process.platform : "linux";
var I = class {
  constructor(t2, e) {
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
    if (typeof t2 == "string" && (t2 = [t2]), this.windowsPathsNoEscape = !!e.windowsPathsNoEscape || e.allowWindowsEscape === false, this.windowsPathsNoEscape && (t2 = t2.map((a) => a.replace(/\\/g, "/"))), this.matchBase) {
      if (e.noglobstar) throw new TypeError("base matching requires globstar");
      t2 = t2.map((a) => a.includes("/") ? a : `./**/${a}`);
    }
    if (this.pattern = t2, this.platform = e.platform || Pi, this.opts = { ...e, platform: this.platform }, e.scurry) {
      if (this.scurry = e.scurry, e.nocase !== void 0 && e.nocase !== e.scurry.nocase) throw new Error("nocase option contradicts provided scurry option");
    } else {
      let a = e.platform === "win32" ? it : e.platform === "darwin" ? St : e.platform ? rt : Xe;
      this.scurry = new a(this.cwd, { nocase: e.nocase, fs: e.fs });
    }
    this.nocase = this.scurry.nocase;
    let s = this.platform === "darwin" || this.platform === "win32", i2 = { braceExpandMax: 1e4, ...e, dot: this.dot, matchBase: this.matchBase, nobrace: this.nobrace, nocase: this.nocase, nocaseMagicOnly: s, nocomment: true, noext: this.noext, nonegate: true, optimizationLevel: 2, platform: this.platform, windowsPathsNoEscape: this.windowsPathsNoEscape, debug: !!this.opts.debug }, r2 = this.pattern.map((a) => new D(a, i2)), [o2, h2] = r2.reduce((a, l) => (a[0].push(...l.set), a[1].push(...l.globParts), a), [[], []]);
    this.patterns = o2.map((a, l) => {
      let u = h2[l];
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
var le = (n5, t2 = {}) => {
  Array.isArray(n5) || (n5 = [n5]);
  for (let e of n5) if (new D(e, t2).hasMagic()) return true;
  return false;
};
function Bt(n5, t2 = {}) {
  return new I(n5, t2).streamSync();
}
function Qe(n5, t2 = {}) {
  return new I(n5, t2).stream();
}
function ts(n5, t2 = {}) {
  return new I(n5, t2).walkSync();
}
async function Je(n5, t2 = {}) {
  return new I(n5, t2).walk();
}
function Ut(n5, t2 = {}) {
  return new I(n5, t2).iterateSync();
}
function es(n5, t2 = {}) {
  return new I(n5, t2).iterate();
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
function detectFrameworks(projectPath) {
  const results = [];
  const seen = /* @__PURE__ */ new Set();
  for (const [framework, sig] of Object.entries(SIGNATURES)) {
    for (const configFile of sig.configFiles) {
      const fullPath = import_path.default.join(projectPath, configFile);
      if ((0, import_fs2.existsSync)(fullPath)) {
        if (seen.has(framework)) break;
        seen.add(framework);
        results.push({
          framework,
          testDir: extractTestDir(framework, fullPath, projectPath),
          confidence: "high"
        });
        break;
      }
    }
  }
  const nestedConfigGlobs = {
    playwright: "**/playwright.config.{ts,js,mjs}",
    cypress: "**/cypress.config.{ts,js}",
    vitest: "**/vitest.config.{ts,js}"
  };
  for (const [framework, glob] of Object.entries(nestedConfigGlobs)) {
    if (seen.has(framework)) continue;
    const matches = ts(glob, {
      cwd: projectPath,
      ignore: ["**/node_modules/**", "**/dist/**"],
      absolute: true
    });
    if (matches.length > 0) {
      seen.add(framework);
      const configPath = matches[0];
      results.push({
        framework,
        testDir: extractTestDir(framework, configPath, projectPath),
        confidence: "high"
      });
    }
  }
  const pkgResults = detectAllFromPackageJson(projectPath, seen);
  results.push(...pkgResults);
  if (results.length === 0) {
    return [{ framework: "unknown", testDir: "./tests", confidence: "low" }];
  }
  return results;
}
function extractTestDir(framework, configPath, projectPath) {
  switch (framework) {
    case "playwright":
      return extractPlaywrightTestDir(configPath, projectPath);
    case "cypress":
      return extractCypressTestDir(configPath, projectPath);
    case "vitest":
      return extractVitestTestDir(configPath, projectPath);
    default:
      return guessTestDir(projectPath);
  }
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
function extractCypressTestDir(configPath, projectPath) {
  try {
    const content = (0, import_fs2.readFileSync)(configPath, "utf-8");
    const specPattern = content.match(/specPattern\s*:\s*['"\`]([^'"\`]+)['"\`]/);
    if (specPattern) {
      const dir = specPattern[1].replace(/\*.*$/, "").replace(/\/$/, "");
      if (dir) return "./" + dir;
    }
  } catch {
  }
  const defaultDir = "./cypress/e2e";
  if ((0, import_fs2.existsSync)(import_path.default.join(projectPath, defaultDir))) return defaultDir;
  const legacyDir = "./cypress/integration";
  if ((0, import_fs2.existsSync)(import_path.default.join(projectPath, legacyDir))) return legacyDir;
  return defaultDir;
}
function extractVitestTestDir(_configPath, _projectPath) {
  return ".";
}
function guessTestDir(projectPath) {
  const candidates = [
    "./tests",
    "./test",
    "./e2e",
    "./cypress/e2e",
    "./cypress/integration",
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
function detectAllFromPackageJson(projectPath, alreadySeen) {
  const pkgPath = import_path.default.join(projectPath, "package.json");
  if (!(0, import_fs2.existsSync)(pkgPath)) return [];
  const results = [];
  try {
    const pkg = JSON.parse((0, import_fs2.readFileSync)(pkgPath, "utf-8"));
    const allDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies
    };
    for (const [framework, sig] of Object.entries(SIGNATURES)) {
      if (alreadySeen.has(framework)) continue;
      if (sig.packageDeps.some((dep) => dep in allDeps)) {
        alreadySeen.add(framework);
        results.push({
          framework,
          testDir: guessTestDir(projectPath),
          confidence: "medium"
        });
      }
    }
  } catch {
  }
  return results;
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
  for (let i2 = openPos; i2 < content.length; i2++) {
    if (content[i2] === "{") {
      depth++;
    } else if (content[i2] === "}") {
      depth--;
      if (depth === 0) {
        return i2;
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
var INLINE_TAG_RE = /\{\s*tag\s*:\s*(?:(['"`])([@\w\-/]+)\1|\[([^\]]+)\])/g;
var TAG_SEARCH_WINDOW_CHARS = 300;
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
  const window2 = content.substring(testIndex, testIndex + TAG_SEARCH_WINDOW_CHARS);
  const tags = [];
  let match;
  INLINE_TAG_RE.lastIndex = 0;
  while ((match = INLINE_TAG_RE.exec(window2)) !== null) {
    if (match[2]) {
      tags.push({ name: match[2] });
    } else if (match[3]) {
      const tagList = match[3].split(",").map((t2) => t2.trim().replace(/^['"`]|['"`]$/g, "")).filter((t2) => t2.length > 0);
      tagList.forEach((t2) => tags.push({ name: t2 }));
    }
  }
  return tags;
}
var playwrightParser = {
  parseFile: parsePlaywrightSpec,
  extractTestNames,
  filePatterns: ["**/*.spec.ts", "**/*.spec.js", "**/*.spec.mjs"],
  supportedFeatures: {
    tags: true,
    describes: true,
    parameterized: false,
    lineNumbers: true,
    asyncTests: true
  }
};

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
  for (let i2 = 0; i2 < dataContent.length; i2++) {
    const char = dataContent[i2];
    const prevChar = i2 > 0 ? dataContent[i2 - 1] : "";
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
      for (let i2 = 0; i2 < paramData.count; i2++) {
        const id2 = hashId(`${relativePath}::${parentDescribe ?? ""}::${testName}::${i2}`);
        const expandedName = generateParameterizedTestName(testName, i2, paramData.count);
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
var cypressParser = {
  parseFile: parseCypressSpec,
  extractTestNames: extractTestNames2,
  filePatterns: ["**/*.cy.ts", "**/*.cy.js", "**/*.spec.ts", "**/*.spec.js"],
  supportedFeatures: {
    tags: false,
    describes: true,
    parameterized: true,
    lineNumbers: true,
    asyncTests: true
  }
};

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
var vitestParser = {
  parseFile: parseVitestSpec,
  extractTestNames: extractTestNames3,
  filePatterns: ["**/*.test.ts", "**/*.test.js", "**/*.spec.ts", "**/*.spec.js"],
  supportedFeatures: {
    tags: true,
    describes: true,
    parameterized: false,
    lineNumbers: true,
    asyncTests: true
  }
};

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
    const annotationText = match[0];
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
    if (!isTestEnabled(match[0])) {
      continue;
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
var testngParser = {
  parseFile: parseTestNGSpec,
  extractTestNames: extractTestNames4,
  filePatterns: ["**/*Test.java", "**/*Tests.java", "**/*TestCase.java"],
  supportedFeatures: {
    tags: true,
    describes: false,
    parameterized: false,
    lineNumbers: true,
    asyncTests: false
  }
};

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
    const prevBracePos = content.lastIndexOf("}", matchIndex - 1);
    const annotationBlockStart = prevBracePos !== -1 ? prevBracePos + 1 : 0;
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
    const prevBracePos2 = content.lastIndexOf("}", matchIndex - 1);
    const annotationBlockStart2 = prevBracePos2 !== -1 ? prevBracePos2 + 1 : 0;
    const annotationBlock2 = content.substring(annotationBlockStart2, matchIndex);
    if (IGNORE_RE.test(annotationBlock2)) {
      continue;
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
var junitParser = {
  parseFile: parseJUnitSpec,
  extractTestNames: extractTestNames5,
  filePatterns: ["**/*Test.java", "**/*Tests.java", "**/*TestCase.java"],
  supportedFeatures: {
    tags: true,
    describes: false,
    parameterized: false,
    lineNumbers: true,
    asyncTests: false
  }
};

// src/core/parser.ts
var PARSERS = {
  playwright: playwrightParser,
  cypress: cypressParser,
  vitest: vitestParser,
  testng: testngParser,
  junit: junitParser
};
function getParser(framework) {
  if (framework === "unknown") return null;
  return PARSERS[framework];
}
function parseSpecFile(filePath, content, projectRoot, framework) {
  const parser4 = getParser(framework);
  if (!parser4) throw new Error(`Cannot parse spec for unresolved framework 'unknown'`);
  const spec = parser4.parseFile(filePath, content, projectRoot);
  try {
    spec.lastModified = (0, import_fs3.statSync)(filePath).mtime.toISOString();
  } catch {
  }
  return spec;
}
function extractTestNamesFromContent(content, framework) {
  return getParser(framework)?.extractTestNames(content) ?? [];
}
function extractTestsWithLinesFromContent(content, framework) {
  const dummyPath = "/__git_history__/test.spec.ts";
  const dummyRoot = "/__git_history__";
  const parser4 = getParser(framework);
  if (!parser4) return [];
  const spec = parser4.parseFile(dummyPath, content, dummyRoot);
  return spec.tests.map((t2) => ({ name: t2.fullName, line: t2.line }));
}
function findSpecFiles(projectRoot, testDir, framework) {
  const parser4 = getParser(framework);
  if (!parser4) return [];
  const baseDir = import_path7.default.resolve(projectRoot, testDir);
  return ts(parser4.filePatterns, {
    cwd: baseDir,
    absolute: true,
    ignore: ["**/node_modules/**"]
  });
}
function parseAllSpecs(projectRoot, frameworkConfigs) {
  const seen = /* @__PURE__ */ new Set();
  const allSpecs = [];
  const sorted2 = [...frameworkConfigs].sort((a, b2) => b2.testDir.length - a.testDir.length);
  for (const { framework, testDir } of sorted2) {
    if (framework === "unknown") continue;
    const files = findSpecFiles(projectRoot, testDir, framework);
    for (const filePath of files) {
      const normalized = import_path7.default.normalize(filePath);
      if (seen.has(normalized)) continue;
      seen.add(normalized);
      const content = (0, import_fs3.readFileSync)(filePath, "utf-8");
      allSpecs.push(parseSpecFile(filePath, content, projectRoot, framework));
    }
  }
  return allSpecs;
}

// src/core/frameworks/testDiff.ts
init_cjs_shims();
var RENAME_SIMILARITY_THRESHOLD = 0.85;
function levenshteinDistance(a, b2) {
  const matrix = Array(b2.length + 1).fill(null).map(() => Array(a.length + 1).fill(0));
  for (let i2 = 0; i2 <= a.length; i2++) matrix[0][i2] = i2;
  for (let j3 = 0; j3 <= b2.length; j3++) matrix[j3][0] = j3;
  for (let j3 = 1; j3 <= b2.length; j3++) {
    for (let i2 = 1; i2 <= a.length; i2++) {
      const cost = a[i2 - 1] === b2[j3 - 1] ? 0 : 1;
      matrix[j3][i2] = Math.min(
        matrix[j3][i2 - 1] + 1,
        // deletion
        matrix[j3 - 1][i2] + 1,
        // insertion
        matrix[j3 - 1][i2 - 1] + cost
        // substitution
      );
    }
  }
  return matrix[b2.length][a.length];
}
function normalizeTestName(name) {
  return name.toLowerCase().replace(/[_\-\s]+/g, " ").trim();
}
function calculateSimilarity(a, b2) {
  const normA = normalizeTestName(a);
  const normB = normalizeTestName(b2);
  if (normA === normB) return 1;
  const distance = levenshteinDistance(normA, normB);
  const maxLength = Math.max(normA.length, normB.length);
  if (maxLength === 0) return 1;
  return 1 - distance / maxLength;
}
function isSameTest(a, b2) {
  const similarity = calculateSimilarity(a, b2);
  return similarity > RENAME_SIMILARITY_THRESHOLD;
}

// src/git/index.ts
init_cjs_shims();

// src/git/history.ts
init_cjs_shims();

// node_modules/simple-git/dist/esm/index.js
init_cjs_shims();
var import_file_exists = __toESM(require_dist(), 1);

// node_modules/@simple-git/args-pathspec/dist/index.mjs
init_cjs_shims();
var t = /* @__PURE__ */ new WeakMap();
function c(...n5) {
  const e = new String(n5);
  return t.set(e, n5), e;
}
function r(n5) {
  return n5 instanceof String && t.has(n5);
}
function o(n5) {
  return t.get(n5) ?? [];
}

// node_modules/simple-git/dist/esm/index.js
var import_debug = __toESM(require_src(), 1);
var import_child_process = require("child_process");
var import_promise_deferred = __toESM(require_dist2(), 1);
var import_node_path2 = require("path");

// node_modules/@simple-git/argv-parser/dist/index.mjs
init_cjs_shims();
function* U2(e, t2) {
  const n5 = t2 === "global";
  for (const o2 of e)
    o2.isGlobal === n5 && (yield o2);
}
var k2 = /* @__PURE__ */ new Set([
  "--add",
  "--edit",
  "--remove-section",
  "--rename-section",
  "--replace-all",
  "--unset",
  "--unset-all",
  "-e"
]);
var S = /* @__PURE__ */ new Set([
  "--get",
  "--get-all",
  "--get-color",
  "--get-colorbool",
  "--get-regexp",
  "--get-urlmatch",
  "--list",
  "-l"
]);
var P2 = /* @__PURE__ */ new Set([
  "edit",
  "remove-section",
  "rename-section",
  "set",
  "unset"
]);
var E = /* @__PURE__ */ new Set(["get", "get-color", "get-colorbool", "list"]);
function F2(e, t2) {
  for (const { name: o2 } of U2(e, "task")) {
    if (k2.has(o2))
      return p(true, t2);
    if (S.has(o2))
      return p(false, t2);
  }
  const n5 = t2.at(0)?.toLowerCase();
  return n5 === void 0 ? null : P2.has(n5) ? p(true, t2.slice(1)) : E.has(n5) ? p(false, t2.slice(1)) : t2.length === 1 ? p(false, t2) : p(true, t2);
}
function p(e = false, t2 = []) {
  const n5 = t2.at(0)?.toLowerCase();
  return n5 === void 0 ? null : {
    isWrite: e,
    isRead: !e,
    key: n5,
    value: t2.at(1)
  };
}
function A2(e, t2) {
  return t2.isWrite && t2.value !== void 0 ? { key: t2.key, value: t2.value, scope: e } : { key: t2.key, scope: e };
}
function M2(e) {
  const t2 = e?.indexOf("=") || -1;
  return !e || t2 < 0 ? null : {
    key: e.slice(0, t2).trim().toLowerCase(),
    value: e.slice(t2 + 1)
  };
}
function N2(e) {
  for (const { name: t2 } of U2(e, "task"))
    switch (t2) {
      case "--global":
        return "global";
      case "--system":
        return "system";
      case "--worktree":
        return "worktree";
      case "--local":
        return "local";
      case "--file":
      case "-f":
        return "file";
    }
  return "local";
}
function G2({ name: e }) {
  if (e === "-c" || e === "--config")
    return "inline";
  if (e === "--config-env")
    return "env";
}
function* O2(e) {
  for (const t2 of e) {
    const n5 = G2(t2), o2 = n5 && M2(t2.value);
    o2 && (yield {
      ...o2,
      scope: n5
    });
  }
}
function L2(e, t2, n5) {
  const o2 = {
    read: [],
    write: [...O2(t2)]
  };
  return e === "config" && $(
    o2,
    N2(t2),
    F2(t2, n5)
  ), o2;
}
function $(e, t2, n5) {
  if (n5 === null)
    return;
  const o2 = A2(t2, n5);
  n5.isWrite ? e.write.push(o2) : e.read.push(o2);
}
var x2 = {
  short: /* @__PURE__ */ new Map([
    ["c", true]
    //  -c <k=v>    set config key for this invocation
  ])
};
var D2 = {
  short: new Map([
    ["C", true],
    //  -C <path>   change working directory
    ["P", false],
    // -P          no pager (alias for --no-pager)
    ["h", false],
    // -h          help
    ["p", false],
    // -p          paginate
    ["v", false],
    // -v          version
    ...x2.short.entries()
  ]),
  long: /* @__PURE__ */ new Set([
    "attr-source",
    "config-env",
    "exec-path",
    "git-dir",
    "list-cmds",
    "namespace",
    "super-prefix",
    "work-tree"
  ])
};
var R2 = {
  clone: {
    short: /* @__PURE__ */ new Map([
      ["b", true],
      // -b <branch>
      ["j", true],
      // -j <n>          parallel jobs
      ["l", false],
      // -l local
      ["n", false],
      // -n no-checkout
      ["o", true],
      // -o <name>       remote name
      ["q", false],
      // -q quiet
      ["s", false],
      // -s shared
      ["u", true]
      // -u <upload-pack>
    ]),
    long: /* @__PURE__ */ new Set(["branch", "config", "jobs", "origin", "upload-pack", "u", "template"])
  },
  commit: {
    short: /* @__PURE__ */ new Map([
      ["C", true],
      // -C <commit>  reuse message
      ["F", true],
      // -F <file>    read message from file
      ["c", true],
      // -c <commit>  reedit message
      ["m", true],
      // -m <msg>
      ["t", true]
      // -t <template>
    ]),
    long: /* @__PURE__ */ new Set(["file", "message", "reedit-message", "reuse-message", "template"])
  },
  config: {
    short: /* @__PURE__ */ new Map([
      ["e", false],
      // -e  open editor
      ["f", true],
      //  -f <file>
      ["l", false]
      // -l  list
    ]),
    long: /* @__PURE__ */ new Set(["blob", "comment", "default", "file", "type", "value"])
  },
  fetch: {
    short: /* @__PURE__ */ new Map(),
    long: /* @__PURE__ */ new Set(["upload-pack"])
  },
  init: {
    short: /* @__PURE__ */ new Map(),
    long: /* @__PURE__ */ new Set(["template"])
  },
  pull: {
    short: /* @__PURE__ */ new Map(),
    long: /* @__PURE__ */ new Set(["upload-pack"])
  },
  push: {
    short: /* @__PURE__ */ new Map(),
    long: /* @__PURE__ */ new Set(["exec", "receive-pack"])
  }
};
var T2 = { short: /* @__PURE__ */ new Map(), long: /* @__PURE__ */ new Set() };
function I2(e) {
  const t2 = R2[e ?? ""] ?? T2;
  return {
    short: new Map([...x2.short.entries(), ...t2.short.entries()]),
    long: t2.long
  };
}
function b(e, t2 = D2) {
  if (e.startsWith("--")) {
    const n5 = e.indexOf("=");
    if (n5 > 2)
      return [{ name: e.slice(0, n5), value: e.slice(n5 + 1), needsNext: false }];
    const o2 = e.slice(2);
    return [{ name: e, needsNext: t2.long.has(o2) }];
  }
  if (e.length === 2) {
    const n5 = e.charAt(1), o2 = t2.short.get(n5);
    return [{ name: e, needsNext: o2 === true }];
  }
  return W2(e, t2.short);
}
function W2(e, t2) {
  const n5 = e.slice(1).split(""), o2 = [];
  for (let s = 0; s < n5.length; s++) {
    const r2 = n5[s], l = t2.get(r2);
    if (l === void 0)
      return [{ name: e, needsNext: false }];
    if (l) {
      const a = n5.slice(s + 1).join("");
      if (a && ![...a].every((w) => t2.has(w)))
        return o2.push({ name: `-${r2}`, value: a, needsNext: false }), o2;
    }
    o2.push({ name: `-${r2}`, needsNext: l });
  }
  return o2;
}
function j2(e, t2 = []) {
  let n5 = 0;
  for (; n5 < e.length; ) {
    const o2 = String(e[n5]);
    if (!o2.startsWith("-") || o2.length < 2) break;
    const s = b(o2);
    let r2 = n5 + 1;
    for (const l of s) {
      const a = {
        name: l.name,
        value: l.value,
        absorbedNext: false,
        isGlobal: true
      };
      l.needsNext && a.value === void 0 && r2 < e.length && (a.value = String(e[r2]), a.absorbedNext = true, r2++), t2.push(a);
    }
    n5 = r2;
  }
  return { flags: t2, taskIndex: n5 };
}
function B2(e, t2, n5 = []) {
  const o2 = I2(t2), s = [], r2 = [];
  let l = 0;
  for (; l < e.length; ) {
    const a = e[l];
    if (r(a)) {
      r2.push(...o(a)), l++;
      continue;
    }
    const f = String(a);
    if (f === "--") {
      for (let g = l + 1; g < e.length; g++) {
        const u = e[g];
        r(u) ? r2.push(...o(u)) : r2.push(String(u));
      }
      break;
    }
    if (!f.startsWith("-") || f.length < 2) {
      s.push(f), l++;
      continue;
    }
    const w = b(f, o2);
    let d = l + 1;
    for (const g of w) {
      const u = {
        name: g.name,
        value: g.value,
        absorbedNext: false,
        isGlobal: false
      };
      g.needsNext && u.value === void 0 && d < e.length && !r(e[d]) && (u.value = String(e[d]), u.absorbedNext = true, d++), n5.push(u);
    }
    l = d;
  }
  return { flags: n5, positionals: s, pathspecs: r2 };
}
function* V2({
  write: e
}) {
  for (const t2 of e)
    for (const n5 of q2) {
      const o2 = n5(t2.key);
      o2 && (yield o2);
    }
}
function c2(e, t2, n5 = String(e)) {
  const o2 = typeof e == "string" ? new RegExp(`\\s*${e.toLowerCase()}`) : e;
  return function(r2) {
    if (o2.test(r2))
      return {
        category: t2,
        message: `Configuring ${n5} is not permitted without enabling ${t2}`
      };
  };
}
function i(e, t2) {
  const n5 = new RegExp(`\\s*${e.toLowerCase().replace(/\./g, "(..+)?.")}`);
  return c2(n5, t2, e);
}
var q2 = [
  c2("alias", "allowUnsafeAlias"),
  c2("core.askPass", "allowUnsafeAskPass"),
  c2("core.editor", "allowUnsafeEditor"),
  c2("core.fsmonitor", "allowUnsafeFsMonitor"),
  c2("core.gitProxy", "allowUnsafeGitProxy"),
  c2("core.hooksPath", "allowUnsafeHooksPath"),
  c2("core.pager", "allowUnsafePager"),
  c2("core.sshCommand", "allowUnsafeSshCommand"),
  i("credential.helper", "allowUnsafeCredentialHelper"),
  i("diff.command", "allowUnsafeDiffExternal"),
  c2("diff.external", "allowUnsafeDiffExternal"),
  i("diff.textconv", "allowUnsafeDiffTextConv"),
  i("filter.clean", "allowUnsafeFilter"),
  i("filter.smudge", "allowUnsafeFilter"),
  i("gpg.program", "allowUnsafeGpgProgram"),
  c2("init.templateDir", "allowUnsafeTemplateDir"),
  i("merge.driver", "allowUnsafeMergeDriver"),
  i("mergetool.path", "allowUnsafeMergeDriver"),
  i("mergetool.cmd", "allowUnsafeMergeDriver"),
  i("protocol.allow", "allowUnsafeProtocolOverride"),
  i("remote.receivepack", "allowUnsafePack"),
  i("remote.uploadpack", "allowUnsafePack"),
  c2("sequence.editor", "allowUnsafeEditor")
];
function* K2(e, t2) {
  for (const n5 of t2)
    for (const o2 of H2) {
      const s = o2(e, n5.name);
      s && (yield s);
    }
}
function h(e, t2, n5, o2 = String(t2)) {
  const s = typeof t2 == "string" ? new RegExp(`\\s*${t2.toLowerCase()}`) : t2, r2 = `Use of ${e ? `${e} with option ` : ""}${o2} is not permitted without enabling ${n5}`;
  return function(a, f) {
    if ((!e || a === e) && s.test(f))
      return {
        category: n5,
        message: r2
      };
  };
}
var H2 = [
  h(
    null,
    /--(upload|receive)-pack/,
    "allowUnsafePack",
    "--upload-pack or --receive-pack"
  ),
  h("clone", /^-\w*u/, "allowUnsafePack"),
  h("clone", "--u", "allowUnsafePack"),
  h("push", "--exec", "allowUnsafePack"),
  h(null, "--template", "allowUnsafeTemplateDir")
];
function C2(e, t2, n5) {
  return [...K2(e, t2), ...V2(n5)];
}
function Y2(...e) {
  const { flags: t2, taskIndex: n5 } = j2(e), o2 = n5 < e.length ? String(e[n5]).toLowerCase() : null, s = o2 !== null ? e.slice(n5 + 1) : [], { positionals: r2, pathspecs: l } = B2(s, o2, t2), a = L2(o2, t2, r2);
  return {
    task: o2,
    flags: t2.map(J),
    paths: l,
    config: a,
    vulnerabilities: z(C2(o2, t2, a))
  };
}
function z(e) {
  return Object.defineProperty(e, "vulnerabilities", {
    value: e
  });
}
function J({ value: e, name: t2 }) {
  return e !== void 0 ? { name: t2, value: e } : { name: t2 };
}
var y = {
  editor: "allowUnsafeEditor",
  git_askpass: "allowUnsafeAskPass",
  git_config_global: "allowUnsafeConfigPaths",
  git_config_system: "allowUnsafeConfigPaths",
  git_config_count: "allowUnsafeConfigEnvCount",
  git_config: "allowUnsafeConfigPaths",
  git_editor: "allowUnsafeEditor",
  git_exec_path: "allowUnsafeConfigPaths",
  git_external_diff: "allowUnsafeDiffExternal",
  git_pager: "allowUnsafePager",
  git_proxy_command: "allowUnsafeGitProxy",
  git_template_dir: "allowUnsafeTemplateDir",
  git_sequence_editor: "allowUnsafeEditor",
  git_ssh: "allowUnsafeSshCommand",
  git_ssh_command: "allowUnsafeSshCommand",
  pager: "allowUnsafePager",
  prefix: "allowUnsafeConfigPaths",
  ssh_askpass: "allowUnsafeAskPass"
};
function* Q2(e) {
  const t2 = parseInt(e.git_config_count ?? "0", 10);
  for (let n5 = 0; n5 < t2; n5++) {
    const o2 = e[`git_config_key_${n5}`], s = e[`git_config_value_${n5}`];
    o2 !== void 0 && (yield { key: o2.toLowerCase().trim(), value: s, scope: "env" });
  }
}
function* X2(e) {
  for (const t2 of Object.keys(e))
    if (_2(t2)) {
      const n5 = y[t2];
      yield {
        category: n5,
        message: `Use of "${t2.toUpperCase()}" is not permitted without enabling ${n5}`
      };
    }
}
function _2(e) {
  return Object.hasOwn(y, e);
}
function Z(e) {
  const t2 = {};
  for (const [n5, o2] of Object.entries(e)) {
    const s = n5.toLowerCase().trim();
    (_2(s) || s.startsWith("git")) && (t2[s] = String(o2));
  }
  return t2;
}
function ee2(e) {
  const t2 = Z(e), n5 = {
    read: [],
    write: [...Q2(t2)]
  }, o2 = [
    ...X2(t2),
    ...C2(null, [], n5)
  ];
  return {
    config: n5,
    vulnerabilities: o2
  };
}
function ne2(e, t2) {
  return [...Y2(...e).vulnerabilities, ...ee2(t2).vulnerabilities];
}

// node_modules/simple-git/dist/esm/index.js
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
  for (let i2 = 0, max = input.length; i2 < max; i2++) {
    output.push(prefix, input[i2]);
  }
  return output;
}
function bufferToString(input) {
  return (Array.isArray(input) ? Buffer.concat(input) : input).toString("utf-8");
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
  const type = r(input) ? "string" : typeof input;
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
    init_util();
    filterArray = (input) => {
      return Array.isArray(input);
    };
    filterNumber = (input) => {
      return typeof input === "number";
    };
    filterString = (input) => {
      return typeof input === "string" || r(input);
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
    ...options.filter((o2) => typeof o2 === "object" && o2)
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
    if (r(value)) {
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
  for (let i2 = 0, max = initialPrimitive < 0 ? args.length : initialPrimitive; i2 < max; i2++) {
    if ("string|number".includes(typeof args[i2])) {
      command.push(String(args[i2]));
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
  }
});
function callTaskParser(parser4, streams) {
  return parser4(streams.stdOut, streams.stdErr);
}
function parseStringResponse(result, parsers12, texts, trim = true) {
  asArray(texts).forEach((text) => {
    for (let lines = toLinesWithContent(text, trim), i2 = 0, max = lines.length; i2 < max; i2++) {
      const line = (offset = 0) => {
        if (i2 + offset >= max) {
          return;
        }
        return lines[i2 + offset];
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
  for (let i2 = 0, max = lines.length - 1; i2 < max; ) {
    const file = configFilePath(lines[i2++]);
    let value = lines[i2++];
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
        const args = this._plugins.exec("spawn.args", [...task.commands], {
          ...pluginContext(task, task.commands),
          env: { ...this.env }
        });
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
  for (let i2 = 0; i2 < customArgs.length; i2++) {
    const format = logFormatRegex.exec(customArgs[i2]);
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
    command.push("--follow", c(opt.file));
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
  return indexY.map((y2) => parser3(indexX, y2, (result, file) => result.conflicted.push(file)));
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
      for (let i2 = 0, l = lines.length; i2 < l; ) {
        let line = lines[i2++].trim();
        if (!line) {
          continue;
        }
        if (line.charAt(0) === "R") {
          line += NULL + (lines[i2++] || "");
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
    cloneTask = (repo, directory, customArgs) => {
      const commands = ["clone", ...customArgs];
      filterString(repo) && commands.push(c(repo));
      filterString(directory) && commands.push(c(directory));
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
    onError({ exitCode, stdErr, stdOut }, error, _3, fail) {
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
function singleSorted(a, b2) {
  const aIsNum = Number.isNaN(a);
  const bIsNum = Number.isNaN(b2);
  if (aIsNum !== bIsNum) {
    return aIsNum ? 1 : -1;
  }
  return aIsNum ? sorted(a, b2) : 0;
}
function sorted(a, b2) {
  return a === b2 ? 0 : a > b2 ? 1 : -1;
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
          for (let i2 = 0, l = Math.max(partsA.length, partsB.length); i2 < l; i2++) {
            const diff = sorted(toNumber(partsA[i2]), toNumber(partsB[i2]));
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
      for (let i2 = 0; i2 < command.length && createRestCommands; i2++) {
        if (!filterPrimitives2(command[i2])) {
          command.splice(i2, command.length - i2);
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
function blockUnsafeOperationsPlugin(options = {}) {
  return {
    type: "spawn.args",
    action(args, { env }) {
      for (const vulnerability of ne2(args, env)) {
        if (options[vulnerability.category] !== true) {
          throw new GitPluginError(void 0, "unsafe", vulnerability.message);
        }
      }
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
function suffixPathsPlugin() {
  return {
    type: "spawn.args",
    action(data) {
      const prefix = [];
      let suffix;
      function append2(args) {
        (suffix = suffix || []).push(...args);
      }
      for (let i2 = 0; i2 < data.length; i2++) {
        const param = data[i2];
        if (r(param)) {
          append2(o(param));
          continue;
        }
        if (param === "--") {
          append2(
            data.slice(i2 + 1).flatMap((item) => r(item) && o(item) || item)
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
async function getLatestCommitHash(projectPath) {
  const git = esm_default(projectPath);
  try {
    const log = await git.log({ maxCount: 1 });
    return log.latest?.hash ?? null;
  } catch {
    return null;
  }
}
async function getRemoteBranchTip(projectPath, branch) {
  const git = esm_default(projectPath);
  try {
    const hash = await git.raw(["rev-parse", `origin/${branch}`]);
    return hash.trim() || null;
  } catch {
    return null;
  }
}
function normaliseRemoteUrl(raw) {
  const trimmed2 = raw.trim();
  const sshMatch = trimmed2.match(/^git@([^:]+):(.+?)(?:\.git)?$/);
  if (sshMatch) {
    return `https://${sshMatch[1]}/${sshMatch[2]}`;
  }
  if (trimmed2.startsWith("https://") || trimmed2.startsWith("http://")) {
    return trimmed2.replace(/\.git$/, "").replace(/\/$/, "");
  }
  return null;
}
async function getRepoUrl(projectPath) {
  const git = esm_default(projectPath);
  try {
    const remotes = await git.getRemotes(true);
    const origin = remotes.find((r2) => r2.name === "origin");
    const raw = origin?.refs?.fetch || origin?.refs?.push;
    if (!raw) return null;
    return normaliseRemoteUrl(raw);
  } catch {
    return null;
  }
}
async function getDefaultBranch(projectPath) {
  const git = esm_default(projectPath);
  try {
    const ref = await git.raw(["symbolic-ref", "refs/remotes/origin/HEAD"]);
    const match = ref.trim().match(/^refs\/remotes\/origin\/(.+)$/);
    if (match) return match[1];
  } catch {
  }
  for (const candidate of ["main", "master"]) {
    try {
      await git.raw(["rev-parse", "--verify", `origin/${candidate}`]);
      return candidate;
    } catch {
    }
  }
  return "main";
}
async function buildHistory(projectPath, frameworkConfigs, defaultBranch, sinceCommit, fullHistory, sinceDate) {
  const git = esm_default(projectPath);
  const errors = [];
  const warnings = [];
  const remoteRef = `origin/${defaultBranch}`;
  const allTestDirs = frameworkConfigs.filter((c3) => c3.framework !== "unknown").map((c3) => c3.testDir.replace(/^\.\//, ""));
  let logArgs;
  if (sinceCommit) {
    logArgs = allTestDirs.length > 0 ? [`${sinceCommit}..${remoteRef}`, "--", ...allTestDirs] : [`${sinceCommit}..${remoteRef}`];
  } else if (fullHistory) {
    logArgs = [remoteRef];
  } else {
    logArgs = allTestDirs.length > 0 ? [remoteRef, "--", ...allTestDirs] : [remoteRef];
  }
  if (sinceDate && !sinceCommit) {
    logArgs = [`--since=${sinceDate.toISOString()}`, ...logArgs];
  }
  let commits;
  try {
    commits = await fetchCommitsWithFiles(git, logArgs, fullHistory ? [] : allTestDirs);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[DEBUG] Git log error: ${error.message} with args: ${JSON.stringify(logArgs)}`);
      warnings.push(`Git log failed: ${error.message}`);
    }
    return { entries: [], errors, warnings };
  }
  if (commits.length === 0) {
    return { entries: [], errors, warnings };
  }
  console.log(`[sync] Processing ${commits.length} commits...`);
  const BATCH_SIZE = 20;
  const reportEvery = Math.max(50, Math.floor(commits.length / 10));
  const slots = new Array(commits.length).fill(null);
  let processed = 0;
  for (let batchStart = 0; batchStart < commits.length; batchStart += BATCH_SIZE) {
    const batch = commits.slice(batchStart, batchStart + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(async (commit, batchIdx) => {
        const slotIdx = batchStart + batchIdx;
        try {
          const specChanges = await buildSpecChanges(
            git,
            commit.hash,
            commit.fileChanges,
            frameworkConfigs,
            projectPath,
            errors
          );
          if (specChanges.length === 0) return { slotIdx, entry: null };
          return {
            slotIdx,
            entry: {
              commit: {
                hash: commit.hash,
                shortHash: commit.hash.substring(0, 7),
                message: commit.message,
                author: commit.author,
                date: new Date(commit.date).toISOString(),
                changes: commit.fileChanges
              },
              specs: specChanges
            }
          };
        } catch (error) {
          errors.push({
            commit: commit.hash,
            file: "unknown",
            reason: error instanceof Error ? error.message : "Unknown error",
            partial: true
          });
          return { slotIdx, entry: null };
        }
      })
    );
    for (const { slotIdx, entry } of batchResults) {
      slots[slotIdx] = entry;
    }
    const prevProcessed = processed;
    processed += batch.length;
    if (Math.floor(prevProcessed / reportEvery) !== Math.floor(processed / reportEvery) || processed >= commits.length) {
      console.log(`[sync]   \u2192 ${processed}/${commits.length} commits processed`);
    }
  }
  const entries = slots.filter((e) => e !== null);
  return { entries, errors, warnings };
}
var COMMIT_SEP = "<<<COMMIT>>>";
var FIELD_SEP = "<<<F>>>";
async function fetchCommitsWithFiles(git, logArgs, testDirs) {
  const raw = await git.raw([
    "log",
    `--format=${COMMIT_SEP}%H${FIELD_SEP}%an${FIELD_SEP}%ai${FIELD_SEP}%s`,
    "--name-status",
    "--diff-filter=ADRM",
    "-M",
    ...logArgs
  ]);
  if (!raw.trim()) return [];
  const result = [];
  const blocks = raw.split(COMMIT_SEP).filter(Boolean);
  for (const block of blocks) {
    const lines = block.split("\n");
    const [hash, author, date, ...msgParts] = lines[0].split(FIELD_SEP);
    const message = msgParts.join(FIELD_SEP);
    if (!hash?.trim()) continue;
    const fileChanges = [];
    for (let i2 = 1; i2 < lines.length; i2++) {
      const line = lines[i2];
      if (!line || !line.trim()) continue;
      const parts = line.split("	");
      const status = parts[0];
      if (status.startsWith("R")) {
        const oldPath = parts[1];
        const newPath = parts[2];
        if (!newPath) continue;
        if (!testDirs.length || isInAnyTestDir(newPath, testDirs) || isInAnyTestDir(oldPath, testDirs)) {
          fileChanges.push({ path: newPath.trim(), oldPath: oldPath.trim(), status: "renamed" });
        }
      } else {
        const filePath = parts[1];
        if (!filePath) continue;
        if (testDirs.length && !isInAnyTestDir(filePath.trim(), testDirs)) continue;
        const mapped = mapGitStatus(status);
        if (mapped) fileChanges.push({ path: filePath.trim(), status: mapped });
      }
    }
    if (fileChanges.length > 0) {
      result.push({
        hash: hash.trim(),
        author: author ?? "",
        date: date ?? "",
        message: message ?? "",
        fileChanges
      });
    }
  }
  return result.reverse();
}
function isInTestDir(filePath, testDir) {
  if (testDir === ".") return true;
  const normalised = testDir.endsWith("/") ? testDir : testDir + "/";
  return filePath.startsWith(normalised) || import_path8.default.dirname(filePath) + "/" === normalised;
}
function isInAnyTestDir(filePath, testDirs) {
  return testDirs.some((dir) => isInTestDir(filePath, dir));
}
function resolveFrameworkForFile(filePath, frameworkConfigs) {
  let bestMatch = null;
  for (const { framework, testDir } of frameworkConfigs) {
    if (framework === "unknown") continue;
    const normalised = testDir.replace(/^\.\//, "");
    if (isInTestDir(filePath, normalised)) {
      if (!bestMatch || normalised.length > bestMatch.testDirLength) {
        bestMatch = { framework, testDirLength: normalised.length };
      }
    }
  }
  return bestMatch?.framework ?? null;
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
async function buildSpecChanges(git, hash, fileChanges, frameworkConfigs, projectPath, errors) {
  const entries = [];
  for (const change of fileChanges) {
    const framework = resolveFrameworkForFile(change.path, frameworkConfigs);
    if (!framework || !isSpecFile(change.path, framework)) continue;
    let effectiveChange = change;
    if (change.status === "renamed" && change.oldPath) {
      const oldFramework = resolveFrameworkForFile(change.oldPath, frameworkConfigs);
      const newFramework = resolveFrameworkForFile(change.path, frameworkConfigs);
      if (!oldFramework && newFramework) {
        effectiveChange = { path: change.path, status: "added" };
      } else if (oldFramework && !newFramework) {
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
function isSpecFile(filePath, framework) {
  switch (framework) {
    case "playwright":
      return /\.spec\.[jt]s(x?)$/.test(filePath);
    case "cypress":
      return /\.cy\.[jt]s$|\.spec\.[jt]s$/.test(filePath);
    case "vitest":
      return /\.(spec|test)\.[jt]sx?$/.test(filePath);
    case "testng":
    case "junit":
      return /(Test|Tests|TestCase)\.java$/.test(filePath);
    default:
      return /\.(spec|test)\.[jt]s$/.test(filePath);
  }
}
function detectMaintenanceChanges(previousContent, currentContent, framework, alreadyChangedTests) {
  if (!previousContent || !currentContent) return [];
  const prevTests = extractTestsWithLinesFromContent(previousContent, framework);
  const currTests = extractTestsWithLinesFromContent(currentContent, framework);
  if (prevTests.length === 0 || currTests.length === 0) return [];
  const alreadyChangedNames = new Set(
    alreadyChangedTests.flatMap((c3) => c3.oldName ? [c3.name, c3.oldName] : [c3.name])
  );
  const prevNames = new Set(prevTests.map((t2) => t2.name));
  const currNames = new Set(currTests.map((t2) => t2.name));
  const stableNames = [...currNames].filter((name) => prevNames.has(name) && !alreadyChangedNames.has(name));
  if (stableNames.length === 0) return [];
  const prevLines = previousContent.split("\n");
  const currLines = currentContent.split("\n");
  function getTestSpan(tests, name, lines) {
    const sorted2 = [...tests].sort((a, b2) => a.line - b2.line);
    const idx = sorted2.findIndex((t2) => t2.name === name);
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
  const added = [...current].filter((t2) => !previous.has(t2));
  const removed = [...previous].filter((t2) => !current.has(t2));
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
function makeAuthHeaders(apiToken) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiToken}`
  };
}
async function validateProjectAccess(dashboardUrl, apiToken, projectId) {
  const url = new URL(`/api/projects/${projectId}/config`, dashboardUrl).toString();
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: makeAuthHeaders(apiToken)
    });
    if (response.status === 401 || response.status === 403) {
      throw new Error("Invalid API key. Please check your API_KEY.");
    }
    if (response.status === 404) {
      throw new Error(
        `Project not found: ${projectId}. Please check your PROJECT_ID.`
      );
    }
    if (!response.ok) {
      console.warn(`[sync] Warning: Could not validate project access (${response.status}). Proceeding anyway.`);
    }
  } catch (error) {
    if (error instanceof Error && (error.message.startsWith("Invalid API key") || error.message.startsWith("Project not found"))) {
      throw error;
    }
    console.warn("[sync] Warning: Could not reach dashboard to validate project access. Proceeding anyway.");
  }
}
async function fetchProjectConfig(dashboardUrl, apiToken, projectId) {
  const url = new URL(`/api/projects/${projectId}/config`, dashboardUrl).toString();
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: makeAuthHeaders(apiToken)
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
async function getSyncMarker(dashboardUrl, apiToken, projectId) {
  const url = new URL(`/api/projects/${projectId}/sync-marker`, dashboardUrl).toString();
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: makeAuthHeaders(apiToken)
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
  const response = await fetch(url, {
    method: "POST",
    headers: makeAuthHeaders(apiToken),
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
  const response = await fetch(url, {
    method: "POST",
    headers: makeAuthHeaders(apiToken),
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
var MAX_FIRST_SYNC_DAYS = 365;
function getChangeKey(change, specPath) {
  const path10 = specPath ?? "";
  const oldName = change.oldName ?? "";
  return `${path10}:${change.type}:${change.name}:${oldName}`;
}
function applyFrameworkOverrides(frameworkMap, overrides) {
  for (const override of overrides) {
    if (!override.dirs?.length) continue;
    const existing = frameworkMap.get(override.framework);
    if (existing) {
      existing.testDir = override.dirs[0];
      console.log(`[config] ${override.framework}: testDir overridden to ${override.dirs[0]}`);
    } else {
      frameworkMap.set(override.framework, {
        framework: override.framework,
        testDir: override.dirs[0],
        confidence: "high"
      });
      console.log(`[config] ${override.framework}: added via dashboard override (dir: ${override.dirs[0]})`);
    }
  }
}
function applyTestDirExcludes(frameworkMap, excludes) {
  for (const excludeDir of excludes) {
    const normalised = excludeDir.replace(/^\.\//, "");
    for (const [fw, config2] of frameworkMap) {
      const configDir = config2.testDir.replace(/^\.\//, "");
      if (configDir.startsWith(normalised)) {
        frameworkMap.delete(fw);
        console.log(`[config] ${fw}: excluded by testDirExcludes (${excludeDir})`);
      }
    }
  }
}
function transformSpecsForPayload(specs) {
  return specs.map((spec) => ({
    filePath: spec.path,
    framework: spec.framework,
    tests: spec.tests.map((test) => ({
      name: test.fullName,
      lineNumber: test.line,
      tags: test.tags.map((tag) => tag.name)
    }))
  }));
}
function deduplicateCommitChanges(entry) {
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
      { type: change.type, name: change.testName, oldName: change.oldName },
      change.specPath
    );
    if (seenKeys.has(key)) return false;
    seenKeys.add(key);
    return true;
  });
  const removedByName = /* @__PURE__ */ new Map();
  uniqueChanges.forEach((c3, i2) => {
    if (c3.type === "deleted") {
      const existing = removedByName.get(c3.testName) ?? [];
      existing.push(i2);
      removedByName.set(c3.testName, existing);
    }
  });
  const suppressedRemoves = /* @__PURE__ */ new Set();
  uniqueChanges.forEach((c3) => {
    if (c3.type === "added") {
      const removeIndices = removedByName.get(c3.testName);
      if (removeIndices) {
        const crossSpecIdx = removeIndices.find(
          (i2) => !suppressedRemoves.has(i2) && uniqueChanges[i2].specPath !== c3.specPath
        );
        if (crossSpecIdx !== void 0) suppressedRemoves.add(crossSpecIdx);
      }
    }
  });
  return uniqueChanges.filter((_3, i2) => !suppressedRemoves.has(i2));
}
async function syncProject(options) {
  const { projectId, apiKey, dashboardUrl } = options;
  console.log("[sync] Validating project access...");
  await validateProjectAccess(dashboardUrl, apiKey, projectId);
  const envLocalPath = import_path9.default.join(process.cwd(), ".env.local");
  if (import_fs4.default.existsSync(envLocalPath)) {
    import_dotenv.default.config({ path: envLocalPath, debug: false });
  }
  const detectedRepoUrl = await getRepoUrl(process.cwd());
  if (detectedRepoUrl) {
    console.log(`[sync] Detected repository URL: ${detectedRepoUrl}`);
  }
  const repoUrl = detectedRepoUrl ?? void 0;
  console.log("[config] Fetching project config from dashboard...");
  let projectConfig = await fetchProjectConfig(dashboardUrl, apiKey, projectId);
  const overrideCount = projectConfig?.frameworkOverrides?.length ?? 0;
  if (projectConfig === null) {
    console.log("[config] Warning: Could not reach dashboard config endpoint. Using auto-detected config");
  } else if (overrideCount > 0) {
    console.log(`[config] Loaded project config from dashboard (${overrideCount} framework override(s))`);
  } else {
    console.log("[config] No project overrides set. Using auto-detected config");
  }
  const defaultBranch = projectConfig?.defaultBranch ?? await getDefaultBranch(process.cwd());
  console.log(`[sync] Default branch: ${defaultBranch}`);
  console.log("[sync] Detecting frameworks...");
  const detected = detectFrameworks(process.cwd());
  const frameworkMap = new Map(detected.map((d) => [d.framework, d]));
  applyFrameworkOverrides(frameworkMap, projectConfig?.frameworkOverrides ?? []);
  applyTestDirExcludes(frameworkMap, projectConfig?.testDirExcludes ?? []);
  let frameworkConfigs = [...frameworkMap.values()];
  if (frameworkConfigs.length === 0) {
    const primary = projectConfig?.primaryFramework;
    frameworkConfigs = [{ framework: primary ?? "unknown", testDir: "./tests", confidence: "low" }];
    console.log(
      `[config] No frameworks remain after exclusions, falling back to: ${frameworkConfigs[0].framework}`
    );
  }
  console.log(`[sync] Active frameworks (${frameworkConfigs.length}):`);
  for (const { framework, testDir, confidence } of frameworkConfigs) {
    console.log(`[sync]   ${framework} \u2192 ${testDir} (${confidence})`);
  }
  console.log("[sync] Parsing test specifications...");
  const specs = parseAllSpecs(process.cwd(), frameworkConfigs);
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
  const sinceDate = isFirstSync ? new Date(Date.now() - MAX_FIRST_SYNC_DAYS * 864e5) : void 0;
  if (sinceDate) {
    console.log(`[sync] First sync: limiting history to last ${MAX_FIRST_SYNC_DAYS} days`);
  }
  const history = await buildHistory(
    process.cwd(),
    frameworkConfigs,
    defaultBranch,
    sinceCommit,
    false,
    // never do full history anymore
    sinceDate
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
  const transformedSpecs = transformSpecsForPayload(specs);
  const transformedHistory = history.entries.map((entry) => {
    const deduplicatedChanges = deduplicateCommitChanges(entry);
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
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    ...repoUrl ? { repoUrl } : {}
  };
  await syncToDashboard(dashboardUrl, apiKey, payload);
  console.log("[sync] Sync successful!");
  console.log(`[sync] Synced ${specs.length} specs with ${totalTests} tests`);
  console.log(`[sync] Dashboard: ${new URL(`/dashboard/${projectId}`, dashboardUrl).toString()}`);
  try {
    let lastHash = await getRemoteBranchTip(process.cwd(), defaultBranch);
    if (!lastHash) {
      lastHash = history.entries.length > 0 ? history.entries[history.entries.length - 1].commit.hash : await getLatestCommitHash(process.cwd());
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