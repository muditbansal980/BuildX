const express = require("express")
const router = express.Router()
const { requireAuth } = require("@clerk/express");
const {handleuser,handlecandidate,handlecompany} = require("../controller/user")
router.post("/", requireAuth(),handleuser)
router.put("/candidate", requireAuth(),handlecandidate)
router.put("/company", requireAuth(),handlecompany)
module.exports=router;