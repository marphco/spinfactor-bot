import ilriformista from "../assets/ilriformista.svg";
import libero from "../assets/libero.png";
import adn from "../assets/adn.svg";
import corriere from "../assets/corriere.svg";
import la7 from "../assets/la7.svg";
import s24 from "../assets/s24.svg";
import urania from "../assets/urania.svg";

export interface PressItem {
  title: string;
  date: string;
  brand: string;
  logo: string;
  href: string;
}

export const PRESS_ITEMS: PressItem[] = [
  {
    title: `Referendum giustizia, il "Sì" fa il vuoto anche sui social`,
    date: "15 Gennaio 2026",
    brand: "Libero",
    logo: libero,
    href: "https://www.liberoquotidiano.it/news/giustizia/45849382/referendum-giustizia-si-fa-vuoto-anche-social/",
  },
  {
    title: `Sondaggi Referendum giustizia, Brunetti: "Il Sì è in vantaggio ma vietato adagiarsi. Riformisti e libdem decisivi, dal No forzature ideologiche"`,
    date: "16 Gennaio 2026",
    brand: "Il Riformista",
    logo: ilriformista,
    href: "https://www.ilriformista.it/sondaggi-referendum-giustizia-brunetti-il-si-e-in-vantaggio-ma-vietato-adagiarsi-riformisti-e-libdem-decisivi-dal-no-forzature-ideologiche-496232/",
  },
  {
    title: `Referendum giustizia, Spin Factor: "Su social sì avanti 57% contro il 43% del no"`,
    date: "15 Gennaio 2026",
    brand: "ADN Kronos",
    logo: adn,
    href: "https://www.adnkronos.com/politica/referendum-giustizia-spin-factor-su-social-si-avanti-57-contro-il-43-del-no_6Btef6tie01CiKSrPfGRWY",
  },
  {
    title: `Vinitaly superstar social: in 7 giorni 14.700 contenuti e 98 milioni di interazioni`,
    date: "15 Aprile 2026",
    brand: "Il Sole 24 Ore",
    logo: s24,
    href: "https://www.ilsole24ore.com/art/vinitaly-superstar-social-7-giorni-14700-contenuti-e-98-milioni-interazioni-AIonmgXC",
  },
  {
    title: `No alle armi e all’Europa: la nostalgia gialloverde della coppia Conte-Salvini`,
    date: "11 Dicembre 2025",
    brand: "Corriere della Sera",
    logo: corriere,
    href: "https://roma.corriere.it/notizie/politica/25_dicembre_11/conte-salvini-nostalgia-gialloverde-no-armi-europa-ea6dbac5-82f3-4497-a6f5-e34f308dcxlk.shtml",
  },
  {
    title: `Sui social utenti scatenati per Italia fuori dai Mondiali, le parole chiave sono durissime`,
    date: "14 Aprile 2026",
    brand: "ADN Kronos",
    logo: adn,
    href: "https://www.adnkronos.com/sport/sui-social-utenti-scatenati-per-italia-fuori-dai-mondiali-le-parole-chiave-sono-durissime_4HeJYJmoQQHI53a1zsXvet",
  },
  {
    title: `Gli italiani e la paura della guerra`,
    date: "10 Dicembre 2025",
    brand: "LA7",
    logo: la7,
    href: "https://www.la7.it/tagada/video/gli-italiani-e-la-paura-della-guerra-08-12-2025-624006",
  },
  {
    title: `Intervista a Tiberio Brunetti`,
    date: "22 Aprile 2026",
    brand: "Urania",
    logo: urania,
    href: "https://uraniamedia.it/watch/intervista-tiberio-brunetti",
  },
];

const months: Record<string, number> = {
  'Gennaio': 0, 'Febbraio': 1, 'Marzo': 2, 'Aprile': 3, 'Maggio': 4, 'Giugno': 5,
  'Luglio': 6, 'Agosto': 7, 'Settembre': 8, 'Ottobre': 9, 'Novembre': 10, 'Dicembre': 11
};

export const getSortedPressItems = () => {
  return [...PRESS_ITEMS].sort((a, b) => {
    const parse = (d: string) => {
      const parts = d.split(' ');
      if (parts.length !== 3) return new Date(0);
      return new Date(parseInt(parts[2]), months[parts[1]] ?? 0, parseInt(parts[0]));
    };
    return parse(b.date).getTime() - parse(a.date).getTime();
  });
};
