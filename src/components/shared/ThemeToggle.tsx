"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setTheme } from "@/store/themeSlice";
import { RootState } from "@/store";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  // Detecta cambios en la preferencia del sistema
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      dispatch(setTheme(e.matches ? "dark" : "light"));
    };

    systemTheme.addEventListener("change", handleChange);
    return () => systemTheme.removeEventListener("change", handleChange);
  }, [dispatch]);

  return (
    <div className="flex items-center gap-4">
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => dispatch(toggleTheme())}
        className="data-[state=checked]:bg-[#A445ED] data-[state=unchecked]:bg-gray-300 
                   hover:data-[state=checked]:bg-[#8b33d8] hover:data-[state=unchecked]:bg-[#c695eb] transition-colors cursor-pointer"
      />
      {theme === "dark" ? (
        <Moon className="w-6 h-6 hover:text-gray-200 transition-colors" />
      ) : (
        <Sun className="w-6 h-6 hover:text-yellow-500 transition-colors" />
      )}
      <span> {theme === "dark" ? "Dark" : "Light"} </span>
    </div>
  );
}
