const express = require("express");

const router = express.Router();

const loginRoutes = require("./controllers/login");
const authRoutes = require("./controllers/auth");
const LobbyRoutes = require("./controllers/lobby");
// const interviewRoutes = require("./controllers/interview");

// router.use("/interview", interviewRoutes);
router.use("/auth", authRoutes);
router.use("/login", loginRoutes);
router.use("/lobby", LobbyRoutes);

module.exports = router;
