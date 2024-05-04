const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adejare.adedayo@lmu.edu.ng", // Replace with your Gmail email address
    pass: "Starlord07", // Replace with your Gmail password
  },
  tls: {
    rejectUnauthorized: false, // Add this line to disable certificate validation
  },
});

const mailOptions = {
  from: "princeadedayo03@gmail.com", // Replace with your Gmail email address
  to: "adejare.adedayo@lmu.edu.ng",
  subject: "Sending Email using Node.js",
  text: "That was easy!!!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});


const AWS = require("aws-sdk");
const ses = new AWS.SES({ region: "af-south-1" });


const params = {
  Destination: {
    ToAddresses: ["adejare.adedayo@lmu.edu.ng"],
  },
  Message: {
    Body: {
      Text: {
        Data: "This is a test email sent from Node.js using Amazon SES.",
      },
    },
    Subject: {
      Data: "Sending Email using Node.js with Amazon SES",
    },
  },
  Source: "princeadedayo03@gmail.com",
};

ses.sendEmail(params, function (err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log("Email sent:", data);
  }
});