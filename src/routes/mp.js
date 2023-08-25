import { Router } from 'express';
const mpRouter = Router();
import mercadopago from 'mercadopago';
import config from '../config/config.js';
import { sendMail } from '../services/email.js';
import { createOrder } from '../db/orders.js'
import { getPaymentById } from '../services/utils.js';
import { createRecord, getRecordByEmail, updateRecord } from '../db/email.js'


mercadopago.configure({
    access_token: config.MERCADO_PAGO_API_KEY,
  });

mpRouter.get('/pagar', async (req, res) => {
  const { phone, email, curso } = req.  query;
  let preference;
    try {
      if(curso === 'procrastinacion'){
          preference = {
          items: [
            {
              title: 'Curso de procrastinación',
              unit_price: 1699, 
              quantity: 1,
            },
          ],
          auto_return: "approved",
          back_urls: {
            success: `${config.DOMAIN_URL}/api/mp/callbackURL`,
            failure: `${config.DOMAIN_URL}/api/mp/failed-payment`
          },
          external_reference: email,
          payer: {
            email: email,
            curso: curso
          }
          
        };
      }else{

        preference = {
          items: [
            {
              title: config.PREFERENCE_TITLE,
              unit_price: config.PREFERENCE_PRICE, 
              quantity: 1,
            },
          ],
          auto_return: "approved",
          back_urls: {
            success: `${config.DOMAIN_URL}/api/mp/callbackURL`,
            failure: `${config.DOMAIN_URL}/api/mp/failed-payment`
          },
          external_reference: email,
          payer: {
            email: email,
            curso: curso
          }
          
        };
  
      }


  
      const response = await mercadopago.preferences.create(preference);
      console.log(response)
      await createRecord({ email, payment: false, sent: false })
      res.send(response.body.init_point);
    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error);
      res.status(500).send('Hubo un error al procesar el pago.');
    }
  });


  mpRouter.get('/callbackURL', async (req, res) => {
    const email = req.query.external_reference;
    const status = req.query.status;

    try {
      await createOrder(req.query)
    } catch (error) {
      console.log(error)
    }


    const adjuntos = []
    adjuntos.push({ path: './Prompt-engineering.pdf' })

    res.redirect(config.SUCCESFULL_PAYMENT_URL)
  });

  mpRouter.get('/failed-payment', async (req, res) => {
    try {
      await createOrder(req.query)
    } catch (error) {
      console.log(error)
    }
    res.redirect(config.FAILED_PAYMENT_URL)
  })

  mpRouter.post('/payment-callback', async (req, res) => {
    console.log(req.query)
    let data = req.query;
    let paymentId = data['data.id'];
  
    const adjuntos = []
    
    let emailSent;
    try {
      let payment = await getPaymentById(paymentId)
      console.log(payment.external_reference)
      let email = payment.external_reference;
      let curso = payment.payer.curso;

      if(curso === 'procrastinacion'){
        adjuntos.push({ path: './Procrastinacion.pdf' })
      }else{
        adjuntos.push({ path: './Prompt-engineering.pdf' })
      }
  
        emailSent = await sendMail({
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
      

      await updateRecord(email)
    } catch (error) {
      console.log(error)
    }
   
    res.send({ status: 'success', payload: emailSent })
  })


  export default mpRouter;