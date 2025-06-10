import { Item } from "../data/items";

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
