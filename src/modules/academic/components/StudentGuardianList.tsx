
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, Link as LinkIcon, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useRBAC } from '@/hooks/use-rbac';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface StudentWithGuardian {
  student: {
    id: string;
    student_id: string;
    profile: {
      id: string;
      first_name: string;
      last_name: string;
    }
  };
  guardians: {
    id: string;
    is_primary: boolean;
    relationship: string;
    guardian: {
      id: string;
      profile: {
        id: string;
        first_name: string;
        last_name: string;
      }
    }
  }[];
}

export function StudentGuardianList() {
  const [studentGuardians, setStudentGuardians] = useState<StudentWithGuardian[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [guardianEmail, setGuardianEmail] = useState('');
  const [relationship, setRelationship] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);
  const { toast } = useToast();
  const { isAdminLevel, isStaffLevel } = useRBAC();
  const canManage = isAdminLevel() || isStaffLevel();

  useEffect(() => {
    fetchStudentGuardians();
  }, []);

  const fetchStudentGuardians = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('students')
        .select(`
          id, 
          student_id,
          profile:profiles(id, first_name, last_name),
          guardians:student_guardians(
            id,
            is_primary,
            relationship,
            guardian:guardians(
              id,
              profile:profiles(id, first_name, last_name)
            )
          )
        `)
        .order('student_id');

      if (error) throw error;

      const formattedData: StudentWithGuardian[] = data.map((item: any) => ({
        student: {
          id: item.id,
          student_id: item.student_id,
          profile: item.profile
        },
        guardians: item.guardians
      }));

      setStudentGuardians(formattedData);
    } catch (error) {
      console.error('Error fetching student-guardian relationships:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as relações aluno-encarregado',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGuardian = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !guardianEmail || !relationship) return;
    
    try {
      // First find guardian profile by email
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', guardianEmail)
        .single();
        
      if (profileError) throw new Error('Encarregado de educação não encontrado com este email');
      
      // Check if guardian exists
      const { data: guardianData, error: guardianError } = await supabase
        .from('guardians')
        .select('id')
        .eq('profile_id', profileData.id)
        .single();
        
      let guardianId;
        
      if (guardianError) {
        // Create guardian if doesn't exist
        const { data: newGuardian, error: createError } = await supabase
          .from('guardians')
          .insert({
            profile_id: profileData.id,
            emergency_contact: isPrimary
          })
          .select('id')
          .single();
          
        if (createError) throw createError;
        guardianId = newGuardian.id;
      } else {
        guardianId = guardianData.id;
      }
      
      // Create student-guardian relationship
      const { error: relationError } = await supabase
        .from('student_guardians')
        .insert({
          student_id: selectedStudent,
          guardian_id: guardianId,
          relationship: relationship,
          is_primary: isPrimary
        });
        
      if (relationError) throw relationError;
      
      toast({
        title: 'Sucesso',
        description: 'Encarregado de educação associado com sucesso'
      });
      
      // Refresh data
      fetchStudentGuardians();
      
      // Reset form
      setSelectedStudent(null);
      setGuardianEmail('');
      setRelationship('');
      setIsPrimary(false);
      
    } catch (error: any) {
      console.error('Error adding guardian:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Não foi possível adicionar o encarregado',
        variant: 'destructive',
      });
    }
  };

  const formatRelationship = (relationship: string) => {
    return relationship.charAt(0).toUpperCase() + relationship.slice(1).replace('_', ' ');
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Relações Aluno ↔ Encarregados</h1>
        
        {canManage && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Associar Encarregado
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Associar Encarregado a Aluno</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleAddGuardian} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Aluno</Label>
                  <Select 
                    onValueChange={(value) => setSelectedStudent(value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o aluno" />
                    </SelectTrigger>
                    <SelectContent>
                      {studentGuardians.map((item) => (
                        <SelectItem key={item.student.id} value={item.student.id}>
                          {item.student.profile.first_name} {item.student.profile.last_name} ({item.student.student_id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="guardian-email">Email do Encarregado</Label>
                  <Input 
                    id="guardian-email" 
                    type="email" 
                    value={guardianEmail}
                    onChange={(e) => setGuardianEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relação</Label>
                  <Select 
                    onValueChange={(value) => setRelationship(value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a relação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="father">Pai</SelectItem>
                      <SelectItem value="mother">Mãe</SelectItem>
                      <SelectItem value="uncle">Tio</SelectItem>
                      <SelectItem value="aunt">Tia</SelectItem>
                      <SelectItem value="brother">Irmão</SelectItem>
                      <SelectItem value="sister">Irmã</SelectItem>
                      <SelectItem value="grandfather">Avô</SelectItem>
                      <SelectItem value="grandmother">Avó</SelectItem>
                      <SelectItem value="legal_guardian">Tutor Legal</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is-primary"
                    checked={isPrimary}
                    onChange={(e) => setIsPrimary(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="is-primary">Encarregado Principal</Label>
                </div>
                
                <Button type="submit" className="w-full">
                  Associar
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <div className="grid gap-6">
        {studentGuardians.map((item) => (
          <Card key={item.student.id}>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <span>
                    {item.student.profile.first_name} {item.student.profile.last_name}
                  </span>
                  <Badge>ID: {item.student.student_id}</Badge>
                </div>
              </CardTitle>
              <CardDescription>
                Encarregados de Educação Associados: {item.guardians.length}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableCaption>Lista de Encarregados de Educação</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Relação</TableHead>
                    <TableHead>Principal</TableHead>
                    {canManage && <TableHead className="text-right">Ações</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {item.guardians.length > 0 ? (
                    item.guardians.map((guardian) => (
                      <TableRow key={guardian.id}>
                        <TableCell>
                          {guardian.guardian.profile.first_name} {guardian.guardian.profile.last_name}
                        </TableCell>
                        <TableCell>{formatRelationship(guardian.relationship)}</TableCell>
                        <TableCell>
                          {guardian.is_primary ? 'Sim' : 'Não'}
                        </TableCell>
                        {canManage && (
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/admin/guardians/${guardian.guardian.id}`}>
                                <LinkIcon className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={canManage ? 4 : 3} className="text-center">
                        Nenhum encarregado associado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
