import mongoose from 'mongoose'
var Schema = mongoose.Schema;

//deal schema
export const dealSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    amountRequired: Number
});
 
export const dealsCollection = mongoose.model('deals', dealSchema)