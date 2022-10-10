const express = require("express");
const router = express.Router();
const {
  getItem,
  getItems,
  updateItem,
  createItem,
  deleteItem,
} = require("../controllers/tracks");
const authMiddleware = require("../middleware/auth");
const authRolMiddleware = require("../middleware/rol");
const {
  validateId,
  validateObjectDataCreate,
  validateObjectDataUpdate,
} = require("../validators/tracks");

router.get("/", authMiddleware, getItems);

router.get("/:id", authMiddleware, validateId, getItem);

router.post(
  "/",
  authMiddleware,
  authRolMiddleware(["admin"]),
  validateObjectDataCreate,
  createItem
);

router.put("/:id", authMiddleware, validateObjectDataUpdate, updateItem);

router.delete("/:id", authMiddleware, validateId, deleteItem);

module.exports = router;
