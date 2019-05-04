const express = require("express");
const router = express.Router();
const User = require("../models/user-model");

const loginService = userData => {
  User.findOne({ email: userData.email, password: userData.password }).then(
    () => {}
  );
};

router.get("/:id", (req, res) => {
  res.send({ data: "success" });
});

router.post("/manual", (req, res) => {
  res.send({ account: "sucesss" });
});

router.post("/", (req, res) => {
  const body = req.body;
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(body));
});

module.exports = router;
