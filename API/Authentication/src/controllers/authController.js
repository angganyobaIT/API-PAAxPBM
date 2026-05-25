const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const transporter =
    require("../config/mail");

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


// SEND OTP RESET PASSWORD
const sendResetOtp = async (
    req,
    res
) => {

    try {

        const { email } = req.body;

        // validasi
        if (!email) {

            return errorResponse(
                res,
                "Email wajib diisi"
            );
        }

        // cek user
        const user =
            await pool.query(
                `
                SELECT * FROM users
                WHERE email = $1
                `,
                [email]
            );

        if (
            user.rows.length === 0
        ) {

            return errorResponse(
                res,
                "Email tidak ditemukan"
            );
        }

        // generate otp
        const otp =
            Math.floor(
                100000 +
                Math.random() * 900000
            ).toString();

        // expired 5 menit
        const expiredAt =
            new Date(
                Date.now() +
                5 * 60 * 1000
            );

        // simpan otp
        await pool.query(
            `
            UPDATE users
            SET
                otp_code = $1,
                otp_expired_at = $2
            WHERE email = $3
            `,
            [
                otp,
                expiredAt,
                email,
            ]
        );

        // kirim email
        await transporter.sendMail({

            from:
                process.env.EMAIL_USER,

            to: email,

            subject:
                "Reset Password OTP",

            html: `
                <h2>Reset Password</h2>
                <p>OTP anda:</p>

                <h1>${otp}</h1>

                <p>
                    OTP berlaku selama
                    5 menit
                </p>
            `,
        });

        return successResponse(
            res,
            "OTP berhasil dikirim ke email"
        );

    } catch (error) {

        console.log(error);

        return errorResponse(
            res,
            error.message
        );
    }
};

// RESET PASSWORD
const resetPassword = async (
    req,
    res
) => {

    try {

        const {
            email,
            otp,
            new_password,
        } = req.body;

        // validasi
        if (
            !email ||
            !otp ||
            !new_password
        ) {

            return errorResponse(
                res,
                "Semua field wajib diisi"
            );
        }

        // cek user
        const user =
            await pool.query(
                `
                SELECT * FROM users
                WHERE email = $1
                `,
                [email]
            );

        if (
            user.rows.length === 0
        ) {

            return errorResponse(
                res,
                "User tidak ditemukan"
            );
        }

        const userData =
            user.rows[0];

        // cek otp
        if (
            userData.otp_code !== otp
        ) {

            return errorResponse(
                res,
                "OTP salah"
            );
        }

        // cek expired
        if (
            new Date() >
            userData.otp_expired_at
        ) {

            return errorResponse(
                res,
                "OTP expired"
            );
        }

        // hash password baru
        const hashedPassword =
            await bcrypt.hash(
                new_password,
                10
            );

        // update password
        await pool.query(
            `
            UPDATE users
            SET
                password = $1,
                otp_code = NULL,
                otp_expired_at = NULL
            WHERE email = $2
            `,
            [
                hashedPassword,
                email,
            ]
        );

        return successResponse(
            res,
            "Password berhasil direset"
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
    register,
    login,
    sendResetOtp,
    resetPassword,
};