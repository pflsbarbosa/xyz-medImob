module.exports = getImmobileSchema;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/xyzImmobilesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

function getImmobileSchema() {
  const immobileSchema = new mongoose.Schema({
    immobileType: {
      type: String,
      required: [true, "Please check your data entry, no immobile type specified!"]
    },
    numberOfBedrooms: {
      type: Number,
      required: [true, "Please check your data entry, no number of rooms specified!"]
    },
    propertyCondition: {
      type: String,
      required: [true, "Please check your data entry, no immobile state specified!"]
    },
    usefulArea: {
      type: Number,
      required: [true, "Please check your data entry, no immobile useful Area specified!"]
    },
    grossArea: {
      type: Number,
    },
    price: {
      type: Number,
      required: [true, "Please check your data entry, no price specified!"]
    },
    existenceOfGarage: {
      type: String,
      required: [true, "Please check your data entry, no existence of garage specified!"]
    },
    garageType: {
      type: String
    },
    garageCapacity: {
      type: String
    },
    wc: {
      type: String,
      required: [true, "Please check your data entry, no wc specified!"]
    },
    energeticCertificate:{
      type: String,
    },
    balcony:{
      type: String,
    },
    externalStorage:{
      type: String,      
    },
    internalStorage:{
      type: String,      
    },
    terrace:{
      type: String,      
    },
    constructionDate:{
      type: Date
    },
    transactionType: {
      type: String,
      required: [true, "Please check your data entry, no transaction type specified!"]
    },
    referenceNumber:{
      type: String
    },
    district: {
      type: String,
      required: [true, "Please check your data entry, no district specified!"]
    },
    county: {
      type: String,
      required: [true, "Please check your data entry, no county specified!"]
    },
    parish: {
      type: String,
      required: [true, "Please check your data entry, no parish specified!"]
    },
    address:{
      type: String
    },
    postalCode:{
      type: String
    },
    emailOfImmobileOwner:{
      type: String
    },    
    immobileOwnerName: {
      type: String,
      required: [true, "Please check your data entry, no contact name specified!"]
    },
    cellphoneNumber: {
      type: String,
      required: [true, "Please check your data entry, no phone number specified!"]
    },
    openingHours:{
      type: String,
    },
    comment: String,
    images: {
      type: Array
      /* ,      
            validate: [arrayLimit, '{PATH} the exact number of files required it´s 30']  */
    }
  });
  /* function arrayLimit (val){
    return val.length == 30;
  }  */

  return immobileSchema;
}