var express = require("express");
var router = express.Router();
var passport = require("passport");
var orders = require("../models/order");
var invoices = require("../models/invoice");
var User = require("../models/user");
var products = require("../models/product");

router.use(passport.initialize());
router.use(passport.session());

//SEND USER CURRENT USER TO ALL ROUTES
router.use(function (req, res, next) {
    res.locals.currentuser = req.user;
    next();
});


//ALL ORDER
router.get("/order", function (req, res) {
    orders.find({}).populate("customerInfo").exec(function (err, orders) {
        if (err) {
            console.log("ERROR!");
        } else {
            res.render("allOrder", {
                data: orders
            });
        }
    });
});

//MY ORDER
router.get("/myorder", function (req, res) {
    console.log(req.user);
    if (req.user) {
        orders.find({
            customerInfo: req.user
        }).populate('productInfo').exec(function (err, orders) {
            if (err) {
                console.log(err);
            } else {
                res.render("myOrder", {
                    data: orders,
                });
            }
        });
    } else {
        res.redirect("/product");
    }

});
//DECREASE PRODUCTINFO FROM ORDER
router.post("/orderminus", function (req, res) {
    console.log(req.body.id + "<---req.body from orderminus");
    orders.count({
        customerInfo: req.user
    }, function (err, count) {
        if (count > 0) {
            orders.findOne({
                customerInfo: req.user
            }, function (err, orders) {
                if (err) {
                    console.log(err);
                } else {
                    var index = orders.productInfo.findIndex(x => x == req.body.id);
                    var foundProduct = orders.productInfo[index];
                    console.log(index + "<--- index --- route orderminus");
                    orders.productInfo.splice(index, 1);
                    orders.save(function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect("/myorder")
                        }
                    });
                }
            });
        }
    });
});

//INCREASE PRODUCTINFO IN ORDER
router.post("/orderplus", function (req, res) {
    orders.count({
        customerInfo: req.user
    }, function (err, count) {
        //search orders if any exist for the current user!
        if (count > 0) {
            orders.findOne({
                customerInfo: req.user
            }, function (err, orders) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(req.body.id + "<--- req.body.id --- route orderplus");
                    var index = orders.productInfo.findIndex(x => x == req.body.id);
                    console.log(index + "<--- index --- route orderplus");
                    var foundProduct = orders.productInfo[index];
                    orders.productInfo.splice(index, 0, req.body.id);
                    console.log(orders.productInfo + "<--- order --- route orderplus");
                    orders.save(function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect("/myorder");
                        }
                    });
                }
            });
        }
    });
});
//SHOW SELECTED ORDER
router.get("/showorder/:id", function (req, res) {
    orders.findById(req.params.id).populate('productInfo').populate('customerInfo').exec(function (err, orders) {
        if (err) {
            console.log(err);
        } else {
            res.render("showOrder", {
                data: orders,
            });
        }
    });
});
////NEW INVOICE FORM
//router.get("/invoice/:id/new", function (req, res) {
//    customers.findById(req.params.id, function (err, client) {
//        if (err) {
//            console.log(err)
//        } else {
//            res.render("newInvoice", {
//                data: client
//            });
//        }
//    });
//});
////CREATE INVOICE
//router.post("/invoice/:id", function (req, res) {
//    invoices.findOne().sort({
//        field: 'asc',
//        _id: -1
//    }).limit(1).exec(function (err, lastQ) {
//        if (err) {
//            console.log(err);
//        }
//        var newNumber = Number(lastQ.invoiceNumber) + 1;
//        var invoiceDate = req.body.data.invoiceDate,
//            invoiceNumber = newNumber;
//        var newInvoiceNo = {
//            invoiceDate: invoiceDate,
//            invoiceNumber: invoiceNumber
//        }
//        invoices.create(newInvoiceNo, function (err, newInvoice) {
//            if (err) {
//                console.log(err);
//            } else {
//                customers.findById(req.params.id, function (err, foundCustomer) {
//                    newInvoice.customerInfo.push(foundCustomer);
//                    newInvoice.save(function (err, data) {
//                        if (err) {
//                            console.log(err);
//                        } else {
//                            console.log(data);
//                            res.redirect("/invoice");
//                        }
//                    });
//                });
//            }
//        });
//    });
//});
//NEW ORDER FORM
router.get("/order/new", function (req, res) {
    products.find({}, function (err, productInfo) {
        if (err) {
            console.log(err);
        } else {
            res.render("newOrder", {
                data: productInfo
            });
        }
    })
});


//ADD TO ORDER       
router.post("/orders", function (req, res) {
    orders.count({
        customerInfo: req.user
    }, function (err, count) {
        if (count > 0) {
            orders.findOne({
                customerInfo: req.user
            }, function (err, orders) {
                products.findOne({
                    _id: req.body.id
                }, function (err, products) {
                    var productNo = products.productNo,
                        productName = products.productName,
                        productDes = products.productDes,
                        productPrice = products.productPrice,
                        productImg = products.productImg;
                    var productData = {
                        productNo: productNo,
                        productName: productName,
                        productDes: productDes,
                        productPrice: productPrice,
                        productImg: productImg,
                    }
                    if (err) {
                        console.log(err);
                    } else {
                        orders.productInfo.push(products);
                        orders.save(function (err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(data + "<---order/orderAfterPushProduct");
                                res.end();
                            }
                        });
                    }
                });
            });
        } else {
            var user = req.user;
            var newOrder = {
                orderNo: '100',
                customerInfo: user
            }
            orders.create(newOrder, function (err, createdOrder) {
                if (err) {
                    console.log(err)
                } else {
                    products.findOne({
                        _id: req.body.id
                    }, function (err, products) {
                        if (err) {
                            console.log(err);
                        } else {

                            createdOrder.productInfo.push(products);
                            createdOrder.save(function (err, data) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(data);
                                    res.end();
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});



//EDIT SELECTED ORDER
router.get("/order/:id/edit", function (req, res) {});

//UPDATE ORDER
router.put("/order/:id", function (req, res) {
    console.log(req.body.data);
    orders.findByIdAndUpdate(req.params.id, req.body.data, function (err, orderUpdate) {
        if (err) {
            res.redirect("/order");
        } else {
            res.redirect("/invoice");
        }

    });
});

//DELETE ORDER
router.delete("/order/:id", function (req, res) {
    orders.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/order");
        } else {
            res.redirect("/order");
        }
    });
});

//isLoggedin
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


//EXPORT
module.exports = router;
