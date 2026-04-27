const express = require('express');
const multer = require('multer');
const AdmZip = require('adm-zip');
const fs = require('fs');
const app = express();
const upload = multer({ dest: 'uploads/' });

if (!fs.existsSync('sites')) fs.mkdirSync('sites');
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

app.use(express.static('public'));

app.post('/upload', upload.single('zipfile'), (req, res) => {
  const name = req.body.sitename.toLowerCase().replace(/[^a-z0-9]/gi, '');
  if (!name) return res.send('Bhai naam to daal 😅');
  
  const zip = new AdmZip(req.file.path);
  zip.extractAllTo(`./sites/${name}`, true);
  fs.unlinkSync(req.file.path);
  
  res.send(`Ho gaya 🚀 Teri site: <a href="/sites/${name}/" target="_blank">/sites/${name}/</a>`);
});

app.use('/sites', express.static('sites'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server chalu hai bhai'));
