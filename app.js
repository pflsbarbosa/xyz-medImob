const express = require('express');
const bodyParser = require('body-parser'); //for forms
const fs = require('file-system');
const path = require('path'); //2x
const app = express();
const multer = require('multer');
/* const upload = require(__dirname + '/middleware/uploadImages.js');//2x */
/* for  raisingTheImmobile referenceNumber variable */
const { v4: uuidv4 } = require('uuid');
const short = require('short-uuid');
const enterpriseName = 'XYZ';

//Mongoose
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

//Import from Models
const immobileSchema = require(__dirname + '/models/immobileSchema.js');
const userSchema = require(__dirname + '/models/userSchema.js');

/* const countyParishes = require(__dirname + '/controllers/parishes_Asynchronicity.js'); */

/* const ptTerritOrg =  require(__dirname + '/public/src/data/Portugal_District_Data/territorialOrganizationOfPortugal.js') */
const lodash = require('lodash');
const Promise = require('promise');


const {
  check,
  validationResult
} = require("express-validator");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); //permits posts forms

// Set view engine as EJS
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));


const {
  get
} = require('lodash');
const e = require('express');
const {
  json
} = require('body-parser');

/* const getPtDataDiv = require('./controllers/parishes_Asynchronicity'); */

mongoose.connect('mongodb://localhost:27017/xyzImmobilesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Immobile schema
const Immobile = mongoose.model('Immobile', immobileSchema());

const immobile1 = new Immobile({
  immobileType: "Apartamento",
  numberOfBedrooms: "3",
  propertyCondition:"Usado",
  usefulArea: 125,
  grossArea: 155,
  price: "350000",
  existenceOfGarage: "Sim",
  garageType: "Lugar de garagem",
  garageCapacity: "1 - viatura",
  wc: "2",
  energeticCertificate:"Sem classificação",
  balcony:"1",
  externalStorage:"2",
  internalStorage:"2",
  terrace:"Sem terraço",
  constructionDate:"01/01/1950",
  transactionType:"Venda",
  referenceNumber:"XYZ-75517311-db9b-406f-bd2b-05b299463739",
  district: "Porto",
  county: "Porto",
  parish: "Ramalde",  
  address:"Av. da Boavista 1750 2ºduplex",
  postalCode:"4100-115 Porto",
  emailOfImmobileOwner:"anonimo@gmail.com",
  immobileOwnerName:"anonimo",
  cellphoneNumber:"999111999",    
  openingHours:"Todo o dia",
  comment: "lugar de garagem 2 carros, jardim  300m2, águas fortadas ",
  images: ["edifícioEQuintal.png", "estudio.png", "quartoBeliche.png", "QuartoGrandeRch.png", "sala_Rch.png", "QuartoGrandeRch2.png"]
});

const immobile2 = new Immobile({
  immobileType: "Moradia",
  numberOfBedrooms: "5",
  propertyCondition:"Usado",
  usefulArea: 125,
  grossArea: 155,
  price: "350000",
  existenceOfGarage: "Sim",
  garageType: "Lugar de garagem",
  garageCapacity: "1 - viatura",
  wc: "2",
  energeticCertificate:"Sem classificação",
  balcony:"1",
  externalStorage:"2",
  internalStorage:"2",
  terrace:"Sem terraço",
  constructionDate:"01/01/1950",
  transactionType:"Venda",
  referenceNumber:"XYZ-75517311-db9b-406f-bd2b-05b299463739",
  district: "Porto",
  county: "Porto",
  parish: "Ramalde",  
  address:"Av. da Boavista 1750 2ºduplex",
  postalCode:"4100-115 Porto",
  emailOfImmobileOwner:"anonimo@gmail.com",
  immobileOwnerName:"anonimo",
  cellphoneNumber:"999111999",    
  openingHours:"Todo o dia",
  comment: "lugar de garagem 2 carros, jardim  300m2, águas fortadas ",
  images: ["escadariaAbaixo.png", "Quarto_Cima.png", "quintalAjardinado.png", "QuartoGrandeRch.png", "sala_Rch.png", "edifícioEQuintal.png"]
});

const immobile3 = new Immobile({
  immobileType: "Moradia",
  numberOfBedrooms: "5",
  propertyCondition:"Usado",
  usefulArea: 125,
  grossArea: 155,
  price: "350000",
  existenceOfGarage: "Sim",
  garageType: "Lugar de garagem",
  garageCapacity: "1 - viatura",
  wc: "2",
  energeticCertificate:"Sem classificação",
  balcony:"1",
  externalStorage:"2",
  internalStorage:"2",
  terrace:"Sem terraço",
  constructionDate:"01/01/1950",
  transactionType:"Venda",
  referenceNumber:"XYZ-75517311-db9b-406f-bd2b-05b299463739",
  district: "Porto",
  county: "Porto",
  parish: "Ramalde",  
  address:"Av. da Boavista 1750 2ºduplex",
  postalCode:"4100-115 Porto",
  emailOfImmobileOwner:"anonimo@gmail.com",
  immobileOwnerName:"anonimo",
  cellphoneNumber:"999111999",    
  openingHours:"Todo o dia",
  comment: "lugar de garagem 2 carros, jardim  300m2, águas fortadas ",
  images: ["escadariaCima.png", "escadariaAbaixo.png", "vaso.png", "escadariaAbaixo.png", "Quarto_Cima.png", "quintalAjardinado.png", ]
});

const defaultImmobiles = [immobile1, immobile2, immobile3];






app.get('/index', function (req, res) {
  Immobile.find({}, function (err, foundImmobiles) {
    if (foundImmobiles.length < 3) {
      Immobile.insertMany(defaultImmobiles, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("successfully saved default immobiles to DB");
        }
      });
      res.redirect('/index'); //renitiate this route
    } else {
      res.render(__dirname + "/views/index.ejs", {
        newImmobiles: foundImmobiles
      });
    }
  });
});

app.get('/raisingTheImmobile', function (req, res) {
  var referenceNumber = short.generate();// ⇨ 73WakrfVbNJBaAmhQtEeDv
  /* var referenceNumber = enterpriseName + '-' + uuidv4( ); */ // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
  console.log('dist=' + req.query);
  var thisJsondata = JSON.parse(require('fs').readFileSync('public/src/data/Portugal_District_Data/freguesias-metadata.json', 'utf8'))
  /* console.log(thisJsondata.d[0]) */
  /* res.render(__dirname + "/views/insertImmobile.ejs", {jsondata: JSON.stringify(thisJsondata)} ); */
  res.render(__dirname + "/views/raisingTheImmobile.ejs", {
    jsondata: thisJsondata.d,
    referenceNumber: referenceNumber
  });

});



const storage = multer.diskStorage({
  // indicate the destiny path
  destination: "./public/src/images/uploads",
  //Specify the file name to be unique
  filename: function (req, file, cb) {
    // console.log(file); //show the file uploaded in console
    Immobile.find({}, function (err, foundImmobiles) {
      if (foundImmobiles.length > 0) {
        const img_id = mongoose.Types.ObjectId();
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
const upload = multer({
  storage: storage,
  limits: {
    // 6 is the limit I've defined for number of uploaded files at once
    // 'images' is the name of our file input field
    fileSize: 5000000, //1MB
    files: 40
  },
  // checking the files
  fileFilter: function (req, file, cb) {
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


/* ATENÇÃO */
/* Admin vai poder acrescentar ou atualizar dados na base de dados*/
/* Criar ficha de detalhes do imóvel inspirar-me century21 */
/* emitir um número de referência para o imóvel inserido cuja key é única */
/* quantas frentes? Uma ou duas*/
/* tipo de frentes: opostas? ou perpendiculares ou contíguas? */
/* exposição solar das frentes: nascente poente */
/* tamanho da sala */
   /* tamanho da suite */
   /*area hall de entrada */
   /* lareira sim ou não */
app.post('/raisingTheImmobile', function (req, res) {
  var referenceNumber = req.body.referenceNumber;
//  req.files -> Array
  // req.body will contain the text fields, if there were any
  console.log('myValidationResult_0:', req.errors);
  var err = validationResult(req);
  console.log('myValidationResult_1:', err.errors);
  if (!err.isEmpty()) {
    // err = res.status(422).json({ errors: errors.array() })
    console.log('myValidationResult:', err.errors[0].msg);
    //err= err.errors[0].msg;
    //return Promise.reject(err);    
  }

  upload(req, res, (err) => {
    console.log("req.files:-<", req.files)

    var immobileImages = req.files;

    const immobile = new Immobile({
      _id: new mongoose.Types.ObjectId(),
      immobileType: req.body.immobileType,
      numberOfBedrooms: req.body.numberOfBedrooms,
      propertyCondition: req.body.propertyCondition,
      usefulArea: req.body.usefulArea,
      grossArea: req.body.grossArea,
      price: req.body.price,
      existenceOfGarage: req.body.existenceOfGarage,
      garageType: req.body.garageType,
      garageCapacity: req.body.garageCapacity,
      wc: req.body.wc,
      energeticCertificate: req.body.energeticCertificate,
      balcony: req.body.balcony,
      externalStorage: req.body.externalStorage,
      internalStorage: req.body.internalStorage,
      terrace: req.body.terrace,
      constructionDate: req.body.constructionDate,
      transactionType: req.body.transactionType,
      referenceNumber: req.body.referenceNumber,      
      district: req.body.district,
      county: req.body.county,
      parish: req.body.parish,
      address: req.body.address,
      postalCode: req.body.postalCode,
      emailOfImmobileOwner: req.body.emailOfImmobileOwner,
      immobileOwnerName: req.body.immobileOwnerName,
      cellphoneNumber: req.body.cellphoneNumber,
      openingHours: req.body.openingHours,      
      comment: req.body.comment,      
      images: immobileImages
    });

    //************************************ */
    //*****Cities,counties and parishes*** */
    //************************************ */

    var thisJsondata = JSON.parse(require('fs').readFileSync('public/src/data/Portugal_District_Data/freguesias-metadata.json', 'utf8'))
    //console.log("O erro captado do multer: " + err);
    if (err) {
      return res.render(__dirname + "/views/raisingTheImmobile.ejs", {
        msg: err,
        jsondata: thisJsondata.d
      });
    } else {
      // Everything went fine
      //Checking if there is´nt some immobile on the array
      if (req.files.length == 0) {
        console.log("there is´nt any immobile's images selected!");
        res.render(__dirname + "/views/raisingTheImmobile.ejs", {
          msg: 'Erro: Nenhuma imagem selecionada! [ Error: No file selected! ]',
          jsondata: thisJsondata.d,
          referenceNumber: referenceNumber
        });
      } else {
        // There is any immobiles
        immobile.save();
        console.log("successfully saved new immobile to DB");
        res.render(__dirname + "/views/raisingTheImmobile.ejs", {
          jsondata: thisJsondata.d,
          msg: 'File uploaded!',
          referenceNumber: referenceNumber

        });
      }
      
      //debugging
      console.log(`natureza do imóvel ${req.body.immobileType}`);
      console.log(`valor do num de quartos ${req.body.numberOfBedrooms}`); 
      console.log(`area util ${req.body.usefulArea}`);
      console.log(`area bruta ${req.body.grossArea}`);
      console.log(`preço ${req.body.price}€`);


    }
  });


});


// User with password encrypted
const User = new mongoose.model('User', userSchema());


app.get('/login', function (req, res) {
  res.render(__dirname + "/views/login/login.ejs")
});

app.post('/login', function (req, res) {
  const username = req.body.username;
  const loginPasswordInputed = req.body.password;
  console.log('email from req.body=' + username);
  User.findOne({
    email: username
  }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === loginPasswordInputed) {
          res.render(__dirname + "/views/login/success.ejs")
        } else {
          console.log('password=' + foundUser.password); //to found the password
          res.render(__dirname + "/views/login/failure.ejs")
        }
      } else {
        res.render(__dirname + "/views/login/failure.ejs")
      }
    }
  })

});

app.get('/register', function (req, res) {
  res.render(__dirname + '/views/login/register.ejs')
});

app.post('/register', function (req, res) {
  var email = req.body.username;
  var loginPasswordInputed = req.body.password;

  const newUser = new User({
    email: email,
    password: loginPasswordInputed
  });

  User.findOne({
    'email': email
  }, function (err, usersRegistered) {
    if (err) {
      console.log(err);
    } else {
      if (usersRegistered) {
        /* console.log('email da BD = ' + usersRegistered.email);
        console.log('email do form = ' + email);   */
        console.log('verificou registos');
        res.send("Este email já existe! Por favor registe-se com outro email")
      } else {
        newUser.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('criou novo registo');
            res.render(__dirname + "/views/login/success.ejs")
          }
        })
      }
    }
  })
});

app.get('/failure', function (req, res) {
  res.render(__dirname + "/views/login/failure.ejs")
});




app.get('/listingImmobiles', function (req, res) {
  Immobile.find({}, function (err, foundImmobiles) {
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

//Read files asynchronously
function readFiles(dir, processFile, filesNameFromDB) {
  // read directory
  fs.readdir(dir, (error, fileNames) => {
    if (error) throw error;

    fileNames.forEach(filename => {
      // get current file name
      const name = path.parse(filename).name;
      // get current file extension
      const ext = path.parse(filename).ext;
      // get current file path
      const filepath = path.resolve(dir, filename);
      // get information about the file
      fs.stat(filepath, function (error, stat) {
        if (error) throw error;
        // check if the current path is a file or a folder
        const isFile = stat.isFile();
        // exclude folders
        if (isFile) {
          // callback, do something with the file
          processFile(filepath, name, ext, stat);
        }
      });
    });
  });
}

app.post('/listingImmobiles', function (req, res) {
  //console.log(req.body.checkBox);

  const _idFromCheckedItem = req.body.checkBox;

  console.log(`checkboxItemsarray = ${_idFromCheckedItem}`);
  const imagenameFromcheckedItem = [];


  if (_idFromCheckedItem) {

    Immobile.find({
      _id: _idFromCheckedItem
    }, (err, foundImmobiles, req) => {
      /* console.log("entrou no find"); */
      if (err) {
        console.log(err);
      } else {
        /* console.log("entrou no else"); */
        foundImmobiles.forEach(function (immobile) {
          console.log("immobile.images.length:->", immobile.images.length);
          immobile.images.forEach(function (item) {
            console.log("filename from DB:", item.filename);
            imagenameFromcheckedItem.push(item.filename);
          })

          readFiles(__dirname + '/public/src/images/uploads/', (filepath, name, ext, stat, imagenameFromcheckedItem) => {
            console.log("readingfilesName", name);
            immobile.images.filter((imgFileName) => {
              if ((name + ext) === (imgFileName.filename)) {
                /* console.log('file properties:',name, filepath, ext, stat);*/
                fs.unlink(__dirname + "/public/src/images/uploads/" + name + ext, (err) => {
                  if (err) throw err;
                  console.log("Deleting in folder...")
                  //console.log(`Deleting this file ${name} in folder corresponding to this file ${imgFileName.filename} from DB!`);
                });
              }
            });
          });
        });
        /* console.log("saiu do foreach"); */
        if (foundImmobiles.length > 1) {

          /* if more than one ckeckBox item selected */
          Immobile.deleteMany({}, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Deleting the immobile images from DB!");

              res.redirect('/listingImmobiles');
            }
          });
        } else {
          /* if only one item was selected on checkBox */
          Immobile.deleteOne({
            _id: _idFromCheckedItem
          }, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Deleting the immobile images from DB!");

              res.redirect('/listingImmobiles');
              //delete also images from uploads folder        
            }
          });
        }
      }
      /* console.log("saiu do else"); */

    });
  }

  /* Variables for next find */
  const _idFromInputLabelSelected = req.body.immobLabelSelected;

  if (_idFromInputLabelSelected) {
    var inputLabelValue = req.body.immobLabelSelected.split('-')
    var urlsString = "/" + inputLabelValue[1] + "/" + inputLabelValue[2] + "/" + inputLabelValue[3] + "/";
    var immobLabelSelected = req.body.immobLabelSelected
    var urlComplete = inputLabelValue[0] + urlsString;
    console.log("immobLabelSelected_splitted=", inputLabelValue[0]);
    console.log("urlsString=", urlsString);
    console.log("immobLabelSelected=", immobLabelSelected);
    console.log("urlComplete", urlComplete);

    res.redirect(`propertyFeatures/${urlComplete}`); 
    
  }

  /* console.log("saltou o find"); */
  // use an absolute path to the folder where files are located
});




app.get('/propertyFeatures/:id/:numberOfBedrooms/:rooms/:price/', function (req, res) {

  console.log("It has entered inside of propertyFeatures route");
  console.log("id=",req.params.id);
  Immobile.find({
    _id: req.params.id
  }, (err, foundImmobiles, req) => {
    if (err) {
      console.log(err);
    } else {
      res.render(__dirname + '/views/propertyFeatures.ejs', {
        header: res.getHeader,
        newImmobiles: foundImmobiles
      });
      
    }
  });
});




app.get('/propertyFeatures/:id/:type/:numberOfRooms/:price/immobileCarousel', function (req, res) {

  console.log("It has entered inside of immobileCarousel route aqui");
  console.log("id=",req.params.id);
  Immobile.find({
    _id: req.params.id
  }, (err, foundImmobiles, req) => {
    if (err) {
      console.log(err);
    } else {
      console.log();
      res.render(__dirname + '/views/immobile.ejs', {
        header: res.getHeader,
        newImmobiles: foundImmobiles
      });
      
    }
  });
});

/* app.get('/immobileCarousel/:id/:numberOfBedrooms/:rooms/:price/', function (req, res) {

  res.redirect('/listingImmobiles');
}); */

app.get("/immobile", function (req, res) {
  Immobile.find({}, function (err, foundImmobiles) {

    if (foundImmobiles.length == 0) {
      console.log("There is no immobiles");
    } else {

      res.render(__dirname + "/views/immobile.ejs", {
        newImmobiles: foundImmobiles
      });
    }
  });

});
app.get('/terms-and-conditions', function (req, res) {
  res.render(__dirname + "/views/termsConditions.ejs")
});
app.get('/privacy-policy', function (req, res) {
  res.render(__dirname + "/views/privacyPolicy.ejs");
});
app.get('/cookiesPolicy', function (req, res) {
  res.render(__dirname + "/views/cookiesPolicy.ejs");
});

app.get('/about', function (req, res) {
  res.render(__dirname + "/views/about.ejs");
});

app.get('/contacts', function (req, res) {
  res.render(__dirname + "/views/contacts.ejs");
});




app.get('/immobileSearch', function (req, res) {
  var thisJsondata = JSON.parse(require('fs').readFileSync('public/src/data/Portugal_District_Data/freguesias-metadata.json', 'utf8'))
  /* console.log(thisJsondata.d[0]) */
  /* res.render(__dirname + "/views/insertImmobile.ejs", {jsondata: JSON.stringify(thisJsondata)} ); */
  res.render(__dirname + "/views/immobileSearch.ejs", {
    jsondata: thisJsondata.d
  });
  
});
app.post('/immobileSearch', function (req, res) {
  Immobile.find({
    _id: req.params.id
  }, (err, foundImmobiles, req) => {
    if (err) {
      console.log(err);
    } else {
      res.render(__dirname + '/views/immobile.ejs', {
        header: res.getHeader,
        newImmobiles: foundImmobiles
      });
      
    }
  });
  res.render(__dirname + "/views/immobileSearch.ejs");
});


app.get('/recruitment', function (req, res) {
  res.render(__dirname + "/views/recruitment.ejs");
});

app.get('/services', function (req, res) {
  res.render(__dirname + "/views/services.ejs");
});


app.listen(process.env.port || 3000, function () {
  console.log("Server initialized on port 3000");
});