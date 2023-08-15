import axios from 'axios';
import config from '../config/config.js';

const accessToken = config.MERCADOPAGO_ACCESS_TOKEN;


export const getPaymentById = async paymentId => {
const url = `https://api.mercadopago.com/v1/payments/${paymentId}?access_token=${accessToken}`;
try {
    let response = await axios.get(url);
    return response.data;
} catch (error) {
    console.log(error);
    return null
}

}