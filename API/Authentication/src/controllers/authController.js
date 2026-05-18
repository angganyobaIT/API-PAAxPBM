const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
    successResponse,
    errorResponse,
} = require("../utils/response");


// REGISTER
const register = async (req, res) => {

    try {

        const {
            username,
            name,
            email,
            password,
            role,
        } = req.body;

        // validasi
        if (!username ||!name ||!email ||!password) {

            return errorResponse(
                res,
                "Semua field wajib diisi"
            );
        }

        // cek email
        const checkEmail =
            await pool.query(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );

        if (checkEmail.rows.length > 0) {

            return errorResponse(
                res,
                "Email sudah digunakan"
            );
        }
        
        const checkUsername =
            await pool.query(
                "SELECT * FROM users WHERE username = $1",
                [username]
            );

        if (checkUsername.rows.length > 0) {

            return errorResponse(
                res,
                "Username sudah digunakan"
            );
        }

        // hash password
        const hashedPassword =
            await bcrypt.hash(password, 10);

        // insert user
        await pool.query(
            `INSERT INTO users (username, name, email, password, role) VALUES ($1, $2, $3, $4, $5)`,
            [
                username,
                name,
                email,
                hashedPassword,
                role,   
            ]
        );

        return successResponse(
            res,
            "Register berhasil"
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message
        );
    }
};


const login = async (req, res) => {

    try {

        const {
            username,
            password,
        } = req.body;

        // validasi
        if (!username || !password){

            return errorResponse(
                res,
                "Email dan password wajib diisi"
            );
        }

        // cek user
        const userResult =
            await pool.query(
                "SELECT * FROM users WHERE username = $1",
                [username]
            );

        // user tidak ditemukan
        if (userResult.rows.length === 0) {

            return errorResponse(
                res,
                "Username tidak ditemukan"
            );
        }

        const user =
            userResult.rows[0];

        // cek password
        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return errorResponse(
                res,
                "Password salah"
            );
        }

        // generate token
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        return successResponse(
            res,
            "Login berhasil",
            {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            }
        );

    } catch (error) {

        return errorResponse(
            res,
            error.message
        );
    }
};


module.exports = {
    register,
    login, 
};