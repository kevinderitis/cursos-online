import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    MERCADO_PAGO_API_KEY: process.env.MERCADO_PAGO_API_KEY,
    DOMAIN_URL: process.env.DOMAIN_URL,
    PREFERENCE_TITLE: process.env.PREFERENCE_TITLE,
    PREFERENCE_PRICE: Number(process.env.PREFERENCE_PRICE),
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,
    SUCCESFULL_PAYMENT_URL: process.env.SUCCESFULL_PAYMENT_URL,
    SUCCESFULL_PAYMENT_URL_PROCRA: process.env.SUCCESFULL_PAYMENT_URL_PROCRA,
    FAILED_PAYMENT_URL: process.env.FAILED_PAYMENT_URL,
    MERCADOPAGO_ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN,
    USER_BACKOFFICE: process.env.USER_BACKOFFICE,
    PASS_BACKOFFICE: process.env.PASS_BACKOFFICE,
    SECRET_JWT: process.env.SECRET_JWT
}