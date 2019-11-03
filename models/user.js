const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName:String,
    email:String,
    city:String,
    profession:String ,
    bio:String,
    interests:String,
    password:String || Number,
    team:String,
    image:String
})
      


const User = mongoose.model('User', userSchema);


module.exports = User;
