
let constants = require('../constants/constants');

const fs = require("fs");
const { Client, AccountId, PrivateKey, ContractFunctionParameters, ContractExecuteTransaction, ContractCreateFlow, Hbar, ContractCallQuery } = require("@hashgraph/sdk");
let Web3 = require("web3");
let web3 = new Web3();

let cscContractJson = require("../../build/contracts/CoffeeSupplyChain.json");
let abi = cscContractJson.abi;
const bytecode = fs.readFileSync("/Users/md.abidkhan/Documents/abid/official/hedera/code/hedera-cscp/bin/contracts_CoffeeSupplyChain_sol_CoffeeSupplyChain.bin");

const path = require('path')
require('dotenv').config({path: path.relative(process.cwd(), path.join(__dirname,'..','.env'))});

//=======================================================================================================
// helper functions
//=======================================================================================================
function getAccountId(userType) {
    console.info('------------ helper --> getAccountId STARTED -----------');
    if (userType.toLowerCase() == constants.USER_TYPE_FARMER) {
        return constants.FARMER_ID;
    }
    else if (userType.toLowerCase() == constants.USER_TYPE_DISTRIBUTOR) {
        return constants.DISTRIBUTOR_ID;
    }
    else if (userType.toLowerCase() == constants.USER_TYPE_RETAILER) {
        return constants.RETAILER_ID;
    }
    else if (userType.toLowerCase() == constants.USER_TYPE_CONSUMER) {
        return constants.CONSUMER_ID;
    }
    else {
        throw new Error("Invalid UserType");
    }
}

function getPrivateKey(userType) {
    console.info('------------ helper --> getPrivateKey STARTED -----------');
    if (userType.toLowerCase() == constants.USER_TYPE_FARMER) {
        return constants.FARMER_PVT_KEY;
    }
    else if (userType.toLowerCase() == constants.USER_TYPE_DISTRIBUTOR) {
        return constants.DISTRIBUTOR_PVT_KEY;
    }
    else if (userType.toLowerCase() == constants.USER_TYPE_RETAILER) {
        return constants.RETAILER_PVT_KEY;
    }
    else if (userType.toLowerCase() == constants.USER_TYPE_CONSUMER) {
        return constants.CONSUMER_PVT_KEY;
    }
    else {
        throw new Error("Invalid UserType");
    }
}

async function getClient(userType) {
    console.info('------------ helper --> getClient STARTED -----------');
    let accountId = AccountId.fromString(getAccountId(userType.toLowerCase()));
    let pvtKey = PrivateKey.fromString(getPrivateKey(userType.toLowerCase()))
    return Client.forTestnet().setOperator(accountId, pvtKey);
}

async function deployContract(userType) {
    console.info('------------ helper --> deployContract STARTED -----------');
    let client = await getClient(userType.toLowerCase());
    const contractCreate = new ContractCreateFlow()
        .setGas(10000000)
        .setBytecode(bytecode);
    //Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
    const submitTx = await contractCreate.execute(client);
    //Get the receipt of the file create transaction
    const fileReceipt = await submitTx.getReceipt(client);
    // console.log(fileReceipt)
    console.log('----------------- TransactionReceipt Received');
    //Get the file ID from the receipt
    const contractId = fileReceipt.contractId;
    //Log the file ID
    console.log("Deployed contractId :" + contractId)
    console.info('------------ helper --> deployContract COMPLETED -----------');
    return contractId;
}

function encodeFunctionCall(functionName, parameters) {
    console.info('------------ helper --> encodeFunctionCall STARTED -----------');
    const functionAbi = abi.find(func => (func.name === functionName && func.type === "function"));
    const encodedParametersHex = web3.eth.abi.encodeFunctionCall(functionAbi, parameters).slice(2);
    return Buffer.from(encodedParametersHex, 'hex');
}

function decodeFunctionResult(functionName, resultAsBytes) {
    console.info('------------ helper --> decodeFunctionResult STARTED -----------');
    const functionAbi = abi.find(func => func.name === functionName);
    const functionParameters = functionAbi.outputs;
    const resultHex = '0x'.concat(Buffer.from(resultAsBytes).toString('hex'));
    const result = web3.eth.abi.decodeParameters(functionParameters, resultHex);
    return result;
}

module.exports = {
    getAccountId,
    getPrivateKey,
    getClient,
    deployContract,
    encodeFunctionCall,
    decodeFunctionResult
}

