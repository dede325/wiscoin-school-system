
import { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Student = {
  id: number;
  name: string;
  registration: string;
  class: string;
  status: 'active' | 'inactive' | 'pending';
};

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Ana Silva', registration: '2023001', class: '10A', status: 'active' },
    { id: 2, name: 'Carlos Eduardo', registration: '2023002', class: '10A', status: 'active' },
    { id: 3, name: 'Mariana Luísa', registration: '2023003', class: '10B', status: 'inactive' },
    { id: 4, name: 'João Pedro', registration: '2023004', class: '10B', status: 'pending' }
  ]);

  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Alunos</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Pesquisar alunos..." className="pl-8" />
          </div>
          <Button size="sm">
            <Plus className="mr-1 h-4 w-4" />
            Novo Aluno
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Matrícula</TableHead>
              <TableHead>Turma</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.registration}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.status === 'active' ? 'bg-green-100 text-green-700' :
                    student.status === 'inactive' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {student.status === 'active' ? 'Ativo' :
                     student.status === 'inactive' ? 'Inativo' : 'Pendente'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="ghost" size="sm">Ver</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
