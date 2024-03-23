import express, { Router } from 'express';
import { AuctionController } from '../controllers/auction.controller';
import { AuctionService } from '../services/auction.service';

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
  }
}

export default router;
