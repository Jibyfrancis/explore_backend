export interface User {
    getUserName: () => string
    getEmail: () => string,
    getMobile: () => string,
    getPassword: () => string,
    getIsGoogleuser: () => boolean,
    getPhotoUrl: () => string,
    GetIsHosted: () => boolean
}

export default function createUser(
    userName: string,
    email: string,
    mobile: string,
    password: string,
    isGoogleUser: boolean,
    photoUrl: string,
    isHosted: boolean
): User {

    return {

        getUserName: () => userName,
        getEmail: () => email,
        getMobile: () => mobile,
        getPassword: () => password,
        getIsGoogleuser: () => isGoogleUser,
        getPhotoUrl: () => photoUrl,
        GetIsHosted: () => isHosted,
    }
}