export type CardInfo = {
  id: number;
  img: string;
  titulo: string;
  descricao: string;
  conteudo: string;
};

export const cards: CardInfo[] = [
  {
    id: 1,
    img: "/images/Banner1.jpg",
    titulo: "Título 1",
    descricao: "Descrição da primeira caixa.",
    conteudo: "Conteudo da página"
  },
  {
    id: 2,
    img: "/images/Banner2.jpg",
    titulo: "Título 2",
    descricao: "Descrição da segunda caixa.",
    conteudo: "Conteudo da página"
  },
  // adicione mais conforme necessário
];
