import { CalendarIcon } from "@/components/icons/CalendarIcon";
import { CardanoIcon } from "@/components/icons/CardanoIcon";
import { ClockIcon } from "@/components/icons/ClockIcon";
import { EmojiIcon } from "@/components/icons/EmojiIcon";
import { RadarIcon } from "@/components/icons/RadarIcon";
import { SnowflakeIcon } from "@/components/icons/SnowflakeIcon";

export const topics = [
  {
    title: "Rastreamento em tempo real",
    description:
      "Saiba onde sua carga está a cada quilômetro, com atualizações instantâneas via WhatsApp ou e‑mail.",
    icon: RadarIcon,
  },
  {
    title: "Controle de temperatura inteligente",
    description:
      "Sensores de última geração mantêm o baú em até –12 °C constante, garantindo a qualidade dos produtos.",
    icon: SnowflakeIcon,
  },
  {
    title: "Entrega sob medida",
    description:
      "Escolha janelas de horário e formatos de agendamento flexíveis: emergencial, agendado ou recorrente.",
    icon: CalendarIcon,
  },
  {
    title: "Atendimento dedicado",
    description:
      "Comunicação direta com o motorista responsável 24h, para tirar dúvidas e ajustar rotas em tempo real.",
    icon: EmojiIcon,
  },
  {
    title: "Pontualidade garantida",
    description:
      "Rigor no cumprimento de prazos, com coletas e entregas dentro da janela combinada, mesmo em situações emergenciais.",
    icon: ClockIcon,
  },
  {
    title: "Sustentabilidade em rota",
    description:
      "Rotas otimizadas para reduzir combustível e pegada de carbono, unindo agilidade e responsabilidade ambiental.",
    icon: CardanoIcon,
  },
];
