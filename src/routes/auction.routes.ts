import express, { Router } from 'express';
import { AuctionController } from '../controllers';
import { AuctionService } from '../services';

const router = express.Router();

export class AuctionRoutes {
  public router: Router;
  private auctionController: AuctionController;

  constructor() {
    this.router = express.Router();
    this.auctionController = new AuctionController(new AuctionService());
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/place-bid', this.auctionController.placeBid);
    this.router.post('/end-auction', this.auctionController.endAuction);
    this.router.get('/auction-details', this.auctionController.getAuctionDetails);
    this.router.get('/auction-history', this.auctionController.getAuctionHistory);

   
  }
}

export default router;
