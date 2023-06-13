import { Schema, model } from "mongoose";
import mongoose from"mongoose"

const hostSchema = new Schema({
    fullName: {
        type: String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    dateOfBirth: {
        type: String
    },
    address: {
        type: String
    },
    aadharNumber: {
        type: String
    },
    pancardNumber: {
        type: String
    },
    approved:{
        type:Boolean,
        default:false
    }

})
const Host = model('Host', hostSchema, 'host')
export default Host
