import { notFound } from "next/navigation";
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

export default async function ProdutoDetalhesPage({ params }: { params: { id: string } }) {
  const produtoRes = await fetch(
    `https://gs-savingfoods-production.up.railway.app/produtos/${params.id}`,
    { cache: "no-store" }
  );

  if (!produtoRes.ok) return notFound();
  const produto: Produto = await produtoRes.json();

  const doacoesRes = await fetch(
    `https://gs-savingfoods-production.up.railway.app/doacoes?page=0&pageSize=100`,
    { cache: "no-store" }
  );
  const todasDoacoes: Doacao[] = await doacoesRes.json();
  const doacoesFiltradas = todasDoacoes.filter(
    (d) => d.produto?.id_produto === produto.id_produto
  );

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Detalhes do Produto</h1>
        <div className="bg-white p-4 rounded shadow-md space-y-2">
          <p><strong>ID:</strong> {produto.id_produto}</p>
          <p><strong>Nome:</strong> {produto.nomeProduto}</p>
          <p><strong>Descrição:</strong> {produto.descricao || "—"}</p>
          <p><strong>Quantidade:</strong> {produto.quantidade} {produto.quantidadeDescricao}</p>
          <p><strong>Validade (dias):</strong> {produto.validadesDias}</p>
          <p><strong>Data do Anúncio:</strong> {new Date(produto.dataAnuncio).toLocaleDateString("pt-BR")}</p>
          <p><strong>Valor Estimado (R$):</strong> {produto.valorEstimado?.toFixed(2) || "—"}</p>
          <p><strong>Status:</strong> {produto.status}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Doações Relacionadas</h2>
        {doacoesFiltradas.length === 0 ? (
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
                {doacoesFiltradas.map((doacao) => (
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
          className="inline-block py-2 px-4 bg-green-600 text-white text-sm border-2 border-green-600 rounded-full hover:bg-white hover:text-green-600 transition-all"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}
