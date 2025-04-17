
import { useThemeSelector } from '@/themes/theme-context';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, availableThemes } = useThemeSelector();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Trocar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableThemes.map((theme) => (
          <DropdownMenuItem 
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={currentTheme === theme.id ? "bg-accent" : ""}
          >
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
