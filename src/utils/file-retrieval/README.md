# Bitswap retrieval using lassie

This script, `server.js`, executes two separate binary files, `lassie` and `car`, to perform operations on content identified by a CID (Content Identifier) of IPFS files uploaded using the **Bitswap protocol**. It fetches content using `lassie` and then extracts it using `car`.

## Prerequisites

- Node.js installed on your machine.

## Installation

1. Clone the repository or download the script file.
    ```shell
    git clone https://github.com/lighthouse-web3/file-retrieval.git
    ```
2. Install the required dependencies by running the following command in the project directory:
    ```shell
    npm install
    ```
## Usage
1. Open a terminal or command prompt.
2. Navigate to the project directory.
3. Run the server with the following command:
    ```shell
    node server.js <CID>
    ```
    _Replace <CID> with the desired CID (Content Identifier) for the content you want to fetch and extract._
4. The server will execute the lassie binary to fetch the content specified by the CID.
5. Once the fetch operation is completed, the script will execute the car binary to extract the fetched content.
6. The extracted content will be saved in the extracted directory within the same directory.

## Additional Notes
* The script captures the standard output (stdout) and standard error (stderr) of the executed binaries and logs any errors or relevant information to the console. Additionally, the stderr output is saved to a file named `stderr.log` in the `err` directory within the script's directory. Saving the stderr output to a file can be helpful for debugging and error analysis.
    ```javascript
    stderrStream.on('error', (streamError) => {
    console.error(`Error writing to stderr stream: ${streamError}`);
    });

    stderrStream.on('finish', () => {
    console.error('Standard Error saved to:', stderrFilePath);
    });
    ```
The code above demonstrates how the stderr output is captured and saved to the `stderr.log` file. The `stderrStream` is a writable stream that writes the stderr output to the file. The `on('error')` event handler logs any errors that occur during the writing process, and the `on('finish')` event handler indicates when the writing process is completed. This provides a convenient way to access and review any error messages or relevant information that might have been printed to the stderr output.

