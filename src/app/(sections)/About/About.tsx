"use client";

import { sectionRefs } from "@/utils/sectionRefs";
import styles from "./About.module.scss";
import Image from "next/image";

const About = () => {
  const highlights = [
    "Até 650kg de capacidade no baú refrigerado",
    "Temperatura controlada até -12 °C",
    "Atendemos pessoas físicas e empresas",
    "Entregas locais e estaduais com flexibilidade",
  ];

  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["sobre nós"] = el as HTMLElement;
      }}
      className={styles.container}
    >
      <div className={styles.title}>
        <h2>Compromisso com sua carga. Respeito com seu tempo.</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <p>
            A LSE Transportes é uma empresa familiar especializada no transporte
            de cargas refrigeradas. Com atuação local e estadual, levamos mais
            que produtos: levamos confiança, agilidade e responsabilidade em
            cada entrega.
          </p>
          <p>
            Nosso foco é garantir que sua carga chegue no tempo certo e na
            temperatura ideal, com atendimento 24h, comunicação direta via
            WhatsApp e pagamento facilitado.
          </p>
        </div>
        <div className={styles.logo}>
          <Image
            alt="LSE Serviço de Transporte - logo"
            src="/images/logo_icon.webp"
            width={2000}
            height={2000}
          />
        </div>
        <div className={styles.backlayer}>
          <Image
            alt="Fiorino na estrada"
            src="/images/road.webp"
            width={1101}
            height={734}
          />
        </div>
      </div>
      <div className={styles.highlights}>
        {highlights.map((highlight, index) => (
          <div className={styles.highlight} key={index}>
            <p>{highlight}</p>
          </div>
        ))}
      </div>
      <div className={styles.message}>
        <p>
          Começamos pequenos, mas com grandes valores: pontualidade, honestidade
          e cuidado com cada entrega. Estamos prontos pra crescer junto com
          você.
        </p>
      </div>
    </section>
  );
};

export default About;
