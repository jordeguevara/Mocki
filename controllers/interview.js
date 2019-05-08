const express = require("express");
const router = express.Router();

const Interview = require("../models/Interview");

const InterviewService = () => {
  Interview.findOne({ InterviewId: id }).then(() => {});
};

router.post("/interview", (req, res) => {
  InterviewService();
  res.send({ id: 1 });
});

module.exports = router;
