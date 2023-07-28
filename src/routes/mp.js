import { Router } from 'express';
const mpRouter = Router();
import mercadopago from 'mercadopago';
import config from '../config/config.js';

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
          success: `${config.DOMAIN_URL}/mp/callbackURL`,
          failure: `${config.DOMAIN_URL}/api/mp/callbackURL`
        },
        external_reference: 'elmail@mail.com'
        
      };
  
      const response = await mercadopago.preferences.create(preference);
  
     
      res.redirect(response.body.init_point);
    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error);
      res.status(500).send('Hubo un error al procesar el pago.');
    }
  });

  mpRouter.get('/callbackURL', (req, res) => {
    console.log(req.query)
    
    res.sendStatus(200); 
  });



  export default mpRouter;