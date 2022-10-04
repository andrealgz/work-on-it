const express = require("express")
const router = express.Router();

const { professional } = require("../controllers") 

router.get("/user/professional", professional.getAllProfessional)
router.get("/user/professional/:id", professional.getProfessional)


module.exports = router;