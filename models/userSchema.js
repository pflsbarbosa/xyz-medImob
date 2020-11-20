module.exports = getUserSchema;

const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

mongoose.connect('mongodb://localhost:27017/xyzImmobilesDB', {
useNewUrlParser: true,
useUnifiedTopology: true
});

function getUserSchema(){
    
    //user
    const userSchema = new mongoose.Schema ({
        email: String,
        password: String,
        
      });
      const secret = "thisIsOurSecretExample";
      
      userSchema.plugin(encrypt, { 
        secret: secret ,
        encryptedFields: ['password'] 
      });
            

     return userSchema;
}