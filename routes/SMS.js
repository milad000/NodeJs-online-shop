var express = require("express");
var router = express.Router();
var _ = require('underscore');
var passport = require("passport");
var products = require("../models/product");
var orders = require("../models/order");
var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
    apikey:'2B2B4730794361304B735A4F365862375142587359673D3D'
});


router.use(passport.initialize());
router.use(passport.session());

//SEND USER CURRENT USER TO ALL ROUTES
router.use(function (req, res, next) {
    res.locals.currentuser = req.user;
    next();
});


//ALL PRODUCT

router.get("/sms", function (req, res) {
    api.Send({
            message: "خدمات پیام کوتاه کاوه نگار",
            sender: "10004346",
            receptor: "09356986628"
        },
        function (response, status) {
            console.log(response);
            console.log(status);
        });
});

//ALL PRODUCT S
router.get("/products", function (req, res) {
    products.find({}, function (err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log(products + '<--PRODUCT COMES FORM /PRODUCTS---|_o_|');
            orders.find({
                customerInfo: req.user
            }, function (err, orders) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('allproductS', {
                        data: products,
                        data1: orders[0].productInfo.length
                    });
                }
            });
        }
    });
});

router.get("/other", function (req, res) {
    orders.find({
        customerInfo: req.user
    }, function (err, orders) {
        res.send({
            data1: orders[0].productInfo.length
        });
    });
});
//NEW PRODUCT FORM
router.get("/product/new", function (req, res) {});

//CREATE PRODUCT
router.post("/product", function (req, res) {});

//SHOW SELECTED PRODUCT
router.get("/product/:id", function (req, res) {
    products.findById(req.params.id, function (err, product) {
        if (err) {
            res.redirect("/product");
        } else {
            res.render("showProduct", {
                data: product
            });
        }
    });
});

//EDIT SELECTED PRODUCT
router.get("/product/:id/edit", function (req, res) {
    products.findById(req.params.id, function (err, productEdit) {
        if (err) {
            res.redirect("/customer");
        } else {
            res.render("editProduct", {
                data: productEdit
            });
        }
    });
});

//UPDATE PRODUCT
router.put("/product/:id", function (req, res) {
    products.findByIdAndUpdate(req.params.id, req.body.data, function (err, productUpdate) {
        if (err) {
            res.redirect("/product");
        } else {
            res.redirect("/product/" + req.params.id);
        }

    });
});

//DELETE PRODUCT
router.delete("/product/:id", function (req, res) {});

//isLoggedIn
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("login");
}

//EXPORT
module.exports = router;
