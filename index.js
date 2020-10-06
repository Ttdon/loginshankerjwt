const express=require("express");
const app=express();
const bodyParse=require("body-parser");
const mongoose=require("mongoose");

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));
var userRoute=require("./route/userRoute");
var ProductRoute=require("./route/productRoute");
app.use("/",userRoute);
app.use("/",ProductRoute);
app.listen(4500, ()=>{
    console.log("port is running");
});
module.exports=app;