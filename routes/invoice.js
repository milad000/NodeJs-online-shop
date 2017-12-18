var express = require("express");
var router = express.Router();
var passport = require("passport");

var customers = require("../models/user");
var invoices = require("../models/invoice");
var orders = require("../models/order");
var products = require("../models/product");

router.use(passport.initialize());
router.use(passport.session());

//SEND USER CURRENT USER TO ALL ROUTES
router.use(function (req, res, next) {
    res.locals.currentuser = req.user;
    next();
});


//ALL INVOICES
router.get("/invoice", function (req, res) {
    invoices.find({}, function (err, invoices) {
        if (err) {
            console.log(err);
        } else {
            console.log(invoices + '<--- invoices route:invoice');
            res.render("allInvoice", {
                data: invoices
            });
        }
    });
});

//ALL MY INVOICES
router.get("/myinvoices", function (req, res) {
    invoices.find({}, function (err, invoices) {
        if (err) {
            console.log(err);
        } else {
            console.log(invoices + '<--- invoices route:invoice');
            res.render("allInvoice", {
                data: invoices
            });
        }
    });
});

//MY INVOICE
router.get("/myinvoice/:id", isLoggedIn, function (req, res) {
    orders.findById(req.params.id).populate("customerInfo").populate("productInfo").exec(function (err, foundOrder) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundOrder + "<-- foundOrder from my invoice get --");
            res.render("myInvoice", {
                data: foundOrder
            });

        }
    });
});

//MY INVOICE
router.post("/myinvoice", isLoggedIn, function (req, res) {
    invoices.findOne().sort({
        field: 'asc',
        _id: -1
    }).limit(1).exec(function (err, lastQ) {
        if (err) {
            console.log(err);
        } else {
            var newNumber = Number(lastQ.invoiceNo) + 1;
    console.log(newNumber + '<--- req.body.newNumber route myinvoice post');
        }
        var invoiceNo = newNumber,
            counter1 = req.body.counter1,
            productName1 = req.body.productName1,
            productPrice1 = req.body.productPrice1,
            amount1 = req.body.amount1,
            subPrice1 = req.body.subPrice1,
            counter2 = req.body.counter2,
            productName2 = req.body.productName2,
            productPrice2 = req.body.productPrice2,
            amount2 = req.body.amount2,
            subPrice2 = req.body.subPrice2,
            counter3 = req.body.counter3,
            productName3 = req.body.productName3,
            productPrice3 = req.body.productPrice3,
            amount3 = req.body.amount3,
            subPrice3 = req.body.subPrice3,
            counter4 = req.body.counter4,
            productName4 = req.body.productName4,
            productPrice4 = req.body.productPrice4,
            amount4 = req.body.amount4,
            subPrice4 = req.body.subPrice4,
            counter5 = req.body.counter5,
            productName5 = req.body.productName5,
            productPrice5 = req.body.productPrice5,
            amount5 = req.body.amount5,
            subPrice5 = req.body.subPrice5,
            counter6 = req.body.counter6,
            productName6 = req.body.productName6,
            productPrice6 = req.body.productPrice6,
            amount6 = req.body.amount6,
            subPrice6 = req.body.subPrice6,
            counter7 = req.body.counter7,
            productName7 = req.body.productName7,
            productPrice7 = req.body.productPrice7,
            amount7 = req.body.amount7,
            subPrice7 = req.body.subPrice7,
            counter8 = req.body.counter8,
            productName8 = req.body.productName8,
            productPrice8 = req.body.productPrice8,
            amount8 = req.body.amount8,
            subPrice8 = req.body.subPrice8,
            counter9 = req.body.counter9,
            productName9 = req.body.productName9,
            productPrice9 = req.body.productPrice9,
            amount9 = req.body.amount9,
            subPrice9 = req.body.subPrice9,
            counter10 = req.body.counter10,
            productName10 = req.body.productName10,
            productPrice10 = req.body.productPrice10,
            amount10 = req.body.amount10,
            subPrice10 = req.body.subPrice10,
            counter11 = req.body.counter11,
            productName11 = req.body.productName11,
            productPrice11 = req.body.productPrice11,
            amount11 = req.body.amount11,
            subPrice11 = req.body.subPrice11,
            counter12 = req.body.counter12,
            productName12 = req.body.productName12,
            productPrice12 = req.body.productPrice12,
            amount12 = req.body.amount12,
            subPrice12 = req.body.subPrice12,
            counter13 = req.body.counter13,
            productName13 = req.body.productName13,
            productPrice13 = req.body.productPrice13,
            amount13 = req.body.amount13,
            subPrice13 = req.body.subPrice13,
            counter14 = req.body.counter14,
            productName14 = req.body.productName14,
            productPrice14 = req.body.productPrice14,
            amount14 = req.body.amount14,
            subPrice14 = req.body.subPrice14,
            counter15 = req.body.counter15,
            productName15 = req.body.productName15,
            productPrice15 = req.body.productPrice15,
            amount15 = req.body.amount15,
            subPrice15 = req.body.subPrice15,
            counter16 = req.body.counter16,
            productName16 = req.body.productName16,
            productPrice16 = req.body.productPrice16,
            amount16 = req.body.amount16,
            subPrice16 = req.body.subPrice16,
            counter17 = req.body.counter17,
            productName17 = req.body.productName17,
            productPrice17 = req.body.productPrice17,
            amount17 = req.body.amount17,
            subPrice17 = req.body.subPrice17,
            total = req.body.total,
            vat = req.body.vat,
            toPay = req.body.toPay,
            customerName = req.body.customerName,
            customerAdd = req.body.customerAdd,
            orderAdd = req.body.orderAdd,
            customerPhone = req.body.customerPhone,
            date = req.body.date;
        var myinvoice = {
            invoiceNo: invoiceNo,
            counter1: counter1,
            productName1: productName1,
            productPrice1: productPrice1,
            amount1: amount1,
            subPrice1: subPrice1,
            counter2: counter2,
            productName2: productName2,
            productPrice2: productPrice2,
            amount2: amount2,
            subPrice2: subPrice2,
            counter3: counter3,
            productName3: productName3,
            productPrice3: productPrice3,
            amount3: amount3,
            subPrice3: subPrice3,
            counter4: counter4,
            productName4: productName4,
            productPrice4: productPrice4,
            amount4: amount4,
            subPrice4: subPrice4,
            counter5: counter5,
            productName5: productName5,
            productPrice5: productPrice5,
            amount5: amount5,
            subPrice5: subPrice5,
            counter6: counter6,
            productName6: productName6,
            productPrice6: productPrice6,
            amount6: amount6,
            subPrice6: subPrice6,
            counter7: counter7,
            productName7: productName7,
            productPrice7: productPrice7,
            amount7: amount7,
            subPrice7: subPrice7,
            counter8: counter8,
            productName8: productName8,
            productPrice8: productPrice8,
            amount8: amount8,
            subPrice8: subPrice8,
            counter9: counter9,
            productName9: productName9,
            productPrice9: productPrice9,
            amount9: amount9,
            subPrice9: subPrice9,
            counter10: counter10,
            productName10: productName10,
            productPrice10: productPrice10,
            amount10: amount10,
            subPrice10: subPrice10,
            counter11: counter11,
            productName11: productName11,
            productPrice11: productPrice11,
            amount11: amount11,
            subPrice11: subPrice11,
            counter12: counter12,
            productName12: productName12,
            productPrice12: productPrice12,
            amount12: amount12,
            subPrice12: subPrice12,
            counter13: counter13,
            productName13: productName13,
            productPrice13: productPrice13,
            amount13: amount13,
            subPrice13: subPrice13,
            counter14: counter14,
            productName14: productName14,
            productPrice14: productPrice14,
            amount14: amount14,
            subPrice14: subPrice14,
            counter15: counter15,
            productName15: productName15,
            productPrice15: productPrice15,
            amount15: amount15,
            subPrice15: subPrice15,
            counter16: counter16,
            productName16: productName16,
            productPrice16: productPrice16,
            amount16: amount16,
            subPrice16: subPrice16,
            counter17: counter17,
            productName17: productName17,
            productPrice17: productPrice17,
            amount17: amount17,
            subPrice17: subPrice17,
            total: total,
            vat: vat,
            toPay: toPay,
            customerName: customerName,
            customerAdd: customerAdd,
            orderAdd: orderAdd,
            customerPhone: customerPhone,
            date: date
        }
        invoices.create(myinvoice, function (err, createdinvoice) {
            if (err) {
                console.log(err);
            } else {
                console.log(createdinvoice + "<-- foundOrder --");
                res.redirect("/showinvoice/"+createdinvoice._id);
                orders.findOne({
                    customerInfo: req.user
                }, function (err, foundOrder) {
                    if (err) {
                        console.log(err);
                    } else {
                        orders.findByIdAndRemove(foundOrder._id, function (err, deletedOrder) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(createdinvoice + "<-- deletedOrder --");
                            }
                        });
                    }
                });
            }
        });
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
//                //get info of product from body! var newOrder
//                //create order!
//                orders.create(req.body.data, function (err, newOrder) {});
//                //push order into invoice!
//                orders.findOne().sort({
//                    field: 'asc',
//                    _id: -1
//                }).limit(1).exec(function (err, foundOrder) {
//                    if (err) {
//                        console.log(err);
//                    } else {
//                        //???????? newOrder
//                        console.log(foundOrder._id + "====================");
//                        console.log(newInvoice.orderInfo + "-------------=======");
//                        console.log(newInvoice.customerInfo + "-------------=======");
//                        newInvoice.orderInfo.push(foundOrder);
//                        newInvoice.save(function (err, data) {
//                            if (err) {
//                                console.log(err);
//                            } else {
//                                customers.findById(req.params.id, function (err, foundCustomer) {
//                                    newInvoice.customerInfo.push(foundCustomer);
//                                    newInvoice.save(function (err, data) {
//                                        if (err) {
//                                            console.log(err);
//                                        } else {
//                                            console.log(data);
//                                            orders.findById(foundOrder._id, function (err, editOrder) {
//                                                if (err) {
//                                                    console.log(err);
//                                                } else {
//                                                    products.find({}, function (err, productfound) {
//
//                                                        if (err) {
//                                                            console.log(err);
//                                                        } else {
//                                                            res.render("editOrder", {
//                                                                data: editOrder,
//                                                                data1: productfound
//                                                            });
//                                                        }
//
//
//                                                    });
//                                                }
//                                            });
//                                        }
//                                    });
//                                });
//                            }
//                        });
//                    }
//                });
//            }
//        });
//    });
//});


//EDIT SELECTED CUSTOMER
router.get("/invoice/:id/edit", function (req, res) {
    invoices.findById(req.params.id, function (err, invoiceEdit) {
        if (err) {
            res.redirect("/invoice");
        } else {
            res.render("editInvoice", {
                data: invoiceEdit
            });
        }
    });
});

//UPDATE SELECTED CUSTOMER
router.put("/invoice/:id", function (req, res) {
    invoices.findByIdAndUpdate(req.params.id, req.body.data, function (err, invoiceUpdate) {
        if (err) {
            res.redirect("/invoice");
            console.log(err);

        } else {
            res.redirect("/showinvoice/" + req.params.id);
        }

    });
});
//SHOW SELECTED INVOICE
router.get("/showinvoice/:id", function (req, res) {
    invoices.findById(req.params.id).populate("customerInfo").populate("orderInfo").exec(function (err, invoice) {
        if (err) {
            res.redirect("/invoice");
        } else {
            res.render("showInvoice", {
                data: invoice
            });
        }
    });
});

//DELETE SELECTED INVOICE
router.delete("/invoice/:id", function (req, res) {
    invoices.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/invoice");
        } else {
            res.redirect("/invoice");
        }
    });
});

// INVOICENOCREATOR
//function invoiceNoCreator() {
//    invoices.findOne().sort({
//        field: 'asc',
//        _id: -1
//    }).limit(1).exec(function (err, post) {
//        if (err) {
//            console.log(err);
//            return 1000;
//        }
//    });
//    return post.invoiceNumber;
//
//}

//isLoggedin
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

//EXPORT
module.exports = router;
