import { sendEmail } from "./sendEmail.js";

export const sendResetEmail = (email, name, token) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Password reset",
    html: `<h2>Dear ${name}</h2>
        <p>Here is your password reset link:</p>
        <p>${
          process.env.NODE_ENV === "production"
            ? "https://ebuy379.herokuapp.com"
            : "http://localhost:3000"
        }/resetPassword/${token}</p>`,
  };
  sendEmail(mailOptions);
};
