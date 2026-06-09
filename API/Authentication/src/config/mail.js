const nodemailer =
    require("nodemailer");

console.log(
    "EMAIL_USER:",
    process.env.EMAIL_USER
);

console.log(
    "EMAIL_PASS:",
    process.env.EMAIL_PASS
        ? "ADA"
        : "TIDAK ADA"
);

const transporter =
    nodemailer.createTransport({

        service: "gmail",

        auth: {

            user:
                process.env.EMAIL_USER,

            pass:
                process.env.EMAIL_PASS,
        },

        connectionTimeout:
            10000,

        greetingTimeout:
            10000,

        socketTimeout:
            10000,
    });

// TEST KONEKSI GMAIL
transporter.verify(
    function(error, success) {

        if (error) {

            console.log(
                "MAIL ERROR:"
            );

            console.log(error);

        } else {

            console.log(
                "MAIL SERVER READY"
            );
        }
    }
);

module.exports =
    transporter;