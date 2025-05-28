
export function calcularTempo(): number {
  const valoresSalvos = typeof window !== "undefined" ? localStorage.getItem("temposPersonalizados") : null;

  const tempos = valoresSalvos
    ? JSON.parse(valoresSalvos)
    : {
        madrugada: 8,
        manha: 9,
        tarde: 11,
        noite: 15,
      };

  const agora = new Date();
  const hora = agora.getHours();

  if (hora >= 0 && hora < 6) return tempos.madrugada * 60;
  if (hora >= 6 && hora < 12) return tempos.manha * 60;
  if (hora >= 12 && hora < 18) return tempos.tarde * 60;
  if (hora >= 18 && hora < 22) return tempos.noite * 60;
  return 7 * 60; 
}
