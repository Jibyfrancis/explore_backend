import configKeys from "../../config";
const cloudinary = require("cloudinary").v2;
const extractPublicId = require('cloudinary-build-url').extractPublicId;

cloudinary.config({
  cloud_name: configKeys.cloud_name,
  api_key: configKeys.api_key,
  api_secret: configKeys.api_secret,
});

export const cloudService = () => {
  const uploadImage = async (path: any): Promise<string> => {
    const result = await new Promise((resolve, rejects) => {
      cloudinary.uploader.upload(path, (err: any, res: any) => {
        if (err) {
          console.log(err);
          //   return res.status(500).send("upload image error");
        }
        resolve(res.secure_url);
      });
    });
    // console.log(result);
    return result as string;
  };

  const uploadMultipleImages = async (path: string[]): Promise<string[]> => {
    const uploadPromises = path.map((imagePath: string) => {
      return new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload(imagePath, (error: any, result: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        });
      });
    });
  
    const urls = await Promise.all(uploadPromises);
  
    return urls;
  };
  

  const deleteImage = async (imageUrl: string): Promise<string> => {
    const publicId = extractPublicId(imageUrl);
    const result = await new Promise((resolve, rejects) => {
      cloudinary.uploader.destroy(publicId, function (error: any, result: any) {
        if (error) {
          console.log(error);
        }
        resolve(result);
      });
    });
    return result as string;
  };

  return {
    uploadImage,
    deleteImage,
    uploadMultipleImages
  };
};
export type CloudService = typeof cloudService;
export type CloudServiceReturn = ReturnType<CloudService>;
