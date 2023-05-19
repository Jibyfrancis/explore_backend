export interface UserInterface{
    _id:string,
    userName:string,
    email:string,
    mobile:string,
    password:string,
    isBlocked:boolean,
    isGoogleUser:boolean,
    photoUrl:string,
    isHosted:boolean,
    hostingRequest: Boolean
}
export interface CreateUserInterface{
    userName:string,
    email:string,
    mobile:string,
    password:string,
    isBlocked?:boolean,
    isGoogleUser?:boolean,
    photoUrl?:string,
    isHosted?:boolean
}
export interface CreateGoogleUserInterface{
    userName:string,
    email:string,
    photoUrl:string,
    isGoogleUser:boolean
    isBlocked?:boolean,
}
