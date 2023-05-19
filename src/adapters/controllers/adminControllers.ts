import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
    changeStausUser,
    findAllUser,
    findAllHostRequest,
    approveRequest,
    addNewAmenity,
    findAllAmenity,
    addNewPropertyType,
    findAllPropertyType,
    deleteAmenity
} from "../../application/useCases/admin/usecaseAdmin";
import { AdminDbInterface } from "../../application/repositories/adminDbRepository";
import { AdminRepositoryMongoDB } from "../../frameworks/database/repositories/adminRerpositoryMongoDB";
import { CloudServiceInterface } from "../../application/services/cloudServiceInterface";
import { CloudService } from "../../frameworks/services/cludService";

const adminController = (
    adminDbRepository: AdminDbInterface,
    adminRepositoryImpl: AdminRepositoryMongoDB,
    cloudServiceInterface: CloudServiceInterface,
    cloudServiceImpl: CloudService
) => {
    const dbRepositoryAdmin = adminDbRepository(adminRepositoryImpl());
    const cloudService = cloudServiceInterface(cloudServiceImpl());

    const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
        console.log("admin");

        const users = await findAllUser(dbRepositoryAdmin);
        res.json({
            status: "Success",
            users,
        });
    });
    const changeUserStatus = asyncHandler(async (req: Request, res: Response) => {
        const { id, value }: { id: string; value: boolean } = req.body;
        const user = await changeStausUser(id, value, dbRepositoryAdmin);
    });
    const getAllHostRequest = asyncHandler(
        async (req: Request, res: Response) => {
            const hosts = await findAllHostRequest(dbRepositoryAdmin);
            res.json({
                status: "success",
                hosts,
            });
        }
    );

    const approveHostRequest = asyncHandler(
        async (req: Request, res: Response) => {
            const { id }: { id: string } = req.body;
            console.log(req.body);

            const hostRequest = await approveRequest(id, dbRepositoryAdmin);
            res.json({
                status: "success",
                hostRequest,
            });
        }
    );

    const addAmenity = asyncHandler(async (req: Request, res: Response) => {
        const { name }: { name: string } = req.body;
        console.log(req.file);
        const path: any = req.file?.path;
        const imageUrl = await cloudService.uploadImage(path);
        const data: { name: string; imageUrl: string } = {
            name: name,
            imageUrl: imageUrl,
        };
        const result = await addNewAmenity(data, dbRepositoryAdmin);
        res.json({
            status: 'Success'
        })
    });

    const getAllAmenity = asyncHandler(async (req: Request, res: Response) => {
        const amenities = await findAllAmenity(dbRepositoryAdmin);
        res.json({
            status: 'Success',
            amenities
        })
    })
     const removeAmenity=asyncHandler(async(req:Request,res:Response)=>{
        console.log(req.params.id);
        const id:string=req.params.id
        const data=await deleteAmenity(id,dbRepositoryAdmin,cloudService)
        res.json({
            status: 'Success'
        })
        
     })

    const addPropertyType = asyncHandler(async (req: Request, res: Response) => {
        const { name }: { name: string } = req.body;
        console.log(req.body);
        
        const path: any = req.file?.path;
        const imageUrl = await cloudService.uploadImage(path);
        const data: { name: string; imageUrl: string } = {
            name: name,
            imageUrl: imageUrl,
        };
        const result = await addNewPropertyType(data, dbRepositoryAdmin);
        res.json({
            status: 'Success'
        })
    });

    const getAllPropertyType = asyncHandler(async (req: Request, res: Response) => {
        const propertyType = await findAllPropertyType(dbRepositoryAdmin);
        res.json({
            status: 'Success',
            propertyType
        })
    })


    return {
        getAllUsers,
        changeUserStatus,
        getAllHostRequest,
        approveHostRequest,
        addAmenity,
        getAllAmenity,
        addPropertyType,
        getAllPropertyType,
        removeAmenity
    };
};
export default adminController;
