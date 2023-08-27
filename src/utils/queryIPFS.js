const { retrieveAndExtractFile } = require('./file-retrieval/file-retrieval');
const { getCID } = require('./blockchainListener');
const logger = require('./logger'); 

const getData = async () => {
    getCID().subscribe(ipfsCID => {
        logger.info(`Received IPFS CID: ${ipfsCID}`);
        retrieveAndExtractFile(ipfsCID).then(() => {
            logger.info(`Data retrieved and extracted for CID: ${ipfsCID}`);
        }).catch(err => {
            logger.error(`Error retrieving and extracting data for CID ${ipfsCID}: ${err}`);
        });
    });
}

module.exports = {
    getData
};
