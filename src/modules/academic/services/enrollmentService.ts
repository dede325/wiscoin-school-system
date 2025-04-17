
import { supabase } from '@/integrations/supabase/client';

export interface Class {
  id: string;
  name: string;
  academic_year: string;
  capacity: number;
  status: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  class_id: string;
  academic_year: string;
  status: string;
  enrollment_date: string;
  student?: {
    profile: {
      first_name: string;
      last_name: string;
    };
  };
  class?: Class;
}

export const enrollmentService = {
  async listEnrollments() {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        student:students(
          profile:profiles(
            first_name,
            last_name
          )
        ),
        class:classes(*)
      `);

    if (error) throw error;
    return data as Enrollment[];
  },

  async createEnrollment(enrollment: Omit<Enrollment, 'id'>) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert(enrollment)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateEnrollmentStatus(id: string, status: string) {
    const { error } = await supabase
      .from('enrollments')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
  },

  async listClasses() {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('name');

    if (error) throw error;
    return data as Class[];
  },

  async createClass(classData: Omit<Class, 'id'>) {
    const { data, error } = await supabase
      .from('classes')
      .insert(classData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
