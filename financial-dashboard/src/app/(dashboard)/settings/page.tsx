import { PlaidLinkButton } from "@/components/PlaidLink";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and linked bank accounts.
        </p>
      </div>

      <section className="space-y-6">
        <div className="rounded-xl border border-border bg-background p-6">
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Linked Bank Accounts
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Connect your bank account via Plaid to enable transfers and balance
            syncing.
          </p>
          <PlaidLinkButton />
        </div>

        <div className="rounded-xl border border-border bg-background p-6">
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Profile
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Account preferences and personal details.
          </p>
          <p className="text-sm text-muted-foreground">
            Profile settings coming soon.
          </p>
        </div>
      </section>
    </div>
  );
}
