import express from "express"
import adminController from "../../../adapters/controllers/adminControllers"
import authMiddleware from "../middlewares/authMiddleware"
import { adminDbReopsitory } from "../../../application/repositories/adminDbRepository"
import { adminRepositoryMongoDB } from "../../database/repositories/adminRerpositoryMongoDB"
import upload from "../middlewares/multer"
import { cloudService } from "../../services/cludService"
import { cloudServiceInterface } from "../../../application/services/cloudServiceInterface"


const adminRouter = () => {
    const router = express.Router()
    const controller = adminController(
        adminDbReopsitory,
        adminRepositoryMongoDB,
        cloudServiceInterface,
        cloudService

    )

    router.get('/getAllUsers', authMiddleware, controller.getAllUsers)
    router.put('/changeUserStatus', authMiddleware, controller.changeUserStatus)
    router.get('/getAllHostRequest', authMiddleware, controller.getAllHostRequest)
    router.put('/approveHostRequest', authMiddleware, controller.approveHostRequest)
    router.post('/addAmenity', upload.single('image'), controller.addAmenity)
    router.get('/getAllAmenity', controller.getAllAmenity)
    router.post('/addPropertyType',upload.single('image'), controller.addPropertyType)
    router.get('/getAllPropertyType', controller.getAllPropertyType)
    router.delete('/removeAmenity/:id',controller.removeAmenity)
    router.delete('/removePropertyType/:id',controller.removePropertyType)




    return router



}

export default adminRouter