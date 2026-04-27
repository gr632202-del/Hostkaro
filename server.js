const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Ye line important hai - public folder use kar
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
