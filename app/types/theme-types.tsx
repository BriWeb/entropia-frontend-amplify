export type ThemeColors = "Rose" | "Blue";

export interface ThemeColorsStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
}
