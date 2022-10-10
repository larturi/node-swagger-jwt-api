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

/**
* @swagger
* components:
*   schemas:
*     Track:
*       type: object
*       properties:
*         name:
*           type: string
*           description: Track's name
*         album:
*           type: string
*           description: Track's album name
*         cover:
*           type: string
*           description: URL of the cover image
*         artist:
*           type: object
*           description: Artist
*         duration:
*           type: object
*           description: Track duration
*       required:
*         - name
*         - album
*       example:
*         name: We Are the Champions
*         album: News of the World
*         cover: https://cdns-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/350x350.jpg
*         artist: {
*           name: "Eminem",
*           nickname: "Eminem",
*           nationality: "US"
*         }
*         duration: {
*           start: 0,
*           end: 126,
*         }
*         mediaId: "62271512ee5081a7027e636a"
*/

/**
* @swagger
* /tracks:
*   get:
*     summary: Get Tracks
*     security:
*       - bearerAuth: []
*     tags: [Track]
*     responses:
*       default:
*         description: successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Track'
*/
router.get("/", authMiddleware, getItems);

router.get("/:id", authMiddleware, validateId, getItem);

/**
* @swagger
* /tracks:
*   post:
*     summary: Create a new track
*     security:
*       - bearerAuth: []
*     tags: [Track]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/Track'
*     responses:
*       default:
*         description: successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Track'
*/
router.post(
  "/",
  authMiddleware,
  authRolMiddleware("admin"),
  validateObjectDataCreate,
  createItem
);

/**
* @swagger
* /tracks/{id}:
*   put:
*     summary: Edit a track
*     security:
*       - bearerAuth: []
*     tags: [Track]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/Track'
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the track to get
*     responses:
*       default:
*         description: successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Track'
*/
router.put("/:id", authMiddleware, validateObjectDataUpdate, updateItem);

/**
* @swagger
* /tracks/{id}:
*   delete:
*     summary: Delete a track
*     security:
*       - bearerAuth: []
*     tags: [Track]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the track to delete
*     responses:
*       default:
*         description: successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Track'
*/
router.delete("/:id", authMiddleware, validateId, deleteItem);

module.exports = router;
