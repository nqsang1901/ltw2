const nodemailer = require('nodemailer');
const process = require('process');

async function send(to, subject, content) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            // user: process.env.EMAIL_USERNAME,
            // pass: process.env.EMAIL_PASSWORD,
            user: '17k1.web2.demo@gmail.com',
            pass: 'abcXYZ123~',
        }
    });

    transporter.sendMail({
        // from: process.env.EMAIL_USERNAME,
        from: '17k1.web2.demo@gmail.com',
        to,
        subject,
        text: content,
    });
}

module.exports = { send };