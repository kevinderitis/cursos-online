import mongoose from 'mongoose';
import { orderModel } from './models/orders.js';
import config from '../config/config.js';

await mongoose.connect(config.MONGO_URL) 

export const createOrder = async order => {
    let newOrder;
    try {
        newOrder = await orderModel.create(order)
    } catch (error) {
        console.log(error)
    }
    return newOrder;
};

export const getAllOrders = async () => {
    let orders;
    try {
        orders = await orderModel.findAll();
    } catch (error) {
        console.log(error)
    }
    return orders;
}

export const getOrderById = async id => {
    let order;
    try {
        order = await orderModel.findOne({ _id: id});
    } catch (error) {
        console.log(error)
    }
    return order;
}

export const getOrderByEmail = async email => {
    let order;
    try {
        order = await orderModel.findOne({ email: email});
    } catch (error) {
        console.log(error)
    }
    return order;
}