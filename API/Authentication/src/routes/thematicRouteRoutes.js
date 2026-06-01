const express =
    require("express");

const router =
    express.Router();
    
const verifyToken =
    require("../middleware/auth");

router.use(verifyToken);

const {
    createThematicRoute,
    getAllThematicRoutes,
    getThematicRouteById,
    updateThematicRoute,
    deleteThematicRoute,
} = require(
    "../controllers/thematicRouteController"
);

/**
 * @swagger
 * /api/thematic-routes:
 *   get:
 *     summary: Mengambil semua rute thematic
 *     tags: [Thematic Routes]
 *     responses:
 *       200:
 *         description: Berhasil mengambil data rute thematic
 */

/**
 * @swagger
 * /api/thematic-routes/{id}:
 *   get:
 *     summary: Mengambil detail rute thematic
 *     tags: [Thematic Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Berhasil mengambil detail rute thematic
 */

/**
 * @swagger
 * /api/thematic-routes:
 *   post:
 *     summary: Menambahkan rute thematic
 *     tags: [Thematic Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               judul_rute:
 *                 type: string
 *               panjang_rute:
 *                 type: number
 *               deskripsi:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rute thematic berhasil ditambahkan
 */

/**
 * @swagger
 * /api/thematic-routes/{id}:
 *   put:
 *     summary: Mengubah rute thematic
 *     tags: [Thematic Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               judul_rute:
 *                 type: string
 *               panjang_rute:
 *                 type: number
 *               deskripsi:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rute thematic berhasil diupdate
 */

/**
 * @swagger
 * /api/thematic-routes/{id}:
 *   delete:
 *     summary: Soft delete rute thematic
 *     tags: [Thematic Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rute thematic berhasil dihapus
 */

// GET ALL THEMATIC ROUTES
router.get(
    "/",
    getAllThematicRoutes
);

// GET THEMATIC ROUTE BY ID
router.get(
    "/:id",
    getThematicRouteById
);

// CREATE THEMATIC ROUTE
router.post(
    "/",
    createThematicRoute
);

// UPDATE THEMATIC ROUTE
router.put(
    "/:id",
    updateThematicRoute
);

// DELETE THEMATIC ROUTE
router.delete(
    "/:id",
    deleteThematicRoute
);

module.exports = router;