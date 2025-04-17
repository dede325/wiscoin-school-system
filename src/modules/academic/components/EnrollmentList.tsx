
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
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
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { Enrollment, enrollmentService } from '../services/enrollmentService';
import { NewEnrollmentDialog } from './NewEnrollmentDialog';

export function EnrollmentList() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrollments = async () => {
    try {
      const data = await enrollmentService.listEnrollments();
      setEnrollments(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load enrollments',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await enrollmentService.updateEnrollmentStatus(id, newStatus);
      toast({
        title: 'Success',
        description: 'Enrollment status updated successfully',
      });
      fetchEnrollments();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update enrollment status',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Enrollments</CardTitle>
        <CardDescription>Manage student enrollments and class assignments</CardDescription>
        <NewEnrollmentDialog onEnrollmentCreated={fetchEnrollments} />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-4">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell>
                    {enrollment.student?.profile.first_name} {enrollment.student?.profile.last_name}
                  </TableCell>
                  <TableCell>{enrollment.class?.name}</TableCell>
                  <TableCell>{enrollment.academic_year}</TableCell>
                  <TableCell>{enrollment.status}</TableCell>
                  <TableCell>
                    {enrollment.status === 'active' ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleStatusUpdate(enrollment.id, 'inactive')}
                      >
                        <XCircle className="h-4 w-4 text-destructive" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleStatusUpdate(enrollment.id, 'active')}
                      >
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
