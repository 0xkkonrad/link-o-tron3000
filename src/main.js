// Data
// import { LOADING, contractAbi} from './data.js';
console.log(contractAbi[0]);

// console.log("INITIATING ALPINE");
// // Alpine:
// import Alpine from 'alpinejs'
// window.Alpine = Alpine
// Alpine.start()
// console.log('Alpine initiated in main.js');


// // ethers.js
// // const ethers = require("ethers");
// import { ethers } from "ethers";



// load idx and password params from url
var urlParams = new URLSearchParams(window.location.search);
var idx = urlParams.get('idx');
var password = urlParams.get('password');
var unlockDepositAmount = urlParams.get('unlockDepositAmount');
var chain = urlParams.get('chain');
console.log("URL PARAMS: idx: " + idx, "password: " + password + "chain: " + chain);
// if not empty, set fetchPassphrase and fetchDepositIdx in document
if (idx && password && unlockDepositAmount && chain) {
  document.getElementById("fetchPassphrase").value = password;
  document.getElementById("fetchDepositIndex").value = idx;
  document.getElementById("fetchUnlockDepositAmount").value = unlockDepositAmount;
  document.getElementById("fetchChain").value = chain;
  Alpine.store("gChain", chain);
  // set active tab to fetch

} else {
  Alpine.store("gChain", "tron-shasta");
}


// addresses
// mumbai, goerli, polygon main, ethereum main
var contract_addresses = {
  "tron-main": "TFuxvZ1ucftuWWJrcqyiYRANDXVLYAutu2",
  "tron-shasta": "TWMTQf2DjJb8QJpbasRxsY7oVfgis4RnMq",
};
var chainIds = {
};
var blockExplorers = {
  "tron-main": "https://tronscan.org/",
  "tron-shasta": "https://shasta.tronscan.org/",
};
Alpine.store("blockExplorers", blockExplorers);

Alpine.store("contractAddress", contract_addresses[Alpine.store("gChain")]);
Alpine.store("contractAbi", contractAbi); // defined in abi.js

// deposit
Alpine.store("depositButtonText", 'Stash');

// withdraw
Alpine.store("withdrawButtonText", 'Fetch');


// deposit Success
Alpine.store("depositSuccess", false);
Alpine.store("depositSuccessAmount", 0);
Alpine.store("depositSuccessIdx", 0);
Alpine.store("depositSuccessPassword", 0);
Alpine.store("depositSuccessTx", 0);
Alpine.store("depositSuccessLink", "");

// withdraw success
Alpine.store("withdrawSuccess", false);
Alpine.store("withdrawSuccessAmount", 0);
Alpine.store("withdrawSuccessTx", 0);
Alpine.store("withdrawSuccessLink", "");

// active tab
Alpine.store('activeTab', 0);


// global debugList variable
window.debugList = [];


//// Alpine Vars
// setting Alpine.js global variables. You can access these from anywhere
Alpine.store("connected", false);
Alpine.store("processingTransaction", false);


function getTronweb(){
  var obj = setInterval(async ()=>{
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
          clearInterval(obj)
          console.log("Tronweb is ready")
          console.log(window.tronWeb.defaultAddress.base58)
          return window.tronWeb
      }
  }, 10)
}


async function depositToContract() {

  // get depositAmount and depositPassword
  let depositAmount = document.getElementById("depositAmount").value;
  let depositPassword = document.getElementById("depositPassword").value;
  console.log("depositAmount: " + depositAmount, "depositPassword: " + depositPassword);


  // if depositAmount is 0 or empty, return
  if (depositAmount == 0 || depositAmount == "") {
    alert("Please enter a deposit amount");
    return;
  }
  // if depositPassword is empty, set one from random chars and display it on the page
  if (depositPassword == "") {
    depositPassword = Math.random().toString(36).slice(-259);
    document.getElementById("depositPassword").value = depositPassword;
  }
  // if unlockDepositAmount is empty, set it to 0
  var unlockDepositAmount = document.getElementById("unlockDepositAmount").value;
  if (unlockDepositAmount == "") {
    unlockDepositAmount = 0;
  }


  // call payable contrct function
  // depositEther(bytes32 _hashedPassword, uint256 _unlockDepositAmount)
  // var hashedPassword = ethers.utils.keccak256(depositPassword);

  var hashedPassword = ethers.utils.id(depositPassword);
  // var value = ethers.utils.parseEther(depositAmount);
  var value = window.tronWeb.toSun(depositAmount);
  
  var contractAddress = contract_addresses[Alpine.store("gChain")];
  var contractAbi = contractAbi;

  // use tronweb to call contract
  var tronWeb = window.tronWeb
  console.log("tronWeb: ", tronWeb)
  var contract = await tronWeb.contract().at(contractAddress);
  console.log("contract: ", contract);
  var result = await contract.depositEther(hashedPassword, value).send({
    shouldPollResponse: true,
    callValue: value,
  });
  console.log(result);
  
}


async function switchTogChain() {
  await addChain();
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  try {
    await provider.send("wallet_switchEthereumChain", [
      {
        chainId: "0x" + chainIds[Alpine.store("gChain")].toString(16),
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}


async function connect() {
  if (!window.ethereum) {
    alert("Please install a TRON compatible wallet to use this dApp!");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  console.log("Account:", await signer.getAddress());


  // switch to gChain network
  await switchTogChain();

  // if current network is not gChain, return
  if (await signer.getChainId() != chainIds[Alpine.store("gChain")]) {
    alert("Please switch to " + Alpine.store("gChain") + " network");
    return;
  }

  // set global variables
  Alpine.store("connected", true);
  Alpine.store("processingTransaction", false);
  // set chain
  let chainId = await provider.getNetwork().then((res) => res.chainId);
  let chain = Object.keys(chainIds).find((key) => chainIds[key] === chainId);
  Alpine.store("gChain", chain);
  // set account
  let account = await signer.getAddress();
  Alpine.store("account", account);
  console.log("Connected to " + chain + " with account " + account);
  // set contract address
  Alpine.store("contractAddress", contract_addresses[Alpine.store("gChain")]);
  // set contract
  contract = new ethers.Contract(
    Alpine.store("contractAddress"),
    Alpine.store("contractAbi"),
    signer
  );
}

async function deposit() {
  console.log(
    "%c deposit has been called",
    "font-size: 20px; background-color: purple; color: white;"
  );

  // connect if not connected
  if (!Alpine.store("connected")) {
    await connect();
  }

  // check if connected
  if (!Alpine.store("connected")) {
    return;
  }

  // ensure user is connected to correct network. If not, switch to correct network
  await switchTogChain();

  // get depositAmount and depositPassword
  let depositAmount = document.getElementById("depositAmount").value;
  let depositPassword = document.getElementById("depositPassword").value;
  console.log("depositAmount: " + depositAmount, "depositPassword: " + depositPassword);

  // if depositAmount is 0 or empty, return
  if (depositAmount == 0 || depositAmount == "") {
    alert("Please enter a deposit amount");
    return;
  }

  // if depositPassword is empty, set one from random chars and display it on the page
  if (depositPassword == "") {
    depositPassword = Math.random().toString(36).slice(-259);
    document.getElementById("depositPassword").value = depositPassword;
  }

  // if unlockDepositAmount is empty, set it to 0
  var unlockDepositAmount = document.getElementById("unlockDepositAmount").value;
  if (unlockDepositAmount == "") {
    unlockDepositAmount = 0;
  }

  // call payable contrct function
  // depositEther(bytes32 _hashedPassword, uint256 _unlockDepositAmount)
  try {
    // Alpine.store('depositButtonText', 'Stashing...');
    Alpine.store('depositButtonText', LOADING);
    // var hashedPassword = ethers.utils.keccak256(depositPassword);
    var hashedPassword = ethers.utils.id(depositPassword);
    var value = ethers.utils.parseEther(depositAmount);
    var tx = await contract.depositEther(hashedPassword, unlockDepositAmount, {
      value: value,
    });
    console.log("value: " + value, "hashedPassword: " + hashedPassword);
    // console.log("type of value: " + typeof value, "type of hashedPassword: " + typeof hashedPassword);
    console.log("tx: " + tx);
    // set processingTransaction to true
    Alpine.store("processingTransaction", true);
    // wait for tx to be mined
    const receipt = await tx.wait();
    debugList.push(receipt);
    // set processingTransaction to false
    Alpine.store("processingTransaction", false);
    // display success
    Alpine.store("depositSuccess", true);

    Alpine.store("depositSuccessAmount", depositAmount);

    // get deposit idx from receipt (function return value)
    // TODO: read up why tf this is not identical across chains
    if (Alpine.store("gChain") == "goerli") {
      var depositIdx = receipt.events[0].args[2]['_hex'];
      console.log("depositIdx: " + depositIdx);
    } else if (Alpine.store("gChain") == "polygon-main") {
      var depositIdx = receipt.events[1].args[2]['_hex'];
      console.log("depositIdx: " + depositIdx);
    } else if (Alpine.store("gChain") == "moonbeam") {
      var depositIdx = receipt.events[0].args[2]['_hex'];
      console.log("depositIdx: " + depositIdx);
    } else {
      var depositIdx = receipt.events[0].args[2]['_hex'];
      console.log("depositIdx: " + depositIdx);
    }


    // hex to decimal
    depositIdx = parseInt(depositIdx, 16);
    Alpine.store("depositSuccessIdx", depositIdx);
    Alpine.store("depositSuccessPassword", depositPassword);
    Alpine.store("depositSuccessTx", receipt.transactionHash);
    Alpine.store("depositSuccessTxLink", blockExplorers[Alpine.store("gChain")] + "tx/" + receipt.transactionHash);

    // generate with current url and params idx=depositIdx&password=depositPassword&unlockDepositAmount=unlockDepositAmount&chain=gChain
    let url = new URL(window.location.href);
    url.searchParams.set("idx", depositIdx);
    url.searchParams.set("password", depositPassword);
    url.searchParams.set("unlockDepositAmount", unlockDepositAmount);
    url.searchParams.set("chain", Alpine.store("gChain"));
    Alpine.store("depositSuccessLink", url.href);

  } catch (error) {
    console.log(error);
    // set processingTransaction to false
    Alpine.store("processingTransaction", false);
    // display error message
    alert("Deposit failed");
  }
}


var timeLockInitiated = false;
async function withdrawEtherPassword() {
  // 1. initiate timelock
  // call openEtherDepositWindow(uint256 _depositIdx) public payable {

  console.log(
    "%c fetch squirrel has been called",
    "font-size: 20px; background-color: purple; color: white;"
  );


  // set processingTransaction to true
  Alpine.store("processingTransaction", true);
  Alpine.store("withdrawButtonText", LOADING);

  // connect if not connected
  if (!Alpine.store("connected")) {
    await connect();
  }
  // check if connected
  if (!Alpine.store("connected")) {
    return;
  }

  // get depositIdx and depositPassword and unlockDepositAmount
  let depositIdx = document.getElementById("fetchDepositIndex").value;
  let depositPassword = document.getElementById("fetchPassphrase").value;
  let unlockDepositAmount = document.getElementById("fetchUnlockDepositAmount").value;
  console.log("depositIdx: " + depositIdx, "depositPassword: " + depositPassword, "unlockDepositAmount: " + unlockDepositAmount);

  // if depositIdx is 0 or empty, return
  if (depositIdx == "") {
    alert("Please enter a deposit index");
    return;
  }

  // if depositPassword is empty, return
  if (depositPassword == "") {
    alert("Please enter a passphrase");
    return;
  }

  // if unlockDepositAmount is empty, set it to 0
  if (unlockDepositAmount == "") {
    unlockDepositAmount = 0;
  }

  // call payable contract function to lock the deposit
  // openEtherDepositWindow(uint256 _depositIdx)
  try {
    // Alpine.store('fetchButtonText', 'Fetching...');
    Alpine.store('fetchButtonText', LOADING);
    value = ethers.utils.parseEther(unlockDepositAmount);
    var tx = await contract.openEtherDepositWindow(depositIdx, {
      value: value,
    });
    const receipt1 = await tx.wait();
    debugList.push(receipt1);

    // after timelock window has been initiated, now submit password

    // 2. submit password 
    // call withdrawEtherPassword(uint256 _depositIdx, string memory _password)

    var tx = await contract.withdrawEtherPassword(depositIdx, depositPassword);
    const receipt2 = await tx.wait();
    debugList.push(receipt2);
    // set processingTransaction to false
    Alpine.store("processingTransaction", false);

    // SUCCESS!
    Alpine.store("withdrawSuccess", true);
    // let withdrawAmount = receipt2.events[0].args[1]['_hex'];
    // hex to decimal
    // withdrawAmount = parseInt(withdrawAmount, 16);
    // withdrawAmount = ethers.utils.formatEther(withdrawAmount);
    // Alpine.store("withdrawSuccessAmount", withdrawAmount);
    Alpine.store("withdrawSuccessTx", receipt2.transactionHash);
    // create a link to block explorer
    let blockUrl = blockExplorers[Alpine.store("gChain")] + "tx/" + receipt2.transactionHash;
    Alpine.store("withdrawSuccessLink", blockUrl);
    Alpine.store('withdrawButtonText', 'wagmi');
  }
  catch (error) {
    console.log(error);
    // set processingTransaction to false
    Alpine.store("processingTransaction", false);
    Alpine.store("withdrawButtonText", "Fetch");
    // display error message
    alert("Fetch failed");
    return;
  }
}
