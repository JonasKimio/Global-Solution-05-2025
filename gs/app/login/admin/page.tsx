'use client';

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white border-4 border-gray-300 rounded-lg p-6 w-full max-w-3xl text-center mt-6 mb-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin</h1>

        <div className="flex justify-center space-x-4 mb-6">
          <Link
            href="/login/admin/ListaProdutos"
            className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
          >
            Lista Produtos
          </Link>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <Link
            href="/login/admin/ListaUsuarios"
            className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
          >
            Lista Usuários
          </Link>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <Link
            href="/login/admin/ListaDoacoes"
            className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
          >
            Lista Doações
          </Link>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <Link
            href="/"
            className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
          >
            Sair
          </Link>
        </div>
      </div>
    </div>
  );
}
