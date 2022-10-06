const express = require("express");
const router = express.Router();

const { services, users, orders, auth } = require("../controllers") ;
const { secure } = require("../middlewares")

router.post("/register", auth.register);
router.post("/login", auth.login);
router.delete("/logout", auth.logout);


router.get("/user/:id", users.getUser);
//router.patch("/user/:id", users.updateUser);
router.get("/user/:id/orders", users.getOrders);

router.get("/services", secure.isLogged, services.getAllServices);
router.get("/services/:id", services.getService);
router.post("/services/create", secure.isLogged, services.createService);

router.post("/orders", orders.createOrders);
router.get("/orders", secure.isAdmin, orders.getAllOrders);
router.get("/orders/:id", orders.getOrder);

module.exports = router;