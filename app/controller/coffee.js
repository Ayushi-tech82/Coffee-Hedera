const { Client, PrivateKey, AccountId, ContractFunctionParameters, ContractExecuteTransaction, ContractCreateFlow, Hbar, ContractCallQuery } = require("@hashgraph/sdk");

//imports
let constants = require('../constants/constants');
let helper = require('../helper/helper');

//=======================================================================================================
// harvestItem
//=======================================================================================================
module.exports.harvestItem = async function (req, res) {
    console.info('------------ controller --> harvestItem STARTED -----------');
    let { upc, productId, productNotes, userType } = req.body;

    let farmerIdHedera = AccountId.fromString(helper.getAccountId(userType));
    let farmerIdSolidity = farmerIdHedera.toSolidityAddress();

    try {
        console.log(`req.contractId = ${req.contractId}`)
        let contractId = req.contractId;
        if (contractId == null) {
            return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.CONTRACT_IS_NOT_DEPLOYED_YET_MESSSAGE });
        }

        let client = await helper.getClient(userType);
        const contractExecTx = new ContractExecuteTransaction()
            //Set the contract ID to return the request for     
            .setContractId(contractId)
            //Set the gas for the query   
            .setGas(10000000)
            //Set the contract function to call     
            .setFunction("harvestItem", new ContractFunctionParameters().addUint256(upc).addAddress(farmerIdSolidity).addString(productNotes).addString(productId));

        const submitExecTx = await contractExecTx.execute(client);
        //Get the receipt of the transaction
        const transactionReceipt = await submitExecTx.getReceipt(client);
        //Confirm the transaction was executed successfully 
        console.log("The transaction status is " + transactionReceipt.status.toString());
        console.info('------------ controller --> harvestItem COMPLETED -----------');
        if (transactionReceipt.status.toString() != constants.BLOCKCHAIN_RESPONSE_STATUS_SUCCESS) {
            return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: transactionReceipt.status.toString() });
        }
        return res.status(constants.RES_CODE_CREATED).json({ code: constants.RES_CODE_CREATED, success: true, message: constants.ITEM_HARVESTED_SUCCESSFULLY_MESSAGE });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}

//=======================================================================================================
// processItem
//=======================================================================================================
module.exports.processItem = async function (req, res) {
    console.info('------------ controller --> processItem STARTED -----------');
    let { upc, userType } = req.body;

    try {
        console.log(`req.contractId = ${req.contractId}`)
        let contractId = req.contractId;
        let client = await helper.getClient(userType);
        const contractExecTx = new ContractExecuteTransaction()
            //Set the contract ID to return the request for     
            .setContractId(contractId)
            //Set the gas for the query   
            .setGas(10000000)
            //Set the contract function to call     
            .setFunction("processItem", new ContractFunctionParameters().addUint256(upc));

        const submitExecTx = await contractExecTx.execute(client);
        //Get the receipt of the transaction
        const transactionReceipt = await submitExecTx.getReceipt(client);
        //Confirm the transaction was executed successfully 
        console.log("The transaction status is " + transactionReceipt.status.toString());
        console.info('------------ controller --> processItem COMPLETED -----------');
        if (transactionReceipt.status.toString() != constants.BLOCKCHAIN_RESPONSE_STATUS_SUCCESS) {
            return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: transactionReceipt.status.toString() });
        }
        return res.status(constants.RES_CODE_CREATED).json({ code: constants.RES_CODE_CREATED, success: true, message: constants.ITEM_PROCESSED_SUCCESSFULLY_MESSAGE });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}

//=======================================================================================================
// packItem
//=======================================================================================================
module.exports.packItem = async function (req, res) {
    console.info('------------ controller --> packItem STARTED -----------');
    let { upc, userType } = req.body;

    try {
        console.log(`req.contractId = ${req.contractId}`)
        let contractId = req.contractId;
        let client = await helper.getClient(userType);
        const contractExecTx = new ContractExecuteTransaction()
            //Set the contract ID to return the request for     
            .setContractId(contractId)
            //Set the gas for the query   
            .setGas(10000000)
            //Set the contract function to call     
            .setFunction("packItem", new ContractFunctionParameters().addUint256(upc));

        const submitExecTx = await contractExecTx.execute(client);
        //Get the receipt of the transaction
        const transactionReceipt = await submitExecTx.getReceipt(client);
        //Confirm the transaction was executed successfully 
        console.log("The transaction status is " + transactionReceipt.status.toString());
        console.info('------------ controller --> packItem COMPLETED -----------');
        if (transactionReceipt.status.toString() != constants.BLOCKCHAIN_RESPONSE_STATUS_SUCCESS) {
            return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: transactionReceipt.status.toString() });
        }
        return res.status(constants.RES_CODE_CREATED).json({ code: constants.RES_CODE_CREATED, success: true, message: constants.ITEM_PACKAGED_SUCCESSFUULY_MESSAGE });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}

//=======================================================================================================
// sellItem
//=======================================================================================================
module.exports.sellItem = async function (req, res) {
    console.info('------------ controller --> sellItem STARTED -----------');
    let { upc, productPrice, userType } = req.body;

    try {
        console.log(`req.contractId = ${req.contractId}`)
        let contractId = req.contractId;
        let client = await helper.getClient(userType);
        const contractExecTx = new ContractExecuteTransaction()
            //Set the contract ID to return the request for     
            .setContractId(contractId)
            //Set the gas for the query   
            .setGas(10000000)
            //Set the contract function to call     
            .setFunction("sellItem", new ContractFunctionParameters().addUint256(upc).addUint256(productPrice));

        const submitExecTx = await contractExecTx.execute(client);
        //Get the receipt of the transaction
        const transactionReceipt = await submitExecTx.getReceipt(client);
        //Confirm the transaction was executed successfully 
        console.log("The transaction status is " + transactionReceipt.status.toString());
        console.info('------------ controller --> sellItem COMPLETED -----------');
        if (transactionReceipt.status.toString() != constants.BLOCKCHAIN_RESPONSE_STATUS_SUCCESS) {
            return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: transactionReceipt.status.toString() });
        }
        return res.status(constants.RES_CODE_CREATED).json({ code: constants.RES_CODE_CREATED, success: true, message: constants.ITEM_SOLD_SUCCESSFULLY_MESSAGE });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}

//=======================================================================================================
// buyItem
//=======================================================================================================
module.exports.buyItem = async function (req, res) {
    console.info('------------ controller --> buyItem STARTED -----------');
    let { upc, userType } = req.body;

    let distributorIdHedera = AccountId.fromString(helper.getAccountId(userType));
    let distributorIdSolidity = distributorIdHedera.toSolidityAddress();

    try {
        console.log(`req.contractId = ${req.contractId}`)
        let contractId = req.contractId;
        let client = await helper.getClient(userType);
        const contractExecTx = new ContractExecuteTransaction()
            //Set the contract ID to return the request for     
            .setContractId(contractId)
            //Set the gas for the query   
            .setGas(10000000)
            //Set the contract function to call     
            .setFunction("buyItem", new ContractFunctionParameters().addUint256(upc).addAddress(distributorIdSolidity));

        const submitExecTx = await contractExecTx.execute(client);
        //Get the receipt of the transaction
        const transactionReceipt = await submitExecTx.getReceipt(client);
        //Confirm the transaction was executed successfully 
        console.log("The transaction status is " + transactionReceipt.status.toString());
        console.info('------------ controller --> buyItem COMPLETED -----------');
        if (transactionReceipt.status.toString() != constants.BLOCKCHAIN_RESPONSE_STATUS_SUCCESS) {
            return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: transactionReceipt.status.toString() });
        }
        return res.status(constants.RES_CODE_CREATED).json({ code: constants.RES_CODE_CREATED, success: true, message: constants.ITEM_BOUGHT_SUCCESSFULLY_MESSAGE });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}

//=======================================================================================================
// shipItem
//=======================================================================================================
module.exports.shipItem = async function (req, res) {
    console.info('------------ controller --> shipItem STARTED -----------');
    let { upc, userType } = req.body;

    try {
        console.log(`req.contractId = ${req.contractId}`)
        let contractId = req.contractId;
        let client = await helper.getClient(userType);
        const contractExecTx = new ContractExecuteTransaction()
            //Set the contract ID to return the request for     
            .setContractId(contractId)
            //Set the gas for the query   
            .setGas(10000000)
            //Set the contract function to call     
            .setFunction("shipItem", new ContractFunctionParameters().addUint256(upc));

        const submitExecTx = await contractExecTx.execute(client);
        //Get the receipt of the transaction
        const transactionReceipt = await submitExecTx.getReceipt(client);
        //Confirm the transaction was executed successfully 
        console.log("The transaction status is " + transactionReceipt.status.toString());
        console.info('------------ controller --> shipItem COMPLETED -----------');

        if (transactionReceipt.status.toString() != constants.BLOCKCHAIN_RESPONSE_STATUS_SUCCESS) {
            return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: transactionReceipt.status.toString() });
        }
        return res.status(constants.RES_CODE_CREATED).json({ code: constants.RES_CODE_CREATED, success: true, message: constants.ITEM_SHIPPED_SUCCESSFULLY_MESSAGE });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}

//=======================================================================================================
// receiveItem
//=======================================================================================================
module.exports.receiveItem = async function (req, res) {
    console.info('------------ controller --> receiveItem STARTED -----------');
    let { upc, userType } = req.body;

    let retailerIdHedera = AccountId.fromString(helper.getAccountId(userType));
    let retailerIdSolidity = retailerIdHedera.toSolidityAddress();

    try {
        console.log(`req.contractId = ${req.contractId}`)
        let contractId = req.contractId;
        let client = await helper.getClient(userType);
        const contractExecTx = new ContractExecuteTransaction()
            //Set the contract ID to return the request for     
            .setContractId(contractId)
            //Set the gas for the query   
            .setGas(10000000)
            //Set the contract function to call     
            .setFunction("receiveItem", new ContractFunctionParameters().addUint256(upc).addAddress(retailerIdSolidity));

        const submitExecTx = await contractExecTx.execute(client);
        //Get the receipt of the transaction
        const transactionReceipt = await submitExecTx.getReceipt(client);
        //Confirm the transaction was executed successfully 
        console.log("The transaction status is " + transactionReceipt.status.toString());
        console.info('------------ controller --> receiveItem COMPLETED -----------');
        if (transactionReceipt.status.toString() != constants.BLOCKCHAIN_RESPONSE_STATUS_SUCCESS) {
            return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: transactionReceipt.status.toString() });
        }
        return res.status(constants.RES_CODE_CREATED).json({ code: constants.RES_CODE_CREATED, success: true, message: constants.ITEM_RECEIVED_SUCCESSFULLY_MESSAGE });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}

//=======================================================================================================
// purchaseItem
//=======================================================================================================
module.exports.purchaseItem = async function (req, res) {
    console.info('------------ controller --> purchaseItem STARTED -----------');
    let { upc, userType } = req.body;

    let consumerIdHedera = AccountId.fromString(helper.getAccountId(userType));
    let consumerIdSolidity = consumerIdHedera.toSolidityAddress();

    try {
        console.log(`req.contractId = ${req.contractId}`)
        let contractId = req.contractId;
        let client = await helper.getClient(userType);
        const contractExecTx = new ContractExecuteTransaction()
            //Set the contract ID to return the request for     
            .setContractId(contractId)
            //Set the gas for the query   
            .setGas(10000000)
            //Set the contract function to call     
            .setFunction("purchaseItem", new ContractFunctionParameters().addUint256(upc).addAddress(consumerIdSolidity));

        const submitExecTx = await contractExecTx.execute(client);
        //Get the receipt of the transaction
        const transactionReceipt = await submitExecTx.getReceipt(client);
        //Confirm the transaction was executed successfully 
        console.log("The transaction status is " + transactionReceipt.status.toString());
        console.info('------------ controller --> purchaseItem COMPLETED -----------');

        if (transactionReceipt.status.toString() != constants.BLOCKCHAIN_RESPONSE_STATUS_SUCCESS) {
            return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: transactionReceipt.status.toString() });
        }
        return res.status(constants.RES_CODE_CREATED).json({ code: constants.RES_CODE_CREATED, success: true, message: constants.ITEM_PURCHASED_SUCCESSFULLY_MESSAGE });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}

//=======================================================================================================
// fetchItemByUpc
//=======================================================================================================
module.exports.fetchItemByUpc = async function (req, res) {
    console.info('------------ controller --> fetchItemByUpc STARTED -----------');
    try {
        console.log(`contractId = ${req.contractId}`)
        let contractId = req.contractId;
        let upc = req.params.upc;
        let userType = req.params.userType;

        let client = await helper.getClient(userType);
        // query the contract    
        const contractCall = await new ContractCallQuery()
            .setContractId(contractId)
            .setFunction("fetchItemByUpc", new ContractFunctionParameters().addUint256(upc))
            .setQueryPayment(new Hbar(50))
            .setGas(10000000)
            .execute(client);

        let results = helper.decodeFunctionResult('fetchItemByUpc', contractCall.bytes);
        console.log(results);

        let responseData = {
            itemSKU: results.itemSKU,
            itemUPC: results.itemUPC,
            farmerId: results.farmerId,
            productId: results.productId,
            productNotes: results.productNotes,
            productPrice: results.productPrice,
            itemState: results.itemState,
            distributorId: results.distributorId,
            retailerId: results.retailerId,
            consumerId: results.consumerId
        }

        console.info('------------ controller --> fetchItemByUpc COMPLETED -----------');
        return res.status(constants.RES_CODE_OK).json({ code: constants.RES_CODE_OK, success: true, message: constants.DETAILS_FETECHED_SUCCESSFULLTY_MESSAGE, data: responseData });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}

//=======================================================================================================
// getAllItems
//=======================================================================================================
module.exports.getAllItems = async function (req, res) {
    console.info('------------ controller --> getAllItems STARTED -----------');
    try {
        console.log(`contractId = ${req.contractId}`)
        let contractId = req.contractId;
        let userType = req.params.userType;

        let client = await helper.getClient(userType);
        const functionCallAsUint8Array = helper.encodeFunctionCall("getAllItems", []);
        // query the contract    
        console.info('------------ controller --> getAllItems --> ContractCallQuery')
        const contractCall = await new ContractCallQuery()
            .setContractId(contractId)
            .setFunctionParameters(functionCallAsUint8Array)
            // .setFunction("getAllItems")
            .setQueryPayment(new Hbar(50))
            .setGas(10000000)
            .execute(client);

        let results = helper.decodeFunctionResult('getAllItems', contractCall.bytes);
        console.info('------------------- results -------------------')
        console.info(results);

        if (results[0].length <= 0) {
            return res.status(constants.RES_CODE_DATA_NOT_FOUND).json({ code: constants.RES_CODE_DATA_NOT_FOUND, success: false, message: constants.NO_DATA_FOUND_MESSAGE });
        }
        let responseData = {};
        let responseDataList = [];

        for (const r of results[0]) {

            responseData.itemUPC = r.itemUPC;
            responseData.itemSKU = r.itemSKU;
            responseData.farmerId = r.farmerId;
            responseData.productId = r.productId;
            responseData.productNotes = r.productNotes;
            responseData.productPrice = r.productPrice;
            responseData.itemState = r.itemState;
            responseData.distributorId = r.distributorId;
            responseData.retailerId = r.retailerId;
            responseData.consumerId = r.consumerId;

            responseDataList.push(responseData);

        }
        console.info('------------------- responseDataList -------------------')
        console.info(responseDataList);

        console.info('------------ controller --> getAllItems COMPLETED -----------');
        return res.status(constants.RES_CODE_OK).json({ code: constants.RES_CODE_OK, success: true, message: constants.DETAILS_FETECHED_SUCCESSFULLTY_MESSAGE, data: responseDataList });
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}


// harvestItem - upc,farmerIdSolidity,productNotes,productId
// processItem - uint256 _upc
// packItem - uint256 _upc
// sellItem - uint256 _upc,uint256 _price

// buyItem - uint256 _upc,address _distributorId
// shipItem - uint256 _upc

// receiveItem - uint256 _upc,address _retailerId

// purchaseItem - uint256 _upc,address _consumerId