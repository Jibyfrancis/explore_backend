import {Types} from 'mongoose'
export interface ConfirmOrderInterface{
    paymentId:String,
    orderId:Types.ObjectId
}