// const { response, request } = require("express");
const express = require("express");
const db = require("./db/models");
const productRoutes = require("./routes/products");
const cors = require("cors");

// let products = require("./data");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

db.sequelize.sync();

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

const PORT = 8000;
app.listen(8000);
