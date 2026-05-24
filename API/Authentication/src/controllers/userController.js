const pool =
    require("../config/db");

const {
    successResponse,
    errorResponse,
} = require("../utils/response");


// GET ALL USERS
const getAllUsers = async (
    req,
    res
) => {

    try {

        const users =
            await pool.query(
                `SELECT id, username, name, email, role, created_at FROM users WHERE is_active = true ORDER BY id DESC`
            );

        return successResponse(
            res,
            "Berhasil mengambil data user",
            users.rows
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message
        );
    }
};


// GET USER BY ID
const getUserById = async (
    req,
    res
) => {
    
    try {
        
        const { id } = req.params;
        
        const user =
        await pool.query(
            `SELECT id, username, name, email, role, created_at FROM users WHERE id = $1 AND is_active = true`, [id]
        );
        
        // user tidak ditemukan
        if (user.rows.length === 0) {
            
            return errorResponse(
                res,
                "User tidak ditemukan"
            );
        }
        
        return successResponse(
            res,
            "Berhasil mengambil detail user",
            user.rows[0]
        );
        
    } catch (error) {
        
        return errorResponse(
            res,
            error.message
        );
    }
};

// UPDATE PROFILE
// UPDATE PROFILE
const updateUser = async (
    req,
    res
) => {

    try {

        const { id } = req.params;

        const {
            username,
            name,
            email,
            role,
        } = req.body;

        // validasi
        if (
            !username ||
            !name ||
            !email ||
            role === undefined
        ) {

            return errorResponse(
                res,
                "Semua field wajib diisi"
            );
        }

        // validasi role
        if (![1, 2].includes(role)) {

            return errorResponse(
                res,
                "Role tidak valid"
            );
        }

        // cek user
        const userCheck =
            await pool.query(
                `
                SELECT * FROM users
                WHERE id = $1
                `,
                [id]
            );

        // user tidak ditemukan
        if (
            userCheck.rows.length === 0
        ) {

            return errorResponse(
                res,
                "User tidak ditemukan"
            );
        }

        // cek username duplicate
        const usernameCheck =
            await pool.query(
                `
                SELECT * FROM users
                WHERE username = $1
                AND id != $2
                `,
                [username, id]
            );

        if (
            usernameCheck.rows.length > 0
        ) {

            return errorResponse(
                res,
                "Username sudah digunakan"
            );
        }

        // cek email duplicate
        const emailCheck =
            await pool.query(
                `SELECT * FROM users WHERE email = $1 AND id != $2`, [email, id]
            );

        if (
            emailCheck.rows.length > 0
        ) {

            return errorResponse(
                res,
                "Email sudah digunakan"
            );
        }

        // update user
        await pool.query(
            `UPDATE users SET username = $1, name = $2, email = $3, role = $4 WHERE id = $5`,
            [
                username,
                name,
                email,
                role,
                id,
            ]
        );

        return successResponse(
            res,
            "Profile berhasil diupdate"
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message
        );
    }
};


// SOFT DELETE USER
const deleteUser = async (
    req,
    res
) => {

    try {

        const { id } = req.params;

        // cek user
        const userCheck =
            await pool.query(
                `
                SELECT *
                FROM users
                WHERE id = $1
                AND is_active = true
                `,
                [id]
            );

        // user tidak ditemukan
        if (
            userCheck.rows.length === 0
        ) {

            return errorResponse(
                res,
                "User tidak ditemukan"
            );
        }

        // soft delete
        await pool.query(
            `
            UPDATE users
            SET is_active = false
            WHERE id = $1
            `,
            [id]
        );

        return successResponse(
            res,
            "User berhasil dihapus"
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message
        );
    }
};

// RESTORE USER
const restoreUser = async (
    req,
    res
) => {

    try {

        const { id } = req.params;

        // cek user
        const userCheck =
            await pool.query(
                `
                SELECT *
                FROM users
                WHERE id = $1
                AND is_active = false
                `,
                [id]
            );

        // user tidak ditemukan
        if (
            userCheck.rows.length === 0
        ) {

            return errorResponse(
                res,
                "User tidak ditemukan atau sudah aktif"
            );
        }

        // restore user
        await pool.query(
            `
            UPDATE users
            SET is_active = true
            WHERE id = $1
            `,
            [id]
        );

        return successResponse(
            res,
            "User berhasil diaktifkan kembali"
        );

    } catch (error) {

        console.log(error);

        return errorResponse(
            res,
            error.message
        );
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    restoreUser,
};