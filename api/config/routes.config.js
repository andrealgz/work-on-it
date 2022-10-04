const express = require("express")
const router = express.Router();

const { services, user } = require("../controllers") 

router.get("/services", services.getAllServices)
router.get("/services/:id", services.getService)
router.post("/services/create", services.createService)

router.post("/user/create", user.createUser)


module.exports = router;