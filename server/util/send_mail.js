const { body, validationResult } = require('express-validator');
const nodeMailer = require('nodemailer');

module.exports = [
    body('name').trim().exists(),
    body('email').isEmail(),
    body('message').trim().isLength({min: 10}),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const transporter = nodeMailer.createTransport({
            host  : 'smtp.zoho.com',
            secure: true,
            port  : 465,
            auth  : {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        transporter.sendMail({
            from   : process.env.MAIL_USERNAME,
            to     : process.env.MAIL_USERNAME,
            replyTo: req.body.email,
            subject: `A New Message From Your Website! <${req.body.email}>`,
            text   : req.body.message
        }, function (err) {
            if (err) {
                return res.status(400).json({ error: true });
            }

            return res.json({success: true});
        });
    }
];