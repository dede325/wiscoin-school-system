
import { supabase } from '@/integrations/supabase/client';

export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  credits: number;
  status: string;
}

export const subjectService = {
  async listSubjects() {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('name');

    if (error) throw error;
    return data as Subject[];
  },

  async createSubject(subject: Omit<Subject, 'id'>) {
    const { data, error } = await supabase
      .from('subjects')
      .insert(subject)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
