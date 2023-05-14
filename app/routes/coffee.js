let express = require('express');
let router = express.Router();
let coffee = require('../controller/coffee');

router.post("/harvest", coffee.harvestItem);
router.post("/process", coffee.processItem);
router.post("/package", coffee.packItem);
router.post("/sell", coffee.sellItem);
router.post("/buy", coffee.buyItem);
router.post("/ship", coffee.shipItem);
router.post("/receive", coffee.receiveItem);
router.post("/purchase", coffee.purchaseItem);

router.get("/get-item/:userType/:upc", coffee.fetchItemByUpc);
// router.get("/get-all-items/:userType", coffee.getAllItems);

module.exports = router;