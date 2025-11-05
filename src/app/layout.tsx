"use client";

import { useState, useMemo } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import ThemeToggle from "./components/ThemeToggle";
import { Providers } from "./store";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: darkMode ? "#90caf9" : "#1976d2" },
        },
      }),
    [darkMode]
  );

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Dynamic Data Table Manager
                </Typography>
                <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
              </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ mt: 4 }}>
              {children}
            </Container>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
