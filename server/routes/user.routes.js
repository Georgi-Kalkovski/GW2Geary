const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

router.get(
  "/test/all",
  controller.allAccess
);

router.get(
  "/test/user",
  [authJwt.verifyToken],
  controller.userBoard
);

router.get(
  "/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard
);

router.get(
  "/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);

module.exports = router;
