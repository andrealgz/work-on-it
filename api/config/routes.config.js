const express = require("express");
const router = express.Router();

const { services, users, orders, auth, messages } = require("../controllers");
const { secure } = require("../middlewares");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.delete("/logout", secure.isLogged, auth.logout);

router.get("/users", secure.isLogged, secure.isAdmin, users.getUser);
router.get("/users/:nickName", secure.isLogged, users.getUser);
//router.patch("/user/:nickName", secure.isLogged, users.updateUser);

router.get("/services", services.getServices);
router.get("/services/:id", secure.isLogged, services.getServices);
router.post("/services/create", secure.isLogged, services.createService);

router.get("/orders", secure.isAdmin, orders.getOrders);
router.get("/orders/:id", secure.isLogged, secure.isOwner, orders.getOrders);
router.post("/orders/create", secure.isLogged, orders.createOrders);
router.post("/orders/messages", secure.isLogged, messages.setMessage);

module.exports = router;