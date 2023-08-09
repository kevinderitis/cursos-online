import mongoose from "mongoose";

const orderCollection = 'orders';

const orderSchema = new mongoose.Schema({
    collection_id: { type: String, required: true },
    collection_status: { type: String, required: true },
    payment_id: { type: String, required: true },
    status: { type: String, required: true },
    external_reference: { type: String, required: true },
    payment_type: { type: String, required: true },
    merchant_order_id: { type: String, required: true },
    preference_id: { type: String, required: true },
    site_id: { type: String, required: true },
    processing_mode: { type: String, required: true },
    merchant_account_id: { type: String, required: true }
})

export const orderModel = mongoose.model(orderCollection, orderSchema)