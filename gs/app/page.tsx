"use client";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="text-center">
        <section className="min-h-screen bg-cover bg-center h-[400px] flex flex-col items-center justify-center text-white">
          <h1
            className="text-5xl text-[#9afcff]"
            style={{
              textShadow:
                "2px 2px 0 #747474, -2px 2px 0 #747474, 2px -2px 0 #747474, -2px -2px 0 #747474",
            }}
          >
            Saving Foods
          </h1>
          <p
            className="text-xl my-4 text-white"
            style={{
              textShadow:
                "1px 1px 0 #747474, -1px 1px 0 #747474, 1px -1px 0 #747474, -1px -1px 0 #747474",
            }}
          >
            Conectamos solidariedade e sustentabilidade: doe, receba, transforme
            vidas.
          </p>
        </section>

        <section className="border-4 border-white rounded-xl w-[70%] mx-auto my-10 p-6 bg-transparent dark:border-[#443e66] dark:bg-gradient-to-b dark:from-[#292258] dark:to-[#06050c]">
          <h2 className="text-3xl text-white dark:text-[#9afcff] mb-4">
            <strong>Sobre o Projeto</strong>
          </h2>
          <p className="text-lg text-gray-100 mb-4">
            Imagine um lugar onde a solidariedade encontra a oportunidade de
            transformar o que seria desperdício em esperança. Nosso projeto
            nasceu com esse propósito: ser a ponte entre mercados que desejam
            doar alimentos próximos da validade e ONGs ou casas de abrigo que
            precisam desses recursos para alimentar quem mais necessita.
          </p>
          <p className="text-lg text-gray-100">
            Somos uma plataforma simples, direta e eficaz. Aqui, mercados e
            indústrias podem cadastrar produtos que não serão mais
            comercializados, mas ainda estão em perfeito estado para consumo.
            Esses itens são disponibilizados em uma vitrine solidária, onde ONGs
            e instituições sociais podem visualizar, selecionar e reservar o que
            precisam — tudo de forma rápida e transparente.
            <br />
            <br />
            Em tempos de crise, enchentes, fome e desigualdade, nosso sistema
            oferece uma solução inteligente: reduzir o desperdício, facilitar a
            logística de doações e garantir que os alimentos cheguem a quem
            realmente precisa.
            <br />
            <br />
            Ao participar, sua empresa não apenas evita perdas, mas mostra seu
            compromisso social e ambiental. E se você é uma ONG ou abrigo,
            encontra aqui uma rede confiável e acessível para manter suas ações
            funcionando.
            <br />
            <br />
            Juntos, podemos fazer mais com menos, transformar alimentos em
            dignidade e criar uma corrente de impacto real.
          </p>
        </section>

        <div className="flex items-center">
          <section className="mx-auto my-10 p-6 bg-transparent dark:border-[#443e66] dark:bg-gradient-to-b dark:from-[#292258] dark:to-[#06050c]">
            <Image
              src="/images/FIAP.png"
              alt="Logo da FIAP"
              width={300}
              height={300}
              className="w-[300px] h-[300px] object-contain"
              style={{ width: "300px", height: "300px" }}
            />
          </section>
        </div>
      </main>
    </>
  );
}
