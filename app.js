const express = require("express");
const products = require("./data");
const app = express();

app.get("/products", (request, response) => {
  response.json(products);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});
