const express = require("express");
const router = express.Router();
const upload = require("./multer.config");
const { services, users, orders, auth, messages, reviews } = require("../controllers");
const { secure } = require("../middlewares");

router.get("/profile", secure.isLogged, auth.getProfile);
router.post("/register", upload.single("photo"), auth.register);
router.post("/login", auth.login);
router.delete("/logout", secure.isLogged, auth.logout);

router.get("/users", secure.isLogged, secure.isAdmin, users.getUser);
router.get("/users/:nickName", secure.isLogged, users.getUser);
//router.patch("/user/:nickName", secure.isLogged, users.updateUser);

router.get("/services", services.getServices);
router.get("/services/:profession", services.getServices);
router.get("/service/:id", secure.isLogged, services.getServices);
router.patch("/service/:id", secure.isLogged, secure.isOwnerService, services.updateServices);
router.post("/services/create", secure.isLogged, services.createService);

router.get("/orders", secure.isAdmin, orders.getOrders);
router.get("/orders/:id", secure.isLogged, secure.isOwner, orders.getOrders);
router.patch("/orders/:id", secure.isLogged, secure.isOwnerReceived, orders.updateOrders);
router.post("/orders/create", secure.isLogged, orders.createOrders);
router.post("/order/:id/messages", secure.isLogged, secure.isOwner, messages.setMessage);
router.post("/order/:id/review", secure.isLogged, secure.isOwnerSent, upload.single("photo"), reviews.createReview);

module.exports = router;