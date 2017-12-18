var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var bodyparser = require("body-parser");
var methodOverride = require("method-override");
var router = express.Router();
var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
    apikey: '334E395243795A7A6E6535527373696E655A533759413D3D'
});



//MODELS
var User = require("../models/user");
var invoices = require("../models/invoice");
var orders = require("../models/order");
var products = require("../models/product");


router.use(require("express-session")({
    secret: "milad try and try",
    resave: false,
    saveUninitialized: false
}));
router.use(bodyparser.urlencoded({
    extended: true
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//SEND USER CURRENT USER TO ALL ROUTES
router.use(function (req, res, next) {
    res.locals.currentuser = req.user;
    next();
});

//LOAD SIGN UP FORM
router.get("/register", function (req, res) {
    res.render("newCustomer");
});

//HOME
router.get("/", function (req, res) {
    res.render("allCustomer");
});

//HANDLE SIGN UP
//HERE ALSO CREATE NEW ORDER AND PUSH A HIDDEN PRODUCT WHICH WE CALL IT WELCOMEPRODUCT TO HANDLE THE ERROR WHICH OCCURS IN BASCKET BADGE NUMBER (PREVENT TO HAVE A UNDEFINED ARRAY!)
router.post("/register", function (req, res) {
    var password = req.body.password; //"456"//" Math.floor((Math.random() * 100000) + 1).toString();"
    var username = req.body.username;
    api.Send({
            message: 'به سیستم سفارش آنلاین خوش آمدید:  ' + password + '  کد ورود شما به سیستم سفارش آنلاین' + '   ' + 'شرکت بستنی تندیس',
            sender: "10004346",
            receptor: req.body.username
        },
        function (response, status) {
            console.log(response);
            console.log(status);
        });
    User.findOne().sort({
        field: 'asc',
        _id: -1
    }).limit(1).exec(function (err, lastQ) {
        if (err) {
            console.log(err);
        } else {
            //            var customersNo = Number(lastQ.customerNo) + 1;
            //        TO START FOR FIRST QUERY
            var customersNo = 1000;
            User.register(new User({
                username: username,
                customerNo: customersNo,
                customerName: req.body.customerName,
                customerAdd: req.body.customerAdd,
                customerPhone: req.body.customerPhone
            }), password, function (err, user) {
                if (err) {
                    console.log(err);
                } else {

                    //                            console.log(newOrder + '<---newOrder---||!!||');

                    passport.authenticate("local")(req, res, function () {
                        User.findOne({
                            username: req.user.username
                        }, function (err, newUser) {
                            newOrder.customerInfo.push(newUser);
                            newOrder.save(function (err, finish) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    req.logout();
                                    res.render("verifylogin", {
                                        data: newUser
                                    });
                                                                                            console.log(data + "<----orderAfterPushProduct");
                                                                                            console.log(welcomeProduct + "<---DataAfterPushUser");
                                }
                            });
                        });
                    });
                }
            });
        }
    });
});



//LOGIN FORM
router.get("/login", function (req, res) {
    res.render("login");
});
//LOGIN LOGIC
router.post("/login", passport.authenticate("local", {
    successRedirect: "/products",
    failureRedirect: "/login"
}), function (req, res) {});

//verify FORM
router.get("/verifyLogin", function (req, res) {
    res.render("verifylogin");
});
//verify LOGIC
router.post("/verifyLogin", passport.authenticate("local", {
    successRedirect: "/product",
    failureRedirect: "/login"
}), function (req, res) {});

//LOG OUT
router.get("/logout", function (req, res) {
    //    order.remove({username:req.user});
    req.logout();
    res.redirect("/product");
});

//SECRET PAGE


//isLoggedIn
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("login");
}

module.exports = router;
