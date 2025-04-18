
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export interface Classroom {
  id: string;
  name: string;
  room_number?: string;
  capacity: number;
  academic_year: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export const classroomService = {
  async listClassrooms() {
    const { data, error } = await supabase
      .from('classrooms')
      .select('*')
      .order('name');

    if (error) throw error;
    return data as Classroom[];
  },

  async createClassroom(classroom: Omit<Classroom, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('classrooms')
      .insert(classroom)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
