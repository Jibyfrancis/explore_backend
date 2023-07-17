import express from 'express'
import userController from '../../../adapters/controllers/userControllers'
import authMiddleware from '../middlewares/authMiddleware'
import { hostDbRepository } from '../../../application/repositories/hostDbRepository'
import { hostRepositoryMongoDb } from '../../database/repositories/hostRepositoryMongodb'
import { userDbrepository } from '../../../application/repositories/userDbRepository'
import { userRepositoryMongoDB } from '../../database/repositories/userRepositoryMongodb'
import upload from '../middlewares/multer'
import { cloudServiceInterface } from '../../../application/services/cloudServiceInterface'
import { cloudService } from '../../services/cludService'
import { paymentService } from '../../services/paymentService'
import { paymentServiceInterface } from '../../../application/services/paymentserviceInterface'

const userRouter=()=>{
    const router = express.Router()
    const controller=userController(
        hostDbRepository,
        hostRepositoryMongoDb,
        userDbrepository,
        userRepositoryMongoDB,
        cloudServiceInterface,
        cloudService,
        paymentService,
        paymentServiceInterface



    )

    router.post('/host-request',authMiddleware,controller.registerHost)
    router.get('/user/:id',controller.findUser)
    router.post('/add-new-property',upload.array('photos'),controller.createList)
    router.get('/user-property-list/:id',controller.findPropertyByUser)
    router.get('/get-all-property',controller.findAllProperty)
    router.get('/property-detail/:id',controller.findPropertyById)
    router.post('/checkOut',controller.checkOut)
    router.patch('/confirm-order',controller.confirmOrder)
    router.get('/get-all-booking',controller.findAllBooking)
    router.patch('/cancel-booking/:id',controller.cancelOrder)
    router.post('/search-property',controller.findSearchProperty)
    router.delete('/remove-property/:id',controller.removeProperty)
    router.put('/edit-property',upload.array('photos'),controller.editProperty)

    
    

    return router


}
export default userRouter
