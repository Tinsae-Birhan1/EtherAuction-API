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

  public endAuction = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.auctionService.endAuction();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public getAuctionDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const details = await this.auctionService.getAuctionDetails();
      res.status(200).json(details);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public getAuctionHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const history = await this.auctionService.getAuctionHistory();
      res.status(200).json(history);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public getAuctionStatistics = async (req: Request, res: Response): Promise<void> => {
    try {
      const statistics = await this.auctionService.getAuctionStatistics();
      res.status(200).json(statistics);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}