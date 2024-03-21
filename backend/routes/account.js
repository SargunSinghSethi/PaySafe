const express = require("express");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/balance", async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    return res.status(411).json({
      message: "Error while processing data",
    });
  }
  const existingAccount = await Account.findOne({
    userId: userId,
  });
  if (!existingAccount) {
    return res.status(403).json({
      message: "Account Credentails Invalid",
    });
  }
  res.status(200).json({
    balance: existingAccount.balance,
  });
});

router.post("/transfer", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId });
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to.userId });
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to.userId },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();

  res.status(200).json({
    message: "Transaction Successful",
  });
});

module.exports = router;
