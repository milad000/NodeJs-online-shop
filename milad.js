var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var passportLocalMongoose = require("passport-local-mongoose");

var methodOverride = require("method-override");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test3");

//MODELS
var User = require("./models/user");
var invoices = require("./models/invoice");
var orders = require("./models/order");
var products = require("./models/product");

//ROUTES
var customerRoutes = require("./routes/customer");
var invoiceRoutes = require("./routes/invoice");
var orderRoutes = require("./routes/order");
var productRoutes = require("./routes/product");
var auth = require("./routes/auth");
var SMS = require("./routes/SMS");
var main = require("./routes/main");




var app = express();
app.set('view engine', 'ejs');
app.use(require("express-session")({
    secret: "milad try and try",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyparser.urlencoded({
    extended: true
}));


app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyparser.json());

app.use(customerRoutes);
app.use(invoiceRoutes);
app.use(orderRoutes);
app.use(productRoutes);
app.use(auth);
app.use(SMS);
app.use(main);







//PORT, IP
app.listen(6100, function () {
    console.log("server started");
});
