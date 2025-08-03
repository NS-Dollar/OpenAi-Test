import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

function appendJson(file, obj) {
  const filePath = path.join(dataDir, file);
  let arr = [];
  if (fs.existsSync(filePath)) arr = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  arr.push(obj);
  fs.writeFileSync(filePath, JSON.stringify(arr, null, 2));
}

app.post('/api/contact', (req, res) => {
  appendJson('contacts.json', { ...req.body, date: new Date().toISOString() });
  res.json({ ok: true });
});

app.post('/api/newsletter', (req, res) => {
  appendJson('newsletter.json', { ...req.body, date: new Date().toISOString() });
  res.json({ ok: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
