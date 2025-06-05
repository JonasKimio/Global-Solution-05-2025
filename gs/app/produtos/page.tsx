'use client';

import { useEffect, useState } from 'react';

type Produto = {
  id: number;
  nome: string;
  descricao: string;
  validade: string;
};

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/produtos') // Ajuste a URL conforme o IP/porta real do backend
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error('Erro ao buscar produtos:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Produtos</h1>
      <ul className="space-y-4">
        {produtos.map(produto => (
          <li key={produto.id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-xl font-semibold">{produto.nome}</h2>
            <p>{produto.descricao}</p>
            <span className="text-sm text-gray-500">Validade: {produto.validade}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
