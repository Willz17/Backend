require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const places_router = require("./routes/places-routes");
const users_router = require("./routes/users-routes");

const app = express();
const PORT = 4500;

app.use(express.json());
console.log(__dirname);
app.use(express.static(path.join(__dirname, "www")));
app.use(express.static(path.join(__dirname, "www", "js")));

// mongoose.connect(process.env.DATABASE_URL);

// const db = mongoose.connection;

// db.on("error", (error) => {
//   console.error(error);
// });

// db.once("open", () => {
//   console.log("Connected to DB");
// });

// "api/places"
app.use("/api/places", places_router);

app.use("/api/users", users_router);

app.get("/index", (req, res, next) => {
  res.sendFile(path.join(__dirname, "www", "index.html"));
});

// error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message } || "An Unknown error occured");
});

app.listen(PORT, () => {
  console.log(`Running @ http://localhost:${PORT}/index`);
});
