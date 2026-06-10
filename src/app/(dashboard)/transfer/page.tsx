import { createClient } from "@/lib/supabase/server";
import { TransferForm } from "@/components/TransferForm";

export default async function TransferPage() {
  const supabase = await createClient();

  const { data: wallets } = await supabase
    .from("wallets")
    .select("id, name, balance, currency")
    .order("created_at");

  return (
    <div className="p-8 lg:p-10 max-w-2xl">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Transfer
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          Send money securely from your wallets.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-background p-6 lg:p-7">
        <h2 className="text-sm font-semibold text-foreground mb-6">
          New Transfer
        </h2>
        <TransferForm wallets={wallets ?? []} />
      </div>
    </div>
  );
}
