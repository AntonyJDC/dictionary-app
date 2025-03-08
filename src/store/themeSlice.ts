import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "dark";
  font: "sans" | "serif" | "mono";
}

// Función para detectar el tema del sistema
const getSystemTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light"; // Valor por defecto en SSR
};

const initialState: ThemeState = {
  theme: getSystemTheme(),
  font: "sans",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme: (state, action: PayloadAction<ThemeState["theme"]>) => {
      state.theme = action.payload;
    },
    setFont: (state, action: PayloadAction<ThemeState["font"]>) => {
      state.font = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, setFont } = themeSlice.actions;
export default themeSlice.reducer;
