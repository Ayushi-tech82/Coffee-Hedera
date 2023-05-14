/*
* Endpoints to invoke smartcontract APIs for Hedera Coffee SCP
*/
var express = require('express');
var bodyParser = require('body-parser');
require("dotenv").config();
const localStorage = require("localStorage");
let helper = require("./helper/helper");

//setting app
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));




//=======================================================================================================
// setting up a middleware to authenticate the request with a token 
//=======================================================================================================
app.use(async (req, res, next) => {
    console.info('New req for %s', req.originalUrl);
    // let userType = req.body.userType;
    // if (req.originalUrl.indexOf('/api/coffee/harvest') >= 0) {
    //     localStorage.clear();
    //     req.contractId = await helper.deployContract(userType);
    //     localStorage.setItem('contractId', req.contractId)
    // }
    req.contractId = localStorage.getItem('contractId');
    return next();
});

let coffeeRoute = require('./routes/coffee');
let contractRoute = require('./routes/contract');

app.use('/api/coffee', coffeeRoute);
app.use('/api/contract', contractRoute);

//=======================================================================================================
// server setup
//=======================================================================================================
app.listen(3000, () => {
    console.info("*** - Hedera Coffee SCP - SDK server running - ***");
});