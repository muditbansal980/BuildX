const express = require("express");
const router = express.Router();
const { requireAuth } = require("@clerk/express");
const { handleEvent } = require("../controller/event");

router.get("/", requireAuth(), handleEvent);

module.exports = router;