import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "dark";
  font: "sans" | "serif" | "mono";
}

const initialState: ThemeState = {
  theme: "light",
  font: "sans",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setFont: (state, action: PayloadAction<ThemeState["font"]>) => {
      state.font = action.payload;
    },
  },
});

export const { toggleTheme, setFont } = themeSlice.actions;
export default themeSlice.reducer;
