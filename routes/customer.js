var express = require("express");
var router = express.Router();
var User = require("../models/user");
var invoices = require("../models/invoice");


router.get("/", function (req, res) {
    res.render("test");
});
//ALL CUSTOMER
router.get("/customer", function (req, res) {
    User.find({}, function (err, customers) {
        if (err) {
            console.log("ERROR!");
        } else {
            res.render("allCustomer", {
                data: customers
            });
        }
    });
});

//ALL CUSTOMER INVOICES
router.get("/customer/invoice/:id", function (req, res) {
    invoices.find({
        'customerInfo': req.params.id
    }, function (err, customerInvoices) {
        User.findById(req.params.id, function (err, customerDetail) {
            if (err) {
                console.log("ERROR!");
            } else {
                res.render("customerInvoices", {
                    data: customerInvoices,
                    data1: customerDetail
                });
                console.log(customers);
            }
        });

    });
});

//NEW CUSTOMER FORM
router.get("/customer/new", function (req, res) {
    res.render("newCustomer");
});

//SAMPLE
//    customersNo: Number,
//    customerName:String,
//    customerAdd:String,
//    customerPhone:String,
//    var jobNumber = req.body.data.jobNumber,
//        jobDescription = req.body.data.jobDescription;
//    var author = {
//        id: req.user._id,
//        username: req.user.username
//    }
//    var newJobs = {
//        jobNumber: jobNumber,
//        jobDescription: jobDescription,
//        author: author
//    }
//    jobs.create(newJobs, function (err, newJobs) {
//CREATE CUSTOMER
router.post("/customer", function (req, res) {
    User.findOne().sort({
        field: 'asc',
        _id: -1
    }).limit(1).exec(function (err, lastQ) {
        if (err) {
            console.log(err);
        }
        var customersNo = Number(lastQ.customerNo) + 1,
            username = req.body.data.username,
            password = req.body.data.password,
            customerName = req.body.data.customerName,
            customerAdd = req.body.data.customerAdd,
            customerPhone = req.body.data.customerPhone;
        var newCustomer = {
            username: username,
            password: password,
            customersNo: customersNo,
            customerName: customerName,
            customerAdd: customerAdd,
            customerPhone: customerPhone
        }
        User.create(newCustomer, function (err, newContact) {
            if (err) {
                res.render("newCustomer");
            } else {
                res.redirect("/customer");
            }
        });
    });
});

//SHOW SELECTED CUSTOMER
router.get("/customer/:id", function (req, res) {
    User.findById(req.params.id, function (err, customer) {
        if (err) {
            console.log(req.params.id + "<................<.................<...............<.")
            res.redirect("/customer");
        } else {
            console.log(customer + "<................<.................<...............<.")
            res.render("showCustomer", {
                data: customer
            });
        }
    });
});

//EDIT SELECTED CUSTOMER
router.get("/customer/:id/edit", function (req, res) {
    User.findById(req.params.id, function (err, contactEdit) {
        if (err) {
            res.redirect("/customer");
        } else {
            res.render("editCustomer", {
                data: contactEdit
            });
        }
    });
});

//UPDATE SELECTED CUSTOMER
router.put("/customer/:id", function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body.data, function (err, contactUpdate) {
        if (err) {
            console.log(err + "<---errAboutUpdateUser---");
        } else {
            console.log(req.body.data.customerNo + '<---customerNoReturnFromUpdate');

            res.redirect("/customer/" + req.params.id);
        }

    });
});

//DELETE CUSTOMER
router.delete("/customer/:id", function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/customer");
        } else {
            res.redirect("/customer");
        }
    });
});

//EXPORT
module.exports = router;
