import { sendEmail } from "./sendEmail.js";

export const sendVerificationEmail = (email, name, token, id) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Email verification",
    html: `<h2>Dear ${name}</h2>
        <p>Click on the following link to verify your email address:</p>
        <p>${
          process.env.NODE_ENV === "production"
            ? "https://ebuy379.herokuapp.com"
            : "http://localhost:3000"
        }/${id}/verify/${token}</p>`,
  };
  sendEmail(mailOptions);
};
