
import { supabase } from '@/integrations/supabase/client';
import type { WalletWithTransactions } from '../types/wiscoin';

export const wiscoinService = {
  // Fetch user's wallet
  getUserWallet: async (userId: string) => {
    const { data, error } = await supabase
      .from('wiscoin_wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  // Fetch wallet transactions
  getWalletTransactions: async (walletId: string) => {
    const { data, error } = await supabase
      .from('wiscoin_transactions')
      .select('*')
      .or(`sender_wallet_id.eq.${walletId},recipient_wallet_id.eq.${walletId}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Create payment request
  createPaymentRequest: async (walletId: string, amount: number, description?: string) => {
    const { data, error } = await supabase
      .from('wiscoin_payment_requests')
      .insert({
        wallet_id: walletId,
        amount,
        description,
        expires_at: new Date(Date.now() + 30 * 60000).toISOString(), // 30 minutes expiry
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Process payment from QR code
  processPayment: async (paymentRequestId: string, senderWalletId: string) => {
    const { data: paymentRequest, error: fetchError } = await supabase
      .from('wiscoin_payment_requests')
      .select('*')
      .eq('id', paymentRequestId)
      .single();

    if (fetchError) throw fetchError;
    if (!paymentRequest) throw new Error('Payment request not found');
    if (paymentRequest.status !== 'pending') throw new Error('Payment request is no longer valid');

    // Create transaction
    const { data: transaction, error: transactionError } = await supabase
      .from('wiscoin_transactions')
      .insert({
        sender_wallet_id: senderWalletId,
        recipient_wallet_id: paymentRequest.wallet_id,
        amount: paymentRequest.amount,
        type: 'payment',
        description: paymentRequest.description,
      })
      .select()
      .single();

    if (transactionError) throw transactionError;

    // Update payment request status
    const { error: updateError } = await supabase
      .from('wiscoin_payment_requests')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        transaction_id: transaction.id,
      })
      .eq('id', paymentRequestId);

    if (updateError) throw updateError;

    return transaction;
  },
};
