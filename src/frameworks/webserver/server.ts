import { Server } from "http";
import configKeys from "../../config";

const ServerConfig=(server:Server)=>{
    const startServer=()=>{
        server.listen(configKeys.port,()=>{
            console.log("Server started on port "+configKeys.port);
        })
        
    }
    return {
        startServer
    }
}
export default ServerConfig