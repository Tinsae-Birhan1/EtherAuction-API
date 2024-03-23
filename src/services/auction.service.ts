import Web3 from 'web3';
import AuctionABI from '../ethereum/index'; 
import {AuctionHistory} from '../models';

export class AuctionService {
  private web3: Web3;
  private contract: any; 

  constructor() {
    this.web3 = new Web3('https://mainnet.infura.io/v3/a4bfff72d0dc44ee837ca1a43f60d512');

    const contractAddress = '0x02a53dF562cf5E58A0C6214336bc157c4C537Cf4';

    this.contract = new this.web3.eth.Contract(AuctionABI, contractAddress); 
  }

  public async placeBid(amount: number): Promise<any> {
    try {
      const accounts = await this.web3.eth.getAccounts();
      await this.contract.methods.bid().send({ value: this.web3.utils.toWei(amount.toString(), 'ether'), from: accounts[0] });
      await this.saveBidToHistory(accounts[0], amount);
      return { message: 'Bid placed successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async endAuction(): Promise<any> {
    try {
      const accounts = await this.web3.eth.getAccounts();
      await this.contract.methods.auctionEnd().send({ from: accounts[0] });
      return { message: 'Auction ended successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

    public async checkBidValidity(amount: number): Promise<boolean> {
    const currentHighestBidString = await this.contract.methods.highestBid().call();
    const currentHighestBid = parseFloat(this.web3.utils.fromWei(currentHighestBidString, 'ether'));

    return amount > currentHighestBid;
    }


  
  private async saveBidToHistory(bidder: string, amount: number): Promise<void> {
    try {
      const bid = new AuctionHistory({ bidder, amount, timestamp: new Date() });
      await bid.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }
 
  public async getAuctionDetails(): Promise<any> {
    try {
      const highestBid = await this.contract.methods.highestBid().call();
      const highestBidder = await this.contract.methods.highestBidder().call();
      const auctionEndTime = await this.contract.methods.auctionEndTime().call();
      const auctionEnded = await this.contract.methods.ended().call();

      return {
        highestBid: this.web3.utils.fromWei(highestBid, 'ether'),
        highestBidder,
        auctionEndTime: new Date(parseInt(auctionEndTime) * 1000),
        auctionEnded
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
