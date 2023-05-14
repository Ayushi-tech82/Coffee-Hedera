//imports
let constants = require('../constants/constants');
let helper = require('../helper/helper');
const localStorage = require("localStorage");

//=======================================================================================================
// deployContract
//=======================================================================================================
module.exports.deployContract = async function (req, res) {
    console.info('------------ controller --> deployContract STARTED -----------');
    let { userType } = req.body;

    try {
        let contractId = await helper.deployContract(userType);
        localStorage.setItem('contractId', contractId);

        return res.status(constants.RES_CODE_OK).json({ code: constants.RES_CODE_OK, success: true, message: constants.CONTRACT_DEPLOYED_SUCCESSFULLY_MESSAGE, contractId: contractId.toString() });
    } catch (error) {
        console.error(`Failed to deploy contract: ${error}`);
        return res.status(constants.RES_CODE_INTERNAL_SERVER_ERROR).json({ code: constants.RES_CODE_INTERNAL_SERVER_ERROR, success: false, message: constants.INTERNAL_SERVER_ERROR_MESSSAGE });
    }
}