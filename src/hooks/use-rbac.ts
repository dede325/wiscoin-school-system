
import { useAuth } from '@/contexts/AuthContext';

// Update the UserRole type to match all the required roles
export type UserRole = 
  'super_admin' | 
  'admin' | 
  'staff' | 
  'teacher' | 
  'student' | 
  'guardian' | 
  'employee' | 
  'driver' | 
  'cleaner' | 
  'manager' | 
  'director';

export const useRBAC = () => {
  const { roles, hasRole, hasAnyRole } = useAuth();

  // Verify if user is a student
  const isStudent = (): boolean => hasRole('student');

  // Verify if user is a teacher
  const isTeacher = (): boolean => hasRole('teacher');

  // Verify if user is a guardian
  const isGuardian = (): boolean => hasRole('guardian');

  // Verify if user is an employee
  const isEmployee = (): boolean => hasRole('employee');

  // Verify if user is a driver
  const isDriver = (): boolean => hasRole('driver');

  // Verify if user is cleaner staff
  const isCleaner = (): boolean => hasRole('cleaner');

  // Verify if user is a manager
  const isManager = (): boolean => hasRole('manager');

  // Verify if user is a director
  const isDirector = (): boolean => hasRole('director');

  // Verify if user is a staff member (general staff role)
  const isStaff = (): boolean => hasRole('staff');

  // Verify if user is an admin
  const isAdmin = (): boolean => hasRole('admin');

  // Verify if user is a super admin
  const isSuperAdmin = (): boolean => hasRole('super_admin');

  // Verify if user has an administrative role (admin or super_admin)
  const isAdminLevel = (): boolean => hasAnyRole(['admin', 'super_admin']);

  // Verify if user has a staff level role (includes management positions)
  const isStaffLevel = (): boolean => 
    hasAnyRole(['admin', 'super_admin', 'staff', 'director', 'manager']);

  // Verify if user has an academic role (staff related to academic activities)
  const isAcademicLevel = (): boolean => 
    hasAnyRole(['admin', 'super_admin', 'staff', 'teacher']);

  return {
    roles,
    hasRole,
    hasAnyRole,
    isStudent,
    isTeacher,
    isGuardian,
    isEmployee,
    isDriver,
    isCleaner,
    isManager,
    isDirector,
    isStaff,
    isAdmin,
    isSuperAdmin,
    isAdminLevel,
    isStaffLevel,
    isAcademicLevel
  };
};
