const express = require('express');
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const authJwt = require("../middlewares/authJwt");

router.post(
  "/register",
  [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
  controller.signup
);

router.post(
  "/login",
  controller.signin
);

router.get(
  "/getUser",
  authJwt.verifyToken,
  controller.getUser
);

router.put(
  "/users/:userId/username",
  authJwt.verifyToken,
  controller.changeUsername
);

router.put(
  "/users/:userId/email",
  authJwt.verifyToken,
  controller.changeEmail
);

router.put(
  "/users/:userId/password",
  authJwt.verifyToken,
  controller.changePassword
);

router.delete(
  "/users/:userId",
  authJwt.verifyToken,
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

router.delete(
  '/storedBuilds/:storedBuildId',
  controller.deleteBuild
);

router.put(
  "/users/fs/:name",
  controller.setFashion
);

router.get(
  "/users/fs/:name/:id",
  controller.getFashion
);

router.delete(
  '/storedFashion/:storedFashionId',
  controller.deleteFashion
);

router.put(
  "/users/eqs/:name",
  controller.setEquipment
);

router.get(
  "/users/eqs/:name/:id",
  controller.getEquipment
);

router.delete(
  '/storedEquipment/:storedEquipmentId',
  controller.deleteEquipment
);

module.exports = router;