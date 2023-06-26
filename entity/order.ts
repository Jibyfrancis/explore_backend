export default function orderEntity(...args: any) {
    return {
        getpropertyId:()=>args[0].propertyId,
        getpropertyName: () => args[0].propertyName,
        getPropertyName: () => args[0].propertyName,
        getPropertyAddress: () => args[0].propertyAddress,
        getImage: () => args[0].image,
        getAdult: () => args[0].adult,
        getChildren: () => args[0].children,
        getCheckIn: () => args[0].checkIn,
        getCheckOut: () => args[0].checkOut,
        getTotalPrice: () => args[0].totalPrice,
        getPaymentId:()=>args[0].paymentId,
        getPaymentStatus:()=>args[0].paymentStatus,
        getBookingStatus:()=>args[0].bookingStatus
    }
}