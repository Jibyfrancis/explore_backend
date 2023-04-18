import express, {Application,NextFunction} from 'express'
import http from 'http'
import ServerConfig from './frameworks/webserver/server'
import expressConfig from './frameworks/webserver/express';
import appError from './utils/appErrors'
import routes from './frameworks/webserver/routes';
import connectDB from './frameworks/database/DbConnection';
import errorHandlingMidlleware from './frameworks/webserver/middlewares/errorHandlingMiddkeware';


const app:Application=express()
const server=http.createServer(app)

connectDB()

expressConfig(app)

routes(app)

app.use(errorHandlingMidlleware)

app.all('*',(req,res,next:NextFunction)=>{
    next(new appError('Not found',404))
})

ServerConfig(server).startServer()