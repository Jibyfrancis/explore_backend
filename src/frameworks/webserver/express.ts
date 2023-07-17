import express, { Application,NextFunction } from "express";
import morgan from "morgan";
import cors from 'cors';
import session from 'express-session';
import configKeys from "../../config";


declare module 'express-session' {
  export interface SessionData {
    verifyid:string ;
  }
}
const expressConfig=(app:Application)=>{
    app.use(cors({ origin: ["http://localhost:4200"],credentials: true }))
    app.use(morgan('dev'));
    // app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(
        session({
          secret: "mySecretKey",
          resave: false,
          saveUninitialized: false,
          cookie: {
            maxAge: 24 * 60 * 60 * 1000,
          },
        })
      );
      


}
export default expressConfig    