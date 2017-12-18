var mongoose =require("mongoose");



var product = new mongoose.Schema({
    productNo: Number,
    productName: String,
    productDes:String,
    productPrice:Number,
    productImg:String
});

//EXPORT
module.exports = mongoose.model("product",product);