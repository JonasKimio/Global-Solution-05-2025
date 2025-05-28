import { cards } from "@/data/cards";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default function InfoPage({ params }: Props) {
  const card = cards.find((c) => c.id === Number(params.id));

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>Card não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">{card.titulo}</h1>
      <Image src={card.img} alt={card.titulo} width={600} height={400} className="rounded-lg mb-4" />
      <p className="text-lg text-center max-w-xl">{card.conteudo}</p>
      <Link href="/" className="mt-6 text-white underline">Voltar para página inicial</Link>
    </div>
  );
}
