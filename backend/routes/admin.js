const express = require("express")
const router = express.Router()
const {handlejob} = require("../controller/admin")
router.post("/job", handlejob)
module.exports=router;