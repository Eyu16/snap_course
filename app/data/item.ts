export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export const ITEMS: Item[] = [
  {
    id: "ice_cream",
    name: "Ice Cream",
    description: "A delicious ice cream cone with a variety of flavors.",
    price: 2.5,
    icon: "🍦",
  },
  {
    id: "chocolate_bar",
    name: "Chocolate Bar",
    description: "A rich chocolate bar made with the finest cocoa.",
    price: 1.5,
    icon: "🍫",
  },
  {
    id: "soda_can",
    name: "Soda Can",
    description: "A refreshing can of soda, perfect for quenching your thirst.",
    price: 1.0,
    icon: "🥤",
  },
  {
    id: "chips_bag",
    name: "Chips Bag",
    description: "A bag of crispy potato chips, great for snacking.",
    price: 1.2,
    icon: "🍟",
  },
  {
    id: "candy_cane",
    name: "Candy Cane",
    description: "A festive candy cane, perfect for the holiday season.",
    price: 0.5,
    icon: "🍬",
  },
];

export function getItemById(id: string): Item | undefined {
  return ITEMS.find((item) => item.id === id);
}
