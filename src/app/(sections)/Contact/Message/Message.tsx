"use client";

import { useState } from "react";
import styles from "./Message.module.scss";
import FormButton from "@/components/FormButton/FormButton";
import { formatNumber } from "@/formats/InputFormats";

const Message = () => {
  const [phone, setPhone] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setIsSent(false);
    setError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xldnzovd", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        form.reset();
        setIsSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setIsSending(false);
      setTimeout(() => {
        setIsSent(false);
        setError(false);
      }, 2000);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Nome completo</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.mandatory} htmlFor="email">
            E-mail <span>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu email"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="phone">WhatsApp</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            inputMode="numeric"
            placeholder="(XX) XXXXX-XXXX"
            value={phone}
            onChange={(e) => formatNumber(e, setPhone)}
            maxLength={15}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.mandatory} htmlFor="subject">
            Assunto <span>*</span>
          </label>
          <select id="subject" name="subject" required>
            <option value="">Selecione</option>
            <option value="duvida">Tirar uma dúvida</option>
            <option value="elogio">Elogiar ou agradecer</option>
            <option value="reclamacao">Reclamação ou sugestão</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.mandatory} htmlFor="message">
            Mensagem <span>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Digite sua mensagem aqui..."
          />
        </div>

        <FormButton isSent={isSent} error={error} isSending={isSending} />
      </form>
    </>
  );
};

export default Message;
