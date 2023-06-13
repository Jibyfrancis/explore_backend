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

const userRouter=()=>{
    const router = express.Router()
    const controller=userController(
        hostDbRepository,
        hostRepositoryMongoDb,
        userDbrepository,
        userRepositoryMongoDB,
        cloudServiceInterface,
        cloudService



    )

    router.post('/host-request',authMiddleware,controller.registerHost)
    router.get('/user/:id',controller.findUser)
    router.post('/createList',upload.array('photos'),controller.createList)
    router.get('/user-property-list/:id',controller.findPropertyByUser)
    router.get('/get-all-property',controller.findAllProperty)
    router.get('/property-detail/:id',controller.findPropertyById)
    
    

    return router


}
export default userRouter
