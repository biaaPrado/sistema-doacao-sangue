import type { ReactNode } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="bg-red-900 text-white px-4 shadow-md flex items-center gap-4">

      <Link
        to="/"
        className="flex items-center gap-4 hover:opacity-90 transition"
      >
        <img
          src="/logoDoação.svg"
          alt="Logo"
          className="w-16 h-16 brightness-0 invert"
        />

        <h1 className="text-2xl font-bold">
          Sistema de Doação de Sangue
        </h1>
      </Link>

    </header>

      {/* NAVBAR */}
      <Navbar />

      {/* CONTEÚDO */}
      <main className="p-6">
        {children}
      </main>

    </div>
  );
}