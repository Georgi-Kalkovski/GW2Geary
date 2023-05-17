const express = require('express');
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

router.post(
  "/signup",
  [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
  controller.signup
);

router.post(
  "/signin",
  controller.signin
);

router.put(
  "/users/:userId/apiKey",
  controller.createApiKey
);

module.exports = router;

