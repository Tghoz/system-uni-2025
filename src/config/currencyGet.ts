import { FileIcon, NumIcon, IdkIcon } from "../icons/CurrencyIcons";

interface Data {
  monitors?: {
    bcv?: { title?: string; price?: number };
    enparalelovzla?: { title?: string; price?: number };
    otro?: { title?: string };
    paypal?: { price?: number };
  };
  datetime: { date: string };
}

export const items = (data?: Data) => [
  {
    title: data?.monitors?.bcv?.title || "Título default",
    content: data?.monitors?.bcv?.price || 0,
    icon: FileIcon,
    date: data?.datetime.date,
  },
  {
    title: data?.monitors?.enparalelovzla?.title || "Título default",
    content: data?.monitors?.enparalelovzla?.price?.toFixed(2) || "0.00",
    icon: NumIcon,
    date: data?.datetime.date,
  },
  {
    title: data?.monitors?.otro?.title || "Otro mercado",
    content: data?.monitors?.paypal?.price || 0,
    icon: IdkIcon,
    date: data?.datetime.date,
  },
];