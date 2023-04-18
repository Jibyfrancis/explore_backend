export interface UserInterface{
    _id:string,
    userName:string,
    email:string,
    mobile:string,
    password:string,
    isGoogleUser:boolean,
    photoUrl:string,
    isHosted:boolean
}
export interface CreateUserInterface{
    userName:string,
    email:string,
    mobile:string,
    password:string,
    isGoogleUser?:boolean,
    photoUrl?:string,
    isHosted?:boolean
}
export interface CreateGoogleUserInterface{
    userName:string,
    email:string,
    photoUrl:string,
    isGoogleUser:boolean
}
