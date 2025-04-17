import { useState } from "react";
import { Bell, MessageSquare, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ThemeSwitcher from "@/components/theme-selector/ThemeSwitcher";

interface HeaderProps {
  sidebarWidth: number;
}

export function Header({ sidebarWidth }: HeaderProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Pagamento confirmado",
      description: "O pagamento da propina foi confirmado",
      time: "5 min atrás",
      read: false,
    },
    {
      id: 2,
      title: "Novo aluno registado",
      description: "Um novo aluno foi registado na turma 10A",
      time: "30 min atrás",
      read: false,
    },
    {
      id: 3,
      title: "Reunião agendada",
      description: "Reunião do corpo docente agendada para amanhã",
      time: "2 horas atrás",
      read: true,
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Ana Silva",
      content: "Bom dia, podemos marcar uma reunião?",
      time: "10:30",
      read: false,
      avatar: "",
    },
    {
      id: 2,
      sender: "Carlos Mendes",
      content: "Os relatórios estão prontos para revisão",
      time: "09:15",
      read: false,
      avatar: "",
    },
  ]);

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = messages.filter(m => !m.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAllMessagesAsRead = () => {
    setMessages(messages.map(m => ({ ...m, read: true })));
  };

  return (
    <header 
      className="fixed top-0 z-10 flex h-16 w-full border-b bg-background/95 backdrop-blur"
      style={{ paddingLeft: `${sidebarWidth}px` }}
    >
      <div className="flex flex-1 items-center justify-between px-4">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Pesquisar..." 
              className="w-full pl-8"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeSwitcher />
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between p-4">
                <h4 className="font-medium">Notificações</h4>
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Marcar todas como lidas
                </Button>
              </div>
              <Separator />
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex cursor-pointer flex-col gap-1 p-4 hover:bg-muted ${
                      !notification.read ? "bg-accent" : ""
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                ))}
              </div>
              {notifications.length === 0 && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Sem notificações
                </div>
              )}
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <MessageSquare className="h-5 w-5" />
                {unreadMessages > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                    {unreadMessages}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between p-4">
                <h4 className="font-medium">Mensagens</h4>
                <Button variant="ghost" size="sm" onClick={markAllMessagesAsRead}>
                  Marcar todas como lidas
                </Button>
              </div>
              <Separator />
              <div className="max-h-80 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex cursor-pointer gap-3 p-4 hover:bg-muted ${
                      !message.read ? "bg-accent" : ""
                    }`}
                  >
                    <Avatar>
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <span className="font-medium">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {messages.length === 0 && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Sem mensagens
                </div>
              )}
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-0" align="end">
              <div className="p-4 flex gap-3 items-center">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin Demo</p>
                  <p className="text-xs text-muted-foreground">administrador@wischool.ao</p>
                </div>
              </div>
              <Separator />
              <div className="p-2">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  Configurações
                </Button>
              </div>
              <Separator />
              <div className="p-2">
                <Button variant="ghost" className="w-full justify-start text-destructive" size="sm">
                  Terminar sessão
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
