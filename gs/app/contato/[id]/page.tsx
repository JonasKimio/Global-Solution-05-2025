"use client";

import { listaContato } from "@/data/listaContato";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

type detalhesContatoProps = {
  params: Promise<{
    id: string;
  }>;
};

function Page({ params }: detalhesContatoProps) {
  const resolvedParams = use(params);
  const contatoID = parseInt(resolvedParams.id);
  const contato = listaContato.find((contato) => contato.id === contatoID);

  if (!contato) return null;

  return (
    <>
    <div className="flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 mt-44 mb-auto">
        <h2 className="text-2xl font-bold text-center text-black mb-6 bg-gray-300">
          {contato.nome}
        </h2>

        <div className="flex justify-between items-center mb-6">
          <div className="flex-shrink-0">
            <Image
              src={contato.foto}
              width={132}
              height={132}
              alt={contato.fotoalt}
              className="h-32 w-auto object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col items-center">
            <p className="text-gray-700">
              <strong>Nome:</strong> {contato.nome}
            </p>
            <p className="text-gray-700">
              <strong>RM:</strong> {contato.rm}
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <a
              href={contato.github}
              target="_blank"
              className="inline-block py-2 px-4 bg-green-600 text-white text-sm border-2 border-green-600 rounded-full hover:bg-white hover:text-green-600 hover:border-green-600 transition-all duration-300"
            >
              GitHub
            </a>
            <a
              href={contato.linkedin}
              target="_blank"
              className="inline-block py-2 px-4 bg-green-600 text-white text-sm border-2 border-green-600 rounded-full hover:bg-white hover:text-green-600 hover:border-green-600 transition-all duration-300"
            >
              Linkedin
            </a>
            <a
              href={`mailto:${contato.email}`}
              target="_blank"
              className="inline-block py-2 px-4 bg-green-600 text-white text-sm border-2 border-green-600 rounded-full hover:bg-white hover:text-green-600 hover:border-green-600 transition-all duration-300"
            >
              E-mail
            </a>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Link
            href="/listacontato"
            className="inline-block py-2 px-4 bg-green-600 text-white text-sm border-2 border-green-600 rounded-full hover:bg-white hover:text-green-600 hover:border-green-600 transition-all duration-300"
          >
            Voltar
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default Page;
