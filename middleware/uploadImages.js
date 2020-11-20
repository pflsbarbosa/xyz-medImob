/* module.exports = buildUpload;

const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const immobileSchema = require(__dirname + '../../models/immobileSchema.js');


function buildUpload() {
  const storage = multer.diskStorage({
    // indicate the destiny path
    destination: "./public/images/uploads",
    //Specify the file name to be unique
    filename: function(req, file, cb) {
      // console.log(file); //show the file uploaded in console
      Immobile.find({}, function(err, foundImmobiles) {
        if (foundImmobiles.length > 0 ) {                           
          const img_id =  mongoose.Types.ObjectId();
          //adding ordered number + time stamp + extname of file originalname
          imagename = img_id + '-' + file.fieldname + '-' + Date.now() +
            path.extname(file.originalname);
            //imageName += "_randomstring" // security?
          cb(null, imagename);
        }      
      });
    }
  });
      // variable upload initialized
    const  upload = multer({
        storage: storage,
        limits: {
          // 6 is the limit I've defined for number of uploaded files at once
          // 'images' is the name of our file input field
          fileSize: 1000000, //1MB
          files: 6
        },
        // checking the files
        fileFilter: function(req, file, cb) {
          checkingFileType(file, cb);
        }
      }).array("imgs");
      
      function checkingFileType(file, cb) {
        //Validating Extension
        const fileTypes = /jpeg|jpg|png|gif/; //regular expression
        //checking extname
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
      
        //checking mimetype
        const mimetype = fileTypes.test(file.mimetype);
      
        if (mimetype && extName) {
          return cb(null, true);
        } 
        
         cb(new Error('Só ficheiros com extensão (.png, .jpeg e .gif) são permitidos! [ Only files with extensions (.png, .jpeg or gif) are allowed! ]'));   
      }

      return upload;
}


  */