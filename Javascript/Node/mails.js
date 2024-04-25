const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'youremail@gmail.com',
        passwd : 'yourpassword'
    }
});

var mailoption = {
    from : 'youremail@gmail.com',
    to : 'adejare.adeadyo@gmail.com',
    subject : 'Sending Email using Node.js',
    text : 'That was easy !!!'
};

transporter.sendMail(mailoption, function(error, info){
    if (error) {
        console.log(error);
    } else {
        comsole.log('Email Sent : ' + info.response);
    }
});