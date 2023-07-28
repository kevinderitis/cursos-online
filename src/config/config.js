import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT,
    MERCADO_PAGO_API_KEY: process.env.MERCADO_PAGO_API_KEY,
    DOMAIN_URL: process.env.DOMAIN_URL,
    PREFERENCE_TITLE: process.env.PREFERENCE_TITLE,
    PREFERENCE_PRICE: process.env.PREFERENCE_PRICE
}