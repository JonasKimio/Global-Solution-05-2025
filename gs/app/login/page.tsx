"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (usuario === "Admin" && senha === "Admin123") {

      setErro("");
      router.push("/login/adminperresp");
    } else {
      setErro("Usuário ou senha inválidos");
    }
  };
    return (
        <div className="flex items-center justify-center">
            <div className="bg-white border-4 border-gray-300 rounded-lg p-6 w-full max-w-3xl text-center mt-6 mb-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">Login</h1>
                      <form onSubmit={handleLogin}>
                <div className="flex justify-center space-x-4 mb-6">
                    <label>Email:</label>
                    <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required className="bg-white border-4 border-gray-300 rounded-lg" />
                    <label>Senha:</label>
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required className="bg-white border-4 border-gray-300 rounded-lg" />
                </div>
                {erro && <p style={{ color: "red" }}>{erro}</p>}
                <div className="flex justify-center space-x-4 mb-6">
                    <Link href="/" className="inline-block py-2 px-4 bg-green-600 text-white text-sm border-2 border-green-600 rounded-full hover:bg-white hover:text-green-600 hover:border-green-600 transition-all duration-300">Voltar</Link>
                    <button type="submit" className="inline-block py-2 px-4 bg-green-600 text-white text-sm border-2 border-green-600 rounded-full hover:bg-white hover:text-green-600 hover:border-green-600 transition-all duration-300">Entrar</button>
                </div>
                </form>
            </div>
        </div>
    );
}