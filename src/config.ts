import dotenv from 'dotenv'
dotenv.config()

const configKeys={
    mongoDbUrl:process.env.DATABASE as string,
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET as string,
    cloud_name:process.env.cloud_name as string,
    api_key: process.env.cloud_api_key as string,
    api_secret: process.env.cloud_api_secret as string

}
export default configKeys