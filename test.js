const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('API is live');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Test server running at http://localhost:${PORT}`);
});