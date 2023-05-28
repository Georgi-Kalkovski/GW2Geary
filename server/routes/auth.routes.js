const express = require('express');
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

router.post(
  "/register",
  [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
  controller.signup
);

router.post(
  "/login",
  controller.signin
);

router.put(
  "/users/:userId/apiKey",
  controller.createApiKey
);

router.get(
  "/users/:userId/apiKeys",
  controller.getApiKeys
);

router.get(
  "/allUsers",
  controller.getAllUsers
);

router.put(
  "/users/:userId/apiKeys/:apiKeyId",
  controller.updateApiKeyStatus
);

router.delete(
  "/users/:userId/apiKeys/:apiKeyId",
  controller.deleteApiKey
);

module.exports = router;

