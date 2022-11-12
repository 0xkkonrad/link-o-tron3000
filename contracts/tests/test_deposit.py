import pytest
import brownie
from brownie import network, convert, chain, accounts, TwoPhasedEscrow
from scripts.helpful_scripts import get_account

import sha3

for account in accounts:
    print(f"account balance: {account.balance() / 10**18}, address: {account}")

@pytest.fixture
def contract():

    # print balance of accounts[0] in ether
    for account in accounts:
        print(f"account balance: {account.balance() / 10**18}, address: {account}")
    
    current_network = network.show_active()
    print(f"current network: {current_network}")

    return TwoPhasedEscrow.deploy({"from": accounts[0]})


def test_depositEther(contract):
    if network.show_active() not in ["development"] or "fork" in network.show_active():
        pytest.skip("Only for local testing")

    ## Inputs
    # Test a deposit with a value of 1 ether, a hashed password, and a deposit unlock amount of 0.01 ether
    pwd = "password"
    # keccak256 hash of password
    hashed_pwd = sha3.keccak_256(pwd.encode()).hexdigest()
    # convert to bytes32
    hashedPassword = convert.to_bytes(hashed_pwd)
    depositAmount = brownie.web3.toWei(0.1, "ether")
    unlockDepositAmount = brownie.web3.toWei(0.01, "ether")

    # TX
    tx = contract.depositEther(hashedPassword, unlockDepositAmount, {"from": accounts[0], "value": depositAmount})
    # get return value
    tx.wait(1)

    # Assertions
    depositIdx = tx.return_value
    assert depositIdx == 0
    print(f"depositIdx: {depositIdx}")

    # struct deposit{
    #     address sender;
    #     uint256 amount;
    #     uint256 blockNumber;
    #     address recipient;
    #     bytes32 hashedPassword;
    #     uint256 unlockDepositAmount;
    # }
    # Check that the deposit was made
    deposit = contract.deposits(depositIdx)
    print(f"deposit: {deposit}")
    assert deposit[0] == accounts[0]
    assert deposit[1] == depositAmount
    assert deposit[4] == brownie.web3.toHex(hashedPassword)
    assert deposit[5] == unlockDepositAmount

    # check that the contract balance is correct
    assert contract.balance() == depositAmount
    
    # check the number of deposits is correct
    assert contract.getDepositCount() == 1


def testMultipleDeposits(contract):

    # make multiple deposits and check contract balance and check that the number of deposits is correct
    if network.show_active() not in ["development"] or "fork" in network.show_active():
        pytest.skip("Only for local testing")
    

    ## Inputs
    # Test a deposit with a value of 1 ether, a hashed password, and a deposit unlock amount of 0.01 ether
    pwd = "password"
    # keccak256 hash of password
    hashed_pwd = sha3.keccak_256(pwd.encode()).hexdigest()
    # convert to bytes32
    hashedPassword = convert.to_bytes(hashed_pwd)
    depositAmount = brownie.web3.toWei(0.1, "ether")
    unlockDepositAmount = brownie.web3.toWei(0.01, "ether")
    numDeposits = 10

    # TX
    for i in range(numDeposits):
        tx = contract.depositEther(hashedPassword, unlockDepositAmount, {"from": accounts[0], "value": depositAmount})
        # get return value
        tx.wait(1)

    # Assertions
    # check that the contract balance is correct
    assert contract.balance() == numDeposits * depositAmount
    
    # check the number of deposits is correct
    assert contract.getDepositCount() == numDeposits


