const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  async createUser(req, res) {
    const { name, email, password } = req.body;

    const db = await sqliteConnection();
    const checkUser = await db.get("SELECT * FROM users WHERE email = (?)", [
      email,
    ]);

    if (checkUser) {
      throw new AppError("User already exists", 400);
    }

    if (!name || !email || !password) {
      throw new AppError("Missing name, email or password", 400);
    }

    const hashedPassword = await hash(password, 8);

    await db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashedPassword,
    ]);

    res.status(201).json();
  }

  async updateUser(req, res) {
    const { name, email, password, old_password } = req.body;
    const { id } = req.params;

    const db = await sqliteConnection();
    const user = await db.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const checkEmail = await db.get("SELECT * FROM users WHERE email = (?)", [
      email,
    ]);

    if (checkEmail && checkEmail.id !== user.id) {
      throw new AppError("Email already in use", 400);
    }

    //if (!name || !email) {
    //  throw new AppError("Missing name, email", 400);
    //}

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Missing old password", 400);
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password does not match", 400);
      }

      user.password = await hash(password, 8);
    }

    await db.run(
      "UPDATE users SET name = (?), email = (?), password = (?), updated_at = DATETIME('now') WHERE id = (?)",
      [name, email, user.password, id]
    );

    res.status(200).json();
  }

  getUser(req, res) {
    res.send('ok')
  }

}

module.exports = UsersController;
