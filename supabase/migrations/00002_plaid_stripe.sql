-- =============================================================================
-- PLAID ACCOUNTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.plaid_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plaid_access_token TEXT NOT NULL,
  plaid_item_id TEXT NOT NULL UNIQUE,
  plaid_institution_id TEXT,
  plaid_account_id TEXT,
  account_name TEXT,
  account_type TEXT,
  account_subtype TEXT,
  account_mask TEXT,
  wallet_id UUID REFERENCES public.wallets(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================================================
-- EXTEND TRANSACTIONS WITH STRIPE / PLAID FIELDS
-- =============================================================================
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS stripe_transfer_id TEXT;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS metadata JSONB;

-- =============================================================================
-- EXTEND WALLETS WITH PLAID LINK
-- =============================================================================
ALTER TABLE public.wallets ADD COLUMN IF NOT EXISTS plaid_account_id UUID REFERENCES public.plaid_accounts(id) ON DELETE SET NULL;

-- =============================================================================
-- ROW LEVEL SECURITY FOR PLAID ACCOUNTS
-- =============================================================================
ALTER TABLE public.plaid_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own plaid accounts"
  ON public.plaid_accounts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own plaid accounts"
  ON public.plaid_accounts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own plaid accounts"
  ON public.plaid_accounts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own plaid accounts"
  ON public.plaid_accounts FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================================================
-- INDEXES
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_plaid_accounts_user_id ON public.plaid_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_plaid_accounts_wallet_id ON public.plaid_accounts(wallet_id);
CREATE INDEX IF NOT EXISTS idx_plaid_accounts_item_id ON public.plaid_accounts(plaid_item_id);
CREATE INDEX IF NOT EXISTS idx_transactions_stripe_id ON public.transactions(stripe_transfer_id);
