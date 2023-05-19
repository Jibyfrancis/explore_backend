export default function hostEntity(...args: any) {
    return {
        getFullName: () => args[0].fullName,
        getUserId: () => args[0].userId,
        getDateOfBirth: () => args[0].dataOfBirth,
        getAddress: () => args[0].address,
        getAadharNumber: () => args[0].aadharNumber,
        getPancardNumber: () => args[0].panCardNumber

    }
}