export const ITEM_SECRETS: Record<string, string> = {
  ice_cream: "FROZEN2025",
  chocolate_bar: "SWEETTOOTH2025",
  soda_can: "REFRESH2025",
  chips_bag: "CRUNCH2025",
  candy_cane: "HOLIDAY2025",
};

export function getSecretForItem(itemId: string): string | undefined {
  return ITEM_SECRETS[itemId];
}
