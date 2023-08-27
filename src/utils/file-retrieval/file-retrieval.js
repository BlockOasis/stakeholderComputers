const { execFile } = require("child_process");
const fs = require("fs");
const path = require("path");

const LASSIE_BINARY_PATH = "src/utils/file-retrieval/binaries/lassie";
const CAR_BINARY_PATH = "src/utils/file-retrieval/binaries/car";
const STDERR_DIR_PATH = "src/utils/file-retrieval/err";

// Assuming you have a logger set up similarly to before:
const logger = require('../logger'); 

async function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function executeBinary(binaryPath, args, stderrFilePath) {
  return new Promise((resolve, reject) => {
    const options = {
      stdio: ["inherit", "pipe", "pipe"],
      maxBuffer: Infinity,
    };

    const child = execFile(binaryPath, args, options, (error, stdout) => {
      if (error) {
        const errorMsg = `Error executing binary: ${error}`;
        logger.error(errorMsg);
        reject(errorMsg);
        return;
      }
      resolve(stdout.trim());
    });

    if (stderrFilePath) {
      const stderrStream = fs.createWriteStream(stderrFilePath);
      child.stderr.pipe(stderrStream);
    }
  });
}

async function retrieveAndExtractFile(cid) {
  await createDirectory(STDERR_DIR_PATH);

  const stderrFilePath = path.join(STDERR_DIR_PATH, "stderr.log");
  const lassieArgs = ["fetch", "-vv", cid];
  await executeBinary(LASSIE_BINARY_PATH, lassieArgs, stderrFilePath);

  const cidDirectory = path.join("src/utils/downloads", cid);
  await createDirectory(cidDirectory);

  const fileName = cid.includes("/")
    ? `${cid.split("/")[0]}.car`
    : `${cid}.car`;
  const carFilePath = path.join("./", fileName);

  // Check if car file exists before extracting
  if (fs.existsSync(carFilePath)) {
    const carBinaryArgs = ["extract", "-f", carFilePath, cidDirectory];
    await executeBinary(CAR_BINARY_PATH, carBinaryArgs, stderrFilePath);
  } else {
    logger.error(`.car file ${carFilePath} does not exist!`);
    return [];
  }

  // Delete the .car file after extraction
  if (fs.existsSync(carFilePath)) {
    try {
      fs.unlinkSync(carFilePath);
    } catch (err) {
      logger.warn(`Failed to delete .car file at ${carFilePath}. Reason: ${err.message}`);
    }
  }

  const cidDirectoryFiles = fs.readdirSync(cidDirectory);
  let allContents = [];
  for (const file of cidDirectoryFiles) {
    const filePath = path.join(cidDirectory, file);
    const content = fs.readFileSync(filePath, "utf-8");
    allContents.push({ fileName: file, content: content });
  }

  return allContents;
}

// Existing code remains the same

module.exports = {
  retrieveAndExtractFile,
};
