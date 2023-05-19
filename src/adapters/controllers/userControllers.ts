import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HostDbInterface } from "../../application/repositories/hostDbRepository";
import { HostRepositoryMongoDb } from "../../frameworks/database/repositories/hostRepositoryMongodb";
import { getUserById, hostRegister, createPropery,getPropertyByUserId,getAllProperty,getPropertyById} from "../../application/useCases/user/host";
import { Types } from "mongoose";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/repositories/userRepositoryMongodb";
import { CloudService } from "../../frameworks/services/cludService";
import { CloudServiceInterface } from "../../application/services/cloudServiceInterface";
import { CreatePropertyInterface } from "../../type/createPropertyInterface";

const userController = (
    hostDbRepository: HostDbInterface,
    hostRrepositoryImpl: HostRepositoryMongoDb,
    userDbRepository: UserDbInterface,
    userDbRepositoryImpl: UserRepositoryMongoDB,
    cloudServiceInterface: CloudServiceInterface,
    cloudServiceImpl: CloudService

) => {
    const dbRepositoryHost = hostDbRepository(hostRrepositoryImpl());
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const cloudService = cloudServiceInterface(cloudServiceImpl());

    const registerHost = asyncHandler(async (req: Request, res: Response) => {
        const host: {
            fullName: string;
            userId: Types.ObjectId;
            dateOfBirth: string;
            aadharNumber: string;
            panCardNumber: string;
            approved: boolean;
        } = req.body;

        const data = await hostRegister(host, dbRepositoryHost);
        res.json({
            status: "success",
        });
    });

    const findUser = asyncHandler(async (req: Request, res: Response) => {
        const id = new Types.ObjectId(req.params.id)
        const user = await getUserById(id, dbRepositoryUser)
        res.json({
            status: "Success",
            user
        })

    })
    const createList = asyncHandler(async (req: Request, res: Response) => {
        const { roomType, name, description, location, address, price, guest, bedroom, bathrooms, kitchen, balcony, amenities, userId } = req.body;

        const list = {
            name,
            description,
            roomType,
            location: JSON.parse(location),
            address: JSON.parse(address),
            price: +price,
            guest: +guest,
            bedroom: +bedroom,
            bathrooms: +bathrooms,
            kitchen: +kitchen,
            balcony: +balcony,
            amenities,
            userId
        };
        console.log(list);

        const photos = req.files as Express.Multer.File[];
        const paths = photos.map((file) => {
            return file.path;
        });
        const imageUrl = await cloudService.uploadMultipleImage(paths);
        const data = { ...list, imageUrl }
        const createNewProperty = await createPropery(data, dbRepositoryUser)
        res.json({
            status: 'success'
        })

    })

    const findPropertyByUser=asyncHandler(async(req:Request,res:Response)=>{
        const id=new Types.ObjectId(req.params.id)
        const property= await getPropertyByUserId(id,dbRepositoryUser)
        res.json({
            status:'Success',
            property
        })    
    })

    const findAllProperty=asyncHandler(async(req:Request,res:Response)=>{
        const properties=await getAllProperty(dbRepositoryUser)
        res.json({
            status:'Success',
            properties

        })
    })
    
    const findPropertyById=asyncHandler(async(req:Request,res:Response)=>{
        const id=new Types.ObjectId(req.params.id)
        const property=await getPropertyById(id,dbRepositoryUser)
        res.json({
            status:'Success',
            property
        })
    })

    return {
        registerHost,
        findUser,
        createList,
        findPropertyByUser,
        findAllProperty,
        findPropertyById

    };
};
export default userController;
