# Utilities

This directory contains utility modules that perform various tasks required by the `StakeholderComputer` project.

## 1. `file-retrieval/file-retrieval.js`

This module provides functionalities to:
- Create necessary directories.
- Execute binaries (`lassie` and `car`).
- Retrieve and extract files based on a given CID (Content Identifier).

Key Binaries:
- **LASSIE**: Fetches data from IPFS.
- **CAR**: Helps with the Content Archive (`.car`) files, facilitating data extraction.

Errors and logs are written to an `stderr.log` file located in the `err` directory.

*For mode indepth details you can refer to [file-retrieval README](./file-retrieval/README.md)*

## 2. `blockchainListener.js`

This module helps in listening to blockchain events. The main functionalities include:
- Retrieving CIDs (Content Identifiers) from blockchain events.
- Retrieving timestamps associated with a specific CID from blockchain events.

It observes blockchain events, especially those linked to the `DataEvent` emitted from the smart contract.

## 3. `dataVerification.js`

The purpose of this module is to verify the authenticity of data. It combines two observables, CID, and Timestamp, to:
- Retrieve and extract files.
- Verify if the file's name contains the correct timestamp.
  
Timestamps from filenames are extracted using regular expressions and then matched against the blockchain's timestamp.

## 4. `logger.js`

This module sets up a custom logger for the system using the `winston` library. The logger:
- Provides timestamped logs in a readable format.
- Writes error logs to `error.log`.
- Writes combined logs (info, warnings, errors) to `combined.log`.

The logs are stored in the `logfiles` directory located at the project's root.

## 5. `queryIPFS.js`

This module's main function, `getData`, is responsible for:
- Receiving an IPFS CID (Content Identifier).
- Retrieving and extracting relevant data associated with the CID.

The retrieval process uses functionalities from the `file-retrieval` module.

---

**Note**: Many of these utilities have interdependencies, which means they might call functions from other utility modules. For instance, the data verification process uses the blockchain listener to get CIDs and timestamps. Always ensure that you understand these interconnections before making changes to any module.
