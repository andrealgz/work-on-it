const express = require("express")
const router = express.Router();

const { services } = require("../controllers") 

router.get("/user/professional", services.getAllServices)
router.get("/user/professional/:id", services.getService)


module.exports = router;