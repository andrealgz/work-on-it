const express = require("express");
const router = express.Router();

const { services, user, orders } = require("../controllers") ;

router.get("/services", services.getAllServices);
router.get("/services/:id", services.getService);
router.post("/services/create", services.createService);

router.get("/user/:id", user.getUser);
//router.patch("/user/:id", user.updateUser);
router.get("/user/:id/orders", user.getOrders);
router.post("/user/create", user.createUser);

router.post("/orders", orders.createOrders)

module.exports = router;