import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  console.log('Attempting to send email...');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_EMAIL:', process.env.SMTP_EMAIL);
  console.log('FROM_NAME:', process.env.FROM_NAME);
  console.log('FROM_EMAIL:', process.env.FROM_EMAIL);

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Use TLS
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Define email options
  const mailOptions = {
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  console.log('Mail options:', JSON.stringify(mailOptions, null, 2));

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw error;
  }
};

export default sendEmail;
