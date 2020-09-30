const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
  //12 Phase,
  //Network Info
);

const web3 = new Web3(provider);
let tokenName = "TestCoinA";
let decimals = 8;
let symbol = "TCA";
let totalSupply = 100000;

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: [totalSupply, tokenName, symbol, decimals]
    })
    .send({
   		from: accounts[0],
     	gas: '10000000',
    	gasPrice: '30' });

  console.log('Contract deployed to', result.options.address);
  console.log(abi);
};
deploy();
