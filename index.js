const express = require('express');
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();

app.get('/app/', function(req, res){
    res.send("Hello from the root application URL");
});
app.get('/app/test/', function(req, res){
    res.send("Hello from the 'test' URL");
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let smtp_login = process.env.SMTP_LOGIN || '---'
let smtp_password = process.env.SMTP_PASSWORD || '---'

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: smtp_login,
        pass:  smtp_password,
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

let port = process.env.PORT || 8081


app.listen(port, function () {
    console.log("Application is running")
})

