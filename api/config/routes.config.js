const express = require("express");
const router = express.Router();

const { services, users, orders, auth, messages } = require("../controllers") ;
const { secure } = require("../middlewares")

router.post("/register", auth.register);
router.post("/login", auth.login);
router.delete("/logout", auth.logout);

router.get("/user", secure.isAdmin, users.getUser);
router.get("/user/:nickName", users.getUser);
//router.patch("/user/:id", users.updateUser);

router.get("/services", services.getServices);
router.get("/services/:id", services.getServices);
router.post("/services/create", secure.isLogged, services.createService);

router.post("/orders", orders.createOrders);
router.get("/orders", secure.isAdmin, orders.getOrders);
router.get("/orders/:id", orders.getOrders);

module.exports = router;