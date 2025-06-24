import styles from "./Hero.module.scss";
import { IoLogoWhatsapp } from "react-icons/io";
import Image from "next/image";
import { BoxIcon } from "@/components/icons/BoxIcon";
import { SnowflakeIcon } from "@/components/icons/SnowflakeIcon";
import { GlobalIcon } from "@/components/icons/GlobalIcon";
import { ServiceSuportIcon } from "@/components/icons/ServiceSuportIcon";
import Link from "next/link";

const Hero = () => {
  const texts = [
    {
      text: "Solicitar orçamento",
      href: "/form",
    },
    {
      text: "Fale pelo WhatsApp",
      href: "https://wa.me/5519992055290?text=Olá%2C+gostaria+de+solicitar+um+orçamento+para+transporte.",
    },
  ];
  const listItems = {
    firstItems: [
      {
        spotlight: "#b07d62",
        icon: <BoxIcon />,
        text: "Capacidade de até 650kg",
      },
      {
        spotlight: "#489fb5",
        icon: <SnowflakeIcon />,
        text: "Baú com temperatura controlada",
      },
    ],
    lastItems: [
      {
        spotlight: "#b6ff85",
        icon: <GlobalIcon />,
        text: "Entregas locais e estaduais",
      },
      {
        spotlight: "#5a189a",
        icon: <ServiceSuportIcon />,
        text: "Atendimento WhatsApp 24 horas",
      },
    ],
  };

  return (
    <section aria-label="hero" className={styles.container}>
      <div className={styles.heroContent}>
        <div className={styles.heroInfo}>
          <div className={styles.heroHeadline}>
            <div className={styles.headline}>
              <h1>Seu produto, na temperatura certa. Sempre.</h1>
            </div>
            <div className={styles.subheadline}>
              <p>
                Especialistas em transporte refrigerado com controle de
                temperatura até -12 °C, atendimento 24 horas e pagamento
                facilitado via PIX ou cartão.
              </p>
            </div>
          </div>
          <div className={styles.ctaContainer}>
            {texts.map((item, index) => {
              const buttonsStyles = [styles.price, styles.whatsapp];
              const { text, href } = item;
              return (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={href}
                  key={index}
                >
                  <button className={buttonsStyles[index]}>
                    {index === 0 && (
                      <div className={styles.pulseCircle}>
                        <div className={styles.circle} />
                      </div>
                    )}
                    {text}
                    <div className={styles.icon}>
                      {index === 0 ? "" : <IoLogoWhatsapp />}
                    </div>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.listContent}>
            <div className={styles.firstItems}>
              {listItems.firstItems.map((item, index) => {
                const { spotlight, icon, text } = item;
                return (
                  <div key={index} className={styles.item}>
                    <div
                      style={{
                        backgroundColor: spotlight,
                      }}
                      className={styles.spotlight}
                    />
                    <div className={styles.icon}>{icon}</div>
                    <p>{text}</p>
                  </div>
                );
              })}
            </div>
            <div className={styles.lastItems}>
              {listItems.lastItems.map((item, index) => {
                const { spotlight, icon, text } = item;
                return (
                  <div key={index} className={styles.item}>
                    <div
                      style={{
                        backgroundColor: spotlight,
                      }}
                      className={styles.spotlight}
                    />
                    <div className={styles.icon}>{icon}</div>
                    <p>{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <div className={styles.heroIconContainer}>
                <Image
                  alt="modelo 3D de uma fiorino em um smartphone indo em direção a um ícone de localização"
                  src="/images/fiorino.webp"
                  width={1536}
                  height={1024}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
