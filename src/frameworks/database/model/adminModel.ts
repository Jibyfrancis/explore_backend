import {Schema,model} from "mongoose" 

const adminSchema= new Schema({
    userName:{
        type:String,
        required:[true]
    },
    password:{
        type:String,
        required:[true]
    }
})
const Admin =model('Admin',adminSchema,'admin')
export default Admin