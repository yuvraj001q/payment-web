import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { plaidClient } from "@/lib/plaid/client";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { public_token, accounts, institution } = await request.json();

    if (!public_token) {
      return NextResponse.json(
        { error: "Missing public_token" },
        { status: 400 }
      );
    }

    const exchange =
      await plaidClient.itemPublicTokenExchange({ public_token });
    const accessToken = exchange.data.access_token;
    const itemId = exchange.data.item_id;

    const primary = accounts?.[0];

    const { error } = await supabase.from("plaid_accounts").insert({
      user_id: user.id,
      plaid_access_token: accessToken,
      plaid_item_id: itemId,
      plaid_institution_id: institution?.institution_id ?? null,
      plaid_account_id: primary?.id ?? null,
      account_name: primary?.name ?? institution?.name ?? "Bank Account",
      account_type: primary?.type ?? null,
      account_subtype: primary?.subtype ?? null,
      account_mask: primary?.mask ?? null,
      status: "active",
    });

    if (error) {
      console.error("DB insert error:", error);
      return NextResponse.json(
        { error: "Failed to store account" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Plaid exchange error:", error);
    return NextResponse.json(
      { error: "Failed to exchange public token" },
      { status: 500 }
    );
  }
}
