const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('✅ Received GET /');
  res.send('Hello World');
});

app.listen(5000, () => {
  console.log('✅ Test server running on http://localhost:5000');
});