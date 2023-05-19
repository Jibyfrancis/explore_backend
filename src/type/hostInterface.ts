import {Types} from 'mongoose'
export interface HostInterface{
    fullName:string,
    userId:Types.ObjectId
    dateOfBirth:string,
    aadharNumber:string,
    panCardNumber:string,
    approved:boolean
}