"use client";

import { sectionRefs } from "@/utils/sectionRefs";
import styles from "./Contact.module.scss";
import { useRef, useState } from "react";
import classNames from "classnames";
import Message from "./Message/Message";
import Budget from "./Budget/Budget";

const tabs = ["Orçamento", "Mensagem"];

const Contact = () => {
  const [activeTab, setActiveTab] = useState("Orçamento");
  const contentRef = useRef<HTMLDivElement | null>(null);
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["contato"] = el as HTMLElement;
      }}
      className={styles.container}
    >
      <div className={styles.title}>
        <h2>Entre em contato</h2>
        <p>
          Tem uma carga para transportar ou quer tirar dúvidas? Envie uma
          mensagem e retornaremos rapidamente.
        </p>
      </div>

      <div ref={contentRef} className={styles.contactContainer}>
        <div className={styles.tabs}>
          {tabs.map((tab, index) => {
            return (
              <div
                onClick={() => setActiveTab(tab)}
                className={classNames(styles.tab, {
                  [styles.activeTab]: activeTab === tab,
                })}
                key={index}
              >
                <p>{tab}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.content}>
          <p className={styles.mandatoryMessage}>
            Itens marcados com <span>*</span> são obrigatórios
          </p>
          {activeTab === "Orçamento" && <Budget elementRef={contentRef} />}
          {activeTab === "Mensagem" && <Message />}
        </div>
      </div>
    </section>
  );
};

export default Contact;
