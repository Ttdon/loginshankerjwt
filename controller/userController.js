var { UserModel } = require("../model/signup");
var md5 = require("md5");
const joi = require("joi");
var comFunc=require('../modules/commonFuns');
//const { Error } = require("mongoose");
exports.user_signUp = async (req, res) => {
  try {
    let {
      first_name,
      last_name,
      email,
      mobile_number,
      password,
      country_code,
    } = req.body;
    const schema = joi.object().keys({
      email: joi.string().required(),
      first_name: joi.string().required(),

      last_name: joi.string().required(),

      password: joi.string().min(2).max(10).required(),

      mobile_number: joi.number().required(),

      country_code: joi.number().required(),
    });
    const result = schema.validate(req.body, { abortEarly: true });
    if (result.error) {
      throw new Error(result.error);
      return;
    }
    // res.status(200).json({ message: "validation passed", data: req.body });

    password = md5(password);
    email=email.toLowerCase();
    var otp=1234;
    
    let mobileExist=await UserModel.findOne({country_code,mobile_number});
    if(mobileExist){
      throw new Error("mobile no already registerd!!");
    }
    let checkMail = await UserModel.findOne({ email });
    if (checkMail) {
      throw new Error("mail already registerd!!");
    } 
      
   // let access_token=comFunc.generateAcessToken(10);
    let message="your otp is:"+ otp
    console.log(message)
   
    await comFunc.sendotp(message,country_code+mobile_number)
     
    var save = {
        first_name,
        last_name,
        email,
        mobile_number,
        country_code,
        password,
        
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





exports.user_login = async (req, res) => {
  try {
    const schema = joi.object().keys({
      email: joi.string().required(),
      password: joi.string().required()
    });
    const result = schema.validate(req.body, { abortEarly: true });
    
    let { email, password, access_token } = req.body;
    password = md5(password);

    let checkUser = await UserModel.findOne({email,password });
    //console.log(checkUser,"here")
    if (checkUser) {
      console.log(checkUser);
      access_token = comFunc.generateToken(checkUser);
      
      checkUser = await UserModel.findOneAndUpdate(
        { _id: checkUser._id },
        { access_token },
        { new: true }
      );
      res.status(200).json({ message: "user succesfully loged", userdetails: checkUser });
      console.log(checkUser);
    } 
    else {
     // throw new Error("not matched ");
     res.status(201).json({message:"not matched"})
      
    }
  } catch (error) {
    res.status(400).json({ message: console.error.message });
  }
};





exports.updateprofile = async (req, res) => {

   //res.status(200).json({message:'accesstoken passed'})

  try {
    console.log("hi");
    const schema = joi.object().keys({
      email: joi.string(),
      first_name: joi.string(),

      last_name: joi.string(),

      password: joi.string(),

      mobile_number: joi.number(),

      confirmpassword: joi.string()
    });
  //  // console.log(schema);

    let result = schema.validate(req.body);
    //console.log(result);
    if (result.error) {
      throw new Error(result.error);
      
    }

// let { first_name,
//       last_name,
//       email,
//       mobaile_number,
//       password} 
//       = req.body;
     // console.log(req.body)
    let user_id = req.userdata._id;
        
    let updateddata = await UserModel.findOneAndUpdate(
     
      { _id: user_id._id },
      { $set:req.body},
      {new: true }
    );
        console.log(updateddata);
      res.status(200).json({
      status: 1,
      message: "profile updated successfully",
      userdata: updateddata,
    });
  } catch (error) {
     res.status(401).json({ status: 0, message: error.message });
  }
};
 