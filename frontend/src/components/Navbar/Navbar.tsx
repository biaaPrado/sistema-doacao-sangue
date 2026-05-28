import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-red-800 text-white shadow-md rounded-b-lg">
      <div className="mx-auto px-8 py-4 flex gap-6">
        <Link to="/" className="hover:text-red-200 transition"> Home </Link>

        <Link to="/doadores" className="hover:text-red-200 transition" > Doadores </Link>

        <Link to="/cadastro-doador" className="hover:text-red-200 transition"> Cadastrar Doador </Link>

        <Link to="/doacoes" className="hover:text-red-200 transition"> Doações </Link>
      </div>
    </nav>
  );
}