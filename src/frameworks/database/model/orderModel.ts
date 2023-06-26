import { Schema ,model} from "mongoose";

const orderSchema= new Schema({
    propertyName:{type:String},
    propertyAddress: { type: String},
      image: { type: String },
      adult: { type: Number },
      children: { type: Number },
      checkIn: { type: String },
      checkOut: { type: String },
      totalPrice: { type: Number },
      paymentId:{type:String},
      paymentStatus:{type:String,default:'pending'},
      bookingStatus:{type:String,default:'pending'}
})

const Order=model('Order',orderSchema,'order')
export default Order