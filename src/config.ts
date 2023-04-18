import dotenv from 'dotenv'
dotenv.config()

const configKeys={
    mongoDbUrl:process.env.DATABASE as string,
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET as string,
}
export default configKeys