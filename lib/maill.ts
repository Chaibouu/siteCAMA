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

export const sendContactEmail = async (email: string,nom: string, prenom: string, message: string ) => {

  const mailOptions = {
    from: `${appConfig.appName} <${emailUser}>`,
    to: email,
    subject: `Message client : ${nom} ${prenom}`,
    // html: `<p>Message de ${nom} ${prenom} </br> : ${message}</br>`,
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <h2 style="color: #256E4A;">Nouveau message de ${nom} ${prenom}</h2>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Prénom :</strong> ${prenom}</p>
      <p><strong>Email :</strong> ${email}</p>
      <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
      <p><strong>Message :</strong></p>
      <p style="margin-left: 20px; font-style: italic; color: #555;">"${message}"</p>
      <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
      <p style="font-size: 12px; color: #888;">
        Cet email a été généré automatiquement par ${appConfig.appName}. Veuillez ne pas répondre à ce message.
      </p>
    </div>
  `,
  };

  await transporter.sendMail(mailOptions);
};
