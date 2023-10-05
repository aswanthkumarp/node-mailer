const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { parse } = require('querystring');


require('dotenv').config();

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {

    const filePath = path.join(__dirname, '../client', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.method === 'POST' && req.url === '/sendmail') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const formData = parse(body);
      const name = formData.username;
      const email = formData.email;

      // Create a nodemailer transporter using environment variables
      const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Email data
      const mailOptions = {
        from: process.env.SMTP_USER, 
        to: email,
        subject: `Hello ${name}, from Node.js!`,
        text: 'This is a test email sent from Node.js.',
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error sending email');
        } else {
          console.log('Email sent: ' + info.response);
          res.writeHead(302, { 'Location': '/success' });
          res.end(`Email sent to ${email} successfully.`);
        }
      });
    });
  }
  else if (req.method === "GET" && req.url=== "/success") {
    const successPath = path.join(__dirname, '../client', 'success.html');
    fs.readFile(successPath, 'utf8', (err, data) => {
      if (err) {
        console.error("Error reading success.html:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3333, () => {
  console.log('Server is running on http://localhost:3333');
});
