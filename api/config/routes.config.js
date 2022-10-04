const express = require("express")
const router = express.Router();

const { professional } = require("../controllers") 


router.get("/user/professional", professional.getAllProfessional)


module.exports = router;