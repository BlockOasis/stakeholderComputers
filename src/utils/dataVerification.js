const { combineLatest } = require('rxjs');
const { retrieveAndExtractFile } = require('./file-retrieval/file-retrieval');
const { getCID, getTimestampFromBlockchain } = require('./blockchainListener');
const logger = require('./logger');

const extractTimestampFromFilename = filename => {
    const regex = /chunk-(\d+)\.csv/;
    const match = filename.match(regex);
    return match ? BigInt(match[1]) : null;
};

function getVerifiedData() {
    // Combining the two observables
    combineLatest([getCID(), getTimestampFromBlockchain()]).subscribe(([ipfsCID, timestamp]) => {
        logger.info(`Received IPFS CID: ${ipfsCID} and Timestamp: ${timestamp}`);
        retrieveAndExtractFile(ipfsCID).then(files => {
            for (const file of files) {
                const extractedTimestamp = extractTimestampFromFilename(file.fileName);

                if (extractedTimestamp && extractedTimestamp === timestamp) {
                    logger.info(`Verified File Name: ${file.fileName}`);
                    logger.info(`Content: ${file.content}`);
                } else {
                    logger.warn('Timestamp mismatch or invalid filename format!');
                }
            }
        }).catch(err => {
            logger.error(`Error retrieving and extracting file: ${err}`);
        });
    });
}

module.exports = {
    getVerifiedData
};