import mongoose from "mongoose";

const emailCollection = 'emails';

const emailSchema = new mongoose.Schema({
    email: { type: String },
    curso: { type: String },
    payment: { type: Boolean },
    sent: { type: Boolean}
})

export const emailModel = mongoose.model(emailCollection, emailSchema)