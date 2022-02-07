const mongoose = require('mongoose');

const petCenterSchema = new mongoose.Schema({
    name: String,
    location: String,
    site:String,
    desc: String,
    steps:String,
    contact: String,
    email: String,
    image: String,
    repPosition: String,
    id:String,
    fullName:String
    
})

module.exports = mongoose.model('Center', petCenterSchema);