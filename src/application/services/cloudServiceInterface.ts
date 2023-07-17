import { CloudServiceReturn } from "../../frameworks/services/cludService";

export const cloudServiceInterface=(service:CloudServiceReturn)=>{
    const uploadImage=(path:string)=>service.uploadImage(path)
    const deleteImage=(imageUrl:string)=>service.deleteImage(imageUrl)
    const uploadMultipleImage=(path:string[])=>service.uploadMultipleImages(path)
    const deleteMultiples=(imageUrls:string[])=>service.deleteMultiple(imageUrls)

    return{
        uploadImage,
        deleteImage,
        uploadMultipleImage,
        deleteMultiples
    }

}
export type CloudServiceInterface=typeof cloudServiceInterface