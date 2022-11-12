// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//////////////////////////////////////////////////////////////////////////////////////
// @title   link-o-tron300
// @version 1.0
// @author  H & K
// @dev     This contract is used to send non front-runnable link payments
//          to a recipient address. The recipient address can be arbitrary
//          and is only revealed after claiming the payment.
//          The claimer first locks a deposit for a 100 block timewindow, then
//          has to submit the recipient address and the password to claim the
//          deposit.
//          Sender also has option to withdraw funds at any time, as well as
//          setting a dynamic refundable deposit for the claimer to initate
//          the claim process, to protect against DoS attacks.

// @dev     more from the authors: 
//          https://hugomontenegro.com  https://konradurban.com
//          
//          UNSTOPPABLE APPS FTW!
//////////////////////////////////////////////////////////////////////////////////////
//
// ........'''''.      ..'',,,,,,,,,;;;;;;;;;;;;;;;;;;;;;;;;;;,..                ..';:cc::;,..           .;;;;,                   .''''''.'
// ,:'........,dc    ,loc;;;,,,,,,,,,,,;;;;;;;;;;;;;;;;;;;;;;;cod1'           'codlc:,,,,;:loxxc'      ..xx;;;dd.                 cx,....,o'
// ,c.        .x:  ,ol'...                                      .,oo'      .:ol,.           ..':xkl.   ..kk. ..ckl.               cO.    'o'
// ;l.        .kc cx:..     .......................................;d,   .cd:.        ...       .'oO1. .'kk.   .'lkc.             lO.    'd'
// .;,,,,,,,,;;c;'ko..   ;ddllllllllooooooooooodddddddddddddddddddxxdo. .dc.     .,:oodddxdl;.    .;kO,.'Ok.    ..'dk:.           lO.    'd'
//               ,x: .   .kd............................................ol.     ,dl,......'ckOc.....,OO''OO.      ..;xx'          l0.    .d'
//               ,kc .   .ko..   ....,kdlclllxd'.:kdooodddddddddddddxx':x...  .lo............1Kx.....;0d'OO.        ..cko. .......o0.    ,d'
//               ,kc .   .kd..  .....:Kd.....O0,.oK;...............:kc.dc.....ck'.............1Xc.....k0,OO.          .,Ox,xc'''',':.    ,x'
//               ,k: .   .kd..    ...:0d.....O0,.oK;.............;dd,..d:.....lO..............cKc.....x0,0O.    .......;0x;0:            ,x'
//               ,k: .    kd..      .;0d.....O0,.,kd,.....':::cloc'....co.    ,ko............,OO.....,0x'0O.  ..ox:,,'';:''dx;           ,x,
//               ,x:      ko..       ;0d.....O0'...ckd;.....'oxc........o,     .ox;.........1Ox......xK;,OO.  ..oO,       ..;xd.         ,x,
//               ,x:      xo..       ;0o.   .k0'.....:xo,.....'ld;......'o'.    .'colc::cldd1'    ..xK:.'OO.  ..oO,          .cxc.       ,x'
//               ,x;      xo..       ;Oo.   .k0'.     .;dd;.    .:o;.    .lc.       .......      .;Ox' .'OO.  ..lO,            .cd;      ,x'
//               ,x;      xl .       ,Oo.   .k0'.       .,od;,    .:dc.    'cc'.              .'lkk;   .'Ok.  ..lO,              .ld;    ,d'
//               ,d;      xl .       ,kl.   .xO..          'dd;.    .:o:.    .;ll;'........':okxc.     .'kk.  ..lk,               .'oo.  ,d,
//               .c;;''',;,          .oo::cccl:.             'ldigitalllc.      ..,;:ccllllc:'.         .:c:::::ll.                 .,,',,c.
//
//////////////////////////////////////////////////////////////////////////////////////

// imports
import "@openzeppelin/contracts/utils/Strings.sol";

contract LinkoTron3000 {
    struct deposit {
        address sender;
        uint256 amount;
        uint256 blockNumber;
        address recipient;
        bytes32 hashedPassword;
        uint256 unlockDepositAmount;
    }

    deposit[] public deposits; // array of deposits

    // events
    event Deposit(
        address indexed sender,
        uint256 amount,
        uint256 depositIdx,
        uint256 unlockDepositAmount
    );
    event Withdraw(
        address indexed recipient,
        uint256 amount,
        uint256 depositIdx
    );

    event Celebration(string message);

    // constructor
    constructor() {
        emit Celebration("LinkoTron3000 ENGAGED AND READY FOR ACTION");
    }

    // deposit ether to escrow with a hashed password & get deposit index
    function depositEther(bytes32 _hashedPassword, uint256 _unlockDepositAmount)
        public
        payable
        returns (uint256)
    {
        require(msg.value > 0, "deposit must be greater than 0");

        // store new deposit
        deposits.push(
            deposit(
                msg.sender,
                msg.value,
                0,
                address(0),
                _hashedPassword,
                _unlockDepositAmount
            )
        );
        emit Deposit(
            msg.sender,
            msg.value,
            deposits.length - 1,
            _unlockDepositAmount
        );
        return deposits.length - 1;
    }

    // sender can always withdraw deposited assets at any time
    function withdrawEtherSender(uint256 _depositIdx) public {
        require(
            deposits[_depositIdx].sender == msg.sender,
            "only sender can withdraw this deposit"
        );

        // transfer ether back to sender
        payable(msg.sender).transfer(deposits[_depositIdx].amount);
        emit Withdraw(msg.sender, deposits[_depositIdx].amount, _depositIdx);

        // delete deposit
        delete deposits[_depositIdx];
    }

    // claimer lock functionality. Sets the recipient address and opens a 100 block timewindow in which the claimer can withdraw the deposit.
    // Costs some ETH to prevent spamming and DoS attacks. Is later refunded to the sender.
    function openEtherDepositWindow(uint256 _depositIdx) public payable {
        require(
            msg.value >= deposits[_depositIdx].unlockDepositAmount,
            "not enough ETH sent to open deposit window"
        );
        // if the deposit has already been lockeed once, require the window to be over
        if (deposits[_depositIdx].blockNumber > 0) {
            require(
                block.number > deposits[_depositIdx].blockNumber + 100,
                "deposit window still open"
            );
        }

        // set recipient address
        deposits[_depositIdx].recipient = msg.sender;
        // refresh timewindow
        deposits[_depositIdx].blockNumber = block.number;
    }

    // Withdraw with Password functionality. Accepts a password and compares it to the hashed password.
    // If the password is correct, the deposit is transferred to the recipient address.
    function withdrawEtherPassword(uint256 _depositIdx, string memory _password)
        public
    {
        require(
            deposits[_depositIdx].recipient != address(0),
            "recipient address not set"
        );
        require(
            deposits[_depositIdx].blockNumber + 100 > block.number,
            "timewindow expired"
        );
        require(
            deposits[_depositIdx].hashedPassword ==
                keccak256(abi.encodePacked(_password)),
            "wrong password"
        );

        // transfer ether to recipient (plus 0.001 ETH refund)
        payable(deposits[_depositIdx].recipient).transfer(
            deposits[_depositIdx].amount +
                deposits[_depositIdx].unlockDepositAmount
        );
        emit Withdraw(
            deposits[_depositIdx].recipient,
            deposits[_depositIdx].amount,
            _depositIdx
        );

        // delete deposit so it can't be claimed again
        delete deposits[_depositIdx];
    }

    //// Some utility functions ////

    // get deposit info
    function getDeposit(uint256 _depositIdx)
        public
        view
        returns (
            address,
            uint256,
            uint256,
            address,
            bytes32,
            uint256
        )
    {
        return (
            deposits[_depositIdx].sender,
            deposits[_depositIdx].amount,
            deposits[_depositIdx].blockNumber,
            deposits[_depositIdx].recipient,
            deposits[_depositIdx].hashedPassword,
            deposits[_depositIdx].unlockDepositAmount
        );
    }

    // get deposit count
    function getDepositCount() public view returns (uint256) {
        return deposits.length;
    }

    // count deposits for address
    function getEtherDepositsSent(address _sender)
        public
        view
        returns (uint256)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < deposits.length; i++) {
            if (deposits[i].sender == _sender) {
                count++;
            }
        }
        return count;
    }

    // view function to hash a string
    function hashString(string memory _string) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_string));
    }

    // @dev get the password hash for a deposit index
    function getPasswordHash(uint256 _depositIdx)
        public
        view
        returns (bytes32)
    {
        return deposits[_depositIdx].hashedPassword;
    }

    // @dev check if a string is the correct password for a deposit index
    function checkPassword(uint256 _depositIdx, string memory _password)
        public
        view
        returns (bool)
    {
        return
            keccak256(abi.encodePacked(_password)) ==
            deposits[_depositIdx].hashedPassword;
    }
}
