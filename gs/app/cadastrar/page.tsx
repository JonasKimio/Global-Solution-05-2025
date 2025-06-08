"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CadastrarUsuarioPage() {
  const router = useRouter();
  const [tipoUsuario, setTipoUsuario] = useState("ONG_ABRIGO");
  const [form, setForm] = useState({
    email: "",
    cnpj: "",
    nome: "",
    senha: "",
    confirmarSenha: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
  });
  const [erro, setErro] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    const usuarioPayload = {
      email: form.email,
      cnpj: form.cnpj,
      nome: form.nome,
      senha: form.senha,
      tipo_usuario: tipoUsuario,
    };

    try {
      const userRes = await fetch("https://gs-savingfoods-production.up.railway.app/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioPayload),
      });

      if (!userRes.ok) throw new Error("Erro ao cadastrar usuário");

      // Se for mercado, cadastrar endereço
      if (tipoUsuario === "MERCADO") {
        const user = await userRes.json();
        const enderecoPayload = {
          logradouro: form.logradouro,
          numero: form.numero,
          bairro: form.bairro,
          cep: form.cep,
          id_usuario: user.id_usuario,
        };

        const enderecoRes = await fetch("https://gs-savingfoods-production.up.railway.app/enderecos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(enderecoPayload),
        });

        if (!enderecoRes.ok) throw new Error("Erro ao cadastrar endereço");
      }

      router.push("/login");
    } catch (err: any) {
      setErro(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Usuário</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Tipo de Usuário:
          <select
            name="tipoUsuario"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            className="w-full mt-1 border rounded p-2"
          >
            <option value="ONG_ABRIGO">ONG / Abrigo</option>
            <option value="MERCADO">Mercado</option>
          </select>
        </label>

        <label className="block">
          Nome:
          <input type="text" name="nome" value={form.nome} onChange={handleChange} required className="w-full mt-1 border rounded p-2" />
        </label>

        <label className="block">
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full mt-1 border rounded p-2" />
        </label>

        <label className="block">
          Senha:
          <input type="password" name="senha" value={form.senha} onChange={handleChange} required className="w-full mt-1 border rounded p-2" />
        </label>

        <label className="block">
          Confirmar Senha:
          <input type="password" name="confirmarSenha" value={form.confirmarSenha} onChange={handleChange} required className="w-full mt-1 border rounded p-2" />
        </label>

        {tipoUsuario === "MERCADO" && (
          <>

            <label className="block">
                CNPJ:
                <input type="text" name="cnpj" value={form.cnpj} onChange={handleChange} className="w-full mt-1 border rounded p-2" />
            </label>
            <label className="block">
              Logradouro:
              <input type="text" name="logradouro" value={form.logradouro} onChange={handleChange} required className="w-full mt-1 border rounded p-2" />
            </label>

            <label className="block">
              Número:
              <input type="text" name="numero" value={form.numero} onChange={handleChange} required className="w-full mt-1 border rounded p-2" />
            </label>

            <label className="block">
              Bairro:
              <input type="text" name="bairro" value={form.bairro} onChange={handleChange} required className="w-full mt-1 border rounded p-2" />
            </label>

            <label className="block">
              CEP:
              <input type="text" name="cep" value={form.cep} onChange={handleChange} className="w-full mt-1 border rounded p-2" />
            </label>
          </>
        )}

        {erro && <p className="text-red-600">{erro}</p>}
          <div className="flex justify-center space-x-4 mb-6">
            <Link
              href="/"
              className="inline-block py-2 px-4 bg-green-600 text-white text-sm border-2 border-green-600 rounded-full hover:bg-white hover:text-green-600 hover:border-green-600 transition-all duration-300"
            >
              Voltar
            </Link>
            <Link
              href="/login"
              className="inline-block py-2 px-4 bg-green-600 text-white text-sm border-2 border-green-600 rounded-full hover:bg-white hover:text-green-600 hover:border-green-600 transition-all duration-300"
            >
              Login
            </Link>
            <button
              type="submit"
              className="inline-block py-2 px-4 bg-green-600 text-white text-sm border-2 border-green-600 rounded-full hover:bg-white hover:text-green-600 hover:border-green-600 transition-all duration-300"
            >
              Cadastrar
            </button>
          </div>
      </form>
    </div>
  );
}
