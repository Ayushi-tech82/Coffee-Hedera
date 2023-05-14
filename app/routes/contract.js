let express = require('express');
let router = express.Router();
let contract = require('../controller/contract');

router.post("/deploy", contract.deployContract);

module.exports = router;