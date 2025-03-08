"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/themeSlice";
import { RootState } from "@/store";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div className="flex items-center gap-4">
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => dispatch(toggleTheme())}
        className="data-[state=checked]:bg-[#A445ED] data-[state=unchecked]:bg-gray-300"
      />
      {theme === "dark" ? <Moon className="w-6 h-6"/> : <Sun className="w-6 h-6"/>}
      {theme === "dark" ? "Dark" : "Light"}
    </div>
  );
}
