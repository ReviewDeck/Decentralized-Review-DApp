const SimpleStorage = artifacts.require('./web-app/src/contracts/SimpleStorage.sol')
const ReviewSystem = artifacts.require('./web-app/src/contracts/ReviewSystem.sol')

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage)
  deployer.deploy(ReviewSystem)
}
