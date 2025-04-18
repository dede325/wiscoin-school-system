
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeSelector } from "@/themes/theme-context";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Layouts
import MainLayout from "@/components/layout/MainLayout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import RoleManagement from "./pages/admin/RoleManagement";
import UserProfile from "./pages/profile/UserProfile";
import { EnrollmentList } from '@/modules/academic/components/EnrollmentList';
import { SubjectList } from '@/modules/academic/components/SubjectList';
import { StudentGuardianList } from '@/modules/academic/components/StudentGuardianList';

// Importando estilos dos temas
import '@/themes/default/theme-styles.css';
import '@/themes/tabler/theme-styles.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeSelector>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              
              {/* Protected Routes */}
              <Route element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<UserProfile />} />
                
                {/* Academic Routes */}
                <Route path="/academic/enrollments" element={
                  <ProtectedRoute requiredRoles={['admin', 'staff', 'teacher']}>
                    <EnrollmentList />
                  </ProtectedRoute>
                } />
                <Route path="/academic/subjects" element={
                  <ProtectedRoute requiredRoles={['admin', 'staff', 'teacher']}>
                    <SubjectList />
                  </ProtectedRoute>
                } />
                <Route path="/academic/student-guardians" element={
                  <ProtectedRoute requiredRoles={['admin', 'staff', 'teacher']}>
                    <StudentGuardianList />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route 
                  path="/admin/roles" 
                  element={
                    <ProtectedRoute requiredRoles={['admin', 'super_admin']}>
                      <RoleManagement />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Add more routes for other modules here */}
              </Route>

              {/* Catch All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeSelector>
  </QueryClientProvider>
);

export default App;
