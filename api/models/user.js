const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        typeof:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    verified:{
        type:Boolean,
        default:false
    },
    verificationToken:String,
    addresses:[
        {
            name:String,
            mobieNo:String,
            houseNo:String,
            street:String,
            landmaaek:String,
            city:String,
            country:String,
            postalCode:String
        }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;