import {Schema,model} from "mongoose" 

const propertyTypeScheme= new Schema({
   name:{
        type:String,
      
    },
  imageUrl:{
        type:String,
        
    }
})
const PropertyType =model('PropertyType',propertyTypeScheme,'propertytype')
export default PropertyType