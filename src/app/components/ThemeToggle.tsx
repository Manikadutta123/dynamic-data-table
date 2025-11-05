"use client";

import { IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

interface ThemeToggleProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function ThemeToggle({ darkMode, toggleTheme }: ThemeToggleProps) {
  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {darkMode ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}
