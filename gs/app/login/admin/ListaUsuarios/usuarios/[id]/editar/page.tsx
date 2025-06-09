'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

type Usuario = {
  id_usuario: number;
  nome: string;
  email: string;
  cnpj?: string;
  tipo_usuario: string;
  senha: string;
  dataCadastro?: string;
};

type Endereco = {
  id_endereco: number;
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  usuario: Usuario;
};

export default function EditarUsuarioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);

  useEffect(() => {
    if (!id) return;

    fetch(`https://gs-java-production-d3ea.up.railway.app/usuarios/${id}`)
      .then((res) => res.json())
      .then((data: Usuario) => setUsuario(data));

    fetch(`https://gs-java-production-d3ea.up.railway.app/enderecos?page=0&pageSize=100`)
      .then((res) => res.json())
      .then((data: Endereco[]) => {
        const relacionados = data.filter((e) => e.usuario?.id_usuario === Number(id));
        setEnderecos(relacionados);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!usuario) return;
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleEnderecoChange = (index: number, field: keyof Endereco, value: string) => {
    const novos = [...enderecos];
    novos[index] = { ...novos[index], [field]: value };
    setEnderecos(novos);
  };

  const handleSubmit = async () => {
    if (!usuario) return;

    await fetch(`https://gs-java-production-d3ea.up.railway.app/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });

    for (const endereco of enderecos) {
      await fetch(`https://gs-java-production-d3ea.up.railway.app/enderecos/${endereco.id_endereco}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...endereco, usuario }),
      });
    }

    alert('Usuário e endereços atualizados.');
    router.push(`/login/admin/ListaUsuarios/usuarios/${id}`);
  };

  if (!usuario) return <p className="p-6">Carregando...</p>;

  return (
    <div className="p-6 space-y-6 bg-white">
      <h1 className="text-2xl font-bold">Editar Usuário</h1>
      <div className="space-y-4">
        <input
          name="nome"
          value={usuario.nome || ''}
          onChange={handleChange}
          placeholder="Nome"
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          value={usuario.email || ''}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          name="cnpj"
          value={usuario.cnpj || ''}
          onChange={handleChange}
          placeholder="CNPJ"
          className="w-full p-2 border rounded"
        />
        <input
          name="tipo_usuario"
          value={usuario.tipo_usuario || ''}
          onChange={handleChange}
          placeholder="Tipo"
          className="w-full p-2 border rounded"
        />
      </div>

      <h2 className="text-xl font-semibold">Endereços</h2>
      {enderecos.map((endereco, idx) => (
        <div key={endereco.id_endereco} className="space-y-2 p-4 bg-white">
          <input
            value={endereco.logradouro || ''}
            onChange={(e) => handleEnderecoChange(idx, 'logradouro', e.target.value)}
            placeholder="Logradouro"
            className="w-full p-2 border rounded"
          />
          <input
            value={endereco.numero || ''}
            onChange={(e) => handleEnderecoChange(idx, 'numero', e.target.value)}
            placeholder="Número"
            className="w-full p-2 border rounded"
          />
          <input
            value={endereco.bairro || ''}
            onChange={(e) => handleEnderecoChange(idx, 'bairro', e.target.value)}
            placeholder="Bairro"
            className="w-full p-2 border rounded"
          />
          <input
            value={endereco.cep || ''}
            onChange={(e) => handleEnderecoChange(idx, 'cep', e.target.value)}
            placeholder="CEP"
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Salvar Alterações
      </button>
    </div>
  );
}
