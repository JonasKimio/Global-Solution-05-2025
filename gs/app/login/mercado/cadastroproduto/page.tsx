"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
  tipo_usuario: string;
  // adicione outros campos se necessário
}

interface ProdutoPayload {
  nomeProduto: string;
  descricao?: string | null;
  quantidade: number;
  quantidadeDescricao?: string | null;
  validadesDias: number;
  valorEstimado?: number;
  status: "DISPONIVEL";
  usuario: {
    id_usuario: number;
  };
}

export default function CadastroProduto() {
  const router = useRouter();

  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    nomeProduto: "",
    descricao: "",
    quantidade: "",
    quantidadeDescricao: "",
    validadesDias: "",
    valorEstimado: "",
  });

  useEffect(() => {
    const usuarioStorage = localStorage.getItem("usuarioLogado");
    if (usuarioStorage) {
      try {
        const usuario: Usuario = JSON.parse(usuarioStorage);
        setUsuarioLogado(usuario);
      } catch (err) {
        console.error("Erro ao ler usuário do localStorage:", err);
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuarioLogado?.id_usuario) {
      setError("Usuário não identificado.");
      return;
    }

    const { nomeProduto, quantidade, validadesDias } = form;
    if (!nomeProduto || !quantidade || !validadesDias) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload: ProdutoPayload = {
      nomeProduto: nomeProduto.trim(),
      descricao: form.descricao?.trim() || null,
      quantidade: Number(form.quantidade),
      quantidadeDescricao: form.quantidadeDescricao?.trim() || null,
      validadesDias: Number(form.validadesDias),
      status: "DISPONIVEL",
      usuario: {
        id_usuario: usuarioLogado.id_usuario,
      },
    };

    if (form.valorEstimado) {
      payload.valorEstimado = Number(form.valorEstimado);
    }

    try {
      const res = await fetch(
        "https://gs-java-production-d3ea.up.railway.app/produtos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Erro detalhado:", errorText);
        throw new Error("Erro ao cadastrar produto");
      }

      alert("Produto cadastrado com sucesso!");
      router.push("/login/mercado");
    } catch (err) {
      console.error(err);
      setError("Erro ao cadastrar produto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Produto</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nomeProduto"
          placeholder="Nome do Produto *"
          value={form.nomeProduto}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="quantidade"
          type="number"
          placeholder="Quantidade *"
          value={form.quantidade}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="quantidadeDescricao"
          placeholder="Unidade (Ex: kg, caixas)"
          value={form.quantidadeDescricao}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="validadesDias"
          type="number"
          placeholder="Validade (em dias) *"
          value={form.validadesDias}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="valorEstimado"
          type="number"
          placeholder="Valor Estimado (opcional)"
          value={form.valorEstimado}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Cadastrando..." : "Cadastrar Produto"}
        </button>
      </form>
    </div>
  );
}
