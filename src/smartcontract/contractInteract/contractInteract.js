const { ethers, InfuraProvider } = require('ethers');
const { abi } = require("../builds/compiledContract.json")
const config = require("../../../config");

const contractAddress = config.contractAddress; // Replace with the deployed contract address
const privateKey = config.privateKey; // Replace with the private key of your Ethereum wallet
const infuraProjectId = config.infuraProjectId; // Replace with your Infura project ID
const infuraAPISecret = config.infuraAPISecret;

const provider = new InfuraProvider("goerli", infuraProjectId, infuraAPISecret);
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, signer);


// Listen for the DataEvent
contract.on("DataEvent", (sender, timestamp, ipfsCID, event) => {
    console.log('Data Event Received!');
    console.log('Sender:', sender);
    console.log('Timestamp:', timestamp.toString());
    console.log('IPFS CID:', ipfsCID);
    
    // Perform further processing as needed
});

console.log('Listening for DataEvent...');

