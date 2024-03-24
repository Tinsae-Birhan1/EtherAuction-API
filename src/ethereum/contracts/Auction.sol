// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleAuction {
    // Address of the beneficiary who will receive the highest bid amount
    address payable public beneficiary;
    // Auction end time (Unix timestamp)
    uint public auctionEndTime;

    // Address of the current highest bidder
    address public highestBidder;
    // Current highest bid amount
    uint public highestBid;

    // Mapping to track pending returns for participants who were outbid
    mapping(address => uint) pendingReturns;

    // Flag to indicate if the auction has ended
    bool ended;

    // Events to log important actions
    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    // Constructor to initialize the auction with a specified duration and beneficiary address
    constructor(uint _biddingTime, address payable _beneficiary) {
        beneficiary = _beneficiary;
        auctionEndTime = block.timestamp + _biddingTime;
    }

    // Function for participants to place bids
    function bid() public payable {
        // Auction must not have ended
        require(block.timestamp <= auctionEndTime, "Auction already ended");
        // Bid amount must be higher than the current highest bid
        require(msg.value > highestBid, "There already is a higher bid");

        // If there was a previous highest bid, refund the bidder
        if (highestBid != 0) {
            pendingReturns[highestBidder] += highestBid;
        }

        // Update highest bidder and highest bid amount
        highestBidder = msg.sender;
        highestBid = msg.value;
        // Emit event to log the new highest bid
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    // Function for participants to withdraw their pending returns
    function withdraw() public returns (bool) {
        // Retrieve the amount pending for withdrawal
        uint amount = pendingReturns[msg.sender];
        // If there's an amount pending
        if (amount > 0) {
            // Reset the pending amount
            pendingReturns[msg.sender] = 0;

            // Transfer the pending amount to the participant
            if (!payable(msg.sender).send(amount)) {
                // If the transfer fails, restore the pending amount and return false
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    // Function to end the auction
    function auctionEnd() public {
        // Auction must have ended
        require(block.timestamp >= auctionEndTime, "Auction not yet ended");
        // Auction end function must not have been called before
        require(!ended, "auctionEnd has already been called");

        // Set the auction as ended
        ended = true;
        // Emit event to log the winner and the winning bid amount
        emit AuctionEnded(highestBidder, highestBid);

        // Transfer the winning bid amount to the beneficiary
        beneficiary.transfer(highestBid);
    }
}
