import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';
import { Class, enrollmentService } from '../services/enrollmentService';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface NewEnrollmentDialogProps {
  onEnrollmentCreated: () => void;
}

export function NewEnrollmentDialog({ onEnrollmentCreated }: NewEnrollmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  const { data: classes = [] } = useQuery<Class[]>({
    queryKey: ['classes'],
    queryFn: () => enrollmentService.listClasses(),
  });

  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('students')
        .select(`
          id,
          profile:profiles(
            first_name,
            last_name
          )
        `);
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async () => {
    try {
      const selectedClassData = classes.find(c => c.id === selectedClass);
      
      await enrollmentService.createEnrollment({
        student_id: selectedStudent,
        class_id: selectedClass,
        academic_year: selectedClassData?.academic_year || new Date().getFullYear().toString(),
        status: 'active',
        enrollment_date: new Date().toISOString(),
      });

      toast({
        title: 'Success',
        description: 'Enrollment created successfully',
      });
      
      setOpen(false);
      onEnrollmentCreated();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create enrollment',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          New Enrollment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Enrollment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="student">Student</label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger>
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.profile.first_name} {student.profile.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="class">Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name} ({cls.academic_year})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedStudent || !selectedClass}>
            Create Enrollment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
