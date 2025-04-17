
import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as ShadcnThemeProvider } from "@/providers/theme-provider";

type AvailableTheme = 'default' | 'tabler' | 'gentelella' | 'flutter' | 'vuestic' | 'coreui';

interface ThemeContextType {
  currentTheme: AvailableTheme;
  setTheme: (theme: AvailableTheme) => void;
  availableThemes: Array<{id: AvailableTheme, name: string}>;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'default',
  setTheme: () => {},
  availableThemes: [
    {id: 'default', name: 'WiSchool Default'},
    {id: 'tabler', name: 'Tabler'},
    {id: 'gentelella', name: 'Gentelella'},
    {id: 'flutter', name: 'Flutter Admin Panel'},
    {id: 'vuestic', name: 'Vuestic Admin'},
    {id: 'coreui', name: 'CoreUI'},
  ],
});

export const useThemeSelector = () => useContext(ThemeContext);

export const ThemeSelector = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<AvailableTheme>(() => {
    const saved = localStorage.getItem('wischool-ui-theme-name');
    return (saved as AvailableTheme) || 'default';
  });

  const availableThemes = [
    {id: 'default' as AvailableTheme, name: 'WiSchool Default'},
    {id: 'tabler' as AvailableTheme, name: 'Tabler'},
    {id: 'gentelella' as AvailableTheme, name: 'Gentelella'},
    {id: 'flutter' as AvailableTheme, name: 'Flutter Admin Panel'},
    {id: 'vuestic' as AvailableTheme, name: 'Vuestic Admin'},
    {id: 'coreui' as AvailableTheme, name: 'CoreUI'},
  ];

  useEffect(() => {
    localStorage.setItem('wischool-ui-theme-name', currentTheme);
    // Aqui poderíamos carregar folhas de estilo CSS adicionais com base no tema
  }, [currentTheme]);

  const setTheme = (theme: AvailableTheme) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, availableThemes }}>
      <ShadcnThemeProvider>
        {children}
      </ShadcnThemeProvider>
    </ThemeContext.Provider>
  );
};
