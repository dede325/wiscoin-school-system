
import { useRBAC } from "@/hooks/use-rbac";
import { RoleManager } from "@/components/admin/RoleManager";
import { redirect } from "react-router-dom";

export default function RoleManagement() {
  const { isAdminLevel } = useRBAC();
  
  if (!isAdminLevel()) {
    redirect('/dashboard');
    return null;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">Gerenciamento de Papéis</h1>
      <RoleManager />
    </div>
  );
}
