"use client";
import setGlobalColorTheme from "@/lib/theme-colors";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

const ThemeContext = createContext<ThemeColorsStateParams>(
  {} as ThemeColorsStateParams
);

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
  const getSavedThemeColor = () => {
    try {
      return (localStorage.getItem("themeColor") as ThemeColors) || "Default";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return "Default" as ThemeColors;
    }
  };

  const [themeColor, setThemeColor] = useState<ThemeColors>(
    getSavedThemeColor() as ThemeColors
  );
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    localStorage.setItem("themeColor", themeColor);
    setGlobalColorTheme(theme as "light" | "dark", themeColor);

    if (!isMounted) {
      setIsMounted(true);
    }
  }, [themeColor, theme]);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useThemeContext(){
  return useContext(ThemeContext);
}
