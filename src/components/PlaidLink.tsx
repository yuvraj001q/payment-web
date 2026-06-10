"use client";

import { useCallback, useState } from "react";
import { usePlaidLink, type PlaidLinkOnSuccess } from "react-plaid-link";

export function PlaidLinkButton() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const fetchLinkToken = useCallback(async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/plaid/create-link-token", {
        method: "POST",
      });
      const data = await res.json();
      if (data.link_token) {
        setLinkToken(data.link_token);
      } else {
        setStatus("Failed to initialize. Check server logs.");
      }
    } catch {
      setStatus("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const onSuccess: PlaidLinkOnSuccess = useCallback(
    async (publicToken, metadata) => {
      setStatus("Linking account...");
      try {
        const res = await fetch("/api/plaid/exchange-public-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            public_token: publicToken,
            accounts: metadata.accounts,
            institution: metadata.institution,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setStatus("Account linked successfully");
          setLinkToken(null);
        } else {
          setStatus(data.error ?? "Failed to link account");
        }
      } catch {
        setStatus("Failed to complete linking");
      }
    },
    []
  );

  const onExit = useCallback(() => {
    setLinkToken(null);
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
    onExit,
  });

  const handleClick = async () => {
    if (!linkToken) {
      await fetchLinkToken();
    }
    if (linkToken && ready) {
      open();
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Initializing..." : "Link Bank Account"}
      </button>
      {status && (
        <p className="mt-2 text-sm text-muted-foreground">{status}</p>
      )}
    </div>
  );
}
