"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Component to apply theme and font dynamically
function ThemeAndFontProvider({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const font = useSelector((state: RootState) => state.theme.font);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.className = `${font === "mono" ? geistMono.variable : geistSans.variable} antialiased`;
  }, [theme, font]);

  return <>{children}</>;
}

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <ThemeAndFontProvider>{children}</ThemeAndFontProvider>
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
