import { CloudServiceReturn } from "../../frameworks/services/cludService";

export const cloudServiceInterface=(service:CloudServiceReturn)=>{
    const uploadImage=(path:string)=>service.uploadImage(path)
    const deleteImage=(imageUrl:string)=>service.deleteImage(imageUrl)
    const uploadMultipleImage=(path:string[])=>service.uploadMultipleImages(path)

    return{
        uploadImage,
        deleteImage,
        uploadMultipleImage
    }

}
export type CloudServiceInterface=typeof cloudServiceInterface