var { UserModel } = require("../model/product");
var md5 = require("md5");
const joi = require("joi");
var comFunc=require('../modules/commonFuns');
//const { Error } = require("mongoose");
exports.user_product = async (req, res) => {
 
  try {
    let {
      product_name,
      price,
      origin,
      brand
      
    
    } = req.body;
    const schema = joi.object().keys({
      product_name: joi.string().required(),
      

      price: joi.string().required(),

      origin: joi.string().min(2).max(10).required(),

      brand: joi.string().required(),

      
    });
    const result = schema.validate(req.body, { abortEarly: true });
    if (result.error) {
      throw new Error(result.error);
      return;
    }
    // res.status(200).json({ message: "validation passed", data: req.body });

    
    var save = {
      product_name,
      price,
      origin,
      brand
        
      };
      console.log(save);
      var user = await UserModel.create(save);
      return res.status(200).json({ message: "succeed at mission" });
      // var user_update = await user.save();
      // if (user_update) {
      //   res.status(200).json({
      //     message: "account is created",
      //     response: user_update,
      //   });
      // }
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// exports.product_details = (req, res)=> {
//   Product.findById(req.params.id, function (err, product) {
//        if (err) return(err);
//        res.send(product);
//   })
// };
exports.details =(req,res)=>{
  UserModel.find((err,docs)=>{
if(!err){res.send(docs)}
else{console.log("not able to get data")}
  })
}
