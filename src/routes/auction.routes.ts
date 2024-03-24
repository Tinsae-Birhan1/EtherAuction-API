import express, { Router } from 'express';
import { AuctionController } from '../controllers';
import { AuctionService } from '../services';
import auth from '../middlewares/auth';

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
    this.router.post('/place-bid',  auth, this.auctionController.placeBid);
    this.router.post('/end-auction', auth, this.auctionController.endAuction);
    this.router.get('/auction-details', auth, this.auctionController.getAuctionDetails);
    this.router.get('/auction-history', auth, this.auctionController.getAuctionHistory);
    this.router.get('/auction-statistics', auth, this.auctionController.getAuctionStatistics);


    }
}

export default router;
