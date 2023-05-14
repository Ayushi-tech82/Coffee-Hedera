const path = require('path')
require('dotenv').config({ path: path.relative(process.cwd(), path.join(__dirname, '..', '.env')) });

module.exports = {
    FARMER_ID: process.env.FARMER_ID,
    FARMER_PVT_KEY: process.env.FARMER_PVT_KEY,

    DISTRIBUTOR_ID: process.env.DISTRIBUTOR_ID,
    DISTRIBUTOR_PVT_KEY: process.env.DISTRIBUTOR_PVT_KEY,

    RETAILER_ID: process.env.RETAILER_ID,
    RETAILER_PVT_KEY: process.env.RETAILER_PVT_KEY,

    CONSUMER_ID: process.env.CONSUMER_ID,
    CONSUMER_PVT_KEY: process.env.CONSUMER_PVT_KEY,

    // --------- API Response Codes --------- //
    RES_CODE_INTERNAL_SERVER_ERROR: 500,
    RES_CODE_CREATED: 201,
    RES_CODE_OK: 200,
    RES_CODE_ALREADY_EXIST: 409,
    RES_CODE_DATA_NOT_FOUND: 404,
    RES_CODE_MISMATCH: 203,
    RES_CODE_IS_REQUIRED: 428,
    RES_CODE_IS_INVALID: 400,
    RES_CODE_IS_UNAUTHORIZED: 401,

    BLOCKCHAIN_RESPONSE_STATUS_SUCCESS: 'SUCCESS',

    // --------- API Response Messages --------- //
    INTERNAL_SERVER_ERROR_MESSSAGE: 'Internal Server Error',
    NO_DATA_FOUND_MESSAGE:'No Data Found',
    CONTRACT_IS_NOT_DEPLOYED_YET_MESSSAGE:'Please deploy contract first then invoke APIs',

    ITEM_HARVESTED_SUCCESSFULLY_MESSAGE: 'Item Harvested Successfully',
    ITEM_PROCESSED_SUCCESSFULLY_MESSAGE: 'Item Processed Successfully',
    ITEM_PACKAGED_SUCCESSFUULY_MESSAGE: 'Item Packaged Successfully',
    ITEM_SOLD_SUCCESSFULLY_MESSAGE: 'Item Sold Successfully',
    ITEM_BOUGHT_SUCCESSFULLY_MESSAGE: 'Item Bought Successfully',
    ITEM_SHIPPED_SUCCESSFULLY_MESSAGE: 'Item Shipped Successfully',
    ITEM_RECEIVED_SUCCESSFULLY_MESSAGE: 'Item Received Successfully',
    ITEM_PURCHASED_SUCCESSFULLY_MESSAGE: 'Item Purchased Successfully',

    CONTRACT_DEPLOYED_SUCCESSFULLY_MESSAGE: 'Contract Deployed Successfully',
    DETAILS_FETECHED_SUCCESSFULLTY_MESSAGE: 'Details Fetched Successfully',

    USER_TYPE_FARMER: 'farmer',
    USER_TYPE_DISTRIBUTOR: 'distributor',
    USER_TYPE_RETAILER: 'retailer',
    USER_TYPE_CONSUMER: 'consumer',
}