import mongoose from "mongoose";

const orderCollection = 'orders';

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: String, required: true },
    email: { type: String, required: true }
})

export const orderModel = mongoose.model(orderCollection, orderSchema)