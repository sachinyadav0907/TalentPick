import User from "../Model/userAuth.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { generateToken } from "../Utility/generateToken.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });
    const { fullName, email, password,role } = req.body;
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.status(409).json({ message: "Username already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role
    });

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ Message: "Regitered successfully" });
  } catch (error) {
    res.status(500).json({ message: error});
  }
};

export const login = async (req,res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch)
      return res.status(401).json({ message: "Username or password is wrong" });
    const token = generateToken(userExist);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ token ,Message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
