import { Application } from "express"
import authRouter from "./auth"

const routes=(app:Application)=>{

    app.use('/auth',authRouter())
   
}
  
  export default routes
  