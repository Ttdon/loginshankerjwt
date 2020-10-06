const { mongoose, conn } = require("../modules/db");
const userSchema = mongoose.Schema({
    product_name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
  
    brand: {
      type: String,
      required: true
     // unique: true
    },
    origin: {
      type: String,
      required: true
    },
    
    
  });
  exports.UserModel = conn.model("product", userSchema);
  