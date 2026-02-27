const express = require("express");
const router = express.Router();
const { handleEvent,handleyourevents } = require("../controller/event");

router.get("/", handleEvent);
router.get("/your-events", handleyourevents);

module.exports = router;