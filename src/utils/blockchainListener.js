const { Observable } = require('rxjs');
const { getContract } = require('../smartcontract/utils/utils');
const logger = require('./logger');

/**
 * Listens for the DataStored event and provides the IPFS CID to the observer.
 */
function getCID() {
    return new Observable(observer => {
        getContract().then(contract => {
            contract.on("DataStored", (timestamp, cid) => {
                logger.info(`Received CID: ${cid} at timestamp: ${timestamp}`);
                observer.next(cid); // Send the CID to the observer every time the event fires
            });
        }).catch(error => {
            logger.error(`Error getting contract in getCID function: ${error}`);
        });
    });
}

/**
 * Listens for the DataStored event and provides the timestamp to the observer.
 */
function getTimestampFromBlockchain() {
    return new Observable(observer => {
        getContract().then(contract => {
            contract.on("DataStored", (timestamp, cid) => {
                logger.info(`Received timestamp: ${timestamp} for CID: ${cid}`);
                observer.next(timestamp); // Send the timestamp to the observer every time the event fires
            });
        }).catch(error => {
            logger.error(`Error getting contract in getTimestampFromBlockchain function: ${error}`);
        });
    });
}

module.exports = {
    getTimestampFromBlockchain,
    getCID
};
