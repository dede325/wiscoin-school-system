
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Users, 
  BookOpen, 
  CreditCard, 
  TrendingUp, 
  BarChart3, 
  BarChart4,
  Calendar
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option>Este mês</option>
            <option>Último mês</option>
            <option>Este trimestre</option>
            <option>Este ano</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Estudantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+5%</span> desde o último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Propinas Pagas</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.2M AOA</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+12%</span> desde o último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Wiscoin em Circulação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">432,120 WIS</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+8%</span> desde o último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Aproveitamento</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+2%</span> desde o último trimestre
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="academic">Acadêmico</TabsTrigger>
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Receitas por Mês</CardTitle>
                <CardDescription>Comparativo dos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16" />
                  <p className="ml-2">Gráfico de Receitas</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Aprovação</CardTitle>
                <CardDescription>Por departamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ensino Primário</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Primeiro Ciclo</span>
                      <span className="text-sm font-medium">84%</span>
                    </div>
                    <Progress value={84} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Segundo Ciclo</span>
                      <span className="text-sm font-medium">76%</span>
                    </div>
                    <Progress value={76} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ensino Técnico</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-1 lg:col-span-5">
              <CardHeader>
                <CardTitle>Transações Recentes</CardTitle>
                <CardDescription>As últimas 5 transações no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground">
                    <div>Transação</div>
                    <div>Data</div>
                    <div className="text-right">Valor</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div>
                      <div className="font-medium">Pagamento de Propina</div>
                      <div className="text-sm text-muted-foreground">Maria Silva</div>
                    </div>
                    <div className="text-sm">24 Abril, 2025</div>
                    <div className="text-right text-emerald-500 font-medium">+45,000 AOA</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div>
                      <div className="font-medium">Pagamento de Propina</div>
                      <div className="text-sm text-muted-foreground">João Santos</div>
                    </div>
                    <div className="text-sm">24 Abril, 2025</div>
                    <div className="text-right text-emerald-500 font-medium">+45,000 AOA</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div>
                      <div className="font-medium">Compra Cantina</div>
                      <div className="text-sm text-muted-foreground">Ana Costa</div>
                    </div>
                    <div className="text-sm">23 Abril, 2025</div>
                    <div className="text-right text-emerald-500 font-medium">+1,200 WIS</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div>
                      <div className="font-medium">Salário Docente</div>
                      <div className="text-sm text-muted-foreground">Pedro Neves</div>
                    </div>
                    <div className="text-sm">22 Abril, 2025</div>
                    <div className="text-right text-red-500 font-medium">-120,000 AOA</div>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <div>
                      <div className="font-medium">Aquisição Material</div>
                      <div className="text-sm text-muted-foreground">Departamento Ciências</div>
                    </div>
                    <div className="text-sm">21 Abril, 2025</div>
                    <div className="text-right text-red-500 font-medium">-35,000 AOA</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Calendário</CardTitle>
                <CardDescription>Eventos próximos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-md p-2">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Reunião Pedagógica</p>
                      <p className="text-xs text-muted-foreground">30 Abril • 14:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-md p-2">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Avaliação Trimestral</p>
                      <p className="text-xs text-muted-foreground">5 Maio • 08:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-md p-2">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Feira de Ciências</p>
                      <p className="text-xs text-muted-foreground">12 Maio • 10:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho Acadêmico</CardTitle>
              <CardDescription>Métricas de desempenho por turma</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <BarChart4 className="h-16 w-16" />
                <p className="ml-2">Gráfico de Desempenho Acadêmico</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
              <CardDescription>Visão geral financeira da instituição</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <BarChart4 className="h-16 w-16" />
                <p className="ml-2">Gráfico Financeiro</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
