import { NextRequest, NextResponse } from "next/server";
import { getItemById } from "@/app/data/items";
import { Purchase } from "@/app/types";

// @ts-expect-error to ignore error
if (!global.purchases) {
  // @ts-expect-error to ignore errore
  global.purchases = [];
}

// @ts-expect-error to ignore error
const purchases = global.purchases;

export async function GET(request: NextRequest) {
  try {
    const userID = request.nextUrl.searchParams.get("userId");

    if (!userID) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
    const userPurchases: Purchase[] = purchases.filter(
      (purchase: Purchase) => purchase.userId === userID
    );

    const validatePurchase = userPurchases.filter((purchase: Purchase) => {
      return getItemById(purchase.itemId) !== undefined;
    });
    return NextResponse.json({
      purchases: validatePurchase,
    });
  } catch (error) {
    console.log(error);
  }
}
