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
  const { phone, email } = req.query;
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
        external_reference: email
        
      };
  
      const response = await mercadopago.preferences.create(preference);
  
     
      res.redirect(response.body.init_point);
    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error);
      res.status(500).send('Hubo un error al procesar el pago.');
    }
  });


  mpRouter.get('/callbackURL', async (req, res) => {
    const email = req.query.external_reference;
    const status = req.query.status;
    const adjuntos = []
    adjuntos.push({ path: './Prompt-engineering.pdf' })

    res.redirect('/api/mp/gracias')
    if(status === 'approved'){
      try {
        await sendMail({
          to: email,
          subject: 'Libreria digital - Prompt engineering',
          attachments: adjuntos,
          html: `<!DOCTYPE html>
          <html>
          <head>
            <title>Gracias por tu compra</title>
          </head>
          <body>
            <div style="text-align: center; padding: 20px;">
              <h2>¡Gracias por tu compra!</h2>
             
              <p>Queremos agradecerte sinceramente por haber adquirido nuestro curso de Prompt Engineering. Estamos emocionados de que hayas decidido unirte a nosotros en este emocionante viaje de aprendizaje y desarrollo.</p>
              <p>El curso está diseñado para brindarte conocimientos prácticos y valiosos en el campo de la ingeniería y la programación. Esperamos que encuentres el contenido interesante y útil para tu crecimiento profesional.</p>
              <p>Si tienes alguna pregunta o necesitas asistencia durante el curso, no dudes en ponerte en contacto con nuestro equipo de soporte. Estamos aquí para ayudarte en cada paso del camino.</p>
              <p>Una vez más, gracias por confiar en nosotros.</p>
              <p>Saludos cordiales,</p>
              <p>El equipo de Libreria digital</p>
            </div>
          </body>
          </html>
          `
        })
      } catch (error) {
        console.log(error)
      }
    }
    

  });

  mpRouter.get('/gracias', (req, res) => {
    res.send('gracias por la compra')
  })



  export default mpRouter;