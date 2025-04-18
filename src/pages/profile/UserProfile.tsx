
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Upload, User, Moon, Sun } from "lucide-react";
import { useRBAC } from "@/hooks/use-rbac";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postal_code: string | null;
  profile_image_url: string | null;
  date_of_birth: string | null;
}

export default function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { roles } = useRBAC();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    
    fetchProfile();
    
    // Get current theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
        
      if (error) throw error;
      
      if (data) {
        setProfile(data);
        if (data.profile_image_url) {
          setImagePreview(data.profile_image_url);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados do perfil",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const uploadProfileImage = async (): Promise<string | null> => {
    if (!imageFile || !user?.id) return null;
    
    try {
      const fileExt = imageFile.name.split('.').pop();
      const filePath = `profile-images/${user.id}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, imageFile);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a imagem",
        variant: "destructive",
      });
      return null;
    }
  };
  
  const saveProfile = async () => {
    if (!profile || !user?.id) return;
    
    try {
      setIsSaving(true);
      
      let profileImageUrl = profile.profile_image_url;
      
      if (imageFile) {
        const uploadedUrl = await uploadProfileImage();
        if (uploadedUrl) {
          profileImageUrl = uploadedUrl;
        }
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({
          ...profile,
          profile_image_url: profileImageUrl,
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast({
        title: "Perfil atualizado",
        description: "As suas informações foram atualizadas com sucesso",
      });
      
      // Update profile with new image URL
      setProfile(prev => prev ? { ...prev, profile_image_url: profileImageUrl } : null);
      setImageFile(null);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as alterações",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const changeTheme = (newTheme: string) => {
    document.body.classList.remove('theme-default', 'theme-tabler');
    document.body.classList.add(`theme-${newTheme}`);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };
  
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Perfil do Utilizador</h1>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Foto de Perfil</CardTitle>
              <CardDescription>Atualize sua foto de perfil</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={imagePreview || undefined} />
                <AvatarFallback className="text-4xl">
                  <User size={64} />
                </AvatarFallback>
              </Avatar>
              
              <div className="mt-6 w-full">
                <Label htmlFor="profile-image" className="mb-2 block">
                  Carregar nova imagem
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tema Visual</CardTitle>
              <CardDescription>Personalize a aparência do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Button
                  variant={theme === 'default' ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => changeTheme('default')}
                >
                  <Sun className="mr-2 h-4 w-4" />
                  Claro (Padrão)
                </Button>
                <Button
                  variant={theme === 'tabler' ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => changeTheme('tabler')}
                >
                  <Moon className="mr-2 h-4 w-4" />
                  Escuro
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Função</CardTitle>
              <CardDescription>Seu perfil no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {roles.map((role, index) => (
                  <div key={index} className="rounded-md bg-secondary px-3 py-1 font-medium">
                    {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize seus dados pessoais</CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="mx-6 grid w-[400px] grid-cols-2">
                <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
                <TabsTrigger value="contact">Contato e Endereço</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">Nome</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={profile?.first_name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Sobrenome</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={profile?.last_name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile?.email || ''}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Data de Nascimento</Label>
                    <Input
                      id="date_of_birth"
                      name="date_of_birth"
                      type="date"
                      value={profile?.date_of_birth || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profile?.phone || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      name="address"
                      value={profile?.address || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      name="city"
                      value={profile?.city || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado/Província</Label>
                    <Input
                      id="state"
                      name="state"
                      value={profile?.state || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="postal_code">Código Postal</Label>
                    <Input
                      id="postal_code"
                      name="postal_code"
                      value={profile?.postal_code || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Input
                      id="country"
                      name="country"
                      value={profile?.country || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <Separator className="my-4" />
              
              <CardFooter>
                <Button 
                  onClick={saveProfile} 
                  disabled={isSaving}
                  className="ml-auto"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      A guardar...
                    </>
                  ) : (
                    'Guardar Alterações'
                  )}
                </Button>
              </CardFooter>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
