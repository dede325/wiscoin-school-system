
import { useState, useEffect } from 'react';
import { Check, Loader2, UserPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useRBAC, UserRole } from '@/hooks/use-rbac';

type UserWithRoles = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
};

export function RoleManager() {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [addingRole, setAddingRole] = useState(false);
  const { isAdminLevel } = useRBAC();

  // Buscar usuários e seus papéis
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Buscar perfis de usuários
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name');

      if (profilesError) throw profilesError;

      // Para cada perfil, buscar os papéis
      const usersWithRoles = await Promise.all(
        profiles.map(async (profile) => {
          const { data: userRoles, error: rolesError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', profile.id);

          if (rolesError) throw rolesError;

          return {
            id: profile.id,
            email: profile.email,
            firstName: profile.first_name,
            lastName: profile.last_name,
            roles: userRoles ? userRoles.map(r => r.role) : [],
          };
        })
      );

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users and roles:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os usuários e seus papéis.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Adicionar um papel a um usuário
  const addRoleToUser = async () => {
    if (!email || !role) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Email e papel são obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    setAddingRole(true);
    
    try {
      // Buscar o ID do usuário pelo email
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (profileError) {
        toast({
          title: 'Usuário não encontrado',
          description: 'Não foi possível encontrar um usuário com este email.',
          variant: 'destructive',
        });
        return;
      }

      // Adicionar o papel ao usuário - corrigindo o tipo do role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: profiles.id,
          role: role as UserRole, // Especificando o tipo corretamente
        });

      if (roleError) {
        // Verificar se é um erro de duplicação
        if (roleError.code === '23505') {
          toast({
            title: 'Papel já atribuído',
            description: 'Este usuário já possui este papel.',
            variant: 'destructive',
          });
        } else {
          throw roleError;
        }
      } else {
        toast({
          title: 'Papel adicionado',
          description: `O papel ${role} foi adicionado ao usuário com sucesso.`,
        });
        
        setEmail('');
        setRole('');
        fetchUsers(); // Atualizar a lista
      }
    } catch (error) {
      console.error('Error adding role to user:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao adicionar o papel ao usuário.',
        variant: 'destructive',
      });
    } finally {
      setAddingRole(false);
    }
  };

  // Remover um papel de um usuário
  const removeRoleFromUser = async (userId: string, roleToRemove: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', roleToRemove as UserRole); // Corrigindo o tipo aqui também

      if (error) throw error;

      toast({
        title: 'Papel removido',
        description: `O papel ${roleToRemove} foi removido do usuário com sucesso.`,
      });

      // Atualizar a lista de usuários
      setUsers(users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            roles: user.roles.filter(r => r !== roleToRemove)
          };
        }
        return user;
      }));
    } catch (error) {
      console.error('Error removing role from user:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao remover o papel do usuário.',
        variant: 'destructive',
      });
    }
  };

  // Carregar usuários ao montar o componente
  useEffect(() => {
    if (isAdminLevel()) {
      fetchUsers();
    }
  }, [isAdminLevel]);

  // Mostrar mensagem se o usuário não tiver permissão
  if (!isAdminLevel()) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Acesso Negado</CardTitle>
          <CardDescription>
            Você não tem permissão para acessar esta página.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Papel a Usuário</CardTitle>
          <CardDescription>
            Atribua papéis aos usuários do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email do Usuário</Label>
              <Input
                id="email"
                placeholder="usuario@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Papel</Label>
              <Select 
                value={role} 
                onValueChange={(value: UserRole | '') => setRole(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um papel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Aluno</SelectItem>
                  <SelectItem value="teacher">Professor</SelectItem>
                  <SelectItem value="guardian">Encarregado de Educação</SelectItem>
                  <SelectItem value="staff">Funcionário</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="super_admin">Super Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={addRoleToUser}
            disabled={addingRole || !email || !role}
          >
            {addingRole ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adicionando...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Adicionar Papel
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usuários e Seus Papéis</CardTitle>
          <CardDescription>
            Gerencie os papéis dos usuários do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Papéis</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        Nenhum usuário encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                              <span
                                key={`${user.id}-${role}`}
                                className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                              >
                                {role}
                                <button
                                  onClick={() => removeRoleFromUser(user.id, role)}
                                  className="ml-1 text-primary hover:text-primary/70"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                            {user.roles.length === 0 && (
                              <span className="text-xs text-muted-foreground">
                                Sem papéis atribuídos
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => fetchUsers()}
                          >
                            <Check className="h-4 w-4 text-green-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
