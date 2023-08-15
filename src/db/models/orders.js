import mongoose from "mongoose";

const orderCollection = 'orders';

const orderSchema = new mongoose.Schema({
    collection_id: { type: String },
    collection_status: { type: String },
    payment_id: { type: String },
    status: { type: String },
    external_reference: { type: String, required: true },
    payment_type: { type: String },
    merchant_order_id: { type: String },
    preference_id: { type: String },
    site_id: { type: String },
    processing_mode: { type: String },
    merchant_account_id: { type: String }
})

export const orderModel = mongoose.model(orderCollection, orderSchema)