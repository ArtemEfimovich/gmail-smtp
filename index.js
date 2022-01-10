const express = require('express');
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'efimovichartem27@gmail.com',
        pass: '27011990ArtemEf',
    },
});


app.post('/sendMessage', async function (req, res) {

    let {message, name, email} = req.body.data

    let info = await transporter.sendMail({
        from: 'My Profile Page', // sender address
        to: "artemfender@gmail.com", // list of receivers
        subject: "JOB Offer", // Subject line
        html: `<b>Message from portfolio web site</b>
    <div>
        Name: ${name}
    </div>
    <div>
        Contacts: ${email}
    </div>
    <div>
        ${message}
    </div>
`,});
    res.send('Ok')
});


app.listen(3010, function () {
    console.log("sdfsdfsdfsdfsd")
})






