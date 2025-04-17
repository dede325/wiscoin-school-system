
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type UserRole = 'student' | 'teacher' | 'guardian' | 'staff' | 'admin' | 'super_admin';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: UserRole[];
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  requiredRoles = [],
  redirectTo = '/auth/login'
}: ProtectedRouteProps) => {
  const { user, loading, hasAnyRole } = useAuth();
  const location = useLocation();

  if (loading) {
    // Mostrar um indicador de carregamento enquanto verifica a autenticação
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  // Se o usuário não está autenticado, redirecionar para login
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Se não há papéis exigidos, permitir acesso
  if (requiredRoles.length === 0) {
    return <>{children}</>;
  }

  // Verificar se o usuário tem pelo menos um dos papéis necessários
  if (hasAnyRole(requiredRoles)) {
    return <>{children}</>;
  }

  // Se o usuário está autenticado mas não tem permissão, redirecionar para o dashboard
  return <Navigate to="/dashboard" replace />;
};
