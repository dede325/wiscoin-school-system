
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Shield, Users, CreditCard, BarChart, BookMarked, ChefHat, LibraryBig, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">WiSchool</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Funcionalidades
            </Link>
            <Link to="#modules" className="text-sm font-medium transition-colors hover:text-primary">
              Módulos
            </Link>
            <Link to="#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contacto
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/auth/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link to="/dashboard">
              <Button>Demonstração</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 place-items-center gap-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Sistema Completo de 
              <span className="text-primary"> Gestão Escolar</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Uma plataforma integrada para administração acadêmica, financeira, e operacional para instituições de ensino em Angola.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth/login">
                <Button size="lg" className="gap-2">
                  Começar agora
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline">
                  Ver demonstração
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative w-full h-[400px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
            <div className="absolute w-60 h-60 bg-primary/30 rounded-lg transform rotate-6"></div>
            <div className="absolute z-10 bg-white dark:bg-gray-900 shadow-xl rounded-xl p-6 w-[300px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl">Dashboard</h3>
                <Button variant="outline" size="icon">
                  <BarChart className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="p-2 bg-primary/10 rounded flex justify-between">
                  <span>Alunos</span>
                  <span className="font-semibold">2,345</span>
                </div>
                <div className="p-2 bg-green-500/10 rounded flex justify-between">
                  <span>Propinas</span>
                  <span className="font-semibold">15.2M AOA</span>
                </div>
                <div className="p-2 bg-blue-500/10 rounded flex justify-between">
                  <span>Aproveitamento</span>
                  <span className="font-semibold">76%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/50 py-16 sm:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Funcionalidades Principais</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Um sistema completo e integrado para atender todas as necessidades de gestão escolar em Angola.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-none">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Seguro & Confiável</h3>
                <p className="text-muted-foreground">
                  Sistema seguro com múltiplos níveis de acesso e autenticação para proteger dados sensíveis.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Multi-Instituição</h3>
                <p className="text-muted-foreground">
                  Suporte para gerenciar múltiplas escolas com bases de dados independentes e configurações personalizadas.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none">
              <CardContent className="p-6">
                <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pagamentos Flexíveis</h3>
                <p className="text-muted-foreground">
                  Sistema de pagamento em múltiplas moedas (AOA, EUR, USD) e com a moeda interna Wiscoin.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-16 sm:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Módulos do Sistema</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma solução completa com módulos integrados para uma gestão escolar eficiente.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="font-bold mb-1">Gestão Académica</h3>
              <p className="text-sm text-muted-foreground">Alunos, turmas, notas e histórico acadêmico</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-500">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="font-bold mb-1">Pagamentos</h3>
              <p className="text-sm text-muted-foreground">Propinas, taxas e comprovantes automáticos</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-500">
                <BarChart className="h-8 w-8" />
              </div>
              <h3 className="font-bold mb-1">Contabilidade</h3>
              <p className="text-sm text-muted-foreground">SAF-T Angola, relatórios fiscais e financeiros</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4 text-yellow-500">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-bold mb-1">Recursos Humanos</h3>
              <p className="text-sm text-muted-foreground">Contratos, férias, INSS e IRT (Angola)</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 text-purple-500">
                <BookMarked className="h-8 w-8" />
              </div>
              <h3 className="font-bold mb-1">Wiscoin</h3>
              <p className="text-sm text-muted-foreground">Moeda interna para pagamentos e transações</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-4 text-orange-500">
                <ChefHat className="h-8 w-8" />
              </div>
              <h3 className="font-bold mb-1">Cozinha</h3>
              <p className="text-sm text-muted-foreground">Ementas, stock de alimentos e custos</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500">
                <LibraryBig className="h-8 w-8" />
              </div>
              <h3 className="font-bold mb-1">Biblioteca</h3>
              <p className="text-sm text-muted-foreground">Catálogo, empréstimos e devoluções</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mb-4 text-teal-500">
                <Building className="h-8 w-8" />
              </div>
              <h3 className="font-bold mb-1">Multi-Instituição</h3>
              <p className="text-sm text-muted-foreground">Gestão de várias escolas e polos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para Transformar sua Gestão Escolar?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Experimente o WiSchool hoje e descubra como nossa plataforma pode otimizar a administração da sua instituição de ensino.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/login">
              <Button size="lg" variant="secondary" className="gap-2">
                Começar agora
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10">
                Ver demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-muted py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">WiSchool</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Sistema completo de gestão escolar para instituições de ensino em Angola.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/auth/login" className="text-muted-foreground hover:text-primary">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="#features" className="text-muted-foreground hover:text-primary">
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link to="#modules" className="text-muted-foreground hover:text-primary">
                    Módulos
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Contacto</h3>
              <address className="text-muted-foreground not-italic">
                <p>Luanda, Angola</p>
                <p>Email: info@wischool.ao</p>
                <p>Tel: +244 923 456 789</p>
              </address>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 WiSchool. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
