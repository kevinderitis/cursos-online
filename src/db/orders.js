import mongoose from 'mongoose';
import { orderModel } from './models/orders';

await mongoose.connect('mongodb+srv://coderhouse:coder123456@coderhouse.z88zdi9.mongodb.net/cursosonline?retryWrites=true&w=majority') 

export const createOrder = async order => {
    let order;
    try {
        order = await orderModel.create(order)
    } catch (error) {
        console.log(error)
    }
    return order;
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