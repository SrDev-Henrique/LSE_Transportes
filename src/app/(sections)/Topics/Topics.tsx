"use client";

import { sectionRefs } from "@/utils/sectionRefs";
import styles from "./Topics.module.scss";

const Topics = () => {
  return (
    <section
      ref={(el) => {
        if (el) sectionRefs.current["diferenciais"] = el as HTMLElement;
      }}
      className={styles.container}
    >
      <div className={styles.title}>
        <h2>Por que escolher a LSE Transportes</h2>
        <p>
          Compromisso, tecnologia e atendimento que faz a diferença em cada
          entrega.
        </p>
      </div>
      <div className={styles.topicsContainer}>
        <div className={styles.topics}></div>
      </div>
    </section>
  );
};

export default Topics;
