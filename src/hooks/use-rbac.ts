
import { useAuth } from '@/contexts/AuthContext';

// Define the UserRole type to match our Supabase enum
export type UserRole = 'student' | 'teacher' | 'guardian' | 'staff' | 'admin' | 'super_admin';

export const useRBAC = () => {
  const { roles, hasRole, hasAnyRole } = useAuth();

  // Verifica se o usuário é um aluno
  const isStudent = (): boolean => hasRole('student');

  // Verifica se o usuário é um professor
  const isTeacher = (): boolean => hasRole('teacher');

  // Verifica se o usuário é um encarregado de educação
  const isGuardian = (): boolean => hasRole('guardian');

  // Verifica se o usuário é um funcionário
  const isStaff = (): boolean => hasRole('staff');

  // Verifica se o usuário é um administrador
  const isAdmin = (): boolean => hasRole('admin');

  // Verifica se o usuário é um super administrador
  const isSuperAdmin = (): boolean => hasRole('super_admin');

  // Verifica se o usuário tem uma função administrativa (admin ou super_admin)
  const isAdminLevel = (): boolean => hasAnyRole(['admin', 'super_admin']);

  // Verifica se o usuário tem uma função de staff (admin, super_admin ou staff)
  const isStaffLevel = (): boolean => hasAnyRole(['admin', 'super_admin', 'staff']);

  // Verifica se o usuário tem uma função acadêmica (admin, super_admin, staff ou teacher)
  const isAcademicLevel = (): boolean => 
    hasAnyRole(['admin', 'super_admin', 'staff', 'teacher']);

  return {
    roles,
    hasRole,
    hasAnyRole,
    isStudent,
    isTeacher,
    isGuardian,
    isStaff,
    isAdmin,
    isSuperAdmin,
    isAdminLevel,
    isStaffLevel,
    isAcademicLevel
  };
};
