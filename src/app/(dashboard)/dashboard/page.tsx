import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: wallets } = await supabase
    .from("wallets")
    .select("*")
    .order("created_at");

  const { data: transactions } = await supabase
    .from("transactions")
    .select("id, amount, type, description, status, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  const totalBalance =
    wallets?.reduce((sum, w) => sum + Number(w.balance), 0) ?? 0;

  return (
    <div className="p-8 lg:p-10 max-w-6xl">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          Welcome back, {user?.email?.split("@")[0] ?? "User"}.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <div className="rounded-2xl border border-border bg-background p-6 lg:p-7">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Total Balance
          </p>
          <p className="text-4xl lg:text-5xl font-light tracking-tight text-foreground mt-3 tabular-nums">
            ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 lg:p-7">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Wallets
          </p>
          <p className="text-4xl lg:text-5xl font-light tracking-tight text-foreground mt-3 tabular-nums">
            {wallets?.length ?? 0}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {wallets?.length === 1 ? "1 account" : `${wallets?.length ?? 0} accounts`}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 lg:p-7">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Transactions
          </p>
          <p className="text-4xl lg:text-5xl font-light tracking-tight text-foreground mt-3 tabular-nums">
            {transactions?.length ?? 0}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Recent 10
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background">
        <div className="px-6 lg:px-7 py-5 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">
            Recent Transactions
          </h2>
        </div>

        {!transactions || transactions.length === 0 ? (
          <div className="px-6 lg:px-7 py-12 text-center">
            <p className="text-sm text-muted-foreground">No transactions yet.</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your transaction history will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {transactions.map((tx) => {
              const isCredit =
                tx.type === "deposit" || tx.type === "transfer_in";
              const isDebit =
                tx.type === "withdrawal" || tx.type === "transfer_out";
              return (
                <div
                  key={tx.id}
                  className="px-6 lg:px-7 py-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        isCredit
                          ? "bg-emerald-500"
                          : isDebit
                            ? "bg-red-500"
                            : "bg-amber-500"
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {tx.description ||
                          tx.type.replace(/_/g, " ").replace(/(?:^|\s)\S/g, (s: string) =>
                            s.toUpperCase()
                          )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(tx.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-medium tabular-nums shrink-0 ${
                      isCredit
                        ? "text-emerald-600 dark:text-emerald-400"
                        : isDebit
                          ? "text-red-600 dark:text-red-400"
                          : "text-muted-foreground"
                    }`}
                  >
                    {isCredit ? "+" : isDebit ? "−" : ""}$
                    {Number(tx.amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
