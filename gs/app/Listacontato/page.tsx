import { listaContato } from "@/data/listaContato";
import Image from "next/image";
import Link from "next/link";

function Page() {
  return (
  <>
    <div className="flex items-center justify-center">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg mt-20 mb-auto">
        <h1 className="font-bold text-center mb-6 text-black">Contatos</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="uppercase py-3 px-4 text-center align-middle">
                  Foto
                </th>
                <th className="uppercase py-3 px-4 text-center align-middle">
                  Nome
                </th>
                <th className="uppercase py-3 px-4 text-center align-middle">
                  Detalhe
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {listaContato.map((Contato) => (
                <tr key={Contato.id} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-center align-middle flex justify-center">
                    <Image
                      width={132}
                      height={132}
                      src={Contato.foto}
                      alt={Contato.fotoalt}
                      className="h-32 w-auto align-middle"
                    />
                  </td>
                  <td className="py-3 px-4 text-center align-middle">
                    {Contato.nome}
                  </td>
                  <td className="py-3 px-4 text-center align-middle">
                    <Link
                      href={`/contato/${Contato.id}`}
                      className="inline-block py-2 px-4 bg-green-600 text-white text-sm border-2 border-green-600 rounded-full hover:bg-white hover:text-green-600 hover:border-green-600 transition-all duration-300"
                    >
                      Ver Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}

export default Page;
