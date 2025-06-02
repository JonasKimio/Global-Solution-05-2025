import Card from "@/components/card";
import { cards } from "@/data/cards";

export default function Page() {
  return (
    <>
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
