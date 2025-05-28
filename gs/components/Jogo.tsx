"use client";

import { useEffect, useState } from "react";
//import { apiJava } from "@/services/api";

interface Pergunta {
  id_pergunta: number;
  enunciado: string;
}

interface Resposta {
  id_resposta: number;
  texto: string;
  letra: string;
  correta: "S" | "N";
  perguntas: Pergunta;
}

type JogoProps = {
  linha: number;
  tempo: number;
  onExit: () => void;
};

function embaralharArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Jogo({ linha, tempo, onExit }: JogoProps) {
  const estilo = linha === 1 ? { container: "bg-gray-300" } : { container: "bg-green-300" };

  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [quizPerguntas, setQuizPerguntas] = useState<Pergunta[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostasSelecionadas, setRespostasSelecionadas] = useState<Resposta[]>([]);
  const [quizFinalizado, setQuizFinalizado] = useState(false);

  // Guarda as respostas embaralhadas por pergunta para ordem fixa
  const [respostasEmbaralhadasPorPergunta, setRespostasEmbaralhadasPorPergunta] = useState<Record<number, Resposta[]>>({});

  useEffect(() => {
    const carregarDados = async () => {
      const perguntasResponse = await apiJava.get("/perguntas");
      const respostasResponse = await apiJava.get("/respostas");

      const perguntasAleatorias = embaralharArray(perguntasResponse.data).slice(0, 12) as Pergunta[];

      setRespostas(respostasResponse.data);
      setQuizPerguntas(perguntasAleatorias);
    };

    carregarDados();
  }, []);

  // Depois que perguntas e respostas estiverem carregadas, embaralha as respostas para cada pergunta
  useEffect(() => {
    if (respostas.length > 0 && quizPerguntas.length > 0) {
      const mapaRespostas: Record<number, Resposta[]> = {};
      quizPerguntas.forEach((pergunta) => {
        const respostasDaPergunta = respostas.filter(
          (res) => res.perguntas.id_pergunta === pergunta.id_pergunta
        );
        mapaRespostas[pergunta.id_pergunta] = embaralharArray(respostasDaPergunta);
      });
      setRespostasEmbaralhadasPorPergunta(mapaRespostas);
    }
  }, [respostas, quizPerguntas]);

  const perguntaAtual = quizPerguntas[indiceAtual];
  const respostasDaPergunta = perguntaAtual ? respostasEmbaralhadasPorPergunta[perguntaAtual.id_pergunta] ?? [] : [];

  const selecionarResposta = (resposta: Resposta) => {
    setRespostasSelecionadas([...respostasSelecionadas, resposta]);

    if (indiceAtual + 1 < quizPerguntas.length) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      setQuizFinalizado(true);
    }
  };

  const totalAcertos = respostasSelecionadas.filter((res) => res.correta === "S").length;

  const minutos = Math.floor(tempo / 60);
  const segundos = tempo % 60;

  return (
    <div className={`flex justify-center items-center p-6 ${estilo.container}`}>
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md bg-white">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">
          Jogo de Perguntas e Respostas
        </h2>

        {quizFinalizado ? (
          <div className="text-center text-xl font-semibold text-green-800">
            <p className="mb-2">Quiz Finalizado!</p>
            <p>Você acertou {totalAcertos} de {quizPerguntas.length} perguntas.</p>
          </div>
        ) : perguntaAtual ? (
          <div>
            <p className="text-xl mb-4">{perguntaAtual.enunciado}</p>
            <div className="space-y-4">
              {respostasDaPergunta.map((res) => (
                <button
                  key={res.id_resposta}
                  onClick={() => selecionarResposta(res)}
                  className="w-full py-2 px-4 border-2 rounded-full bg-white text-black hover:bg-blue-100 transition-all duration-300"
                >
                  <strong>{res.letra}.</strong> {res.texto}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p>Carregando perguntas...</p>
        )}

        <div className="flex justify-between items-center mt-6">
          <div className="text-lg text-black">
            <strong>Tempo Restante:</strong> {minutos}m {segundos}s
          </div>
          <button
            onClick={onExit}
            className="py-2 px-4 bg-red-600 text-white text-sm border-2 border-red-600 rounded-full hover:bg-white hover:text-red-600 transition-all duration-300"
          >
            Sair do Jogo
          </button>
        </div>
      </div>
    </div>
  );
}
