const EcoVoting = artifacts.require("EcoVoting");

module.exports = function (deployer) {
    deployer.deploy(EcoVoting);
};