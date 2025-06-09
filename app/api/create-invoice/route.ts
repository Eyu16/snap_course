import { NextRequest, NextResponse } from "next/server";
import { getItemById } from "@/app/data/item";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, itemId } = body;
    if (!userId || !itemId) {
      return NextResponse.json(
        { error: "Missing userId or itemId" },
        { status: 400 }
      );
    }
    const item = getItemById(itemId);
    if (!item) {
      return NextResponse.json({ error: "Invalid item id" }, { status: 404 });
    }
    const { name: title, description, price } = item;

    const BOT_TOKEN = process.env.BOT_TOKEN;

    if (!BOT_TOKEN)
      return NextResponse.json(
        { error: "Bot token not configured!" },
        { status: 400 }
      );

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          payload: itemId,
          provider_token: process.env.PAYMENT_PROVIDER_TOKEN,
          currency: "XTR",
          prices: [{ label: title, amount: price }],
          start_parameter: "start_parameter",
        }),
      }
    );
    const data = await response.json();
    if (!data.ok) {
      return NextResponse.json(
        { error: data.description || "Failed to create invoice" },
        { status: 500 }
      );
    }
    const invoiceLink = data.result;
    return NextResponse.json({ invoiceLink }, { status: 200 });
  } catch (error) {
    console.error("Error in create-invoice route:", error);
    return NextResponse.json(
      { error: "Failed to create invoices" },
      { status: 500 }
    );
  }
}
