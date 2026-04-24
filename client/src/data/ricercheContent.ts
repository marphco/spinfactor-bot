export interface RicercheItem {
  title: string;
  date: string;
  link: string;
}

export const RICERCHE_ITEMS: RicercheItem[] = [
  {
    title: "Vinitaly 2026 — Social Media Analytics Dashboard",
    date: "8-15 Aprile 2026",
    link: "https://report.human.vision/vinitaly.html"
  },
  {
    title: "Le dichiarazioni di Donald Trump su Papa Leone XIV",
    date: "14 Aprile 2026",
    link: "https://report.human.vision/trump-papa.html"
  }
];

const months: Record<string, number> = {
  'Gennaio': 0, 'Febbraio': 1, 'Marzo': 2, 'Aprile': 3, 'Maggio': 4, 'Giugno': 5,
  'Luglio': 6, 'Agosto': 7, 'Settembre': 8, 'Ottobre': 9, 'Novembre': 10, 'Dicembre': 11
};

export const getSortedRicercheItems = () => {
  return [...RICERCHE_ITEMS].sort((a, b) => {
    const parse = (d: string) => {
      const parts = d.split(' ');
      if (parts.length !== 3) return new Date(0);

      // Gestione intervalli (es. "8-15"): prendiamo l'ultimo giorno per l'ordinamento
      const dayPart = parts[0].includes('-') ? parts[0].split('-')[1] : parts[0];

      return new Date(parseInt(parts[2]), months[parts[1]] ?? 0, parseInt(dayPart));
    };
    return parse(b.date).getTime() - parse(a.date).getTime();
  });
};
