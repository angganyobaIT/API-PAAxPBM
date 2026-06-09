const nodemailer =
    require("nodemailer");

const transporter =
    nodemailer.createTransport({

        host: "64.233.170.109",

        port: 587,

        secure: false,

        auth: {
            user:
                process.env.EMAIL_USER,

            pass:
                process.env.EMAIL_PASS,
        }
    });

module.exports =
    transporter;