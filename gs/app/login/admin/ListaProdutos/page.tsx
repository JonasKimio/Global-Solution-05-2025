"use client";
import { useState } from "react";
import Link from "next/link";

type Usuario = {
  idUsuario: number;
  nome: string;
};

type Produto = {
  id_produto: number;
  usuario?: Usuario;
  nomeProduto: string;
  descricao: string;
  quantidade: number;
  quantidadeDescricao: string;
  validadesDias: number;
  dataAnuncio: string;
  valorEstimado: number;
  status: string;
};

export default function BuscarProdutoPage() {
  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erro, setErro] = useState("");

  const buscarProduto = async () => {
    try {
      const res = await fetch(
        `https://gs-java-production-d3ea.up.railway.app/produtos/buscarproduto?produto=${encodeURIComponent(
          busca
        )}`
      );

      if (!res.ok) throw new Error("Erro ao buscar produtos");

      const data: Produto[] = await res.json();
      setProdutos(data);
      setErro("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro("Erro desconhecido");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buscar Produto</h1>

      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Digite o nome do produto"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-80"
        />
        <button
          onClick={buscarProduto}
          className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
        >
          Buscar
        </button>
      </div>

      {erro && <p className="text-red-500">{erro}</p>}

      {produtos.length > 0 && (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nome do Produto</th>
              <th className="border px-4 py-2">Descrição</th>
              <th className="border px-4 py-2">Quantidade</th>
              <th className="border px-4 py-2">Unidade</th>
              <th className="border px-4 py-2">Validade (dias)</th>
              <th className="border px-4 py-2">Data do Anúncio</th>
              <th className="border px-4 py-2">Valor Estimado (R$)</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id_produto}>
                <td className="border px-4 py-2">{produto.id_produto}</td>
                <td className="border px-4 py-2">
                  {produto.nomeProduto || "—"}
                </td>
                <td className="border px-4 py-2">{produto.descricao || "—"}</td>
                <td className="border px-4 py-2">
                  {produto.quantidade || "—"}
                </td>
                <td className="border px-4 py-2">
                  {produto.quantidadeDescricao || "—"}
                </td>
                <td className="border px-4 py-2">
                  {produto.validadesDias || "—"}
                </td>
                <td className="border px-4 py-2">
                  {produto.dataAnuncio
                    ? new Date(produto.dataAnuncio).toLocaleDateString("pt-BR")
                    : "—"}
                </td>
                <td className="border px-4 py-2">
                  {produto.valorEstimado != null
                    ? produto.valorEstimado.toFixed(2)
                    : "—"}
                </td>
                <td className="border px-4 py-2">{produto.status || "—"}</td>
                <td className="border px-4 py-2">
                  <Link
                    href={`/login/admin/ListaProdutos/produtos/${produto.id_produto}`}
                    className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
                  >
                    Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-center space-x-4 mb-6">
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
