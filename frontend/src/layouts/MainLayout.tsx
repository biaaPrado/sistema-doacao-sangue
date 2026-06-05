import type { ReactNode } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-900 text-white px-4 shadow-md flex items-center gap-4 h-20">
        <Link to="/" className="flex items-center gap-4 hover:opacity-90 transition" >
          <img src="/logoDoação.svg" alt="Logo" className="w-14 h-14 brightness-0 invert" />

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold"> HemoSys </h1>
            <p className="text-md text-red-200"> Gestão de Doações de Sangue </p>
          </div>
        </Link>
      </header>

      <div className="flex">
        <Navbar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}