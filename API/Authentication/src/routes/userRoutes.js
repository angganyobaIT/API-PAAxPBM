const express =
    require("express");

const router =
    express.Router();

const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    restoreUser,
} = require(
    "../controllers/userController"
);


// GET ALL USERS
router.get(
    "/",
    getAllUsers
);

// GET USER BY ID
router.get(
    "/:id",
    getUserById
);

// UPDATE USER
router.put(
    "/:id",
    updateUser
);

// DELETE USER
router.delete(
    "/:id",
    deleteUser
);

// RESTORE USER
router.put(
    "/restore/:id",
    restoreUser
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Mengambil semua data user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Berhasil mengambil data user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: integer
 *                       created_at:
 *                         type: string
 */


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Mengambil detail user berdasarkan id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user
 *     responses:
 *       200:
 *         description: Berhasil mengambil detail user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: integer
 *                     created_at:
 *                       type: string
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update profile user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user
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
 *               role:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Profile berhasil diupdate
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Soft delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 */

/**
 * @swagger
 * /api/users/restore/{id}:
 *   put:
 *     summary: Mengaktifkan kembali user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user
 *     responses:
 *       200:
 *         description: User berhasil diaktifkan kembali
 */


module.exports = router;