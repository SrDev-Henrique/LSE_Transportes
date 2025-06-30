"use client";

import { sectionRefs } from "@/utils/sectionRefs";
import styles from "./Topics.module.scss";
import { topics } from "./data";
import classNames from "classnames";

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
        <div className={styles.topics}>
          {topics.map((topic, index) => {
            const { title, description } = topic;
            return (
              <div className={classNames(styles.topic, "topic")} key={index}>
                <div className={styles.topicTitle}>
                  <h2>{title}</h2>
                </div>
                <div className={styles.topicDescription}>
                  <p>{description}</p>
                </div>
                <div className={styles.topicIcon}>
                  <topic.icon isGreen={index === 1} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Topics;
