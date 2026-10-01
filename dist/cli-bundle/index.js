#!/usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 666:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

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
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
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

// node_modules/.pnpm/tsup@8.5.1_postcss@8.5.28_tsx@4.23.15_typescript@7.0.2/node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "node_modules/.pnpm/tsup@8.5.1_postcss@8.5.28_tsx@4.23.15_typescript@7.0.2/node_modules/tsup/assets/cjs_shims.js"() {
    "use strict";
  }
});

// node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var s = 1e3;
    var m2 = s * 60;
    var h3 = m2 * 60;
    var d2 = h3 * 24;
    var w2 = d2 * 7;
    var y2 = d2 * 365.25;
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
      var match2 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match2) {
        return;
      }
      var n5 = parseFloat(match2[1]);
      var type = (match2[2] || "ms").toLowerCase();
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
          return n5 * w2;
        case "days":
        case "day":
        case "d":
          return n5 * d2;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n5 * h3;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n5 * m2;
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
    function fmtShort(ms3) {
      var msAbs = Math.abs(ms3);
      if (msAbs >= d2) {
        return Math.round(ms3 / d2) + "d";
      }
      if (msAbs >= h3) {
        return Math.round(ms3 / h3) + "h";
      }
      if (msAbs >= m2) {
        return Math.round(ms3 / m2) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms3 / s) + "s";
      }
      return ms3 + "ms";
    }
    function fmtLong(ms3) {
      var msAbs = Math.abs(ms3);
      if (msAbs >= d2) {
        return plural(ms3, msAbs, d2, "day");
      }
      if (msAbs >= h3) {
        return plural(ms3, msAbs, h3, "hour");
      }
      if (msAbs >= m2) {
        return plural(ms3, msAbs, m2, "minute");
      }
      if (msAbs >= s) {
        return plural(ms3, msAbs, s, "second");
      }
      return ms3 + " ms";
    }
    function plural(ms3, msAbs, n5, name) {
      var isPlural = msAbs >= n5 * 1.5;
      return Math.round(ms3 / n5) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/common.js"(exports2, module2) {
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
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms3 = curr - (prevTime || curr);
          self.diff = ms3;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match2, format) => {
            if (match2 === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match2 = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match2;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
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
          set: (v3) => {
            enableOverride = v3;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
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
        for (const ns3 of split) {
          if (ns3[0] === "-") {
            createDebug.skips.push(ns3.slice(1));
          } else {
            createDebug.names.push(ns3);
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
        for (const ns3 of createDebug.names) {
          if (matchesTemplate(name, ns3)) {
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

// node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/browser.js"(exports2, module2) {
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
      let m2;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m2 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m2[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
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
      args[0].replace(/%[a-zA-Z%]/g, (match2) => {
        if (match2 === "%%") {
          return;
        }
        index++;
        if (match2 === "%c") {
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
    formatters.j = function(v3) {
      try {
        return JSON.stringify(v3);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/node.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var tty = __nccwpck_require__(18);
    var util = __nccwpck_require__(23);
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
      const supportsColor = __nccwpck_require__(48);
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
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_4, k3) => {
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
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v3) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v3, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v3) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v3, this.inspectOpts);
    };
  }
});

// node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/.pnpm/@kwsites+file-exists@1.1.1/node_modules/@kwsites/file-exists/dist/src/index.js
var require_src2 = __commonJS({
  "node_modules/.pnpm/@kwsites+file-exists@1.1.1/node_modules/@kwsites/file-exists/dist/src/index.js"(exports2) {
    "use strict";
    init_cjs_shims();
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fs_1 = __nccwpck_require__(896);
    var debug_1 = __importDefault(require_src());
    var log = debug_1.default("@kwsites/file-exists");
    function check(path16, isFile, isDirectory) {
      log(`checking %s`, path16);
      try {
        const stat = fs_1.statSync(path16);
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
    function exists(path16, type = exports2.READABLE) {
      return check(path16, (type & exports2.FILE) > 0, (type & exports2.FOLDER) > 0);
    }
    exports2.exists = exists;
    exports2.FILE = 1;
    exports2.FOLDER = 2;
    exports2.READABLE = exports2.FILE + exports2.FOLDER;
  }
});

// node_modules/.pnpm/@kwsites+file-exists@1.1.1/node_modules/@kwsites/file-exists/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/@kwsites+file-exists@1.1.1/node_modules/@kwsites/file-exists/dist/index.js"(exports2) {
    "use strict";
    init_cjs_shims();
    function __export2(m2) {
      for (var p2 in m2) if (!exports2.hasOwnProperty(p2)) exports2[p2] = m2[p2];
    }
    Object.defineProperty(exports2, "__esModule", { value: true });
    __export2(require_src2());
  }
});

// node_modules/.pnpm/@kwsites+promise-deferred@1.1.1/node_modules/@kwsites/promise-deferred/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/.pnpm/@kwsites+promise-deferred@1.1.1/node_modules/@kwsites/promise-deferred/dist/index.js"(exports2) {
    "use strict";
    init_cjs_shims();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createDeferred = exports2.deferred = void 0;
    function deferred() {
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
    exports2.deferred = deferred;
    exports2.createDeferred = deferred;
    exports2.default = deferred;
  }
});

// src/cli.ts
var cli_exports = {};
__export(cli_exports, {
  cli: () => main,
  resolveSyncCredentials: () => resolveSyncCredentials,
  runCli: () => runCli
});
module.exports = __toCommonJS(cli_exports);
init_cjs_shims();
var import_child_process = __nccwpck_require__(317);
var import_fs6 = __toESM(__nccwpck_require__(896));
var import_path14 = __toESM(__nccwpck_require__(928));

// src/sync.ts
init_cjs_shims();

// package.json
var package_default = {
  name: "testchronicle",
  version: "0.1.21",
  description: "CLI agent for syncing test data to Test Chronicle",
  author: "Daniel Williams",
  license: "MIT",
  keywords: [
    "testing",
    "test-management",
    "ci-cd",
    "github-action",
    "test-sync",
    "test-automation",
    "testing-framework",
    "quality-assurance"
  ],
  repository: {
    type: "git",
    url: "https://github.com/TestChronicle/test-chronicle-agent.git"
  },
  bin: {
    testchronicle: "./dist/cli.js"
  },
  main: "./dist/index.js",
  types: "./dist/index.d.ts",
  files: [
    "dist",
    "action.yml",
    "README.md",
    "LICENSE"
  ],
  scripts: {
    dev: "tsx src/cli.ts",
    build: "tsup && tsc -p tsconfig.build.json && ncc build dist/cli.js -o dist/cli-bundle --target es2020",
    "bundle:cli": "ncc build dist/cli.js -o dist/cli-bundle --target es2020",
    "pack:dry-run": "npm pack --dry-run",
    test: "vitest run",
    "test:watch": "vitest watch"
  },
  dependencies: {
    glob: "^13.0.6",
    minimatch: "10.2.6",
    "simple-git": "^4.0.2"
  },
  devDependencies: {
    "@types/node": "^26.0.0",
    "@vercel/ncc": "^0.45.0",
    tsup: "^8.5.1",
    tsx: "^4.21.0",
    typescript: "^7.0.2",
    vitest: "^5.0.2"
  },
  engines: {
    node: ">=18.0.0"
  },
  packageManager: "pnpm@11.0.0",
  publishConfig: {
    access: "public",
    provenance: true
  }
};

// src/core/index.ts
init_cjs_shims();

// src/core/detector.ts
init_cjs_shims();
var import_fs2 = __nccwpck_require__(896);
var import_path = __toESM(__nccwpck_require__(928));

// node_modules/.pnpm/glob@13.0.6/node_modules/glob/dist/esm/index.min.js
init_cjs_shims();
var import_node_url = __nccwpck_require__(16);
var import_node_path = __nccwpck_require__(928);
var import_node_url2 = __nccwpck_require__(16);
var import_fs = __nccwpck_require__(896);
var xi = __toESM(__nccwpck_require__(896), 1);
var import_promises = __nccwpck_require__(943);
var import_node_events = __nccwpck_require__(434);
var import_node_stream = __toESM(__nccwpck_require__(203), 1);
var import_node_string_decoder = __nccwpck_require__(193);
var Gt = (n5, t2, e) => {
  let s = n5 instanceof RegExp ? ce(n5, e) : n5, i = t2 instanceof RegExp ? ce(t2, e) : t2, r2 = s !== null && i != null && ss(s, i, e);
  return r2 && { start: r2[0], end: r2[1], pre: e.slice(0, r2[0]), body: e.slice(r2[0] + s.length, r2[1]), post: e.slice(r2[1] + i.length) };
};
var ce = (n5, t2) => {
  let e = t2.match(n5);
  return e ? e[0] : null;
};
var ss = (n5, t2, e) => {
  let s, i, r2, o2, h3, a = e.indexOf(n5), l3 = e.indexOf(t2, a + 1), u2 = a;
  if (a >= 0 && l3 > 0) {
    if (n5 === t2) return [a, l3];
    for (s = [], r2 = e.length; u2 >= 0 && !h3; ) {
      if (u2 === a) s.push(u2), a = e.indexOf(n5, u2 + 1);
      else if (s.length === 1) {
        let c3 = s.pop();
        c3 !== void 0 && (h3 = [c3, l3]);
      } else i = s.pop(), i !== void 0 && i < r2 && (r2 = i, o2 = l3), l3 = e.indexOf(t2, u2 + 1);
      u2 = a < l3 && a >= 0 ? a : l3;
    }
    s.length && o2 !== void 0 && (h3 = [r2, o2]);
  }
  return h3;
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
  let { pre: s, body: i, post: r2 } = e, o2 = s.split(",");
  o2[o2.length - 1] += "{" + i + "}";
  let h3 = me(r2);
  return r2.length && (o2[o2.length - 1] += h3.shift(), o2.push.apply(o2, h3)), t2.push.apply(t2, o2), t2;
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
  let s = [], i = Gt("{", "}", n5);
  if (!i) return [n5];
  let r2 = i.pre, o2 = i.post.length ? ht(i.post, t2, false) : [""];
  if (/\$$/.test(i.pre)) for (let h3 = 0; h3 < o2.length && h3 < t2; h3++) {
    let a = r2 + "{" + i.body + "}" + o2[h3];
    s.push(a);
  }
  else {
    let h3 = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(i.body), a = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(i.body), l3 = h3 || a, u2 = i.body.indexOf(",") >= 0;
    if (!l3 && !u2) return i.post.match(/,(?!,).*\}/) ? (n5 = i.pre + "{" + i.body + qt + i.post, ht(n5, t2, true)) : [n5];
    let c3;
    if (l3) c3 = i.body.split(/\.\./);
    else if (c3 = me(i.body), c3.length === 1 && c3[0] !== void 0 && (c3 = ht(c3[0], t2, false).map(gs), c3.length === 1)) return o2.map((f3) => i.pre + c3[0] + f3);
    let d2;
    if (l3 && c3[0] !== void 0 && c3[1] !== void 0) {
      let f3 = Ht(c3[0]), m2 = Ht(c3[1]), p2 = Math.max(c3[0].length, c3[1].length), w2 = c3.length === 3 && c3[2] !== void 0 ? Math.abs(Ht(c3[2])) : 1, g2 = ys;
      m2 < f3 && (w2 *= -1, g2 = bs);
      let E3 = c3.some(ws);
      d2 = [];
      for (let y2 = f3; g2(y2, m2); y2 += w2) {
        let b3;
        if (a) b3 = String.fromCharCode(y2), b3 === "\\" && (b3 = "");
        else if (b3 = String(y2), E3) {
          let z3 = p2 - b3.length;
          if (z3 > 0) {
            let $3 = new Array(z3 + 1).join("0");
            y2 < 0 ? b3 = "-" + $3 + b3.slice(1) : b3 = $3 + b3;
          }
        }
        d2.push(b3);
      }
    } else {
      d2 = [];
      for (let f3 = 0; f3 < c3.length; f3++) d2.push.apply(d2, ht(c3[f3], t2, false));
    }
    for (let f3 = 0; f3 < d2.length; f3++) for (let m2 = 0; m2 < o2.length && s.length < t2; m2++) {
      let p2 = r2 + d2[f3] + o2[m2];
      (!e || l3 || p2) && s.push(p2);
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
  let s = [], i = [], r2 = e + 1, o2 = false, h3 = false, a = false, l3 = false, u2 = e, c3 = "";
  t: for (; r2 < n5.length; ) {
    let p2 = n5.charAt(r2);
    if ((p2 === "!" || p2 === "^") && r2 === e + 1) {
      l3 = true, r2++;
      continue;
    }
    if (p2 === "]" && o2 && !a) {
      u2 = r2 + 1;
      break;
    }
    if (o2 = true, p2 === "\\" && !a) {
      a = true, r2++;
      continue;
    }
    if (p2 === "[" && !a) {
      for (let [w2, [g2, S3, E3]] of Object.entries(Ss)) if (n5.startsWith(w2, r2)) {
        if (c3) return ["$.", false, n5.length - e, true];
        r2 += w2.length, E3 ? i.push(g2) : s.push(g2), h3 = h3 || S3;
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
  if (u2 < r2) return ["", false, 0, false];
  if (!s.length && !i.length) return ["$.", false, n5.length - e, true];
  if (i.length === 0 && s.length === 1 && /^\\?.$/.test(s[0]) && !l3) {
    let p2 = s[0].length === 2 ? s[0].slice(-1) : s[0];
    return [Es(p2), false, u2 - e, false];
  }
  let d2 = "[" + (l3 ? "^" : "") + we(s) + "]", f3 = "[" + (l3 ? "" : "^") + we(i) + "]";
  return [s.length && i.length ? "(" + d2 + "|" + f3 + ")" : s.length ? d2 : f3, h3, u2 - e, true];
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
    let t2 = this.toString(), [e, s, i, r2] = this.toRegExpSource();
    if (!(i || __privateGet(this, _s) || __privateGet(this, _h).nocase && !__privateGet(this, _h).nocaseMagicOnly && t2.toUpperCase() !== t2.toLowerCase())) return s;
    let h3 = (__privateGet(this, _h).nocase ? "i" : "") + (r2 ? "u" : "");
    return Object.assign(new RegExp(`^${e}$`, h3), { _src: e, _glob: t2 });
  }
  get options() {
    return __privateGet(this, _h);
  }
  toRegExpSource(t2) {
    let e = t2 ?? !!__privateGet(this, _h).dot;
    if (__privateGet(this, _t) === this && __privateMethod(this, _n_instances, a_fn).call(this), !this.type) {
      let a = this.isStart() && this.isEnd() && !__privateGet(this, _r).some((f3) => typeof f3 != "string"), l3 = __privateGet(this, _r).map((f3) => {
        var _a12;
        let [m2, p2, w2, g2] = typeof f3 == "string" ? __privateMethod(_a12 = _a, _n_static, E_fn).call(_a12, f3, __privateGet(this, _s), a) : f3.toRegExpSource(t2);
        return __privateSet(this, _s, __privateGet(this, _s) || w2), __privateSet(this, _n, __privateGet(this, _n) || g2), m2;
      }).join(""), u2 = "";
      if (this.isStart() && typeof __privateGet(this, _r)[0] == "string" && !(__privateGet(this, _r).length === 1 && Ts.has(__privateGet(this, _r)[0]))) {
        let m2 = Cs, p2 = e && m2.has(l3.charAt(0)) || l3.startsWith("\\.") && m2.has(l3.charAt(2)) || l3.startsWith("\\.\\.") && m2.has(l3.charAt(4)), w2 = !e && !t2 && m2.has(l3.charAt(0));
        u2 = p2 ? vs : w2 ? Ct : "";
      }
      let c3 = "";
      return this.isEnd() && __privateGet(__privateGet(this, _t), _c) && __privateGet(this, _o)?.type === "!" && (c3 = "(?:$|\\/)"), [u2 + l3 + c3, W(l3), __privateSet(this, _s, !!__privateGet(this, _s)), __privateGet(this, _n)];
    }
    let s = this.type === "*" || this.type === "+", i = this.type === "!" ? "(?:(?!(?:" : "(?:", r2 = __privateMethod(this, _n_instances, d_fn).call(this, e);
    if (this.isStart() && this.isEnd() && !r2 && this.type !== "!") {
      let a = this.toString();
      return __privateSet(this, _r, [a]), this.type = null, __privateSet(this, _s, void 0), [a, W(this.toString()), false, false];
    }
    let o2 = !s || t2 || e || !Ct ? "" : __privateMethod(this, _n_instances, d_fn).call(this, true);
    o2 === r2 && (o2 = ""), o2 && (r2 = `(?:${r2})(?:${o2})*?`);
    let h3 = "";
    if (this.type === "!" && __privateGet(this, _f)) h3 = (this.isStart() && !e ? Ct : "") + Ee;
    else {
      let a = this.type === "!" ? "))" + (this.isStart() && !e && !t2 ? Ct : "") + Se + ")" : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && o2 ? ")" : this.type === "*" && o2 ? ")?" : `)${this.type}`;
      h3 = i + r2 + a;
    }
    return [h3, W(r2), __privateSet(this, _s, !!__privateGet(this, _s)), __privateGet(this, _n)];
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
      for (let i = __privateGet(e, _S) + 1; !s.type && i < __privateGet(s, _r).length; i++) for (let r2 of __privateGet(t2, _r)) {
        if (typeof r2 == "string") throw new Error("string part in extglob AST??");
        r2.copyIn(__privateGet(s, _r)[i]);
      }
      e = s, s = __privateGet(e, _o);
    }
  }
  return this;
}, _n_static = new WeakSet(), i_fn = function(t2, e, s, i) {
  var _a12, _b5;
  let r2 = false, o2 = false, h3 = -1, a = false;
  if (e.type === null) {
    let f3 = s, m2 = "";
    for (; f3 < t2.length; ) {
      let p2 = t2.charAt(f3++);
      if (r2 || p2 === "\\") {
        r2 = !r2, m2 += p2;
        continue;
      }
      if (o2) {
        f3 === h3 + 1 ? (p2 === "^" || p2 === "!") && (a = true) : p2 === "]" && !(f3 === h3 + 2 && a) && (o2 = false), m2 += p2;
        continue;
      } else if (p2 === "[") {
        o2 = true, h3 = f3, a = false, m2 += p2;
        continue;
      }
      if (!i.noext && be(p2) && t2.charAt(f3) === "(") {
        e.push(m2), m2 = "";
        let w2 = new _a(p2, e);
        f3 = __privateMethod(_a12 = _a, _n_static, i_fn).call(_a12, t2, w2, f3, i), e.push(w2);
        continue;
      }
      m2 += p2;
    }
    return e.push(m2), f3;
  }
  let l3 = s + 1, u2 = new _a(null, e), c3 = [], d2 = "";
  for (; l3 < t2.length; ) {
    let f3 = t2.charAt(l3++);
    if (r2 || f3 === "\\") {
      r2 = !r2, d2 += f3;
      continue;
    }
    if (o2) {
      l3 === h3 + 1 ? (f3 === "^" || f3 === "!") && (a = true) : f3 === "]" && !(l3 === h3 + 2 && a) && (o2 = false), d2 += f3;
      continue;
    } else if (f3 === "[") {
      o2 = true, h3 = l3, a = false, d2 += f3;
      continue;
    }
    if (be(f3) && t2.charAt(l3) === "(") {
      u2.push(d2), d2 = "";
      let m2 = new _a(f3, u2);
      u2.push(m2), l3 = __privateMethod(_b5 = _a, _n_static, i_fn).call(_b5, t2, m2, l3, i);
      continue;
    }
    if (f3 === "|") {
      u2.push(d2), d2 = "", c3.push(u2), u2 = new _a(null, e);
      continue;
    }
    if (f3 === ")") return d2 === "" && __privateGet(e, _r).length === 0 && __privateSet(e, _f, true), u2.push(d2), d2 = "", e.push(...c3, u2), l3;
    d2 += f3;
  }
  return e.type = null, __privateSet(e, _s, void 0), __privateSet(e, _r, [t2.substring(s - 1)]), l3;
}, d_fn = function(t2) {
  return __privateGet(this, _r).map((e) => {
    if (typeof e == "string") throw new Error("string type in extglob ast??");
    let [s, i, r2, o2] = e.toRegExpSource(t2);
    return __privateSet(this, _n, __privateGet(this, _n) || o2), s;
  }).filter((e) => !(this.isStart() && this.isEnd()) || !!e).join("|");
}, E_fn = function(t2, e, s = false) {
  let i = false, r2 = "", o2 = false, h3 = false;
  for (let a = 0; a < t2.length; a++) {
    let l3 = t2.charAt(a);
    if (i) {
      i = false, r2 += (As.has(l3) ? "\\" : "") + l3;
      continue;
    }
    if (l3 === "*") {
      if (h3) continue;
      h3 = true, r2 += s && /^[*]+$/.test(t2) ? Ee : Se, e = true;
      continue;
    } else h3 = false;
    if (l3 === "\\") {
      a === t2.length - 1 ? r2 += "\\\\" : i = true;
      continue;
    }
    if (l3 === "[") {
      let [u2, c3, d2, f3] = ye(t2, a);
      if (d2) {
        r2 += u2, o2 = o2 || c3, a += d2 - 1, e = e || f3;
        continue;
      }
    }
    if (l3 === "?") {
      r2 += Kt, e = true;
      continue;
    }
    r2 += ks(l3);
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
  return Object.assign((s, i, r2 = {}) => t2(s, i, N(n5, r2)), { Minimatch: class extends t2.Minimatch {
    constructor(i, r2 = {}) {
      super(i, N(n5, r2));
    }
    static defaults(i) {
      return t2.defaults(N(n5, i)).Minimatch;
    }
  }, AST: class extends t2.AST {
    constructor(i, r2, o2 = {}) {
      super(i, r2, N(n5, o2));
    }
    static fromGlob(i, r2 = {}) {
      return t2.AST.fromGlob(i, N(n5, r2));
    }
  }, unescape: (s, i = {}) => t2.unescape(s, N(n5, i)), escape: (s, i = {}) => t2.escape(s, N(n5, i)), filter: (s, i = {}) => t2.filter(s, N(n5, i)), defaults: (s) => t2.defaults(N(n5, s)), makeRe: (s, i = {}) => t2.makeRe(s, N(n5, i)), braceExpand: (s, i = {}) => t2.braceExpand(s, N(n5, i)), match: (s, i, r2 = {}) => t2.match(s, i, N(n5, r2)), sep: t2.sep, GLOBSTAR: A });
};
O.defaults = Zs;
var ke = (n5, t2 = {}) => (at(n5), t2.nobrace || !/\{(?:(?!\{).)*\}/.test(n5) ? [n5] : ge(n5, { max: t2.braceExpandMax }));
O.braceExpand = ke;
var Qs = (n5, t2 = {}) => new D(n5, t2).makeRe();
O.makeRe = Qs;
var ti = (n5, t2, e = {}) => {
  let s = new D(t2, e);
  return n5 = n5.filter((i) => s.match(i)), s.options.nonull && !n5.length && n5.push(t2), n5;
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
    let i = this.globParts.map((r2, o2, h3) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        let a = r2[0] === "" && r2[1] === "" && (r2[2] === "?" || !ve.test(r2[2])) && !ve.test(r2[3]), l3 = /^[a-z]:/i.test(r2[0]);
        if (a) return [...r2.slice(0, 4), ...r2.slice(4).map((u2) => this.parse(u2))];
        if (l3) return [r2[0], ...r2.slice(1).map((u2) => this.parse(u2))];
      }
      return r2.map((a) => this.parse(a));
    });
    if (this.debug(this.pattern, i), this.set = i.filter((r2) => r2.indexOf(false) === -1), this.isWindows) for (let r2 = 0; r2 < this.set.length; r2++) {
      let o2 = this.set[r2];
      o2[0] === "" && o2[1] === "" && this.globParts[r2][2] === "?" && typeof o2[3] == "string" && /^[a-z]:$/i.test(o2[3]) && (o2[2] = "?");
    }
    this.debug(this.pattern, this.set);
  }
  preprocess(t2) {
    if (this.options.noglobstar) for (let s = 0; s < t2.length; s++) for (let i = 0; i < t2[s].length; i++) t2[s][i] === "**" && (t2[s][i] = "*");
    let { optimizationLevel: e = 1 } = this.options;
    return e >= 2 ? (t2 = this.firstPhasePreProcess(t2), t2 = this.secondPhasePreProcess(t2)) : e >= 1 ? t2 = this.levelOneOptimize(t2) : t2 = this.adjascentGlobstarOptimize(t2), t2;
  }
  adjascentGlobstarOptimize(t2) {
    return t2.map((e) => {
      let s = -1;
      for (; (s = e.indexOf("**", s + 1)) !== -1; ) {
        let i = s;
        for (; e[i + 1] === "**"; ) i++;
        i !== s && e.splice(s, i - s);
      }
      return e;
    });
  }
  levelOneOptimize(t2) {
    return t2.map((e) => (e = e.reduce((s, i) => {
      let r2 = s[s.length - 1];
      return i === "**" && r2 === "**" ? s : i === ".." && r2 && r2 !== ".." && r2 !== "." && r2 !== "**" ? (s.pop(), s) : (s.push(i), s);
    }, []), e.length === 0 ? [""] : e));
  }
  levelTwoFileOptimize(t2) {
    Array.isArray(t2) || (t2 = this.slashSplit(t2));
    let e = false;
    do {
      if (e = false, !this.preserveMultipleSlashes) {
        for (let i = 1; i < t2.length - 1; i++) {
          let r2 = t2[i];
          i === 1 && r2 === "" && t2[0] === "" || (r2 === "." || r2 === "") && (e = true, t2.splice(i, 1), i--);
        }
        t2[0] === "." && t2.length === 2 && (t2[1] === "." || t2[1] === "") && (e = true, t2.pop());
      }
      let s = 0;
      for (; (s = t2.indexOf("..", s + 1)) !== -1; ) {
        let i = t2[s - 1];
        i && i !== "." && i !== ".." && i !== "**" && (e = true, t2.splice(s - 1, 2), s -= 2);
      }
    } while (e);
    return t2.length === 0 ? [""] : t2;
  }
  firstPhasePreProcess(t2) {
    let e = false;
    do {
      e = false;
      for (let s of t2) {
        let i = -1;
        for (; (i = s.indexOf("**", i + 1)) !== -1; ) {
          let o2 = i;
          for (; s[o2 + 1] === "**"; ) o2++;
          o2 > i && s.splice(i + 1, o2 - i);
          let h3 = s[i + 1], a = s[i + 2], l3 = s[i + 3];
          if (h3 !== ".." || !a || a === "." || a === ".." || !l3 || l3 === "." || l3 === "..") continue;
          e = true, s.splice(i, 1);
          let u2 = s.slice(0);
          u2[i] = "**", t2.push(u2), i--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let o2 = 1; o2 < s.length - 1; o2++) {
            let h3 = s[o2];
            o2 === 1 && h3 === "" && s[0] === "" || (h3 === "." || h3 === "") && (e = true, s.splice(o2, 1), o2--);
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
      let i = this.partsMatch(t2[e], t2[s], !this.preserveMultipleSlashes);
      if (i) {
        t2[e] = [], t2[s] = i;
        break;
      }
    }
    return t2.filter((e) => e.length);
  }
  partsMatch(t2, e, s = false) {
    let i = 0, r2 = 0, o2 = [], h3 = "";
    for (; i < t2.length && r2 < e.length; ) if (t2[i] === e[r2]) o2.push(h3 === "b" ? e[r2] : t2[i]), i++, r2++;
    else if (s && t2[i] === "**" && e[r2] === t2[i + 1]) o2.push(t2[i]), i++;
    else if (s && e[r2] === "**" && t2[i] === e[r2 + 1]) o2.push(e[r2]), r2++;
    else if (t2[i] === "*" && e[r2] && (this.options.dot || !e[r2].startsWith(".")) && e[r2] !== "**") {
      if (h3 === "b") return false;
      h3 = "a", o2.push(t2[i]), i++, r2++;
    } else if (e[r2] === "*" && t2[i] && (this.options.dot || !t2[i].startsWith(".")) && t2[i] !== "**") {
      if (h3 === "a") return false;
      h3 = "b", o2.push(e[r2]), i++, r2++;
    } else return false;
    return t2.length === e.length && o2;
  }
  parseNegate() {
    if (this.nonegate) return;
    let t2 = this.pattern, e = false, s = 0;
    for (let i = 0; i < t2.length && t2.charAt(i) === "!"; i++) e = !e, s++;
    s && (this.pattern = t2.slice(s)), this.negate = e;
  }
  matchOne(t2, e, s = false) {
    let i = this.options;
    if (this.isWindows) {
      let p2 = typeof t2[0] == "string" && /^[a-z]:$/i.test(t2[0]), w2 = !p2 && t2[0] === "" && t2[1] === "" && t2[2] === "?" && /^[a-z]:$/i.test(t2[3]), g2 = typeof e[0] == "string" && /^[a-z]:$/i.test(e[0]), S3 = !g2 && e[0] === "" && e[1] === "" && e[2] === "?" && typeof e[3] == "string" && /^[a-z]:$/i.test(e[3]), E3 = w2 ? 3 : p2 ? 0 : void 0, y2 = S3 ? 3 : g2 ? 0 : void 0;
      if (typeof E3 == "number" && typeof y2 == "number") {
        let [b3, z3] = [t2[E3], e[y2]];
        b3.toLowerCase() === z3.toLowerCase() && (e[y2] = b3, y2 > E3 ? e = e.slice(y2) : E3 > y2 && (t2 = t2.slice(E3)));
      }
    }
    let { optimizationLevel: r2 = 1 } = this.options;
    r2 >= 2 && (t2 = this.levelTwoFileOptimize(t2)), this.debug("matchOne", this, { file: t2, pattern: e }), this.debug("matchOne", t2.length, e.length);
    for (var o2 = 0, h3 = 0, a = t2.length, l3 = e.length; o2 < a && h3 < l3; o2++, h3++) {
      this.debug("matchOne loop");
      var u2 = e[h3], c3 = t2[o2];
      if (this.debug(e, u2, c3), u2 === false) return false;
      if (u2 === A) {
        this.debug("GLOBSTAR", [e, u2, c3]);
        var d2 = o2, f3 = h3 + 1;
        if (f3 === l3) {
          for (this.debug("** at the end"); o2 < a; o2++) if (t2[o2] === "." || t2[o2] === ".." || !i.dot && t2[o2].charAt(0) === ".") return false;
          return true;
        }
        for (; d2 < a; ) {
          var m2 = t2[d2];
          if (this.debug(`
globstar while`, t2, d2, e, f3, m2), this.matchOne(t2.slice(d2), e.slice(f3), s)) return this.debug("globstar found match!", d2, a, m2), true;
          if (m2 === "." || m2 === ".." || !i.dot && m2.charAt(0) === ".") {
            this.debug("dot detected!", t2, d2, e, f3);
            break;
          }
          this.debug("globstar swallow a segment, and continue"), d2++;
        }
        return !!(s && (this.debug(`
>>> no match, partial?`, t2, d2, e, f3), d2 === a));
      }
      let p2;
      if (typeof u2 == "string" ? (p2 = c3 === u2, this.debug("string match", u2, c3, p2)) : (p2 = u2.test(c3), this.debug("pattern match", u2, c3, p2)), !p2) return false;
    }
    if (o2 === a && h3 === l3) return true;
    if (o2 === a) return s;
    if (h3 === l3) return o2 === a - 1 && t2[o2] === "";
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
    let s, i = null;
    (s = t2.match(js)) ? i = e.dot ? zs : Is : (s = t2.match(Rs)) ? i = (e.nocase ? e.dot ? Ms : Ds : e.dot ? Fs : Os)(s[1]) : (s = t2.match(Bs)) ? i = (e.nocase ? e.dot ? $s : Us : e.dot ? Gs : Hs)(s) : (s = t2.match(Ns)) ? i = e.dot ? Ls : _s2 : (s = t2.match(Ws)) && (i = Ps);
    let r2 = Q.fromGlob(t2, this.options).toMMPattern();
    return i && typeof r2 == "object" && Reflect.defineProperty(r2, "test", { value: i }), r2;
  }
  makeRe() {
    if (this.regexp || this.regexp === false) return this.regexp;
    let t2 = this.set;
    if (!t2.length) return this.regexp = false, this.regexp;
    let e = this.options, s = e.noglobstar ? Vs : e.dot ? Ys : Xs, i = new Set(e.nocase ? ["i"] : []), r2 = t2.map((a) => {
      let l3 = a.map((c3) => {
        if (c3 instanceof RegExp) for (let d2 of c3.flags.split("")) i.add(d2);
        return typeof c3 == "string" ? ei(c3) : c3 === A ? A : c3._src;
      });
      l3.forEach((c3, d2) => {
        let f3 = l3[d2 + 1], m2 = l3[d2 - 1];
        c3 !== A || m2 === A || (m2 === void 0 ? f3 !== void 0 && f3 !== A ? l3[d2 + 1] = "(?:\\/|" + s + "\\/)?" + f3 : l3[d2] = s : f3 === void 0 ? l3[d2 - 1] = m2 + "(?:\\/|\\/" + s + ")?" : f3 !== A && (l3[d2 - 1] = m2 + "(?:\\/|\\/" + s + "\\/)" + f3, l3[d2 + 1] = A));
      });
      let u2 = l3.filter((c3) => c3 !== A);
      if (this.partial && u2.length >= 1) {
        let c3 = [];
        for (let d2 = 1; d2 <= u2.length; d2++) c3.push(u2.slice(0, d2).join("/"));
        return "(?:" + c3.join("|") + ")";
      }
      return u2.join("/");
    }).join("|"), [o2, h3] = t2.length > 1 ? ["(?:", ")"] : ["", ""];
    r2 = "^" + o2 + r2 + h3 + "$", this.partial && (r2 = "^(?:\\/|" + o2 + r2.slice(1, -1) + h3 + ")$"), this.negate && (r2 = "^(?!" + r2 + ").+$");
    try {
      this.regexp = new RegExp(r2, [...i].join(""));
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
    let i = this.slashSplit(t2);
    this.debug(this.pattern, "split", i);
    let r2 = this.set;
    this.debug(this.pattern, "set", r2);
    let o2 = i[i.length - 1];
    if (!o2) for (let h3 = i.length - 2; !o2 && h3 >= 0; h3--) o2 = i[h3];
    for (let h3 = 0; h3 < r2.length; h3++) {
      let a = r2[h3], l3 = i;
      if (s.matchBase && a.length === 1 && (l3 = [o2]), this.matchOne(l3, a, e)) return s.flipNegate ? true : !this.negate;
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
    __privateAdd(this, _I, (t2, e, s, i) => {
      if (s || i) throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
      return 0;
    });
    __publicField(this, _a3, "LRUCache");
    let { max: e = 0, ttl: s, ttlResolution: i = 1, ttlAutopurge: r2, updateAgeOnGet: o2, updateAgeOnHas: h3, allowStale: a, dispose: l3, onInsert: u2, disposeAfter: c3, noDisposeOnSet: d2, noUpdateTTL: f3, maxSize: m2 = 0, maxEntrySize: p2 = 0, sizeCalculation: w2, fetchMethod: g2, memoMethod: S3, noDeleteOnFetchRejection: E3, noDeleteOnStaleGet: y2, allowStaleOnFetchRejection: b3, allowStaleOnFetchAbort: z3, ignoreFetchAbort: $3, perf: J3 } = t2;
    if (J3 !== void 0 && typeof J3?.now != "function") throw new TypeError("perf option must have a now() method if specified");
    if (__privateSet(this, _c3, J3 ?? si), e !== 0 && !q(e)) throw new TypeError("max option must be a nonnegative integer");
    let Z3 = e ? De(e) : Array;
    if (!Z3) throw new Error("invalid max value: " + e);
    if (__privateSet(this, _t3, e), __privateSet(this, _s3, m2), this.maxEntrySize = p2 || __privateGet(this, _s3), this.sizeCalculation = w2, this.sizeCalculation) {
      if (!__privateGet(this, _s3) && !this.maxEntrySize) throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      if (typeof this.sizeCalculation != "function") throw new TypeError("sizeCalculation set to non-function");
    }
    if (S3 !== void 0 && typeof S3 != "function") throw new TypeError("memoMethod must be a function if defined");
    if (__privateSet(this, _w2, S3), g2 !== void 0 && typeof g2 != "function") throw new TypeError("fetchMethod must be a function if specified");
    if (__privateSet(this, _S2, g2), __privateSet(this, _A, !!g2), __privateSet(this, _f2, /* @__PURE__ */ new Map()), __privateSet(this, _a4, new Array(e).fill(void 0)), __privateSet(this, _i, new Array(e).fill(void 0)), __privateSet(this, _d, new Z3(e)), __privateSet(this, _E, new Z3(e)), __privateSet(this, _b2, 0), __privateSet(this, _p, 0), __privateSet(this, _R, ri.create(e)), __privateSet(this, _h2, 0), __privateSet(this, _u2, 0), typeof l3 == "function" && __privateSet(this, _n2, l3), typeof u2 == "function" && __privateSet(this, _r2, u2), typeof c3 == "function" ? (__privateSet(this, _o2, c3), __privateSet(this, _m, [])) : (__privateSet(this, _o2, void 0), __privateSet(this, _m, void 0)), __privateSet(this, _x, !!__privateGet(this, _n2)), __privateSet(this, __, !!__privateGet(this, _r2)), __privateSet(this, _e, !!__privateGet(this, _o2)), this.noDisposeOnSet = !!d2, this.noUpdateTTL = !!f3, this.noDeleteOnFetchRejection = !!E3, this.allowStaleOnFetchRejection = !!b3, this.allowStaleOnFetchAbort = !!z3, this.ignoreFetchAbort = !!$3, this.maxEntrySize !== 0) {
      if (__privateGet(this, _s3) !== 0 && !q(__privateGet(this, _s3))) throw new TypeError("maxSize must be a positive integer if specified");
      if (!q(this.maxEntrySize)) throw new TypeError("maxEntrySize must be a positive integer if specified");
      __privateMethod(this, _Me_instances, G_fn).call(this);
    }
    if (this.allowStale = !!a, this.noDeleteOnStaleGet = !!y2, this.updateAgeOnGet = !!o2, this.updateAgeOnHas = !!h3, this.ttlResolution = q(i) || i === 0 ? i : 1, this.ttlAutopurge = !!r2, this.ttl = s || 0, this.ttl) {
      if (!q(this.ttl)) throw new TypeError("ttl must be a positive integer if specified");
      __privateMethod(this, _Me_instances, M_fn).call(this);
    }
    if (__privateGet(this, _t3) === 0 && this.ttl === 0 && __privateGet(this, _s3) === 0) throw new TypeError("At least one of max, maxSize, or ttl is required");
    if (!this.ttlAutopurge && !__privateGet(this, _t3) && !__privateGet(this, _s3)) {
      let $t2 = "LRU_CACHE_UNBOUNDED";
      ii($t2) && (Oe.add($t2), Fe("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", $t2, _c2));
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
    }, backgroundFetch: (e, s, i, r2) => {
      var _a12;
      return __privateMethod(_a12 = t2, _Me_instances, U_fn).call(_a12, e, s, i, r2);
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
      let i = __privateGet(this, _i)[s], r2 = __privateMethod(this, _Me_instances, l_fn).call(this, i) ? i.__staleWhileFetching : i;
      if (r2 !== void 0 && t2(r2, __privateGet(this, _a4)[s], this)) return this.get(__privateGet(this, _a4)[s], e);
    }
  }
  forEach(t2, e = this) {
    for (let s of __privateMethod(this, _Me_instances, F_fn).call(this)) {
      let i = __privateGet(this, _i)[s], r2 = __privateMethod(this, _Me_instances, l_fn).call(this, i) ? i.__staleWhileFetching : i;
      r2 !== void 0 && t2.call(e, r2, __privateGet(this, _a4)[s], this);
    }
  }
  rforEach(t2, e = this) {
    for (let s of __privateMethod(this, _Me_instances, D_fn).call(this)) {
      let i = __privateGet(this, _i)[s], r2 = __privateMethod(this, _Me_instances, l_fn).call(this, i) ? i.__staleWhileFetching : i;
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
    let s = __privateGet(this, _i)[e], i = __privateMethod(this, _Me_instances, l_fn).call(this, s) ? s.__staleWhileFetching : s;
    if (i === void 0) return;
    let r2 = { value: i };
    if (__privateGet(this, _g) && __privateGet(this, _T)) {
      let o2 = __privateGet(this, _g)[e], h3 = __privateGet(this, _T)[e];
      if (o2 && h3) {
        let a = o2 - (__privateGet(this, _c3).now() - h3);
        r2.ttl = a, r2.start = Date.now();
      }
    }
    return __privateGet(this, _C) && (r2.size = __privateGet(this, _C)[e]), r2;
  }
  dump() {
    let t2 = [];
    for (let e of __privateMethod(this, _Me_instances, F_fn).call(this, { allowStale: true })) {
      let s = __privateGet(this, _a4)[e], i = __privateGet(this, _i)[e], r2 = __privateMethod(this, _Me_instances, l_fn).call(this, i) ? i.__staleWhileFetching : i;
      if (r2 === void 0 || s === void 0) continue;
      let o2 = { value: r2 };
      if (__privateGet(this, _g) && __privateGet(this, _T)) {
        o2.ttl = __privateGet(this, _g)[e];
        let h3 = __privateGet(this, _c3).now() - __privateGet(this, _T)[e];
        o2.start = Math.floor(Date.now() - h3);
      }
      __privateGet(this, _C) && (o2.size = __privateGet(this, _C)[e]), t2.unshift([s, o2]);
    }
    return t2;
  }
  load(t2) {
    this.clear();
    for (let [e, s] of t2) {
      if (s.start) {
        let i = Date.now() - s.start;
        s.start = __privateGet(this, _c3).now() - i;
      }
      this.set(e, s.value, s);
    }
  }
  set(t2, e, s = {}) {
    var _a12, _b5, _c7, _d4;
    if (e === void 0) return this.delete(t2), this;
    let { ttl: i = this.ttl, start: r2, noDisposeOnSet: o2 = this.noDisposeOnSet, sizeCalculation: h3 = this.sizeCalculation, status: a } = s, { noUpdateTTL: l3 = this.noUpdateTTL } = s, u2 = __privateGet(this, _I).call(this, t2, e, s.size || 0, h3);
    if (this.maxEntrySize && u2 > this.maxEntrySize) return a && (a.set = "miss", a.maxEntrySizeExceeded = true), __privateMethod(this, _Me_instances, O_fn).call(this, t2, "set"), this;
    let c3 = __privateGet(this, _h2) === 0 ? void 0 : __privateGet(this, _f2).get(t2);
    if (c3 === void 0) c3 = __privateGet(this, _h2) === 0 ? __privateGet(this, _p) : __privateGet(this, _R).length !== 0 ? __privateGet(this, _R).pop() : __privateGet(this, _h2) === __privateGet(this, _t3) ? __privateMethod(this, _Me_instances, B_fn).call(this, false) : __privateGet(this, _h2), __privateGet(this, _a4)[c3] = t2, __privateGet(this, _i)[c3] = e, __privateGet(this, _f2).set(t2, c3), __privateGet(this, _d)[__privateGet(this, _p)] = c3, __privateGet(this, _E)[c3] = __privateGet(this, _p), __privateSet(this, _p, c3), __privateWrapper(this, _h2)._++, __privateGet(this, _L).call(this, c3, u2, a), a && (a.set = "add"), l3 = false, __privateGet(this, __) && ((_a12 = __privateGet(this, _r2)) == null ? void 0 : _a12.call(this, e, t2, "add"));
    else {
      __privateMethod(this, _Me_instances, W_fn).call(this, c3);
      let d2 = __privateGet(this, _i)[c3];
      if (e !== d2) {
        if (__privateGet(this, _A) && __privateMethod(this, _Me_instances, l_fn).call(this, d2)) {
          d2.__abortController.abort(new Error("replaced"));
          let { __staleWhileFetching: f3 } = d2;
          f3 !== void 0 && !o2 && (__privateGet(this, _x) && ((_b5 = __privateGet(this, _n2)) == null ? void 0 : _b5.call(this, f3, t2, "set")), __privateGet(this, _e) && __privateGet(this, _m)?.push([f3, t2, "set"]));
        } else o2 || (__privateGet(this, _x) && ((_c7 = __privateGet(this, _n2)) == null ? void 0 : _c7.call(this, d2, t2, "set")), __privateGet(this, _e) && __privateGet(this, _m)?.push([d2, t2, "set"]));
        if (__privateGet(this, _P).call(this, c3), __privateGet(this, _L).call(this, c3, u2, a), __privateGet(this, _i)[c3] = e, a) {
          a.set = "replace";
          let f3 = d2 && __privateMethod(this, _Me_instances, l_fn).call(this, d2) ? d2.__staleWhileFetching : d2;
          f3 !== void 0 && (a.oldValue = f3);
        }
      } else a && (a.set = "update");
      __privateGet(this, __) && this.onInsert?.(e, t2, e === d2 ? "update" : "replace");
    }
    if (i !== 0 && !__privateGet(this, _g) && __privateMethod(this, _Me_instances, M_fn).call(this), __privateGet(this, _g) && (l3 || __privateGet(this, _j).call(this, c3, i, r2), a && __privateGet(this, _N).call(this, a, c3)), !o2 && __privateGet(this, _e) && __privateGet(this, _m)) {
      let d2 = __privateGet(this, _m), f3;
      for (; f3 = d2?.shift(); ) (_d4 = __privateGet(this, _o2)) == null ? void 0 : _d4.call(this, ...f3);
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
    let { updateAgeOnHas: s = this.updateAgeOnHas, status: i } = e, r2 = __privateGet(this, _f2).get(t2);
    if (r2 !== void 0) {
      let o2 = __privateGet(this, _i)[r2];
      if (__privateMethod(this, _Me_instances, l_fn).call(this, o2) && o2.__staleWhileFetching === void 0) return false;
      if (__privateGet(this, _v).call(this, r2)) i && (i.has = "stale", __privateGet(this, _N).call(this, i, r2));
      else return s && __privateGet(this, _k).call(this, r2), i && (i.has = "hit", __privateGet(this, _N).call(this, i, r2)), true;
    } else i && (i.has = "miss");
    return false;
  }
  peek(t2, e = {}) {
    let { allowStale: s = this.allowStale } = e, i = __privateGet(this, _f2).get(t2);
    if (i === void 0 || !s && __privateGet(this, _v).call(this, i)) return;
    let r2 = __privateGet(this, _i)[i];
    return __privateMethod(this, _Me_instances, l_fn).call(this, r2) ? r2.__staleWhileFetching : r2;
  }
  async fetch(t2, e = {}) {
    let { allowStale: s = this.allowStale, updateAgeOnGet: i = this.updateAgeOnGet, noDeleteOnStaleGet: r2 = this.noDeleteOnStaleGet, ttl: o2 = this.ttl, noDisposeOnSet: h3 = this.noDisposeOnSet, size: a = 0, sizeCalculation: l3 = this.sizeCalculation, noUpdateTTL: u2 = this.noUpdateTTL, noDeleteOnFetchRejection: c3 = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection: d2 = this.allowStaleOnFetchRejection, ignoreFetchAbort: f3 = this.ignoreFetchAbort, allowStaleOnFetchAbort: m2 = this.allowStaleOnFetchAbort, context: p2, forceRefresh: w2 = false, status: g2, signal: S3 } = e;
    if (!__privateGet(this, _A)) return g2 && (g2.fetch = "get"), this.get(t2, { allowStale: s, updateAgeOnGet: i, noDeleteOnStaleGet: r2, status: g2 });
    let E3 = { allowStale: s, updateAgeOnGet: i, noDeleteOnStaleGet: r2, ttl: o2, noDisposeOnSet: h3, size: a, sizeCalculation: l3, noUpdateTTL: u2, noDeleteOnFetchRejection: c3, allowStaleOnFetchRejection: d2, allowStaleOnFetchAbort: m2, ignoreFetchAbort: f3, status: g2, signal: S3 }, y2 = __privateGet(this, _f2).get(t2);
    if (y2 === void 0) {
      g2 && (g2.fetch = "miss");
      let b3 = __privateMethod(this, _Me_instances, U_fn).call(this, t2, y2, E3, p2);
      return b3.__returned = b3;
    } else {
      let b3 = __privateGet(this, _i)[y2];
      if (__privateMethod(this, _Me_instances, l_fn).call(this, b3)) {
        let Z3 = s && b3.__staleWhileFetching !== void 0;
        return g2 && (g2.fetch = "inflight", Z3 && (g2.returnedStale = true)), Z3 ? b3.__staleWhileFetching : b3.__returned = b3;
      }
      let z3 = __privateGet(this, _v).call(this, y2);
      if (!w2 && !z3) return g2 && (g2.fetch = "hit"), __privateMethod(this, _Me_instances, W_fn).call(this, y2), i && __privateGet(this, _k).call(this, y2), g2 && __privateGet(this, _N).call(this, g2, y2), b3;
      let $3 = __privateMethod(this, _Me_instances, U_fn).call(this, t2, y2, E3, p2), J3 = $3.__staleWhileFetching !== void 0 && s;
      return g2 && (g2.fetch = z3 ? "stale" : "refresh", J3 && z3 && (g2.returnedStale = true)), J3 ? $3.__staleWhileFetching : $3.__returned = $3;
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
    let { context: i, forceRefresh: r2, ...o2 } = e, h3 = this.get(t2, o2);
    if (!r2 && h3 !== void 0) return h3;
    let a = s(t2, h3, { options: o2, context: i });
    return this.set(t2, a, o2), a;
  }
  get(t2, e = {}) {
    let { allowStale: s = this.allowStale, updateAgeOnGet: i = this.updateAgeOnGet, noDeleteOnStaleGet: r2 = this.noDeleteOnStaleGet, status: o2 } = e, h3 = __privateGet(this, _f2).get(t2);
    if (h3 !== void 0) {
      let a = __privateGet(this, _i)[h3], l3 = __privateMethod(this, _Me_instances, l_fn).call(this, a);
      return o2 && __privateGet(this, _N).call(this, o2, h3), __privateGet(this, _v).call(this, h3) ? (o2 && (o2.get = "stale"), l3 ? (o2 && s && a.__staleWhileFetching !== void 0 && (o2.returnedStale = true), s ? a.__staleWhileFetching : void 0) : (r2 || __privateMethod(this, _Me_instances, O_fn).call(this, t2, "expire"), o2 && s && (o2.returnedStale = true), s ? a : void 0)) : (o2 && (o2.get = "hit"), l3 ? a.__staleWhileFetching : (__privateMethod(this, _Me_instances, W_fn).call(this, h3), i && __privateGet(this, _k).call(this, h3), a));
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
  __privateSet(this, _y, s), __privateSet(this, _j, (o2, h3, a = __privateGet(this, _c3).now()) => {
    if (e[o2] = h3 !== 0 ? a : 0, t2[o2] = h3, s?.[o2] && (clearTimeout(s[o2]), s[o2] = void 0), h3 !== 0 && s) {
      let l3 = setTimeout(() => {
        __privateGet(this, _v).call(this, o2) && __privateMethod(this, _Me_instances, O_fn).call(this, __privateGet(this, _a4)[o2], "expire");
      }, h3 + 1);
      l3.unref && l3.unref(), s[o2] = l3;
    }
  }), __privateSet(this, _k, (o2) => {
    e[o2] = t2[o2] !== 0 ? __privateGet(this, _c3).now() : 0;
  }), __privateSet(this, _N, (o2, h3) => {
    if (t2[h3]) {
      let a = t2[h3], l3 = e[h3];
      if (!a || !l3) return;
      o2.ttl = a, o2.start = l3, o2.now = i || r2();
      let u2 = o2.now - l3;
      o2.remainingTTL = a - u2;
    }
  });
  let i = 0, r2 = () => {
    let o2 = __privateGet(this, _c3).now();
    if (this.ttlResolution > 0) {
      i = o2;
      let h3 = setTimeout(() => i = 0, this.ttlResolution);
      h3.unref && h3.unref();
    }
    return o2;
  };
  this.getRemainingTTL = (o2) => {
    let h3 = __privateGet(this, _f2).get(o2);
    if (h3 === void 0) return 0;
    let a = t2[h3], l3 = e[h3];
    if (!a || !l3) return 1 / 0;
    let u2 = (i || r2()) - l3;
    return a - u2;
  }, __privateSet(this, _v, (o2) => {
    let h3 = e[o2], a = t2[o2];
    return !!a && !!h3 && (i || r2()) - h3 > a;
  });
}, _k = new WeakMap(), _N = new WeakMap(), _j = new WeakMap(), _v = new WeakMap(), G_fn = function() {
  let t2 = new Tt(__privateGet(this, _t3));
  __privateSet(this, _u2, 0), __privateSet(this, _C, t2), __privateSet(this, _P, (e) => {
    __privateSet(this, _u2, __privateGet(this, _u2) - t2[e]), t2[e] = 0;
  }), __privateSet(this, _I, (e, s, i, r2) => {
    if (__privateMethod(this, _Me_instances, l_fn).call(this, s)) return 0;
    if (!q(i)) if (r2) {
      if (typeof r2 != "function") throw new TypeError("sizeCalculation must be a function");
      if (i = r2(s, e), !q(i)) throw new TypeError("sizeCalculation return invalid (expect positive integer)");
    } else throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
    return i;
  }), __privateSet(this, _L, (e, s, i) => {
    if (t2[e] = s, __privateGet(this, _s3)) {
      let r2 = __privateGet(this, _s3) - t2[e];
      for (; __privateGet(this, _u2) > r2; ) __privateMethod(this, _Me_instances, B_fn).call(this, true);
    }
    __privateSet(this, _u2, __privateGet(this, _u2) + t2[e]), i && (i.entrySize = s, i.totalCalculatedSize = __privateGet(this, _u2));
  });
}, _P = new WeakMap(), _L = new WeakMap(), _I = new WeakMap(), F_fn = function* ({ allowStale: t2 = this.allowStale } = {}) {
  if (__privateGet(this, _h2)) for (let e = __privateGet(this, _p); !(!__privateMethod(this, _Me_instances, z_fn).call(this, e) || ((t2 || !__privateGet(this, _v).call(this, e)) && (yield e), e === __privateGet(this, _b2))); ) e = __privateGet(this, _E)[e];
}, D_fn = function* ({ allowStale: t2 = this.allowStale } = {}) {
  if (__privateGet(this, _h2)) for (let e = __privateGet(this, _b2); !(!__privateMethod(this, _Me_instances, z_fn).call(this, e) || ((t2 || !__privateGet(this, _v).call(this, e)) && (yield e), e === __privateGet(this, _p))); ) e = __privateGet(this, _d)[e];
}, z_fn = function(t2) {
  return t2 !== void 0 && __privateGet(this, _f2).get(__privateGet(this, _a4)[t2]) === t2;
}, B_fn = function(t2) {
  var _a12;
  let e = __privateGet(this, _b2), s = __privateGet(this, _a4)[e], i = __privateGet(this, _i)[e];
  return __privateGet(this, _A) && __privateMethod(this, _Me_instances, l_fn).call(this, i) ? i.__abortController.abort(new Error("evicted")) : (__privateGet(this, _x) || __privateGet(this, _e)) && (__privateGet(this, _x) && ((_a12 = __privateGet(this, _n2)) == null ? void 0 : _a12.call(this, i, s, "evict")), __privateGet(this, _e) && __privateGet(this, _m)?.push([i, s, "evict"])), __privateGet(this, _P).call(this, e), __privateGet(this, _y)?.[e] && (clearTimeout(__privateGet(this, _y)[e]), __privateGet(this, _y)[e] = void 0), t2 && (__privateGet(this, _a4)[e] = void 0, __privateGet(this, _i)[e] = void 0, __privateGet(this, _R).push(e)), __privateGet(this, _h2) === 1 ? (__privateSet(this, _b2, __privateSet(this, _p, 0)), __privateGet(this, _R).length = 0) : __privateSet(this, _b2, __privateGet(this, _d)[e]), __privateGet(this, _f2).delete(s), __privateWrapper(this, _h2)._--, e;
}, U_fn = function(t2, e, s, i) {
  let r2 = e === void 0 ? void 0 : __privateGet(this, _i)[e];
  if (__privateMethod(this, _Me_instances, l_fn).call(this, r2)) return r2;
  let o2 = new At(), { signal: h3 } = s;
  h3?.addEventListener("abort", () => o2.abort(h3.reason), { signal: o2.signal });
  let a = { signal: o2.signal, options: s, context: i }, l3 = (p2, w2 = false) => {
    let { aborted: g2 } = o2.signal, S3 = s.ignoreFetchAbort && p2 !== void 0, E3 = s.ignoreFetchAbort || !!(s.allowStaleOnFetchAbort && p2 !== void 0);
    if (s.status && (g2 && !w2 ? (s.status.fetchAborted = true, s.status.fetchError = o2.signal.reason, S3 && (s.status.fetchAbortIgnored = true)) : s.status.fetchResolved = true), g2 && !S3 && !w2) return c3(o2.signal.reason, E3);
    let y2 = f3, b3 = __privateGet(this, _i)[e];
    return (b3 === f3 || S3 && w2 && b3 === void 0) && (p2 === void 0 ? y2.__staleWhileFetching !== void 0 ? __privateGet(this, _i)[e] = y2.__staleWhileFetching : __privateMethod(this, _Me_instances, O_fn).call(this, t2, "fetch") : (s.status && (s.status.fetchUpdated = true), this.set(t2, p2, a.options))), p2;
  }, u2 = (p2) => (s.status && (s.status.fetchRejected = true, s.status.fetchError = p2), c3(p2, false)), c3 = (p2, w2) => {
    let { aborted: g2 } = o2.signal, S3 = g2 && s.allowStaleOnFetchAbort, E3 = S3 || s.allowStaleOnFetchRejection, y2 = E3 || s.noDeleteOnFetchRejection, b3 = f3;
    if (__privateGet(this, _i)[e] === f3 && (!y2 || !w2 && b3.__staleWhileFetching === void 0 ? __privateMethod(this, _Me_instances, O_fn).call(this, t2, "fetch") : S3 || (__privateGet(this, _i)[e] = b3.__staleWhileFetching)), E3) return s.status && b3.__staleWhileFetching !== void 0 && (s.status.returnedStale = true), b3.__staleWhileFetching;
    if (b3.__returned === b3) throw p2;
  }, d2 = (p2, w2) => {
    var _a12;
    let g2 = (_a12 = __privateGet(this, _S2)) == null ? void 0 : _a12.call(this, t2, r2, a);
    g2 && g2 instanceof Promise && g2.then((S3) => p2(S3 === void 0 ? void 0 : S3), w2), o2.signal.addEventListener("abort", () => {
      (!s.ignoreFetchAbort || s.allowStaleOnFetchAbort) && (p2(void 0), s.allowStaleOnFetchAbort && (p2 = (S3) => l3(S3, true)));
    });
  };
  s.status && (s.status.fetchDispatched = true);
  let f3 = new Promise(d2).then(l3, u2), m2 = Object.assign(f3, { __abortController: o2, __staleWhileFetching: r2, __returned: void 0 });
  return e === void 0 ? (this.set(t2, m2, { ...a.options, status: void 0 }), e = __privateGet(this, _f2).get(t2)) : __privateGet(this, _i)[e] = m2, m2;
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
    let i = __privateGet(this, _f2).get(t2);
    if (i !== void 0) if (__privateGet(this, _y)?.[i] && (clearTimeout(__privateGet(this, _y)?.[i]), __privateGet(this, _y)[i] = void 0), s = true, __privateGet(this, _h2) === 1) __privateMethod(this, _Me_instances, H_fn).call(this, e);
    else {
      __privateGet(this, _P).call(this, i);
      let r2 = __privateGet(this, _i)[i];
      if (__privateMethod(this, _Me_instances, l_fn).call(this, r2) ? r2.__abortController.abort(new Error("deleted")) : (__privateGet(this, _x) || __privateGet(this, _e)) && (__privateGet(this, _x) && ((_a12 = __privateGet(this, _n2)) == null ? void 0 : _a12.call(this, r2, t2, e)), __privateGet(this, _e) && __privateGet(this, _m)?.push([r2, t2, e])), __privateGet(this, _f2).delete(t2), __privateGet(this, _a4)[i] = void 0, __privateGet(this, _i)[i] = void 0, i === __privateGet(this, _p)) __privateSet(this, _p, __privateGet(this, _E)[i]);
      else if (i === __privateGet(this, _b2)) __privateSet(this, _b2, __privateGet(this, _d)[i]);
      else {
        let o2 = __privateGet(this, _E)[i];
        __privateGet(this, _d)[o2] = __privateGet(this, _d)[i];
        let h3 = __privateGet(this, _d)[i];
        __privateGet(this, _E)[h3] = __privateGet(this, _E)[i];
      }
      __privateWrapper(this, _h2)._--, __privateGet(this, _R).push(i);
    }
  }
  if (__privateGet(this, _e) && __privateGet(this, _m)?.length) {
    let i = __privateGet(this, _m), r2;
    for (; r2 = i?.shift(); ) (_b5 = __privateGet(this, _o2)) == null ? void 0 : _b5.call(this, ...r2);
  }
  return s;
}, H_fn = function(t2) {
  var _a12, _b5;
  for (let e of __privateMethod(this, _Me_instances, D_fn).call(this, { allowStale: true })) {
    let s = __privateGet(this, _i)[e];
    if (__privateMethod(this, _Me_instances, l_fn).call(this, s)) s.__abortController.abort(new Error("deleted"));
    else {
      let i = __privateGet(this, _a4)[e];
      __privateGet(this, _x) && ((_a12 = __privateGet(this, _n2)) == null ? void 0 : _a12.call(this, s, i, t2)), __privateGet(this, _e) && __privateGet(this, _m)?.push([s, i, t2]);
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
    super(t2, e, s), this.proxyErrors = (i) => this.dest.emit("error", i), t2.on("error", this.proxyErrors);
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
    let i = this[B] ? mt : li;
    if (!this[k] && !Buffer.isBuffer(t2)) {
      if (ui(t2)) t2 = Buffer.from(t2.buffer, t2.byteOffset, t2.byteLength);
      else if (fi(t2)) t2 = Buffer.from(t2);
      else if (typeof t2 != "string") throw new Error("Non-contiguous data written to non-objectMode stream");
    }
    return this[k] ? (this[v] && this[T] !== 0 && this[Ot](true), this[v] ? this.emit("data", t2) : this[Yt](t2), this[T] !== 0 && this.emit("readable"), s && i(s), this[v]) : t2.length ? (typeof t2 == "string" && !(e === this[P] && !this[et]?.lastNeed) && (t2 = Buffer.from(t2, e)), Buffer.isBuffer(t2) && this[P] && (t2 = this[et].write(t2)), this[v] && this[T] !== 0 && this[Ot](true), this[v] ? this.emit("data", t2) : this[Yt](t2), this[T] !== 0 && this.emit("readable"), s && i(s), this[v]) : (this[T] !== 0 && this.emit("readable"), s && i(s), this[v]);
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
      let i = e;
      this[B] ? mt(() => i.call(this, this[ut])) : i.call(this, this[ut]);
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
    let i = super.emit(t2, ...e);
    return this[H](), i;
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
      let i = this.read();
      if (i !== null) return Promise.resolve({ done: false, value: i });
      if (this[G]) return e();
      let r2, o2, h3 = (c3) => {
        this.off("data", a), this.off("end", l3), this.off(x, u2), e(), o2(c3);
      }, a = (c3) => {
        this.off("error", h3), this.off("end", l3), this.off(x, u2), this.pause(), r2({ value: c3, done: !!this[G] });
      }, l3 = () => {
        this.off("error", h3), this.off("data", a), this.off(x, u2), e(), r2({ done: true, value: void 0 });
      }, u2 = () => h3(new Error("stream destroyed"));
      return new Promise((c3, d2) => {
        o2 = d2, r2 = c3, this.once(x, u2), this.once("error", h3), this.once("end", l3), this.once("data", a);
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
      let i = this.read();
      return i === null ? e() : { done: false, value: i };
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
  constructor(t2, e = L, s, i, r2, o2, h3) {
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
    this.name = t2, __privateSet(this, _C2, r2 ? _t4(t2) : bt(t2)), __privateSet(this, _e4, e & Fi), this.nocase = r2, this.roots = i, this.root = s || this, __privateSet(this, __2, o2), __privateSet(this, _g3, h3.fullpath), __privateSet(this, _x2, h3.relative), __privateSet(this, _A2, h3.relativePosix), this.parent = h3.parent, this.parent ? __privateSet(this, _t5, __privateGet(this.parent, _t5)) : __privateSet(this, _t5, Ue(h3.fs));
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
    let e = this.getRootString(t2), i = t2.substring(e.length).split(this.splitSep);
    return e ? __privateMethod(_a12 = this.getRoot(e), _R_instances, N_fn).call(_a12, i) : __privateMethod(this, _R_instances, N_fn).call(this, i);
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
    let s = this.children(), i = this.nocase ? _t4(t2) : bt(t2);
    for (let a of s) if (__privateGet(a, _C2) === i) return a;
    let r2 = this.parent ? this.sep : "", o2 = __privateGet(this, _g3) ? __privateGet(this, _g3) + r2 + t2 : void 0, h3 = this.newChild(t2, L, { ...e, parent: this, fullpath: o2 });
    return this.canReaddir() || __privateSet(h3, _e4, __privateGet(h3, _e4) | j), s.push(h3), h3;
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
    let i = e.fullpath() + (e.parent ? this.sep : "") + t2;
    return __privateSet(this, _g3, i);
  }
  fullpathPosix() {
    if (__privateGet(this, _y2) !== void 0) return __privateGet(this, _y2);
    if (this.sep === "/") return __privateSet(this, _y2, this.fullpath());
    if (!this.parent) {
      let i = this.fullpath().replace(/\\/g, "/");
      return /^[a-z]:\//i.test(i) ? __privateSet(this, _y2, `//?/${i}`) : __privateSet(this, _y2, i);
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
    let i = this.fullpath();
    __privateGet(this, _t5).readdir(i, { withFileTypes: true }, (r2, o2) => {
      if (r2) __privateMethod(this, _R_instances, I_fn).call(this, r2.code), s.provisional = 0;
      else {
        for (let h3 of o2) __privateMethod(this, _R_instances, z_fn2).call(this, h3, s);
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
      __privateSet(this, _q2, new Promise((i) => s = i));
      try {
        for (let i of await __privateGet(this, _t5).promises.readdir(e, { withFileTypes: true })) __privateMethod(this, _R_instances, z_fn2).call(this, i, t2);
        __privateMethod(this, _R_instances, j_fn).call(this, t2);
      } catch (i) {
        __privateMethod(this, _R_instances, I_fn).call(this, i.code), t2.provisional = 0;
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
    let e = /* @__PURE__ */ new Set([]), s = [], i = this;
    for (; i && i.parent; ) e.add(i), __privateSet(i, _x2, s.join(this.sep)), __privateSet(i, _A2, s.join("/")), i = i.parent, s.push("..");
    for (i = t2; i && i.parent && !e.has(i); ) __privateSet(i, _x2, void 0), __privateSet(i, _A2, void 0), i = i.parent;
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
  let s = ie(t2), i = this.newChild(t2.name, s, { parent: this }), r2 = __privateGet(i, _e4) & _;
  return r2 !== U && r2 !== X && r2 !== L && __privateSet(i, _e4, __privateGet(i, _e4) | yt), e.unshift(i), e.provisional++, i;
}, U_fn2 = function(t2, e) {
  for (let s = e.provisional; s < e.length; s++) {
    let i = e[s];
    if ((this.nocase ? _t4(t2.name) : bt(t2.name)) === __privateGet(i, _C2)) return __privateMethod(this, _R_instances, l_fn2).call(this, t2, i, s, e);
  }
}, l_fn2 = function(t2, e, s, i) {
  let r2 = e.name;
  return __privateSet(e, _e4, __privateGet(e, _e4) & gt | ie(t2)), r2 !== t2.name && (e.name = t2.name), s !== i.provisional && (s === i.length - 1 ? i.pop() : i.splice(s, 1), i.unshift(e)), i.provisional++, e;
}, $_fn2 = function(t2) {
  let { atime: e, atimeMs: s, birthtime: i, birthtimeMs: r2, blksize: o2, blocks: h3, ctime: a, ctimeMs: l3, dev: u2, gid: c3, ino: d2, mode: f3, mtime: m2, mtimeMs: p2, nlink: w2, rdev: g2, size: S3, uid: E3 } = t2;
  __privateSet(this, _b4, e), __privateSet(this, _a6, s), __privateSet(this, _m3, i), __privateSet(this, _E2, r2), __privateSet(this, _c5, o2), __privateSet(this, _f4, h3), __privateSet(this, _R2, a), __privateSet(this, _d3, l3), __privateSet(this, _s5, u2), __privateSet(this, _S3, c3), __privateSet(this, _h4, d2), __privateSet(this, _n4, f3), __privateSet(this, _p3, m2), __privateSet(this, _i3, p2), __privateSet(this, _r4, w2), __privateSet(this, _w3, g2), __privateSet(this, _u3, S3), __privateSet(this, _o4, E3);
  let y2 = ie(t2);
  __privateSet(this, _e4, __privateGet(this, _e4) & gt | y2 | je), y2 !== L && y2 !== U && y2 !== X && __privateSet(this, _e4, __privateGet(this, _e4) | yt);
}, _W = new WeakMap(), _O = new WeakMap(), H_fn2 = function(t2) {
  __privateSet(this, _O, false);
  let e = __privateGet(this, _W).slice();
  __privateGet(this, _W).length = 0, e.forEach((s) => s(null, t2));
}, _q2 = new WeakMap(), _a7);
var Pt = class n extends R {
  constructor(t2, e = L, s, i, r2, o2, h3) {
    super(t2, e, s, i, r2, o2, h3);
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
  constructor(t2, e = L, s, i, r2, o2, h3) {
    super(t2, e, s, i, r2, o2, h3);
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
  constructor(t2 = process.cwd(), e, s, { nocase: i, childrenCacheSize: r2 = 16 * 1024, fs: o2 = wt } = {}) {
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
    let h3 = e.resolve(t2);
    this.roots = /* @__PURE__ */ Object.create(null), this.rootPath = this.parseRootPath(h3), __privateSet(this, _t6, new Wt()), __privateSet(this, _s6, new Wt()), __privateSet(this, _n5, new ne(r2));
    let a = h3.substring(this.rootPath.length).split(s);
    if (a.length === 1 && !a[0] && a.pop(), i === void 0) throw new TypeError("must provide nocase setting to PathScurryBase ctor");
    this.nocase = i, this.root = this.newRoot(__privateGet(this, _r5)), this.roots[this.rootPath] = this.root;
    let l3 = this.root, u2 = a.length - 1, c3 = e.sep, d2 = this.rootPath, f3 = false;
    for (let m2 of a) {
      let p2 = u2--;
      l3 = l3.child(m2, { relative: new Array(p2).fill("..").join(c3), relativePosix: new Array(p2).fill("..").join("/"), fullpath: d2 += (f3 ? "" : c3) + m2 }), f3 = true;
    }
    this.cwd = l3;
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
    let i = this.cwd.resolve(e).fullpath();
    return __privateGet(this, _t6).set(e, i), i;
  }
  resolvePosix(...t2) {
    let e = "";
    for (let r2 = t2.length - 1; r2 >= 0; r2--) {
      let o2 = t2[r2];
      if (!(!o2 || o2 === ".") && (e = e ? `${o2}/${e}` : o2, this.isAbsolute(o2))) break;
    }
    let s = __privateGet(this, _s6).get(e);
    if (s !== void 0) return s;
    let i = this.cwd.resolve(e).fullpathPosix();
    return __privateGet(this, _s6).set(e, i), i;
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
      let i = await t2.readdir();
      return s ? i : i.map((r2) => r2.name);
    } else return [];
  }
  readdirSync(t2 = this.cwd, e = { withFileTypes: true }) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2, t2 = this.cwd);
    let { withFileTypes: s = true } = e;
    return t2.canReaddir() ? s ? t2.readdirSync() : t2.readdirSync().map((i) => i.name) : [];
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
    let { withFileTypes: s = true, follow: i = false, filter: r2, walkFilter: o2 } = e, h3 = [];
    (!r2 || r2(t2)) && h3.push(s ? t2 : t2.fullpath());
    let a = /* @__PURE__ */ new Set(), l3 = (c3, d2) => {
      a.add(c3), c3.readdirCB((f3, m2) => {
        if (f3) return d2(f3);
        let p2 = m2.length;
        if (!p2) return d2();
        let w2 = () => {
          --p2 === 0 && d2();
        };
        for (let g2 of m2) (!r2 || r2(g2)) && h3.push(s ? g2 : g2.fullpath()), i && g2.isSymbolicLink() ? g2.realpath().then((S3) => S3?.isUnknown() ? S3.lstat() : S3).then((S3) => S3?.shouldWalk(a, o2) ? l3(S3, w2) : w2()) : g2.shouldWalk(a, o2) ? l3(g2, w2) : w2();
      }, true);
    }, u2 = t2;
    return new Promise((c3, d2) => {
      l3(u2, (f3) => {
        if (f3) return d2(f3);
        c3(h3);
      });
    });
  }
  walkSync(t2 = this.cwd, e = {}) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2, t2 = this.cwd);
    let { withFileTypes: s = true, follow: i = false, filter: r2, walkFilter: o2 } = e, h3 = [];
    (!r2 || r2(t2)) && h3.push(s ? t2 : t2.fullpath());
    let a = /* @__PURE__ */ new Set([t2]);
    for (let l3 of a) {
      let u2 = l3.readdirSync();
      for (let c3 of u2) {
        (!r2 || r2(c3)) && h3.push(s ? c3 : c3.fullpath());
        let d2 = c3;
        if (c3.isSymbolicLink()) {
          if (!(i && (d2 = c3.realpathSync()))) continue;
          d2.isUnknown() && d2.lstatSync();
        }
        d2.shouldWalk(a, o2) && a.add(d2);
      }
    }
    return h3;
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
    let { withFileTypes: s = true, follow: i = false, filter: r2, walkFilter: o2 } = e;
    (!r2 || r2(t2)) && (yield s ? t2 : t2.fullpath());
    let h3 = /* @__PURE__ */ new Set([t2]);
    for (let a of h3) {
      let l3 = a.readdirSync();
      for (let u2 of l3) {
        (!r2 || r2(u2)) && (yield s ? u2 : u2.fullpath());
        let c3 = u2;
        if (u2.isSymbolicLink()) {
          if (!(i && (c3 = u2.realpathSync()))) continue;
          c3.isUnknown() && c3.lstatSync();
        }
        c3.shouldWalk(h3, o2) && h3.add(c3);
      }
    }
  }
  stream(t2 = this.cwd, e = {}) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2, t2 = this.cwd);
    let { withFileTypes: s = true, follow: i = false, filter: r2, walkFilter: o2 } = e, h3 = new V({ objectMode: true });
    (!r2 || r2(t2)) && h3.write(s ? t2 : t2.fullpath());
    let a = /* @__PURE__ */ new Set(), l3 = [t2], u2 = 0, c3 = () => {
      let d2 = false;
      for (; !d2; ) {
        let f3 = l3.shift();
        if (!f3) {
          u2 === 0 && h3.end();
          return;
        }
        u2++, a.add(f3);
        let m2 = (w2, g2, S3 = false) => {
          if (w2) return h3.emit("error", w2);
          if (i && !S3) {
            let E3 = [];
            for (let y2 of g2) y2.isSymbolicLink() && E3.push(y2.realpath().then((b3) => b3?.isUnknown() ? b3.lstat() : b3));
            if (E3.length) {
              Promise.all(E3).then(() => m2(null, g2, true));
              return;
            }
          }
          for (let E3 of g2) E3 && (!r2 || r2(E3)) && (h3.write(s ? E3 : E3.fullpath()) || (d2 = true));
          u2--;
          for (let E3 of g2) {
            let y2 = E3.realpathCached() || E3;
            y2.shouldWalk(a, o2) && l3.push(y2);
          }
          d2 && !h3.flowing ? h3.once("drain", c3) : p2 || c3();
        }, p2 = true;
        f3.readdirCB(m2, true), p2 = false;
      }
    };
    return c3(), h3;
  }
  streamSync(t2 = this.cwd, e = {}) {
    typeof t2 == "string" ? t2 = this.cwd.resolve(t2) : t2 instanceof R || (e = t2, t2 = this.cwd);
    let { withFileTypes: s = true, follow: i = false, filter: r2, walkFilter: o2 } = e, h3 = new V({ objectMode: true }), a = /* @__PURE__ */ new Set();
    (!r2 || r2(t2)) && h3.write(s ? t2 : t2.fullpath());
    let l3 = [t2], u2 = 0, c3 = () => {
      let d2 = false;
      for (; !d2; ) {
        let f3 = l3.shift();
        if (!f3) {
          u2 === 0 && h3.end();
          return;
        }
        u2++, a.add(f3);
        let m2 = f3.readdirSync();
        for (let p2 of m2) (!r2 || r2(p2)) && (h3.write(s ? p2 : p2.fullpath()) || (d2 = true));
        u2--;
        for (let p2 of m2) {
          let w2 = p2;
          if (p2.isSymbolicLink()) {
            if (!(i && (w2 = p2.realpathSync()))) continue;
            w2.isUnknown() && w2.lstatSync();
          }
          w2.shouldWalk(a, o2) && l3.push(w2);
        }
      }
      d2 && !h3.flowing && h3.once("drain", c3);
    };
    return c3(), h3;
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
    for (let i = this.cwd; i; i = i.parent) i.nocase = this.nocase;
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
  constructor(t2, e, s, i) {
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
    if (__privateSet(this, _t7, t2), __privateSet(this, _s7, e), __privateSet(this, _n6, s), __privateSet(this, _r6, i), __privateGet(this, _n6) === 0) {
      if (this.isUNC()) {
        let [r2, o2, h3, a, ...l3] = __privateGet(this, _t7), [u2, c3, d2, f3, ...m2] = __privateGet(this, _s7);
        l3[0] === "" && (l3.shift(), m2.shift());
        let p2 = [r2, o2, h3, a, ""].join("/"), w2 = [u2, c3, d2, f3, ""].join("/");
        __privateSet(this, _t7, [p2, ...l3]), __privateSet(this, _s7, [w2, ...m2]), this.length = __privateGet(this, _t7).length;
      } else if (this.isDrive() || this.isAbsolute()) {
        let [r2, ...o2] = __privateGet(this, _t7), [h3, ...a] = __privateGet(this, _s7);
        o2[0] === "" && (o2.shift(), a.shift());
        let l3 = r2 + "/", u2 = h3 + "/";
        __privateSet(this, _t7, [l3, ...o2]), __privateSet(this, _s7, [u2, ...a]), this.length = __privateGet(this, _t7).length;
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
  constructor(t2, { nobrace: e, nocase: s, noext: i, noglobstar: r2, platform: o2 = _i4 }) {
    __publicField(this, "relative");
    __publicField(this, "relativeChildren");
    __publicField(this, "absolute");
    __publicField(this, "absoluteChildren");
    __publicField(this, "platform");
    __publicField(this, "mmopts");
    this.relative = [], this.absolute = [], this.relativeChildren = [], this.absoluteChildren = [], this.platform = o2, this.mmopts = { dot: true, nobrace: e, nocase: s, noext: i, noglobstar: r2, optimizationLevel: 2, platform: o2, nocomment: true, nonegate: true };
    for (let h3 of t2) this.add(h3);
  }
  add(t2) {
    let e = new D(t2, this.mmopts);
    for (let s = 0; s < e.set.length; s++) {
      let i = e.set[s], r2 = e.globParts[s];
      if (!i || !r2) throw new Error("invalid pattern object");
      for (; i[0] === "." && r2[0] === "."; ) i.shift(), r2.shift();
      let o2 = new nt(i, r2, 0, this.platform), h3 = new D(o2.globString(), this.mmopts), a = r2[r2.length - 1] === "**", l3 = o2.isAbsolute();
      l3 ? this.absolute.push(h3) : this.relative.push(h3), a && (l3 ? this.absoluteChildren.push(h3) : this.relativeChildren.push(h3));
    }
  }
  ignored(t2) {
    let e = t2.fullpath(), s = `${e}/`, i = t2.relative() || ".", r2 = `${i}/`;
    for (let o2 of this.relative) if (o2.match(i) || o2.match(r2)) return true;
    for (let o2 of this.absolute) if (o2.match(e) || o2.match(s)) return true;
    return false;
  }
  childrenIgnored(t2) {
    let e = t2.fullpath() + "/", s = (t2.relative() || ".") + "/";
    for (let i of this.relativeChildren) if (i.match(s)) return true;
    for (let i of this.absoluteChildren) if (i.match(e)) return true;
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
    let s = t2.fullpath(), i = this.store.get(s);
    i ? i.add(e.globString()) : this.store.set(s, /* @__PURE__ */ new Set([e.globString()]));
  }
};
var he = class {
  constructor() {
    __publicField(this, "store", /* @__PURE__ */ new Map());
  }
  add(t2, e, s) {
    let i = (e ? 2 : 0) | (s ? 1 : 0), r2 = this.store.get(t2);
    this.store.set(t2, r2 === void 0 ? i : i & r2);
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
    s ? s.find((i) => i.globString() === e.globString()) || s.push(e) : this.store.set(t2, [e]);
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
    let s = e.map((i) => [t2, i]);
    for (let [i, r2] of s) {
      this.hasWalkedCache.storeWalked(i, r2);
      let o2 = r2.root(), h3 = r2.isAbsolute() && this.opts.absolute !== false;
      if (o2) {
        i = i.resolve(o2 === "/" && this.opts.root !== void 0 ? this.opts.root : o2);
        let c3 = r2.rest();
        if (c3) r2 = c3;
        else {
          this.matches.add(i, true, false);
          continue;
        }
      }
      if (i.isENOENT()) continue;
      let a, l3, u2 = false;
      for (; typeof (a = r2.pattern()) == "string" && (l3 = r2.rest()); ) i = i.resolve(a), r2 = l3, u2 = true;
      if (a = r2.pattern(), l3 = r2.rest(), u2) {
        if (this.hasWalkedCache.hasWalked(i, r2)) continue;
        this.hasWalkedCache.storeWalked(i, r2);
      }
      if (typeof a == "string") {
        let c3 = a === ".." || a === "" || a === ".";
        this.matches.add(i.resolve(a), h3, c3);
        continue;
      } else if (a === A) {
        (!i.isSymbolicLink() || this.follow || r2.checkFollowGlobstar()) && this.subwalks.add(i, r2);
        let c3 = l3?.pattern(), d2 = l3?.rest();
        if (!l3 || (c3 === "" || c3 === ".") && !d2) this.matches.add(i, h3, c3 === "" || c3 === ".");
        else if (c3 === "..") {
          let f3 = i.parent || i;
          d2 ? this.hasWalkedCache.hasWalked(f3, d2) || this.subwalks.add(f3, d2) : this.matches.add(f3, h3, true);
        }
      } else a instanceof RegExp && this.subwalks.add(i, r2);
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
    let s = this.subwalks.get(t2), i = this.child();
    for (let r2 of e) for (let o2 of s) {
      let h3 = o2.isAbsolute(), a = o2.pattern(), l3 = o2.rest();
      a === A ? i.testGlobstar(r2, o2, l3, h3) : a instanceof RegExp ? i.testRegExp(r2, a, l3, h3) : i.testString(r2, a, l3, h3);
    }
    return i;
  }
  testGlobstar(t2, e, s, i) {
    if ((this.dot || !t2.name.startsWith(".")) && (e.hasMore() || this.matches.add(t2, i, false), t2.canReaddir() && (this.follow || !t2.isSymbolicLink() ? this.subwalks.add(t2, e) : t2.isSymbolicLink() && (s && e.checkFollowGlobstar() ? this.subwalks.add(t2, s) : e.markFollowGlobstar() && this.subwalks.add(t2, e)))), s) {
      let r2 = s.pattern();
      if (typeof r2 == "string" && r2 !== ".." && r2 !== "" && r2 !== ".") this.testString(t2, r2, s.rest(), i);
      else if (r2 === "..") {
        let o2 = t2.parent || t2;
        this.subwalks.add(o2, s);
      } else r2 instanceof RegExp && this.testRegExp(t2, r2, s.rest(), i);
    }
  }
  testRegExp(t2, e, s, i) {
    e.test(t2.name) && (s ? this.subwalks.add(t2, s) : this.matches.add(t2, i, false));
  }
  testString(t2, e, s, i) {
    t2.isNamed(e) && (s ? this.subwalks.add(t2, s) : this.matches.add(t2, i, false));
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
    let i = this.opts.mark && t2.isDirectory() ? __privateGet(this, _n7) : "";
    if (this.opts.withFileTypes) this.matchEmit(t2);
    else if (s) {
      let r2 = this.opts.posix ? t2.fullpathPosix() : t2.fullpath();
      this.matchEmit(r2 + i);
    } else {
      let r2 = this.opts.posix ? t2.relativePosix() : t2.relative(), o2 = this.opts.dotRelative && !r2.startsWith(".." + __privateGet(this, _n7)) ? "." + __privateGet(this, _n7) : "";
      this.matchEmit(r2 ? o2 + r2 + i : "." + i);
    }
  }
  async match(t2, e, s) {
    let i = await this.matchCheck(t2, s);
    i && this.matchFinish(i, e);
  }
  matchSync(t2, e, s) {
    let i = this.matchCheckSync(t2, s);
    i && this.matchFinish(i, e);
  }
  walkCB(t2, e, s) {
    this.signal?.aborted && s(), this.walkCB2(t2, e, new Et(this.opts), s);
  }
  walkCB2(t2, e, s, i) {
    if (__privateMethod(this, _zt_instances, o_fn).call(this, t2)) return i();
    if (this.signal?.aborted && i(), this.paused) {
      this.onResume(() => this.walkCB2(t2, e, s, i));
      return;
    }
    s.processPatterns(t2, e);
    let r2 = 1, o2 = () => {
      --r2 === 0 && i();
    };
    for (let [h3, a, l3] of s.matches.entries()) __privateMethod(this, _zt_instances, r_fn).call(this, h3) || (r2++, this.match(h3, a, l3).then(() => o2()));
    for (let h3 of s.subwalkTargets()) {
      if (this.maxDepth !== 1 / 0 && h3.depth() >= this.maxDepth) continue;
      r2++;
      let a = h3.readdirCached();
      h3.calledReaddir() ? this.walkCB3(h3, a, s, o2) : h3.readdirCB((l3, u2) => this.walkCB3(h3, u2, s, o2), true);
    }
    o2();
  }
  walkCB3(t2, e, s, i) {
    s = s.filterEntries(t2, e);
    let r2 = 1, o2 = () => {
      --r2 === 0 && i();
    };
    for (let [h3, a, l3] of s.matches.entries()) __privateMethod(this, _zt_instances, r_fn).call(this, h3) || (r2++, this.match(h3, a, l3).then(() => o2()));
    for (let [h3, a] of s.subwalks.entries()) r2++, this.walkCB2(h3, a, s.child(), o2);
    o2();
  }
  walkCBSync(t2, e, s) {
    this.signal?.aborted && s(), this.walkCB2Sync(t2, e, new Et(this.opts), s);
  }
  walkCB2Sync(t2, e, s, i) {
    if (__privateMethod(this, _zt_instances, o_fn).call(this, t2)) return i();
    if (this.signal?.aborted && i(), this.paused) {
      this.onResume(() => this.walkCB2Sync(t2, e, s, i));
      return;
    }
    s.processPatterns(t2, e);
    let r2 = 1, o2 = () => {
      --r2 === 0 && i();
    };
    for (let [h3, a, l3] of s.matches.entries()) __privateMethod(this, _zt_instances, r_fn).call(this, h3) || this.matchSync(h3, a, l3);
    for (let h3 of s.subwalkTargets()) {
      if (this.maxDepth !== 1 / 0 && h3.depth() >= this.maxDepth) continue;
      r2++;
      let a = h3.readdirSync();
      this.walkCB3Sync(h3, a, s, o2);
    }
    o2();
  }
  walkCB3Sync(t2, e, s, i) {
    s = s.filterEntries(t2, e);
    let r2 = 1, o2 = () => {
      --r2 === 0 && i();
    };
    for (let [h3, a, l3] of s.matches.entries()) __privateMethod(this, _zt_instances, r_fn).call(this, h3) || this.matchSync(h3, a, l3);
    for (let [h3, a] of s.subwalks.entries()) r2++, this.walkCB2Sync(h3, a, s.child(), o2);
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
    let s = this.platform === "darwin" || this.platform === "win32", i = { braceExpandMax: 1e4, ...e, dot: this.dot, matchBase: this.matchBase, nobrace: this.nobrace, nocase: this.nocase, nocaseMagicOnly: s, nocomment: true, noext: this.noext, nonegate: true, optimizationLevel: 2, platform: this.platform, windowsPathsNoEscape: this.windowsPathsNoEscape, debug: !!this.opts.debug }, r2 = this.pattern.map((a) => new D(a, i)), [o2, h3] = r2.reduce((a, l3) => (a[0].push(...l3.set), a[1].push(...l3.globParts), a), [[], []]);
    this.patterns = o2.map((a, l3) => {
      let u2 = h3[l3];
      if (!u2) throw new Error("invalid pattern object");
      return new nt(a, u2, 0, this.platform);
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
  },
  jest: {
    configFiles: ["jest.config.ts", "jest.config.js", "jest.config.mjs", "jest.config.cjs", "jest.config.json"],
    packageDeps: ["jest", "@jest/globals", "ts-jest"]
  },
  pytest: {
    configFiles: ["pytest.ini", "pyproject.toml", "setup.cfg", "tox.ini"],
    packageDeps: []
  },
  cucumber: {
    configFiles: ["cucumber.properties", "cucumber.yml", "cucumber.yaml"],
    packageDeps: ["@cucumber/cucumber", "io.cucumber:cucumber-java"]
  }
};
function detectFrameworks(projectPath) {
  const results = [];
  const seen = /* @__PURE__ */ new Set();
  for (const [framework, sig] of Object.entries(SIGNATURES)) {
    for (const configFile of sig.configFiles) {
      const fullPath = import_path.default.join(projectPath, configFile);
      if ((0, import_fs2.existsSync)(fullPath) && configFileBelongsToFramework(framework, fullPath)) {
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
    vitest: "**/vitest.config.{ts,js}",
    jest: "**/jest.config.{ts,js,mjs,cjs,json}",
    pytest: "**/{pytest.ini,pyproject.toml,setup.cfg,tox.ini}",
    cucumber: "**/*.feature"
  };
  for (const [framework, glob] of Object.entries(nestedConfigGlobs)) {
    if (seen.has(framework)) continue;
    const matches = ts(glob, {
      cwd: projectPath,
      ignore: ["**/node_modules/**", "**/dist/**"],
      absolute: true
    });
    const frameworkMatches = matches.filter((match2) => configFileBelongsToFramework(framework, match2));
    if (frameworkMatches.length > 0) {
      seen.add(framework);
      if (framework === "cucumber") {
        const testDirs = findCucumberTestDirs(frameworkMatches, projectPath);
        for (const testDir of testDirs) {
          results.push({ framework, testDir, confidence: "high" });
        }
      } else {
        const configPath = frameworkMatches[0];
        results.push({
          framework,
          testDir: extractTestDir(framework, configPath, projectPath),
          confidence: "high"
        });
      }
    }
  }
  const pkgResults = detectAllFromPackageJson(projectPath, seen);
  results.push(...pkgResults);
  const buildFileResults = detectAllFromBuildFiles(projectPath, seen);
  results.push(...buildFileResults);
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
    case "jest":
      return extractJestTestDir(configPath, projectPath);
    case "pytest":
      return extractPytestTestDir(configPath, projectPath);
    case "cucumber":
      return extractCucumberTestDir(configPath, projectPath);
    default:
      return guessTestDir(projectPath);
  }
}
function extractPlaywrightTestDir(configPath, projectPath) {
  try {
    const content = (0, import_fs2.readFileSync)(configPath, "utf-8");
    const match2 = content.match(/testDir\s*:\s*['"`]([^'"`]+)['"`]/);
    if (match2) {
      const configDir = import_path.default.dirname(configPath);
      const absoluteTestDir = import_path.default.resolve(configDir, match2[1]);
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
function findCucumberFeaturesDir(featureFilePath, projectPath) {
  const relDir = import_path.default.relative(projectPath, import_path.default.dirname(featureFilePath));
  const parts = relDir.split(import_path.default.sep);
  let lastFeaturesIdx = -1;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === "features") lastFeaturesIdx = i;
  }
  if (lastFeaturesIdx >= 0) {
    return import_path.default.join(projectPath, ...parts.slice(0, lastFeaturesIdx + 1));
  }
  return import_path.default.dirname(featureFilePath);
}
function findCucumberTestDirs(featureFiles, projectPath) {
  const dirs = /* @__PURE__ */ new Set();
  for (const file of featureFiles) {
    const featuresDir = findCucumberFeaturesDir(file, projectPath);
    const relative = import_path.default.relative(projectPath, featuresDir);
    dirs.add(relative ? "./" + relative.replace(/\\/g, "/") : ".");
  }
  return [...dirs];
}
function extractCucumberTestDir(featureFilePath, projectPath) {
  const isFeatureFile = featureFilePath.endsWith(".feature");
  const featureFiles = isFeatureFile ? [featureFilePath] : ts("**/*.feature", {
    cwd: projectPath,
    ignore: ["**/node_modules/**", "**/dist/**"],
    absolute: true
  });
  if (featureFiles.length === 0) {
    const featuresDir = import_path.default.join(projectPath, "features");
    if ((0, import_fs2.existsSync)(featuresDir)) return "./features";
    return ".";
  }
  return findCucumberTestDirs(featureFiles, projectPath)[0];
}
function extractJestTestDir(_configPath, _projectPath) {
  return ".";
}
function extractPytestTestDir(_configPath, _projectPath) {
  return ".";
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
function configFileBelongsToFramework(framework, filePath) {
  if (framework !== "pytest") return true;
  const basename = import_path.default.basename(filePath);
  if (basename === "pytest.ini") return true;
  try {
    const content = (0, import_fs2.readFileSync)(filePath, "utf-8");
    if (basename === "pyproject.toml") return /\[tool\.pytest\.ini_options\]/.test(content);
    if (basename === "setup.cfg" || basename === "tox.ini") return /\[(?:tool:pytest|pytest)\]/.test(content);
  } catch {
    return false;
  }
  return false;
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
function detectAllFromBuildFiles(projectPath, alreadySeen) {
  const results = [];
  const buildFiles = ts("**/{pom.xml,build.gradle,build.gradle.kts}", {
    cwd: projectPath,
    ignore: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/target/**"],
    absolute: true
  });
  let sawJUnit = false;
  let sawTestNG = false;
  for (const buildFile of buildFiles) {
    try {
      const content = (0, import_fs2.readFileSync)(buildFile, "utf-8");
      sawJUnit || (sawJUnit = /(?:junit:junit|org\.junit\.jupiter|org\.junit\.platform|junit-jupiter)/.test(content));
      sawTestNG || (sawTestNG = /(?:org\.testng:testng|<groupId>\s*org\.testng\s*<\/groupId>|testng)/.test(content));
    } catch {
    }
  }
  if (sawJUnit && !alreadySeen.has("junit")) {
    alreadySeen.add("junit");
    results.push({ framework: "junit", testDir: guessTestDir(projectPath), confidence: "medium" });
  }
  if (sawTestNG && !alreadySeen.has("testng")) {
    alreadySeen.add("testng");
    results.push({ framework: "testng", testDir: guessTestDir(projectPath), confidence: "medium" });
  }
  return results;
}

// src/core/parser.ts
init_cjs_shims();
var import_fs3 = __nccwpck_require__(896);
var import_path11 = __toESM(__nccwpck_require__(928));

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/index.js
init_cjs_shims();

// node_modules/.pnpm/brace-expansion@5.0.12/node_modules/brace-expansion/dist/esm/index.js
init_cjs_shims();

// node_modules/.pnpm/balanced-match@4.0.4/node_modules/balanced-match/dist/esm/index.js
init_cjs_shims();
var balanced = (a, b3, str) => {
  const ma = a instanceof RegExp ? maybeMatch(a, str) : a;
  const mb = b3 instanceof RegExp ? maybeMatch(b3, str) : b3;
  const r2 = ma !== null && mb != null && range(ma, mb, str);
  return r2 && {
    start: r2[0],
    end: r2[1],
    pre: str.slice(0, r2[0]),
    body: str.slice(r2[0] + ma.length, r2[1]),
    post: str.slice(r2[1] + mb.length)
  };
};
var maybeMatch = (reg, str) => {
  const m2 = str.match(reg);
  return m2 ? m2[0] : null;
};
var range = (a, b3, str) => {
  let begs, beg, left, right = void 0, result;
  let ai2 = str.indexOf(a);
  let bi2 = str.indexOf(b3, ai2 + 1);
  let i = ai2;
  if (ai2 >= 0 && bi2 > 0) {
    if (a === b3) {
      return [ai2, bi2];
    }
    begs = [];
    left = str.length;
    while (i >= 0 && !result) {
      if (i === ai2) {
        begs.push(i);
        ai2 = str.indexOf(a, i + 1);
      } else if (begs.length === 1) {
        const r2 = begs.pop();
        if (r2 !== void 0)
          result = [r2, bi2];
      } else {
        beg = begs.pop();
        if (beg !== void 0 && beg < left) {
          left = beg;
          right = bi2;
        }
        bi2 = str.indexOf(b3, i + 1);
      }
      i = ai2 < bi2 && ai2 >= 0 ? ai2 : bi2;
    }
    if (begs.length && right !== void 0) {
      result = [left, right];
    }
  }
  return result;
};

// node_modules/.pnpm/brace-expansion@5.0.12/node_modules/brace-expansion/dist/esm/index.js
var escSlash = "\0SLASH" + Math.random() + "\0";
var escOpen = "\0OPEN" + Math.random() + "\0";
var escClose = "\0CLOSE" + Math.random() + "\0";
var escComma = "\0COMMA" + Math.random() + "\0";
var escPeriod = "\0PERIOD" + Math.random() + "\0";
var escSlashPattern = new RegExp(escSlash, "g");
var escOpenPattern = new RegExp(escOpen, "g");
var escClosePattern = new RegExp(escClose, "g");
var escCommaPattern = new RegExp(escComma, "g");
var escPeriodPattern = new RegExp(escPeriod, "g");
var slashPattern = /\\\\/g;
var openPattern = /\\{/g;
var closePattern = /\\}/g;
var commaPattern = /\\,/g;
var periodPattern = /\\\./g;
var EXPANSION_MAX = 1e5;
var EXPANSION_MAX_LENGTH = 4e6;
var EXPANSION_MAX_DEPTH = 1e3;
var EXPANSION_MAX_REWRITES = 1e3;
function numeric(str) {
  return !isNaN(str) ? parseInt(str, 10) : str.charCodeAt(0);
}
function escapeBraces(str) {
  return str.replace(slashPattern, escSlash).replace(openPattern, escOpen).replace(closePattern, escClose).replace(commaPattern, escComma).replace(periodPattern, escPeriod);
}
function unescapeBraces(str) {
  return str.replace(escSlashPattern, "\\").replace(escOpenPattern, "{").replace(escClosePattern, "}").replace(escCommaPattern, ",").replace(escPeriodPattern, ".");
}
function pushAll(target, items) {
  for (let i = 0; i < items.length; i++) {
    target.push(items[i]);
  }
}
function parseCommaParts(str) {
  const parts = [];
  let carry = "";
  for (; ; ) {
    const m2 = balanced("{", "}", str);
    if (!m2) {
      const tail = str.split(",");
      tail[0] = carry + tail[0];
      pushAll(parts, tail);
      return parts;
    }
    const { pre, body, post } = m2;
    const p2 = pre.split(",");
    p2[0] = carry + p2[0];
    p2[p2.length - 1] += "{" + body + "}";
    if (!post.length) {
      pushAll(parts, p2);
      return parts;
    }
    carry = p2.pop();
    pushAll(parts, p2);
    str = post;
  }
}
function expand(str, options = {}) {
  if (!str) {
    return [];
  }
  const { max = EXPANSION_MAX, maxLength = EXPANSION_MAX_LENGTH, maxDepth = EXPANSION_MAX_DEPTH, maxRewrites = EXPANSION_MAX_REWRITES } = options;
  if (str.slice(0, 2) === "{}") {
    str = "\\{\\}" + str.slice(2);
  }
  return expand_(escapeBraces(str), max, maxLength, maxDepth, 0, maxRewrites, true).map(unescapeBraces);
}
function embrace(str) {
  return "{" + str + "}";
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}
function lte(i, y2) {
  return i <= y2;
}
function gte(i, y2) {
  return i >= y2;
}
function combine(acc, pre, values, max, maxLength, dropEmpties) {
  const out = [];
  let length = 0;
  for (let a = 0; a < acc.length; a++) {
    for (let v3 = 0; v3 < values.length; v3++) {
      if (out.length >= max)
        return out;
      const expansion = acc[a] + pre + values[v3];
      if (dropEmpties && !expansion)
        continue;
      if (length + expansion.length > maxLength)
        return out;
      out.push(expansion);
      length += expansion.length;
    }
  }
  return out;
}
function expandSequence(body, isAlphaSequence, max, maxLength) {
  const n5 = body.split(/\.\./);
  const N4 = [];
  if (n5[0] === void 0 || n5[1] === void 0) {
    return N4;
  }
  const x4 = numeric(n5[0]);
  const y2 = numeric(n5[1]);
  const width = Math.max(n5[0].length, n5[1].length);
  let incr = n5.length === 3 && n5[2] !== void 0 ? Math.max(Math.abs(numeric(n5[2])), 1) : 1;
  let test = lte;
  const reverse = y2 < x4;
  if (reverse) {
    incr *= -1;
    test = gte;
  }
  const pad = n5.some(isPadded);
  let length = 0;
  for (let i = x4; test(i, y2) && N4.length < max; i += incr) {
    let c3;
    if (isAlphaSequence) {
      c3 = String.fromCharCode(i);
      if (c3 === "\\") {
        c3 = "";
      }
    } else {
      c3 = String(i);
      if (pad) {
        const need = width - c3.length;
        if (need > 0) {
          const z3 = new Array(need + 1).join("0");
          if (i < 0) {
            c3 = "-" + z3 + c3.slice(1);
          } else {
            c3 = z3 + c3;
          }
        }
      }
    }
    if (length + c3.length > maxLength)
      break;
    N4.push(c3);
    length += c3.length;
  }
  return N4;
}
function expand_(str, max, maxLength, maxDepth, depth, maxRewrites, isTop) {
  if (depth > maxDepth) {
    return [str];
  }
  let acc = [""];
  let rewrites = 0;
  let dropEmpties = false;
  let firstGroup = true;
  for (; ; ) {
    const m2 = balanced("{", "}", str);
    if (!m2) {
      return combine(acc, str, [""], max, maxLength, dropEmpties);
    }
    const pre = m2.pre;
    if (/\$$/.test(pre)) {
      acc = combine(acc, pre + "{" + m2.body + "}", [""], max, maxLength, dropEmpties && !m2.post.length);
      firstGroup = false;
      if (!m2.post.length)
        break;
      str = m2.post;
      continue;
    }
    const isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m2.body);
    const isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m2.body);
    const isSequence = isNumericSequence || isAlphaSequence;
    const isOptions = m2.body.indexOf(",") >= 0;
    if (!isSequence && !isOptions) {
      if (rewrites < maxRewrites && m2.post.match(/,(?!,).*\}/)) {
        rewrites++;
        str = m2.pre + "{" + m2.body + escClose + m2.post;
        isTop = true;
        continue;
      }
      return combine(acc, pre + "{" + m2.body + "}" + m2.post, [""], max, maxLength, dropEmpties);
    }
    if (firstGroup) {
      dropEmpties = isTop && !isSequence;
      firstGroup = false;
    }
    let values;
    if (isSequence) {
      values = expandSequence(m2.body, isAlphaSequence, max, maxLength);
    } else {
      let n5 = parseCommaParts(m2.body);
      if (n5.length === 1 && n5[0] !== void 0) {
        n5 = expand_(n5[0], max, maxLength, maxDepth, depth + 1, maxRewrites, false).map(embrace);
        if (n5.length === 1) {
          acc = combine(acc, pre + n5[0], [""], max, maxLength, dropEmpties && !m2.post.length);
          if (!m2.post.length)
            break;
          str = m2.post;
          continue;
        }
      }
      let dropsEmpties = dropEmpties && !m2.post.length && !pre;
      for (let d2 = 0; dropsEmpties && d2 < acc.length; d2++) {
        if (acc[d2]) {
          dropsEmpties = false;
        }
      }
      values = [];
      let valuesLength = 0;
      outer: for (let j4 = 0; j4 < n5.length; j4++) {
        const expanded = expand_(n5[j4], max, maxLength, maxDepth, depth + 1, maxRewrites, false);
        for (let k3 = 0; k3 < expanded.length; k3++) {
          const v3 = expanded[k3];
          if (dropsEmpties && !v3)
            continue;
          if (values.length >= max || valuesLength + v3.length > maxLength) {
            break outer;
          }
          values.push(v3);
          valuesLength += v3.length;
        }
      }
    }
    acc = combine(acc, pre, values, max, maxLength, dropEmpties && !m2.post.length);
    if (!m2.post.length)
      break;
    str = m2.post;
  }
  return acc;
}

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/assert-valid-pattern.js
init_cjs_shims();
var MAX_PATTERN_LENGTH = 1024 * 64;
var assertValidPattern = (pattern) => {
  if (typeof pattern !== "string") {
    throw new TypeError("invalid pattern");
  }
  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new TypeError("pattern is too long");
  }
};

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/ast.js
init_cjs_shims();

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/brace-expressions.js
init_cjs_shims();
var posixClasses = {
  "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true],
  "[:alpha:]": ["\\p{L}\\p{Nl}", true],
  "[:ascii:]": ["\\x00-\\x7f", false],
  "[:blank:]": ["\\p{Zs}\\t", true],
  "[:cntrl:]": ["\\p{Cc}", true],
  "[:digit:]": ["\\p{Nd}", true],
  "[:graph:]": ["\\p{Z}\\p{C}", true, true],
  "[:lower:]": ["\\p{Ll}", true],
  "[:print:]": ["\\p{C}", true],
  "[:punct:]": ["\\p{P}", true],
  "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true],
  "[:upper:]": ["\\p{Lu}", true],
  "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true],
  "[:xdigit:]": ["A-Fa-f0-9", false]
};
var braceEscape = (s) => s.replace(/[[\]\\-]/g, "\\$&");
var regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var rangesToString = (ranges) => ranges.join("");
var parseClass = (glob, position) => {
  const pos = position;
  if (glob.charAt(pos) !== "[") {
    throw new Error("not in a brace expression");
  }
  const ranges = [];
  const negs = [];
  let i = pos + 1;
  let sawStart = false;
  let uflag = false;
  let escaping = false;
  let negate = false;
  let endPos = pos;
  let rangeStart = "";
  WHILE: while (i < glob.length) {
    const c3 = glob.charAt(i);
    if ((c3 === "!" || c3 === "^") && i === pos + 1) {
      negate = true;
      i++;
      continue;
    }
    if (c3 === "]" && sawStart && !escaping) {
      endPos = i + 1;
      break;
    }
    sawStart = true;
    if (c3 === "\\") {
      if (!escaping) {
        escaping = true;
        i++;
        continue;
      }
    }
    if (c3 === "[" && !escaping) {
      for (const [cls, [unip, u2, neg]] of Object.entries(posixClasses)) {
        if (glob.startsWith(cls, i)) {
          if (rangeStart) {
            return ["$.", false, glob.length - pos, true];
          }
          i += cls.length;
          if (neg)
            negs.push(unip);
          else
            ranges.push(unip);
          uflag = uflag || u2;
          continue WHILE;
        }
      }
    }
    escaping = false;
    if (rangeStart) {
      if (c3 > rangeStart) {
        ranges.push(braceEscape(rangeStart) + "-" + braceEscape(c3));
      } else if (c3 === rangeStart) {
        ranges.push(braceEscape(c3));
      }
      rangeStart = "";
      i++;
      continue;
    }
    if (glob.startsWith("-]", i + 1)) {
      ranges.push(braceEscape(c3 + "-"));
      i += 2;
      continue;
    }
    if (glob.startsWith("-", i + 1)) {
      rangeStart = c3;
      i += 2;
      continue;
    }
    ranges.push(braceEscape(c3));
    i++;
  }
  if (endPos < i) {
    return ["", false, 0, false];
  }
  if (!ranges.length && !negs.length) {
    return ["$.", false, glob.length - pos, true];
  }
  if (negs.length === 0 && ranges.length === 1 && /^\\?.$/.test(ranges[0]) && !negate) {
    const r2 = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
    return [regexpEscape(r2), false, endPos - pos, false];
  }
  const sranges = "[" + (negate ? "^" : "") + rangesToString(ranges) + "]";
  const snegs = "[" + (negate ? "" : "^") + rangesToString(negs) + "]";
  const comb = ranges.length && negs.length ? "(" + sranges + "|" + snegs + ")" : ranges.length ? sranges : snegs;
  return [comb, uflag, endPos - pos, true];
};

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/unescape.js
init_cjs_shims();
var unescape = (s, { windowsPathsNoEscape = false, magicalBraces = true } = {}) => {
  if (magicalBraces) {
    return windowsPathsNoEscape ? s.replace(/\[([^/\\])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^/\\])\]/g, "$1$2").replace(/\\([^/])/g, "$1");
  }
  return windowsPathsNoEscape ? s.replace(/\[([^/\\{}])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^/\\{}])\]/g, "$1$2").replace(/\\([^/{}])/g, "$1");
};

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/ast.js
var _a11;
var types = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]);
var isExtglobType = (c3) => types.has(c3);
var isExtglobAST = (c3) => isExtglobType(c3.type);
var adoptionMap = /* @__PURE__ */ new Map([
  ["!", ["@"]],
  ["?", ["?", "@"]],
  ["@", ["@"]],
  ["*", ["*", "+", "?", "@"]],
  ["+", ["+", "@"]]
]);
var adoptionWithSpaceMap = /* @__PURE__ */ new Map([
  ["!", ["?"]],
  ["@", ["?"]],
  ["+", ["?", "*"]]
]);
var adoptionAnyMap = /* @__PURE__ */ new Map([
  ["!", ["?", "@"]],
  ["?", ["?", "@"]],
  ["@", ["?", "@"]],
  ["*", ["*", "+", "?", "@"]],
  ["+", ["+", "@", "?", "*"]]
]);
var usurpMap = /* @__PURE__ */ new Map([
  ["!", /* @__PURE__ */ new Map([["!", "@"]])],
  [
    "?",
    /* @__PURE__ */ new Map([
      ["*", "*"],
      ["+", "*"]
    ])
  ],
  [
    "@",
    /* @__PURE__ */ new Map([
      ["!", "!"],
      ["?", "?"],
      ["@", "@"],
      ["*", "*"],
      ["+", "+"]
    ])
  ],
  [
    "+",
    /* @__PURE__ */ new Map([
      ["?", "*"],
      ["*", "*"]
    ])
  ]
]);
var startNoTraversal = "(?!(?:^|/)\\.\\.?(?:$|/))";
var startNoDot = "(?!\\.)";
var addPatternStart = /* @__PURE__ */ new Set(["[", "."]);
var justDots = /* @__PURE__ */ new Set(["..", "."]);
var reSpecials = new Set("().*{}+?[]^$\\!");
var regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var qmark = "[^/]";
var star = qmark + "*?";
var starNoEmpty = qmark + "+?";
var ID = 0;
var _root, _hasMagic, _uflag, _parts, _parent, _parentIndex, _negs, _filledNegs, _options, _toString, _emptyExt, _AST_instances, fillNegs_fn, _AST_static, parseAST_fn, canAdoptWithSpace_fn, canAdopt_fn, canAdoptType_fn, adoptWithSpace_fn, adopt_fn, canUsurpType_fn, canUsurp_fn, usurp_fn, flatten_fn, partsToRegExp_fn, parseGlob_fn;
var AST = class {
  constructor(type, parent, options = {}) {
    __privateAdd(this, _AST_instances);
    __publicField(this, "type");
    __privateAdd(this, _root);
    __privateAdd(this, _hasMagic);
    __privateAdd(this, _uflag, false);
    __privateAdd(this, _parts, []);
    __privateAdd(this, _parent);
    __privateAdd(this, _parentIndex);
    __privateAdd(this, _negs);
    __privateAdd(this, _filledNegs, false);
    __privateAdd(this, _options);
    __privateAdd(this, _toString);
    // set to true if it's an extglob with no children
    // (which really means one child of '')
    __privateAdd(this, _emptyExt, false);
    __publicField(this, "id", ++ID);
    this.type = type;
    if (type)
      __privateSet(this, _hasMagic, true);
    __privateSet(this, _parent, parent);
    __privateSet(this, _root, __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _root) : this);
    __privateSet(this, _options, __privateGet(this, _root) === this ? options : __privateGet(__privateGet(this, _root), _options));
    __privateSet(this, _negs, __privateGet(this, _root) === this ? [] : __privateGet(__privateGet(this, _root), _negs));
    if (type === "!" && !__privateGet(__privateGet(this, _root), _filledNegs))
      __privateGet(this, _negs).push(this);
    __privateSet(this, _parentIndex, __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _parts).length : 0);
  }
  get depth() {
    return (__privateGet(this, _parent)?.depth ?? -1) + 1;
  }
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      "@@type": "AST",
      id: this.id,
      type: this.type,
      root: __privateGet(this, _root).id,
      parent: __privateGet(this, _parent)?.id,
      depth: this.depth,
      partsLength: __privateGet(this, _parts).length,
      parts: __privateGet(this, _parts)
    };
  }
  get hasMagic() {
    if (__privateGet(this, _hasMagic) !== void 0)
      return __privateGet(this, _hasMagic);
    for (const p2 of __privateGet(this, _parts)) {
      if (typeof p2 === "string")
        continue;
      if (p2.type || p2.hasMagic)
        return __privateSet(this, _hasMagic, true);
    }
    return __privateGet(this, _hasMagic);
  }
  // reconstructs the pattern
  toString() {
    return __privateGet(this, _toString) !== void 0 ? __privateGet(this, _toString) : !this.type ? __privateSet(this, _toString, __privateGet(this, _parts).map((p2) => String(p2)).join("")) : __privateSet(this, _toString, this.type + "(" + __privateGet(this, _parts).map((p2) => String(p2)).join("|") + ")");
  }
  push(...parts) {
    for (const p2 of parts) {
      if (p2 === "")
        continue;
      if (typeof p2 !== "string" && !(p2 instanceof _a11 && __privateGet(p2, _parent) === this)) {
        throw new Error("invalid part: " + p2);
      }
      __privateGet(this, _parts).push(p2);
    }
  }
  toJSON() {
    const ret = this.type === null ? __privateGet(this, _parts).slice().map((p2) => typeof p2 === "string" ? p2 : p2.toJSON()) : [this.type, ...__privateGet(this, _parts).map((p2) => p2.toJSON())];
    if (this.isStart() && !this.type)
      ret.unshift([]);
    if (this.isEnd() && (this === __privateGet(this, _root) || __privateGet(__privateGet(this, _root), _filledNegs) && __privateGet(this, _parent)?.type === "!")) {
      ret.push({});
    }
    return ret;
  }
  isStart() {
    if (__privateGet(this, _root) === this)
      return true;
    if (!__privateGet(this, _parent)?.isStart())
      return false;
    if (__privateGet(this, _parentIndex) === 0)
      return true;
    const p2 = __privateGet(this, _parent);
    for (let i = 0; i < __privateGet(this, _parentIndex); i++) {
      const pp = __privateGet(p2, _parts)[i];
      if (!(pp instanceof _a11 && pp.type === "!")) {
        return false;
      }
    }
    return true;
  }
  isEnd() {
    if (__privateGet(this, _root) === this)
      return true;
    if (__privateGet(this, _parent)?.type === "!")
      return true;
    if (!__privateGet(this, _parent)?.isEnd())
      return false;
    if (!this.type)
      return __privateGet(this, _parent)?.isEnd();
    const pl = __privateGet(this, _parent) ? __privateGet(__privateGet(this, _parent), _parts).length : 0;
    return __privateGet(this, _parentIndex) === pl - 1;
  }
  copyIn(part) {
    if (typeof part === "string")
      this.push(part);
    else
      this.push(part.clone(this));
  }
  clone(parent) {
    const c3 = new _a11(this.type, parent);
    for (const p2 of __privateGet(this, _parts)) {
      c3.copyIn(p2);
    }
    return c3;
  }
  static fromGlob(pattern, options = {}) {
    var _a12;
    const ast = new _a11(null, void 0, options);
    __privateMethod(_a12 = _a11, _AST_static, parseAST_fn).call(_a12, pattern, ast, 0, options, 0);
    return ast;
  }
  // returns the regular expression if there's magic, or the unescaped
  // string if not.
  toMMPattern() {
    if (this !== __privateGet(this, _root))
      return __privateGet(this, _root).toMMPattern();
    const glob = this.toString();
    const [re3, body, hasMagic, uflag] = this.toRegExpSource();
    const anyMagic = hasMagic || __privateGet(this, _hasMagic) || __privateGet(this, _options).nocase && !__privateGet(this, _options).nocaseMagicOnly && glob.toUpperCase() !== glob.toLowerCase();
    if (!anyMagic) {
      return body;
    }
    const flags = (__privateGet(this, _options).nocase ? "i" : "") + (uflag ? "u" : "");
    return Object.assign(new RegExp(`^${re3}$`, flags), {
      _src: re3,
      _glob: glob
    });
  }
  get options() {
    return __privateGet(this, _options);
  }
  // returns the string match, the regexp source, whether there's magic
  // in the regexp (so a regular expression is required) and whether or
  // not the uflag is needed for the regular expression (for posix classes)
  // TODO: instead of injecting the start/end at this point, just return
  // the BODY of the regexp, along with the start/end portions suitable
  // for binding the start/end in either a joined full-path makeRe context
  // (where we bind to (^|/), or a standalone matchPart context (where
  // we bind to ^, and not /).  Otherwise slashes get duped!
  //
  // In part-matching mode, the start is:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: ^(?!\.\.?$)
  // - if dots allowed or not possible: ^
  // - if dots possible and not allowed: ^(?!\.)
  // end is:
  // - if not isEnd(): nothing
  // - else: $
  //
  // In full-path matching mode, we put the slash at the START of the
  // pattern, so start is:
  // - if first pattern: same as part-matching mode
  // - if not isStart(): nothing
  // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
  // - if dots allowed or not possible: /
  // - if dots possible and not allowed: /(?!\.)
  // end is:
  // - if last pattern, same as part-matching mode
  // - else nothing
  //
  // Always put the (?:$|/) on negated tails, though, because that has to be
  // there to bind the end of the negated pattern portion, and it's easier to
  // just stick it in now rather than try to inject it later in the middle of
  // the pattern.
  //
  // We can just always return the same end, and leave it up to the caller
  // to know whether it's going to be used joined or in parts.
  // And, if the start is adjusted slightly, can do the same there:
  // - if not isStart: nothing
  // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
  // - if dots allowed or not possible: (?:/|^)
  // - if dots possible and not allowed: (?:/|^)(?!\.)
  //
  // But it's better to have a simpler binding without a conditional, for
  // performance, so probably better to return both start options.
  //
  // Then the caller just ignores the end if it's not the first pattern,
  // and the start always gets applied.
  //
  // But that's always going to be $ if it's the ending pattern, or nothing,
  // so the caller can just attach $ at the end of the pattern when building.
  //
  // So the todo is:
  // - better detect what kind of start is needed
  // - return both flavors of starting pattern
  // - attach $ at the end of the pattern when creating the actual RegExp
  //
  // Ah, but wait, no, that all only applies to the root when the first pattern
  // is not an extglob. If the first pattern IS an extglob, then we need all
  // that dot prevention biz to live in the extglob portions, because eg
  // +(*|.x*) can match .xy but not .yx.
  //
  // So, return the two flavors if it's #root and the first child is not an
  // AST, otherwise leave it to the child AST to handle it, and there,
  // use the (?:^|/) style of start binding.
  //
  // Even simplified further:
  // - Since the start for a join is eg /(?!\.) and the start for a part
  // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
  // or start or whatever) and prepend ^ or / at the Regexp construction.
  toRegExpSource(allowDot) {
    const dot = allowDot ?? !!__privateGet(this, _options).dot;
    if (__privateGet(this, _root) === this) {
      __privateMethod(this, _AST_instances, flatten_fn).call(this);
      __privateMethod(this, _AST_instances, fillNegs_fn).call(this);
    }
    if (!isExtglobAST(this)) {
      const noEmpty = this.isStart() && this.isEnd() && !__privateGet(this, _parts).some((s) => typeof s !== "string");
      const src = __privateGet(this, _parts).map((p2) => {
        var _a12;
        const [re3, _4, hasMagic, uflag] = typeof p2 === "string" ? __privateMethod(_a12 = _a11, _AST_static, parseGlob_fn).call(_a12, p2, __privateGet(this, _hasMagic), noEmpty) : p2.toRegExpSource(allowDot);
        __privateSet(this, _hasMagic, __privateGet(this, _hasMagic) || hasMagic);
        __privateSet(this, _uflag, __privateGet(this, _uflag) || uflag);
        return re3;
      }).join("");
      let start2 = "";
      if (this.isStart()) {
        if (typeof __privateGet(this, _parts)[0] === "string") {
          const dotTravAllowed = __privateGet(this, _parts).length === 1 && justDots.has(__privateGet(this, _parts)[0]);
          if (!dotTravAllowed) {
            const aps = addPatternStart;
            const needNoTrav = (
              // dots are allowed, and the pattern starts with [ or .
              dot && aps.has(src.charAt(0)) || // the pattern starts with \., and then [ or .
              src.startsWith("\\.") && aps.has(src.charAt(2)) || // the pattern starts with \.\., and then [ or .
              src.startsWith("\\.\\.") && aps.has(src.charAt(4))
            );
            const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
            start2 = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : "";
          }
        }
      }
      let end = "";
      if (this.isEnd() && __privateGet(__privateGet(this, _root), _filledNegs) && __privateGet(this, _parent)?.type === "!") {
        end = "(?:$|\\/)";
      }
      const final2 = start2 + src + end;
      return [
        final2,
        unescape(src),
        __privateSet(this, _hasMagic, !!__privateGet(this, _hasMagic)),
        __privateGet(this, _uflag)
      ];
    }
    const repeated = this.type === "*" || this.type === "+";
    const start = this.type === "!" ? "(?:(?!(?:" : "(?:";
    let body = __privateMethod(this, _AST_instances, partsToRegExp_fn).call(this, dot);
    if (this.isStart() && this.isEnd() && !body && this.type !== "!") {
      const s = this.toString();
      const me3 = this;
      __privateSet(me3, _parts, [s]);
      me3.type = null;
      __privateSet(me3, _hasMagic, void 0);
      return [s, unescape(this.toString()), false, false];
    }
    let bodyDotAllowed = !repeated || allowDot || dot || !startNoDot ? "" : __privateMethod(this, _AST_instances, partsToRegExp_fn).call(this, true);
    if (bodyDotAllowed === body) {
      bodyDotAllowed = "";
    }
    if (bodyDotAllowed) {
      body = `(?:${body})(?:${bodyDotAllowed})*?`;
    }
    let final = "";
    if (this.type === "!" && __privateGet(this, _emptyExt)) {
      final = (this.isStart() && !dot ? startNoDot : "") + starNoEmpty;
    } else {
      const close = this.type === "!" ? (
        // !() must match something,but !(x) can match ''
        "))" + (this.isStart() && !dot && !allowDot ? startNoDot : "") + star + ")"
      ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && bodyDotAllowed ? ")" : this.type === "*" && bodyDotAllowed ? `)?` : `)${this.type}`;
      final = start + body + close;
    }
    return [
      final,
      unescape(body),
      __privateSet(this, _hasMagic, !!__privateGet(this, _hasMagic)),
      __privateGet(this, _uflag)
    ];
  }
};
_root = new WeakMap();
_hasMagic = new WeakMap();
_uflag = new WeakMap();
_parts = new WeakMap();
_parent = new WeakMap();
_parentIndex = new WeakMap();
_negs = new WeakMap();
_filledNegs = new WeakMap();
_options = new WeakMap();
_toString = new WeakMap();
_emptyExt = new WeakMap();
_AST_instances = new WeakSet();
fillNegs_fn = function() {
  if (this !== __privateGet(this, _root))
    throw new Error("should only call on root");
  if (__privateGet(this, _filledNegs))
    return this;
  this.toString();
  __privateSet(this, _filledNegs, true);
  let n5;
  while (n5 = __privateGet(this, _negs).pop()) {
    if (n5.type !== "!")
      continue;
    let p2 = n5;
    let pp = __privateGet(p2, _parent);
    while (pp) {
      for (let i = __privateGet(p2, _parentIndex) + 1; !pp.type && i < __privateGet(pp, _parts).length; i++) {
        for (const part of __privateGet(n5, _parts)) {
          if (typeof part === "string") {
            throw new Error("string part in extglob AST??");
          }
          part.copyIn(__privateGet(pp, _parts)[i]);
        }
      }
      p2 = pp;
      pp = __privateGet(p2, _parent);
    }
  }
  return this;
};
_AST_static = new WeakSet();
parseAST_fn = function(str, ast, pos, opt, extDepth) {
  var _a12, _b5, _c7, _d4;
  const maxDepth = opt.maxExtglobRecursion ?? 2;
  let escaping = false;
  let inBrace = false;
  let braceStart = -1;
  let braceNeg = false;
  if (ast.type === null) {
    let i2 = pos;
    let acc2 = "";
    while (i2 < str.length) {
      const c3 = str.charAt(i2++);
      if (escaping || c3 === "\\") {
        escaping = !escaping;
        acc2 += c3;
        continue;
      }
      if (inBrace) {
        if (i2 === braceStart + 1) {
          if (c3 === "^" || c3 === "!") {
            braceNeg = true;
          }
        } else if (c3 === "]" && !(i2 === braceStart + 2 && braceNeg)) {
          inBrace = false;
        }
        acc2 += c3;
        continue;
      } else if (c3 === "[") {
        inBrace = true;
        braceStart = i2;
        braceNeg = false;
        acc2 += c3;
        continue;
      }
      const doRecurse = !opt.noext && isExtglobType(c3) && str.charAt(i2) === "(" && extDepth <= maxDepth;
      if (doRecurse) {
        ast.push(acc2);
        acc2 = "";
        const ext2 = new _a11(c3, ast);
        i2 = __privateMethod(_a12 = _a11, _AST_static, parseAST_fn).call(_a12, str, ext2, i2, opt, extDepth + 1);
        ast.push(ext2);
        continue;
      }
      acc2 += c3;
    }
    ast.push(acc2);
    return i2;
  }
  let i = pos + 1;
  let part = new _a11(null, ast);
  const parts = [];
  let acc = "";
  while (i < str.length) {
    const c3 = str.charAt(i++);
    if (escaping || c3 === "\\") {
      escaping = !escaping;
      acc += c3;
      continue;
    }
    if (inBrace) {
      if (i === braceStart + 1) {
        if (c3 === "^" || c3 === "!") {
          braceNeg = true;
        }
      } else if (c3 === "]" && !(i === braceStart + 2 && braceNeg)) {
        inBrace = false;
      }
      acc += c3;
      continue;
    } else if (c3 === "[") {
      inBrace = true;
      braceStart = i;
      braceNeg = false;
      acc += c3;
      continue;
    }
    const doRecurse = !opt.noext && isExtglobType(c3) && str.charAt(i) === "(" && /* c8 ignore start - the maxDepth is sufficient here */
    (extDepth <= maxDepth || ast && __privateMethod(_b5 = ast, _AST_instances, canAdoptType_fn).call(_b5, c3));
    if (doRecurse) {
      const depthAdd = ast && __privateMethod(_c7 = ast, _AST_instances, canAdoptType_fn).call(_c7, c3) ? 0 : 1;
      part.push(acc);
      acc = "";
      const ext2 = new _a11(c3, part);
      part.push(ext2);
      i = __privateMethod(_d4 = _a11, _AST_static, parseAST_fn).call(_d4, str, ext2, i, opt, extDepth + depthAdd);
      continue;
    }
    if (c3 === "|") {
      part.push(acc);
      acc = "";
      parts.push(part);
      part = new _a11(null, ast);
      continue;
    }
    if (c3 === ")") {
      if (acc === "" && __privateGet(ast, _parts).length === 0) {
        __privateSet(ast, _emptyExt, true);
      }
      part.push(acc);
      acc = "";
      ast.push(...parts, part);
      return i;
    }
    acc += c3;
  }
  ast.type = null;
  __privateSet(ast, _hasMagic, void 0);
  __privateSet(ast, _parts, [str.substring(pos - 1)]);
  return i;
};
canAdoptWithSpace_fn = function(child) {
  return __privateMethod(this, _AST_instances, canAdopt_fn).call(this, child, adoptionWithSpaceMap);
};
canAdopt_fn = function(child, map = adoptionMap) {
  if (!child || typeof child !== "object" || child.type !== null || __privateGet(child, _parts).length !== 1 || this.type === null) {
    return false;
  }
  const gc = __privateGet(child, _parts)[0];
  if (!gc || typeof gc !== "object" || gc.type === null) {
    return false;
  }
  return __privateMethod(this, _AST_instances, canAdoptType_fn).call(this, gc.type, map);
};
canAdoptType_fn = function(c3, map = adoptionAnyMap) {
  return !!map.get(this.type)?.includes(c3);
};
adoptWithSpace_fn = function(child, index) {
  const gc = __privateGet(child, _parts)[0];
  const blank = new _a11(null, gc, this.options);
  __privateGet(blank, _parts).push("");
  gc.push(blank);
  __privateMethod(this, _AST_instances, adopt_fn).call(this, child, index);
};
adopt_fn = function(child, index) {
  const gc = __privateGet(child, _parts)[0];
  __privateGet(this, _parts).splice(index, 1, ...__privateGet(gc, _parts));
  for (const p2 of __privateGet(gc, _parts)) {
    if (typeof p2 === "object")
      __privateSet(p2, _parent, this);
  }
  __privateSet(this, _toString, void 0);
};
canUsurpType_fn = function(c3) {
  const m2 = usurpMap.get(this.type);
  return !!m2?.has(c3);
};
canUsurp_fn = function(child) {
  if (!child || typeof child !== "object" || child.type !== null || __privateGet(child, _parts).length !== 1 || this.type === null || __privateGet(this, _parts).length !== 1) {
    return false;
  }
  const gc = __privateGet(child, _parts)[0];
  if (!gc || typeof gc !== "object" || gc.type === null) {
    return false;
  }
  return __privateMethod(this, _AST_instances, canUsurpType_fn).call(this, gc.type);
};
usurp_fn = function(child) {
  const m2 = usurpMap.get(this.type);
  const gc = __privateGet(child, _parts)[0];
  const nt3 = m2?.get(gc.type);
  if (!nt3)
    return false;
  __privateSet(this, _parts, __privateGet(gc, _parts));
  for (const p2 of __privateGet(this, _parts)) {
    if (typeof p2 === "object") {
      __privateSet(p2, _parent, this);
    }
  }
  this.type = nt3;
  __privateSet(this, _toString, void 0);
  __privateSet(this, _emptyExt, false);
};
flatten_fn = function() {
  var _a12, _b5;
  if (!isExtglobAST(this)) {
    for (const p2 of __privateGet(this, _parts)) {
      if (typeof p2 === "object") {
        __privateMethod(_a12 = p2, _AST_instances, flatten_fn).call(_a12);
      }
    }
  } else {
    let iterations = 0;
    let done = false;
    do {
      done = true;
      for (let i = 0; i < __privateGet(this, _parts).length; i++) {
        const c3 = __privateGet(this, _parts)[i];
        if (typeof c3 === "object") {
          __privateMethod(_b5 = c3, _AST_instances, flatten_fn).call(_b5);
          if (__privateMethod(this, _AST_instances, canAdopt_fn).call(this, c3)) {
            done = false;
            __privateMethod(this, _AST_instances, adopt_fn).call(this, c3, i);
          } else if (__privateMethod(this, _AST_instances, canAdoptWithSpace_fn).call(this, c3)) {
            done = false;
            __privateMethod(this, _AST_instances, adoptWithSpace_fn).call(this, c3, i);
          } else if (__privateMethod(this, _AST_instances, canUsurp_fn).call(this, c3)) {
            done = false;
            __privateMethod(this, _AST_instances, usurp_fn).call(this, c3);
          }
        }
      }
    } while (!done && ++iterations < 10);
  }
  __privateSet(this, _toString, void 0);
};
partsToRegExp_fn = function(dot) {
  return __privateGet(this, _parts).map((p2) => {
    if (typeof p2 === "string") {
      throw new Error("string type in extglob ast??");
    }
    const [re3, _4, _hasMagic2, uflag] = p2.toRegExpSource(dot);
    __privateSet(this, _uflag, __privateGet(this, _uflag) || uflag);
    return re3;
  }).filter((p2) => !(this.isStart() && this.isEnd()) || !!p2).join("|");
};
parseGlob_fn = function(glob, hasMagic, noEmpty = false) {
  let escaping = false;
  let re3 = "";
  let uflag = false;
  let inStar = false;
  for (let i = 0; i < glob.length; i++) {
    const c3 = glob.charAt(i);
    if (escaping) {
      escaping = false;
      re3 += (reSpecials.has(c3) ? "\\" : "") + c3;
      continue;
    }
    if (c3 === "*") {
      if (inStar)
        continue;
      inStar = true;
      re3 += noEmpty && /^[*]+$/.test(glob) ? starNoEmpty : star;
      hasMagic = true;
      continue;
    } else {
      inStar = false;
    }
    if (c3 === "\\") {
      if (i === glob.length - 1) {
        re3 += "\\\\";
      } else {
        escaping = true;
      }
      continue;
    }
    if (c3 === "[") {
      const [src, needUflag, consumed, magic] = parseClass(glob, i);
      if (consumed) {
        re3 += src;
        uflag = uflag || needUflag;
        i += consumed - 1;
        hasMagic = hasMagic || magic;
        continue;
      }
    }
    if (c3 === "?") {
      re3 += qmark;
      hasMagic = true;
      continue;
    }
    re3 += regExpEscape(c3);
  }
  return [re3, unescape(glob), !!hasMagic, uflag];
};
__privateAdd(AST, _AST_static);
_a11 = AST;

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/escape.js
init_cjs_shims();
var escape = (s, { windowsPathsNoEscape = false, magicalBraces = false } = {}) => {
  if (magicalBraces) {
    return windowsPathsNoEscape ? s.replace(/[?*()[\]{}]/g, "[$&]") : s.replace(/[?*()[\]\\{}]/g, "\\$&");
  }
  return windowsPathsNoEscape ? s.replace(/[?*()[\]]/g, "[$&]") : s.replace(/[?*()[\]\\]/g, "\\$&");
};

// node_modules/.pnpm/minimatch@10.2.6/node_modules/minimatch/dist/esm/index.js
var minimatch = (p2, pattern, options = {}) => {
  assertValidPattern(pattern);
  if (!options.nocomment && pattern.charAt(0) === "#") {
    return false;
  }
  return new Minimatch(pattern, options).match(p2);
};
var starDotExtRE = /^\*+([^+@!?*[(]*)$/;
var starDotExtTest = (ext2) => (f3) => !f3.startsWith(".") && f3.endsWith(ext2);
var starDotExtTestDot = (ext2) => (f3) => f3.endsWith(ext2);
var starDotExtTestNocase = (ext2) => {
  ext2 = ext2.toLowerCase();
  return (f3) => !f3.startsWith(".") && f3.toLowerCase().endsWith(ext2);
};
var starDotExtTestNocaseDot = (ext2) => {
  ext2 = ext2.toLowerCase();
  return (f3) => f3.toLowerCase().endsWith(ext2);
};
var starDotStarRE = /^\*+\.\*+$/;
var starDotStarTest = (f3) => !f3.startsWith(".") && f3.includes(".");
var starDotStarTestDot = (f3) => f3 !== "." && f3 !== ".." && f3.includes(".");
var dotStarRE = /^\.\*+$/;
var dotStarTest = (f3) => f3 !== "." && f3 !== ".." && f3.startsWith(".");
var starRE = /^\*+$/;
var starTest = (f3) => f3.length !== 0 && !f3.startsWith(".");
var starTestDot = (f3) => f3.length !== 0 && f3 !== "." && f3 !== "..";
var qmarksRE = /^\?+([^+@!?*[(]*)?$/;
var qmarksTestNocase = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExt([$0]);
  if (!ext2)
    return noext;
  ext2 = ext2.toLowerCase();
  return (f3) => noext(f3) && f3.toLowerCase().endsWith(ext2);
};
var qmarksTestNocaseDot = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExtDot([$0]);
  if (!ext2)
    return noext;
  ext2 = ext2.toLowerCase();
  return (f3) => noext(f3) && f3.toLowerCase().endsWith(ext2);
};
var qmarksTestDot = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExtDot([$0]);
  return !ext2 ? noext : (f3) => noext(f3) && f3.endsWith(ext2);
};
var qmarksTest = ([$0, ext2 = ""]) => {
  const noext = qmarksTestNoExt([$0]);
  return !ext2 ? noext : (f3) => noext(f3) && f3.endsWith(ext2);
};
var qmarksTestNoExt = ([$0]) => {
  const len = $0.length;
  return (f3) => f3.length === len && !f3.startsWith(".");
};
var qmarksTestNoExtDot = ([$0]) => {
  const len = $0.length;
  return (f3) => f3.length === len && f3 !== "." && f3 !== "..";
};
var defaultPlatform = typeof process === "object" && process ? typeof process.env === "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
var path2 = {
  win32: { sep: "\\" },
  posix: { sep: "/" }
};
var sep = defaultPlatform === "win32" ? path2.win32.sep : path2.posix.sep;
minimatch.sep = sep;
var GLOBSTAR = /* @__PURE__ */ Symbol("globstar **");
minimatch.GLOBSTAR = GLOBSTAR;
var qmark2 = "[^/]";
var star2 = qmark2 + "*?";
var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
var filter = (pattern, options = {}) => (p2) => minimatch(p2, pattern, options);
minimatch.filter = filter;
var ext = (a, b3 = {}) => Object.assign({}, a, b3);
var defaults = (def) => {
  if (!def || typeof def !== "object" || !Object.keys(def).length) {
    return minimatch;
  }
  const orig = minimatch;
  const m2 = (p2, pattern, options = {}) => orig(p2, pattern, ext(def, options));
  return Object.assign(m2, {
    Minimatch: class Minimatch extends orig.Minimatch {
      constructor(pattern, options = {}) {
        super(pattern, ext(def, options));
      }
      static defaults(options) {
        return orig.defaults(ext(def, options)).Minimatch;
      }
    },
    AST: class AST extends orig.AST {
      /* c8 ignore start */
      constructor(type, parent, options = {}) {
        super(type, parent, ext(def, options));
      }
      /* c8 ignore stop */
      static fromGlob(pattern, options = {}) {
        return orig.AST.fromGlob(pattern, ext(def, options));
      }
    },
    unescape: (s, options = {}) => orig.unescape(s, ext(def, options)),
    escape: (s, options = {}) => orig.escape(s, ext(def, options)),
    filter: (pattern, options = {}) => orig.filter(pattern, ext(def, options)),
    defaults: (options) => orig.defaults(ext(def, options)),
    makeRe: (pattern, options = {}) => orig.makeRe(pattern, ext(def, options)),
    braceExpand: (pattern, options = {}) => orig.braceExpand(pattern, ext(def, options)),
    match: (list, pattern, options = {}) => orig.match(list, pattern, ext(def, options)),
    sep: orig.sep,
    GLOBSTAR
  });
};
minimatch.defaults = defaults;
var braceExpand = (pattern, options = {}) => {
  assertValidPattern(pattern);
  if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
    return [pattern];
  }
  return expand(pattern, { max: options.braceExpandMax });
};
minimatch.braceExpand = braceExpand;
var makeRe = (pattern, options = {}) => new Minimatch(pattern, options).makeRe();
minimatch.makeRe = makeRe;
var match = (list, pattern, options = {}) => {
  const mm = new Minimatch(pattern, options);
  list = list.filter((f3) => mm.match(f3));
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list;
};
minimatch.match = match;
var globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
var regExpEscape2 = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
var _Minimatch_instances, matchGlobstar_fn, matchGlobStarBodySections_fn, matchOne_fn;
var Minimatch = class {
  constructor(pattern, options = {}) {
    __privateAdd(this, _Minimatch_instances);
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
    __publicField(this, "maxGlobstarRecursion");
    __publicField(this, "regexp");
    assertValidPattern(pattern);
    options = options || {};
    this.options = options;
    this.maxGlobstarRecursion = options.maxGlobstarRecursion ?? 200;
    this.pattern = pattern;
    this.platform = options.platform || defaultPlatform;
    this.isWindows = this.platform === "win32";
    const awe = "allowWindowsEscape";
    this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options[awe] === false;
    if (this.windowsPathsNoEscape) {
      this.pattern = this.pattern.replace(/\\/g, "/");
    }
    this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
    this.regexp = null;
    this.negate = false;
    this.nonegate = !!options.nonegate;
    this.comment = false;
    this.empty = false;
    this.partial = !!options.partial;
    this.nocase = !!this.options.nocase;
    this.windowsNoMagicRoot = options.windowsNoMagicRoot !== void 0 ? options.windowsNoMagicRoot : !!(this.isWindows && this.nocase);
    this.globSet = [];
    this.globParts = [];
    this.set = [];
    this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) {
      return true;
    }
    for (const pattern of this.set) {
      for (const part of pattern) {
        if (typeof part !== "string")
          return true;
      }
    }
    return false;
  }
  debug(..._4) {
  }
  make() {
    const pattern = this.pattern;
    const options = this.options;
    if (!options.nocomment && pattern.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }
    this.parseNegate();
    this.globSet = [...new Set(this.braceExpand())];
    if (options.debug) {
      this.debug = (...args) => console.error(...args);
    }
    this.debug(this.pattern, this.globSet);
    const rawGlobParts = this.globSet.map((s) => this.slashSplit(s));
    this.globParts = this.preprocess(rawGlobParts);
    this.debug(this.pattern, this.globParts);
    let set = this.globParts.map((s, _4, __3) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        const isUNC = s[0] === "" && s[1] === "" && (s[2] === "?" || !globMagic.test(s[2])) && !globMagic.test(s[3]);
        const isDrive = /^[a-z]:/i.test(s[0]);
        if (isUNC) {
          return [
            ...s.slice(0, 4),
            ...s.slice(4).map((ss3) => this.parse(ss3))
          ];
        } else if (isDrive) {
          return [s[0], ...s.slice(1).map((ss3) => this.parse(ss3))];
        }
      }
      return s.map((ss3) => this.parse(ss3));
    });
    this.debug(this.pattern, set);
    this.set = set.filter((s) => s.indexOf(false) === -1);
    if (this.isWindows) {
      for (let i = 0; i < this.set.length; i++) {
        const p2 = this.set[i];
        if (p2[0] === "" && p2[1] === "" && this.globParts[i][2] === "?" && typeof p2[3] === "string" && /^[a-z]:$/i.test(p2[3])) {
          p2[2] = "?";
        }
      }
    }
    this.debug(this.pattern, this.set);
  }
  // various transforms to equivalent pattern sets that are
  // faster to process in a filesystem walk.  The goal is to
  // eliminate what we can, and push all ** patterns as far
  // to the right as possible, even if it increases the number
  // of patterns that we have to process.
  preprocess(globParts) {
    if (this.options.noglobstar) {
      for (const partset of globParts) {
        for (let j4 = 0; j4 < partset.length; j4++) {
          if (partset[j4] === "**") {
            partset[j4] = "*";
          }
        }
      }
    }
    const { optimizationLevel = 1 } = this.options;
    if (optimizationLevel >= 2) {
      globParts = this.firstPhasePreProcess(globParts);
      globParts = this.secondPhasePreProcess(globParts);
    } else if (optimizationLevel >= 1) {
      globParts = this.levelOneOptimize(globParts);
    } else {
      globParts = this.adjascentGlobstarOptimize(globParts);
    }
    return globParts;
  }
  // just get rid of adjascent ** portions
  adjascentGlobstarOptimize(globParts) {
    return globParts.map((parts) => {
      let gs3 = -1;
      while (-1 !== (gs3 = parts.indexOf("**", gs3 + 1))) {
        let i = gs3;
        while (parts[i + 1] === "**") {
          i++;
        }
        if (i !== gs3) {
          parts.splice(gs3, i - gs3);
        }
      }
      return parts;
    });
  }
  // get rid of adjascent ** and resolve .. portions
  levelOneOptimize(globParts) {
    return globParts.map((parts) => {
      parts = parts.reduce((set, part) => {
        const prev = set[set.length - 1];
        if (part === "**" && prev === "**") {
          return set;
        }
        if (part === "..") {
          if (prev && prev !== ".." && prev !== "." && prev !== "**") {
            set.pop();
            return set;
          }
        }
        set.push(part);
        return set;
      }, []);
      return parts.length === 0 ? [""] : parts;
    });
  }
  levelTwoFileOptimize(parts) {
    if (!Array.isArray(parts)) {
      parts = this.slashSplit(parts);
    }
    let didSomething = false;
    do {
      didSomething = false;
      if (!this.preserveMultipleSlashes) {
        for (let i = 1; i < parts.length - 1; i++) {
          const p2 = parts[i];
          if (i === 1 && p2 === "" && parts[0] === "")
            continue;
          if (p2 === "." || p2 === "") {
            didSomething = true;
            parts.splice(i, 1);
            i--;
          }
        }
        if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
          didSomething = true;
          parts.pop();
        }
      }
      let dd = 0;
      while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
        const p2 = parts[dd - 1];
        if (p2 && p2 !== "." && p2 !== ".." && p2 !== "**" && !(this.isWindows && /^[a-z]:$/i.test(p2))) {
          didSomething = true;
          parts.splice(dd - 1, 2);
          dd -= 2;
        }
      }
    } while (didSomething);
    return parts.length === 0 ? [""] : parts;
  }
  // First phase: single-pattern processing
  // <pre> is 1 or more portions
  // <rest> is 1 or more portions
  // <p> is any portion other than ., .., '', or **
  // <e> is . or ''
  //
  // **/.. is *brutal* for filesystem walking performance, because
  // it effectively resets the recursive walk each time it occurs,
  // and ** cannot be reduced out by a .. pattern part like a regexp
  // or most strings (other than .., ., and '') can be.
  //
  // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
  // <pre>/<e>/<rest> -> <pre>/<rest>
  // <pre>/<p>/../<rest> -> <pre>/<rest>
  // **/**/<rest> -> **/<rest>
  //
  // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
  // this WOULD be allowed if ** did follow symlinks, or * didn't
  firstPhasePreProcess(globParts) {
    let didSomething = false;
    do {
      didSomething = false;
      for (let parts of globParts) {
        let gs3 = -1;
        while (-1 !== (gs3 = parts.indexOf("**", gs3 + 1))) {
          let gss = gs3;
          while (parts[gss + 1] === "**") {
            gss++;
          }
          if (gss > gs3) {
            parts.splice(gs3 + 1, gss - gs3);
          }
          let next = parts[gs3 + 1];
          const p2 = parts[gs3 + 2];
          const p22 = parts[gs3 + 3];
          if (next !== "..")
            continue;
          if (!p2 || p2 === "." || p2 === ".." || !p22 || p22 === "." || p22 === "..") {
            continue;
          }
          didSomething = true;
          parts.splice(gs3, 1);
          const other = parts.slice(0);
          other[gs3] = "**";
          globParts.push(other);
          gs3--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let i = 1; i < parts.length - 1; i++) {
            const p2 = parts[i];
            if (i === 1 && p2 === "" && parts[0] === "")
              continue;
            if (p2 === "." || p2 === "") {
              didSomething = true;
              parts.splice(i, 1);
              i--;
            }
          }
          if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
            didSomething = true;
            parts.pop();
          }
        }
        let dd = 0;
        while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
          const p2 = parts[dd - 1];
          if (p2 && p2 !== "." && p2 !== ".." && p2 !== "**") {
            didSomething = true;
            const needDot = dd === 1 && parts[dd + 1] === "**";
            const splin = needDot ? ["."] : [];
            parts.splice(dd - 1, 2, ...splin);
            if (parts.length === 0)
              parts.push("");
            dd -= 2;
          }
        }
      }
    } while (didSomething);
    return globParts;
  }
  // second phase: multi-pattern dedupes
  // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
  // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
  // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
  //
  // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
  // ^-- not valid because ** doens't follow symlinks
  secondPhasePreProcess(globParts) {
    for (let i = 0; i < globParts.length - 1; i++) {
      for (let j4 = i + 1; j4 < globParts.length; j4++) {
        const matched = this.partsMatch(globParts[i], globParts[j4], !this.preserveMultipleSlashes);
        if (matched) {
          globParts[i] = [];
          globParts[j4] = matched;
          break;
        }
      }
    }
    return globParts.filter((gs3) => gs3.length);
  }
  partsMatch(a, b3, emptyGSMatch = false) {
    let ai2 = 0;
    let bi2 = 0;
    let result = [];
    let which = "";
    while (ai2 < a.length && bi2 < b3.length) {
      if (a[ai2] === b3[bi2]) {
        result.push(which === "b" ? b3[bi2] : a[ai2]);
        ai2++;
        bi2++;
      } else if (emptyGSMatch && a[ai2] === "**" && b3[bi2] === a[ai2 + 1]) {
        result.push(a[ai2]);
        ai2++;
      } else if (emptyGSMatch && b3[bi2] === "**" && a[ai2] === b3[bi2 + 1]) {
        result.push(b3[bi2]);
        bi2++;
      } else if (a[ai2] === "*" && b3[bi2] && (this.options.dot || !b3[bi2].startsWith(".")) && b3[bi2] !== "**") {
        if (which === "b")
          return false;
        which = "a";
        result.push(a[ai2]);
        ai2++;
        bi2++;
      } else if (b3[bi2] === "*" && a[ai2] && (this.options.dot || !a[ai2].startsWith(".")) && a[ai2] !== "**") {
        if (which === "a")
          return false;
        which = "b";
        result.push(b3[bi2]);
        ai2++;
        bi2++;
      } else {
        return false;
      }
    }
    return a.length === b3.length && result;
  }
  parseNegate() {
    if (this.nonegate)
      return;
    const pattern = this.pattern;
    let negate = false;
    let negateOffset = 0;
    for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
      negate = !negate;
      negateOffset++;
    }
    if (negateOffset)
      this.pattern = pattern.slice(negateOffset);
    this.negate = negate;
  }
  // set partial to true to test if, for example,
  // "/a/b" matches the start of "/*/b/*/d"
  // Partial means, if you run out of file before you run
  // out of pattern, then that's fine, as long as all
  // the parts match.
  matchOne(file, pattern, partial = false) {
    let fileStartIndex = 0;
    let patternStartIndex = 0;
    if (this.isWindows) {
      const fileDrive = typeof file[0] === "string" && /^[a-z]:$/i.test(file[0]);
      const fileUNC = !fileDrive && file[0] === "" && file[1] === "" && file[2] === "?" && /^[a-z]:$/i.test(file[3]);
      const patternDrive = typeof pattern[0] === "string" && /^[a-z]:$/i.test(pattern[0]);
      const patternUNC = !patternDrive && pattern[0] === "" && pattern[1] === "" && pattern[2] === "?" && typeof pattern[3] === "string" && /^[a-z]:$/i.test(pattern[3]);
      const fdi = fileUNC ? 3 : fileDrive ? 0 : void 0;
      const pdi = patternUNC ? 3 : patternDrive ? 0 : void 0;
      if (typeof fdi === "number" && typeof pdi === "number") {
        const [fd, pd] = [
          file[fdi],
          pattern[pdi]
        ];
        if (fd.toLowerCase() === pd.toLowerCase()) {
          pattern[pdi] = fd;
          patternStartIndex = pdi;
          fileStartIndex = fdi;
        }
      }
    }
    const { optimizationLevel = 1 } = this.options;
    if (optimizationLevel >= 2) {
      file = this.levelTwoFileOptimize(file);
    }
    if (pattern.includes(GLOBSTAR)) {
      return __privateMethod(this, _Minimatch_instances, matchGlobstar_fn).call(this, file, pattern, partial, fileStartIndex, patternStartIndex);
    }
    return __privateMethod(this, _Minimatch_instances, matchOne_fn).call(this, file, pattern, partial, fileStartIndex, patternStartIndex);
  }
  braceExpand() {
    return braceExpand(this.pattern, this.options);
  }
  parse(pattern) {
    assertValidPattern(pattern);
    const options = this.options;
    if (pattern === "**")
      return GLOBSTAR;
    if (pattern === "")
      return "";
    let m2;
    let fastTest = null;
    if (m2 = pattern.match(starRE)) {
      fastTest = options.dot ? starTestDot : starTest;
    } else if (m2 = pattern.match(starDotExtRE)) {
      fastTest = (options.nocase ? options.dot ? starDotExtTestNocaseDot : starDotExtTestNocase : options.dot ? starDotExtTestDot : starDotExtTest)(m2[1]);
    } else if (m2 = pattern.match(qmarksRE)) {
      fastTest = (options.nocase ? options.dot ? qmarksTestNocaseDot : qmarksTestNocase : options.dot ? qmarksTestDot : qmarksTest)(m2);
    } else if (m2 = pattern.match(starDotStarRE)) {
      fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
    } else if (m2 = pattern.match(dotStarRE)) {
      fastTest = dotStarTest;
    }
    const re3 = AST.fromGlob(pattern, this.options).toMMPattern();
    if (fastTest && typeof re3 === "object") {
      Reflect.defineProperty(re3, "test", { value: fastTest });
    }
    return re3;
  }
  makeRe() {
    if (this.regexp || this.regexp === false)
      return this.regexp;
    const set = this.set;
    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    const options = this.options;
    const twoStar = options.noglobstar ? star2 : options.dot ? twoStarDot : twoStarNoDot;
    const flags = new Set(options.nocase ? ["i"] : []);
    let re3 = set.map((pattern) => {
      const pp = pattern.map((p2) => {
        if (p2 instanceof RegExp) {
          for (const f3 of p2.flags.split(""))
            flags.add(f3);
        }
        return typeof p2 === "string" ? regExpEscape2(p2) : p2 === GLOBSTAR ? GLOBSTAR : p2._src;
      });
      pp.forEach((p2, i) => {
        const next = pp[i + 1];
        const prev = pp[i - 1];
        if (p2 !== GLOBSTAR || prev === GLOBSTAR) {
          return;
        }
        if (prev === void 0) {
          if (next !== void 0 && next !== GLOBSTAR) {
            pp[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + next;
          } else {
            pp[i] = twoStar;
          }
        } else if (next === void 0) {
          pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + ")?";
        } else if (next !== GLOBSTAR) {
          pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + "\\/)" + next;
          pp[i + 1] = GLOBSTAR;
        }
      });
      const filtered = pp.filter((p2) => p2 !== GLOBSTAR);
      if (this.partial && filtered.length >= 1) {
        const prefixes = [];
        for (let i = 1; i <= filtered.length; i++) {
          prefixes.push(filtered.slice(0, i).join("/"));
        }
        return "(?:" + prefixes.join("|") + ")";
      }
      return filtered.join("/");
    }).join("|");
    const [open, close] = set.length > 1 ? ["(?:", ")"] : ["", ""];
    re3 = "^" + open + re3 + close + "$";
    if (this.partial) {
      re3 = "^(?:\\/|" + open + re3.slice(1, -1) + close + ")$";
    }
    if (this.negate)
      re3 = "^(?!" + re3 + ").+$";
    try {
      this.regexp = new RegExp(re3, [...flags].join(""));
    } catch {
      this.regexp = false;
    }
    return this.regexp;
  }
  slashSplit(p2) {
    if (this.preserveMultipleSlashes) {
      return p2.split("/");
    } else if (this.isWindows && /^\/\/[^/]+/.test(p2)) {
      return ["", ...p2.split(/\/+/)];
    } else {
      return p2.split(/\/+/);
    }
  }
  match(f3, partial = this.partial) {
    this.debug("match", f3, this.pattern);
    if (this.comment) {
      return false;
    }
    if (this.empty) {
      return f3 === "";
    }
    if (f3 === "/" && partial) {
      return true;
    }
    const options = this.options;
    if (this.isWindows) {
      f3 = f3.split("\\").join("/");
    }
    const ff = this.slashSplit(f3);
    this.debug(this.pattern, "split", ff);
    const set = this.set;
    this.debug(this.pattern, "set", set);
    let filename = ff[ff.length - 1];
    if (!filename) {
      for (let i = ff.length - 2; !filename && i >= 0; i--) {
        filename = ff[i];
      }
    }
    for (const pattern of set) {
      let file = ff;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      const hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate) {
          return true;
        }
        return !this.negate;
      }
    }
    if (options.flipNegate) {
      return false;
    }
    return this.negate;
  }
  static defaults(def) {
    return minimatch.defaults(def).Minimatch;
  }
};
_Minimatch_instances = new WeakSet();
matchGlobstar_fn = function(file, pattern, partial, fileIndex, patternIndex) {
  const firstgs = pattern.indexOf(GLOBSTAR, patternIndex);
  const lastgs = pattern.lastIndexOf(GLOBSTAR);
  const [head, body, tail] = partial ? [
    pattern.slice(patternIndex, firstgs),
    pattern.slice(firstgs + 1),
    []
  ] : [
    pattern.slice(patternIndex, firstgs),
    pattern.slice(firstgs + 1, lastgs),
    pattern.slice(lastgs + 1)
  ];
  if (head.length) {
    const fileHead = file.slice(fileIndex, fileIndex + head.length);
    if (!__privateMethod(this, _Minimatch_instances, matchOne_fn).call(this, fileHead, head, partial, 0, 0)) {
      return false;
    }
    fileIndex += head.length;
    patternIndex += head.length;
  }
  let fileTailMatch = 0;
  if (tail.length) {
    if (tail.length + fileIndex > file.length)
      return false;
    let tailStart = file.length - tail.length;
    if (__privateMethod(this, _Minimatch_instances, matchOne_fn).call(this, file, tail, partial, tailStart, 0)) {
      fileTailMatch = tail.length;
    } else {
      if (file[file.length - 1] !== "" || fileIndex + tail.length === file.length) {
        return false;
      }
      tailStart--;
      if (!__privateMethod(this, _Minimatch_instances, matchOne_fn).call(this, file, tail, partial, tailStart, 0)) {
        return false;
      }
      fileTailMatch = tail.length + 1;
    }
  }
  if (!body.length) {
    let sawSome = !!fileTailMatch;
    for (let i2 = fileIndex; i2 < file.length - fileTailMatch; i2++) {
      const f3 = String(file[i2]);
      sawSome = true;
      if (f3 === "." || f3 === ".." || !this.options.dot && f3.startsWith(".")) {
        return false;
      }
    }
    return partial || sawSome;
  }
  const bodySegments = [[[], 0]];
  let currentBody = bodySegments[0];
  let nonGsParts = 0;
  const nonGsPartsSums = [0];
  for (const b3 of body) {
    if (b3 === GLOBSTAR) {
      nonGsPartsSums.push(nonGsParts);
      currentBody = [[], 0];
      bodySegments.push(currentBody);
    } else {
      currentBody[0].push(b3);
      nonGsParts++;
    }
  }
  let i = bodySegments.length - 1;
  const fileLength = file.length - fileTailMatch;
  for (const b3 of bodySegments) {
    b3[1] = fileLength - (nonGsPartsSums[i--] + b3[0].length);
  }
  return !!__privateMethod(this, _Minimatch_instances, matchGlobStarBodySections_fn).call(this, file, bodySegments, fileIndex, 0, partial, 0, !!fileTailMatch);
};
// return false for "nope, not matching"
// return null for "not matching, cannot keep trying"
matchGlobStarBodySections_fn = function(file, bodySegments, fileIndex, bodyIndex, partial, globStarDepth, sawTail) {
  const bs3 = bodySegments[bodyIndex];
  if (!bs3) {
    for (let i = fileIndex; i < file.length; i++) {
      sawTail = true;
      const f3 = file[i];
      if (f3 === "." || f3 === ".." || !this.options.dot && f3.startsWith(".")) {
        return false;
      }
    }
    return sawTail;
  }
  const [body, after] = bs3;
  while (fileIndex <= after) {
    const m2 = __privateMethod(this, _Minimatch_instances, matchOne_fn).call(this, file.slice(0, fileIndex + body.length), body, partial, fileIndex, 0);
    if (m2 && globStarDepth < this.maxGlobstarRecursion) {
      const sub = __privateMethod(this, _Minimatch_instances, matchGlobStarBodySections_fn).call(this, file, bodySegments, fileIndex + body.length, bodyIndex + 1, partial, globStarDepth + 1, sawTail);
      if (sub !== false) {
        return sub;
      }
    }
    const f3 = file[fileIndex];
    if (f3 === "." || f3 === ".." || !this.options.dot && f3.startsWith(".")) {
      return false;
    }
    fileIndex++;
  }
  return partial || null;
};
matchOne_fn = function(file, pattern, partial, fileIndex, patternIndex) {
  let fi2;
  let pi2;
  let pl;
  let fl;
  for (fi2 = fileIndex, pi2 = patternIndex, fl = file.length, pl = pattern.length; fi2 < fl && pi2 < pl; fi2++, pi2++) {
    this.debug("matchOne loop");
    let p2 = pattern[pi2];
    let f3 = file[fi2];
    this.debug(pattern, p2, f3);
    if (p2 === false || p2 === GLOBSTAR) {
      return false;
    }
    let hit;
    if (typeof p2 === "string") {
      hit = f3 === p2;
      this.debug("string match", p2, f3, hit);
    } else {
      hit = p2.test(f3);
      this.debug("pattern match", p2, f3, hit);
    }
    if (!hit)
      return false;
  }
  if (fi2 === fl && pi2 === pl) {
    return true;
  } else if (fi2 === fl) {
    return partial;
  } else if (pi2 === pl) {
    return fi2 === fl - 1 && file[fi2] === "";
  } else {
    throw new Error("wtf?");
  }
};
minimatch.AST = AST;
minimatch.Minimatch = Minimatch;
minimatch.escape = escape;
minimatch.unescape = unescape;

// src/core/frameworks/playwright.ts
init_cjs_shims();
var import_path2 = __toESM(__nccwpck_require__(928));

// src/core/frameworks/common.ts
init_cjs_shims();
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
  let match2;
  describePattern.lastIndex = 0;
  while ((match2 = describePattern.exec(content)) !== null) {
    const matchEnd = match2.index + match2[0].length;
    const afterMatch = content.substring(matchEnd);
    const braceOffset = afterMatch.indexOf("{");
    if (braceOffset === -1) continue;
    const braceStart = matchEnd + braceOffset;
    const braceEnd = findMatchingBrace(content, braceStart);
    if (braceEnd !== -1) {
      blocks.push({ name: match2[2] || match2[1], start: braceStart, end: braceEnd });
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
init_cjs_shims();
function extractParameterizedDataFromEach(content) {
  const eachRegex = new RegExp(`(?:test|describe)\\.each\\s*\\(\\s*\\[([\\s\\S]*?)\\]\\s*\\)`, "g");
  let match2;
  while ((match2 = eachRegex.exec(content)) !== null) {
    const dataContent = match2[1];
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
function extractParameterizedDataFromForEach(content, testIndex) {
  const contextStart = Math.max(0, testIndex - 1e3);
  const context = content.substring(contextStart, testIndex);
  const forEachMatch = context.match(/\b(?:users|items|data|elements|nodes)\.forEach\s*\(/i);
  const forMatch = context.match(/\bfor\s*\(\s*(?:let|var|const)\s+(\w+)\s+(?:of|in)\s+(.+?)\s*\)/);
  if (!(forEachMatch || forMatch)) return null;
  const loopSearchStart = forEachMatch ? context.search(/\b(?:users|items|data|elements|nodes)\.forEach\s*\(/i) : context.search(/\bfor\s*\(\s*(?:let|var|const)/);
  if (loopSearchStart === -1 || !isLoopStillOpen(context, loopSearchStart)) return null;
  const arrayDeclMatch = context.match(/(?:const|let|var)\s+\w+\s*=\s*\[([\s\S]*?)\]/);
  if (arrayDeclMatch) {
    const arrayContent = arrayDeclMatch[1];
    const count = countParameterSets(arrayContent);
    if (count > 0) {
      return { count, hasParameters: true };
    }
  }
  return { count: 0, hasParameters: true };
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
function detectParameterizedLoop(content, testIndex) {
  const contextStart = Math.max(0, testIndex - 1e3);
  const context = content.substring(contextStart, testIndex);
  const forMatch = /\bfor\s*\(\s*(?:const|let|var)\s+.+?\s+(?:of|in)\s+.+?\)/.exec(context);
  if (forMatch && isLoopStillOpen(context, forMatch.index)) {
    return true;
  }
  const forEachMatch = /\.\s*forEach\s*\(/.exec(context);
  if (forEachMatch && isLoopStillOpen(context, forEachMatch.index)) {
    return true;
  }
  return false;
}
function isLoopStillOpen(context, loopStart) {
  let netBraces = 0;
  for (let i = loopStart; i < context.length; i++) {
    if (context[i] === "{") netBraces++;
    else if (context[i] === "}") netBraces--;
    if (netBraces < 0) return false;
  }
  return true;
}
function isLikelyParameterizedTest(testName) {
  if (testName.includes("$")) {
    return true;
  }
  if (/\[\d+\]/.test(testName)) {
    return true;
  }
  if (/\s#\s*\d+/.test(testName) || /param\s*\d+/i.test(testName)) {
    return true;
  }
  return false;
}
function generateParameterizedTestName(baseName, paramIndex, paramCount) {
  return `${baseName} [${paramIndex + 1}/${paramCount}]`;
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
  let match2;
  TEST_RE.lastIndex = 0;
  while ((match2 = TEST_RE.exec(content)) !== null) {
    const testName = match2[2];
    const matchIndex = match2.index;
    const line = lineNumberAt(content, matchIndex);
    const parentDescribe = resolveParentDescribe(describeBlocks, matchIndex);
    const tags = extractInlineTags(content, matchIndex);
    const isParameterized3 = detectParameterizedLoop(content, matchIndex) || isLikelyParameterizedTest(testName);
    if (isParameterized3 && !tags.some((t2) => t2.name === "@parameterized")) {
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
  const describeBlocks = findDescribeBlocks(content, DESCRIBE_RE);
  let match2;
  TEST_RE.lastIndex = 0;
  while ((match2 = TEST_RE.exec(content)) !== null) {
    const testName = match2[2];
    const parentDescribe = resolveParentDescribe(describeBlocks, match2.index);
    names.push(parentDescribe ? `${parentDescribe} > ${testName}` : testName);
  }
  return names;
}
function extractInlineTags(content, testIndex) {
  const window2 = content.substring(testIndex, testIndex + TAG_SEARCH_WINDOW_CHARS);
  const tags = [];
  let match2;
  INLINE_TAG_RE.lastIndex = 0;
  while ((match2 = INLINE_TAG_RE.exec(window2)) !== null) {
    if (match2[2]) {
      tags.push({ name: match2[2] });
    } else if (match2[3]) {
      const tagList = match2[3].split(",").map((t2) => t2.trim().replace(/^['"`]|['"`]$/g, "")).filter((t2) => t2.length > 0);
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
    parameterized: true,
    lineNumbers: true,
    asyncTests: true
  }
};

// src/core/frameworks/cypress.ts
init_cjs_shims();
var import_path3 = __toESM(__nccwpck_require__(928));
var DESCRIBE_RE2 = /describe\s*\(\s*(['"`])([\s\S]*?)\1/g;
var TEST_RE2 = /(?:^|[ \t]+)(?:it|specify|test)\s*(?:\.(?:skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/gm;
function parseCypressSpec(filePath, content, projectRoot) {
  const relativePath = import_path3.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const describeBlocks = findDescribeBlocks(content, DESCRIBE_RE2);
  const tests = [];
  let match2;
  TEST_RE2.lastIndex = 0;
  while ((match2 = TEST_RE2.exec(content)) !== null) {
    const testName = match2[2];
    const matchIndex = match2.index;
    const line = lineNumberAt(content, matchIndex);
    const parentDescribe = resolveParentDescribe(describeBlocks, matchIndex);
    const paramData = extractParameterizedDataFromForEach(content, matchIndex);
    if (paramData?.hasParameters) {
      if (paramData.count > 0) {
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
      } else {
        const id2 = hashId(`${relativePath}::${parentDescribe ?? ""}::${testName}`);
        tests.push({
          id: id2,
          name: testName,
          fullName: parentDescribe ? `${parentDescribe} > ${testName}` : testName,
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
  return parseCypressSpec("/__history__/test.cy.ts", content, "/__history__").tests.map((test) => test.fullName);
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
var import_path4 = __toESM(__nccwpck_require__(928));
var DESCRIBE_RE3 = /describe\s*(?:\.(?:skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/g;
var TEST_RE3 = /(?:^|[ \t]+)(?:test|it)\s*(?:\.(?:skip|only|todo))?\s*\(\s*(['"`])([\s\S]*?)\1/gm;
function parseVitestSpec(filePath, content, projectRoot) {
  const relativePath = import_path4.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const describeBlocks = findDescribeBlocks(content, DESCRIBE_RE3);
  const tests = [];
  let match2;
  TEST_RE3.lastIndex = 0;
  while ((match2 = TEST_RE3.exec(content)) !== null) {
    const testName = match2[2];
    const matchIndex = match2.index;
    const line = lineNumberAt(content, matchIndex);
    const parentDescribe = resolveParentDescribe(describeBlocks, matchIndex);
    const isTodo = /\.todo\s*\(/.test(content.substring(matchIndex, matchIndex + 50));
    const tags = isTodo ? [{ name: "@todo" }] : [];
    const isParameterized3 = extractParameterizedDataFromEach(content.substring(Math.max(0, matchIndex - 500), matchIndex + 200)) !== null || detectParameterizedLoop(content, matchIndex) || isLikelyParameterizedTest(testName);
    if (isParameterized3) {
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
  let match2;
  TEST_RE3.lastIndex = 0;
  while ((match2 = TEST_RE3.exec(content)) !== null) {
    const testName = match2[2];
    const parentDescribe = resolveParentDescribe(describeBlocks, match2.index);
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
    parameterized: true,
    lineNumbers: true,
    asyncTests: true
  }
};

// src/core/frameworks/jest.ts
init_cjs_shims();
var import_path5 = __toESM(__nccwpck_require__(928));
var DESCRIBE_RE4 = /describe(?:\.(?:skip|only))?\s*\(\s*(['"`])([\s\S]*?)\1/g;
var DESCRIBE_EACH_RE = /describe(?:\.(?:skip|only))?\.each\s*(?:\([\s\S]*?\)|`[\s\S]*?`)\s*\(\s*(['"`])([\s\S]*?)\1/g;
var TEST_RE4 = /(?:^|[ \t]+)(?:test|it)(?:\.(?:concurrent|skip|only|failing|todo))*\s*\(\s*(['"`])([\s\S]*?)\1/gm;
var TEST_EACH_RE = /(?:^|[ \t]+)(?:test|it)(?:\.(?:concurrent|skip|only|failing))*\.each\s*(?:\([\s\S]*?\)|`[\s\S]*?`)\s*\(\s*(['"`])([\s\S]*?)\1/gm;
function parseJestSpec(filePath, content, projectRoot) {
  const relativePath = import_path5.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const describeBlocks = findJestDescribeBlocks(content);
  const tests = [];
  for (const match2 of findJestTests(content)) {
    const parentDescribe = resolveParentDescribe(describeBlocks, match2.index);
    const tags = [];
    if (/\.todo\s*\(/.test(match2.raw)) {
      tags.push({ name: "@todo" });
    }
    const isParameterized3 = match2.parameterized || detectParameterizedLoop(content, match2.index) || isLikelyParameterizedTest(match2.name);
    if (isParameterized3) {
      tags.push({ name: "@parameterized" });
    }
    const id = hashId(`${relativePath}::${parentDescribe ?? ""}::${match2.name}`);
    tests.push({
      id,
      name: match2.name,
      fullName: parentDescribe ? `${parentDescribe} > ${match2.name}` : match2.name,
      describe: parentDescribe,
      tags,
      line: lineNumberAt(content, match2.index)
    });
  }
  return {
    id: hashId(relativePath),
    path: relativePath,
    name: import_path5.default.basename(filePath),
    framework: "jest",
    tests,
    testCount: tests.length,
    lastModified: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function extractTestNames4(content) {
  const describeBlocks = findJestDescribeBlocks(content);
  return findJestTests(content).map((test) => {
    const parentDescribe = resolveParentDescribe(describeBlocks, test.index);
    return parentDescribe ? `${parentDescribe} > ${test.name}` : test.name;
  });
}
function findJestDescribeBlocks(content) {
  return [...findDescribeBlocks(content, DESCRIBE_RE4), ...findDescribeEachBlocks(content)].sort(
    (a, b3) => a.start - b3.start
  );
}
function findJestTests(content) {
  const matches = [];
  collectMatches(content, TEST_RE4, false, matches);
  collectMatches(content, TEST_EACH_RE, true, matches);
  return matches.sort((a, b3) => a.index - b3.index);
}
function collectMatches(content, regex, parameterized, matches) {
  let match2;
  regex.lastIndex = 0;
  while ((match2 = regex.exec(content)) !== null) {
    matches.push({
      name: match2[2],
      index: match2.index,
      raw: match2[0],
      parameterized
    });
  }
}
function findDescribeEachBlocks(content) {
  const blocks = [];
  let match2;
  DESCRIBE_EACH_RE.lastIndex = 0;
  while ((match2 = DESCRIBE_EACH_RE.exec(content)) !== null) {
    const matchEnd = match2.index + match2[0].length;
    const afterMatch = content.substring(matchEnd);
    const arrowIndex = afterMatch.indexOf("=>");
    const braceOffset = arrowIndex === -1 ? afterMatch.indexOf("{") : afterMatch.indexOf("{", arrowIndex);
    if (braceOffset === -1) continue;
    const braceStart = matchEnd + braceOffset;
    const braceEnd = findMatchingBrace(content, braceStart);
    if (braceEnd !== -1) {
      blocks.push({ name: match2[2], start: braceStart, end: braceEnd });
    }
  }
  return blocks;
}
var jestParser = {
  parseFile: parseJestSpec,
  extractTestNames: extractTestNames4,
  filePatterns: [
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.test.js",
    "**/*.test.jsx",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "**/*.spec.js",
    "**/*.spec.jsx"
  ],
  supportedFeatures: {
    tags: true,
    describes: true,
    parameterized: true,
    lineNumbers: true,
    asyncTests: true
  }
};

// src/core/frameworks/pytest.ts
init_cjs_shims();
var import_path6 = __toESM(__nccwpck_require__(928));
function parsePytestSpec(filePath, content, projectRoot) {
  const relativePath = import_path6.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const tests = [];
  const lines = content.split("\n");
  const classStack = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const indent = leadingWhitespace(line);
    while (classStack.length > 0 && indent <= classStack[classStack.length - 1].indent) {
      classStack.pop();
    }
    const classMatch = /^\s*class\s+([A-Za-z_]\w*)\b/.exec(line);
    if (classMatch) {
      classStack.push({ name: classMatch[1], indent });
      continue;
    }
    const testMatch = /^\s*(?:async\s+)?def\s+(test_[A-Za-z0-9_]+)\s*\(/.exec(line);
    if (!testMatch) continue;
    const testName = testMatch[1];
    const parentClass = classStack[classStack.length - 1]?.name;
    const decoratorBlock = getDecoratorBlock(lines, i);
    const tags = extractPytestTags(decoratorBlock);
    if (/@pytest\.mark\.parametrize\b/.test(decoratorBlock) && !tags.some((t2) => t2.name === "@parameterized")) {
      tags.push({ name: "@parameterized" });
    }
    const id = hashId(`${relativePath}::${parentClass ?? ""}::${testName}`);
    tests.push({
      id,
      name: testName,
      fullName: parentClass ? `${parentClass} > ${testName}` : testName,
      describe: parentClass,
      tags,
      line: i + 1
    });
  }
  return {
    id: hashId(relativePath),
    path: relativePath,
    name: import_path6.default.basename(filePath),
    framework: "pytest",
    tests,
    testCount: tests.length,
    lastModified: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function extractTestNames5(content) {
  const spec = parsePytestSpec("/__pytest__/test_sample.py", content, "/__pytest__");
  return spec.tests.map((test) => test.fullName);
}
function leadingWhitespace(line) {
  return line.match(/^\s*/)?.[0].length ?? 0;
}
function getDecoratorBlock(lines, functionLine) {
  const contiguous = [];
  for (let i = functionLine - 1; i >= 0; i--) {
    const trimmed = lines[i].trim();
    if (!trimmed) break;
    contiguous.unshift(lines[i]);
  }
  const firstDecorator = contiguous.findIndex((line) => line.trim().startsWith("@"));
  return firstDecorator === -1 ? "" : contiguous.slice(firstDecorator).join("\n");
}
function extractPytestTags(decoratorBlock) {
  const tags = [];
  const seen = /* @__PURE__ */ new Set();
  const markerRe = /@pytest\.mark\.([A-Za-z_]\w*)/g;
  let match2;
  while ((match2 = markerRe.exec(decoratorBlock)) !== null) {
    const marker = match2[1];
    if (marker === "parametrize") continue;
    if (seen.has(marker)) continue;
    seen.add(marker);
    tags.push({ name: marker });
  }
  return tags;
}
var pytestParser = {
  parseFile: parsePytestSpec,
  extractTestNames: extractTestNames5,
  filePatterns: ["**/test_*.py", "**/*_test.py"],
  supportedFeatures: {
    tags: true,
    describes: true,
    parameterized: true,
    lineNumbers: true,
    asyncTests: true
  }
};

// src/core/frameworks/testng.ts
init_cjs_shims();
var import_path7 = __toESM(__nccwpck_require__(928));
var TEST_METHOD_RE = /@Test\s*(?:\([^)]*\))?\s+(?:public\s+)?(?:void|[\w<>]+)\s+(\w+)\s*\(/gm;
var CLASS_DECLARATION_RE = /(?:public\s+)?class\s+(\w+)/;
var ENABLED_RE = /enabled\s*=\s*(false|true)/;
var GROUPS_RE = /groups\s*=\s*(?:\{([^}]+)\}|"([^"]+)")/;
var PARAMETERIZED_RE = /\b(dataProvider|parameters)\s*=/i;
function parseTestNGSpec(filePath, content, projectRoot) {
  const relativePath = import_path7.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const className = extractClassName(content);
  const tests = [];
  let match2;
  TEST_METHOD_RE.lastIndex = 0;
  while ((match2 = TEST_METHOD_RE.exec(content)) !== null) {
    const testName = match2[1];
    const matchIndex = match2.index;
    const line = lineNumberAt(content, matchIndex);
    const annotationText = match2[0];
    const tags = extractTestNGTags(annotationText);
    if (isParameterized(annotationText)) {
      tags.push({ name: "@parameterized" });
    }
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
    name: import_path7.default.basename(filePath),
    framework: "testng",
    tests,
    testCount: tests.length,
    lastModified: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function extractTestNames6(content) {
  const className = extractClassName(content);
  const names = [];
  let match2;
  TEST_METHOD_RE.lastIndex = 0;
  while ((match2 = TEST_METHOD_RE.exec(content)) !== null) {
    const testName = match2[1];
    if (!isTestEnabled(match2[0])) {
      continue;
    }
    names.push(className ? `${className} > ${testName}` : testName);
  }
  return names;
}
function extractClassName(content) {
  const match2 = CLASS_DECLARATION_RE.exec(content);
  return match2 ? match2[1] : void 0;
}
function isTestEnabled(annotationText) {
  const match2 = ENABLED_RE.exec(annotationText);
  if (match2) {
    return match2[1] === "true";
  }
  return true;
}
function extractTestNGTags(annotationText) {
  const tags = [];
  const groupMatch = GROUPS_RE.exec(annotationText);
  if (groupMatch) {
    const groups = (groupMatch[1] ?? groupMatch[2]).split(",").map((g2) => g2.trim().replace(/^"|"$/g, "")).filter((g2) => g2.length > 0);
    groups.forEach((g2) => {
      tags.push({ name: g2 });
    });
  }
  return tags;
}
function isParameterized(annotationText) {
  return PARAMETERIZED_RE.test(annotationText);
}
var testngParser = {
  parseFile: parseTestNGSpec,
  extractTestNames: extractTestNames6,
  filePatterns: ["**/*Test.java", "**/*Tests.java", "**/*TestCase.java"],
  supportedFeatures: {
    tags: true,
    describes: false,
    parameterized: true,
    lineNumbers: true,
    asyncTests: false
  }
};

// src/core/frameworks/junit.ts
init_cjs_shims();
var import_path8 = __toESM(__nccwpck_require__(928));
var TEST_METHOD_RE2 = /@(Test|ParameterizedTest|RepeatedTest)\s*(?:\([^)]*\))?(?:\s*@[\w.]+(?:\([^)]*\))?)*\s+(?:public\s+)?(?:void|[\w<>]+)\s+(\w+)\s*\(/gm;
var CLASS_DECLARATION_RE2 = /(?:public\s+)?class\s+(\w+)/;
var IGNORE_RE = /@Ignore/;
var TAG_RE = /@Tag\s*\(\s*"([^"]+)"\s*\)/g;
var PARAMETERIZED_RE2 = /@(ParameterizedTest|RepeatedTest|ValueSource|EnumSource|CsvSource|CsvFileSource|MethodSource|ArgumentsSource)\b/;
function parseJUnitSpec(filePath, content, projectRoot) {
  const relativePath = import_path8.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const className = extractClassName2(content);
  const tests = [];
  let match2;
  TEST_METHOD_RE2.lastIndex = 0;
  while ((match2 = TEST_METHOD_RE2.exec(content)) !== null) {
    const testName = match2[2];
    const matchIndex = match2.index;
    const line = lineNumberAt(content, matchIndex);
    const prevBracePos = content.lastIndexOf("}", matchIndex - 1);
    const annotationBlockStart = prevBracePos !== -1 ? prevBracePos + 1 : 0;
    const annotationBlock = content.substring(annotationBlockStart, matchIndex) + match2[0];
    if (IGNORE_RE.test(annotationBlock)) {
      continue;
    }
    const tags = extractJUnitTags(annotationBlock);
    if (isParameterized2(annotationBlock, match2[0])) {
      tags.push({ name: "@parameterized" });
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
    name: import_path8.default.basename(filePath),
    framework: "junit",
    tests,
    testCount: tests.length,
    lastModified: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function extractTestNames7(content) {
  const className = extractClassName2(content);
  const names = [];
  let match2;
  TEST_METHOD_RE2.lastIndex = 0;
  while ((match2 = TEST_METHOD_RE2.exec(content)) !== null) {
    const testName = match2[2];
    const matchIndex = match2.index;
    const prevBracePos2 = content.lastIndexOf("}", matchIndex - 1);
    const annotationBlockStart2 = prevBracePos2 !== -1 ? prevBracePos2 + 1 : 0;
    const annotationBlock2 = content.substring(annotationBlockStart2, matchIndex) + match2[0];
    if (IGNORE_RE.test(annotationBlock2)) {
      continue;
    }
    names.push(className ? `${className} > ${testName}` : testName);
  }
  return names;
}
function extractClassName2(content) {
  const match2 = CLASS_DECLARATION_RE2.exec(content);
  return match2 ? match2[1] : void 0;
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
function isParameterized2(annotationBlock, methodText) {
  return PARAMETERIZED_RE2.test(annotationBlock) || PARAMETERIZED_RE2.test(methodText);
}
var junitParser = {
  parseFile: parseJUnitSpec,
  extractTestNames: extractTestNames7,
  filePatterns: ["**/*Test.java", "**/*Tests.java", "**/*TestCase.java"],
  supportedFeatures: {
    tags: true,
    describes: false,
    parameterized: true,
    lineNumbers: true,
    asyncTests: false
  }
};

// src/core/frameworks/cucumber.ts
init_cjs_shims();
var import_path9 = __toESM(__nccwpck_require__(928));
var FEATURE_RE = /^Feature:\s*(.+)/i;
var SCENARIO_RE = /^\s*(?:Scenario|Example):\s*(.+)/i;
var OUTLINE_RE = /^\s*(?:Scenario Outline|Scenario Template):\s*(.+)/i;
var EXAMPLES_RE = /^\s*(?:Examples|Scenarios)\s*:/i;
var TAG_LINE_RE = /^\s*(@\S+(?:\s+@\S+)*)\s*$/;
var DATA_ROW_RE = /^\s*\|/;
function parseCucumberSpec(filePath, content, projectRoot) {
  const relativePath = import_path9.default.relative(projectRoot, filePath).replace(/\\/g, "/");
  const tests = [];
  const lines = content.split("\n");
  let featureName;
  let featureTags = [];
  let pendingTags = [];
  let currentOutlineName;
  let currentOutlineTags = [];
  let currentOutlineLine = 0;
  let inOutline = false;
  let inExamplesBlock = false;
  let examplesHeaderSeen = false;
  let outlineRows = [];
  const flushOutline = () => {
    if (!currentOutlineName || !inOutline) return;
    const rowCount = outlineRows.length;
    if (rowCount === 0) {
      const id = hashId(`${relativePath}::${featureName ?? ""}::${currentOutlineName}`);
      const fullName = featureName ? `${featureName} > ${currentOutlineName}` : currentOutlineName;
      tests.push({
        id,
        name: currentOutlineName,
        fullName,
        describe: featureName,
        tags: currentOutlineTags.map((t2) => ({ name: t2 })),
        line: currentOutlineLine
      });
    } else {
      for (let i = 0; i < rowCount; i++) {
        const name = generateParameterizedTestName(currentOutlineName, i, rowCount);
        const id = hashId(`${relativePath}::${featureName ?? ""}::${name}`);
        const fullName = featureName ? `${featureName} > ${name}` : name;
        tests.push({
          id,
          name,
          fullName,
          describe: featureName,
          tags: currentOutlineTags.map((t2) => ({ name: t2 })),
          line: outlineRows[i]
        });
      }
    }
    inOutline = false;
    inExamplesBlock = false;
    examplesHeaderSeen = false;
    outlineRows = [];
    currentOutlineName = void 0;
    currentOutlineTags = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    const tagMatch = TAG_LINE_RE.exec(rawLine);
    if (tagMatch) {
      const tokens = tagMatch[1].trim().split(/\s+/).filter((t2) => t2.startsWith("@"));
      pendingTags.push(...tokens);
      continue;
    }
    const featureMatch = FEATURE_RE.exec(trimmed);
    if (featureMatch) {
      flushOutline();
      featureName = featureMatch[1].trim();
      featureTags = [...pendingTags];
      pendingTags = [];
      continue;
    }
    const outlineMatch = OUTLINE_RE.exec(trimmed);
    if (outlineMatch) {
      flushOutline();
      currentOutlineName = outlineMatch[1].trim();
      currentOutlineTags = [...featureTags, ...pendingTags];
      currentOutlineLine = i + 1;
      inOutline = true;
      inExamplesBlock = false;
      examplesHeaderSeen = false;
      outlineRows = [];
      pendingTags = [];
      continue;
    }
    if (inOutline && EXAMPLES_RE.test(trimmed)) {
      currentOutlineTags = [...currentOutlineTags, ...pendingTags];
      pendingTags = [];
      inExamplesBlock = true;
      examplesHeaderSeen = false;
      continue;
    }
    if (inOutline && inExamplesBlock && DATA_ROW_RE.test(rawLine)) {
      if (!examplesHeaderSeen) {
        examplesHeaderSeen = true;
      } else {
        outlineRows.push(i + 1);
      }
      continue;
    }
    const scenarioMatch = SCENARIO_RE.exec(trimmed);
    if (scenarioMatch) {
      flushOutline();
      const name = scenarioMatch[1].trim();
      const mergedTags = [...featureTags, ...pendingTags];
      const id = hashId(`${relativePath}::${featureName ?? ""}::${name}`);
      const fullName = featureName ? `${featureName} > ${name}` : name;
      const line = i + 1;
      tests.push({
        id,
        name,
        fullName,
        describe: featureName,
        tags: mergedTags.map((t2) => ({ name: t2 })),
        line
      });
      pendingTags = [];
      continue;
    }
    if (trimmed.length > 0 && !trimmed.startsWith("#")) {
      pendingTags = [];
    }
  }
  flushOutline();
  return {
    id: hashId(relativePath),
    path: relativePath,
    name: import_path9.default.basename(filePath),
    framework: "cucumber",
    tests,
    testCount: tests.length,
    lastModified: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function extractTestNames8(content) {
  const lines = content.split("\n");
  const names = [];
  let featureName;
  let pendingTags = [];
  let inOutline = false;
  let outlineName;
  let inExamplesBlock = false;
  let examplesHeaderSeen = false;
  let rowCount = 0;
  const flushOutline = () => {
    if (!outlineName) return;
    if (rowCount === 0) {
      names.push(featureName ? `${featureName} > ${outlineName}` : outlineName);
    } else {
      for (let i = 0; i < rowCount; i++) {
        const name = generateParameterizedTestName(outlineName, i, rowCount);
        names.push(featureName ? `${featureName} > ${name}` : name);
      }
    }
    inOutline = false;
    inExamplesBlock = false;
    examplesHeaderSeen = false;
    rowCount = 0;
    outlineName = void 0;
  };
  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (TAG_LINE_RE.test(rawLine)) {
      pendingTags.push(
        ...rawLine.trim().split(/\s+/).filter((t2) => t2.startsWith("@"))
      );
      continue;
    }
    const featureMatch = FEATURE_RE.exec(trimmed);
    if (featureMatch) {
      flushOutline();
      featureName = featureMatch[1].trim();
      pendingTags = [];
      continue;
    }
    const outlineMatch = OUTLINE_RE.exec(trimmed);
    if (outlineMatch) {
      flushOutline();
      outlineName = outlineMatch[1].trim();
      inOutline = true;
      inExamplesBlock = false;
      examplesHeaderSeen = false;
      rowCount = 0;
      pendingTags = [];
      continue;
    }
    if (inOutline && EXAMPLES_RE.test(trimmed)) {
      pendingTags = [];
      inExamplesBlock = true;
      examplesHeaderSeen = false;
      continue;
    }
    if (inOutline && inExamplesBlock && DATA_ROW_RE.test(rawLine)) {
      if (!examplesHeaderSeen) {
        examplesHeaderSeen = true;
      } else {
        rowCount++;
      }
      continue;
    }
    const scenarioMatch = SCENARIO_RE.exec(trimmed);
    if (scenarioMatch) {
      flushOutline();
      const name = scenarioMatch[1].trim();
      names.push(featureName ? `${featureName} > ${name}` : name);
      pendingTags = [];
      continue;
    }
    if (trimmed.length > 0 && !trimmed.startsWith("#")) {
      pendingTags = [];
    }
  }
  flushOutline();
  return names;
}
var cucumberParser = {
  parseFile: parseCucumberSpec,
  extractTestNames: extractTestNames8,
  filePatterns: ["**/*.feature"],
  supportedFeatures: {
    tags: true,
    describes: true,
    parameterized: true,
    lineNumbers: true,
    asyncTests: false
  }
};

// src/core/pathPatterns.ts
init_cjs_shims();
var import_path10 = __toESM(__nccwpck_require__(928));
var GLOB_MAGIC_RE = /[*?[\]{}()!+@]/;
function normaliseRepoPath(input) {
  const normalised = input.trim().replace(/\\/g, "/").replace(/^\.\//, "").replace(/\/+$/, "");
  return normalised || ".";
}
function hasPathPatternMagic(input) {
  return GLOB_MAGIC_RE.test(normaliseRepoPath(input));
}
function patternToFileGlob(input) {
  const pattern = normaliseRepoPath(input);
  return pattern === "." ? "**" : `${pattern}/**`;
}
function matchesDirectoryPattern(filePath, pattern) {
  const normalisedFile = normaliseRepoPath(filePath);
  const normalisedPattern = normaliseRepoPath(pattern);
  if (normalisedPattern === ".") return true;
  if (hasPathPatternMagic(normalisedPattern)) {
    return minimatch(normalisedFile, patternToFileGlob(normalisedPattern), { dot: true });
  }
  const withSlash = normalisedPattern.endsWith("/") ? normalisedPattern : `${normalisedPattern}/`;
  return normalisedFile.startsWith(withSlash) || import_path10.default.posix.dirname(normalisedFile) === normalisedPattern;
}
function pathPatternSpecificity(pattern) {
  return normaliseRepoPath(pattern).replace(/[*!?[\]{}()@+]/g, "").length;
}
function pathPatternRoot(input) {
  const pattern = normaliseRepoPath(input);
  if (pattern === ".") return ".";
  const parts = pattern.split("/");
  const staticParts = [];
  for (const part of parts) {
    if (GLOB_MAGIC_RE.test(part)) break;
    staticParts.push(part);
  }
  if (staticParts.length === 0) return null;
  return staticParts.join("/");
}

// src/core/parser.ts
var PARSERS = {
  playwright: playwrightParser,
  cypress: cypressParser,
  vitest: vitestParser,
  jest: jestParser,
  pytest: pytestParser,
  testng: testngParser,
  junit: junitParser,
  cucumber: cucumberParser
};
function getParser(framework) {
  if (framework === "unknown") return null;
  return PARSERS[framework];
}
function parseSpecFile(filePath, content, projectRoot, framework) {
  const parser = getParser(framework);
  if (!parser) throw new Error(`Cannot parse spec for unresolved framework 'unknown'`);
  const spec = parser.parseFile(filePath, content, projectRoot);
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
  const parser = getParser(framework);
  if (!parser) return [];
  const spec = parser.parseFile(dummyPath, content, dummyRoot);
  return spec.tests.map((t2) => ({ name: t2.fullName, line: t2.line }));
}
function findSpecFiles(projectRoot, testDir, framework) {
  const parser = getParser(framework);
  if (!parser) return [];
  const normalisedTestDir = normaliseRepoPath(testDir);
  if (hasPathPatternMagic(normalisedTestDir)) {
    const filePatterns = parser.filePatterns.map((pattern) => `${normalisedTestDir}/${pattern}`);
    return ts(filePatterns, {
      cwd: projectRoot,
      absolute: true,
      nodir: true,
      ignore: ["**/node_modules/**"]
    });
  }
  const baseDir = import_path11.default.resolve(projectRoot, normalisedTestDir);
  return ts(parser.filePatterns, {
    cwd: baseDir,
    absolute: true,
    nodir: true,
    ignore: ["**/node_modules/**"]
  });
}
function isFrameworkSpecFile(filePath, framework) {
  const parser = getParser(framework);
  if (!parser) return false;
  const normalised = filePath.replace(/\\/g, "/");
  return parser.filePatterns.some(
    (pattern) => minimatch(normalised, pattern) || minimatch(import_path11.default.basename(normalised), pattern)
  );
}
function parseAllSpecs(projectRoot, frameworkConfigs) {
  const seen = /* @__PURE__ */ new Set();
  const allSpecs = [];
  const sorted = [...frameworkConfigs].sort(
    (a, b3) => pathPatternSpecificity(b3.testDir) - pathPatternSpecificity(a.testDir)
  );
  for (const { framework, testDir } of sorted) {
    if (framework === "unknown") continue;
    const files = findSpecFiles(projectRoot, testDir, framework);
    for (const filePath of files) {
      try {
        if (!(0, import_fs3.statSync)(filePath).isFile()) continue;
      } catch {
        continue;
      }
      const normalized = import_path11.default.normalize(filePath);
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
function levenshteinDistance(a, b3) {
  const matrix = Array(b3.length + 1).fill(null).map(() => Array(a.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j4 = 0; j4 <= b3.length; j4++) matrix[j4][0] = j4;
  for (let j4 = 1; j4 <= b3.length; j4++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b3[j4 - 1] ? 0 : 1;
      matrix[j4][i] = Math.min(
        matrix[j4][i - 1] + 1,
        // deletion
        matrix[j4 - 1][i] + 1,
        // insertion
        matrix[j4 - 1][i - 1] + cost
        // substitution
      );
    }
  }
  return matrix[b3.length][a.length];
}
function normalizeTestName(name) {
  return name.toLowerCase().replace(/[_\-\s]+/g, " ").trim();
}
function calculateSimilarity(a, b3) {
  const normA = normalizeTestName(a);
  const normB = normalizeTestName(b3);
  if (normA === normB) return 1;
  const distance = levenshteinDistance(normA, normB);
  const maxLength = Math.max(normA.length, normB.length);
  if (maxLength === 0) return 1;
  return 1 - distance / maxLength;
}
function isSameTest(a, b3) {
  const similarity = calculateSimilarity(a, b3);
  return similarity > RENAME_SIMILARITY_THRESHOLD;
}

// src/git/index.ts
init_cjs_shims();

// src/git/history.ts
init_cjs_shims();

// node_modules/.pnpm/simple-git@4.0.2/node_modules/simple-git/dist/index.mjs
init_cjs_shims();

// node_modules/.pnpm/@simple-git+args-pathspec@1.0.4/node_modules/@simple-git/args-pathspec/dist/index.mjs
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

// node_modules/.pnpm/simple-git@4.0.2/node_modules/simple-git/dist/index.mjs
var import_file_exists = __toESM(require_dist(), 1);
var import_node_child_process = __nccwpck_require__(317);
var import_debug = __toESM(require_src(), 1);
var import_promise_deferred = __toESM(require_dist2(), 1);
var import_node_path2 = __nccwpck_require__(928);

// node_modules/.pnpm/@simple-git+argv-parser@2.0.1/node_modules/@simple-git/argv-parser/dist/index.mjs
init_cjs_shims();
function* x2(e, n5) {
  const t2 = n5 === "global";
  for (const o2 of e)
    o2.isGlobal === t2 && (yield o2);
}
var P2 = /* @__PURE__ */ new Set([
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
var E = /* @__PURE__ */ new Set([
  "edit",
  "remove-section",
  "rename-section",
  "set",
  "unset"
]);
var F2 = /* @__PURE__ */ new Set(["get", "get-color", "get-colorbool", "list"]);
function A2(e, n5) {
  for (const { name: o2 } of x2(e, "task")) {
    if (P2.has(o2))
      return w(true, n5);
    if (S.has(o2))
      return w(false, n5);
  }
  const t2 = n5.at(0)?.toLowerCase();
  return t2 === void 0 ? null : E.has(t2) ? w(true, n5.slice(1)) : F2.has(t2) ? w(false, n5.slice(1)) : n5.length === 1 ? w(false, n5) : w(true, n5);
}
function w(e = false, n5 = []) {
  const t2 = n5.at(0)?.toLowerCase();
  return t2 === void 0 ? null : {
    isWrite: e,
    isRead: !e,
    key: t2,
    value: n5.at(1)
  };
}
function O2(e, n5) {
  return n5.isWrite && n5.value !== void 0 ? { key: n5.key, value: n5.value, scope: e } : { key: n5.key, scope: e };
}
function G2(e) {
  const n5 = e?.indexOf("=") || -1;
  return !e || n5 < 0 ? null : {
    key: e.slice(0, n5).trim().toLowerCase(),
    value: e.slice(n5 + 1)
  };
}
function M2(e) {
  for (const { name: n5 } of x2(e, "task"))
    switch (n5) {
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
function N2({ name: e }) {
  if (e === "-c" || e === "--config")
    return "inline";
  if (e === "--config-env")
    return "env";
}
function* $(e) {
  for (const n5 of e) {
    const t2 = N2(n5), o2 = t2 && G2(n5.value);
    o2 && (yield {
      ...o2,
      scope: t2
    });
  }
}
function D2(e, n5, t2) {
  const o2 = {
    read: [],
    write: [...$(n5)]
  };
  return e === "config" && L2(
    o2,
    M2(n5),
    A2(n5, t2)
  ), o2;
}
function L2(e, n5, t2) {
  if (t2 === null)
    return;
  const o2 = O2(n5, t2);
  t2.isWrite ? e.write.push(o2) : e.read.push(o2);
}
var C2 = {
  short: /* @__PURE__ */ new Map([
    ["c", true]
    //  -c <k=v>    set config key for this invocation
  ])
};
var I2 = {
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
    ...C2.short.entries()
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
  },
  rebase: {
    short: /* @__PURE__ */ new Map([
      ["X", true],
      // -X <option>   strategy option
      ["f", false],
      // -f force-rebase
      ["i", false],
      // -i interactive
      ["k", false],
      // -k keep-base
      ["m", false],
      // -m merge
      ["n", false],
      // -n no-stat
      ["q", false],
      // -q quiet
      ["r", false],
      // -r rebase-merges
      ["s", true],
      // -s <strategy>
      ["v", false],
      // -v verbose
      ["x", true]
      // -x <cmd>      exec
    ]),
    long: /* @__PURE__ */ new Set(["exec", "onto", "strategy", "strategy-option"])
  }
};
var T2 = { short: /* @__PURE__ */ new Map(), long: /* @__PURE__ */ new Set() };
function B2(e) {
  const n5 = R2[e ?? ""] ?? T2;
  return {
    short: new Map([...C2.short.entries(), ...n5.short.entries()]),
    long: n5.long
  };
}
function b(e, n5 = I2) {
  if (e.startsWith("--")) {
    const t2 = e.indexOf("=");
    if (t2 > 2)
      return [{ name: e.slice(0, t2), value: e.slice(t2 + 1), needsNext: false }];
    const o2 = e.slice(2);
    return [{ name: e, needsNext: n5.long.has(o2) }];
  }
  if (e.length === 2) {
    const t2 = e.charAt(1), o2 = n5.short.get(t2);
    return [{ name: e, needsNext: o2 === true }];
  }
  return j2(e, n5.short);
}
function j2(e, n5) {
  const t2 = e.slice(1).split(""), o2 = [];
  for (let a = 0; a < t2.length; a++) {
    const s = t2[a], r2 = n5.get(s);
    if (r2 === void 0)
      return [{ name: e, needsNext: false }];
    if (r2) {
      const i = t2.slice(a + 1).join("");
      if (i && ![...i].every((m2) => n5.has(m2)))
        return o2.push({ name: `-${s}`, value: i, needsNext: false }), o2;
    }
    o2.push({ name: `-${s}`, needsNext: r2 });
  }
  return o2;
}
function W2(e, n5 = []) {
  let t2 = 0;
  for (; t2 < e.length; ) {
    const o2 = String(e[t2]);
    if (!o2.startsWith("-") || o2.length < 2) break;
    const a = b(o2);
    let s = t2 + 1;
    for (const r2 of a) {
      const i = {
        name: r2.name,
        value: r2.value,
        absorbedNext: false,
        isGlobal: true
      };
      r2.needsNext && i.value === void 0 && s < e.length && (i.value = String(e[s]), i.absorbedNext = true, s++), n5.push(i);
    }
    t2 = s;
  }
  return { flags: n5, taskIndex: t2 };
}
function V2(e, n5, t2 = []) {
  const o2 = B2(n5), a = [], s = [];
  let r2 = 0;
  for (; r2 < e.length; ) {
    const i = e[r2];
    if (r(i)) {
      s.push(...o(i)), r2++;
      continue;
    }
    const p2 = String(i);
    if (p2 === "--") {
      for (let d2 = r2 + 1; d2 < e.length; d2++) {
        const g2 = e[d2];
        r(g2) ? s.push(...o(g2)) : s.push(String(g2));
      }
      break;
    }
    if (!p2.startsWith("-") || p2.length < 2) {
      a.push(p2), r2++;
      continue;
    }
    const m2 = b(p2, o2);
    let u2 = r2 + 1;
    for (const d2 of m2) {
      const g2 = {
        name: d2.name,
        value: d2.value,
        absorbedNext: false,
        isGlobal: false
      };
      d2.needsNext && g2.value === void 0 && u2 < e.length && !r(e[u2]) && (g2.value = String(e[u2]), g2.absorbedNext = true, u2++), t2.push(g2);
    }
    r2 = u2;
  }
  return { flags: t2, positionals: a, pathspecs: s };
}
function* q2({
  write: e
}) {
  for (const n5 of e)
    for (const t2 of K2) {
      const o2 = t2(n5.key);
      o2 && (yield o2);
    }
}
function f(e, n5, t2 = String(e)) {
  const o2 = typeof e == "string" ? new RegExp(`\\s*${e.toLowerCase()}`) : e;
  return function(s) {
    if (o2.test(s))
      return {
        category: n5,
        message: `Configuring ${t2} is not permitted without enabling ${n5}`
      };
  };
}
function l(e, n5) {
  const t2 = new RegExp(`\\s*${e.toLowerCase().replace(/\./g, "(..+)?.")}`);
  return f(t2, n5, e);
}
var K2 = [
  f("alias", "allowUnsafeAlias"),
  f("core.askPass", "allowUnsafeAskPass"),
  f("core.editor", "allowUnsafeEditor"),
  f("core.fsmonitor", "allowUnsafeFsMonitor"),
  f("core.gitProxy", "allowUnsafeGitProxy"),
  f("core.hooksPath", "allowUnsafeHooksPath"),
  f("core.pager", "allowUnsafePager"),
  f("core.sshCommand", "allowUnsafeSshCommand"),
  l("credential.helper", "allowUnsafeCredentialHelper"),
  l("diff.command", "allowUnsafeDiffExternal"),
  f("diff.external", "allowUnsafeDiffExternal"),
  l("difftool.cmd", "allowUnsafeDiffExternal"),
  l("diff.textconv", "allowUnsafeDiffTextConv"),
  l("filter.clean", "allowUnsafeFilter"),
  l("filter.process", "allowUnsafeFilter"),
  l("filter.smudge", "allowUnsafeFilter"),
  l("gpg.program", "allowUnsafeGpgProgram"),
  f("include.path", "allowUnsafeInclude"),
  l("includeIf", "allowUnsafeInclude"),
  f("init.templateDir", "allowUnsafeTemplateDir"),
  l("pager.", "allowUnsafePager"),
  l("merge.driver", "allowUnsafeMergeDriver"),
  l("mergetool.path", "allowUnsafeMergeDriver"),
  l("mergetool.cmd", "allowUnsafeMergeDriver"),
  l("protocol.allow", "allowUnsafeProtocolOverride"),
  l("remote.receivepack", "allowUnsafePack"),
  l("remote.uploadpack", "allowUnsafePack"),
  f("uploadpack.packObjectsHook", "allowUnsafePack"),
  f("sequence.editor", "allowUnsafeEditor"),
  l("submodule.update", "allowUnsafeSubmodule"),
  l("tar.command", "allowUnsafeCommandBinaries"),
  l("trailer.cmd", "allowUnsafeCommandBinaries"),
  l("trailer.command", "allowUnsafeCommandBinaries"),
  l("url.insteadOf", "allowUnsafeUrlRewrite")
];
function* H2(e, n5) {
  for (const t2 of n5)
    for (const o2 of X2) {
      const a = o2(e, t2);
      a && (yield a);
    }
}
function c2(e, n5, t2, { name: o2 = String(n5), globalOnly: a = false, withValue: s = false } = {}) {
  const r2 = typeof n5 == "string" ? new RegExp(`\\s*${n5.toLowerCase()}`) : n5, i = `Use of ${e ? `${e} with option ` : ""}${o2} is not permitted without enabling ${t2}`;
  return function(m2, u2) {
    if (!(e && m2 !== e) && !(a && !u2.isGlobal) && !(s && u2.value === void 0) && r2.test(u2.name))
      return {
        category: t2,
        message: i
      };
  };
}
var h = { globalOnly: true, withValue: true };
var X2 = [
  c2(null, /--(upload|receive)-pack/, "allowUnsafePack", {
    name: "--upload-pack or --receive-pack"
  }),
  c2("clone", /^-\w*u/, "allowUnsafePack"),
  c2("clone", "--u", "allowUnsafePack"),
  c2("push", /^--exec$/, "allowUnsafePack", { name: "--exec" }),
  // `git` accepts unambiguous abbreviations of long options, so `--ex` and `--exe` are `--exec`
  c2("rebase", /^(-x|--ex(ec?)?)$/, "allowUnsafeExec", { name: "-x or --exec" }),
  c2(null, "--template", "allowUnsafeTemplateDir"),
  c2(null, "--exec-path", "allowUnsafeExec", h),
  // `git` reads the configuration of whichever repository these name, so the
  // directory alone is enough to deliver config the argv guards never see
  c2(null, "--git-dir", "allowUnsafeConfigPaths", h),
  c2(null, "--work-tree", "allowUnsafeConfigPaths", h),
  c2(null, /^-C$/, "allowUnsafeConfigPaths", { ...h, name: "-C" })
];
function k2(e, n5, t2) {
  return [...H2(e, n5), ...q2(t2)];
}
function Y2(...e) {
  const { flags: n5, taskIndex: t2 } = W2(e), o2 = t2 < e.length ? String(e[t2]).toLowerCase() : null, a = o2 !== null ? e.slice(t2 + 1) : [], { positionals: s, pathspecs: r2 } = V2(a, o2, n5), i = D2(o2, n5, s);
  return {
    task: o2,
    flags: n5.map(J),
    paths: r2,
    config: i,
    vulnerabilities: z(k2(o2, n5, i))
  };
}
function z(e) {
  return Object.defineProperty(e, "vulnerabilities", {
    value: e
  });
}
function J({ value: e, name: n5 }) {
  return e !== void 0 ? { name: n5, value: e } : { name: n5 };
}
var y = {
  editor: "allowUnsafeEditor",
  git_askpass: "allowUnsafeAskPass",
  git_config_global: "allowUnsafeConfigPaths",
  git_config_system: "allowUnsafeConfigPaths",
  git_config_count: "allowUnsafeConfigEnvCount",
  git_config_parameters: "allowUnsafeConfigEnvCount",
  git_config: "allowUnsafeConfigPaths",
  git_editor: "allowUnsafeEditor",
  git_exec_path: "allowUnsafeExec",
  git_external_diff: "allowUnsafeDiffExternal",
  git_pager: "allowUnsafePager",
  git_proxy_command: "allowUnsafeGitProxy",
  git_template_dir: "allowUnsafeTemplateDir",
  git_sequence_editor: "allowUnsafeEditor",
  git_ssh: "allowUnsafeSshCommand",
  git_ssh_command: "allowUnsafeSshCommand",
  pager: "allowUnsafePager",
  prefix: "allowUnsafeConfigPaths",
  ssh_askpass: "allowUnsafeAskPass",
  visual: "allowUnsafeEditor"
};
function* Q2(e) {
  const n5 = parseInt(e.git_config_count ?? "0", 10);
  for (let t2 = 0; t2 < n5; t2++) {
    const o2 = e[`git_config_key_${t2}`], a = e[`git_config_value_${t2}`];
    o2 !== void 0 && (yield { key: o2.toLowerCase().trim(), value: a, scope: "env" });
  }
}
function* Z(e) {
  for (const n5 of Object.keys(e))
    if (_2(n5)) {
      const t2 = y[n5];
      yield {
        category: t2,
        message: `Use of "${n5.toUpperCase()}" is not permitted without enabling ${t2}`
      };
    }
}
function _2(e) {
  return Object.hasOwn(y, e);
}
function ee2(e) {
  const n5 = {};
  for (const [t2, o2] of Object.entries(e)) {
    const a = t2.toLowerCase().trim();
    (_2(a) || a.startsWith("git")) && (n5[a] = String(o2));
  }
  return n5;
}
function ne2(e) {
  const n5 = ee2(e), t2 = {
    read: [],
    write: [...Q2(n5)]
  }, o2 = [
    ...Z(n5),
    ...k2(null, [], t2)
  ];
  return {
    config: t2,
    vulnerabilities: o2
  };
}
function oe2(e, n5) {
  return [...Y2(...e).vulnerabilities, ...ne2(n5).vulnerabilities];
}

// node_modules/.pnpm/simple-git@4.0.2/node_modules/simple-git/dist/index.mjs
var import_node_events2 = __nccwpck_require__(434);
var O3 = class extends Error {
  constructor(e, n5) {
    super(n5), this.task = e, Object.setPrototypeOf(this, new.target.prototype);
  }
};
var Ae2 = class extends O3 {
  constructor(e, n5) {
    super(void 0, n5), this.config = e;
  }
};
var A3 = class extends O3 {
  constructor(e, n5, r2) {
    super(e, r2), this.task = e, this.plugin = n5, Object.setPrototypeOf(this, new.target.prototype);
  }
};
var at2 = class extends O3 {
  constructor(e, n5) {
    super(void 0, n5 || String(e)), this.git = e;
  }
};
var xe2 = class extends O3 {
  constructor(e) {
    super(void 0, e);
  }
};
var I3 = "\0";
var W3 = () => {
};
function Ne2(t2) {
  return typeof t2 != "function" ? W3 : t2;
}
function $e2(t2) {
  return typeof t2 == "function" && t2 !== W3;
}
function Pe2(t2, e) {
  const n5 = t2.indexOf(e);
  return n5 <= 0 ? [t2, ""] : [t2.substr(0, n5), t2.substr(n5 + 1)];
}
function Me(t2, e = 0) {
  return Dt2(t2) && t2.length > e ? t2[e] : void 0;
}
function N3(t2, e = 0) {
  if (Dt2(t2) && t2.length > e)
    return t2[t2.length - 1 - e];
}
function Dt2(t2) {
  return Bt2(t2);
}
function H3(t2 = "", e = true, n5 = `
`) {
  return t2.split(n5).reduce((r2, s) => {
    const o2 = e ? s.trim() : s;
    return o2 && r2.push(o2), r2;
  }, []);
}
function ut2(t2, e) {
  return H3(t2, true).map((n5) => e(n5));
}
function Lt2(t2) {
  return (0, import_file_exists.exists)(t2, import_file_exists.FOLDER);
}
function S2(t2, e) {
  return Array.isArray(t2) ? t2.includes(e) || t2.push(e) : t2.add(e), e;
}
function De2(t2, e) {
  return Array.isArray(t2) && !t2.includes(e) && t2.push(e), t2;
}
function ct(t2, e) {
  if (Array.isArray(t2)) {
    const n5 = t2.indexOf(e);
    n5 >= 0 && t2.splice(n5, 1);
  } else
    t2.delete(e);
  return e;
}
var ft2 = Object.prototype.toString.call.bind(Object.prototype.toString);
function v2(t2) {
  return Array.isArray(t2) ? t2 : [t2];
}
function jt2(t2) {
  return t2.replace(/[\s-]+(.)/g, (e, n5) => n5.toUpperCase());
}
function L3(t2) {
  return v2(t2).map((e) => e instanceof String ? e : String(e));
}
function p(t2, e = 0) {
  if (t2 == null)
    return e;
  const n5 = parseInt(t2, 10);
  return Number.isNaN(n5) ? e : n5;
}
function U2(t2, e) {
  const n5 = [];
  for (let r2 = 0, s = t2.length; r2 < s; r2++)
    n5.push(e, t2[r2]);
  return n5;
}
function F3(t2) {
  return (Array.isArray(t2) ? Buffer.concat(t2) : t2).toString("utf-8");
}
function Le2(t2) {
  return t2 ? Buffer.isBuffer(t2) ? t2.length : Buffer.byteLength(t2) : 0;
}
function je2(t2, e) {
  const n5 = {};
  return e.forEach((r2) => {
    t2[r2] !== void 0 && (n5[r2] = t2[r2]);
  }), n5;
}
function wt2(t2 = 0) {
  return new Promise((e) => setTimeout(e, t2));
}
function bt2(t2) {
  if (t2 !== false)
    return t2;
}
function d(t2, e, n5) {
  return e(t2) ? t2 : arguments.length > 2 ? n5 : void 0;
}
var K3 = (t2) => Array.isArray(t2);
function st2(t2, e) {
  const n5 = r(t2) ? "string" : typeof t2;
  return /number|string|boolean/.test(n5) && (!e || !e.includes(n5));
}
var m = (t2) => typeof t2 == "string" || r(t2);
var Be2 = (t2) => m(t2) || Buffer.isBuffer(t2);
var G3 = (t2) => m(t2) || Array.isArray(t2) && t2.every(m);
function lt2(t2) {
  return !!t2 && ft2(t2) === "[object Object]";
}
function Ie2(t2) {
  return typeof t2 == "function";
}
var Bt2 = (t2) => t2 == null || "number|boolean|function".includes(typeof t2) ? false : typeof t2.length == "number";
var V3 = /* @__PURE__ */ ((t2) => (t2[t2.SUCCESS = 0] = "SUCCESS", t2[t2.ERROR = 1] = "ERROR", t2[t2.NOT_FOUND = -2] = "NOT_FOUND", t2[t2.UNCLEAN = 128] = "UNCLEAN", t2))(V3 || {});
var z2 = class _z {
  constructor(e, n5) {
    this.stdOut = e, this.stdErr = n5;
  }
  asStrings() {
    return new _z(this.stdOut.toString("utf8"), this.stdErr.toString("utf8"));
  }
};
function Ue2() {
  throw new Error("LineParser:useMatches not implemented");
}
var l2 = class {
  constructor(e, n5) {
    this.matches = [], this.useMatches = Ue2, this.parse = (r2, s) => (this.resetMatches(), this._regExp.every((o2, i) => this.addMatch(o2, i, r2(i))) ? this.useMatches(s, this.prepareMatches()) !== false : false), this._regExp = Array.isArray(e) ? e : [e], n5 && (this.useMatches = n5);
  }
  resetMatches() {
    this.matches.length = 0;
  }
  prepareMatches() {
    return this.matches;
  }
  addMatch(e, n5, r2) {
    const s = r2 && e.exec(r2);
    return s && this.pushMatch(n5, s), !!s;
  }
  pushMatch(e, n5) {
    this.matches.push(...n5.slice(1));
  }
};
var x3 = class extends l2 {
  addMatch(e, n5, r2) {
    return /^remote:\s/.test(String(r2)) && super.addMatch(e, n5, r2);
  }
  pushMatch(e, n5) {
    (e > 0 || n5.length > 1) && super.pushMatch(e, n5);
  }
};
var Fe2 = {
  binary: "git",
  maxConcurrentProcesses: 5,
  config: [],
  trimmed: false
};
function Ge2(...t2) {
  const e = process.cwd(), n5 = Object.assign(
    { baseDir: e, ...Fe2 },
    ...t2.filter((r2) => typeof r2 == "object" && r2)
  );
  return n5.baseDir = n5.baseDir || e, n5.trimmed = n5.trimmed === true, n5;
}
function It2(t2, e = []) {
  return lt2(t2) ? Object.keys(t2).reduce((n5, r2) => {
    const s = t2[r2];
    if (r(s))
      n5.push(s);
    else if (st2(s, ["boolean"]))
      n5.push(r2 + "=" + s);
    else if (Array.isArray(s))
      for (const o2 of s)
        st2(o2, ["string", "number"]) || n5.push(r2 + "=" + o2);
    else
      n5.push(r2);
    return n5;
  }, e) : e;
}
function h2(t2, e = 0, n5 = false) {
  const r2 = [];
  for (let s = 0, o2 = e < 0 ? t2.length : e; s < o2; s++)
    "string|number".includes(typeof t2[s]) && r2.push(String(t2[s]));
  return It2(ht2(t2), r2), n5 || r2.push(...ze2(t2)), r2;
}
function ze2(t2) {
  const e = typeof N3(t2) == "function";
  return L3(d(N3(t2, e ? 1 : 0), K3, []));
}
function ht2(t2) {
  const e = Ie2(N3(t2));
  return d(N3(t2, e ? 1 : 0), lt2);
}
function u(t2, e = true) {
  const n5 = Ne2(N3(t2));
  return e || $e2(n5) ? n5 : void 0;
}
function Tt2(t2, e) {
  return t2(e.stdOut, e.stdErr);
}
function E2(t2, e, n5, r2 = true) {
  return v2(n5).forEach((s) => {
    for (let o2 = H3(s, r2), i = 0, a = o2.length; i < a; i++) {
      const c3 = (y2 = 0) => {
        if (!(i + y2 >= a))
          return o2[i + y2];
      };
      e.some(({ parse: y2 }) => y2(c3, t2));
    }
  }), t2;
}
var mt2 = ({ exitCode: t2 }, e, n5, r2) => {
  if (t2 === V3.UNCLEAN && Ve2(e))
    return n5(Buffer.from("false"));
  r2(e);
};
var Ut2 = (t2) => t2.trim() === "true";
function We2(t2) {
  switch (t2) {
    case "bare":
      return Ke2();
    case "root":
      return He2();
  }
  return {
    commands: ["rev-parse", "--is-inside-work-tree"],
    format: "utf-8",
    onError: mt2,
    parser: Ut2
  };
}
function He2() {
  return {
    commands: ["rev-parse", "--git-dir"],
    format: "utf-8",
    onError: mt2,
    parser(e) {
      return /^\.(git)?$/.test(e.trim());
    }
  };
}
function Ke2() {
  return {
    commands: ["rev-parse", "--is-bare-repository"],
    format: "utf-8",
    onError: mt2,
    parser: Ut2
  };
}
function Ve2(t2) {
  return /(Not a git repository|Kein Git-Repository)/i.test(String(t2));
}
var Xe2 = class {
  constructor(e) {
    this.paths = [], this.files = [], this.folders = [], this.dryRun = e;
  }
};
var Ye2 = /^[a-z]+\s*/i;
var Qe2 = /^[a-z]+\s+[a-z]+\s*/i;
var Je2 = /\/$/;
function Ze2(t2, e) {
  const n5 = new Xe2(t2), r2 = t2 ? Qe2 : Ye2;
  return H3(e).forEach((s) => {
    const o2 = s.replace(r2, "");
    n5.paths.push(o2), (Je2.test(o2) ? n5.folders : n5.files).push(o2);
  }), n5;
}
var Ft2 = [];
function tn(t2) {
  return {
    commands: Ft2,
    format: "empty",
    parser: t2
  };
}
function b2(t2) {
  return {
    commands: Ft2,
    format: "empty",
    parser() {
      throw typeof t2 == "string" ? new xe2(t2) : t2;
    }
  };
}
function g(t2, e = false) {
  return {
    commands: t2,
    format: "utf-8",
    parser(n5) {
      return e ? String(n5).trim() : n5;
    }
  };
}
function Gt2(t2) {
  return {
    commands: t2,
    format: "buffer",
    parser(e) {
      return e;
    }
  };
}
function en(t2) {
  return t2.format === "buffer";
}
function kt2(t2) {
  return t2.format === "empty" || !t2.commands.length;
}
var nn = "Git clean interactive mode is not supported";
var rn = 'Git clean mode parameter ("n" or "f") is required';
var sn = "Git clean unknown option found in: ";
var zt2 = /* @__PURE__ */ ((t2) => (t2.DRY_RUN = "n", t2.FORCE = "f", t2.IGNORED_INCLUDED = "x", t2.IGNORED_ONLY = "X", t2.EXCLUDING = "e", t2.QUIET = "q", t2.RECURSIVE = "d", t2))(zt2 || {});
var qt2 = /* @__PURE__ */ new Set([
  "i",
  ...L3(Object.values(zt2))
]);
function on(t2, e) {
  const { cleanMode: n5, options: r2, valid: s } = cn(t2);
  return n5 ? s.options ? (r2.push(...e), r2.some(hn) ? b2(nn) : an(n5, r2)) : b2(sn + JSON.stringify(t2)) : b2(rn);
}
function an(t2, e) {
  return {
    commands: ["clean", `-${t2}`, ...e],
    format: "utf-8",
    parser(r2) {
      return Ze2(t2 === "n", r2);
    }
  };
}
function un(t2) {
  return Array.isArray(t2) && t2.every((e) => qt2.has(e));
}
function cn(t2) {
  let e, n5 = [], r2 = { cleanMode: false, options: true };
  return t2.replace(/[^a-z]i/g, "").split("").forEach((s) => {
    fn(s) ? (e = s, r2.cleanMode = true) : r2.options = r2.options && ln(n5[n5.length] = `-${s}`);
  }), {
    cleanMode: e,
    options: n5,
    valid: r2
  };
}
function fn(t2) {
  return t2 === "f" || t2 === "n";
}
function ln(t2) {
  return /^-[a-z]$/i.test(t2) && qt2.has(t2.charAt(1));
}
function hn(t2) {
  return /^-[^\-]/.test(t2) ? t2.indexOf("i") > 0 : t2 === "--interactive";
}
var mn = class {
  constructor() {
    this.files = [], this.values = /* @__PURE__ */ Object.create(null);
  }
  get all() {
    return this._all || (this._all = this.files.reduce((e, n5) => Object.assign(e, this.values[n5]), {})), this._all;
  }
  addFile(e) {
    if (!(e in this.values)) {
      const n5 = N3(this.files);
      this.values[e] = n5 ? Object.create(this.values[n5]) : {}, this.files.push(e);
    }
    return this.values[e];
  }
  addValue(e, n5, r2) {
    const s = this.addFile(e);
    Object.hasOwn(s, n5) ? Array.isArray(s[n5]) ? s[n5].push(r2) : s[n5] = [s[n5], r2] : s[n5] = r2, this._all = void 0;
  }
};
function pn(t2) {
  const e = new mn();
  for (const n5 of Wt2(t2))
    e.addValue(n5.file, String(n5.key), n5.value);
  return e;
}
function dn(t2, e) {
  let n5 = null;
  const r2 = [], s = /* @__PURE__ */ new Map();
  for (const o2 of Wt2(t2, e))
    o2.key === e && (r2.push(n5 = o2.value), s.has(o2.file) || s.set(o2.file, []), s.get(o2.file).push(n5));
  return {
    key: e,
    paths: Array.from(s.keys()),
    scopes: s,
    value: n5,
    values: r2
  };
}
function gn(t2) {
  return t2.replace(/^(file):/, "");
}
function* Wt2(t2, e = null) {
  const n5 = t2.split("\0");
  for (let r2 = 0, s = n5.length - 1; r2 < s; ) {
    const o2 = gn(n5[r2++]);
    let i = n5[r2++], a = e;
    if (i.includes(`
`)) {
      const c3 = Pe2(i, `
`);
      a = c3[0], i = c3[1];
    }
    yield { file: o2, key: a, value: i };
  }
}
var Ht2 = /* @__PURE__ */ ((t2) => (t2.system = "system", t2.global = "global", t2.local = "local", t2.worktree = "worktree", t2))(Ht2 || {});
function Y3(t2, e) {
  return typeof t2 == "string" && Object.hasOwn(Ht2, t2) ? t2 : e;
}
function yn(t2, e, n5, r2) {
  const s = ["config", `--${r2}`];
  return n5 && s.push("--add"), s.push(t2, e), {
    commands: s,
    format: "utf-8",
    parser(o2) {
      return o2;
    }
  };
}
function wn(t2, e) {
  const n5 = ["config", "--null", "--show-origin", "--get-all", t2];
  return e && n5.splice(1, 0, `--${e}`), {
    commands: n5,
    format: "utf-8",
    parser(r2) {
      return dn(r2, t2);
    }
  };
}
function bn(t2) {
  const e = ["config", "--list", "--show-origin", "--null"];
  return t2 && e.push(`--${t2}`), {
    commands: e,
    format: "utf-8",
    parser(n5) {
      return pn(n5);
    }
  };
}
function Tn() {
  return {
    addConfig(t2, e, ...n5) {
      return this._runTask(
        yn(
          t2,
          e,
          n5[0] === true,
          Y3(
            n5[1],
            "local"
            /* local */
          )
        ),
        u(arguments)
      );
    },
    getConfig(t2, e) {
      return this._runTask(
        wn(t2, Y3(e, void 0)),
        u(arguments)
      );
    },
    listConfig(...t2) {
      return this._runTask(
        bn(Y3(t2[0], void 0)),
        u(arguments)
      );
    }
  };
}
var Kt2 = /* @__PURE__ */ ((t2) => (t2.ADDED = "A", t2.COPIED = "C", t2.DELETED = "D", t2.MODIFIED = "M", t2.RENAMED = "R", t2.CHANGED = "T", t2.UNMERGED = "U", t2.UNKNOWN = "X", t2.BROKEN = "B", t2))(Kt2 || {});
var kn = new Set(Object.values(Kt2));
function _n8(t2) {
  return kn.has(t2);
}
var _t9;
var vn = ["-h"];
var j3 = /* @__PURE__ */ Symbol("grepQuery");
var En = class {
  constructor() {
    this[_t9] = [];
  }
  *[(_t9 = j3, Symbol.iterator)]() {
    for (const e of this[j3])
      yield e;
  }
  and(...e) {
    return e.length && this[j3].push("--and", "(", ...U2(e, "-e"), ")"), this;
  }
  param(...e) {
    return this[j3].push(...U2(e, "-e")), this;
  }
};
function Sn(...t2) {
  return new En().param(...t2);
}
function Rn(t2) {
  const e = /* @__PURE__ */ new Set(), n5 = {};
  return ut2(t2, (r2) => {
    const [s, o2, i] = r2.split(I3);
    e.add(s), (n5[s] = n5[s] || []).push({
      line: p(o2),
      path: s,
      preview: i
    });
  }), {
    paths: e,
    results: n5
  };
}
function On() {
  return {
    grep(t2) {
      const e = u(arguments), n5 = h2(arguments);
      for (const s of vn)
        if (n5.includes(s))
          return this._runTask(
            b2(`git.grep: use of "${s}" is not supported.`),
            e
          );
      typeof t2 == "string" && (t2 = Sn().param(t2));
      const r2 = ["grep", "--null", "-n", "--full-name", ...n5, ...t2];
      return this._runTask(
        {
          commands: r2,
          format: "utf-8",
          parser(s) {
            return Rn(s);
          }
        },
        e
      );
    }
  };
}
var Vt2 = /* @__PURE__ */ ((t2) => (t2.MIXED = "mixed", t2.SOFT = "soft", t2.HARD = "hard", t2.MERGE = "merge", t2.KEEP = "keep", t2))(Vt2 || {});
var Cn = L3(Object.values(Vt2));
function An(t2, e) {
  const n5 = ["reset"];
  return Xt2(t2) && n5.push(`--${t2}`), n5.push(...e), g(n5);
}
function xn(t2) {
  if (Xt2(t2))
    return t2;
  switch (typeof t2) {
    case "string":
    case "undefined":
      return "soft";
  }
}
function Xt2(t2) {
  return typeof t2 == "string" && Cn.includes(t2);
}
import_debug.default.formatters.L = (t2) => String(Bt2(t2) ? t2.length : "-");
import_debug.default.formatters.B = (t2) => Buffer.isBuffer(t2) ? t2.toString("utf8") : ft2(t2);
function Nn() {
  return (0, import_debug.default)("simple-git");
}
function vt2(t2, e, n5) {
  return !e || !String(e).replace(/\s*/, "") ? n5 ? (r2, ...s) => {
    t2(r2, ...s), n5(r2, ...s);
  } : t2 : (r2, ...s) => {
    t2(`%s ${r2}`, e, ...s), n5 && n5(r2, ...s);
  };
}
function $n(t2, e, { namespace: n5 }) {
  if (typeof t2 == "string")
    return t2;
  const r2 = e && e.namespace || "";
  return r2.startsWith(n5) ? r2.substr(n5.length + 1) : r2 || n5;
}
function $2(t2, e, n5, r2 = Nn()) {
  const s = t2 && `[${t2}]` || "", o2 = [], i = typeof e == "string" ? r2.extend(e) : e, a = $n(d(e, m), i, r2);
  return y2(n5);
  function c3(w2, T3) {
    return S2(
      o2,
      $2(t2, a.replace(/^[^:]+/, w2), T3, r2)
    );
  }
  function y2(w2) {
    const T3 = w2 && `[${w2}]` || "", k3 = i && vt2(i, T3) || W3, C3 = vt2(r2, `${s} ${T3}`, k3);
    return Object.assign(i ? k3 : C3, {
      label: t2,
      sibling: c3,
      info: C3,
      step: y2
    });
  }
}
var M3 = class M4 {
  constructor(e = "GitExecutor") {
    this.logLabel = e, this._queue = /* @__PURE__ */ new Map();
  }
  withProgress(e) {
    return this._queue.get(e);
  }
  createProgress(e) {
    const n5 = M4.getName(e.commands[0]), r2 = $2(this.logLabel, n5);
    return {
      task: e,
      logger: r2,
      name: n5
    };
  }
  push(e) {
    const n5 = this.createProgress(e);
    return n5.logger("Adding task to the queue, commands = %o", e.commands), this._queue.set(e, n5), n5;
  }
  fatal(e) {
    for (const [n5, { logger: r2 }] of Array.from(this._queue.entries()))
      n5 === e.task ? (r2.info("Failed %o", e), r2(
        "Fatal exception, any as-yet un-started tasks run through this executor will not be attempted"
      )) : r2.info(
        "A fatal exception occurred in a previous task, the queue has been purged: %o",
        e.message
      ), this.complete(n5);
    if (this._queue.size !== 0)
      throw new Error(`Queue size should be zero after fatal: ${this._queue.size}`);
  }
  complete(e) {
    this.withProgress(e) && this._queue.delete(e);
  }
  attempt(e) {
    const n5 = this.withProgress(e);
    if (!n5)
      throw new O3(void 0, "TasksPendingQueue: attempt called for an unknown task");
    return n5.logger("Starting task"), n5;
  }
  static getName(e = "empty") {
    return `task:${e}:${++M4.counter}`;
  }
};
M3.counter = 0;
var ot2 = M3;
var Pn = class {
  constructor(e, n5, r2) {
    this._executor = e, this._scheduler = n5, this._plugins = r2, this._chain = Promise.resolve(), this._queue = new ot2();
  }
  get cwd() {
    return this._cwd || this._executor.cwd;
  }
  set cwd(e) {
    this._cwd = e;
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
  push(e) {
    return this._queue.push(e), this._chain = this._chain.then(() => this.attemptTask(e));
  }
  async attemptTask(e) {
    const n5 = await this._scheduler.next(), r2 = () => this._queue.complete(e);
    try {
      const { logger: s } = this._queue.attempt(e);
      return await (kt2(e) ? this.attemptEmptyTask(e, s) : this.attemptRemoteTask(e, s));
    } catch (s) {
      throw this.onFatalException(e, s);
    } finally {
      r2(), n5();
    }
  }
  onFatalException(e, n5) {
    const r2 = n5 instanceof O3 ? Object.assign(n5, { task: e }) : new O3(e, n5 && String(n5));
    return this._chain = Promise.resolve(), this._queue.fatal(r2), r2;
  }
  async attemptRemoteTask(e, n5) {
    const r2 = this._plugins.exec("spawn.binary", "", this.taskContext(e, e.commands)), s = this._plugins.exec(
      "spawn.args",
      [...e.commands],
      this.taskContext(e, e.commands)
    ), o2 = await this.gitResponse(
      e,
      r2,
      s,
      this.outputHandler,
      n5.step("SPAWN")
    ), i = await this.handleTaskData(e, s, o2, n5.step("HANDLE"));
    return n5("passing response to task's parser as a %s", e.format), en(e) ? Tt2(e.parser, i) : Tt2(e.parser, i.asStrings());
  }
  async attemptEmptyTask(e, n5) {
    return n5("empty task bypassing child process to call to task's parser"), e.parser(this);
  }
  handleTaskData(e, n5, r2, s) {
    const { exitCode: o2, rejection: i, stdOut: a, stdErr: c3 } = r2;
    return new Promise((y2, w2) => {
      s("Preparing to handle process response exitCode=%d stdOut=", o2);
      const { error: T3 } = this._plugins.exec(
        "task.error",
        { error: i },
        {
          ...this.taskContext(e, n5),
          ...r2
        }
      );
      if (T3 && e.onError)
        return s.info("exitCode=%s handling with custom error handler"), e.onError(
          r2,
          T3,
          (k3) => {
            s.info("custom error handler treated as success"), s("custom error returned a %s", ft2(k3)), y2(
              new z2(
                Array.isArray(k3) ? Buffer.concat(k3) : k3,
                Buffer.concat(c3)
              )
            );
          },
          w2
        );
      if (T3)
        return s.info(
          "handling as error: exitCode=%s stdErr=%s rejection=%o",
          o2,
          c3.length,
          i
        ), w2(T3);
      s.info("retrieving task output complete"), y2(new z2(Buffer.concat(a), Buffer.concat(c3)));
    });
  }
  async gitResponse(e, n5, r2, s, o2) {
    const i = o2.sibling("output"), a = this._plugins.exec(
      "spawn.options",
      {
        cwd: this.cwd,
        env: this.env,
        windowsHide: true
      },
      this.taskContext(e, e.commands)
    );
    return new Promise((c3) => {
      const y2 = [], w2 = [];
      o2.info("%s %o", n5, r2), o2("%O", a);
      let T3 = this._beforeSpawn(e, r2);
      if (T3)
        return c3({
          stdOut: y2,
          stdErr: w2,
          exitCode: 9901,
          rejection: T3
        });
      this._plugins.exec("spawn.before", void 0, {
        ...this.taskContext(e, r2),
        kill(C3) {
          T3 = C3 || T3;
        }
      });
      const k3 = (0, import_node_child_process.spawn)(n5, r2, a);
      k3.stdout.on(
        "data",
        Et2(y2, "stdOut", o2, i.step("stdOut"))
      ), k3.stderr.on(
        "data",
        Et2(w2, "stdErr", o2, i.step("stdErr"))
      ), k3.on("error", Mn(w2, o2)), s && (o2("Passing child process stdOut/stdErr to custom outputHandler"), s(n5, k3.stdout, k3.stderr, [...r2])), this._plugins.exec("spawn.after", void 0, {
        ...this.taskContext(e, r2),
        spawned: k3,
        close(C3, Te2) {
          c3({
            stdOut: y2,
            stdErr: w2,
            exitCode: C3,
            rejection: T3 || Te2
          });
        },
        kill(C3) {
          k3.killed || (T3 = C3, k3.kill("SIGINT"));
        }
      });
    });
  }
  _beforeSpawn(e, n5) {
    let r2;
    return this._plugins.exec("spawn.before", void 0, {
      ...this.taskContext(e, n5),
      kill(s) {
        r2 = s || r2;
      }
    }), r2;
  }
  taskContext(e, n5) {
    return {
      method: String(Me(e.commands) || ""),
      commands: n5,
      env: { ...this.env },
      input: kt2(e) ? void 0 : e.input
    };
  }
};
function Mn(t2, e) {
  return (n5) => {
    e("[ERROR] child process exception %o", n5), t2.push(Buffer.from(String(n5.stack), "ascii"));
  };
}
function Et2(t2, e, n5, r2) {
  return (s) => {
    n5("%s received %L bytes", e, s), r2("%B", s), t2.push(s);
  };
}
var Dn = class {
  constructor(e, n5, r2) {
    this.cwd = e, this._scheduler = n5, this._plugins = r2, this._chain = this.chain();
  }
  chain() {
    return new Pn(this, this._scheduler, this._plugins);
  }
  push(e) {
    return this._chain.push(e);
  }
};
function Ln(t2, e, n5 = W3) {
  const r2 = (o2) => {
    n5(null, o2);
  }, s = (o2) => {
    o2?.task === t2 && n5(o2, void 0);
  };
  e.then(r2, s);
}
function St2(t2, e) {
  return tn((n5) => {
    if (!Lt2(t2))
      throw new Error(`Git.cwd: cannot change to non-directory "${t2}"`);
    return (e || n5).cwd = t2;
  });
}
function Q3(t2) {
  const e = ["checkout", ...t2];
  return e[1] === "-b" && e.includes("-B") && (e[1] = ct(e, "-B")), g(e);
}
function jn() {
  return {
    checkout() {
      return this._runTask(
        Q3(h2(arguments, 1)),
        u(arguments)
      );
    },
    checkoutBranch(t2, e) {
      return this._runTask(
        Q3(["-b", t2, e, ...h2(arguments)]),
        u(arguments)
      );
    },
    checkoutLocalBranch(t2) {
      return this._runTask(
        Q3(["-b", t2, ...h2(arguments)]),
        u(arguments)
      );
    }
  };
}
var Yt2 = (t2, e, n5) => {
  const r2 = ["clone", ...n5];
  return m(t2) && r2.push(c(t2)), m(e) && r2.push(c(e)), g(r2);
};
var Bn = (t2, e, n5) => (S2(n5, "--mirror"), Yt2(t2, e, n5));
function Rt2(t2, e, n5, ...r2) {
  return m(n5) ? e(n5, d(r2[0], m), h2(arguments)) : b2(`git.${t2}() requires a string 'repoPath'`);
}
function In() {
  return {
    clone(t2, ...e) {
      return this._runTask(
        Rt2("clone", Yt2, d(t2, m), ...e),
        u(arguments)
      );
    },
    mirror(t2, ...e) {
      return this._runTask(
        Rt2("mirror", Bn, d(t2, m), ...e),
        u(arguments)
      );
    }
  };
}
var Un = [
  new l2(/^\[([^\s]+)( \([^)]+\))? ([^\]]+)/, (t2, [e, n5, r2]) => {
    t2.branch = e, t2.commit = r2, t2.root = !!n5;
  }),
  new l2(/\s*Author:\s(.+)/i, (t2, [e]) => {
    const n5 = e.split("<"), r2 = n5.pop();
    !r2 || !r2.includes("@") || (t2.author = {
      email: r2.substr(0, r2.length - 1),
      name: n5.join("<").trim()
    });
  }),
  new l2(
    /(\d+)[^,]*(?:,\s*(\d+)[^,]*)(?:,\s*(\d+))/g,
    (t2, [e, n5, r2]) => {
      t2.summary.changes = parseInt(e, 10) || 0, t2.summary.insertions = parseInt(n5, 10) || 0, t2.summary.deletions = parseInt(r2, 10) || 0;
    }
  ),
  new l2(
    /^(\d+)[^,]*(?:,\s*(\d+)[^(]+\(([+-]))?/,
    (t2, [e, n5, r2]) => {
      t2.summary.changes = parseInt(e, 10) || 0;
      const s = parseInt(n5, 10) || 0;
      r2 === "-" ? t2.summary.deletions = s : r2 === "+" && (t2.summary.insertions = s);
    }
  )
];
function Fn(t2) {
  return E2({
    author: null,
    branch: "",
    commit: "",
    root: false,
    summary: {
      changes: 0,
      insertions: 0,
      deletions: 0
    }
  }, Un, t2);
}
function Gn(t2, e, n5) {
  return {
    commands: [
      "-c",
      "core.abbrev=40",
      "commit",
      ...U2(t2, "-m"),
      ...e,
      ...n5
    ],
    format: "utf-8",
    parser: Fn
  };
}
function zn() {
  return {
    commit(e, ...n5) {
      const r2 = u(arguments), s = t2(e) || Gn(
        v2(e),
        v2(d(n5[0], G3, [])),
        [
          ...L3(d(n5[1], K3, [])),
          ...h2(arguments, 0, true)
        ]
      );
      return this._runTask(s, r2);
    }
  };
  function t2(e) {
    return !G3(e) && b2(
      "git.commit: requires the commit message to be supplied as a string/string[]"
    );
  }
}
function qn() {
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
var Wn = new l2(
  /([a-z-]+): (\d+)$/,
  (t2, [e, n5]) => {
    const r2 = jt2(e);
    Object.hasOwn(t2, r2) && (t2[r2] = p(n5));
  }
);
function Hn() {
  return {
    countObjects() {
      return this._runTask({
        commands: ["count-objects", "--verbose"],
        format: "utf-8",
        parser(t2) {
          return E2(qn(), [Wn], t2);
        }
      });
    }
  };
}
function Kn() {
  return {
    firstCommit() {
      return this._runTask(
        g(["rev-list", "--max-parents=0", "HEAD"], true),
        u(arguments)
      );
    }
  };
}
function Vn(t2, e) {
  const n5 = ["hash-object", t2];
  return e && n5.push("-w"), g(n5, true);
}
var J2 = class {
  constructor(e, n5, r2, s) {
    this.bare = e, this.path = n5, this.existing = r2, this.gitDir = s;
  }
};
var Xn = /^Init.+ repository in (.+)$/;
var Yn = /^Rein.+ in (.+)$/;
function Qn(t2, e, n5) {
  const r2 = String(n5).trim();
  let s;
  if (s = Xn.exec(r2))
    return new J2(t2, e, false, s[1]);
  if (s = Yn.exec(r2))
    return new J2(t2, e, true, s[1]);
  let o2 = "";
  const i = r2.split(" ");
  for (; i.length; )
    if (i.shift() === "in") {
      o2 = i.join(" ");
      break;
    }
  return new J2(t2, e, /^re/i.test(r2), o2);
}
var Qt2 = "--bare";
function Jn(t2) {
  return t2.includes(Qt2);
}
function Zn(t2 = false, e, n5) {
  const r2 = ["init", ...n5];
  return t2 && !Jn(r2) && r2.splice(1, 0, Qt2), {
    commands: r2,
    format: "utf-8",
    parser(s) {
      return Qn(r2.includes("--bare"), e, s);
    }
  };
}
function tr(t2) {
  return t2 === void 0 ? b2("interpretTrailers called without input content") : {
    format: "utf-8",
    parser(e) {
      return Object.fromEntries(
        ut2(e, (n5) => {
          const r2 = n5.indexOf(":");
          return [
            jt2(n5.substring(0, r2).toLowerCase()),
            n5.substring(r2 + 2).trim()
          ];
        })
      );
    },
    commands: ["interpret-trailers", "--parse"],
    input: t2
  };
}
function er() {
  return {
    interpretTrailers(t2) {
      return this._runTask(
        tr(d(t2, Be2)),
        u(arguments)
      );
    }
  };
}
var R3 = /* @__PURE__ */ ((t2) => (t2.NONE = "", t2.STAT = "--stat", t2.NUM_STAT = "--numstat", t2.NAME_ONLY = "--name-only", t2.NAME_STATUS = "--name-status", t2))(R3 || {});
var Jt2 = /^--(stat|numstat|name-only|name-status)(=|$)/;
function pt2(t2) {
  for (let e = 0; e < t2.length; e++) {
    const n5 = Jt2.exec(t2[e]);
    if (n5)
      return `--${n5[1]}`;
  }
  return "";
}
function nr(t2) {
  return Jt2.test(t2);
}
var rr = class {
  constructor() {
    this.changed = 0, this.deletions = 0, this.insertions = 0, this.files = [];
  }
};
var Ot2 = [
  new l2(
    /^(.+)\s+\|\s+(\d+)(\s+[+\-]+)?$/,
    (t2, [e, n5, r2 = ""]) => {
      t2.files.push({
        file: e.trim(),
        changes: p(n5),
        insertions: r2.replace(/[^+]/g, "").length,
        deletions: r2.replace(/[^-]/g, "").length,
        binary: false
      });
    }
  ),
  new l2(
    /^(.+) \|\s+Bin ([0-9.]+) -> ([0-9.]+) ([a-z]+)/,
    (t2, [e, n5, r2]) => {
      t2.files.push({
        file: e.trim(),
        before: p(n5),
        after: p(r2),
        binary: true
      });
    }
  ),
  new l2(/^(.+)\s+\|\s+Bin\s*$/, (t2, [e]) => {
    t2.files.push({
      file: e.trim(),
      before: 0,
      after: 0,
      binary: true
    });
  }),
  new l2(
    /(\d+) files? changed\s*((?:, \d+ [^,]+){0,2})/,
    (t2, [e, n5]) => {
      const r2 = /(\d+) i/.exec(n5), s = /(\d+) d/.exec(n5);
      t2.changed = p(e), t2.insertions = p(r2?.[1]), t2.deletions = p(s?.[1]);
    }
  )
];
var sr = [
  new l2(
    /(\d+)\t(\d+)\t(.+)$/,
    (t2, [e, n5, r2]) => {
      const s = p(e), o2 = p(n5);
      t2.changed++, t2.insertions += s, t2.deletions += o2, t2.files.push({
        file: r2,
        changes: s + o2,
        insertions: s,
        deletions: o2,
        binary: false
      });
    }
  ),
  new l2(/-\t-\t(.+)$/, (t2, [e]) => {
    t2.changed++, t2.files.push({
      file: e,
      after: 0,
      before: 0,
      binary: true
    });
  })
];
var or = [
  new l2(/(.+)$/, (t2, [e]) => {
    t2.changed++, t2.files.push({
      file: e,
      changes: 0,
      insertions: 0,
      deletions: 0,
      binary: false
    });
  })
];
var ir = [
  new l2(
    /([ACDMRTUXB])([0-9]{0,3})\t(.[^\t]*)(\t(.[^\t]*))?$/,
    (t2, [e, n5, r2, s, o2]) => {
      t2.changed++, t2.files.push({
        file: o2 ?? r2,
        changes: 0,
        insertions: 0,
        deletions: 0,
        binary: false,
        status: bt2(_n8(e) && e),
        from: bt2(!!o2 && r2 !== o2 && r2),
        similarity: p(n5)
      });
    }
  )
];
var ar = {
  [R3.NONE]: Ot2,
  [R3.STAT]: Ot2,
  [R3.NUM_STAT]: sr,
  [R3.NAME_STATUS]: ir,
  [R3.NAME_ONLY]: or
};
function Zt2(t2 = R3.NONE) {
  const e = ar[t2];
  return (n5) => E2(new rr(), e, n5, false);
}
var te2 = "\xF2\xF2\xF2\xF2\xF2\xF2 ";
var ee3 = " \xF2\xF2";
var ne3 = " \xF2 ";
var ur = ["hash", "date", "message", "refs", "author_name", "author_email"];
function cr(t2, e) {
  return e.reduce(
    (n5, r2, s) => (n5[r2] = t2[s] || "", n5),
    /* @__PURE__ */ Object.create({ diff: null })
  );
}
function re2(t2 = ne3, e = ur, n5 = R3.NONE) {
  const r2 = Zt2(n5);
  return function(s) {
    const o2 = H3(
      s.trim(),
      false,
      te2
    ).map(function(i) {
      const a = i.split(ee3), c3 = cr(a[0].split(t2), e);
      return a.length > 1 && a[1].trim() && (c3.diff = r2(a[1])), c3;
    });
    return {
      all: o2,
      latest: o2.length && o2[0] || null,
      total: o2.length
    };
  };
}
function fr(t2) {
  let e = pt2(t2);
  const n5 = ["diff"];
  return e === R3.NONE && (e = R3.STAT, n5.push("--stat=4096")), n5.push(...t2), dt2(n5) || {
    commands: n5,
    format: "utf-8",
    parser: Zt2(e)
  };
}
function dt2(t2) {
  const e = t2.filter(nr);
  if (e.length > 1)
    return b2(
      `Summary flags are mutually exclusive - pick one of ${e.join(",")}`
    );
  if (e.length && t2.includes("-z"))
    return b2(
      `Summary flag ${e} parsing is not compatible with null termination option '-z'`
    );
}
var se2 = /* @__PURE__ */ ((t2) => (t2[t2["--pretty"] = 0] = "--pretty", t2[t2["max-count"] = 1] = "max-count", t2[t2.maxCount = 2] = "maxCount", t2[t2.n = 3] = "n", t2[t2.file = 4] = "file", t2[t2.format = 5] = "format", t2[t2.from = 6] = "from", t2[t2.to = 7] = "to", t2[t2.splitter = 8] = "splitter", t2[t2.symmetric = 9] = "symmetric", t2[t2.mailMap = 10] = "mailMap", t2[t2.multiLine = 11] = "multiLine", t2[t2.strictDate = 12] = "strictDate", t2))(se2 || {});
function lr(t2, e) {
  const n5 = [], r2 = [];
  return Object.keys(t2).forEach((s) => {
    n5.push(s), r2.push(String(t2[s]));
  }), [n5, r2.join(e)];
}
function hr(t2) {
  return Object.keys(t2).reduce((e, n5) => (n5 in se2 || (e[n5] = t2[n5]), e), {});
}
function oe3(t2 = {}, e = []) {
  const n5 = d(t2.splitter, m, ne3), r2 = lt2(t2.format) ? t2.format : {
    hash: "%H",
    date: t2.strictDate === false ? "%ai" : "%aI",
    message: "%s",
    refs: "%D",
    body: t2.multiLine ? "%B" : "%b",
    author_name: t2.mailMap !== false ? "%aN" : "%an",
    author_email: t2.mailMap !== false ? "%aE" : "%ae"
  }, [s, o2] = lr(r2, n5), i = [], a = [
    `--pretty=format:${te2}${o2}${ee3}`,
    ...e
  ], c3 = t2.n || t2["max-count"] || t2.maxCount;
  if (c3 && a.push(`--max-count=${c3}`), t2.from || t2.to) {
    const y2 = t2.symmetric !== false ? "..." : "..";
    i.push(`${t2.from || ""}${y2}${t2.to || ""}`);
  }
  return m(t2.file) && a.push("--follow", c(t2.file)), It2(hr(t2), a), {
    fields: s,
    splitter: n5,
    commands: [...a, ...i]
  };
}
function mr(t2, e, n5) {
  const r2 = re2(t2, e, pt2(n5));
  return {
    commands: ["log", ...n5],
    format: "utf-8",
    parser: r2
  };
}
function pr() {
  return {
    log(...n5) {
      const r2 = u(arguments), s = oe3(
        ht2(arguments),
        L3(d(arguments[0], K3, []))
      ), o2 = e(...n5) || dt2(s.commands) || t2(s);
      return this._runTask(o2, r2);
    }
  };
  function t2(n5) {
    return mr(n5.splitter, n5.fields, n5.commands);
  }
  function e(n5, r2) {
    return m(n5) && m(r2) && b2(
      "git.log(string, string) should be replaced with git.log({ from: string, to: string })"
    );
  }
}
var Z2 = class {
  constructor(e, n5 = null, r2) {
    this.reason = e, this.file = n5, this.meta = r2;
  }
  toString() {
    return `${this.file}:${this.reason}`;
  }
};
var dr = class {
  constructor() {
    this.conflicts = [], this.merges = [], this.result = "success";
  }
  get failed() {
    return this.conflicts.length > 0;
  }
  get reason() {
    return this.result;
  }
  toString() {
    return this.conflicts.length ? `CONFLICTS: ${this.conflicts.join(", ")}` : "OK";
  }
};
var ie2 = class {
  constructor() {
    this.remoteMessages = {
      all: []
    }, this.created = [], this.deleted = [], this.files = [], this.deletions = {}, this.insertions = {}, this.summary = {
      changes: 0,
      deletions: 0,
      insertions: 0
    };
  }
};
var gr = class {
  constructor() {
    this.remote = "", this.hash = {
      local: "",
      remote: ""
    }, this.branch = {
      local: "",
      remote: ""
    }, this.message = "";
  }
  toString() {
    return this.message;
  }
};
function tt2(t2) {
  return t2.objects = t2.objects || {
    compressing: 0,
    counting: 0,
    enumerating: 0,
    packReused: 0,
    reused: { count: 0, delta: 0 },
    total: { count: 0, delta: 0 }
  };
}
function Ct2(t2) {
  const e = /^\s*(\d+)/.exec(t2), n5 = /delta (\d+)/i.exec(t2);
  return {
    count: p(e && e[1] || "0"),
    delta: p(n5 && n5[1] || "0")
  };
}
var yr = [
  new x3(
    /^remote:\s*(enumerating|counting|compressing) objects: (\d+),/i,
    (t2, [e, n5]) => {
      const r2 = e.toLowerCase(), s = tt2(t2.remoteMessages);
      Object.assign(s, { [r2]: p(n5) });
    }
  ),
  new x3(
    /^remote:\s*(enumerating|counting|compressing) objects: \d+% \(\d+\/(\d+)\),/i,
    (t2, [e, n5]) => {
      const r2 = e.toLowerCase(), s = tt2(t2.remoteMessages);
      Object.assign(s, { [r2]: p(n5) });
    }
  ),
  new x3(
    /total ([^,]+), reused ([^,]+), pack-reused (\d+)/i,
    (t2, [e, n5, r2]) => {
      const s = tt2(t2.remoteMessages);
      s.total = Ct2(e), s.reused = Ct2(n5), s.packReused = p(r2);
    }
  )
];
var wr = [
  new x3(/^remote:\s*(.+)$/, (t2, [e]) => (t2.remoteMessages.all.push(e.trim()), false)),
  ...yr,
  new x3(
    [/create a (?:pull|merge) request/i, /\s(https?:\/\/\S+)$/],
    (t2, [e]) => {
      t2.remoteMessages.pullRequestUrl = e;
    }
  ),
  new x3(
    [/found (\d+) vulnerabilities.+\(([^)]+)\)/i, /\s(https?:\/\/\S+)$/],
    (t2, [e, n5, r2]) => {
      t2.remoteMessages.vulnerabilities = {
        count: p(e),
        summary: n5,
        url: r2
      };
    }
  )
];
function ae2(t2, e) {
  return E2({ remoteMessages: new br() }, wr, e);
}
var br = class {
  constructor() {
    this.all = [];
  }
};
var Tr = /^\s*(.+?)\s+\|\s+\d+\s*(\+*)(-*)/;
var kr = /(\d+)\D+((\d+)\D+\(\+\))?(\D+(\d+)\D+\(-\))?/;
var _r7 = /^(create|delete) mode \d+ (.+)/;
var vr = [
  new l2(Tr, (t2, [e, n5, r2]) => {
    t2.files.push(e), n5 && (t2.insertions[e] = n5.length), r2 && (t2.deletions[e] = r2.length);
  }),
  new l2(kr, (t2, [e, , n5, , r2]) => n5 !== void 0 || r2 !== void 0 ? (t2.summary.changes = +e || 0, t2.summary.insertions = +n5 || 0, t2.summary.deletions = +r2 || 0, true) : false),
  new l2(_r7, (t2, [e, n5]) => {
    S2(t2.files, n5), S2(e === "create" ? t2.created : t2.deleted, n5);
  })
];
var Er = [
  new l2(/^from\s(.+)$/i, (t2, [e]) => {
    t2.remote = e;
  }),
  new l2(/^fatal:\s(.+)$/, (t2, [e]) => {
    t2.message = e;
  }),
  new l2(
    /([a-z0-9]+)\.\.([a-z0-9]+)\s+(\S+)\s+->\s+(\S+)$/,
    (t2, [e, n5, r2, s]) => {
      t2.branch.local = r2, t2.hash.local = e, t2.branch.remote = s, t2.hash.remote = n5;
    }
  )
];
var Sr = (t2, e) => E2(new ie2(), vr, [t2, e]);
var ue2 = (t2, e) => Object.assign(
  new ie2(),
  Sr(t2, e),
  ae2(t2, e)
);
function Rr(t2, e) {
  const n5 = E2(new gr(), Er, [t2, e]);
  return n5.message && n5;
}
var Or = [
  new l2(/^Auto-merging\s+(.+)$/, (t2, [e]) => {
    t2.merges.push(e);
  }),
  new l2(/^CONFLICT\s+\((.+)\): Merge conflict in (.+)$/, (t2, [e, n5]) => {
    t2.conflicts.push(new Z2(e, n5));
  }),
  new l2(
    /^CONFLICT\s+\((.+\/delete)\): (.+) deleted in (.+) and/,
    (t2, [e, n5, r2]) => {
      t2.conflicts.push(new Z2(e, n5, { deleteRef: r2 }));
    }
  ),
  new l2(/^CONFLICT\s+\((.+)\):/, (t2, [e]) => {
    t2.conflicts.push(new Z2(e, null));
  }),
  new l2(/^Automatic merge failed;\s+(.+)$/, (t2, [e]) => {
    t2.result = e;
  })
];
var Cr2 = (t2, e) => Object.assign(Ar(t2), ue2(t2, e));
var Ar = (t2) => E2(new dr(), Or, t2);
function At2(t2) {
  return t2.length ? {
    commands: ["merge", ...t2],
    format: "utf-8",
    parser(e, n5) {
      const r2 = Cr2(e, n5);
      if (r2.failed)
        throw new at2(r2);
      return r2;
    }
  } : b2("Git.merge requires at least one option");
}
function xr(t2, e, n5) {
  const r2 = n5.includes("deleted"), s = n5.includes("tag") || /^refs\/tags/.test(t2), o2 = !n5.includes("new");
  return {
    deleted: r2,
    tag: s,
    branch: !s,
    new: !o2,
    alreadyUpdated: o2,
    local: t2,
    remote: e
  };
}
var Nr = [
  new l2(/^Pushing to (.+)$/, (t2, [e]) => {
    t2.repo = e;
  }),
  new l2(/^updating local tracking ref '(.+)'/, (t2, [e]) => {
    t2.ref = {
      ...t2.ref || {},
      local: e
    };
  }),
  new l2(/^[=*-]\s+([^:]+):(\S+)\s+\[(.+)]$/, (t2, [e, n5, r2]) => {
    t2.pushed.push(xr(e, n5, r2));
  }),
  new l2(
    /^Branch '([^']+)' set up to track remote branch '([^']+)' from '([^']+)'/,
    (t2, [e, n5, r2]) => {
      t2.branch = {
        ...t2.branch || {},
        local: e,
        remote: n5,
        remoteName: r2
      };
    }
  ),
  new l2(
    /^([^:]+):(\S+)\s+([a-z0-9]+)\.\.([a-z0-9]+)$/,
    (t2, [e, n5, r2, s]) => {
      t2.update = {
        head: {
          local: e,
          remote: n5
        },
        hash: {
          from: r2,
          to: s
        }
      };
    }
  )
];
var $r = (t2, e) => {
  const n5 = Pr(t2, e), r2 = ae2(t2, e);
  return {
    ...n5,
    ...r2
  };
};
var Pr = (t2, e) => E2({ pushed: [] }, Nr, [t2, e]);
function Mr(t2 = {}, e) {
  return S2(e, "--tags"), ce2(t2, e);
}
function ce2(t2 = {}, e) {
  const n5 = ["push", ...e];
  return t2.branch && n5.splice(1, 0, t2.branch), t2.remote && n5.splice(1, 0, t2.remote), ct(n5, "-v"), S2(n5, "--verbose"), S2(n5, "--porcelain"), {
    commands: n5,
    format: "utf-8",
    parser: $r
  };
}
function Dr() {
  return {
    showBuffer() {
      const t2 = ["show", ...h2(arguments, 1)];
      return t2.includes("--binary") || t2.splice(1, 0, "--binary"), this._runTask(
        Gt2(t2),
        u(arguments)
      );
    },
    show() {
      const t2 = ["show", ...h2(arguments, 1)];
      return this._runTask(
        g(t2),
        u(arguments)
      );
    }
  };
}
var Lr = /^(.+)\0(.+)$/;
var jr = class {
  constructor(e, n5, r2) {
    if (this.path = e, this.index = n5, this.working_dir = r2, n5 === "R" || r2 === "R") {
      const s = Lr.exec(e) || [null, e, e];
      this.from = s[2] || "", this.path = s[1] || "";
    }
  }
};
var Br = class {
  constructor() {
    this.not_added = [], this.conflicted = [], this.created = [], this.deleted = [], this.ignored = void 0, this.modified = [], this.renamed = [], this.files = [], this.staged = [], this.ahead = 0, this.behind = 0, this.current = null, this.tracking = null, this.detached = false, this.isClean = () => !this.files.length;
  }
};
function xt2(t2) {
  const [e, n5] = t2.split(I3);
  return {
    from: n5 || e,
    to: e
  };
}
function _3(t2, e, n5) {
  return [`${t2}${e}`, n5];
}
function et2(t2, ...e) {
  return e.map((n5) => _3(t2, n5, (r2, s) => r2.conflicted.push(s)));
}
var Ir = new Map([
  _3(
    " ",
    "A",
    (t2, e) => t2.created.push(e)
  ),
  _3(
    " ",
    "D",
    (t2, e) => t2.deleted.push(e)
  ),
  _3(
    " ",
    "M",
    (t2, e) => t2.modified.push(e)
  ),
  _3("A", " ", (t2, e) => {
    t2.created.push(e), t2.staged.push(e);
  }),
  _3("A", "M", (t2, e) => {
    t2.created.push(e), t2.staged.push(e), t2.modified.push(e);
  }),
  _3("D", " ", (t2, e) => {
    t2.deleted.push(e), t2.staged.push(e);
  }),
  _3("M", " ", (t2, e) => {
    t2.modified.push(e), t2.staged.push(e);
  }),
  _3("M", "M", (t2, e) => {
    t2.modified.push(e), t2.staged.push(e);
  }),
  _3("R", " ", (t2, e) => {
    t2.renamed.push(xt2(e));
  }),
  _3("R", "M", (t2, e) => {
    const n5 = xt2(e);
    t2.renamed.push(n5), t2.modified.push(n5.to);
  }),
  _3("!", "!", (t2, e) => {
    (t2.ignored = t2.ignored || []).push(e);
  }),
  _3(
    "?",
    "?",
    (t2, e) => t2.not_added.push(e)
  ),
  ...et2(
    "A",
    "A",
    "U"
    /* UNMERGED */
  ),
  ...et2(
    "D",
    "D",
    "U"
    /* UNMERGED */
  ),
  ...et2(
    "U",
    "A",
    "D",
    "U"
    /* UNMERGED */
  ),
  [
    "##",
    (t2, e) => {
      const n5 = /ahead (\d+)/, r2 = /behind (\d+)/, s = /^(.+?(?=(?:\.{3}|\s|$)))/, o2 = /\.{3}(\S*)/, i = /\son\s(\S+?)(?=\.{3}|$)/;
      let a = n5.exec(e);
      t2.ahead = a && +a[1] || 0, a = r2.exec(e), t2.behind = a && +a[1] || 0, a = s.exec(e), t2.current = d(a?.[1], m, null), a = o2.exec(e), t2.tracking = d(a?.[1], m, null), a = i.exec(e), a && (t2.current = d(a?.[1], m, t2.current)), t2.detached = /\(no branch\)/.test(e);
    }
  ]
]);
var Ur = function(t2) {
  const e = t2.split(I3), n5 = new Br();
  for (let r2 = 0, s = e.length; r2 < s; ) {
    let o2 = e[r2++].trim();
    o2 && (o2.charAt(0) === "R" && (o2 += I3 + (e[r2++] || "")), Fr(n5, o2));
  }
  return n5;
};
function Fr(t2, e) {
  const n5 = e.trim();
  switch (" ") {
    case n5.charAt(2):
      return r2(n5.charAt(0), n5.charAt(1), n5.slice(3));
    case n5.charAt(1):
      return r2(" ", n5.charAt(0), n5.slice(2));
    default:
      return;
  }
  function r2(s, o2, i) {
    const a = `${s}${o2}`, c3 = Ir.get(a);
    c3 && c3(t2, i), a !== "##" && a !== "!!" && t2.files.push(new jr(i, s, o2));
  }
}
var Gr = ["--null", "-z"];
function zr(t2) {
  return {
    format: "utf-8",
    commands: [
      "status",
      "--porcelain",
      "-b",
      "-u",
      "--null",
      ...t2.filter((n5) => !Gr.includes(n5))
    ],
    parser(n5) {
      return Ur(n5);
    }
  };
}
var fe2 = "installed=false";
function q3(t2 = 0, e = 0, n5 = 0, r2 = "", s = true) {
  return Object.defineProperty(
    {
      major: t2,
      minor: e,
      patch: n5,
      agent: r2,
      installed: s
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
function qr() {
  return q3(0, 0, 0, "", false);
}
function Wr() {
  return {
    version() {
      return this._runTask({
        commands: ["--version"],
        format: "utf-8",
        parser: Kr,
        onError(t2, e, n5, r2) {
          if (t2.exitCode === V3.NOT_FOUND)
            return n5(Buffer.from(fe2));
          r2(e);
        }
      });
    }
  };
}
var Hr = [
  new l2(
    /version (\d+)\.(\d+)\.(\d+)(?:\s*\((.+)\))?/,
    (t2, [e, n5, r2, s = ""]) => {
      Object.assign(
        t2,
        q3(p(e), p(n5), p(r2), s)
      );
    }
  ),
  new l2(
    /version (\d+)\.(\d+)\.(\D+)(.+)?$/,
    (t2, [e, n5, r2, s = ""]) => {
      Object.assign(t2, q3(p(e), p(n5), r2, s));
    }
  )
];
function Kr(t2) {
  return t2 === fe2 ? qr() : E2(q3(0, 0, 0, t2), Hr, t2);
}
var le2 = class {
  constructor(e) {
    this._executor = e;
  }
  _runTask(e, n5) {
    const r2 = this._executor.chain(), s = r2.push(e);
    return n5 && Ln(e, s, n5), Object.create(this, {
      then: { value: s.then.bind(s) },
      catch: { value: s.catch.bind(s) },
      _executor: { value: r2 }
    });
  }
  add(e) {
    return this._runTask(
      g(["add", ...v2(e)]),
      u(arguments)
    );
  }
  cwd(e) {
    const n5 = u(arguments);
    return typeof e == "string" ? this._runTask(St2(e, this._executor), n5) : typeof e?.path == "string" ? this._runTask(
      St2(
        e.path,
        e.root && this._executor || void 0
      ),
      n5
    ) : this._runTask(
      b2("Git.cwd: workingDirectory must be supplied as a string"),
      n5
    );
  }
  hashObject(e, n5) {
    return this._runTask(
      Vn(e, n5 === true),
      u(arguments)
    );
  }
  init(e) {
    return this._runTask(
      Zn(e === true, this._executor.cwd, h2(arguments)),
      u(arguments)
    );
  }
  merge() {
    return this._runTask(
      At2(h2(arguments)),
      u(arguments)
    );
  }
  mergeFromTo(e, n5) {
    return m(e) && m(n5) ? this._runTask(
      At2([e, n5, ...h2(arguments)]),
      u(arguments, false)
    ) : this._runTask(
      b2(
        "Git.mergeFromTo requires that the 'remote' and 'branch' arguments are supplied as strings"
      )
    );
  }
  outputHandler(e) {
    return this._executor.outputHandler = e, this;
  }
  push() {
    const e = ce2(
      {
        remote: d(arguments[0], m),
        branch: d(arguments[1], m)
      },
      h2(arguments)
    );
    return this._runTask(e, u(arguments));
  }
  stash() {
    return this._runTask(
      g(["stash", ...h2(arguments)]),
      u(arguments)
    );
  }
  status() {
    return this._runTask(
      zr(h2(arguments)),
      u(arguments)
    );
  }
};
Object.assign(
  le2.prototype,
  jn(),
  In(),
  zn(),
  Tn(),
  Hn(),
  Kn(),
  On(),
  er(),
  pr(),
  Dr(),
  Wr()
);
var Vr = /* @__PURE__ */ (() => {
  let t2 = 0;
  return () => {
    t2++;
    const { promise: e, done: n5 } = (0, import_promise_deferred.createDeferred)();
    return {
      promise: e,
      done: n5,
      id: t2
    };
  };
})();
var Xr = class {
  constructor(e = 2) {
    this.concurrency = e, this.logger = $2("", "scheduler"), this.pending = [], this.running = [], this.logger("Constructed, concurrency=%s", e);
  }
  schedule() {
    if (!this.pending.length || this.running.length >= this.concurrency) {
      this.logger(
        "Schedule attempt ignored, pending=%s running=%s concurrency=%s",
        this.pending.length,
        this.running.length,
        this.concurrency
      );
      return;
    }
    const e = S2(this.running, this.pending.shift());
    this.logger("Attempting id=%s", e.id), e.done(() => {
      this.logger("Completing id=", e.id), ct(this.running, e), this.schedule();
    });
  }
  next() {
    const { promise: e, id: n5 } = S2(this.pending, Vr());
    return this.logger("Scheduling id=%s", n5), this.schedule(), e;
  }
};
function Yr(t2, e) {
  return g(["apply", ...e, ...t2]);
}
var he2 = /* @__PURE__ */ ((t2) => (t2.CURRENT = "*", t2.LINKED = "+", t2))(he2 || {});
var Qr = class {
  constructor() {
    this.all = [], this.branches = {}, this.current = "", this.detached = false;
  }
  push(e, n5, r2, s, o2) {
    e === "*" && (this.detached = n5, this.current = r2), this.all.push(r2), this.branches[r2] = {
      current: e === "*",
      linkedWorkTree: e === "+",
      name: r2,
      commit: s,
      label: o2
    };
  }
};
var Jr = [
  new l2(
    /^([*+]\s)?\((?:HEAD )?detached (?:from|at) (\S+)\)\s+([a-z0-9]+)\s(.*)$/,
    (t2, [e, n5, r2, s]) => {
      t2.push(Nt2(e), true, n5, r2, s);
    }
  ),
  new l2(
    /^([*+]\s)?(\S+)\s+([a-z0-9]+)\s?(.*)$/s,
    (t2, [e, n5, r2, s]) => {
      t2.push(Nt2(e), false, n5, r2, s);
    }
  )
];
var Zr = new l2(/^(\S+)$/s, (t2, [e]) => {
  t2.push(he2.CURRENT, false, e, "", "");
});
function Nt2(t2) {
  return t2 ? t2.charAt(0) : "";
}
function me2(t2, e = false) {
  return E2(
    new Qr(),
    e ? [Zr] : Jr,
    t2
  );
}
var ts2 = class {
  constructor() {
    this.all = [], this.branches = {}, this.errors = [];
  }
  get success() {
    return !this.errors.length;
  }
};
function es2(t2, e) {
  return {
    branch: t2,
    hash: e,
    success: true
  };
}
function ns2(t2) {
  return {
    branch: t2,
    hash: null,
    success: false
  };
}
var rs2 = /(\S+)\s+\(\S+\s([^)]+)\)/;
var pe2 = /^error[^']+'([^']+)'/m;
var ss2 = [
  new l2(rs2, (t2, [e, n5]) => {
    const r2 = es2(e, n5);
    t2.all.push(r2), t2.branches[e] = r2;
  }),
  new l2(pe2, (t2, [e]) => {
    const n5 = ns2(e);
    t2.errors.push(n5), t2.all.push(n5), t2.branches[e] = n5;
  })
];
var gt2 = (t2, e) => E2(new ts2(), ss2, [t2, e]);
function de2(t2, e) {
  return e === V3.ERROR && pe2.test(t2);
}
function os2(t2) {
  const e = ["-d", "-D", "--delete"];
  return t2.some((n5) => e.includes(n5));
}
function is2(t2) {
  const e = os2(t2), n5 = t2.includes("--show-current"), r2 = ["branch", ...t2];
  return r2.length === 1 && r2.push("-a"), r2.includes("-v") || r2.splice(1, 0, "-v"), {
    format: "utf-8",
    commands: r2,
    parser(s, o2) {
      return e ? gt2(s, o2).all[0] : me2(s, n5);
    }
  };
}
function as2() {
  return {
    format: "utf-8",
    commands: ["branch", "-v"],
    parser(t2) {
      return me2(t2);
    }
  };
}
function us2(t2, e = false) {
  return {
    format: "utf-8",
    commands: ["branch", "-v", e ? "-D" : "-d", ...t2],
    parser(n5, r2) {
      return gt2(n5, r2);
    },
    onError({ exitCode: n5, stdOut: r2 }, s, o2, i) {
      if (!de2(String(s), n5))
        return i(s);
      o2(r2);
    }
  };
}
function cs2(t2, e = false) {
  const n5 = {
    format: "utf-8",
    commands: ["branch", "-v", e ? "-D" : "-d", t2],
    parser(r2, s) {
      return gt2(r2, s).branches[t2];
    },
    onError({ exitCode: r2, stdErr: s, stdOut: o2 }, i, a, c3) {
      if (!de2(String(i), r2))
        return c3(i);
      throw new at2(
        n5.parser(F3(o2), F3(s)),
        String(i)
      );
    }
  };
  return n5;
}
function fs2(t2) {
  return {
    commands: ["check-ignore", ...t2],
    format: "utf-8",
    parser: ls2
  };
}
function ls2(t2) {
  return t2.split(/\n/g).map(hs2).filter(Boolean);
}
function hs2(t2) {
  const e = t2.trim().replace(/^["']|["']$/g, "");
  return e && (0, import_node_path2.normalize)(e);
}
var ms2 = [
  new l2(/From (.+)$/, (t2, [e]) => {
    t2.remote = e;
  }),
  new l2(/\* \[new branch]\s+(\S+)\s*-> (.+)$/, (t2, [e, n5]) => {
    t2.branches.push({
      name: e,
      tracking: n5
    });
  }),
  new l2(/\* \[new tag]\s+(\S+)\s*-> (.+)$/, (t2, [e, n5]) => {
    t2.tags.push({
      name: e,
      tracking: n5
    });
  }),
  new l2(/- \[deleted]\s+\S+\s*-> (.+)$/, (t2, [e]) => {
    t2.deleted.push({
      tracking: e
    });
  }),
  new l2(
    /\s*([^.]+)\.\.(\S+)\s+(\S+)\s*-> (.+)$/,
    (t2, [e, n5, r2, s]) => {
      t2.updated.push({
        name: r2,
        tracking: s,
        to: n5,
        from: e
      });
    }
  )
];
function ps2(t2, e) {
  return E2({
    raw: t2,
    remote: null,
    branches: [],
    tags: [],
    updated: [],
    deleted: []
  }, ms2, [t2, e]);
}
function ds2(t2) {
  return /^--upload-pack(=|$)/.test(t2);
}
function gs2(t2, e, n5) {
  const r2 = ["fetch", ...n5];
  return t2 && e && r2.push(t2, e), r2.find(ds2) ? b2("git.fetch: potential exploit argument blocked.") : {
    commands: r2,
    format: "utf-8",
    parser: ps2
  };
}
var ys2 = [
  new l2(/^Renaming (.+) to (.+)$/, (t2, [e, n5]) => {
    t2.moves.push({ from: e, to: n5 });
  })
];
function ws2(t2) {
  return E2({ moves: [] }, ys2, t2);
}
function bs2(t2, e) {
  return {
    commands: ["mv", "-v", ...v2(t2), e],
    format: "utf-8",
    parser: ws2
  };
}
function Ts2(t2, e, n5) {
  const r2 = ["pull", ...n5];
  return t2 && e && r2.splice(1, 0, t2, e), {
    commands: r2,
    format: "utf-8",
    parser(s, o2) {
      return ue2(s, o2);
    },
    onError(s, o2, i, a) {
      const c3 = Rr(
        F3(s.stdOut),
        F3(s.stdErr)
      );
      if (c3)
        return a(new at2(c3));
      a(o2);
    }
  };
}
function ks2(t2) {
  const e = {};
  return ge2(t2, ([n5]) => e[n5] = { name: n5 }), Object.values(e);
}
function _s9(t2) {
  const e = {};
  return ge2(t2, ([n5, r2, s]) => {
    Object.hasOwn(e, n5) || (e[n5] = {
      name: n5,
      refs: { fetch: "", push: "" }
    }), s && r2 && (e[n5].refs[s.replace(/[^a-z]/g, "")] = r2);
  }), Object.values(e);
}
function ge2(t2, e) {
  ut2(t2, (n5) => e(n5.split(/\s+/)));
}
function vs2(t2, e, n5) {
  return g(["remote", "add", ...n5, t2, e]);
}
function Es2(t2) {
  const e = ["remote"];
  return t2 && e.push("-v"), {
    commands: e,
    format: "utf-8",
    parser: t2 ? _s9 : ks2
  };
}
function Ss2(t2) {
  const e = [...t2];
  return e[0] !== "ls-remote" && e.unshift("ls-remote"), g(e);
}
function Rs2(t2) {
  const e = [...t2];
  return e[0] !== "remote" && e.unshift("remote"), g(e);
}
function Os2(t2) {
  return g(["remote", "remove", t2]);
}
function Cs2(t2 = {}, e) {
  const n5 = oe3(t2), r2 = ["stash", "list", ...n5.commands, ...e], s = re2(
    n5.splitter,
    n5.fields,
    pt2(r2)
  );
  return dt2(r2) || {
    commands: r2,
    format: "utf-8",
    parser: s
  };
}
function As2(t2, e) {
  return X3(["add", t2, e]);
}
function xs2(t2) {
  return X3(["init", ...t2]);
}
function X3(t2) {
  const e = [...t2];
  return e[0] !== "submodule" && e.unshift("submodule"), g(e);
}
function Ns2(t2) {
  return X3(["update", ...t2]);
}
var $s2 = class {
  constructor(e, n5) {
    this.all = e, this.latest = n5;
  }
};
var Ps2 = function(t2, e = false) {
  const n5 = t2.split(`
`).map(Ds2).filter(Boolean);
  e || n5.sort(function(s, o2) {
    const i = s.split("."), a = o2.split(".");
    if (i.length === 1 || a.length === 1)
      return Ms2(B3(i[0]), B3(a[0]));
    for (let c3 = 0, y2 = Math.max(i.length, a.length); c3 < y2; c3++) {
      const w2 = ye2(B3(i[c3]), B3(a[c3]));
      if (w2)
        return w2;
    }
    return 0;
  });
  const r2 = e ? n5[0] : [...n5].reverse().find((s) => s.indexOf(".") >= 0);
  return new $s2(n5, r2);
};
function Ms2(t2, e) {
  const n5 = Number.isNaN(t2), r2 = Number.isNaN(e);
  return n5 !== r2 ? n5 ? 1 : -1 : n5 ? ye2(t2, e) : 0;
}
function ye2(t2, e) {
  return t2 === e ? 0 : t2 > e ? 1 : -1;
}
function Ds2(t2) {
  return t2.trim();
}
function B3(t2) {
  return typeof t2 == "string" && parseInt(t2.replace(/^\D+/g, ""), 10) || 0;
}
function Ls2(t2 = []) {
  const e = t2.some((n5) => /^--sort=/.test(n5));
  return {
    format: "utf-8",
    commands: ["tag", "-l", ...t2],
    parser(n5) {
      return Ps2(n5, e);
    }
  };
}
function js2(t2) {
  return {
    format: "utf-8",
    commands: ["tag", t2],
    parser() {
      return { name: t2 };
    }
  };
}
function Bs2(t2, e) {
  return {
    format: "utf-8",
    commands: ["tag", "-a", "-m", e, t2],
    parser() {
      return { name: t2 };
    }
  };
}
function f2(t2, e) {
  this._plugins = e, this._executor = new Dn(
    t2.baseDir,
    new Xr(t2.maxConcurrentProcesses),
    e
  ), this._trimmed = t2.trimmed;
}
(f2.prototype = Object.create(le2.prototype)).constructor = f2;
f2.prototype.customBinary = function(t2) {
  return this._plugins.reconfigure("binary", t2), this;
};
f2.prototype.env = function(t2, e) {
  return arguments.length === 1 && typeof t2 == "object" ? this._executor.env = t2 : (this._executor.env = this._executor.env || {})[t2] = e, this;
};
f2.prototype.stashList = function(t2) {
  return this._runTask(
    Cs2(
      ht2(arguments) || {},
      K3(t2) && t2 || []
    ),
    u(arguments)
  );
};
f2.prototype.mv = function(t2, e) {
  return this._runTask(bs2(t2, e), u(arguments));
};
f2.prototype.checkoutLatestTag = function(t2) {
  var e = this;
  return this.pull(function() {
    e.tags(function(n5, r2) {
      e.checkout(r2.latest, t2);
    });
  });
};
f2.prototype.pull = function(t2, e, n5, r2) {
  return this._runTask(
    Ts2(
      d(t2, m),
      d(e, m),
      h2(arguments)
    ),
    u(arguments)
  );
};
f2.prototype.fetch = function(t2, e) {
  return this._runTask(
    gs2(
      d(t2, m),
      d(e, m),
      h2(arguments)
    ),
    u(arguments)
  );
};
f2.prototype.tags = function(t2, e) {
  return this._runTask(
    Ls2(h2(arguments)),
    u(arguments)
  );
};
f2.prototype.rebase = function() {
  return this._runTask(
    g(["rebase", ...h2(arguments)]),
    u(arguments)
  );
};
f2.prototype.reset = function(t2) {
  return this._runTask(
    An(xn(t2), h2(arguments)),
    u(arguments)
  );
};
f2.prototype.revert = function(t2) {
  const e = u(arguments);
  return typeof t2 != "string" ? this._runTask(b2("Commit must be a string"), e) : this._runTask(
    g(["revert", ...h2(arguments, 0, true), t2]),
    e
  );
};
f2.prototype.addTag = function(t2) {
  const e = typeof t2 == "string" ? js2(t2) : b2("Git.addTag requires a tag name");
  return this._runTask(e, u(arguments));
};
f2.prototype.addAnnotatedTag = function(t2, e) {
  return this._runTask(
    Bs2(t2, e),
    u(arguments)
  );
};
f2.prototype.deleteLocalBranch = function(t2, e, n5) {
  return this._runTask(
    cs2(t2, typeof e == "boolean" ? e : false),
    u(arguments)
  );
};
f2.prototype.deleteLocalBranches = function(t2, e, n5) {
  return this._runTask(
    us2(t2, typeof e == "boolean" ? e : false),
    u(arguments)
  );
};
f2.prototype.branch = function(t2, e) {
  return this._runTask(
    is2(h2(arguments)),
    u(arguments)
  );
};
f2.prototype.branchLocal = function(t2) {
  return this._runTask(as2(), u(arguments));
};
f2.prototype.raw = function(t2) {
  const e = !Array.isArray(t2), n5 = [].slice.call(e ? arguments : t2, 0);
  for (let s = 0; s < n5.length && e; s++)
    if (!st2(n5[s])) {
      n5.splice(s, n5.length - s);
      break;
    }
  n5.push(...h2(arguments, 0, true));
  var r2 = u(arguments);
  return n5.length ? this._runTask(g(n5, this._trimmed), r2) : this._runTask(
    b2("Raw: must supply one or more command to execute"),
    r2
  );
};
f2.prototype.submoduleAdd = function(t2, e, n5) {
  return this._runTask(As2(t2, e), u(arguments));
};
f2.prototype.submoduleUpdate = function(t2, e) {
  return this._runTask(
    Ns2(h2(arguments, true)),
    u(arguments)
  );
};
f2.prototype.submoduleInit = function(t2, e) {
  return this._runTask(
    xs2(h2(arguments, true)),
    u(arguments)
  );
};
f2.prototype.subModule = function(t2, e) {
  return this._runTask(
    X3(h2(arguments)),
    u(arguments)
  );
};
f2.prototype.listRemote = function() {
  return this._runTask(
    Ss2(h2(arguments)),
    u(arguments)
  );
};
f2.prototype.addRemote = function(t2, e, n5) {
  return this._runTask(
    vs2(t2, e, h2(arguments)),
    u(arguments)
  );
};
f2.prototype.removeRemote = function(t2, e) {
  return this._runTask(Os2(t2), u(arguments));
};
f2.prototype.getRemotes = function(t2, e) {
  return this._runTask(Es2(t2 === true), u(arguments));
};
f2.prototype.remote = function(t2, e) {
  return this._runTask(
    Rs2(h2(arguments)),
    u(arguments)
  );
};
f2.prototype.tag = function(t2, e) {
  const n5 = h2(arguments);
  return n5[0] !== "tag" && n5.unshift("tag"), this._runTask(g(n5), u(arguments));
};
f2.prototype.updateServerInfo = function(t2) {
  return this._runTask(
    g(["update-server-info"]),
    u(arguments)
  );
};
f2.prototype.pushTags = function(t2, e) {
  const n5 = Mr(
    { remote: d(t2, m) },
    h2(arguments)
  );
  return this._runTask(n5, u(arguments));
};
f2.prototype.rm = function(t2) {
  return this._runTask(
    g(["rm", "-f", ...v2(t2)]),
    u(arguments)
  );
};
f2.prototype.rmKeepLocal = function(t2) {
  return this._runTask(
    g(["rm", "--cached", ...v2(t2)]),
    u(arguments)
  );
};
f2.prototype.catFile = function(t2, e) {
  return this._catFile("utf-8", arguments);
};
f2.prototype.binaryCatFile = function() {
  return this._catFile("buffer", arguments);
};
f2.prototype._catFile = function(t2, e) {
  var n5 = u(e), r2 = ["cat-file"], s = e[0];
  if (typeof s == "string")
    return this._runTask(
      b2("Git.catFile: options must be supplied as an array of strings"),
      n5
    );
  Array.isArray(s) && r2.push.apply(r2, s);
  const o2 = t2 === "buffer" ? Gt2(r2) : g(r2);
  return this._runTask(o2, n5);
};
f2.prototype.diff = function(t2, e) {
  const n5 = m(t2) ? b2(
    "git.diff: supplying options as a single string is no longer supported, switch to an array of strings"
  ) : g(["diff", ...h2(arguments)]);
  return this._runTask(n5, u(arguments));
};
f2.prototype.diffSummary = function() {
  return this._runTask(
    fr(h2(arguments, 1)),
    u(arguments)
  );
};
f2.prototype.applyPatch = function(t2) {
  const e = G3(t2) ? Yr(v2(t2), h2([].slice.call(arguments, 1))) : b2(
    "git.applyPatch requires one or more string patches as the first argument"
  );
  return this._runTask(e, u(arguments));
};
f2.prototype.revparse = function() {
  const t2 = ["rev-parse", ...h2(arguments, true)];
  return this._runTask(
    g(t2, true),
    u(arguments)
  );
};
f2.prototype.clean = function(t2, e, n5) {
  const r2 = un(t2), s = r2 && t2.join("") || d(t2, m) || "", o2 = h2([].slice.call(arguments, r2 ? 1 : 0));
  return this._runTask(
    on(s, o2),
    u(arguments)
  );
};
f2.prototype.exec = function(t2) {
  const e = {
    commands: [],
    format: "utf-8",
    parser() {
      typeof t2 == "function" && t2();
    }
  };
  return this._runTask(e);
};
f2.prototype.checkIgnore = function(t2, e) {
  return this._runTask(
    fs2(v2(d(t2, G3, []))),
    u(arguments)
  );
};
f2.prototype.checkIsRepo = function(t2, e) {
  return this._runTask(
    We2(d(t2, m)),
    u(arguments)
  );
};
function Is2(t2) {
  return t2 ? [{
    type: "spawn.before",
    action(r2, s) {
      t2.aborted && s.kill(new A3(void 0, "abort", "Abort already signaled"));
    }
  }, {
    type: "spawn.after",
    action(r2, s) {
      function o2() {
        s.kill(new A3(void 0, "abort", "Abort signal received"));
      }
      t2.addEventListener("abort", o2), s.spawned.on("close", () => t2.removeEventListener("abort", o2));
    }
  }] : void 0;
}
var Us2 = $2("", "plugin:allowEnvironment");
function Fs2(t2, e = false) {
  const n5 = new Set(t2.map((r2) => r2.toLowerCase().trim()));
  return {
    type: "spawn.options",
    action(r2, s) {
      const o2 = { ...r2.env ?? process.env }, i = new Set(
        Object.keys(s.env).map((a) => a.toLowerCase().trim())
      );
      for (const a of Object.keys(o2)) {
        const c3 = a.toLowerCase().trim();
        if (!(!Gs2(c3) || n5.has(c3))) {
          if (i.has(c3))
            throw new A3(
              void 0,
              "allowEnvironment",
              `Use of "${a}" is blocked by the environment guard - add it to the allowEnvironment option to permit it`
            );
          Us2("removing ambient guarded environment variable %s", a), delete o2[a];
        }
      }
      return {
        ...r2,
        env: {
          ...o2,
          GIT_TEST_DISALLOW_ABBREVIATED_OPTIONS: String(!e)
        }
      };
    }
  };
}
function Gs2(t2) {
  const e = t2.toLowerCase().trim();
  return e.startsWith("git_") || _2(e);
}
function zs2(t2 = {}) {
  return {
    type: "spawn.args",
    action(e, { env: n5 }) {
      for (const r2 of oe2(e, n5))
        if (t2[r2.category] !== true)
          throw new A3(void 0, "unsafe", r2.message);
      return e;
    }
  };
}
function qs2(t2) {
  const e = U2(t2, "-c");
  return {
    type: "spawn.args",
    action(n5) {
      return [...e, ...n5];
    }
  };
}
var $t = (0, import_promise_deferred.deferred)().promise;
function Ws2({
  onClose: t2 = true,
  onExit: e = 50
} = {}) {
  function n5() {
    let s = -1;
    const o2 = {
      close: (0, import_promise_deferred.deferred)(),
      closeTimeout: (0, import_promise_deferred.deferred)(),
      exit: (0, import_promise_deferred.deferred)(),
      exitTimeout: (0, import_promise_deferred.deferred)()
    }, i = Promise.race([
      t2 === false ? $t : o2.closeTimeout.promise,
      e === false ? $t : o2.exitTimeout.promise
    ]);
    return r2(t2, o2.close, o2.closeTimeout), r2(e, o2.exit, o2.exitTimeout), {
      close(a) {
        s = a, o2.close.done();
      },
      exit(a) {
        s = a, o2.exit.done();
      },
      get exitCode() {
        return s;
      },
      result: i
    };
  }
  function r2(s, o2, i) {
    s !== false && (s === true ? o2.promise : o2.promise.then(() => wt2(s))).then(i.done);
  }
  return {
    type: "spawn.after",
    async action(s, { spawned: o2, close: i }) {
      const a = n5();
      let c3 = true, y2 = () => {
        c3 = false;
      };
      o2.stdout?.on("data", y2), o2.stderr?.on("data", y2), o2.on("error", y2), o2.on("close", (w2) => a.close(w2)), o2.on("exit", (w2) => a.exit(w2));
      try {
        await a.result, c3 && await wt2(50), i(a.exitCode);
      } catch (w2) {
        i(a.exitCode, w2);
      }
    }
  };
}
var we2 = $2("", "plugin:binary");
var Hs2 = "Invalid value supplied for custom binary, requires a single string or an array containing either one or two strings";
var Ks2 = "Invalid value supplied for custom binary, restricted characters must be removed or supply the unsafe.allowUnsafeCustomBinary option";
function Vs2(t2) {
  return !t2 || !/^([a-z]:)?([a-z0-9/.\\_~-]+)$/i.test(t2);
}
function Pt2(t2, e) {
  if (t2.length < 1 || t2.length > 2)
    throw new A3(void 0, "binary", Hs2);
  if (t2.some(Vs2))
    if (e)
      we2("permitted unsafe binary %o", t2);
    else
      throw new A3(void 0, "binary", Ks2);
  const [r2, s] = t2;
  return {
    binary: r2,
    prefix: s
  };
}
function Xs2(t2, e = ["git"], n5 = false) {
  let r2 = Pt2(v2(e), n5);
  t2.on("binary", (s) => {
    r2 = Pt2(v2(s), n5), we2.info("reconfiguring %o", r2);
  }), t2.append("spawn.binary", () => r2.binary), t2.append("spawn.args", (s) => r2.prefix ? [r2.prefix, ...s] : s);
}
var be2 = {
  DISALLOWED_ABBREVIATED: {
    text: "disallowed abbreviated or ambiguous option",
    solution: "Unambiguous abbreviated options blocked with unsafe.allowAbbreviatedOptions setting: {message}"
  },
  UNKNOWN: {
    text: "~ unknown ~",
    solution: void 0
  }
};
function Ys2(t2) {
  if (!t2)
    return "UNKNOWN";
  for (const [e, { text: n5 }] of Object.entries(be2))
    if (t2.startsWith(`fatal: ${n5}`))
      return e;
  return "UNKNOWN";
}
var Qs2 = class extends O3 {
  constructor(e = "") {
    const n5 = Ys2(e);
    super(void 0, be2[n5].solution?.replace("{message}", e) ?? e), this.reason = n5;
  }
};
function Js2(t2) {
  return !!(t2.exitCode && t2.stdErr.length);
}
function Zs2(t2) {
  return Buffer.concat([...t2.stdOut, ...t2.stdErr]);
}
function to(t2 = false, e = Js2, n5 = Zs2) {
  return (r2, s) => !t2 && r2 || !e(s) ? r2 : n5(s);
}
function eo(t2, e) {
  return t2 === 128 && e.startsWith("fatal:") ? new Qs2(e) : new O3(void 0, e);
}
function Mt2(t2) {
  return {
    type: "task.error",
    action(e, n5) {
      const r2 = t2(e.error, {
        stdErr: n5.stdErr,
        stdOut: n5.stdOut,
        exitCode: n5.exitCode
      });
      return Buffer.isBuffer(r2) ? {
        error: eo(n5.exitCode, r2.toString("utf-8"))
      } : {
        error: r2
      };
    }
  };
}
var nt2 = $2("", "plugin:input");
function no(t2) {
  return {
    type: "spawn.after",
    action(e, { commands: n5, input: r2, spawned: { stdin: s } }) {
      if (!s)
        return;
      const o2 = t2?.([...n5]) ?? r2;
      if (!o2)
        return nt2("generated zero length content, not writing to stdin");
      nt2("writing %s bytes to stdin", Le2(o2)), s.on("error", (i) => {
        i.code !== "EPIPE" && nt2("[ERROR] stdin error %o", i);
      }), s.end(o2);
    }
  };
}
var ro = class {
  constructor() {
    this.plugins = /* @__PURE__ */ new Set(), this.events = new import_node_events2.EventEmitter();
  }
  on(e, n5) {
    this.events.on(e, n5);
  }
  reconfigure(e, n5) {
    this.events.emit(e, n5);
  }
  append(e, n5) {
    const r2 = S2(this.plugins, { type: e, action: n5 });
    return () => this.plugins.delete(r2);
  }
  add(e) {
    const n5 = [];
    return v2(e).forEach(
      (r2) => {
        r2 && this.plugins.add(S2(n5, r2));
      }
    ), () => {
      n5.forEach((r2) => {
        this.plugins.delete(r2);
      });
    };
  }
  exec(e, n5, r2) {
    let s = n5;
    const o2 = Object.freeze(Object.create(r2));
    for (const i of this.plugins)
      i.type === e && (s = i.action(s, o2));
    return s;
  }
};
function so(t2) {
  const e = "--progress", n5 = ["checkout", "clone", "fetch", "pull", "push"];
  return [{
    type: "spawn.args",
    action(o2, i) {
      return n5.includes(i.method) ? De2(o2, e) : o2;
    }
  }, {
    type: "spawn.after",
    action(o2, i) {
      i.commands.includes(e) && i.spawned.stderr?.on("data", (a) => {
        const c3 = /^([\s\S]+?):\s*(\d+)% \((\d+)\/(\d+)\)/.exec(a.toString("utf8"));
        c3 && t2({
          method: i.method,
          stage: oo(c3[1]),
          progress: p(c3[2]),
          processed: p(c3[3]),
          total: p(c3[4])
        });
      });
    }
  }];
}
function oo(t2) {
  return String(t2.toLowerCase().split(" ", 1)) || "unknown";
}
function io(t2) {
  const e = je2(t2, ["uid", "gid"]);
  return {
    type: "spawn.options",
    action(n5) {
      return { ...e, ...n5 };
    }
  };
}
function ao() {
  return {
    type: "spawn.args",
    action(t2) {
      const e = [];
      let n5;
      function r2(s) {
        (n5 = n5 || []).push(...s);
      }
      for (let s = 0; s < t2.length; s++) {
        const o2 = t2[s];
        if (r(o2)) {
          r2(o(o2));
          continue;
        }
        if (o2 === "--") {
          r2(
            t2.slice(s + 1).flatMap((i) => r(i) && o(i) || i)
          );
          break;
        }
        e.push(o2);
      }
      return n5 ? [...e, "--", ...n5.map(String)] : e;
    }
  };
}
function uo({
  block: t2,
  stdErr: e = true,
  stdOut: n5 = true
}) {
  if (t2 > 0)
    return {
      type: "spawn.after",
      action(r2, s) {
        let o2;
        function i() {
          o2 && clearTimeout(o2), o2 = setTimeout(c3, t2);
        }
        function a() {
          s.spawned.stdout?.off("data", i), s.spawned.stderr?.off("data", i), s.spawned.off("exit", a), s.spawned.off("close", a), o2 && clearTimeout(o2);
        }
        function c3() {
          a(), s.kill(new A3(void 0, "timeout", "block timeout reached"));
        }
        n5 && s.spawned.stdout?.on("data", i), e && s.spawned.stderr?.on("data", i), s.spawned.on("exit", a), s.spawned.on("close", a), i();
      }
    };
}
var wo = (t2, e) => {
  const n5 = new ro(), r2 = Ge2(
    t2 && (typeof t2 == "string" ? { baseDir: t2 } : t2) || {},
    e
  );
  if (!Lt2(r2.baseDir))
    throw new Ae2(
      r2,
      "Cannot use simple-git on a directory that does not exist"
    );
  return Array.isArray(r2.config) && n5.add(qs2(r2.config)), n5.add(zs2(r2.unsafe)), n5.add(Ws2(r2.completion)), r2.abort && n5.add(Is2(r2.abort)), r2.progress && n5.add(so(r2.progress)), r2.timeout && n5.add(uo(r2.timeout)), r2.spawnOptions && n5.add(io(r2.spawnOptions)), n5.add(ao()), n5.add(no(r2.input)), n5.add(Mt2(to(true))), r2.errors && n5.add(Mt2(r2.errors)), Xs2(n5, r2.binary, r2.unsafe?.allowUnsafeCustomBinary), n5.add(
    Fs2(r2.allowEnvironment ?? [], r2.unsafe?.allowAbbreviatedOptions)
  ), new f2(r2, n5);
};

// src/git/history.ts
async function getLatestCommitHash(projectPath) {
  const git = wo(projectPath);
  try {
    const log = await git.log({ maxCount: 1 });
    return log.latest?.hash ?? null;
  } catch {
    return null;
  }
}
async function getRemoteBranchTip(projectPath, branch) {
  const git = wo(projectPath);
  try {
    const hash = await git.raw(["rev-parse", `origin/${branch}`]);
    return hash.trim() || null;
  } catch {
    return null;
  }
}
async function getCurrentBranch(projectPath) {
  const git = wo(projectPath);
  try {
    const branch = await git.raw(["rev-parse", "--abbrev-ref", "HEAD"]);
    const trimmed = branch.trim();
    return trimmed && trimmed !== "HEAD" ? trimmed : null;
  } catch {
    return null;
  }
}
async function isCommitReachableFromBranch(projectPath, commit, branch) {
  const git = wo(projectPath);
  const trimmedCommit = commit.trim();
  if (!trimmedCommit) return false;
  try {
    await git.raw(["cat-file", "-e", `${trimmedCommit}^{commit}`]);
    await git.raw(["merge-base", "--is-ancestor", trimmedCommit, `origin/${branch}`]);
    return true;
  } catch {
    return false;
  }
}
function normaliseRemoteUrl(raw) {
  const trimmed = raw.trim();
  const sshMatch = trimmed.match(/^git@([^:]+):(.+?)(?:\.git)?$/);
  if (sshMatch) {
    return `https://${sshMatch[1]}/${sshMatch[2]}`;
  }
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    try {
      const url = new URL(trimmed);
      url.username = "";
      url.password = "";
      url.search = "";
      url.hash = "";
      url.pathname = url.pathname.replace(/\/+$/, "").replace(/\.git$/, "");
      return url.toString().replace(/\/$/, "");
    } catch {
      return null;
    }
  }
  return null;
}
async function getRepoUrl(projectPath) {
  const git = wo(projectPath);
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
  const git = wo(projectPath);
  try {
    const ref = await git.raw(["symbolic-ref", "refs/remotes/origin/HEAD"]);
    const match2 = ref.trim().match(/^refs\/remotes\/origin\/(.+)$/);
    if (match2) return match2[1];
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
  const git = wo(projectPath);
  const errors = [];
  const warnings = [];
  const remoteRef = `origin/${defaultBranch}`;
  const testDirPatterns = frameworkConfigs.filter((c3) => c3.framework !== "unknown").map((c3) => normaliseRepoPath(c3.testDir));
  const pathspecRoots = [...new Set(testDirPatterns.map(pathPatternRoot))];
  const gitPathspecs = pathspecRoots.every((root) => root !== null) ? pathspecRoots : [];
  let logArgs;
  if (sinceCommit) {
    logArgs = gitPathspecs.length > 0 ? [`${sinceCommit}..${remoteRef}`, "--", ...gitPathspecs] : [`${sinceCommit}..${remoteRef}`];
  } else if (fullHistory) {
    logArgs = [remoteRef];
  } else {
    logArgs = gitPathspecs.length > 0 ? [remoteRef, "--", ...gitPathspecs] : [remoteRef];
  }
  if (sinceDate && !sinceCommit) {
    logArgs = [`--since=${sinceDate.toISOString()}`, ...logArgs];
  }
  let commits;
  try {
    commits = await fetchCommitsWithFiles(git, logArgs, fullHistory ? [] : testDirPatterns);
  } catch (error) {
    if (error instanceof Error) {
      warnings.push(`Git log failed: ${error.message}`);
    }
    return { entries: [], errors, warnings };
  }
  if (commits.length === 0) {
    return { entries: [], errors, warnings };
  }
  console.log(`[sync] Processing ${commits.length} commits.`);
  const BATCH_SIZE = 20;
  const PROGRESS_REPORT_COUNT = 20;
  const MIN_REPORT_INTERVAL = 50;
  const reportEvery = Math.max(MIN_REPORT_INTERVAL, Math.floor(commits.length / PROGRESS_REPORT_COUNT));
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
      console.log(`[sync]   ${processed}/${commits.length} commits processed.`);
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
    "--topo-order",
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
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
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
  return matchesDirectoryPattern(filePath, testDir);
}
function isInAnyTestDir(filePath, testDirs) {
  return testDirs.some((dir) => isInTestDir(filePath, dir));
}
function resolveFrameworkForFile(filePath, frameworkConfigs) {
  let bestMatch = null;
  for (const { framework, testDir } of frameworkConfigs) {
    if (framework === "unknown") continue;
    const normalised = normaliseRepoPath(testDir);
    if (isInTestDir(filePath, normalised)) {
      const specificity = pathPatternSpecificity(normalised);
      if (!bestMatch || specificity > bestMatch.testDirLength) {
        bestMatch = { framework, testDirLength: specificity };
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
    let framework = resolveFrameworkForFile(change.path, frameworkConfigs);
    let effectiveChange = change;
    if (change.status === "renamed" && change.oldPath) {
      const resolvedOld = resolveFrameworkForFile(change.oldPath, frameworkConfigs);
      const oldFramework = resolvedOld && isSpecFile(change.oldPath, resolvedOld) ? resolvedOld : null;
      const newFramework = framework && isSpecFile(change.path, framework) ? framework : null;
      if (!oldFramework && newFramework) {
        effectiveChange = { path: change.path, status: "added" };
      } else if (oldFramework && !newFramework) {
        effectiveChange = { path: change.oldPath, status: "deleted" };
        framework = oldFramework;
      }
    }
    if (!framework || !isSpecFile(effectiveChange.path, framework)) continue;
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
      framework,
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
      framework,
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
      framework,
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
    framework,
    changes: allChanges
  };
}
async function getFileAtCommit(git, ref, filePath) {
  return git.show([`${ref}:${filePath}`]);
}
function isSpecFile(filePath, framework) {
  if (!framework) return /\.(spec|test)\.[jt]s$/.test(filePath);
  return isFrameworkSpecFile(filePath, framework);
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
    const sorted = [...tests].sort((a, b3) => a.line - b3.line);
    const idx = sorted.findIndex((t2) => t2.name === name);
    if (idx === -1) return "";
    const start = sorted[idx].line - 1;
    const end = idx + 1 < sorted.length ? sorted[idx + 1].line - 1 : lines.length;
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
var SyncHttpError = class extends Error {
  constructor(message, status) {
    super(message);
    __publicField(this, "status", status);
  }
};
function isProjectAccessError(errorBody) {
  return /project not found|not in the key/i.test(errorBody);
}
function projectAccessError(projectId) {
  return new Error(
    `Project not found or not available to this API key: ${projectId}. Check that API_KEY belongs to the same team as PROJECT_ID.`
  );
}
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
      headers: makeAuthHeaders(apiToken),
      signal: AbortSignal.timeout(3e4)
    });
    if (response.status === 401 || response.status === 403) {
      throw new Error("Invalid API key. Please check your API_KEY.");
    }
    if (response.status === 404) {
      const errorBody = await response.text().catch(() => "");
      if (isProjectAccessError(errorBody)) {
        throw projectAccessError(projectId);
      }
      console.warn("[sync] Could not fetch project config (404); using auto-detected settings.");
      return;
    }
    if (!response.ok) {
      console.warn(`[sync] Could not validate project access (${response.status}); continuing.`);
    }
  } catch (error) {
    if (error instanceof Error && (error.message.startsWith("Invalid API key") || error.message.startsWith("Project not found"))) {
      throw error;
    }
    console.warn("[sync] Could not reach dashboard to validate project access; continuing.");
  }
}
async function fetchProjectConfig(dashboardUrl, apiToken, projectId) {
  const url = new URL(`/api/projects/${projectId}/config`, dashboardUrl).toString();
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: makeAuthHeaders(apiToken),
      signal: AbortSignal.timeout(3e4)
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
      headers: makeAuthHeaders(apiToken),
      signal: AbortSignal.timeout(3e4)
    });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("Invalid API key. Please check your API_KEY.");
      }
      const errorBody = await response.text().catch(() => "");
      if (response.status === 404 && !isProjectAccessError(errorBody)) return null;
      if (isProjectAccessError(errorBody)) {
        throw projectAccessError(projectId);
      }
      throw new Error(`Failed with status ${response.status}${errorBody ? ` - ${errorBody}` : ""}`);
    }
    const data = await response.json();
    return data?.lastSyncedCommit || data?.commitHash || null;
  } catch (error) {
    if (error instanceof Error && (error.message.startsWith("Invalid API key") || error.message.startsWith("Project not found"))) {
      throw error;
    }
    return null;
  }
}
async function saveSyncMarker(dashboardUrl, apiToken, projectId, commitHash) {
  const url = new URL(`/api/projects/${projectId}/sync-marker`, dashboardUrl).toString();
  const response = await fetch(url, {
    method: "POST",
    headers: makeAuthHeaders(apiToken),
    body: JSON.stringify({ commitHash }),
    signal: AbortSignal.timeout(3e4)
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
  const body = JSON.stringify(payload);
  const MAX_RETRIES = 3;
  const TIMEOUT_MS = 6e4;
  const BASE_BACKOFF_MS = 1e3;
  let lastError = null;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: makeAuthHeaders(apiToken),
        body,
        signal: controller.signal
      });
      if (!response.ok) {
        const errorBody = await response.text().catch(() => "");
        if (response.status === 401 || response.status === 403) {
          throw new Error("Invalid API key. Please check your API_KEY.");
        }
        if (isProjectAccessError(errorBody)) {
          throw projectAccessError(payload.projectId);
        }
        throw new SyncHttpError(
          `Sync failed with status ${response.status}: ${response.statusText}${errorBody ? ` - ${errorBody}` : ""}`,
          response.status
        );
      }
      return await response.json();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (err instanceof SyncHttpError && err.status >= 400 && err.status < 500 && ![408, 429].includes(err.status)) {
        throw err;
      }
      if (lastError.message.startsWith("Invalid API key") || lastError.message.startsWith("Project not found")) {
        throw lastError;
      }
      const isAbort = lastError.name === "AbortError";
      if (isAbort) {
        lastError = new Error(`Upload timed out after ${TIMEOUT_MS / 1e3}s`);
      }
      if (attempt < MAX_RETRIES) {
        const backoffMs = BASE_BACKOFF_MS * 2 ** (attempt - 1);
        console.warn(`[sync] Upload failed; retrying. ${lastError.message}`);
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
      }
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError ?? new Error("Sync failed after retries");
}

// src/sync.ts
var MAX_FIRST_SYNC_DAYS = 365;
var PAYLOAD_SCHEMA_VERSION = "2026-07";
function getSyncSource(env = process.env) {
  return env.GITHUB_ACTIONS === "true" ? "github_actions" : "local_cli";
}
async function resolveLatestCommitHash(projectPath, branch, transformedHistory) {
  const branchTip = await getRemoteBranchTip(projectPath, branch);
  if (branchTip) return branchTip;
  if (transformedHistory.length > 0) {
    return transformedHistory[transformedHistory.length - 1].commitHash;
  }
  const localHead = await getLatestCommitHash(projectPath);
  if (localHead) return localHead;
  throw new Error("Could not determine latest commit hash for sync payload.");
}
async function resolveCurrentBranch(projectPath, defaultBranch, source) {
  const githubRefName = source === "github_actions" ? process.env.GITHUB_REF_NAME?.trim() : void 0;
  if (githubRefName) return githubRefName;
  return await getCurrentBranch(projectPath) ?? defaultBranch;
}
function getChangeKey(change, specPath) {
  const path16 = specPath ?? "";
  const oldName = change.oldName ?? "";
  return `${path16}:${change.type}:${change.name}:${oldName}`;
}
function mapKey(framework, testDir) {
  return `${framework}:${testDir}`;
}
function applyFrameworkOverrides(frameworkMap, overrides) {
  const cleaned = /* @__PURE__ */ new Set();
  for (const override of overrides) {
    if (!override.dirs?.length) continue;
    if (!cleaned.has(override.framework)) {
      for (const [key, config] of frameworkMap) {
        if (config.framework === override.framework) {
          frameworkMap.delete(key);
        }
      }
      cleaned.add(override.framework);
    }
    for (const dir of override.dirs) {
      frameworkMap.set(mapKey(override.framework, dir), {
        framework: override.framework,
        testDir: dir,
        confidence: "high"
      });
      console.log(`[config] ${override.framework}: dashboard override added ${dir}.`);
    }
  }
}
function applyTestDirExcludes(frameworkMap, excludes) {
  for (const excludeDir of excludes) {
    const normalised = normaliseRepoPath(excludeDir);
    for (const [key, config] of frameworkMap) {
      const configDir = normaliseRepoPath(config.testDir);
      if (normalised === "." || configDir === normalised || configDir.startsWith(`${normalised}/`)) {
        frameworkMap.delete(key);
        console.log(`[config] ${config.framework}: excluded ${excludeDir}.`);
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
        oldName: change.oldName,
        framework: spec.framework
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
  uniqueChanges.forEach((c3, i) => {
    if (c3.type === "deleted") {
      const existing = removedByName.get(c3.testName) ?? [];
      existing.push(i);
      removedByName.set(c3.testName, existing);
    }
  });
  const suppressedRemoves = /* @__PURE__ */ new Set();
  uniqueChanges.forEach((c3) => {
    if (c3.type === "added") {
      const removeIndices = removedByName.get(c3.testName);
      if (removeIndices) {
        const crossSpecIdx = removeIndices.find(
          (i) => !suppressedRemoves.has(i) && uniqueChanges[i].specPath !== c3.specPath
        );
        if (crossSpecIdx !== void 0) suppressedRemoves.add(crossSpecIdx);
      }
    }
  });
  return uniqueChanges.filter((_4, i) => !suppressedRemoves.has(i));
}
async function syncProject(options) {
  const { projectId, apiKey, dashboardUrl } = options;
  console.log("[sync] Validating project access.");
  await validateProjectAccess(dashboardUrl, apiKey, projectId);
  const detectedRepoUrl = await getRepoUrl(process.cwd());
  if (detectedRepoUrl) {
    console.log(`[sync] Repository: ${detectedRepoUrl}`);
  }
  const repoUrl = detectedRepoUrl ?? void 0;
  console.log("[config] Fetching project config.");
  let projectConfig = await fetchProjectConfig(dashboardUrl, apiKey, projectId);
  const overrideCount = projectConfig?.frameworkOverrides?.length ?? 0;
  if (projectConfig === null) {
    console.warn("[config] Could not fetch project config; using auto-detected settings.");
  } else if (overrideCount > 0) {
    console.log(`[config] Loaded project config (${overrideCount} framework override(s)).`);
  } else {
    console.log("[config] No project overrides set; using auto-detected settings.");
  }
  const defaultBranch = projectConfig?.defaultBranch ?? await getDefaultBranch(process.cwd());
  console.log(`[sync] Default branch: ${defaultBranch}`);
  const source = getSyncSource();
  const currentBranch = await resolveCurrentBranch(process.cwd(), defaultBranch, source);
  console.log(`[sync] Current branch: ${currentBranch}`);
  console.log("[sync] Detecting frameworks.");
  const detected = detectFrameworks(process.cwd());
  const frameworkMap = new Map(detected.map((d2) => [mapKey(d2.framework, d2.testDir), d2]));
  applyFrameworkOverrides(frameworkMap, projectConfig?.frameworkOverrides ?? []);
  applyTestDirExcludes(frameworkMap, projectConfig?.testDirExcludes ?? []);
  let frameworkConfigs = [...frameworkMap.values()];
  if (frameworkConfigs.length === 0) {
    const primary = projectConfig?.primaryFramework;
    frameworkConfigs = [{ framework: primary ?? "unknown", testDir: "./tests", confidence: "low" }];
    console.log(
      `[config] No frameworks matched after exclusions; using ${frameworkConfigs[0].framework}.`
    );
  }
  for (const { framework, testDir, confidence } of frameworkConfigs) {
    console.log(`[sync]   ${framework}: ${testDir} (${confidence})`);
  }
  console.log("[sync] Parsing test specifications.");
  const specs = parseAllSpecs(process.cwd(), frameworkConfigs);
  const totalTests = specs.reduce((sum, spec) => sum + spec.testCount, 0);
  console.log(`[sync] Found ${specs.length} spec files and ${totalTests} tests.`);
  let lastSyncCommit = null;
  let isFirstSync = false;
  let isRecoveringFromInvalidMarker = false;
  const preflightWarnings = [];
  lastSyncCommit = await getSyncMarker(dashboardUrl, apiKey, projectId);
  if (lastSyncCommit) {
    const markerIsReachable = await isCommitReachableFromBranch(process.cwd(), lastSyncCommit, defaultBranch);
    if (!markerIsReachable) {
      const warning = `Stored sync marker ${lastSyncCommit.substring(
        0,
        7
      )} is not reachable from origin/${defaultBranch}; running a bounded resync.`;
      console.warn(`[sync] ${warning}`);
      preflightWarnings.push(warning);
      lastSyncCommit = null;
      isRecoveringFromInvalidMarker = true;
    }
  }
  isFirstSync = !lastSyncCommit;
  if (isRecoveringFromInvalidMarker) {
    console.log("[sync] Rebuilding bounded history from the repository default branch.");
  } else if (isFirstSync) {
    console.log("[sync] First sync: creating baseline.");
  } else {
    console.log(`[sync] Incremental sync from ${lastSyncCommit.substring(0, 7)}.`);
  }
  console.log("[sync] Building git history.");
  const sinceCommit = isFirstSync ? void 0 : lastSyncCommit;
  const sinceDate = isFirstSync ? new Date(Date.now() - MAX_FIRST_SYNC_DAYS * 864e5) : void 0;
  if (sinceDate) {
    const mode = isRecoveringFromInvalidMarker ? "Bounded resync" : "First sync";
    console.log(`[sync] ${mode}: scanning the last ${MAX_FIRST_SYNC_DAYS} days.`);
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
  console.log(`[sync] Built history for ${history.entries.length} commits.`);
  if (history.errors.length > 0) {
    console.warn(`[sync] ${history.errors.length} commits had processing issues:`);
    history.errors.slice(0, 5).forEach((error) => {
      console.warn(`[sync]   - ${error.commit.substring(0, 7)}: ${error.file} (${error.reason})`);
    });
    if (history.errors.length > 5) {
      console.warn(`[sync]   and ${history.errors.length - 5} more.`);
    }
  }
  if (history.warnings.length > 0) {
    history.warnings.forEach((warning) => {
      console.warn(`[sync] ${warning}`);
    });
  }
  if (history.errors.length > 0 || history.warnings.length > 0) {
    throw new Error("Git history could not be read completely. Resolve the reported issues and retry sync.");
  }
  const tags = /* @__PURE__ */ Object.create(null);
  let parameterizedTestCount = 0;
  specs.forEach((spec) => {
    spec.tests.forEach((test) => {
      test.tags?.forEach((tag) => {
        tags[tag.name] = (tags[tag.name] || 0) + 1;
        if (tag.name === "@parameterized") {
          parameterizedTestCount++;
        }
      });
    });
  });
  const stats = {
    totalSpecs: specs.length,
    totalTests,
    tags,
    parameterizedTestCount
  };
  console.log("[sync] Syncing to dashboard.");
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
        framework: change.framework,
        details: change.oldName ? { old_name: change.oldName } : void 0
      }))
    };
  });
  const HISTORY_CHUNK_SIZE = 100;
  const historyOldestFirst = transformedHistory;
  const totalChunks = Math.max(1, Math.ceil(historyOldestFirst.length / HISTORY_CHUNK_SIZE));
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const latestCommitHash = await resolveLatestCommitHash(process.cwd(), defaultBranch, transformedHistory);
  const commitRangeStart = transformedHistory.length > 0 ? transformedHistory[0].commitHash : latestCommitHash;
  const commitRangeEnd = transformedHistory.length > 0 ? transformedHistory[transformedHistory.length - 1].commitHash : latestCommitHash;
  const syncId = `sync:${projectId}:${timestamp}`;
  const warnings = [...preflightWarnings, ...history.warnings];
  if (totalChunks > 1) {
    console.log(`[sync] Uploading ${totalChunks} batches.`);
  }
  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const isLastChunk = chunkIndex === totalChunks - 1;
    const chunkStart = chunkIndex * HISTORY_CHUNK_SIZE;
    const historyChunk = historyOldestFirst.slice(chunkStart, chunkStart + HISTORY_CHUNK_SIZE);
    await syncToDashboard(dashboardUrl, apiKey, {
      projectId,
      // Only include specs and stats with the first chunk — the server uses
      // the spec list to upsert files and prune stale entries.
      specs: chunkIndex === 0 ? transformedSpecs : [],
      history: historyChunk,
      stats: chunkIndex === 0 ? stats : {},
      timestamp,
      syncId,
      source,
      agentVersion: package_default.version,
      payloadSchemaVersion: PAYLOAD_SCHEMA_VERSION,
      branch: currentBranch,
      repositoryDefaultBranch: defaultBranch,
      latestCommitHash,
      commitRangeStart,
      commitRangeEnd,
      ...repoUrl ? { repoUrl } : {},
      chunkIndex,
      isLastChunk,
      expectedChunkCount: totalChunks,
      warnings
    });
    if (totalChunks > 1) {
      console.log(`[sync]   ${chunkIndex + 1}/${totalChunks} batches uploaded.`);
    }
    if (isLastChunk) {
      console.log(
        `[sync] Done: ${specs.length} specs, ${totalTests} tests, ${history.entries.length} commits synced.`
      );
      console.log(`[sync] Dashboard: ${new URL(`/dashboard/${projectId}`, dashboardUrl).toString()}`);
    } else {
      const newestInChunk = historyChunk[historyChunk.length - 1].commitHash;
      try {
        await saveSyncMarker(dashboardUrl, apiKey, projectId, newestInChunk);
      } catch {
      }
    }
  }
  try {
    const lastHash = latestCommitHash;
    if (!lastHash) {
      console.warn("[sync] Could not determine the last commit hash.");
      return;
    }
    await saveSyncMarker(dashboardUrl, apiKey, projectId, lastHash);
    if (isRecoveringFromInvalidMarker) {
      console.log(`[sync] Rebuilt sync marker: ${lastHash.substring(0, 7)}.`);
    } else if (isFirstSync) {
      console.log(`[sync] Created baseline: ${specs.length} files, ${totalTests} tests.`);
    } else {
      console.log(`[sync] Updated sync marker: ${lastHash.substring(0, 7)}.`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.warn(`[sync] Could not save sync marker: ${error.message}`);
    }
  }
}

// src/config.ts
init_cjs_shims();
var import_fs4 = __toESM(__nccwpck_require__(896));
var import_path12 = __toESM(__nccwpck_require__(928));
var DEFAULT_DASHBOARD_URL = "https://www.testchronicle.com";
var PROJECT_CONFIG_FILE = "testchronicle.config.json";
function normaliseDashboardUrl(value) {
  return value.trim().replace(/\/$/, "");
}
function projectConfigPath(projectDir = process.cwd()) {
  return import_path12.default.join(projectDir, PROJECT_CONFIG_FILE);
}
function readProjectConfig(projectDir = process.cwd()) {
  const configPath = projectConfigPath(projectDir);
  if (!import_fs4.default.existsSync(configPath)) return null;
  const parsed = JSON.parse(import_fs4.default.readFileSync(configPath, "utf8"));
  if (!parsed || typeof parsed.projectId !== "string" || !parsed.projectId.trim()) {
    throw new Error(`${PROJECT_CONFIG_FILE} must include projectId`);
  }
  return {
    projectId: parsed.projectId.trim()
  };
}
function writeProjectConfig(config, projectDir = process.cwd()) {
  const payload = {
    projectId: config.projectId.trim()
  };
  import_fs4.default.writeFileSync(projectConfigPath(projectDir), `${JSON.stringify(payload, null, 2)}
`, "utf8");
}
function resolveEnvCredentials(env) {
  const projectId = env.PROJECT_ID?.trim();
  const apiKey = env.API_KEY?.trim();
  if (!projectId || !apiKey) return null;
  return {
    projectId,
    apiKey,
    dashboardUrl: normaliseDashboardUrl(env.CHRONICLE_DASHBOARD_URL || DEFAULT_DASHBOARD_URL),
    source: "env"
  };
}
function dashboardUrlFromEnv(env) {
  return normaliseDashboardUrl(env.CHRONICLE_DASHBOARD_URL || DEFAULT_DASHBOARD_URL);
}

// src/credentials.ts
init_cjs_shims();
var import_fs5 = __toESM(__nccwpck_require__(896));
var import_os = __toESM(__nccwpck_require__(857));
var import_path13 = __toESM(__nccwpck_require__(928));
function appConfigDir() {
  if (process.env.TESTCHRONICLE_CONFIG_HOME) return process.env.TESTCHRONICLE_CONFIG_HOME;
  if (process.platform === "win32" && process.env.APPDATA) {
    return import_path13.default.join(process.env.APPDATA, "TestChronicle");
  }
  if (process.platform === "darwin") {
    return import_path13.default.join(import_os.default.homedir(), "Library", "Application Support", "TestChronicle");
  }
  return import_path13.default.join(process.env.XDG_CONFIG_HOME || import_path13.default.join(import_os.default.homedir(), ".config"), "testchronicle");
}
function credentialsPath() {
  return import_path13.default.join(appConfigDir(), "credentials.json");
}
function emptyStore() {
  return { credentials: [] };
}
function readStore() {
  const filePath = credentialsPath();
  if (!import_fs5.default.existsSync(filePath)) return emptyStore();
  const parsed = JSON.parse(import_fs5.default.readFileSync(filePath, "utf8"));
  return { credentials: Array.isArray(parsed.credentials) ? parsed.credentials : [] };
}
function writeStore(store) {
  const filePath = credentialsPath();
  import_fs5.default.mkdirSync(import_path13.default.dirname(filePath), { recursive: true, mode: 448 });
  import_fs5.default.writeFileSync(filePath, `${JSON.stringify(store, null, 2)}
`, { encoding: "utf8", mode: 384 });
  try {
    import_fs5.default.chmodSync(filePath, 384);
  } catch {
  }
}
function credentialKey(config) {
  return config.projectId;
}
function saveCredential(config, token) {
  const store = readStore();
  const key = credentialKey(config);
  const next = {
    projectId: config.projectId,
    token,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  store.credentials = store.credentials.filter((credential) => credentialKey(credential) !== key);
  store.credentials.push(next);
  writeStore(store);
}
function readCredential(config) {
  const store = readStore();
  return store.credentials.find((credential) => credentialKey(credential) === credentialKey(config))?.token ?? null;
}
function removeCredential(config) {
  const store = readStore();
  const before = store.credentials.length;
  store.credentials = store.credentials.filter((credential) => credentialKey(credential) !== credentialKey(config));
  if (store.credentials.length === before) return false;
  writeStore(store);
  return true;
}
function resolveLocalCredentials(config, dashboardUrl = DEFAULT_DASHBOARD_URL) {
  const token = readCredential(config);
  if (!token) return null;
  return {
    projectId: config.projectId,
    dashboardUrl,
    apiKey: token,
    source: "local"
  };
}

// src/cli-login.ts
init_cjs_shims();
function getCauseCode(error) {
  const cause = error instanceof Error && "cause" in error ? error.cause : void 0;
  if (!cause || typeof cause !== "object" || !("code" in cause)) return null;
  const code = cause.code;
  return typeof code === "string" && /^[A-Z0-9_]+$/.test(code) ? code : null;
}
function loginNetworkError(message, dashboardUrl, error) {
  const code = getCauseCode(error);
  const wrapped = new Error(
    `${message} at ${dashboardUrl}. Check --dashboard-url or CHRONICLE_DASHBOARD_URL.${code ? ` (${code})` : ""}`
  );
  wrapped.cause = error;
  return wrapped;
}
async function startBrowserLogin(dashboardUrl, request) {
  let response;
  try {
    response = await fetch(new URL("/api/cli-login/start", dashboardUrl), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      signal: AbortSignal.timeout(3e4)
    });
  } catch (error) {
    throw loginNetworkError("Could not reach Test Chronicle login", dashboardUrl, error);
  }
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Failed to start login (${response.status})${body ? ` - ${body}` : ""}`);
  }
  return await response.json();
}
async function pollBrowserLogin(dashboardUrl, deviceCode) {
  let response;
  try {
    response = await fetch(new URL("/api/cli-login/poll", dashboardUrl), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceCode }),
      signal: AbortSignal.timeout(3e4)
    });
  } catch (error) {
    throw loginNetworkError("Could not reach Test Chronicle login status", dashboardUrl, error);
  }
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Failed to poll login (${response.status})${body ? ` - ${body}` : ""}`);
  }
  return await response.json();
}

// src/cli.ts
function sleep(ms3) {
  return new Promise((resolve) => setTimeout(resolve, ms3));
}
function getFlag(args, name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] && !args[index + 1].startsWith("--") ? args[index + 1] : "";
}
function hasFlag(args, name) {
  return args.includes(name);
}
function dashboardUrlFromArgsOrEnv(ctx) {
  return (getFlag(ctx.argv, "--dashboard-url") || dashboardUrlFromEnv(ctx.env) || DEFAULT_DASHBOARD_URL).replace(
    /\/$/,
    ""
  );
}
function printHelp() {
  console.log(`Test Chronicle CLI

Usage:
  testchronicle login [--no-open]
  testchronicle sync
  testchronicle status
  testchronicle logout [--remove-config]

Environment overrides:
  API_KEY, PROJECT_ID

Local config:
  ${PROJECT_CONFIG_FILE}`);
}
function openBrowser(url) {
  const command = process.platform === "win32" ? { file: "cmd", args: ["/c", "start", "", url] } : process.platform === "darwin" ? { file: "open", args: [url] } : { file: "xdg-open", args: [url] };
  const child = (0, import_child_process.execFile)(command.file, command.args, { windowsHide: true }, () => {
  });
  child.unref();
}
async function resolveSyncCredentials(ctx) {
  const dashboardUrl = dashboardUrlFromArgsOrEnv(ctx);
  const envCredentials = resolveEnvCredentials(ctx.env);
  if (envCredentials) {
    return {
      ...envCredentials,
      dashboardUrl
    };
  }
  const projectConfig = readProjectConfig(ctx.cwd);
  if (!projectConfig) {
    throw new Error(
      `No Test Chronicle project is linked. Run "npx testchronicle@latest login" or set API_KEY and PROJECT_ID.`
    );
  }
  const localCredentials = resolveLocalCredentials(projectConfig, dashboardUrl);
  if (!localCredentials) {
    throw new Error(
      [
        `Project ${projectConfig.projectId} is linked, but no local credential is stored.`,
        'Run "npx testchronicle@latest login" to link this machine, or set API_KEY and PROJECT_ID.'
      ].join("\n")
    );
  }
  return localCredentials;
}
async function runSync(ctx) {
  const { source, ...options } = await resolveSyncCredentials(ctx);
  console.log(`[cli] Using ${source === "env" ? "environment" : "local project"} credentials.`);
  try {
    await syncProject(options);
  } catch (error) {
    if (source === "local" && error instanceof Error && error.message.startsWith("Invalid API key")) {
      throw new Error(
        [
          "Local project credential was rejected by the dashboard.",
          'Run "npx testchronicle@latest login" again to refresh the local link.',
          'If you are testing against a local dashboard, pass "--dashboard-url" or set CHRONICLE_DASHBOARD_URL.'
        ].join("\n")
      );
    }
    throw error;
  }
}
async function runLogin(ctx) {
  const dashboardUrl = dashboardUrlFromArgsOrEnv(ctx);
  const repoUrl = await getRepoUrl(ctx.cwd);
  const projectName = import_path14.default.basename(ctx.cwd);
  const session = await startBrowserLogin(dashboardUrl, {
    projectName,
    ...repoUrl ? { repoUrl } : {}
  });
  console.log(`[login] Open this URL to approve local sync:
${session.approveUrl}`);
  if (!hasFlag(ctx.argv, "--no-open")) {
    try {
      openBrowser(session.approveUrl);
    } catch {
      console.warn("[login] Could not open a browser automatically.");
    }
  }
  const expiresAt = new Date(session.expiresAt).getTime();
  const intervalMs = Math.max(1, session.pollIntervalSeconds ?? 2) * 1e3;
  console.log("[login] Waiting for browser approval.");
  while (Date.now() < expiresAt) {
    await sleep(intervalMs);
    const result = await pollBrowserLogin(dashboardUrl, session.deviceCode);
    if (result.status === "pending") continue;
    if (result.status === "approved" && result.projectId) {
      const linkedConfig = {
        projectId: result.projectId
      };
      writeProjectConfig(linkedConfig, ctx.cwd);
      saveCredential(linkedConfig, session.deviceCode);
      console.log(`[login] Linked project: ${linkedConfig.projectId}`);
      console.log(`[login] Config saved: ${projectConfigPath(ctx.cwd)}`);
      console.log(`[login] Credential saved: ${credentialsPath()}`);
      console.log("[login] Next: npx testchronicle@latest sync");
      return;
    }
    throw new Error(`Login ${result.status}`);
  }
  throw new Error("Login expired before approval");
}
function runStatus(ctx) {
  const dashboardUrl = dashboardUrlFromArgsOrEnv(ctx);
  const hasDashboardOverride = !!ctx.env.CHRONICLE_DASHBOARD_URL || !!getFlag(ctx.argv, "--dashboard-url");
  const envCredentials = resolveEnvCredentials(ctx.env);
  if (envCredentials) {
    console.log("Test Chronicle status");
    console.log(`  Source: environment`);
    console.log(`  Project: ${envCredentials.projectId}`);
    if (hasDashboardOverride) console.log(`  Dashboard: ${dashboardUrl}`);
    return;
  }
  const projectConfig = readProjectConfig(ctx.cwd);
  if (!projectConfig) {
    console.log("No Test Chronicle project linked.");
    return;
  }
  const hasCredential = !!resolveLocalCredentials(projectConfig, dashboardUrl);
  console.log("Test Chronicle status");
  console.log(`  Source: local project`);
  console.log(`  Project: ${projectConfig.projectId}`);
  if (hasDashboardOverride) console.log(`  Dashboard: ${dashboardUrl}`);
  console.log(`  Credential: ${hasCredential ? "stored" : "missing"}`);
}
function runLogout(ctx) {
  const projectConfig = readProjectConfig(ctx.cwd);
  if (!projectConfig) {
    console.log("[logout] No Test Chronicle project linked.");
    return;
  }
  const removed = removeCredential(projectConfig);
  console.log(removed ? "[logout] Credential removed." : "[logout] No stored credential found.");
  if (hasFlag(ctx.argv, "--remove-config")) {
    const configPath = projectConfigPath(ctx.cwd);
    if (import_fs6.default.existsSync(configPath)) {
      import_fs6.default.unlinkSync(configPath);
      console.log(`[logout] Config removed: ${configPath}`);
    } else {
      console.log("[logout] No local config found.");
    }
  }
}
async function runCli(ctx) {
  const command = ctx.argv[0] ?? "sync";
  switch (command) {
    case "sync":
      await runSync(ctx);
      return;
    case "login":
      await runLogin(ctx);
      return;
    case "status":
      runStatus(ctx);
      return;
    case "logout":
      runLogout(ctx);
      return;
    case "--help":
    case "-h":
    case "help":
      printHelp();
      return;
    default:
      throw new Error(`Unknown command: ${command}`);
  }
}
async function main() {
  try {
    await runCli({
      argv: process.argv.slice(2),
      env: process.env,
      cwd: process.cwd()
    });
    process.exitCode = 0;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error:", message);
    process.exitCode = 1;
  }
}
if (require.main === require.cache[eval('__filename')]) {
  main();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);
//# sourceMappingURL=cli.js.map

/***/ }),

/***/ 48:
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

/***/ 434:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 896:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 943:
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

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

/***/ 203:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 193:
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ 18:
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 16:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 23:
/***/ ((module) => {

"use strict";
module.exports = require("util");

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
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
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
/******/ 	/* webpack/runtime/asset-relocator-loader */
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(666);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;