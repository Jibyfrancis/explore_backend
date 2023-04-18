import express from "express"
import authController from "../../../adapters/controllers/authController"
import { userDbrepository } from "../../../application/repositories/userDbRepository"
import { authServiceInterface } from "../../../application/services/authserviceInterface"
import { authServices } from "../../services/authServices"
import { userRepositoryMongoDB} from "../../database/repositories/userRepositoryMongodb"




const authRouter = () => {
    const router = express.Router()
    const controllers=authController(
        userDbrepository,
        userRepositoryMongoDB,
        authServiceInterface,
        authServices,
)

    router.post('/userRegister',controllers.registerUser)
    router.post('/userLogin',controllers.loginUser)
    router.post('/userGoogleLogin',controllers.googleLoginUser)
    // router.post('/userNumberSignup',controllers.numberSignupUser)
  
    return router
}

export default authRouter



