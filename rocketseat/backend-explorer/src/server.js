require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const express = require("express");
const routes = require("./routes");
migrationsRun();
const app = express();

app.use(express.json());
app.use(routes);


app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
