"use client";
import { sectionRefs } from "@/utils/sectionRefs";
import styles from "./Services.module.scss";
import { servicesList } from "./data";
import Image from "next/image";
import Link from "next/link";

const Services = () => {
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["serviços"] = el as HTMLElement;
      }}
      id="services"
      className={styles.container}
      style={{
        height: "auto",
        minHeight: "100vh",
      }}
    >
      <div className={styles.servicesContent}>
        <aside>
          <p className={styles.textaside}>LSE - Serviço de Transporte</p>
        </aside>
        <div className={styles.servicesIntro}>
          <div className={styles.intro}>
            <h1>Serviços especializados para produtos que exigem cuidado.</h1>
            <p>
              Atendemos empresas e pessoas físicas com transporte refrigerado
              controlado até -12 °C, ideal para alimentos, medicamentos, flores
              e outros itens sensíveis. Atuação local e estadual com agilidade,
              pontualidade e atendimento 24h.
            </p>
          </div>
        </div>
        <div className={styles.services}>
          <h2>Lista de serviços:</h2>
          <div className={styles.servicesList}>
            {servicesList.map((service, index) => {
              const { title, icon, image, alt, description } = service;
              return (
                <div key={index}>
                  <div
                    className={styles.service}
                  >
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <div className={styles.icon}>{icon}</div>
                    <div className={styles.imageContainer}>
                      <Image alt={alt} src={image} width={3000} height={3000} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.cta}>
            <p>
              Não encontrou o tipo de transporte que precisa? Entre em contato e
              montamos uma solução sob medida pra você.
            </p>
            <div className={styles.buttons}>
              <Link
                href={
                  "mailto:l.a.tagliari@gmail.com?subject=Gostaria%20de%20um%20orçamento%20para%20um%20transporte%20sob%20medida"
                }
              >
                <button className={styles.email}>Email</button>
              </Link>
              <Link
                href={
                  "https://wa.me/5519992055290?text=Olá%2C+gostaria+de+solicitar+um+orçamento+para+transporte+sob+medida."
                }
              >
                <button className={styles.whatsapp}>Whatsapp</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
