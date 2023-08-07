import { Router } from 'express';
const mpRouter = Router();
import mercadopago from 'mercadopago';
import config from '../config/config.js';
import fs from 'fs';
import path from 'path';
import { sendMail } from '../services/email.js';
import { sendMessage } from '../services/twilio.js';

mercadopago.configure({
    access_token: config.MERCADO_PAGO_API_KEY,
  });

mpRouter.get('/pagar', async (req, res) => {
    try {
      
      const preference = {
        items: [
          {
            title: config.PREFERENCE_TITLE,
            unit_price: config.PREFERENCE_PRICE, 
            quantity: 1,
          },
        ],
        back_urls: {
          success: `${config.DOMAIN_URL}/api/mp/callbackURL`,
          failure: `${config.DOMAIN_URL}/api/mp/callbackURL`
        },
        external_reference: req.query
        
      };
  
      const response = await mercadopago.preferences.create(preference);
  
     
      res.redirect(response.body.init_point);
    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error);
      res.status(500).send('Hubo un error al procesar el pago.');
    }
  });

  const adjuntos = [];
  const rutaAdjunto = 'archivo_adjunto.pdf';

  if (fs.existsSync(rutaAdjunto)) {
    const adjunto = {
      filename: 'Manual_Sony.pdf', // Nombre del archivo adjunto en el correo
      path: rutaAdjunto, // Ruta completa al archivo
    };
    adjuntos.push(adjunto);
  } else {
    console.error('El archivo adjunto no existe en la ruta especificada.');
  }

  mpRouter.get('/callbackURL', async (req, res) => {
    const { phone, email } = req.query;
    console.log(req.query.external_reference)
    // await sendMessage(req.query.external_reference)
    await sendMail({
      to: email,
      subject: 'Este es el asunto de prueba',
      attachments: adjuntos
    })
    res.sendStatus(200); 
  });



  export default mpRouter;