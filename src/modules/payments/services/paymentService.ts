
import { toast } from '@/hooks/use-toast';

// Tipos
export type Currency = 'AOA' | 'USD' | 'EUR' | 'WISCOIN';

export interface Payment {
  id: number;
  student_id: number;
  student_name: string;
  amount: number;
  currency: Currency;
  payment_date: string;
  payment_type: 'tuition' | 'material' | 'transport' | 'other';
  payment_method: 'cash' | 'bank_transfer' | 'credit_card' | 'wiscoin';
  description: string;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  receipt_number?: string;
}

// Mock de dados
let mockPayments: Payment[] = [
  {
    id: 1,
    student_id: 1,
    student_name: 'Ana Silva',
    amount: 25000,
    currency: 'AOA',
    payment_date: '2023-01-15',
    payment_type: 'tuition',
    payment_method: 'bank_transfer',
    description: 'Propina Janeiro 2023',
    status: 'completed',
    receipt_number: 'REC-2023-001'
  },
  {
    id: 2,
    student_id: 2,
    student_name: 'Carlos Eduardo',
    amount: 25000,
    currency: 'AOA',
    payment_date: '2023-01-20',
    payment_type: 'tuition',
    payment_method: 'cash',
    description: 'Propina Janeiro 2023',
    status: 'completed',
    receipt_number: 'REC-2023-002'
  },
  {
    id: 3,
    student_id: 3,
    student_name: 'Mariana Luísa',
    amount: 25000,
    currency: 'AOA',
    payment_date: '2023-02-05',
    payment_type: 'tuition',
    payment_method: 'bank_transfer',
    description: 'Propina Fevereiro 2023',
    status: 'pending'
  }
];

// Serviços de pagamento
export const paymentService = {
  // Listar todos os pagamentos
  getPayments: async (): Promise<Payment[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockPayments;
  },
  
  // Obter pagamento por ID
  getPaymentById: async (id: number): Promise<Payment | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const payment = mockPayments.find(p => p.id === id);
    return payment || null;
  },
  
  // Criar novo pagamento
  createPayment: async (paymentData: Omit<Payment, 'id' | 'receipt_number'>): Promise<Payment> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newPayment: Payment = {
      ...paymentData,
      id: mockPayments.length ? Math.max(...mockPayments.map(p => p.id)) + 1 : 1,
      receipt_number: paymentData.status === 'completed' ? 
        `REC-${new Date().getFullYear()}-${String(mockPayments.length + 1).padStart(3, '0')}` : 
        undefined
    };
    
    mockPayments.push(newPayment);
    
    toast({
      title: "Pagamento registado",
      description: `Pagamento de ${paymentData.student_name} foi registado com sucesso`
    });
    
    return newPayment;
  },
  
  // Atualizar pagamento
  updatePayment: async (id: number, paymentData: Partial<Payment>): Promise<Payment | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockPayments.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    // Se o status estiver a mudar para 'completed' e não tinha recibo, gerar um
    if (paymentData.status === 'completed' && !mockPayments[index].receipt_number) {
      paymentData.receipt_number = `REC-${new Date().getFullYear()}-${String(id).padStart(3, '0')}`;
    }
    
    mockPayments[index] = {...mockPayments[index], ...paymentData};
    
    toast({
      title: "Pagamento atualizado",
      description: `O pagamento foi atualizado com sucesso`
    });
    
    return mockPayments[index];
  },
  
  // Cancelar pagamento
  cancelPayment: async (id: number): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = mockPayments.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    mockPayments[index].status = 'cancelled';
    
    toast({
      title: "Pagamento cancelado",
      description: `O pagamento foi cancelado com sucesso`
    });
    
    return true;
  },
  
  // Gerar recibo (para pagamentos concluídos sem recibo)
  generateReceipt: async (id: number): Promise<string | null> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const index = mockPayments.findIndex(p => p.id === id);
    if (index === -1 || mockPayments[index].status !== 'completed') return null;
    
    if (!mockPayments[index].receipt_number) {
      const receiptNumber = `REC-${new Date().getFullYear()}-${String(id).padStart(3, '0')}`;
      mockPayments[index].receipt_number = receiptNumber;
      
      toast({
        title: "Recibo gerado",
        description: `Recibo ${receiptNumber} foi gerado com sucesso`
      });
      
      return receiptNumber;
    }
    
    return mockPayments[index].receipt_number;
  }
};
