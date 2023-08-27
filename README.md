# StakeholderComputer Project

This repository contains the entire system for the `StakeholderComputer` project, which uses blockchain and IPFS for data storage and verification.

## Data Flow Diagrams

To give a visual representation of the data flow in the StakeholderComputer project, refer to the following diagrams:

- **Level 0 DFD:** ![Stakeholder Computer Level 0 DFD](https://github.com/BlockOasis/dataFlowDiagrams/blob/main/stakeholder-computer-level-0.svg)

- **Level 1 DFD:** ![Stakeholder Computer Level 1 DFD](https://github.com/BlockOasis/dataFlowDiagrams/blob/main/stakeholder-computer-level-1.svg)

## File System Structure

```
.
├── config.js
├── config.json
├── Dockerfile
├── logfiles
│   ├── combined.log
│   └── error.log
├── package.json
├── README.md
└── src
    ├── server.js
    ├── smartcontract
    │   ├── builds
    │   │   └── compiledContract.json
    │   ├── contractInteract
    │   │   └── contractInteract.js
    │   ├── contracts
    │   │   └── BlockOasisAggregator.sol
    │   ├── README.md
    │   ├── scripts
    │   │   └── compile.js
    │   └── utils
    │       └── utils.js
    └── utils
        ├── blockchainListener.js
        ├── dataVerification.js
        ├── downloads
        │   └── QmS4WX3S6D7HePgUtF9uPBQoCoAyyErkddT5PVDYD4U7MC
        │       └── chunk-1693175358377.csv
        ├── file-retrieval
        │   ├── binaries
        │   │   ├── car
        │   │   └── lassie
        │   ├── err
        │   │   └── stderr.log
        │   ├── extracted
        │   ├── file-retrieval.js
        │   ├── package.json
        │   └── README.md
        ├── logger.js
        └── queryIPFS.js
```

## Directories and Key Files Explanation:

1. **`config.js` and `config.json`**: Configuration files, possibly storing settings, keys, or other information required by the project.

2. **`Dockerfile`**: Contains the setup instructions to Dockerize the project.

3. **`logfiles`**: Directory containing logs. These logs (`combined.log` and `error.log`) provide details on system operations and errors.

4. **`src`**: Source code directory.

    - **`server.js`**: The main entry point of the application.
    - **`smartcontract`**: Directory containing everything related to the smart contract. This includes the solidity contract itself, utilities for interacting with the contract, and a compilation script.
    
        *For more details, refer to its internal [README](./src/smartcontract/README.md).*
    
    - **`utils`**: Contains utility scripts and files essential for the system's functioning:
        - **`blockchainListener.js`**: Listens to blockchain events and retrieves data.
        - **`dataVerification.js`**: Verifies the data coming from the blockchain.
        - **`file-retrieval`**: Contains scripts and binaries related to file retrieval from IPFS.
            - *For more details, refer to its internal [README](./src/utils/file-retrieval/README.md).*
        - **`logger.js`**: Logging utility for the project.
        - **`queryIPFS.js`**: Contains utilities for querying IPFS.

        *For more details, refer to its internal [README](./src/utils/README.md).*

5. **`package.json` and `package-lock.json`**: Standard Node.js files containing metadata about the project, its dependencies, and other configurations.

## Running the Project:

To run the StakeholderComputer project:

1. Ensure you have Node.js and npm installed.
2. Navigate to the root directory of the project.
3. Install dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   npm start
   ```

5. For more specific functionalities, such as testing or interacting with specific parts of the system, refer to the appropriate README files within subdirectories (e.g., `smartcontract/README.md` for details on the smart contract).

## Dockerizing the Project:
If you'd like to run the `StakeholderComputer` project inside a Docker container, follow these steps:

1. Ensure you have Docker installed on your machine.

2. Navigate to the root directory of the project and build the Docker image:
    ```bash
    docker build -t stakeholdercomputer .
    ```

3. Run the Docker container:
    ```bash
    docker run -p 3000:3000 stakeholdercomputer
    ```


Note: Adjust the port numbers if your application uses a different port.

## Dependencies:

The project relies on several Node.js libraries, including `axios`, `ethers`, `fs`, `path`, `rxjs`, `solc`, and `winston`. The specific versions of these dependencies are detailed in `package.json`.

## Note:

Please ensure you have the necessary environment and tools installed and correctly configured. Always remember to handle sensitive information, such as private keys, securely. Avoid pushing sensitive data to public repositories.
