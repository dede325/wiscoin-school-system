
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Types
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

// Mock data for initial development
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

// Accounting Service
export const accountingService = {
  // Get accounting categories (chart of accounts)
  getAccountingCategories: async (): Promise<AccountingCategory[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCategories;
  },
  
  // Get category by ID
  getCategoryById: async (id: number): Promise<AccountingCategory | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const category = mockCategories.find(c => c.id === id);
    return category || null;
  },
  
  // Create new accounting category
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
  
  // Get accounting entries
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
  
  // Create new accounting entry
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
  
  // Generate SAF-T Angola report
  generateSAFT: async (month: number, year: number): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "SAFT-T gerado",
      description: `Arquivo SAFT-T de ${month}/${year} gerado com sucesso`
    });
    
    // In real implementation, this would return the URL or XML content
    return `saft_angola_${year}_${month.toString().padStart(2, '0')}.xml`;
  },
  
  // Generate financial report
  generateFinancialReport: async (
    reportType: 'income_statement' | 'balance_sheet' | 'cash_flow',
    startDate: string,
    endDate: string
  ): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation, this would return structured data for the report
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
      data: {} // Report data
    };
  }
};
