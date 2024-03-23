import { Request, Response } from 'express';
import { AuctionService } from '../services';

export class AuctionController {
  private auctionService: AuctionService;

  constructor(auctionService: AuctionService) {
    this.auctionService = auctionService;
  }

  public placeBid = async (req: Request, res: Response): Promise<void> => {
    try {
      const { amount }: { amount: number } = req.body;
      const isValidBid = await this.auctionService.checkBidValidity(amount);
      if (!isValidBid) {
        res.status(400).json({ error: 'Submitted bid amount must be higher than current highest bid' });
        return;
      }
      const result = await this.auctionService.placeBid(amount);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

}
