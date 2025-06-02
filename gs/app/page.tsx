"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <main className="text-center">
        <section className="min-h-screen bg-cover bg-center h-[400px] flex flex-col items-center justify-center text-white"
                 style={{ backgroundImage: "public/images/Banner1.jpg" }}>
          <h1 className="text-5xl text-[#9afcff] drop-shadow-md">Saving Food</h1>
          <p className="text-xl my-4 drop-shadow-md">(Descrição do Projeto)</p>
          <Link href="/projeto" className="bg-white text-black font-bold px-6 py-2 rounded-lg hover:bg-transparent hover:text-white border-4 border-white transition">
            Ir para o (Projeto)
          </Link>
        </section>

        <section className="border-4 border-white rounded-xl w-[70%] mx-auto my-10 p-6 bg-transparent dark:border-[#443e66] dark:bg-gradient-to-b dark:from-[#292258] dark:to-[#06050c]">
          <h2 className="text-3xl text-white dark:text-[#9afcff] mb-4">Saving Food</h2>
          <p className="text-lg text-gray-100 mb-4">
            (Descrição do Projeto)
          </p>
          <p className="text-lg text-gray-100">
            (Descrição do Projeto)
          </p>
        </section>
      <div className="flex items-center">
      <section className="mx-auto my-10 p-6 bg-transparent dark:border-[#443e66] dark:bg-gradient-to-b dark:from-[#292258] dark:to-[#06050c] ">
        <Image
          src="/images/FIAP.png"
          alt="Logo da FIAP"
          width={300}
          height={300}
          className="w-[300px] h-[300px] object-contain"
          style={{ width: '300px', height: '300px' }}
        />
        </section>
        </div>
      </main>
  );
}