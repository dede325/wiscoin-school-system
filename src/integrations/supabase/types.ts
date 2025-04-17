export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      book_checkouts: {
        Row: {
          book_id: string
          checkout_date: string
          created_at: string
          due_date: string
          fine_amount: number | null
          fine_paid: boolean | null
          id: string
          return_date: string | null
          status: string
          student_id: string | null
          teacher_id: string | null
          updated_at: string
        }
        Insert: {
          book_id: string
          checkout_date?: string
          created_at?: string
          due_date: string
          fine_amount?: number | null
          fine_paid?: boolean | null
          id?: string
          return_date?: string | null
          status?: string
          student_id?: string | null
          teacher_id?: string | null
          updated_at?: string
        }
        Update: {
          book_id?: string
          checkout_date?: string
          created_at?: string
          due_date?: string
          fine_amount?: number | null
          fine_paid?: boolean | null
          id?: string
          return_date?: string | null
          status?: string
          student_id?: string | null
          teacher_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_checkouts_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          author: string
          available_quantity: number
          category: string | null
          created_at: string
          description: string | null
          id: string
          isbn: string | null
          location_shelf: string | null
          publication_year: number | null
          publisher: string | null
          quantity: number
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          available_quantity?: number
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          isbn?: string | null
          location_shelf?: string | null
          publication_year?: number | null
          publisher?: string | null
          quantity?: number
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          available_quantity?: number
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          isbn?: string | null
          location_shelf?: string | null
          publication_year?: number | null
          publisher?: string | null
          quantity?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cryptocurrency_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          from_wallet_id: string | null
          id: string
          status: string
          to_wallet_id: string
          type: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          from_wallet_id?: string | null
          id?: string
          status?: string
          to_wallet_id: string
          type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          from_wallet_id?: string | null
          id?: string
          status?: string
          to_wallet_id?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cryptocurrency_transactions_from_wallet_id_fkey"
            columns: ["from_wallet_id"]
            isOneToOne: false
            referencedRelation: "cryptocurrency_wallets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cryptocurrency_transactions_to_wallet_id_fkey"
            columns: ["to_wallet_id"]
            isOneToOne: false
            referencedRelation: "cryptocurrency_wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      cryptocurrency_wallets: {
        Row: {
          address: string
          balance: number
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          balance?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          balance?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          created_at: string
          department_id: string | null
          email: string | null
          employee_code: string
          first_name: string
          hire_date: string
          id: string
          last_name: string
          phone: string | null
          position: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          email?: string | null
          employee_code: string
          first_name: string
          hire_date: string
          id?: string
          last_name: string
          phone?: string | null
          position: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department_id?: string | null
          email?: string | null
          employee_code?: string
          first_name?: string
          hire_date?: string
          id?: string
          last_name?: string
          phone?: string | null
          position?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      fee_payments: {
        Row: {
          academic_year: string | null
          amount_paid: number
          created_at: string | null
          fee_type_id: string
          id: string
          notes: string | null
          payment_date: string | null
          payment_method: string
          reference_number: string | null
          status: string
          student_id: string
          term: string | null
          updated_at: string | null
        }
        Insert: {
          academic_year?: string | null
          amount_paid: number
          created_at?: string | null
          fee_type_id: string
          id?: string
          notes?: string | null
          payment_date?: string | null
          payment_method: string
          reference_number?: string | null
          status?: string
          student_id: string
          term?: string | null
          updated_at?: string | null
        }
        Update: {
          academic_year?: string | null
          amount_paid?: number
          created_at?: string | null
          fee_type_id?: string
          id?: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string
          reference_number?: string | null
          status?: string
          student_id?: string
          term?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fee_payments_fee_type_id_fkey"
            columns: ["fee_type_id"]
            isOneToOne: false
            referencedRelation: "fee_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fee_payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      fee_types: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          frequency: string
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          amount?: number
          created_at?: string | null
          description?: string | null
          frequency: string
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          frequency?: string
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      guardian_accounts: {
        Row: {
          auth_id: string | null
          can_pickup_student: boolean
          can_view_attendance: boolean
          can_view_behavior: boolean
          can_view_fees: boolean
          can_view_grades: boolean
          created_at: string
          id: string
          notes: string | null
          profile_id: string
          relationship: Database["public"]["Enums"]["guardian_relationship"]
          updated_at: string
        }
        Insert: {
          auth_id?: string | null
          can_pickup_student?: boolean
          can_view_attendance?: boolean
          can_view_behavior?: boolean
          can_view_fees?: boolean
          can_view_grades?: boolean
          created_at?: string
          id?: string
          notes?: string | null
          profile_id: string
          relationship: Database["public"]["Enums"]["guardian_relationship"]
          updated_at?: string
        }
        Update: {
          auth_id?: string | null
          can_pickup_student?: boolean
          can_view_attendance?: boolean
          can_view_behavior?: boolean
          can_view_fees?: boolean
          can_view_grades?: boolean
          created_at?: string
          id?: string
          notes?: string | null
          profile_id?: string
          relationship?: Database["public"]["Enums"]["guardian_relationship"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guardian_accounts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      guardian_students: {
        Row: {
          created_at: string
          guardian_id: string
          id: string
          is_primary: boolean
          student_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          guardian_id: string
          id?: string
          is_primary?: boolean
          student_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          guardian_id?: string
          id?: string
          is_primary?: boolean
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guardian_students_guardian_id_fkey"
            columns: ["guardian_id"]
            isOneToOne: false
            referencedRelation: "guardian_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guardian_students_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      guardians: {
        Row: {
          created_at: string
          emergency_contact: boolean
          id: string
          occupation: string | null
          profile_id: string
          updated_at: string
          workplace: string | null
        }
        Insert: {
          created_at?: string
          emergency_contact?: boolean
          id?: string
          occupation?: string | null
          profile_id: string
          updated_at?: string
          workplace?: string | null
        }
        Update: {
          created_at?: string
          emergency_contact?: boolean
          id?: string
          occupation?: string | null
          profile_id?: string
          updated_at?: string
          workplace?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guardians_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          postal_code: string | null
          profile_image_url: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone?: string | null
          postal_code?: string | null
          profile_image_url?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          postal_code?: string | null
          profile_image_url?: string | null
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sms_messages: {
        Row: {
          created_at: string | null
          delivered_at: string | null
          id: string
          message: string
          sent_at: string | null
          status: string
          to_number: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          delivered_at?: string | null
          id?: string
          message: string
          sent_at?: string | null
          status?: string
          to_number: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          delivered_at?: string | null
          id?: string
          message?: string
          sent_at?: string | null
          status?: string
          to_number?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          contract_type: string | null
          created_at: string
          department: string | null
          end_date: string | null
          hire_date: string
          id: string
          position: string
          profile_id: string
          qualifications: string | null
          salary: number | null
          staff_id: string
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          contract_type?: string | null
          created_at?: string
          department?: string | null
          end_date?: string | null
          hire_date: string
          id?: string
          position: string
          profile_id: string
          qualifications?: string | null
          salary?: number | null
          staff_id: string
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          contract_type?: string | null
          created_at?: string
          department?: string | null
          end_date?: string | null
          hire_date?: string
          id?: string
          position?: string
          profile_id?: string
          qualifications?: string | null
          salary?: number | null
          staff_id?: string
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_attendance: {
        Row: {
          created_at: string
          date: string
          id: string
          reason: string | null
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          reason?: string | null
          status: string
          student_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          reason?: string | null
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_guardians: {
        Row: {
          created_at: string
          guardian_id: string
          id: string
          is_primary: boolean
          relationship: Database["public"]["Enums"]["guardian_relationship"]
          student_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          guardian_id: string
          id?: string
          is_primary?: boolean
          relationship: Database["public"]["Enums"]["guardian_relationship"]
          student_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          guardian_id?: string
          id?: string
          is_primary?: boolean
          relationship?: Database["public"]["Enums"]["guardian_relationship"]
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_guardians_guardian_id_fkey"
            columns: ["guardian_id"]
            isOneToOne: false
            referencedRelation: "guardians"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_guardians_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_notifications: {
        Row: {
          created_at: string | null
          enabled: boolean
          id: string
          notification_type: string
          student_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean
          id?: string
          notification_type: string
          student_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          enabled?: boolean
          id?: string
          notification_type?: string
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_notifications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string
          current_grade: string
          enrollment_date: string
          id: string
          profile_id: string
          section: string | null
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_grade: string
          enrollment_date: string
          id?: string
          profile_id: string
          section?: string | null
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_grade?: string
          enrollment_date?: string
          id?: string
          profile_id?: string
          section?: string | null
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      telco_sms_settings: {
        Row: {
          api_key: string
          created_at: string | null
          enabled: boolean | null
          id: string
          sender_id: string
          updated_at: string | null
          webhook_url: string | null
        }
        Insert: {
          api_key: string
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          sender_id: string
          updated_at?: string | null
          webhook_url?: string | null
        }
        Update: {
          api_key?: string
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          sender_id?: string
          updated_at?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          id: string
          language: string | null
          notifications_enabled: boolean | null
          theme: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          language?: string | null
          notifications_enabled?: boolean | null
          theme?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          language?: string | null
          notifications_enabled?: boolean | null
          theme?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          user_id: string
          role_name: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      guardian_relationship:
        | "father"
        | "mother"
        | "uncle"
        | "aunt"
        | "brother"
        | "sister"
        | "grandfather"
        | "grandmother"
        | "legal_guardian"
        | "other"
      user_role: "guardian" | "student" | "staff" | "admin" | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      guardian_relationship: [
        "father",
        "mother",
        "uncle",
        "aunt",
        "brother",
        "sister",
        "grandfather",
        "grandmother",
        "legal_guardian",
        "other",
      ],
      user_role: ["guardian", "student", "staff", "admin", "super_admin"],
    },
  },
} as const
