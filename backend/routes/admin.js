const express = require("express")
const router = express.Router()
const { requireAuth } = require("@clerk/express");
const {handlejob} = require("../controller/admin")
router.post("/job", requireAuth(),handlejob)
module.exports=router;