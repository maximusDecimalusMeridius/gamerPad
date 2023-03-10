const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use("/users", userRoutes);

const accountRoutes = require("./accountRoutes");
router.use("/accounts", accountRoutes);

const noteRoutes = require("./noteRoutes");
router.use("/notes", noteRoutes);

const gameRoutes = require("./gameRoutes");
router.use("/games", gameRoutes);

const friendRoutes = require("./friendRoutes");
router.use("/friends", friendRoutes);

module.exports = router;