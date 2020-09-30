const path = require('path');
const fs = require('fs');
const solc = require('solc');

const ERC20Path = path.resolve(__dirname, 'contracts', 'ERC20.sol');
const source = fs.readFileSync(ERC20Path, 'utf8');
var input = {
  language: 'Solidity',
  sources: {
    'ERC20.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['ERC20.sol']['erc20Token'];
