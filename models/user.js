const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {type : String,unique : true},
    fullname : {type : String,unique : true, default : ''},
    email :{type : String,unique : true},
    password : {type : String,default : ''},
    userImage : {type : String,default:''},
    facebook: {type : String, default:''},
    fbToken: Array,
    google: {type : String, default:''},
    googleToken:Array

});

module.exports = mongoose.model('User',userSchema);