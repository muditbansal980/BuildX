const express = require("express")
const router = express.Router()
const {handleuser,handlecandidate,handlecompany,getUserRole} = require("../controller/user")
router.post("/", handleuser)
router.get("/profile", getUserRole)
router.put("/candidate", handlecandidate)
router.put("/company", handlecompany)
module.exports=router;