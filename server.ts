import {app} from "./app";
import connectDB from "./utils/db";
require("dotenv").config();

//craeate server
app.listen(process.env.PORT,()=>{
    console.log(`server is connected with port ${process.env.PORT}`);
    connectDB();
})