"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#32997f] dark:bg-[#110e24] text-white pt-[100px]">
      <Header />
      <main className="text-center">
        <section className="bg-cover bg-center h-[400px] flex flex-col items-center justify-center text-white"
                 style={{ backgroundImage: "url(img/Banner.jpg)" }}>
          <h1 className="text-5xl text-[#9afcff] drop-shadow-md">EcoCalc</h1>
          <p className="text-xl my-4 drop-shadow-md">Calculadora de Pegada de Carbono de Energia</p>
          <a href="calculadora.html" className="bg-white text-black font-bold px-6 py-2 rounded-lg hover:bg-transparent hover:text-white border-4 border-white transition">
            Ir para a Calculadora
          </a>
        </section>

        <section className="border-4 border-white rounded-xl w-[70%] mx-auto my-10 p-6 bg-transparent dark:border-[#443e66] dark:bg-gradient-to-b dark:from-[#292258] dark:to-[#06050c]">
          <h2 className="text-3xl text-white dark:text-[#9afcff] mb-4">Calculadora</h2>
          <p className="text-lg text-gray-100 mb-4">
            O projeto consiste no desenvolvimento de um programa voltado para usuários interessados em sustentabilidade...
          </p>
          <p className="text-lg text-gray-100">
            O objetivo principal é conscientizar os usuários sobre como pequenas mudanças...
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
