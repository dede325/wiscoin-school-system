
import { toast } from '@/hooks/use-toast';

// Tipos
export interface WiscoinWallet {
  id: number;
  user_id: number;
  user_name: string;
  balance: number;
  locked_balance: number;
  created_at: string;
  last_transaction_at: string | null;
}

export interface WiscoinTransaction {
  id: number;
  wallet_id: number;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  reference: string | null;
  created_at: string;
  updated_at: string;
  recipient_id?: number;
  recipient_name?: string;
}

// Mock de dados
let mockWallets: WiscoinWallet[] = [
  {
    id: 1,
    user_id: 101,
    user_name: 'Ana Silva',
    balance: 500,
    locked_balance: 0,
    created_at: '2023-01-01T10:00:00Z',
    last_transaction_at: '2023-01-15T14:30:00Z'
  },
  {
    id: 2,
    user_id: 102,
    user_name: 'Carlos Eduardo',
    balance: 750,
    locked_balance: 100,
    created_at: '2023-01-01T11:15:00Z',
    last_transaction_at: '2023-01-17T09:45:00Z'
  },
  {
    id: 3,
    user_id: 103,
    user_name: 'Mariana Luísa',
    balance: 200,
    locked_balance: 0,
    created_at: '2023-01-02T08:30:00Z',
    last_transaction_at: '2023-01-10T16:20:00Z'
  }
];

let mockTransactions: WiscoinTransaction[] = [
  {
    id: 1,
    wallet_id: 1,
    amount: 200,
    type: 'deposit',
    status: 'completed',
    description: 'Depósito inicial',
    reference: 'DEP-2023-001',
    created_at: '2023-01-01T10:30:00Z',
    updated_at: '2023-01-01T10:30:00Z'
  },
  {
    id: 2,
    wallet_id: 1,
    amount: 300,
    type: 'deposit',
    status: 'completed',
    description: 'Depósito adicional',
    reference: 'DEP-2023-002',
    created_at: '2023-01-15T14:30:00Z',
    updated_at: '2023-01-15T14:30:00Z'
  },
  {
    id: 3,
    wallet_id: 2,
    amount: 750,
    type: 'deposit',
    status: 'completed',
    description: 'Depósito inicial',
    reference: 'DEP-2023-003',
    created_at: '2023-01-01T11:30:00Z',
    updated_at: '2023-01-01T11:30:00Z'
  },
  {
    id: 4,
    wallet_id: 2,
    amount: 100,
    type: 'payment',
    status: 'pending',
    description: 'Pagamento de materiais',
    reference: 'PAY-2023-001',
    created_at: '2023-01-17T09:45:00Z',
    updated_at: '2023-01-17T09:45:00Z'
  }
];

// Serviço Wiscoin
export const wiscoinService = {
  // Obter carteira por ID de usuário
  getWalletByUserId: async (userId: number): Promise<WiscoinWallet | null> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const wallet = mockWallets.find(w => w.user_id === userId);
    return wallet || null;
  },
  
  // Criar nova carteira
  createWallet: async (userData: { user_id: number; user_name: string }): Promise<WiscoinWallet> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const newWallet: WiscoinWallet = {
      id: mockWallets.length ? Math.max(...mockWallets.map(w => w.id)) + 1 : 1,
      user_id: userData.user_id,
      user_name: userData.user_name,
      balance: 0,
      locked_balance: 0,
      created_at: new Date().toISOString(),
      last_transaction_at: null
    };
    
    mockWallets.push(newWallet);
    
    toast({
      title: "Carteira Wiscoin criada",
      description: `Carteira criada para ${userData.user_name}`
    });
    
    return newWallet;
  },
  
  // Fazer depósito
  deposit: async (walletId: number, amount: number, description: string): Promise<WiscoinTransaction> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const walletIndex = mockWallets.findIndex(w => w.id === walletId);
    if (walletIndex === -1) throw new Error("Carteira não encontrada");
    
    // Atualizar saldo da carteira
    mockWallets[walletIndex].balance += amount;
    mockWallets[walletIndex].last_transaction_at = new Date().toISOString();
    
    // Criar transação
    const transaction: WiscoinTransaction = {
      id: mockTransactions.length ? Math.max(...mockTransactions.map(t => t.id)) + 1 : 1,
      wallet_id: walletId,
      amount: amount,
      type: 'deposit',
      status: 'completed',
      description: description,
      reference: `DEP-${new Date().getFullYear()}-${String(mockTransactions.length + 1).padStart(3, '0')}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    mockTransactions.push(transaction);
    
    toast({
      title: "Depósito realizado",
      description: `${amount} Wiscoin adicionados à sua carteira`
    });
    
    return transaction;
  },
  
  // Fazer pagamento
  makePayment: async (
    walletId: number, 
    amount: number, 
    description: string
  ): Promise<WiscoinTransaction> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const walletIndex = mockWallets.findIndex(w => w.id === walletId);
    if (walletIndex === -1) throw new Error("Carteira não encontrada");
    
    if (mockWallets[walletIndex].balance < amount) {
      throw new Error("Saldo insuficiente");
    }
    
    // Atualizar saldo da carteira
    mockWallets[walletIndex].balance -= amount;
    mockWallets[walletIndex].last_transaction_at = new Date().toISOString();
    
    // Criar transação
    const transaction: WiscoinTransaction = {
      id: mockTransactions.length ? Math.max(...mockTransactions.map(t => t.id)) + 1 : 1,
      wallet_id: walletId,
      amount: amount,
      type: 'payment',
      status: 'completed',
      description: description,
      reference: `PAY-${new Date().getFullYear()}-${String(mockTransactions.length + 1).padStart(3, '0')}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    mockTransactions.push(transaction);
    
    toast({
      title: "Pagamento realizado",
      description: `Pagamento de ${amount} Wiscoin realizado com sucesso`
    });
    
    return transaction;
  },
  
  // Transferir entre carteiras
  transfer: async (
    fromWalletId: number, 
    toWalletId: number, 
    amount: number, 
    description: string
  ): Promise<WiscoinTransaction> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const fromWalletIndex = mockWallets.findIndex(w => w.id === fromWalletId);
    if (fromWalletIndex === -1) throw new Error("Carteira origem não encontrada");
    
    const toWalletIndex = mockWallets.findIndex(w => w.id === toWalletId);
    if (toWalletIndex === -1) throw new Error("Carteira destino não encontrada");
    
    if (mockWallets[fromWalletIndex].balance < amount) {
      throw new Error("Saldo insuficiente");
    }
    
    // Atualizar saldos
    mockWallets[fromWalletIndex].balance -= amount;
    mockWallets[fromWalletIndex].last_transaction_at = new Date().toISOString();
    
    mockWallets[toWalletIndex].balance += amount;
    mockWallets[toWalletIndex].last_transaction_at = new Date().toISOString();
    
    // Criar transação
    const transaction: WiscoinTransaction = {
      id: mockTransactions.length ? Math.max(...mockTransactions.map(t => t.id)) + 1 : 1,
      wallet_id: fromWalletId,
      amount: amount,
      type: 'transfer',
      status: 'completed',
      description: description,
      reference: `TRF-${new Date().getFullYear()}-${String(mockTransactions.length + 1).padStart(3, '0')}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      recipient_id: toWalletId,
      recipient_name: mockWallets[toWalletIndex].user_name
    };
    
    mockTransactions.push(transaction);
    
    toast({
      title: "Transferência realizada",
      description: `${amount} Wiscoin transferidos para ${mockWallets[toWalletIndex].user_name}`
    });
    
    return transaction;
  },
  
  // Obter histórico de transações
  getTransactionHistory: async (walletId: number): Promise<WiscoinTransaction[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockTransactions.filter(t => t.wallet_id === walletId);
  }
};
