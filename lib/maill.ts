import nodemailer, { TransportOptions } from "nodemailer";
import appConfig from "@/settings";

const domain = process.env.NEXT_PUBLIC_APP_URL;
const emailUser = process.env.MAIL_AUTH_USER;
const transporter = nodemailer.createTransport(
  appConfig.mailOptions as TransportOptions
);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: `${appConfig.appName} ${emailUser}`,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  };
  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const encodedToken = encodeURIComponent(token);

  const resetLink = `${domain}/auth/reset-password?token=${encodedToken}`;

  const mailOptions = {
    from: `${appConfig.appName} ${emailUser}`,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  };
  await transporter.sendMail(mailOptions);
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const encodedToken = encodeURIComponent(token);
  const confirmLink = `${domain}/auth/verify?token=${encodedToken}`;

  const mailOptions = {
    from: `${appConfig.appName} ${emailUser}`,
    to: email,
    subject: "Vérification de votre compte",
    html: `<p>Merci de vous être inscrit. Cliquez sur le lien suivant pour      vérifier votre compte :</p>
  <a href="${confirmLink}">Vérifiez votre compte</a>`,
  };

  await transporter.sendMail(mailOptions);
};
