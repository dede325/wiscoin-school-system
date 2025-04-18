
export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  locked_balance: number;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  sender_wallet_id: string | null;
  recipient_wallet_id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description?: string;
  reference?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentRequest {
  id: string;
  wallet_id: string;
  amount: number;
  description?: string;
  status: 'pending' | 'completed' | 'expired' | 'cancelled';
  expires_at: string;
  completed_at?: string;
  transaction_id?: string;
  created_at: string;
  updated_at: string;
}

export interface WalletWithTransactions extends Wallet {
  transactions: Transaction[];
}
