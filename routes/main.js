var express = require("express");
var router = express.Router();
var _ = require('underscore');
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

router.get("/aboutus",function(req,res){
    res.render("aboutus");
})

//EXPORT
module.exports = router;
