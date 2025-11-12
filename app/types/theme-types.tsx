type ThemeColors = "Rose" | "Blue";

interface ThemeColorsStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>
}