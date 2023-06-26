import configKeys from "../../config";
import { HttpStatus } from "../../type/httpStatus";
import AppError from "../../utils/appErrors";
const strip_secret = configKeys.strip_secret
const stripe = require('stripe')(strip_secret)

export const paymentService = () => {


    const paymentgate = async (data: any) => {
        console.log(data);
        try {

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                shipping_options: [
                    {
                      shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: { amount: 0, currency: "INR" },
                        display_name: "Free shipping",
                      },
                    },
                    {
                      shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: { amount: 1500, currency: "INR" },
                        display_name: "Next day air",
                      },
                    },
                  ],
                line_items: [
                    {
                      price_data: {
                        currency: "INR",
                        product_data: {
                          name: data.propertyName,
                          image:data.imageUrl,
                          description: data.propertyAddress.address,
                        },
                        unit_amount: data.totalPrice * 100,
                      },
                      quantity: 1,
                    },
                  ],
                mode: "payment",
                success_url: "http://localhost:4200/success",
                cancel_url: "http://localhost:4200/cancel",
            });
            return (session.id);
        } catch (err) {
            console.log(err);
            throw new AppError("Something happened", HttpStatus.BAD_REQUEST);

        }

    }

    return {
        paymentgate
    }

}



export type PaymentService = typeof paymentService;
export type PaymentServiceReturn = ReturnType<PaymentService>;