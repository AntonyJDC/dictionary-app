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
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Componente para aplicar tema y fuente dinámicamente
function ThemeAndFontProvider({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const font = useSelector((state: RootState) => state.theme.font);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    // 🔥 Limpiar clases de fuente antes de agregar la nueva
    document.body.classList.remove("font-sans", "font-serif", "font-mono");

    if (font === "mono") {
      document.body.classList.add("font-mono", geistMono.variable);
    } else if (font === "serif") {
      document.body.classList.add("font-serif");
    } else {
      document.body.classList.add("font-sans", geistSans.variable);
    }
  }, [theme, font]);

  return <>{children}</>;
}

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <Toaster richColors expand closeButton />
              <ThemeAndFontProvider>{children}</ThemeAndFontProvider>
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
