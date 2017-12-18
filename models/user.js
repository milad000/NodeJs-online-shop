var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");



var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: false },
    password: String,
    customerName:String,
    customerNo:Number,
    customerPhone:String,
    customerAdd:String,
    accessControl:String
});

UserSchema.plugin(passportLocalMongoose);

//EXPORT
module.exports = mongoose.model("User", UserSchema);
