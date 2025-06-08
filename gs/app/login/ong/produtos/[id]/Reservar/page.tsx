"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Interface com os campos utilizados no componente
interface Produto {
  id_produto: number;
  nomeProduto: string;
  descricao: string;
  valorEstimado: number;
  usuario?: {
    id_usuario: number;
  };
}

export default function ReservarProdutoPage() {
  const params = useParams();
  const router = useRouter();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarProduto() {
      const res = await fetch(
        `https://gs-savingfoods-production.up.railway.app/produtos/${params.id}`
      );
      if (res.ok) {
        const data: Produto = await res.json();
        setProduto(data);
      } else {
        setErro("Produto não encontrado.");
      }
    }
    carregarProduto();
  }, [params.id]);

  const handleReservar = async () => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
      alert("Você precisa estar logado para reservar.");
      router.push("/login");
      return;
    }

    const usuario = JSON.parse(usuarioLogado);

    if (!produto) return;

    const novaDoacao = {
      produto: { id_produto: produto.id_produto },
      usuarioDoador: { id_usuario: produto.usuario?.id_usuario },
      usuarioReceptor: { id_usuario: usuario.id_usuario },
      valorEstimado: produto.valorEstimado,
      status: "AGUARDANDO_RETIRADA",
      dataDoacao: new Date().toISOString().split("T")[0],
    };

    const res = await fetch(
      "https://gs-savingfoods-production.up.railway.app/doacoes",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaDoacao),
      }
    );

    if (res.ok) {
      alert("Produto reservado com sucesso!");
      router.push(`/login/ong/produtos/${produto.id_produto}`);
    } else {
      setErro("Erro ao reservar produto.");
    }
  };

  if (erro) return <p className="text-red-500 p-4">{erro}</p>;
  if (!produto) return <p className="p-4">Carregando produto...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Reservar Produto</h1>
      <p>
        <strong>Nome:</strong> {produto.nomeProduto}
      </p>
      <p>
        <strong>Descrição:</strong> {produto.descricao}
      </p>
      <p>
        <strong>Valor Estimado:</strong> R$ {produto.valorEstimado.toFixed(2)}
      </p>

      <button
        onClick={handleReservar}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Confirmar Reservar
      </button>
    </div>
  );
}
