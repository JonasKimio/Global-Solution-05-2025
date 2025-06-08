"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://gs-savingfoods-production.up.railway.app/usuarios/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha }),
        }
      );

      const text = await response.text();
      let data = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch (err) {
        console.warn("Resposta não é JSON válida:", text, err);
      }

      if (response.ok && data) {
        localStorage.setItem("usuarioLogado", JSON.stringify(data));
        setErro("");

        switch (data.tipo_usuario) {
          case "ADMIN":
            router.push("/login/admin");
            break;
          case "MERCADO":
            router.push("/login/mercado");
            break;
          case "ONG_ABRIGO":
            router.push("/login/ong");
            break;
          default:
            setErro("Tipo de usuário desconhecido.");
        }
      } else {
        setErro(data?.message || "Credenciais inválidas.");
      }
    } catch (err) {
      console.error("Erro ao tentar logar:", err);
      setErro("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white border-4 border-gray-300 rounded-lg p-6 w-full max-w-3xl text-center mt-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="text-left">
              <label className="block mb-1">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-4 border-gray-300 rounded-lg p-2 w-64"
              />
            </div>
            <div className="text-left">
              <label className="block mb-1">Senha:</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="bg-white border-4 border-gray-300 rounded-lg p-2 w-64"
              />
            </div>
          </div>

          {erro && <p className="text-red-600 mb-4">{erro}</p>}

          <div className="flex justify-center space-x-4">
            <Link
              href="/"
              className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Voltar
            </Link>
            <Link
              href="/cadastrar"
              className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Registrar
            </Link>
            <button
              type="submit"
              className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
