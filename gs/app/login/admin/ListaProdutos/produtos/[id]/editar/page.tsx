'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

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
  };
};

export default function EditarProdutoPage() {
  const { id } = useParams() as { id: string };
  const [produto, setProduto] = useState<Produto | null>(null);
  const [formData, setFormData] = useState<Omit<Produto, 'id_produto' | 'usuario'>>({
    nomeProduto: '',
    descricao: '',
    quantidade: 0,
    quantidadeDescricao: '',
    validadesDias: 0,
    dataAnuncio: '',
    valorEstimado: 0,
    status: '',
  });

  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    fetch(`https://gs-savingfoods-production.up.railway.app/produtos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar produto");
        return res.json();
      })
      .then((data: Produto) => {
        setProduto(data);
        setFormData({
          nomeProduto: data.nomeProduto,
          descricao: data.descricao,
          quantidade: data.quantidade,
          quantidadeDescricao: data.quantidadeDescricao,
          validadesDias: data.validadesDias,
          dataAnuncio: data.dataAnuncio.slice(0, 10),
          valorEstimado: data.valorEstimado,
          status: data.status,
        });
      })
      .catch((err) => {
        console.error("Erro ao carregar produto:", err);
        alert("Erro ao carregar dados do produto.");
        router.back();
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'quantidade' || name === 'validadesDias' || name === 'valorEstimado'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!produto) return;

    const payload = {
      id_produto: produto.id_produto,
      usuario: {
        id_usuario: produto.usuario.id_usuario,
      },
      nomeProduto: formData.nomeProduto,
      descricao: formData.descricao,
      quantidade: formData.quantidade,
      quantidadeDescricao: formData.quantidadeDescricao,
      validadesDias: formData.validadesDias,
      dataAnuncio: formData.dataAnuncio,
      valorEstimado: formData.valorEstimado,
      status: formData.status,
    };

    const response = await fetch(`https://gs-savingfoods-production.up.railway.app/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert('Produto atualizado com sucesso!');
      router.push(`/login/admin/ListaProdutos/produtos/${produto.id_produto}`);
    } else {
      const errorText = await response.text();
      console.error("Erro ao atualizar produto:", errorText);
      alert('Erro ao atualizar produto.');
    }
  };

  if (!produto) return <p className="p-6">Carregando...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Editar Produto</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block font-medium">ID</label>
          <input value={produto.id_produto} disabled className="w-full border px-3 py-2 bg-gray-100 rounded" />
        </div>

        <div>
          <label className="block font-medium">Nome do Produto</label>
          <input
            name="nomeProduto"
            value={formData.nomeProduto}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Descrição</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Quantidade</label>
            <input
              name="quantidade"
              type="number"
              value={formData.quantidade}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Descrição da Quantidade</label>
            <input
              name="quantidadeDescricao"
              value={formData.quantidadeDescricao}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Validade (dias)</label>
            <input
              name="validadesDias"
              type="number"
              value={formData.validadesDias}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Data do Anúncio</label>
            <input
              name="dataAnuncio"
              type="date"
              value={formData.dataAnuncio}
              disabled
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Valor Estimado (R$)</label>
          <input
            name="valorEstimado"
            type="number"
            value={formData.valorEstimado}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Selecione...</option>
            <option value="DISPONIVEL">DISPONIVEL</option>
            <option value="INDISPONIVEL">INDISPONIVEL</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Salvar
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
