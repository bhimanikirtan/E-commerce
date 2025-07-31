const nodemailer = require("nodemailer");

const sendEmail = async (to, filePath, filename) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to,
    subject: "Your Payment Invoice",
    text: "Attached is your invoice.",
    attachments: [
      {
        filename: `${filename}.pdf`,
        path: filePath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log("📧 Email sent successfully!");
};

module.exports = sendEmail;
