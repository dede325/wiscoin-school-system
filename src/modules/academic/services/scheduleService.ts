
import { supabase } from '@/integrations/supabase/client';

export interface Schedule {
  id: string;
  classroom_id: string;
  subject_id: string;
  teacher_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  room?: string;
  created_at?: string;
  updated_at?: string;
  classroom?: {
    name: string;
  };
  subject?: {
    name: string;
  };
  teacher?: {
    profile: {
      first_name: string;
      last_name: string;
    };
  };
}

export const scheduleService = {
  async listSchedules() {
    const { data, error } = await supabase
      .from('schedules')
      .select(`
        *,
        classroom:classrooms(name),
        subject:subjects(name),
        teacher:staff(
          profile:profiles(
            first_name,
            last_name
          )
        )
      `)
      .order('day_of_week')
      .order('start_time');

    if (error) throw error;
    return data as Schedule[];
  },

  async createSchedule(schedule: Omit<Schedule, 'id' | 'created_at' | 'updated_at' | 'classroom' | 'subject' | 'teacher'>) {
    const { data, error } = await supabase
      .from('schedules')
      .insert(schedule)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
