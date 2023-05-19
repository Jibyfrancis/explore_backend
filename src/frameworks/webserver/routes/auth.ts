import express from "express"
import authController from "../../../adapters/controllers/authController"
import { userDbrepository } from "../../../application/repositories/userDbRepository"
import { authServiceInterface } from "../../../application/services/authserviceInterface"
import { authServices } from "../../services/authServices"
import { userRepositoryMongoDB} from "../../database/repositories/userRepositoryMongodb"
import { adminDbReopsitory } from "../../../application/repositories/adminDbRepository"
import { adminRepositoryMongoDB } from "../../database/repositories/adminRerpositoryMongoDB"




const authRouter = () => {
    const router = express.Router()
    const controllers=authController(
        userDbrepository,
        userRepositoryMongoDB,
        authServiceInterface,
        authServices,
        adminDbReopsitory,
        adminRepositoryMongoDB
)

    router.post('/userRegister',controllers.registerUser)
    router.post('/userLogin',controllers.loginUser)
    router.post('/userGoogleLogin',controllers.googleLoginUser)
    router.post('/adminLogin',controllers.loginAdmin)
  
    return router
}

export default authRouter



