"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Usuario = {
  id_usuario: number;
  nome: string;
};

type Endereco = {
  id_endereco: number;
  usuario: { id_usuario: number };
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
};

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
  usuario: {
    id_usuario: number;
    nome: string;
  };
};

type Doacao = {
  idDoacao: number;
  valorEstimado: number;
  dataDoacao: string;
  status: string;
  produto: Produto;
  usuarioDoador: Usuario;
  usuarioReceptor: Usuario;
};

export default function DetalhesDoacaoPage() {
  const { id } = useParams();
  const router = useRouter();

  const [doacao, setDoacao] = useState<Doacao | null>(null);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`https://gs-savingfoods-production.up.railway.app/doacoes/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Erro ao carregar a doação");
          return res.json();
        })
        .then((data: Doacao) => setDoacao(data))
        .catch(err => setErro(err.message));
    }
  }, [id]);

  useEffect(() => {
    if (doacao?.produto?.usuario?.id_usuario) {
      fetch(`https://gs-savingfoods-production.up.railway.app/enderecos?page=0&pageSize=100`)
        .then(res => {
          if (!res.ok) throw new Error("Erro ao carregar endereços");
          return res.json();
        })
        .then((data: Endereco[]) => {
          const filtered = data.filter(e =>
            e.usuario.id_usuario === doacao.produto.usuario.id_usuario
          );
          setEnderecos(filtered);
        })
        .catch(console.error);
    }
  }, [doacao]);

  const cancelarPedido = async () => {
    if (!doacao) return;
    if (!confirm("Tem certeza que deseja cancelar esta doação?")) return;

    const res = await fetch(`https://gs-savingfoods-production.up.railway.app/doacoes/${doacao.idDoacao}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Doação cancelada com sucesso!");
      router.push("/login/ong/produtos");
    } else {
      alert("Erro ao cancelar a doação");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalhes da Doação</h1>
      {erro && <p className="text-red-500">{erro}</p>}
      {!doacao && <p>Carregando dados...</p>}
      {doacao && (
        <>
          <section className="mb-6">
            <h2 className="text-xl font-semibold">Informações da Doação</h2>
            <p><strong>ID:</strong> {doacao.idDoacao}</p>
            <p><strong>Valor Estimado:</strong> R$ {doacao.valorEstimado.toFixed(2)}</p>
            <p><strong>Data da Doação:</strong> {new Date(doacao.dataDoacao).toLocaleDateString("pt-BR")}</p>
            <p><strong>Status:</strong> {doacao.status}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">Produto Doado</h2>
            <p><strong>ID:</strong> {doacao.produto.id_produto}</p>
            <p><strong>Nome:</strong> {doacao.produto.nomeProduto}</p>
            <p><strong>Descrição:</strong> {doacao.produto.descricao}</p>
            <p><strong>Quantidade:</strong> {doacao.produto.quantidade} {doacao.produto.quantidadeDescricao}</p>
            <p><strong>Validade:</strong> {doacao.produto.validadesDias} dias</p>
            <p><strong>Data do Anúncio:</strong> {new Date(doacao.produto.dataAnuncio).toLocaleDateString("pt-BR")}</p>
            <p><strong>Status do Produto:</strong> {doacao.produto.status}</p>
          </section>

<section className="mb-6">
  <h2 className="text-xl font-semibold">Endereço do Mercado</h2>
  {enderecos.length > 0 ? (
    enderecos.map(e => (
      <p key={e.id_endereco}>
        {e.logradouro}, {e.numero} - {e.bairro}, CEP {e.cep}
      </p>
    ))
  ) : (
    <p>Sem endereço cadastrado para esse mercado.</p>
  )}
</section>

      <div className="flex justify-center space-x-4 mb-6">
        <Link
          href="/login/mercado"
          className="inline-block py-2 px-4 bg-green-600 text-white text-sm border-2 border-green-600 rounded-full hover:bg-white hover:text-green-600 hover:border-green-600 transition-all duration-300"
        >
          Editar Status
        </Link>
      </div>
        </>
      )}
      <div className="flex justify-center space-x-4 mb-6">
        <Link
          href="/login/mercado"
          className="inline-block py-2 px-4 bg-green-600 text-white text-sm border-2 border-green-600 rounded-full hover:bg-white hover:text-green-600 hover:border-green-600 transition-all duration-300"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}
