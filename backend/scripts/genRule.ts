// Run this script to generate a new rule

import { RULE_PROMPT } from "../constants";
import forge from "../forge/client";
import fs from "fs";

const OUT_DIR = "./rules";

const rule = await forge.ttwrules.query(RULE_PROMPT);
fs.writeFileSync(`${OUT_DIR}/${crypto.randomUUID()}.ts`, rule.fileContent);
