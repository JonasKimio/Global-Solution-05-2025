import Card from "@/components/card";
import { cards } from "@/data/cards";

export default function Page() {
  return (
    <>
      <section
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: 'url("/image/Banner.jpg")' }}
      >
        <h1 className="text-5xl text-[#9afcff] drop-shadow-md mb-4">(Projeto)</h1>
        <p className="text-xl text-white drop-shadow-md mb-8">(Descrição do Projeto)</p>
      </section>

      <section className="py-10 px-4">
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              imageSrc={card.img}
              title={card.titulo}
              description={card.descricao}
            />
          ))}
        </div>
      </section>
    </>
  );
}
