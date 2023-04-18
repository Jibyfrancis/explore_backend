import express, { Application,NextFunction } from "express";
import morgan from "morgan";
import cors from 'cors';

import configKeys from "../../config";

const expressConfig=(app:Application)=>{
    app.use(cors({ origin: "http://localhost:4200" }))
    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

}
export default expressConfig    