"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type Produto = {
  id_produto: number;
  nomeProduto: string;
  descricao: string;
  quantidade: number;
  quantidadeDescricao: string;
  validadesDias: number;
  dataAnuncio: string;
  valorEstimado: number;
  status: string;
};

type Doacao = {
  idDoacao: number;
  produto: { id_produto: number };
  usuarioDoador: { nome: string };
  usuarioReceptor: { nome: string };
  valorEstimado: number;
  dataDoacao: string;
  status: string;
};

export default function ProdutoDetalhesOngPage() {
  const params = useParams();
  const id = params?.id as string;

  const [produto, setProduto] = useState<Produto | null>(null);
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const resProduto = await fetch(
          `https://gs-savingfoods-production.up.railway.app/produtos/${id}`
        );

        if (!resProduto.ok) {
          console.error("Produto não encontrado");
          return;
        }

        const produtoData: Produto = await resProduto.json();
        setProduto(produtoData);

        const resDoacoes = await fetch(
          `https://gs-savingfoods-production.up.railway.app/doacoes?page=0&pageSize=100`
        );
        const todas: Doacao[] = await resDoacoes.json();
        const filtradas = todas.filter(
          (d) => d.produto?.id_produto === produtoData.id_produto
        );
        setDoacoes(filtradas);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Erro ao buscar dados:", error.message);
        } else {
          console.error("Erro desconhecido ao buscar dados", error);
        }
      }
    }

    fetchData();
  }, [id]);

  if (!produto) return <p className="p-6">Carregando produto...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Produto</h1>
      <div className="bg-white p-4 rounded shadow-md space-y-2">
        <p><strong>ID:</strong> {produto.id_produto}</p>
        <p><strong>Nome:</strong> {produto.nomeProduto}</p>
        <p><strong>Descrição:</strong> {produto.descricao || "—"}</p>
        <p><strong>Quantidade:</strong> {produto.quantidade} {produto.quantidadeDescricao}</p>
        <p><strong>Validade:</strong> {produto.validadesDias} dias</p>
        <p><strong>Data do Anúncio:</strong> {new Date(produto.dataAnuncio).toLocaleDateString("pt-BR")}</p>
        <p><strong>Valor Estimado:</strong> R$ {produto.valorEstimado?.toFixed(2)}</p>
        <p><strong>Status:</strong> {produto.status}</p>
      </div>

      <div className="flex justify-center">
        <Link
          href={`/login/ong/produtos/${produto.id_produto}/Reservar`}
          className="inline-block py-2 px-4 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600 border border-blue-600 transition"
        >
          Reservar Produto
        </Link>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Doações Relacionadas</h2>
        {doacoes.length === 0 ? (
          <p className="text-gray-600">Nenhuma doação registrada para este produto.</p>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full table-auto border border-gray-300 text-sm bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Doador</th>
                  <th className="border px-4 py-2">Receptor</th>
                  <th className="border px-4 py-2">Valor Estimado</th>
                  <th className="border px-4 py-2">Data</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {doacoes.map((doacao) => (
                  <tr key={doacao.idDoacao}>
                    <td className="border px-4 py-2">{doacao.idDoacao}</td>
                    <td className="border px-4 py-2">{doacao.usuarioDoador?.nome || "—"}</td>
                    <td className="border px-4 py-2">{doacao.usuarioReceptor?.nome || "—"}</td>
                    <td className="border px-4 py-2">R$ {doacao.valorEstimado?.toFixed(2)}</td>
                    <td className="border px-4 py-2">{new Date(doacao.dataDoacao).toLocaleDateString("pt-BR")}</td>
                    <td className="border px-4 py-2">{doacao.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Link
          href="/login/ong"
          className="inline-block py-2 px-4 bg-gray-600 text-white rounded hover:bg-white hover:text-gray-600 border border-gray-600 transition"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}
