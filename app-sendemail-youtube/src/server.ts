import express from "express";
import UserController from "./controllers/UserController";
const app = express();

const port = 3000;

app.get("/users", UserController.findAll);

app.get("/user", (req, res) => {
  req.body = {
    name: "John Doe",
    email: "johndoe@gmail.com"
  };

  return UserController.create(req, res);
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
