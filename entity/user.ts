export default function userEntity(...args: any) {
  console.log(args[0].email);

  return {
    getUserName: () => args[0].userName,
    getEmail: () => args[0].email,
    getPassword: () => args[0].password,
    getMobile: () => args[0].mobile,
    getIsGoogleuser: () => args[0].isGoogleUser,
    getPhotoUrl: () => args[0].photoUrl,
    getIsHosted: () => args[0].isHosted,
    getIsActive:()=>args[0].isActive,
    getHostingRequest:()=>args[0].hostingRequest
  };
}
