import mongoose from 'mongoose';
import { emailModel } from './models/email.js';
import config from '../config/config.js';

await mongoose.connect(config.MONGO_URL) 

export const createRecord = async email => {
    let newRecord;
    try {
        newRecord = await emailModel.create(email)
    } catch (error) {
        console.log(error)
    }
    return newRecord;
};

export const updateRecord = async (email) => {
    try {
        const filter = { email };
        const update = { $set: { sent: true, payment: true } };

        const result = await emailModel.updateOne(filter, update);

        if (result.nModified === 1) {
            const updatedRecord = await emailModel.findById({email});
            return updatedRecord;
        } else {
            console.log('Documento no encontrado o no modificado.');
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getRecordByEmail = async email => {
    let order;
    try {
        order = await emailModel.findOne({ email });
    } catch (error) {
        console.log(error)
    }
    return order;
}
