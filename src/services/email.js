import nodemailer from 'nodemailer';

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
        user: "kevin.deritis77@gmail.com",
        pass: "nusytyokiqqtfstb"
      }
    })
  }
  
  
  
  const sendMail = createSendMailGoogle()
  
  const cuentaDePrueba = 'kevin.deritis77@gmail.com'
  const asunto = process.argv[ 2 ] || 'sin asunto'
  const mensajeHtml = process.argv[ 3 ] || 'nada para decir'
  const rutaAdjunto = process.argv[ 4 ] 
  const adjuntos = []
  if (rutaAdjunto) {
    adjuntos.push({ path: rutaAdjunto })
  }
  
  const info = await sendMail({
    to: cuentaDePrueba,
    subject: asunto,
    html: mensajeHtml,
    attachments: adjuntos
  })
  
  console.log(info)