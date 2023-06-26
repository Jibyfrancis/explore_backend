export interface OrderInterface {
    propertyId: string;
    propertyName: string;
    propertyAddress: string,
    image: string;
    adult: number;
    children: number;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
    paymentId:string,
    paymentStatus?:string,
    bookingStatus?:string
    
  }