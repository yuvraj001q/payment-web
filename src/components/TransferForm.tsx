"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const transferSchema = z.object({
  walletId: z.string().min(1, "Please select a wallet"),
  amount: z
    .number()
    .positive("Amount must be greater than 0"),
  description: z
    .string()
    .max(200, "Description must be under 200 characters")
    .optional()
    .or(z.literal("")),
});

type TransferFormValues = z.infer<typeof transferSchema>;

interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: string;
}

export function TransferForm({ wallets }: { wallets: Wallet[] }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    amount: number;
    stripeId?: string;
  } | null>(null);

  const firstWalletId = wallets.length === 1 ? wallets[0].id : "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      walletId: firstWalletId,
      amount: undefined,
      description: "",
    },
  });

  const watchedWalletId = watch("walletId");
  const activeWallet = wallets.find((w) => w.id === watchedWalletId) ?? null;

  async function onSubmit(data: TransferFormValues) {
    setServerError(null);
    setSuccess(null);

    const wallet = wallets.find((w) => w.id === data.walletId);
    if (!wallet) {
      setServerError("Please select a valid wallet.");
      return;
    }

    if (data.amount > Number(wallet.balance)) {
      setServerError("Insufficient balance for this transfer.");
      return;
    }

    try {
      const res = await fetch("/api/stripe/create-transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: data.amount,
          currency: wallet.currency ?? "usd",
          sourceWalletId: data.walletId,
          description: data.description || undefined,
        }),
      });

      const result = await res.json();

      if (result.success && result.transaction) {
        setSuccess({
          amount: result.transaction.amount,
          stripeId: result.transaction.stripe_transfer_id,
        });
        reset();
      } else {
        setServerError(result.error ?? "Transfer failed. Please try again.");
      }
    } catch {
      setServerError("Connection error. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="walletId"
          className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2"
        >
          From Wallet
        </label>
        <select
          id="walletId"
          {...register("walletId")}
          className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 appearance-none"
        >
          <option value="">Select a wallet</option>
          {wallets.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name} — $
              {Number(w.balance).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </option>
          ))}
        </select>
        {activeWallet && (
          <p className="text-xs text-muted-foreground mt-1.5 tabular-nums">
            Available balance: $
            {Number(activeWallet.balance).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        )}
        {errors.walletId && (
          <p className="text-xs text-red-500 mt-1.5">
            {errors.walletId.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2"
        >
          Amount
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            $
          </span>
          <input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("amount", { valueAsNumber: true })}
            className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 tabular-nums"
          />
        </div>
        {errors.amount && (
          <p className="text-xs text-red-500 mt-1.5">
            {errors.amount.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2"
        >
          Description
          <span className="font-normal normal-case text-muted-foreground">
            {" "}
            (optional)
          </span>
        </label>
        <input
          id="description"
          type="text"
          placeholder="What is this transfer for?"
          {...register("description")}
          className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
        />
        {errors.description && (
          <p className="text-xs text-red-500 mt-1.5">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? "Processing…" : "Send Transfer"}
        </button>
      </div>

      {serverError && (
        <div className="p-3.5 text-sm rounded-xl bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900">
          {serverError}
        </div>
      )}

      {success && (
        <div className="p-3.5 text-sm rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
          <p className="font-medium">
            $
            {success.amount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}{" "}
            transferred successfully.
          </p>
          {success.stripeId && (
            <p className="text-xs mt-1 opacity-75 font-mono tabular-nums">
              ID: {success.stripeId}
            </p>
          )}
        </div>
      )}
    </form>
  );
}
