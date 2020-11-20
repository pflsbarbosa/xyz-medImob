const express = require("express");
const fs = require("file-system");
const app = express();
const bodyParser = require("body-parser"); //for forms
const multer = require("multer");
const lodash = require("lodash");

app.set("view engine", "ejs");
app.use(bodyParser.json());
//app.use(forms.array());

app.use(bodyParser.urlencoded({extended: true})); //permits posts forms
app.use(express.static("public"));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/xyzPropertiesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const immobileSchema = new mongoose.Schema({
  immobileType: {
    type: String,
    require: [true, "Please check your data entry, no immobile type specified!"]
  },
  tipology: String,
  district: {
    type: String,
    require: [true, "Please check your data entry, no district specified!"]
  },
  county: {
    type: String,
    require: [true, "Please check your data entry, no county specified!"]
  },
  parish: {
    type: String,
    require: [true, "Please check your data entry, no parish specified!"]
  },
  immobileCondition: {
    type: String,
    require: [true, "Please check your data entry, no immobile condition specified!"]
  },
  transactionType: {
    type: String,
    require: [true, "Please check your data entry, no transaction type specified!"]
  },
  area: {
    type: String,
    require: [true, "Please check your data entry, no area specified!"]
  },
  price: Number,
  comment: String,
  contactName: String,
  phoneNumber: String,
  email: String,
  images: {
    type: Object,
    required:true,
    min:6,
    max:6
  }
});


const Immobile = mongoose.model('Immobile', immobileSchema);

const immobile1 = new Immobile({
  immobileType: "Moradia",
  tipology: "T5",
  district: "Porto",
  county: "Porto",
  parish: "Ramalde",
  immobileCondition: "Usado",
  transactionType: "Venda",
  area: "300",
  price: "350000",
  comment: "lugar de garagem 2 carros, jardim  300m2, águas fortadas ",
  contactName: "Paulo Barbosa",
  phoneNumber: "933 333 000",
  email: "pflsbarbosa@gmail.com",
  images: ["edifícioEQuintal.png", "estudio.png"]
});
const immobile2 = new Immobile({
  immobileType: "Moradia",
  tipology: "T5",
  district: "Porto",
  county: "Maia",
  parish: "Ramalde",
  immobileCondition: "Usado",
  transactionType: "Venda",
  area: "350",
  price: "350000",
  comment: "lugar de garagem 2 carros, jardim  300m2, águas fortadas ",
  contactName: "Tiago Barbosa",
  phoneNumber: "933 333 000",
  email: "ttmlbarbosa@gmail.com",
  images: ["escadariaAbaixo.PNG", "edifícioEQuintal.PNG"]
});
const immobile3 = new Immobile({
  immobileType: "Moradia",
  tipology: "T5+1",
  district: "Porto",
  county: "VNGaia",
  parish: "Sto OVideo",
  immobileCondition: "Usado",
  transactionType: "Venda",
  area: "400",
  price: "350000",
  comment: "lugar de garagem 3 carros, jardim  300m2, águas fortadas ",
  contactName: "Paul Barbarossa",
  phoneNumber: "933 333 000",
  email: "pflsbarbarossa@gmail.com",
  images: ["escadariaCima.png", "escadariaAbaixo.png"]
});


const defaultImmobiles = [immobile1, immobile2, immobile3];


const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "./public/images/uploads");
  },
  filename: function(req, file, cb){
    Immobile.find({}, function(err, foundImmobiles){
      if (foundImmobiles.length > 0) {
          imageName =  foundImmobiles.length+1+"_"+file.originalname  ;
      }
      //imageName += "_randomstring"
      return cb(null, imageName);
    });
  }
});

const fileFilter = (req, file, cb) => {

    if(file.mimetype === "image/jpg"  ||
       file.mimetype ==="image/jpeg"  ||
       file.mimetype ===  "image/png" )
        {
          cb(null, true);
        }
    else
        {
          cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
        }
};


app.get('/index', function(req, res) {

  Immobile.find({}, function(err, foundImmobiles) {
    if (foundImmobiles.length === 0) {
      Immobile.insertMany(defaultImmobiles, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("successfully saved default immobiles to DB");
        }
      });
      res.redirect('/index');
    } else {
      res.render(__dirname + "/views/index.ejs", {
        newImmobiles: foundImmobiles
      });
    }

  });

});

app.get('/insertImmobile', function(req, res) {
  res.render(__dirname + "/views/insertImmobile.ejs");
});
// 6 is the limit I've defined for number of uploaded files at once
// 'images' is the name of our file input field
upload = multer({storage: storage, fileFilter: fileFilter, limits:{fileSize:'2mb', files:6}}).any("images", [6]);
app.post('/insertImmobile',upload, function(req, res, next) {


   const immobileImages = req.files;

  const immobile = new Immobile({
    immobileType: req.body.immobileTypeOption,
    tipology: req.body.tipology,
    district: req.body.district,
    county: req.body.county,
    parish: req.body.parish,
    immobileCondition: req.body.immobileState,
    transactionType: req.body.transactionType,
    area: req.body.area,
    price: req.body.amount,
    comment: req.body.comment,
    contactName: req.body.name,
    phoneNumber: req.body.cellphone,
    email: req.body.email,
    images:immobileImages
  });

   //  req.files['images'] -> Array
   // req.body will contain the text fields, if there were any

     upload(req, res, function(err){
         if (err) {
           res.send("The number of files you try upload it´s incorrect! Only 6 files it´s allowed.");
           return;
         }
         immobile.save();
         console.log("successfully saved new immobile to DB");
         res.redirect('/insertImmobile');
     });

});

app.get('/listingImmobiles', function(req, res) {
  Immobile.find({}, function(err, foundImmobiles) {
    if (foundImmobiles.length === 0) {
      console.log("There is no immobiles in the list");
      res.redirect('/index');
    } else {
      res.render(__dirname + "/views/listingImmobiles.ejs", {
        newImmobiles: foundImmobiles
      });
    }

  });

});

app.get("/immobile", function(req, res){
  Immobile.find({}, function(err, foundImmobiles){

      if (foundImmobiles.length == 0) {
        console.log("There is no properties");
      }else {
        res.render(__dirname+ "/views/immobile.ejs",{
          newImmobiles: foundImmobiles
        });
      }
  });

});

app.post("/delete", function(req, res) {
  console.log( req.body.myImmobile);
  Immobile.deleteOne({}, function(err){}
    // req.body.myImmobile
  );

});
app.get('/about', function(req, res) {
  res.render(__dirname + "/views/about.ejs");
});
app.get('/contacts', function(req, res) {
  res.render(__dirname + "/views/contacts.ejs");
});
app.get('/immobileSearch', function(req, res) {
  res.render(__dirname + "/views/immobileSearch.ejs");
});
app.get('/raisingTheImmobile', function(req, res) {
  res.render(__dirname + "/views/raisingTheImmobile.ejs");
});
app.post('/raisingTheImmobile', function(req, res) {
  immobile.insertMany();
});
app.get('/recruitment', function(req, res) {
  res.render(__dirname + "/views/recruitment.ejs");
});
app.get('/services', function(req, res) {
  res.render(__dirname + "/views/services.ejs");
});




app.listen(process.env.port || 3000, function() {
  console.log("Server initialized on port 3000");
});
