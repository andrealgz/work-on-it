const express = require("express");
const router = express.Router();

const { services, users, orders } = require("../controllers") ;

router.get("/user/:id", users.getUser);
//router.patch("/user/:id", users.updateUser);
router.get("/user/:id/orders", users.getOrders);
router.post("/user/create", users.createUser);

router.get("/services", services.getAllServices);
router.get("/services/:id", services.getService);
router.post("/services/create", services.createService);

router.post("/orders", orders.createOrders);
router.get("/orders", orders.getAllOrders);
router.get("/orders/:id", orders.getOrder);

module.exports = router;