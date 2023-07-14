// app.js or your Express app file
const express = require('express');
const app = express();
const cors = require("cors");
const nodemailer = require('nodemailer');

// ...Other middleware and configurations

app.use(cors());
app.use(express.json());

app.post('/contact', (req, res) => {
    
  console.log(req.body)
  const { firstName, lastName, email, message, phone } = req.body;


  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {  
      user: "abhiramzmenon@gmail.com", // Your email address
      pass: "xrxxdcwouvdekbmj", // Password (for gmail, your app password)
      // ⚠️ For better security, use environment variables set on the server for these values when deploying
    },
    debug: true
  });

  // Create the email message
  const mailOptions = {
    from: email,
    to: 'athullyakallery@gmail.com', // Replace with your email address
    subject: 'New Message from Contact Form',
    html: `<h2>New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${req.body.firstName} ${req.body.lastName}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${req.body.message}</p>`,
    };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    console.log(info)
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Sorry, there was an error sending your message.' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Message sent successfully.' });
    }
  });
});

// ...Other routes and app configurations


app.listen(3001, () => {
  console.log('Server running on port 3000');
})