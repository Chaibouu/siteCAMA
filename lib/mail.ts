import nodemailer, { TransportOptions } from "nodemailer";
import appSettings from "../settings/appSettings";
import { loadAppConfig } from "../settings";

const domain = process.env.NEXT_PUBLIC_APP_URL;
const emailUser = process.env.MAIL_AUTH_USER;
const transporter = nodemailer.createTransport(
  appSettings.mailOptions as TransportOptions
);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const appConfig = await loadAppConfig();

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
  const appConfig = await loadAppConfig();

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
  const appConfig = await loadAppConfig();

  const mailOptions = {
    from: `${appConfig.appName} ${emailUser}`,
    to: email,
    subject: "Vérification de votre compte",
    html: `<p>Merci de vous être inscrit. Cliquez sur le lien suivant pour      vérifier votre compte :</p>
  <a href="${confirmLink}">Vérifiez votre compte</a>`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendGeneratedPasswordEmail = async (
  email: string,
  password: string
) => {
  const appConfig = await loadAppConfig();

  const mailOptions = {
    from: `${appConfig.appName} ${emailUser}`,
    to: email,
    subject: "Votre mot de passe temporaire",
    html: `<p>Votre compte a été créé avec succès. Voici votre mot de passe temporaire :</p>
    <p><strong>${password}</strong></p>
    <p>Veuillez le modifier après votre première connexion.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendValidationRequestEmail = async (
  email: string,
  missionTitle: string,
  userName: string
) => {
  const appConfig = await loadAppConfig();

  const mailOptions = {
    from: `${appConfig.appName} ${emailUser}`,
    to: email,
    subject: "Nouvelle mission à valider",
    html: `
      <p>Bonjour ${userName} </p>
      <p>Vous avez été assigné à la validation de la mission suivante :</p>
      <p><strong>Titre de la mission :</strong> ${missionTitle}</p>
      <p>Veuillez vous connecter à l'application pour effectuer votre validation.</p>
      <p>Cordialement,</p>
      <p>L'équipe ${appConfig.appName}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendMissionCreationConfirmationEmail = async (
  email: string,
  missionTitle: string,
  missionId: string
) => {
  const missionLink = `${process.env.APP_URL}/missions/${missionId}`;

  const mailOptions = {
    from: `${process.env.APP_NAME} <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Confirmation de création de mission",
    html: `
      <p>Bonjour,</p>
      <p>Votre mission "<strong>${missionTitle}</strong>" a été créée avec succès.</p>
      <p>Vous pouvez la consulter en suivant ce lien :</p>
      <a href="${missionLink}">${missionLink}</a>
      <p>Cordialement,</p>
      <p>L'équipe ${process.env.APP_NAME}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const notifyFailure = async (jobId: string, error: string) => {
  const appConfig = await loadAppConfig();

  const mailOptions = {
    from: `${appConfig.appName} <${emailUser}>`,
    to: appSettings.adminEmail,
    subject: `Échec complet de la tâche ID: ${jobId}`,
    html: `
      <p>Bonjour,</p>
      <p>Une tâche a échoué après plusieurs tentatives.</p>
      <p><strong>ID de la tâche :</strong> ${jobId}</p>
      <p><strong>Erreur :</strong> ${error}</p>
      <p>Veuillez vérifier et résoudre le problème au plus vite.</p>
      <p>Cordialement,</p>
      <p>L'équipe ${appConfig.appName}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
