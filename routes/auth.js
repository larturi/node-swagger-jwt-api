const express = require("express");
const router = express.Router();
const { registerCtrl, loginCtrl } = require("../controllers/auth");
const { validateRegister, validateLogin } = require("../validators/auth");

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       properties:
*         name:
*           type: string
*           description: The name of the user
*         age:
*           type: integer
*           description: The age of the user
*         email:
*           type: string
*           description: The user email
*         password:
*           type: string
*           description: The user password
*       required:
*         - name
*         - age
*         - email
*         - password
*       example:
*         name: John Smith
*         age: 43
*         email: jhon@mail.com
*         password: 12345678
*/

/**
* @swagger
* /auth/register:
*   post:
*     summary: Create a new user
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/User'
*     responses:
*       default:
*         description: successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.post("/register", validateRegister, registerCtrl);

router.post("/login", validateLogin, loginCtrl);

module.exports = router;
