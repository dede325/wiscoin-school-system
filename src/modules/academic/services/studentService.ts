
import { toast } from '@/hooks/use-toast';

// Tipos
export interface Student {
  id: number;
  name: string;
  registration: string;
  class: string;
  status: 'active' | 'inactive' | 'pending';
  email?: string;
  guardian_name?: string;
  guardian_contact?: string;
  date_of_birth?: string;
  address?: string;
}

// Variáveis (mock para simular integração com backend)
let mockStudents: Student[] = [
  { id: 1, name: 'Ana Silva', registration: '2023001', class: '10A', status: 'active', 
    email: 'ana.silva@email.com', guardian_name: 'Maria Silva', 
    guardian_contact: '912345678', date_of_birth: '2008-05-15' },
  { id: 2, name: 'Carlos Eduardo', registration: '2023002', class: '10A', status: 'active',
    email: 'carlos.eduardo@email.com', guardian_name: 'José Eduardo',
    guardian_contact: '923456789', date_of_birth: '2008-03-22' },
  { id: 3, name: 'Mariana Luísa', registration: '2023003', class: '10B', status: 'inactive',
    email: 'mariana.luisa@email.com', guardian_name: 'Paulo Luís',
    guardian_contact: '934567890', date_of_birth: '2007-11-10' },
];

// Serviços
export const studentService = {
  // Listar todos os alunos
  getStudents: async (): Promise<Student[]> => {
    // Simulando requisição API
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockStudents;
  },
  
  // Obter um aluno pelo ID
  getStudentById: async (id: number): Promise<Student | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const student = mockStudents.find(s => s.id === id);
    return student || null;
  },
  
  // Criar novo aluno
  createStudent: async (studentData: Omit<Student, 'id'>): Promise<Student> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newStudent = {
      ...studentData,
      id: mockStudents.length ? Math.max(...mockStudents.map(s => s.id)) + 1 : 1
    };
    mockStudents.push(newStudent);
    toast({
      title: "Aluno criado",
      description: `${newStudent.name} foi adicionado com sucesso`
    });
    return newStudent;
  },
  
  // Atualizar aluno existente
  updateStudent: async (id: number, studentData: Partial<Student>): Promise<Student | null> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const index = mockStudents.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    mockStudents[index] = { ...mockStudents[index], ...studentData };
    toast({
      title: "Aluno atualizado",
      description: `Informações do aluno atualizadas com sucesso`
    });
    return mockStudents[index];
  },
  
  // Excluir aluno
  deleteStudent: async (id: number): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const initialLength = mockStudents.length;
    mockStudents = mockStudents.filter(s => s.id !== id);
    
    const success = mockStudents.length < initialLength;
    if (success) {
      toast({
        title: "Aluno removido",
        description: "O aluno foi removido com sucesso"
      });
    }
    return success;
  }
};
