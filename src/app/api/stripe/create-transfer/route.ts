import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe/client";

const transferBody = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  currency: z.string().optional().default("usd"),
  sourceWalletId: z.string().min(1, "Source wallet is required"),
  description: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const raw = await request.json();
    const parsed = transferBody.safeParse(raw);

    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const msg = Object.values(first).flat()[0] ?? "Invalid input";
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { amount, currency, sourceWalletId, description } = parsed.data;

    const { data: sourceWallet, error: walletError } = await supabase
      .from("wallets")
      .select("id, balance, currency")
      .eq("id", sourceWalletId)
      .eq("user_id", user.id)
      .single();

    if (walletError || !sourceWallet) {
      return NextResponse.json(
        { error: "Wallet not found or access denied" },
        { status: 404 }
      );
    }

    if (Number(sourceWallet.balance) < amount) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }

    const amountCents = Math.round(amount * 100);
    const stripeDestination = process.env.STRIPE_CONNECTED_ACCOUNT_ID ?? "";

    const transfer = await getStripe().transfers.create({
      amount: amountCents,
      currency: currency.toLowerCase(),
      destination: stripeDestination,
      description: description ?? "Wallet transfer",
      metadata: {
        user_id: user.id,
        wallet_id: sourceWalletId,
      },
    });

    const { data: transaction, error: txError } = await supabase
      .from("transactions")
      .insert({
        wallet_id: sourceWalletId,
        user_id: user.id,
        type: "transfer_out",
        amount,
        description: description ?? "Transfer via Stripe",
        status: "completed",
        stripe_transfer_id: transfer.id,
        metadata: {
          stripe_transfer_id: transfer.id,
          stripe_created: new Date(transfer.created * 1000).toISOString(),
        },
      })
      .select()
      .single();

    if (txError) {
      console.error("Transaction log error:", txError);
      return NextResponse.json(
        { error: "Transfer processed but failed to log" },
        { status: 500 }
      );
    }

    await supabase
      .from("wallets")
      .update({
        balance: Number(sourceWallet.balance) - amount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", sourceWalletId)
      .eq("user_id", user.id);

    return NextResponse.json({
      success: true,
      transaction: {
        id: transaction.id,
        amount: transaction.amount,
        status: transaction.status,
        type: transaction.type,
        stripe_transfer_id: transfer.id,
      },
    });
  } catch (error: unknown) {
    console.error("Stripe transfer error:", error);

    if (error instanceof Error && error.message.includes("stripe")) {
      return NextResponse.json(
        { error: error.message ?? "Invalid Stripe request" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process transfer" },
      { status: 500 }
    );
  }
}
