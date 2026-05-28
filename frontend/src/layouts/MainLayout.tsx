import type { ReactNode } from "react";
import { Navbar } from "../components/Navbar/Navbar.tsx";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <header className="bg-red-900 text-white px-4 shadow-md display flex items-center">
        <img src="/logoDoação.svg" alt="Logo" className="w-20 h-20 brightness-0 invert" />
        <h1 className="text-3xl font-bold">
          Sistema de Doação de Sangue
        </h1>
      </header>

      <Navbar />

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}