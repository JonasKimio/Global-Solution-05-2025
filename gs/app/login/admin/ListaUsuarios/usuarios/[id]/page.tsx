'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

type Usuario = {
  id_usuario: number;
  nome: string;
  email: string;
  cnpj?: string;
  tipo_usuario: string;
  dataCadastro: string;
};

type Endereco = {
  id_endereco: number;
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
};

type EnderecoComUsuario = Endereco & {
  usuario?: {
    id_usuario: number;
  };
};

export default function UsuarioDetalhesPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);

  useEffect(() => {
    if (!id) return;

    // Busca usuário
    fetch(`https://gs-java-production-d3ea.up.railway.app/usuarios/${id}`)
      .then(res => res.json())
      .then(setUsuario);

    // Busca endereços relacionados
    fetch(`https://gs-java-production-d3ea.up.railway.app/enderecos?page=0&pageSize=100`)
      .then(res => res.json())
      .then((data: EnderecoComUsuario[]) => {
        const relacionados = data.filter(e => e.usuario?.id_usuario === Number(id));
        setEnderecos(relacionados);
      });
  }, [id]);

  const handleDelete = async () => {
    const confirmar = confirm('Deseja realmente deletar este usuário e todas as ligações?');
    if (!confirmar) return;

    const res = await fetch(`https://gs-java-production-d3ea.up.railway.app/usuarios/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('Usuário e dados relacionados deletados.');
      router.push('/login/admin/ListaUsuarios');
    } else {
      alert('Erro ao deletar usuário.');
    }
  };

  if (!usuario) return <p className="p-6">Carregando...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Detalhes do Usuário</h1>
      <div className="bg-white p-4 rounded shadow space-y-2">
        <p><strong>ID:</strong> {usuario.id_usuario}</p>
        <p><strong>Nome:</strong> {usuario.nome}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>CNPJ:</strong> {usuario.cnpj || '—'}</p>
        <p><strong>Tipo:</strong> {usuario.tipo_usuario}</p>
        <p><strong>Data de Cadastro:</strong> {new Date(usuario.dataCadastro).toLocaleDateString('pt-BR')}</p>

        <h2 className="text-xl mt-4 font-semibold">Endereços</h2>
        {enderecos.length === 0 ? (
          <p className="text-gray-600">Nenhum endereço cadastrado.</p>
        ) : (
          <ul className="list-disc pl-6">
            {enderecos.map(end => (
              <li key={end.id_endereco}>
                {end.logradouro}, {end.numero} - {end.bairro}, CEP {end.cep}
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-4 mt-6">
          <Link
            href={`/login/admin/ListaUsuarios/usuarios/${usuario.id_usuario}/editar`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Deletar
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Link
          href="/login/admin/ListaUsuarios"
          className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-white hover:text-blue-600 border border-blue-600"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}
