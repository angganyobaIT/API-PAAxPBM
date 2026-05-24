const express = require("express");

const router = express.Router();

const {
    register,
    login,
} = require("../controllers/authController");


// REGISTER
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Register berhasil
 */
router.post(
    "/register",
    register
);


// LOGIN
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login berhasil
 */
router.post(
    "/login",
    login
);

module.exports = router;