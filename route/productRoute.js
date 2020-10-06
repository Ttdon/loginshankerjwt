var express=require("express");

var router=express.Router();
var userController=require("../controller/product")
var auth=require("../auth/userauth")
router.post("/product", userController.user_product);
// router.post("/product/:id", userController.product_details);
router.get("/product/id", userController.details);
module.exports=router;
