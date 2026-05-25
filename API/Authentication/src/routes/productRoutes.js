const express =
    require("express");

const router =
    express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} = require(
    "../controllers/productController"
);

const upload =
    require(
        "../middleware/uploadMiddleware"
    );


/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Mengambil semua produk
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Berhasil mengambil data produk
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Mengambil detail produk
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Berhasil mengambil detail produk
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Menambahkan produk merchant
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               merchant_id:
 *                 type: integer
 *               nama_produk:
 *                 type: string
 *               harga_produk:
 *                 type: integer
 *               deskripsi:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Produk berhasil ditambahkan
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Mengubah produk
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama_produk:
 *                 type: string
 *               harga_produk:
 *                 type: integer
 *               deskripsi:
 *                 type: string
 *               is_available:
 *                 type: boolean
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Produk berhasil diupdate
 */

// GET ALL PRODUCTS
router.get(
    "/",
    getAllProducts
);


// GET PRODUCT BY ID
router.get(
    "/:id",
    getProductById
);

// CREATE PRODUCT
router.post(
    "/",
    upload.single("image"),
    createProduct
);

// UPDATE PRODUCT
router.put(
    "/:id",
    upload.single("image"),
    updateProduct
);

module.exports = router;