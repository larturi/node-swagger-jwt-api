const express = require("express");
const router = express.Router();
const { getItem, getItems, createItem, deleteItem } = require("../controllers/storage");
const { validateId } = require("../validators/storage");
const { upload } = require("../utils/handleStore");

/**
* @swagger
* components:
*   schemas:
*     Storage:
*       type: object
*       properties:
*         url:
*           type: string
*         filename:
*           type: string
*/

/**
* @swagger
* /storage:
*   post:
*     summary: Upload file
*     security:
*       - bearerAuth: []
*     tags: [Storage]
*     requestBody:
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               file:
*                 type: string
*                 format: binary
*     responses:
*       default:
*         description: successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Storage'
*/

router.post("/", upload.single("file"), createItem);
/**
* @swagger
* /storage:
*   get:
*     summary: Upload a file
*     tags: [Storage]
*     responses:
*       default:
*         description: successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Storage'
*/
router.get("/", getItems);

/**
* @swagger
* /storage/{id}:
*   get:
*     summary: Get one Storage File by id
*     tags: [Storage]
*     responses:
*       default:
*         description: successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Storage'
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the resource
*/
router.get("/:id", validateId, getItem);

/**
* @swagger
* /storage/{id}:
*   delete:
*     summary: Delete a resource by id
*     security:
*       - bearerAuth: []
*     tags: [Storage]
*     responses:
*       default:
*         description: successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Storage'
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the resource
*/
router.delete("/:id", validateId, deleteItem);


module.exports = router;
