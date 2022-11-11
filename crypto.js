
// Button Contents
var LOADING = `<div role="status"> <svg class="inline mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg> <span class="text-lg">Processing...</span><span class="sr-only">Loading...</span> </div>`;
var contractAbi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "message", "type": "string" }], "name": "Celebration", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "depositIdx", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "unlockDepositAmount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "depositIdx", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "_depositIdx", "type": "uint256" }, { "internalType": "string", "name": "_password", "type": "string" }], "name": "checkPassword", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_hashedPassword", "type": "bytes32" }, { "internalType": "uint256", "name": "_unlockDepositAmount", "type": "uint256" }], "name": "depositEther", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "deposits", "outputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "blockNumber", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "bytes32", "name": "hashedPassword", "type": "bytes32" }, { "internalType": "uint256", "name": "unlockDepositAmount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_depositIdx", "type": "uint256" }], "name": "getDeposit", "outputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getDepositCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_sender", "type": "address" }], "name": "getEtherDepositsSent", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_depositIdx", "type": "uint256" }], "name": "getPasswordHash", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_string", "type": "string" }], "name": "hashString", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_depositIdx", "type": "uint256" }], "name": "openEtherDepositWindow", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_depositIdx", "type": "uint256" }, { "internalType": "string", "name": "_password", "type": "string" }], "name": "withdrawEtherPassword", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_depositIdx", "type": "uint256" }], "name": "withdrawEtherSender", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]


// load idx and password params from url
var urlParams = new URLSearchParams(window.location.search);
var idx = urlParams.get('idx');
var password = urlParams.get('password');
var unlockDepositAmount = urlParams.get('unlockDepositAmount');
var chain = urlParams.get('chain');
console.log("idx: " + idx, "password: " + password);
// if not empty, set fetchPassphrase and fetchDepositIdx in document
if (idx && password && unlockDepositAmount && chain) {
  document.getElementById("fetchPassphrase").value = password;
  document.getElementById("fetchDepositIndex").value = idx;
  document.getElementById("fetchUnlockDepositAmount").value = unlockDepositAmount;
  document.getElementById("fetchChain").value = chain;
  Alpine.store("gChain", chain);
  // set active tab to fetch

} else {
  Alpine.store("gChain", "polygon-main");
}


// addresses
// mumbai, goerli, polygon main, ethereum main
// Alpine.store("gChain", "polygon-main");
var contract_addresses = {
  "eth-main": "",
  goerli: "0x2e0092beE1fF5902278D64d4E760920C6Fd10974",
  mumbai: "",
  "polygon-main": "0xc5A2A997b6D370383b2fA1254939DbA2A73aBa8C",
  optimism: "0x8d1a17a3a4504aeb17515645ba8098f1d75237f7",
  moonbeam: "0x897F8EDdB345F0d16081615823F76055Ad60A00c",
};
var chainIds = {
  "eth-main": 1,
  goerli: 5,
  mumbai: 80001,
  "polygon-main": 137,
  optimism: 10,
  moonbeam: 1284,
};
var blockExplorers = {
  "eth-main": "https://etherscan.io/",
  goerli: "https://goerli.etherscan.io/",
  mumbai: "https://mumbai.polygonscan.com/",
  "polygon-main": "https://polygonscan.com/",
  optimism: "https://optimistic.etherscan.io/",
  moonbeam: "https://moonscan.io/",
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




//// Alpine Vars
// setting Alpine.js global variables. You can access these from anywhere
Alpine.store("connected", false);
Alpine.store("processingTransaction", false);

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

async function addChain() {
  console.log('adding chain');
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    if (Alpine.store("gChain") == "polygon-main") {
      await provider.send("wallet_addEthereumChain", [
        {
          chainId: "0x" + chainIds[Alpine.store("gChain")].toString(16),
          chainName: "Polygon Mainnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
          blockExplorerUrls: ["https://polygonscan.com/"],
        },
      ]);
      console.log('added chain' + Alpine.store("gChain"));
    } else if (Alpine.store("gChain") == "goerli") {
      await provider.send("wallet_addEthereumChain", [
        {
          chainId: "0x" + chainIds[Alpine.store("gChain")].toString(16),
          chainName: "Goerli Testnet",
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: ["https://rpc.goerli.mudit.blog/"],
          blockExplorerUrls: ["https://goerli.etherscan.io/"],
        },
      ]);
      console.log('added chain' + Alpine.store("gChain"));
    } else if (Alpine.store("gChain") == "optimism") {
      await provider.send("wallet_addEthereumChain", [
        {
          chainId: "0x" + chainIds[Alpine.store("gChain")].toString(16),
          chainName: "Optimism",
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: ["https://mainnet.optimism.io/"],
          blockExplorerUrls: ["https://optimistic.etherscan.io/"],
        },
      ]);
      console.log('added chain' + Alpine.store("gChain"));
    } else if (Alpine.store("gChain") == "moonbeam") {
      await provider.send("wallet_addEthereumChain", [
        {
          chainId: "0x" + chainIds[Alpine.store("gChain")].toString(16),
          chainName: "Moonbeam",
          nativeCurrency: {
            name: "GLMR",
            symbol: "GLMR",
            decimals: 18,
          },
          rpcUrls: ["https://rpc.api.moonbeam.network"],
          blockExplorerUrls: ["https://moonscan.io/"],
        },
      ]);
      console.log('added chain' + Alpine.store("gChain"));
    } else {
      alert("Chain not supported");
    }
  } catch (error) {
    console.log(error);
  }
}

async function connect() {
  if (!window.ethereum) {
    alert("Please install MetaMask to use this dApp!");
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

debugList = [];

async function deposit() {
  console.log(
    "%c deposit squirrel has been called",
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
