"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Usuario = {
  id_usuario: number;
  email: string;
  cnpj?: string;
  nome: string;
  senha: string;
  tipo_usuario: string;
  dataCadastro: string;
};

export default function ListaUsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState("");

  const fetchUsuarios = async () => {
    try {
      const res = await fetch(
        "https://gs-java-production-d3ea.up.railway.app/usuarios?page=0&pageSize=100"
      );
      if (!res.ok) throw new Error("Erro ao buscar usuários");
      const data = await res.json();
      setUsuarios(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro("Erro desconhecido");
      }
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>

      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Buscar por nome"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-80"
        />
        <Link
          href="/login/admin/ListaUsuarios/cadastrar"
          className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
        >
          Criar conta
        </Link>
      </div>

      {erro && <p className="text-red-500">{erro}</p>}

      {usuariosFiltrados.length > 0 && (
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nome</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">CNPJ</th>
              <th className="border px-4 py-2">Tipo</th>
              <th className="border px-4 py-2">Data Cadastro</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id_usuario}>
                <td className="border px-4 py-2">{usuario.id_usuario}</td>
                <td className="border px-4 py-2">{usuario.nome}</td>
                <td className="border px-4 py-2">{usuario.email}</td>
                <td className="border px-4 py-2">{usuario.cnpj || "—"}</td>
                <td className="border px-4 py-2">{usuario.tipo_usuario}</td>
                <td className="border px-4 py-2">
                  {usuario.dataCadastro
                    ? new Date(usuario.dataCadastro).toLocaleDateString("pt-BR")
                    : "—"}
                </td>
                <td className="border px-4 py-2">
                  <Link
                    href={`/login/admin/ListaUsuarios/usuarios/${usuario.id_usuario}`}
                    className="text-blue-600 hover:underline"
                  >
                    Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-center space-x-4 mt-6">
        <Link
          href="/login/admin"
          className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}
