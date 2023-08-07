import nodemailer from 'nodemailer';
import config from '../config/config.js';

function createSendMail(mailConfig) {

    const transporter = nodemailer.createTransport(mailConfig);
  
    return function sendMail({ to, subject, text, html, attachments }) {
      const mailOptions = { from: mailConfig.auth.user, to, subject, text, html, attachments };
      return transporter.sendMail(mailOptions)
    }
  }
  
  
  function createSendMailGoogle() {
    return createSendMail({
      service: 'gmail',
      auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASS
      }
    })
  }
    
  export const sendMail = createSendMailGoogle()
  

  const adjuntos = []
  if (rutaAdjunto) {
    adjuntos.push({ path: rutaAdjunto })
  }
  
  // const info = await sendMail({
  //   to: cuentaDePrueba,
  //   subject: asunto,
  //   html: mensajeHtml,
  //   attachments: adjuntos
  // })
  
