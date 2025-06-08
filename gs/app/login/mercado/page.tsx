"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Usuario = {
  id_usuario: number;
  nome: string;
  email: string;
  cnpj?: string;
  tipo_usuario: string;
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

type Doacao = {
  idDoacao: number;
  produto: Produto;
  usuarioReceptor: Usuario;
  usuarioDoador: Usuario;
  valorEstimado: number;
  dataDoacao: string;
  status: string;
};

export default function BuscarProdutoPage() {
  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [erro, setErro] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);

  useEffect(() => {
    const usuarioStorage = localStorage.getItem("usuarioLogado");
    try {
      if (usuarioStorage) {
        const usuario: Usuario = JSON.parse(usuarioStorage);
        setUsuarioLogado(usuario);
      }
    } catch (err) {
      console.error("Erro ao ler usuário do localStorage", err);
    }
  }, []);

  const buscarProduto = async () => {
    try {
      const res = await fetch(
        `https://gs-savingfoods-production.up.railway.app/produtos/buscarproduto?produto=${encodeURIComponent(
          busca
        )}`
      );

      if (!res.ok) throw new Error("Erro ao buscar produtos");

      const data: Produto[] = await res.json();
      const meusProdutos = data.filter(
        (p) => p.usuario?.id_usuario === usuarioLogado?.id_usuario
      );

      setProdutos(meusProdutos);
      setErro("");
    } catch (err) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro("Erro desconhecido ao buscar produtos.");
      }
    }
  };

  useEffect(() => {
    if (!usuarioLogado) return;

    async function buscarDoacoes() {
      try {
        const res = await fetch(
          "https://gs-savingfoods-production.up.railway.app/doacoes"
        );
        if (!res.ok) throw new Error("Erro ao buscar doações");

        const todas: Doacao[] = await res.json();
        const minhas = todas.filter((d) => {
          if (!d.usuarioDoador || !usuarioLogado) return false;
          return d.usuarioDoador.id_usuario === usuarioLogado.id_usuario;
        });

        setDoacoes(minhas);
      } catch (err) {
        console.error("Erro ao carregar doações:", err);
      }
    }

    buscarDoacoes();
  }, [usuarioLogado]);

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
        <Link
          href={`/login/mercado/cadastroproduto`}
          className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
        >
          Adicionar Produto
        </Link>
      </div>

      {erro && <p className="text-red-500">{erro}</p>}

      {produtos.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 mb-10">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nome</th>
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
                <td className="border px-4 py-2">{produto.nomeProduto}</td>
                <td className="border px-4 py-2">{produto.descricao}</td>
                <td className="border px-4 py-2">{produto.quantidade}</td>
                <td className="border px-4 py-2">
                  {produto.quantidadeDescricao}
                </td>
                <td className="border px-4 py-2">{produto.validadesDias}</td>
                <td className="border px-4 py-2">
                  {new Date(produto.dataAnuncio).toLocaleDateString("pt-BR")}
                </td>
                <td className="border px-4 py-2">
                  {produto.valorEstimado?.toFixed(2)}
                </td>
                <td className="border px-4 py-2">{produto.status}</td>
                <td className="border px-4 py-2">
                  <Link
                    href={`/login/mercado/produtos/${produto.id_produto}`}
                    className="inline-block py-1 px-3 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
                  >
                    Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !erro && (
          <p className="text-gray-600 mb-6">Nenhum produto encontrado.</p>
        )
      )}

      {doacoes.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold mb-2">Minhas Doações</h2>
          <table className="min-w-full bg-white border border-gray-300 mb-10">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Produto</th>
                <th className="border px-4 py-2">Valor Estimado</th>
                <th className="border px-4 py-2">Data</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {doacoes.map((doacao) => (
                <tr key={doacao.idDoacao}>
                  <td className="border px-4 py-2">{doacao.idDoacao}</td>
                  <td className="border px-4 py-2">
                    {doacao.produto?.nomeProduto || "—"}
                  </td>
                  <td className="border px-4 py-2">
                    {doacao.valorEstimado?.toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">
                    {doacao.dataDoacao
                      ? new Date(doacao.dataDoacao).toLocaleDateString("pt-BR")
                      : "—"}
                  </td>
                  <td className="border px-4 py-2">{doacao.status}</td>
                  <td className="border px-4 py-2">
                    <Link
                      href={`/login/mercado/doacoes/${doacao.idDoacao}/`}
                      className="inline-block py-1 px-3 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
                    >
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">Você ainda não realizou doações.</p>
      )}

      <div className="flex justify-center space-x-4 mb-6">
        <Link
          href="/"
          className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
        >
          Sair
        </Link>
      </div>
    </div>
  );
}
