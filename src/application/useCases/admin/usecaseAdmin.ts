import { HttpStatus } from "../../../type/httpStatus";
import { UserInterface } from "../../../type/userInterface";
import AppError from "../../../utils/appErrors";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { AdminDbInterface } from "../../repositories/adminDbRepository";

import amenityEntity from "../../../../entity/amenity";
import { AmenityInterface } from "../../../type/amenityInterface";
import { PropertyTypeInterface } from "../../../type/propertyTypeInterface";
import propertyTypeEntity from "../../../../entity/property-type";
import { cloudService } from "../../../frameworks/services/cludService";
import { CloudServiceInterface } from "../../services/cloudServiceInterface";

export const findAllUser = async (
    adminRepository: ReturnType<AdminDbInterface>
) => {
    const users = await adminRepository.getAllusers();

    return users;
};

export const changeStausUser = async (
    id: string,
    value: boolean,
    adminRepository: ReturnType<AdminDbInterface>
) => {
    const data = await adminRepository.changeStausUser(id, value);
    console.log(data);
};

export const findAllHostRequest = async (
    adminRepository: ReturnType<AdminDbInterface>
) => {
    const hosts = await adminRepository.getAllHostRequest();
    return hosts;
};

export const approveRequest = async (
    id: string,
    adminRepository: ReturnType<AdminDbInterface>
) => {
    return adminRepository.hostRequestApprove(id);
};

export const addNewAmenity = async (
    amenity: AmenityInterface,
    adminRepository: ReturnType<AdminDbInterface>
) => {
    const newAmenity = amenityEntity(amenity)
    const amenityData = await adminRepository.createAmenity(newAmenity)
    return amenityData
}

export const findAllAmenity = async (
    adminRepository: ReturnType<AdminDbInterface>
) => {
    const amenities = await adminRepository.getAllAmenity()
    return amenities
}

export const deleteAmenity = async (
    id: string,
    adminRepository: ReturnType<AdminDbInterface>,
    cloudService: ReturnType<CloudServiceInterface>
) => {
    const amenity: AmenityInterface | null = await adminRepository.findAmenityById(id)
    const imageUrl = amenity?.imageUrl ?? ""
    await cloudService.deleteImage(imageUrl)
    const deleteAmenity = await adminRepository.deleteAmenity(id)
    return deleteAmenity



}

export const addNewPropertyType = async (
    PropertyType: PropertyTypeInterface,
    adminRepository: ReturnType<AdminDbInterface>
) => {
    const newPropertyType = propertyTypeEntity(PropertyType)
    const propertyData = await adminRepository.createPropertyType(newPropertyType)
    return propertyData
}

export const findAllPropertyType = async (
    adminRepository: ReturnType<AdminDbInterface>
) => {
    const propertyType = await adminRepository.getAllPropertyType()
    return propertyType
}

