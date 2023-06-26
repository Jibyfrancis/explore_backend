import {Schema,model,Types } from "mongoose";

const propertySchema=new Schema({
    name: { type: String },
    description: { type: String },
    roomType: { type: String },
    location: {
      lat: { type: Number },
      long: { type: Number },
    },
    address: {
      address: { type: String },
    },
    price: { type: Number },
    guest: { type: Number },
    bedroom: { type: Number },
    bathrooms: { type: Number },
    kitchen: { type: Number },
    balcony: { type: Number },
    amenities: [{ type: Types.ObjectId ,ref:'Amenity'}],
    userId: { type: Types.ObjectId ,ref:'User'},
    imageUrl: [{type:String}]

})
const Property=model('Property', propertySchema,'property')
export default Property