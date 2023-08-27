const { Observable } = require('rxjs');
const { getContract } = require('../smartcontract/utils/utils');
const logger = require('./logger'); 

function getCID() {
    return new Observable(observer => {
        getContract().then(contract => {
            contract.on("DataEvent", (sender, timestamp, ipfsCID) => {
                logger.info(`Received CID: ${ipfsCID} from sender: ${sender} at timestamp: ${timestamp}`);
                observer.next(ipfsCID); // Send the CID to the observer every time the event fires
            });
        }).catch(error => {
            logger.error(`Error getting contract in getCID function: ${error}`);
        });
    });
}

function getTimestampFromBlockchain() {
    return new Observable(observer => {
        getContract().then(contract => {
            contract.on("DataEvent", (sender, timestamp, ipfsCID) => {
                logger.info(`Received timestamp: ${timestamp} for CID: ${ipfsCID} from sender: ${sender}`);
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
