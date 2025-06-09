import { Item } from "../data/item";

export interface Purchase {
  userId: string;
  itemId: string;
  timestamp: number;
  transactionId: string;
}

export interface currentPurchaseWithSecret {
  item: Item;
  transactionId: string;
  timestamp: number;
  secret: string;
}
