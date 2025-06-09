import { NextRequest, NextResponse } from "next/server";
import { getSecretForItem } from "@/app/server/item-secrets";

// @ts-expect-error to ignore error
if (!global.purchases) {
  // @ts-expect-error to ignore errore
  global.purchases = [];
}

// @ts-expect-error to ignore error
const purchases = global.purchases;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, itemId, transactionId } = body;
    if (!userId || !itemId || !transactionId) {
      return NextResponse.json(
        {
          error: "Missing userId, itemId or transactionId",
        },
        { status: 400 }
      );
    }
    const secret = getSecretForItem(itemId);
    if (!secret) {
      return NextResponse.json(
        { error: "Invalid item id or secret not found" },
        { status: 404 }
      );
    }
    purchases.push({
      userId,
      itemId,
      transactionId,
      timestamp: Date.now(),
    });

    return NextResponse.json({ success: true, secret });
  } catch (error) {
    console.log("Error storing successfull payment:", error);
    return NextResponse.json(
      { error: "Failed to store payment data" },
      { status: 500 }
    );
  }
}
