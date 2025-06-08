"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Usuario = {
  idUsuario: number;
  nome: string;
};

type Produto = {
  idProduto: number;
  nomeProduto: string;
};

type Doacao = {
  idDoacao: number;
  produto: Produto;
  usuarioDoador: Usuario;
  usuarioReceptor: Usuario;
  valorEstimado: number;
  dataDoacao: string;
  status: string;
};

export default function TodasDoacoesPage() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchDoacoes = async () => {
      try {
        const res = await fetch(
          "https://gs-savingfoods-production.up.railway.app/doacoes"
        );
        if (!res.ok) throw new Error("Erro ao buscar doações");

        const data: Doacao[] = await res.json();
        setDoacoes(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErro(err.message);
        } else {
          setErro("Erro desconhecido ao buscar doações.");
        }
      }
    };

    fetchDoacoes();
  }, []);

  const deletarDoacao = async (id: number) => {
    const confirm = window.confirm(
      "Tem certeza que deseja cancelar esta doação?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(
        `https://gs-savingfoods-production.up.railway.app/doacoes/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Erro ao deletar a doação");

      setDoacoes((prev) => prev.filter((d) => d.idDoacao !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro("Erro desconhecido ao deletar doação.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Todas as Doações</h1>

      {erro && <p className="text-red-500">{erro}</p>}

      {doacoes.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Produto</th>
              <th className="border px-4 py-2">Doador</th>
              <th className="border px-4 py-2">Receptor</th>
              <th className="border px-4 py-2">Valor Estimado</th>
              <th className="border px-4 py-2">Data</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {doacoes.map((d) => (
              <tr key={d.idDoacao}>
                <td className="border px-4 py-2">{d.idDoacao}</td>
                <td className="border px-4 py-2">{d.produto?.nomeProduto}</td>
                <td className="border px-4 py-2">
                  {d.usuarioDoador?.nome} (ID {d.usuarioDoador?.idUsuario})
                </td>
                <td className="border px-4 py-2">
                  {d.usuarioReceptor?.nome} (ID {d.usuarioReceptor?.idUsuario})
                </td>
                <td className="border px-4 py-2">
                  R$ {d.valorEstimado.toFixed(2)}
                </td>
                <td className="border px-4 py-2">
                  {new Date(d.dataDoacao).toLocaleDateString("pt-BR")}
                </td>
                <td className="border px-4 py-2">{d.status}</td>
                <td className="border px-4 py-2">
                  {d.status === "CANCELADO" ? (
                    <span className="text-gray-500">Cancelado</span>
                  ) : (
                    <button
                      onClick={() => deletarDoacao(d.idDoacao)}
                      className="py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Cancelar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhuma doação encontrada.</p>
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
