var express=require("express");

var router=express.Router();
var userController=require("../controller/userController")
var auth=require("../auth/userauth")
router.post("/signup", userController.user_signUp);
router.post("/login",userController.user_login);
router.put("/userupdate",auth.requireToken,userController.updateprofile);
module.exports=router;
