import { PaymentServiceReturn } from "../../frameworks/services/paymentService";

export const paymentServiceInterface=(payment:PaymentServiceReturn)=>{
    const paymentgate=(data:any)=>payment.paymentgate(data)
    return{
        paymentgate
    }
}
export type PaymentServiceInterface=typeof paymentServiceInterface