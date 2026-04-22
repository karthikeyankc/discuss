import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const adminIndex = path.join(__dirname, 'public/admin/index.html');

console.log("Current file dir:", __dirname);
console.log("Target file path:", adminIndex);
console.log("File exists?", fs.existsSync(adminIndex));
