var mongoose = require("mongoose");



var order = new mongoose.Schema({
    orderNo: Number,
    customerInfo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    productInfo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        },{
            Qty:Number            
        }
    ]
});

//EXPORT
module.exports = mongoose.model("order", order);

