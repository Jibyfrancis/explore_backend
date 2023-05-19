import {Schema,model} from "mongoose" 

const aminitySchema= new Schema({
   name:{
        type:String,
      
    },
  imageUrl:{
        type:String,
        
    }
})
const Amenity =model('Amenity',aminitySchema,'amenity')
export default Amenity