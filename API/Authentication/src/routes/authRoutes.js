const express = require("express");

const router = express.Router();

const {
    register,
    login,
    sendResetOtp,
    resetPassword,
    } = require(
        "../controllers/authController"
    );


    router.post(
        "/register",
        register
    );

    router.post(
        "/login",
        login
    );

    // SEND OTP
    router.post(
        "/send-reset-otp",
        sendResetOtp
    );


    // RESET PASSWORD
    router.post(
        "/reset-password",
        resetPassword
    );

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

module.exports = router;