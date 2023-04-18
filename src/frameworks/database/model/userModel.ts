import mongoos, { Schema, model } from 'mongoose'
const userSchema =new Schema( {
    userName: {
        type: String,
        required: [true, 'please fill full name']
    },
    email: {
        type: String,
        required: [true, 'please fill email']
    },
    mobile: {
        type: String,
        
    },
    password: {
        type: String,
    },
    isGoogleUser:{
        type: Boolean,
        default:false
    },
    photoUrl:{
        type: String,
    },
    isHosted:{
        type: Boolean,
        default:false
    }
})
const User = model('User',userSchema,'users')
export default User
