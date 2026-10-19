import fs from "node:fs";
import path from "node:path";
import type { StoreData } from "./types";

const storePath = path.join(process.cwd(), "data", "iris.json");

let memory: StoreData | undefined;
let persistEnabled = true;

function emptyStore(): StoreData {
  return {
    admins: [],
    articles: [],
    nextAdminId: 1,
    nextArticleId: 1,
  };
}

function isProductionBuild() {
  return process.env.NEXT_PHASE === "phase-production-build";
}

function readFromDisk(): StoreData | undefined {
  try {
    if (!fs.existsSync(/* turbopackIgnore: true */ storePath)) return undefined;
    const raw = fs.readFileSync(/* turbopackIgnore: true */ storePath, "utf8");
    return JSON.parse(raw) as StoreData;
  } catch {
    return undefined;
  }
}

function writeToDisk(data: StoreData) {
  if (!persistEnabled || isProductionBuild()) return;
  try {
    fs.mkdirSync(/* turbopackIgnore: true */ path.join(process.cwd(), "data"), { recursive: true });
    fs.writeFileSync(/* turbopackIgnore: true */ storePath, JSON.stringify(data, null, 2), "utf8");
  } catch {
    persistEnabled = false;
  }
}

export function getStore(): StoreData {
  if (!memory) {
    memory = readFromDisk() ?? emptyStore();
  }
  return memory;
}

export function saveStore() {
  if (!memory) return;
  writeToDisk(memory);
}

export function resetStoreForTests(data?: StoreData) {
  memory = data ?? emptyStore();
}
