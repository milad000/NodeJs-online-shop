var express = require("express");
var router = express.Router();
var passport = require("passport");
var products = require("../models/product");
var orders = require("../models/order");

router.use(passport.initialize());
router.use(passport.session());

//SEND USER CURRENT USER TO ALL ROUTES
router.use(function (req, res, next) {
    res.locals.currentuser = req.user;
    next();
});

//ALL PRODUCT
router.get("/product", function (req, res) {
    products.find({}, function (err, products) {
        if (err) {
            console.log(err);
        } else {
            console.log(products + '<--PRODUCT COMES FORM /PRODUCT---|_o_|');
            orders.find({
                customerInfo: req.user
            }, function (err, orders) {
                if (err) {
                    console.log(err);
                } else {
                    if (orders[0]) {
                        var orderCount = orders[0].productInfo.length;
                        res.render("allProduct", {
                            data: products,
                            data1: orderCount
                        });
                    } else {
                        res.render("allProduct", {
                            data: products,
                            data1: 0
                        });
                    }

                }
            });
        }
    });
});

//ALL PRODUCT S
router.get("/products", isLoggedIn, function (req, res) {
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
                    if (orders[0]) {
                        var orderCount = orders[0].productInfo.length;
                        res.render('allProductS', {
                            data: products,
                            data1: orderCount
                        });
                    } else {
                        res.render('allProductS', {
                            data: products,
                            data1: 0
                        });
                    }
                }
            });
        }
    });
});

//ALL PRODUCT MENU
router.get("/productmenu", function (req, res) {
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
                    if (orders[0]) {
                        var orderCount = orders[0].productInfo.length;
                        res.render('allProductMenu', {
                            data: products,
                            data1: orderCount
                        });
                    } else {
                        res.render('allProductMenu', {
                            data: products,
                            data1: 0
                        });
                    }
                }
            });
        }
    });
});

//SEND DATA FOR UPDATE THE BADGE NUMBER BY AJAX
router.get("/other", function (req, res) {
    orders.find({
        customerInfo: req.user
    }, function (err, orders) {
        if (orders[0]) {
            var orderCount = orders[0].productInfo.length;
            res.send({
                data1: orderCount
            });
        } else {
            res.send({
                data1: 0
            });
        }
    });
});

//NEW PRODUCT FORM
router.get("/product/new", function (req, res) {
    res.render("newProduct");
});

//CREATE PRODUCT
router.post("/product", function (req, res) {
    products.findOne().sort({
        field: 'asc',
        _id: -1
    }).limit(1).exec(function (err, lastQ) {
       // if (lastQ.productNo !== null) {
            var productNo = Number(lastQ.productNo) + 1;
       // } else {
       //     var productNo = 1000;
       // }
        var productName = req.body.data.productName,
            productDes = req.body.data.productDes,
            productPrice = req.body.data.productPrice,
            productImg = req.body.data.productImg;
        var newProduct = {
            productNo: productNo,
            productName: productName,
            productDes: productDes,
            productPrice: productPrice,
            productImg: productImg
        }
        products.create(newProduct, function (err, productNew) {
            if (err) {
                console.log(err)
            } else {

                res.redirect("/product");
            }
        });
    });

});

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
router.delete("/product/:id", function (req, res) {
    products.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/product");
        } else {
            res.redirect("/product");
        }
    });
});

//isLoggedIn
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("login");
}

//EXPORT
module.exports = router;
