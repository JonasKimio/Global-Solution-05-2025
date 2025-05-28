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

export default function Gerenciador() {
  const [perguntaId, setPerguntaId] = useState("");
  const [respostaId, setRespostaId] = useState("");
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [novaPergunta, setNovaPergunta] = useState("");
  const [novaResposta, setNovaResposta] = useState({
    texto: "",
    letra: "",
    correta: "N" as "S" | "N",
    id_pergunta: 0,
  });

  const [tempos, setTempos] = useState({
    madrugada: 8,
    manha: 9,
    tarde: 11,
    noite: 15,
  });

  const salvarTempos = () => {
    localStorage.setItem("temposPersonalizados", JSON.stringify(tempos));
    alert("Tempos salvos!");
  };

  const carregarTempos = () => {
    const valoresSalvos = localStorage.getItem("temposPersonalizados");
    if (valoresSalvos) {
      setTempos(JSON.parse(valoresSalvos));
    }
  };

  useEffect(() => {
    carregarTempos();
  }, []);

  const buscarPerguntas = async () => {
    if (perguntaId === "*") {
      const resp = await apiJava.get("/perguntas");
      setPerguntas(resp.data);
    } else {
      try {
        const resp = await apiJava.get(`/perguntas/${perguntaId}`);
        setPerguntas([resp.data]);
        // tslint:disable-next-line
      } catch (e) {
        console.error(e)
        alert("Pergunta não encontrada.");
        setPerguntas([]);
      }
    }
  };

  const buscarRespostas = async () => {
    if (respostaId === "*") {
      const resp = await apiJava.get("/respostas");
      setRespostas(resp.data);
    } else {
      try {
        const resp = await apiJava.get(`/respostas/${respostaId}`);
        setRespostas([resp.data]);
        // tslint:disable-next-line
      } catch (e) {
        console.error(e)
        alert("Resposta não encontrada.");
        setRespostas([]);
      }
    }
  };

  const adicionarPergunta = async () => {
    await apiJava.post("/perguntas", { enunciado: novaPergunta });
    alert("Pergunta adicionada!");
    setNovaPergunta("");
    buscarPerguntas();
  };

  const adicionarResposta = async () => {
    await apiJava.post("/respostas", {
      texto: novaResposta.texto,
      letra: novaResposta.letra,
      correta: novaResposta.correta,
      perguntas: { id_pergunta: novaResposta.id_pergunta },
    });
    alert("Resposta adicionada!");
    setNovaResposta({ texto: "", letra: "", correta: "N", id_pergunta: 0 });
    buscarRespostas();
  };

  const atualizarPergunta = async (p: Pergunta) => {
    const novoEnunciado = prompt("Novo enunciado:", p.enunciado);
    if (novoEnunciado) {
      await apiJava.put(`/perguntas/${p.id_pergunta}`, { enunciado: novoEnunciado });
      alert("Pergunta atualizada!");
      buscarPerguntas();
    }
  };

  const atualizarResposta = async (r: Resposta) => {
    const novoTexto = prompt("Novo texto:", r.texto);
    if (novoTexto) {
      await apiJava.put(`/respostas/${r.id_resposta}`, {
        texto: novoTexto,
        letra: r.letra,
        correta: r.correta,
        perguntas: { id_pergunta: r.perguntas.id_pergunta },
      });
      alert("Resposta atualizada!");
      buscarRespostas();
    }
  };

  const inputStyle = "bg-white border-2 border-gray-300 rounded px-2 py-1 w-full";
  const buttonStyle = "py-2 px-4 bg-blue-600 text-white border border-blue-600 rounded hover:bg-white hover:text-blue-600 transition-all";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 p-6">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6">
        {/* Menu de Perguntas e Respostas */}
        <div className="bg-white border rounded-lg p-6 w-full lg:w-1/2 shadow-md">
          <h2 className="text-2xl font-bold mb-4">🔍 Perguntas</h2>
          <div className="flex gap-2 mb-2">
            <input
              placeholder="ID ou *"
              value={perguntaId}
              onChange={(e) => setPerguntaId(e.target.value)}
              className={inputStyle}
            />
            <button onClick={buscarPerguntas} className={buttonStyle}>Buscar</button>
          </div>

          <h3 className="text-xl font-bold mt-6 mb-2">➕ Adicionar Pergunta</h3>
          <ul className="mb-4 space-y-1">
            {perguntas.map((p) => (
              <li key={p.id_pergunta} className="flex justify-between items-center">
                {p.id_pergunta} - {p.enunciado}
                <button onClick={() => atualizarPergunta(p)} className={buttonStyle}>Editar</button>
              </li>
            ))}
          </ul>
          <input
            placeholder="Quiz"
            //value={novaPergunta}
            //onChange={(e) => setNovaPergunta(e.target.value)}
            className={inputStyle}
          />
          <input
            placeholder="Nova Pergunta"
            value={novaPergunta}
            onChange={(e) => setNovaPergunta(e.target.value)}
            className={inputStyle}
          />
          <button onClick={adicionarPergunta} className={`${buttonStyle} mt-2`}>Adicionar Pergunta</button>

          <h2 className="text-2xl font-bold mt-6 mb-4">🔍 Respostas</h2>
          <div className="flex gap-2 mb-2">
            <input
              placeholder="ID ou *"
              value={respostaId}
              onChange={(e) => setRespostaId(e.target.value)}
              className={inputStyle}
            />
            <button onClick={buscarRespostas} className={buttonStyle}>Buscar</button>
          </div>

          <ul className="mb-4 space-y-1">
            {respostas.map((r) => (
              <li key={r.id_resposta} className="flex justify-between items-center">
                {r.letra}) {r.texto} - {r.correta} (P: {r.perguntas.id_pergunta})
                <button onClick={() => atualizarResposta(r)} className={buttonStyle}>Editar</button>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-2">➕ Adicionar Resposta</h3>
          <div className="grid grid-cols-1 gap-2">
            <input
              placeholder="Quiz"
              //value={novaResposta.texto}
              //onChange={(e) => setNovaResposta({ ...novaResposta, texto: e.target.value })}
              className={inputStyle}
            />
            <input
              placeholder="Texto"
              value={novaResposta.texto}
              onChange={(e) => setNovaResposta({ ...novaResposta, texto: e.target.value })}
              className={inputStyle}
            />
            <input
              placeholder="Letra"
              maxLength={1}
              value={novaResposta.letra}
              onChange={(e) => setNovaResposta({ ...novaResposta, letra: e.target.value })}
              className={inputStyle}
            />
            <select
              value={novaResposta.correta}
              onChange={(e) => setNovaResposta({ ...novaResposta, correta: e.target.value as "S" | "N" })}
              className={inputStyle}
            >
              <option value="N">Incorreta</option>
              <option value="S">Correta</option>
            </select>
            <input
              placeholder="ID Pergunta"
              type="number"
              value={novaResposta.id_pergunta}
              onChange={(e) => setNovaResposta({ ...novaResposta, id_pergunta: Number(e.target.value) })}
              className={inputStyle}
            />
            <button onClick={adicionarResposta} className={buttonStyle}>Adicionar Resposta</button>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6 w-full lg:w-1/2 shadow-md">
          <h2 className="text-2xl font-bold mb-4">⏱️ Configurar Tempos</h2>
          <div className="grid grid-cols-2 gap-4">
            <label>Madrugada (0-6h):</label>
            <input
              type="number"
              value={tempos.madrugada}
              onChange={(e) => setTempos({ ...tempos, madrugada: Number(e.target.value) })}
              className={inputStyle}
            />
            <label>Manhã (6-12h):</label>
            <input
              type="number"
              value={tempos.manha}
              onChange={(e) => setTempos({ ...tempos, manha: Number(e.target.value) })}
              className={inputStyle}
            />
            <label>Tarde (12-18h):</label>
            <input
              type="number"
              value={tempos.tarde}
              onChange={(e) => setTempos({ ...tempos, tarde: Number(e.target.value) })}
              className={inputStyle}
            />
            <label>Noite (18-22h):</label>
            <input
              type="number"
              value={tempos.noite}
              onChange={(e) => setTempos({ ...tempos, noite: Number(e.target.value) })}
              className={inputStyle}
            />
          </div>
          <button onClick={salvarTempos} className={`${buttonStyle} mt-4`}>Salvar Tempos</button>
        </div>
      </div>
    </div>
  );
}
