
import { toast } from '@/hooks/use-toast';

// Tipos
export interface AccountingCategory {
  id: number;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  parent_id: number | null;
}

export interface AccountingEntry {
  id: number;
  journal_id: number;
  date: string;
  document_number: string;
  description: string;
  debit_account_id: number;
  credit_account_id: number;
  amount: number;
  reference_type: 'payment' | 'invoice' | 'salary' | 'purchase' | 'other';
  reference_id: number | null;
  created_by: number;
  created_at: string;
}

// Mock de dados
let mockCategories: AccountingCategory[] = [
  {
    id: 1,
    code: '1',
    name: 'Ativos',
    type: 'asset',
    parent_id: null
  },
  {
    id: 2,
    code: '1.1',
    name: 'Disponibilidades',
    type: 'asset',
    parent_id: 1
  },
  {
    id: 3,
    code: '1.1.1',
    name: 'Caixa',
    type: 'asset',
    parent_id: 2
  },
  {
    id: 4,
    code: '1.1.2',
    name: 'Depósitos à Ordem',
    type: 'asset',
    parent_id: 2
  },
  {
    id: 5,
    code: '2',
    name: 'Passivos',
    type: 'liability',
    parent_id: null
  },
  {
    id: 6,
    code: '3',
    name: 'Capital Próprio',
    type: 'equity',
    parent_id: null
  },
  {
    id: 7,
    code: '4',
    name: 'Receitas',
    type: 'revenue',
    parent_id: null
  },
  {
    id: 8,
    code: '4.1',
    name: 'Propinas',
    type: 'revenue',
    parent_id: 7
  },
  {
    id: 9,
    code: '5',
    name: 'Despesas',
    type: 'expense',
    parent_id: null
  },
  {
    id: 10,
    code: '5.1',
    name: 'Salários',
    type: 'expense',
    parent_id: 9
  },
  {
    id: 11,
    code: '5.2',
    name: 'Material Escolar',
    type: 'expense',
    parent_id: 9
  }
];

let mockEntries: AccountingEntry[] = [
  {
    id: 1,
    journal_id: 1,
    date: '2023-01-15',
    document_number: 'REC-2023-001',
    description: 'Pagamento de propina Ana Silva',
    debit_account_id: 3, // Caixa
    credit_account_id: 8, // Propinas
    amount: 25000,
    reference_type: 'payment',
    reference_id: 1,
    created_by: 999, // Admin ID
    created_at: '2023-01-15T10:30:00Z'
  },
  {
    id: 2,
    journal_id: 1,
    date: '2023-01-20',
    document_number: 'REC-2023-002',
    description: 'Pagamento de propina Carlos Eduardo',
    debit_account_id: 3, // Caixa
    credit_account_id: 8, // Propinas
    amount: 25000,
    reference_type: 'payment',
    reference_id: 2,
    created_by: 999, // Admin ID
    created_at: '2023-01-20T14:15:00Z'
  },
  {
    id: 3,
    journal_id: 1,
    date: '2023-01-25',
    document_number: 'SAL-2023-001',
    description: 'Pagamento salário funcionários',
    debit_account_id: 10, // Salários
    credit_account_id: 4, // Depósitos à Ordem
    amount: 150000,
    reference_type: 'salary',
    reference_id: 101,
    created_by: 999, // Admin ID
    created_at: '2023-01-25T16:45:00Z'
  }
];

// Serviço de Contabilidade
export const accountingService = {
  // Obter categorias contábeis (plano de contas)
  getAccountingCategories: async (): Promise<AccountingCategory[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCategories;
  },
  
  // Obter categoria por ID
  getCategoryById: async (id: number): Promise<AccountingCategory | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const category = mockCategories.find(c => c.id === id);
    return category || null;
  },
  
  // Criar nova categoria contábil
  createCategory: async (categoryData: Omit<AccountingCategory, 'id'>): Promise<AccountingCategory> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const newCategory: AccountingCategory = {
      ...categoryData,
      id: mockCategories.length ? Math.max(...mockCategories.map(c => c.id)) + 1 : 1
    };
    
    mockCategories.push(newCategory);
    
    toast({
      title: "Categoria contábil criada",
      description: `${newCategory.code} - ${newCategory.name} foi adicionada ao plano de contas`
    });
    
    return newCategory;
  },
  
  // Obter lançamentos contábeis
  getAccountingEntries: async (filters?: {
    startDate?: string;
    endDate?: string;
    accountId?: number;
    referenceType?: string;
  }): Promise<AccountingEntry[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let filteredEntries = [...mockEntries];
    
    if (filters) {
      if (filters.startDate) {
        filteredEntries = filteredEntries.filter(e => e.date >= filters.startDate!);
      }
      
      if (filters.endDate) {
        filteredEntries = filteredEntries.filter(e => e.date <= filters.endDate!);
      }
      
      if (filters.accountId) {
        filteredEntries = filteredEntries.filter(
          e => e.debit_account_id === filters.accountId || e.credit_account_id === filters.accountId
        );
      }
      
      if (filters.referenceType) {
        filteredEntries = filteredEntries.filter(
          e => e.reference_type === filters.referenceType
        );
      }
    }
    
    return filteredEntries;
  },
  
  // Criar novo lançamento contábil
  createAccountingEntry: async (entryData: Omit<AccountingEntry, 'id' | 'created_at'>): Promise<AccountingEntry> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newEntry: AccountingEntry = {
      ...entryData,
      id: mockEntries.length ? Math.max(...mockEntries.map(e => e.id)) + 1 : 1,
      created_at: new Date().toISOString()
    };
    
    mockEntries.push(newEntry);
    
    toast({
      title: "Lançamento contábil criado",
      description: `Lançamento #${newEntry.id} registado com sucesso`
    });
    
    return newEntry;
  },
  
  // Gerar relatório de SAFT-T Angola
  generateSAFT: async (month: number, year: number): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "SAFT-T gerado",
      description: `Arquivo SAFT-T de ${month}/${year} gerado com sucesso`
    });
    
    // Na implementação real, isto retornaria o URL do arquivo ou o conteúdo XML
    return `saft_angola_${year}_${month.toString().padStart(2, '0')}.xml`;
  },
  
  // Gerar relatório financeiro
  generateFinancialReport: async (
    reportType: 'income_statement' | 'balance_sheet' | 'cash_flow',
    startDate: string,
    endDate: string
  ): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Na implementação real, isto retornaria dados estruturados para o relatório
    toast({
      title: "Relatório gerado",
      description: `${
        reportType === 'income_statement' ? 'Demonstração de Resultados' : 
        reportType === 'balance_sheet' ? 'Balanço Patrimonial' : 'Fluxo de Caixa'
      } gerado com sucesso`
    });
    
    return {
      reportType,
      period: {
        startDate,
        endDate
      },
      generatedAt: new Date().toISOString(),
      data: {} // Dados do relatório
    };
  }
};
