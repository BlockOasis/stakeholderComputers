const { getVerifiedData } = require('./utils/dataVerification')

async function main() {
  try {
    getVerifiedData()
  } catch (error) {
    console.error('Error:', error);
  }
}
main();