const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  addUser,
  getUserById,
  deleteUser,
  updateUserInfo,
} = require("../controllers/user.controller");

router.get("/", getAllUsers);

router.post("/adduser", addUser);

router.get("/:id", getUserById);

router.delete("/:id", deleteUser);

router.put("/:id", updateUserInfo);

module.exports = router;
