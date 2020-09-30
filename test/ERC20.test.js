const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile');

let accounts;
let erc20;
let tokenName = "TestCoinA";
let decimals = 8;
let symbol = "TCA";
let totalSupply = 100000;

beforeEach(async () => {
  console.log(abi,evm)
  accounts = await web3.eth.getAccounts();

  erc20 = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: [totalSupply, tokenName, symbol, decimals]
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('erc20', () => {
  it('Deploys a contract', () => {
    assert.ok(erc20.options.address);
  });
  it('Contract Name: ' + tokenName,async () => {
    const TokenName = await erc20.methods.name().call({
      from: accounts[0]
    });
    assert.equal(TokenName, tokenName);
  });
  it('Contract Decimals: ' + decimals,async () => {
    const TokenDecimals = await erc20.methods.decimals().call({
      from: accounts[0]
    });
    assert.equal(TokenDecimals, decimals);
  });
  it('Contract Symbol: ' + symbol,async () => {
    const TokenSymbol = await erc20.methods.symbol().call({
      from: accounts[0]
    });
    assert.equal(TokenSymbol, symbol);
  });
  it('Contract Total Supply: ' + totalSupply,async () => {
    const TokenTotalSupply = await erc20.methods.totalSupply().call({
      from: accounts[0]
    });
    assert.equal(TokenTotalSupply, totalSupply);
  });
  it('Check Balance',async () => {
    const ownerBalance = await erc20.methods.balanceOf(accounts[0]).call({
      from: accounts[0]
    });
    assert(ownerBalance > 0);
  });
});
