const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mongoose } = require("../db/conn");

// helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    if (!name || !email || !phone || !password || !confirmpassword) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      name,
      email,
      phone,
      password: hashedPassword,
    };
    try {
      const newUser = await User.create(user);

      await createUserToken(newUser, req, res);

      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "secret");

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;


    if (!id.match(/^[0-9a-fA-F]{24}$/)){
      res.status(422).json({"message":" User not found!"});
      return
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({user});
  }

  static async editUser(req, res) {
    const id = req.params.id;

    const token = getToken(req);
    const user = await getUserByToken(token); 

    const { name, email, phone, password, confirmpassword } = req.body;

    if (req.file) {
        user.image = req.file.filename;
    }

    if (!id.match(/^[0-9a-fA-F]{24}$/)){
      res.status(422).json({"message":" User not found!"});
      return
    }

    if(!name) {
      return res.status(400).json({ message: "name is required" });
    }

    user.name = name;

    if(!email) {
      return res.status(400).json({ message: "email is required" });
    }

    const userExists = await User.findOne({ email: email });

    if(user.email !== email && userExists) {
      return res.status(400).json({ message: "email already exists" });
    }

    user.email = email;

    if(!phone || !password || !confirmpassword){
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    user.phone = phone;

    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    } else if(password === confirmpassword && password !== null) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    } 

    try {
      await User.findByIdAndUpdate(
        { _id: user.id },
        { $set: user },
        { new: true }
      )

      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
};
