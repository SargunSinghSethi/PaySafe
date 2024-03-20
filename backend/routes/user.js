const express = require("express");
const router = express.Router();
const z = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authMiddleware = require("../middleware");

const signupBody = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastname: z.string(),
  password: z.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res
      .status(411)
      .json({ message: "Email already taken / Incorrect inputs" });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return res
      .status(411)
      .json({ message: "Email already taken / Incorrect inputs" });
  }
  const newUser = await User.create({
    username: req.body.username,
    firstname: req.body.firstName,
    lastname: req.body.lastname,
    password: req.body.password,
  });

  const userId = newUser._id;
  const account = await Account.create({
    userId: newUser._id,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(userId, JWT_SECRET);
  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

const signinBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (!existingUser) {
    return res.status(411).json({ message: "Error while logging in" });
  }
  const userId = existingUser._id;
  const token = jwt.sign(userId, JWT_SECRET);
  res.status(200).json({
    token: token,
  });
});

const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastname: z.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res
      .status(411)
      .json({ message: "Error while updating information" });
  }
  await User.updateOne({ _id: req.userId }, req.body);
  res.status(200).json({
    message: "Updated successfully",
  });
});

router.get("/bulk", authMiddleware, (req, res) => {
  const filter = req.query.filter || "";
  const users = User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });
  res.status(200).json({
    users: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

module.exports = router;
