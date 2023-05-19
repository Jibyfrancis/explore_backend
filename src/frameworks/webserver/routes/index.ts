import { Application } from "express"
import authRouter from "./auth"
import adminRouter from "./admin"
import userRouter from "./user"

const routes=(app:Application)=>{

    app.use('/auth',authRouter())
    app.use('/admin',adminRouter())
    app.use('/',userRouter())
   
}
  
  export default routes
  