import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const emailCollection = 'emails';

const emailSchema = new mongoose.Schema({
    email: { type: String },
    curso: { type: String },
    payment: { type: Boolean },
    sent: { type: Boolean}
})

emailSchema.plugin(mongoosePaginate);

export const emailModel = mongoose.model(emailCollection, emailSchema)