import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const webhookType = body.webhook_type;
  const webhookCode = body.webhook_code;
  const itemId = body.item_id;

  if (!itemId) {
    return NextResponse.json({ error: "Missing item_id" }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    await supabase
      .from("plaid_accounts")
      .update({
        status:
          webhookCode === "ERROR" ? "error" : "active",
        updated_at: new Date().toISOString(),
      })
      .eq("plaid_item_id", itemId);

    console.log(
      `Plaid webhook received: ${webhookType} / ${webhookCode} for item ${itemId}`
    );

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
