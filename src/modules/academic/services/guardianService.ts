
import { supabase } from '@/integrations/supabase/client';

export type GuardianRelationship = 
  'father' | 
  'mother' | 
  'uncle' | 
  'aunt' | 
  'brother' | 
  'sister' | 
  'grandfather' | 
  'grandmother' | 
  'legal_guardian' | 
  'other';

export interface Guardian {
  id: string;
  profile_id: string;
  occupation?: string;
  workplace?: string;
  emergency_contact: boolean;
  created_at?: string;
  updated_at?: string;
  profile?: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
  };
}

export interface StudentGuardian {
  id: string;
  student_id: string;
  guardian_id: string;
  relationship: GuardianRelationship;
  is_primary: boolean;
  created_at?: string;
  updated_at?: string;
}

export const guardianService = {
  async listGuardians() {
    const { data, error } = await supabase
      .from('guardians')
      .select(`
        *,
        profile:profiles(first_name, last_name, email, phone)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Guardian[];
  },

  async getGuardian(id: string) {
    const { data, error } = await supabase
      .from('guardians')
      .select(`
        *,
        profile:profiles(first_name, last_name, email, phone, address, city, state, country, postal_code)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Guardian;
  },

  async createGuardian(guardian: Omit<Guardian, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('guardians')
      .insert(guardian)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateGuardian(id: string, guardian: Partial<Omit<Guardian, 'id' | 'created_at' | 'updated_at'>>) {
    const { data, error } = await supabase
      .from('guardians')
      .update(guardian)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getStudentsByGuardian(guardianId: string) {
    const { data, error } = await supabase
      .from('student_guardians')
      .select(`
        *,
        student:students(
          id, 
          student_id,
          profile:profiles(first_name, last_name)
        )
      `)
      .eq('guardian_id', guardianId);

    if (error) throw error;
    return data;
  },

  async linkStudentGuardian(studentGuardian: Omit<StudentGuardian, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('student_guardians')
      .insert(studentGuardian)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async unlinkStudentGuardian(id: string) {
    const { error } = await supabase
      .from('student_guardians')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
