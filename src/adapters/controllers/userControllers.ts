import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { HostDbInterface } from "../../application/repositories/hostDbRepository";
import { HostRepositoryMongoDb } from "../../frameworks/database/repositories/hostRepositoryMongodb";
import {
    getUserById,
    hostRegister,
    createPropery,
    getPropertyByUserId,
    getAllProperty,
    getPropertyById,
    createOrder,
    confirmNewOrder,
    getAllBooking,
    cancelBooking,
    seachProperty,
    deletePropertyType,
    updateProperty
} from "../../application/useCases/user/host";
import { Types } from "mongoose";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/repositories/userRepositoryMongodb";
import { CloudService } from "../../frameworks/services/cludService";
import { CloudServiceInterface } from "../../application/services/cloudServiceInterface";
import { CreatePropertyInterface } from "../../type/createPropertyInterface";
import { PaymentService } from "../../frameworks/services/paymentService";
import { PaymentServiceInterface } from "../../application/services/paymentserviceInterface";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import { OrderInterface } from "../../type/orderInterface";

const userController = (
    hostDbRepository: HostDbInterface,
    hostRrepositoryImpl: HostRepositoryMongoDb,
    userDbRepository: UserDbInterface,
    userDbRepositoryImpl: UserRepositoryMongoDB,
    cloudServiceInterface: CloudServiceInterface,
    cloudServiceImpl: CloudService,
    paymentServiceImpl: PaymentService,
    paymentServiceInterface: PaymentServiceInterface
) => {
    const dbRepositoryHost = hostDbRepository(hostRrepositoryImpl());
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const cloudService = cloudServiceInterface(cloudServiceImpl());
    const paymentService = paymentServiceInterface(paymentServiceImpl());

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
        const id = new Types.ObjectId(req.params.id);
        const user = await getUserById(id, dbRepositoryUser);
        res.json({
            status: "Success",
            user,
        });
    });
    const createList = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);

        const {
            roomType,
            name,
            description,
            location,
            address,
            price,
            guest,
            bedroom,
            bathrooms,
            kitchen,
            balcony,
            amenities,
            userId,
        } = req.body;

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
            amenities: JSON.parse(amenities),
            userId,
        };
        console.log(list);

        // const photos = req.files as Express.Multer.File[];
        // console.log(photos);

        // const paths = photos.map((file) => {
        //     return file.path;
        // });
        // const imageUrl = await cloudService.uploadMultipleImage(paths);
        // const data = { ...list, imageUrl };
        // const createNewProperty = await createPropery(data, dbRepositoryUser);
        res.json({
            status: "success",
        });
    });

    const findPropertyByUser = asyncHandler(
        async (req: Request, res: Response) => {
            const id = new Types.ObjectId(req.params.id);
            const property = await getPropertyByUserId(id, dbRepositoryUser);
            res.json({
                status: "Success",
                property,
            });
        }
    );

    const findAllProperty = asyncHandler(async (req: Request, res: Response) => {
        const properties = await getAllProperty(dbRepositoryUser);

        res.json({
            status: "Success",
            properties,
        });
    });

    const findPropertyById = asyncHandler(async (req: Request, res: Response) => {
        const id = new Types.ObjectId(req.params.id);
        const property = await getPropertyById(id, dbRepositoryUser);
        console.log(property);
        res.json({
            status: "Success",
            property,
        });
    });
    const checkOut = asyncHandler(async (req: Request, res: Response) => {
        const data = req.body;
        paymentService.paymentgate(req.body).then(async (paymentId) => {
            req.session.verifyid = paymentId;

            // console.log((req.session as any).verifyid);

            const order = { ...data, paymentId };
            const orderItem = await createOrder(order, dbRepositoryUser);
            res.json({
                status: "Success",
                paymentId,
                orderId: orderItem._id,
            });
        });
    });

    const confirmOrder = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        console.log("session" + (req.session as any).verifyid);
        const { paymentId, orderId } = req.body;
        const data = { paymentId, orderId: new Types.ObjectId(orderId) };
        const orderConfirm = await confirmNewOrder(data, dbRepositoryUser, req);

        console.log(orderConfirm);
        res.json({
            staus: "Success",
            orderConfirm
        })
    });
    const findAllBooking = asyncHandler(async (req: Request, res: Response) => {
        const booking = await getAllBooking(dbRepositoryUser)
        res.json({
            status: 'Success',
            booking
        })
    })
    const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);

        const bookingId = new Types.ObjectId(req.params.id)
        const bookingCancel = await cancelBooking(bookingId, dbRepositoryUser)
        res.json({
            status: 'Success',
            bookingCancel
        })
    })
    const findSearchProperty = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body)
        const searchKeys = req.body.address.split(',').filter((keyword: string) => keyword[0].trim())
        const data = {
            searchKey: searchKeys,
            from: req.body.from,
            to: req.body.to
        }
        console.log(data);
        const propertySearch = await seachProperty(data, dbRepositoryUser)
        console.log(propertySearch);
        res.json({
            status: "Success",
            propertySearch
        })
    })

    const editProperty = asyncHandler(async (req: Request, res: Response) => {
        // console.log(req.body);
        const {
            roomType,
            name,
            description,
            location,
            address,
            price,
            guest,
            bedroom,
            bathrooms,
            kitchen,
            balcony,
            amenities,
            userId,
            imageurls
        } = req.body;

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
            amenities: JSON.parse(amenities),
            imageUrls: JSON.parse(imageurls),
            userId,

        };
        console.log(list);
        const proId=new Types.ObjectId(req.body.proId)
        const dltimg = JSON.parse(req.body.deleteimg)
        console.log(dltimg);
        const photos = req.files as Express.Multer.File[];
        const paths = photos.map((file) => {
            return file.path;
        });
        const dlt = await cloudService.deleteMultiples(dltimg)
        const urls = await cloudService.uploadMultipleImage(paths);
        list.imageUrls.push(...urls)
        console.log(list.imageUrls);
        const data=await updateProperty(proId,list,dbRepositoryUser)
        
        
    })

    const removeProperty = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.params.id);
        const propertyId = new Types.ObjectId(req.params.id)
        const data = await deletePropertyType(propertyId, dbRepositoryUser, cloudService)
        res.json({
            status: 'Success',

        })


    })

    return {
        registerHost,
        findUser,
        createList,
        findPropertyByUser,
        findAllProperty,
        findPropertyById,
        checkOut,
        confirmOrder,
        findAllBooking,
        cancelOrder,
        findSearchProperty,
        editProperty,
        removeProperty
    };
};
export default userController;
