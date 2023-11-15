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
  "/users/:userId/username",
  controller.changeUsername
);

router.put(
  "/users/:userId/email",
  controller.changeEmail
);

router.put(
  "/users/:userId/password",
  controller.changePassword
);

router.delete(
  "/users/:userId",
  controller.deleteUser
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

router.get(
  "/getAccount",
  controller.getAccount
);

router.get(
  "/getCharacter",
  controller.getCharacter
);

router.post(
  "/getEmail",
  controller.getEmail
);

router.put(
  "/users/:userId/apiKeys/:apiKeyId",
  controller.updateApiKeyStatus
);

router.delete(
  "/users/:userId/apiKeys/:apiKeyId",
  controller.deleteApiKey
);

router.put(
  "/users/:userId/apiKeys/:apiKeyId/characters/:characterId",
  controller.updateCharacterStatus
);

// router.get(
//   "/refreshAllUserData",
//   controller.refreshAllUserData
// );

router.put(
  "/users/blds/:name",
  controller.setBuild
);

router.get(
  "/users/blds/:name/:id",
  controller.getBuild
);

router.delete('/storedBuilds/:storedBuildId', controller.deleteBuild);

module.exports = router;