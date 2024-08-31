// Run this script to generate a new rule

import { RULE_PROMPT } from "../constants";
import forge from "../forge/client";
import fs from "node:fs";

const OUT_DIR = "./rules";
const RULE_FILE = "./current-rule.txt";

const rule = await forge.ttwrules.query(RULE_PROMPT);
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);
const id = crypto.randomUUID();
await Promise.all([
  fs.promises.writeFile(`${OUT_DIR}/${id}.ts`, rule.fileContent),
  fs.promises.writeFile(RULE_FILE, id),
]);
