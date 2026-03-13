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

// src/action.ts
var import_child_process = require("child_process");
var path = __toESM(require("path"));
async function run() {
  try {
    const apiKey = process.env["INPUT_API-KEY"];
    const projectId = process.env["INPUT_PROJECT-ID"];
    const dashboardUrl = process.env["INPUT_DASHBOARD-URL"];
    if (!apiKey) {
      throw new Error("api-key input is required");
    }
    if (!projectId) {
      throw new Error("project-id input is required");
    }
    console.log("\u{1F680} Starting Test Chronicle Agent...");
    console.log(`\u{1F4E6} Project ID: ${projectId}`);
    const env = {
      ...process.env,
      CHRONICLE_API_KEY: apiKey,
      CHRONICLE_PROJECT_ID: projectId
    };
    if (dashboardUrl) {
      env.CHRONICLE_DASHBOARD_URL = dashboardUrl;
    }
    try {
      const cliPath = path.join(__dirname, "cli-bundle", "index.js");
      (0, import_child_process.execSync)(`node ${cliPath} sync`, {
        env,
        stdio: "inherit"
      });
    } catch (syncError) {
      throw new Error(`Sync command failed: ${syncError instanceof Error ? syncError.message : String(syncError)}`);
    }
    console.log("\u2705 Test Chronicle Agent sync completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("\u274C Test Chronicle Agent failed:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
run();
//# sourceMappingURL=action.js.map