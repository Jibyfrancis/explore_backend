import { HostRepositoryMongoDb } from "../../frameworks/database/repositories/hostRepositoryMongodb";

export const hostDbRepository = (
    repository: ReturnType<HostRepositoryMongoDb>
) => {
    const addHost = async(host:{
        getFullName:()=>string,
        getUserId:()=> string
        getDateOfBirth:()=>string,
        getAddress:()=>string
        getAadharNumber:()=>string
        getPancardNumber:()=>string

    }) => {
        console.log(host.getFullName());
        
        return await repository.addHost(host)

    }
    return{
        addHost
    }

}
export type HostDbInterface = typeof hostDbRepository