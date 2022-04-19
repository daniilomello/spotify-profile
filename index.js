require('dotenv').config();
const express = require('express');
const app = express();
const port = 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

app.get('/', (req, res) => {
  const data = {
    name: 'Danilo Mello',
    isAwesome: true,
  };

  res.json(data);
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
