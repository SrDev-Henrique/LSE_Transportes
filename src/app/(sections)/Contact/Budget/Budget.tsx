import { useEffect, useMemo, useState } from "react";
import styles from "./Budget.module.scss";
import FormButton from "@/components/FormButton/FormButton";
import NavigationButton from "./NavigationButton/NavigationButton";
import classNames from "classnames";
import {
  formatCEP,
  formatCNPJ,
  formatCPF,
  formatNumber,
} from "@/formats/InputFormats";
import { GiConfirmed } from "react-icons/gi";
import { calculateEstimate } from "./CalculateEstimate";
import { calculateDistanceByAddress } from "./CalculateDistance";

type FullAddress = {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
};

const transportOptions = [
  "Alimentos Perecíveis",
  "Medicamentos",
  "Flores e Plantas",
  "Produtos Químicos",
  "Material Biológico",
  "Eletrônicos Sensíveis",
  "Outros",
];

const steps = [
  "Tipo de Transporte",
  "Dados do Cliente",
  "Local da Coleta",
  "Local de Entrega",
  "detalhes da carga",
];

const Budget = ({
  elementRef,
}: {
  elementRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const getInitialValue = (key: string) => {
    if (typeof window === "undefined") return "";
    const stored = localStorage.getItem("budget-form");
    if (!stored) return "";
    const parsed = JSON.parse(stored);
    return parsed[key] || "";
  };

  const [phone, setPhone] = useState(() =>
    getInitialValue("Telefone do Contato da Retirada")
  );
  const [deliveryPhone, setDeliveryPhone] = useState(() =>
    getInitialValue("Telefone da Entrega")
  );
  const [cpf, setCpf] = useState(() => getInitialValue("CPF"));
  const [cnpj, setCnpj] = useState(() => getInitialValue("CNPJ"));
  const [cep, setCep] = useState(() => getInitialValue("CEP da Retirada"));
  const [clientType, setClientType] = useState("pf");
  const [deliveryCep, setDeliveryCep] = useState(() =>
    getInitialValue("CEP da Entrega")
  );
  const [reviewData, setReviewData] = useState<
    Record<string, FormDataEntryValue>
  >({});
  const [distance, setDistance] = useState<number | null>(null);

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const openWhatsApp = () => {
    if (!reviewData || Object.keys(reviewData).length === 0) return;

    let message = `📦 *Solicitação de Orçamento de Frete*%0A%0A`;

    const addSection = (title: string) => {
      message += `%0A${title}%0A`;
    };

    addSection("🚚 *Tipo de Transporte*");
    message += `• *${reviewData["Tipo de Transporte"]}*%0A`;
    message += `• *Refrigerado:* ${reviewData["Refrigerado"]}%0A`;

    addSection("🧍 *Dados do Cliente*");
    message += `• *Nome:* ${
      reviewData["Nome do Cliente"] || reviewData["Nome da Empresa"]
    }%0A`;
    if (reviewData["Tipo de Cliente"] === "pj") {
      message += `• *Tipo:* Pessoa Jurídica (CNPJ)%0A`;
      message += `• *CNPJ:* ${reviewData["CNPJ"]}%0A`;
      message += `• *Razão Social:* ${reviewData["Nome da Empresa"]}%0A`;
    } else {
      message += `• *Tipo:* Pessoa Física (CPF)%0A`;
      message += `• *CPF:* ${reviewData["CPF"]}%0A`;
    }
    message += `• *Email:* ${reviewData["Email"]}%0A`;

    addSection("📍 *Local da Coleta*");
    message += `• *Nome do Contato:* ${reviewData["Nome do Contato da Retirada"]}%0A`;
    message += `• *Telefone:* ${reviewData["Telefone do Contato da Retirada"]}%0A`;
    message += `• *Endereço:* ${reviewData["Rua da Retirada"]}, ${reviewData["Bairro da Retirada"]} - ${reviewData["Cidade da Retirada"]}/${reviewData["Estado da Retirada"]}%0A`;
    message += `• *CEP:* ${reviewData["CEP da Retirada"]}%0A`;

    addSection("📦 *Local de Entrega*");
    message += `• *Nome do Contato:* ${reviewData["Contato da Entrega"]}%0A`;
    message += `• *Telefone:* ${reviewData["Telefone da Entrega"]}%0A`;
    message += `• *Endereço:* ${reviewData["Rua da Entrega"]}, ${reviewData["Bairro da Entrega"]} - ${reviewData["Cidade da Entrega"]}/${reviewData["Estado da Entrega"]}%0A`;
    message += `• *CEP:* ${reviewData["CEP da Entrega"]}%0A`;

    addSection("📋 *Detalhes da Carga*");
    message += `• *Produto:* ${reviewData["Tipo de Produto"]}%0A`;
    message += `• *Peso:* ${reviewData["Peso"]} kg%0A`;
    message += `• *Volume:* ${reviewData["Volume"]} m³%0A`;
    message += `• *Dimensões:* ${reviewData["Dimensões"]}%0A`;
    message += `• *Data da Coleta:* ${reviewData["Data da Coleta"]}%0A`;
    message += `• *Janela de Horário:* ${reviewData["Janela de Horário"]}%0A`;
    if (reviewData["*Instruções Especiais*"]) {
      message += `• *Instruções:* ${reviewData["Instruções Especiais"]}%0A`;
    }

    addSection(" *Estimativa de Orçamento*");
    message += `• *Estimativa:* ${reviewData["Orçamento Estimado"]}%0A`;

    const phoneNumber = "5519992055290";
    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    window.location.href = url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setIsSent(false);
    setError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mrbkdroj", {
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
        setCurrentIndex(0);
      }, 3500);
    }

    localStorage.removeItem("budget-form");
  };

  const placeholders = [
    "Nome da pessoa que irá receber o produto",
    "Contato da pessoa que irá receber o produto",
    "Exemplo: Rua Teste, número",
    "Bairro onde a entrega será realizada",
    "Cidade onde a entrega será realizada",
    "Estado onde a entrega será realizada",
    "CEP onde a entrega será realizada",
  ];

  const renderReviewData = () => {
    return (
      <ul className={styles.reviewList}>
        {Object.entries(reviewData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value.toString()}
          </li>
        ))}
      </ul>
    );
  };

  
  useEffect(() => {
    const saveFormDataToLocalStorage = () => {
      const form = document.querySelector("form");
      if (!form) return;
  
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
  
      localStorage.setItem("budget-form", JSON.stringify(data));
    };

    const form = document.querySelector("form");
    if (!form) return;

    const handler = () => saveFormDataToLocalStorage();
    form.addEventListener("input", handler);

    return () => {
      form.removeEventListener("input", handler);
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("budget-form");
    if (saved) {
      const data = JSON.parse(saved);
      setTimeout(() => {
        const form = document.querySelector("form");
        if (!form) return;

        Object.entries(data).forEach(([key, value]) => {
          const el = form.elements.namedItem(key);
          if (!el) return;

          if (el instanceof NodeList || Array.isArray(el)) return;

          if ((el as HTMLInputElement).type === "checkbox") {
            const checkboxes = form.querySelectorAll(`input[name="${key}"]`);
            checkboxes.forEach((cb) => {
              if (cb instanceof HTMLInputElement) {
                cb.checked =
                  typeof value === "string" && value.includes(cb.value);
              }
            });
          } else if ((el as HTMLInputElement).type === "radio") {
            const radios = form.querySelectorAll(`input[name="${key}"]`);
            radios.forEach((radio) => {
              if ((radio as HTMLInputElement).value === String(value)) {
                (radio as HTMLInputElement).checked = true;
              }
            });
          } else {
            (
              el as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            ).value = String(value);
          }
        });
      }, 0);
    }
  }, []);

  const estimate = useMemo(() => {
    return calculateEstimate(reviewData, distance ?? 0);
  }, [reviewData, distance]);

  useEffect(() => {
    if (currentIndex === 5) {
      const form = document.querySelector("form");
      if (!form) return;

      const entries = new FormData(form).entries();
      const data = Object.fromEntries(entries);
      setReviewData(data);

      const coleta: FullAddress = {
        street: String(data["Rua da Retirada"] || ""),
        neighborhood: String(data["Bairro da Retirada"] || ""),
        city: String(data["Cidade da Retirada"] || ""),
        state: String(data["Estado da Retirada"] || ""),
        postalCode: String(data["CEP da Retirada"] || "").replace(/\D/g, ""),
      };

      const entrega: FullAddress = {
        street: String(data["Rua da Entrega"] || ""),
        neighborhood: String(data["Bairro da Entrega"] || ""),
        city: String(data["Cidade da Entrega"] || ""),
        state: String(data["Estado da Entrega"] || ""),
        postalCode: String(data["CEP da Entrega"] || "").replace(/\D/g, ""),
      };

      const isValidAddress = (address: FullAddress) =>
        Object.values(address).every((v) => v.trim() !== "");

      if (isValidAddress(coleta) && isValidAddress(entrega)) {
        calculateDistanceByAddress(coleta, entrega).then((km) => {
          if (km !== null) {
            const realDistance = Math.round(km * 1.15 * 100) / 100;
            setDistance(realDistance);
          }
        });
      }
    }
  }, [currentIndex, estimate]);

  useEffect(() => {
    const reviewEl = document.querySelector(`.${styles.review}`);
    if (!reviewEl) return;

    const handleWheel = (e: Event) => {
      const wheelEvent = e as WheelEvent;
      if (reviewEl.scrollHeight > reviewEl.clientHeight) {
        wheelEvent.stopPropagation();
      }
    };

    reviewEl.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      reviewEl.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className={styles.formContainer}>
      <div
        className={classNames(styles.confirmationMessage, {
          [styles.show]: isSent,
        })}
      >
        <GiConfirmed />
        <p>Orçamento solicitado com sucesso</p>
      </div>
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${((currentIndex + 1) / 5) * 100}%` }}
        />
        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div
              className={classNames(styles.step, {
                [styles.activeStep]: index === currentIndex,
              })}
              key={step}
            >
              <p>{step}</p>
            </div>
          ))}
        </div>
        <div
          className={classNames(styles.confirmation, {
            [styles.active]: currentIndex === 5,
          })}
        >
          <p>Revisão das informações</p>
        </div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset
          style={{
            opacity: currentIndex === 0 ? 1 : 0,
            pointerEvents: currentIndex === 0 ? "auto" : "none",
          }}
          className={styles.fieldset}
        >
          <legend className={styles.mandatory}>
            1. Tipo de Transporte <span>*</span>
          </legend>
          <div className={styles.checkboxGroup}>
            {transportOptions.map((opt) => (
              <label key={opt}>
                <input type="checkbox" name="Tipo de Transporte" value={opt} />
                {opt}
              </label>
            ))}
          </div>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="Refrigerado"
                value="sim"
                defaultChecked
              />
              Refrigerado
            </label>
            <label>
              <input type="radio" name="Refrigerado" value="nao" />
              Não Refrigerado
            </label>
          </div>
          <div
            style={{
              marginTop: "1rem",
            }}
            className={styles.radioGroup}
          >
            <label>
              <input type="radio" name="Emergência" value="sim" />
              Emergencial
            </label>
            <label>
              <input
                type="radio"
                name="Emergência"
                value="nao"
                defaultChecked
              />
              Não Emergencial
            </label>
          </div>
          <div className={classNames(styles.navigation, styles.first)}>
            <NavigationButton
              elementRef={elementRef}
              currentField={0}
              type="next"
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
        </fieldset>

        <fieldset
          style={{
            opacity: currentIndex === 1 ? 1 : 0,
            pointerEvents: currentIndex === 1 ? "auto" : "none",
          }}
          className={styles.fieldset}
        >
          <legend>2. Dados do Cliente</legend>
          <div className={styles.inputGroup}>
            <label className={styles.mandatory} htmlFor="Nome do Cliente">
              Nome completo <span>*</span>
            </label>
            <input
              type="text"
              id="Nome do Cliente"
              name="Nome do Cliente"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="Tipo de Cliente">Tipo de cliente</label>
            <select
              id="Tipo de Cliente"
              name="Tipo de Cliente"
              value={clientType}
              onChange={(e) => setClientType(e.target.value)}
            >
              <option value="pf">Pessoa Física (CPF)</option>
              <option value="pj">Pessoa Jurídica (CNPJ)</option>
            </select>
          </div>

          {clientType === "pf" ? (
            <div className={styles.inputGroup}>
              <label className={styles.mandatory} htmlFor="CPF">
                CPF <span>*</span>
              </label>
              <input
                type="tel"
                inputMode="numeric"
                id="CPF"
                name="CPF"
                value={cpf}
                onChange={(e) => formatCPF(e, setCpf)}
                placeholder="000.000.000-00"
                maxLength={14}
                required
              />
            </div>
          ) : (
            <>
              <div className={styles.inputGroup}>
                <label className={styles.mandatory} htmlFor="CNPJ">
                  CNPJ <span>*</span>
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  id="CNPJ"
                  name="CNPJ"
                  value={cnpj}
                  onChange={(e) => formatCNPJ(e, setCnpj)}
                  placeholder="00.000.000/0000-00"
                  maxLength={18}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.mandatory} htmlFor="Nome da Empresa">
                  Razão Social <span>*</span>
                </label>
                <input
                  type="text"
                  id="Nome da Empresa"
                  name="Nome da Empresa"
                  placeholder="Nome oficial da sua empresa"
                  required
                />
              </div>
            </>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.mandatory} htmlFor="Email">
              E‑mail <span>*</span>
            </label>
            <input
              type="Email"
              id="Email"
              name="Email"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className={styles.navigation}>
            <NavigationButton
              elementRef={elementRef}
              type="prev"
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
            <NavigationButton
              elementRef={elementRef}
              currentField={1}
              type="next"
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
        </fieldset>

        <fieldset
          style={{
            opacity: currentIndex === 2 ? 1 : 0,
            pointerEvents: currentIndex === 2 ? "auto" : "none",
          }}
          className={styles.fieldset}
        >
          <legend>3. Local de Coleta</legend>
          <div className={styles.inputGroup}>
            <label
              className={styles.mandatory}
              htmlFor="Nome do Contato da Retirada"
            >
              Nome do contato <span>*</span>
            </label>
            <input
              type="text"
              id="Nome do Contato da Retirada"
              name="Nome do Contato da Retirada"
              placeholder="Nome da pessoa que irá entregar o produto"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label
              className={styles.mandatory}
              htmlFor="Telefone do Contato da Retirada"
            >
              Telefone/WhatsApp <span>*</span>
            </label>
            <input
              type="tel"
              id="Telefone do Contato da Retirada"
              name="Telefone do Contato da Retirada"
              placeholder="contato da pessoa que irá entregar o produto"
              inputMode="numeric"
              value={phone}
              onChange={(e) => formatNumber(e, setPhone)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.mandatory} htmlFor="Rua da Retirada">
              Endereço (Rua e nº) <span>*</span>
            </label>
            <input
              type="text"
              id="Rua da Retirada"
              name="Rua da Retirada"
              placeholder="Exemplo: Rua Teste, número"
              pattern="^.+\s+\d+.*$"
              required
              onInvalid={(e) =>
                (e.currentTarget as HTMLInputElement).setCustomValidity(
                  "O endereço deve conter pelo menos um número."
                )
              }
              onInput={(e) =>
                (e.currentTarget as HTMLInputElement).setCustomValidity("")
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.mandatory} htmlFor="Bairro da Retirada">
              Bairro <span>*</span>
            </label>
            <input
              type="text"
              id="Bairro da Retirada"
              name="Bairro da Retirada"
              placeholder="Bairro onde a coleta será realizada"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.mandatory} htmlFor="Cidade da Retirada">
              Cidade <span>*</span>
            </label>
            <input
              type="text"
              id="Cidade da Retirada"
              name="Cidade da Retirada"
              placeholder="Cidade onde a coleta será realizada"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.mandatory} htmlFor="Estado da Retirada">
              Estado <span>*</span>
            </label>
            <input
              type="text"
              id="Estado da Retirada"
              name="Estado da Retirada"
              placeholder="Estado onde a coleta será realizada"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.mandatory} htmlFor="CEP da Retirada">
              CEP <span>*</span>
            </label>
            <input
              type="numeric"
              inputMode="numeric"
              id="CEP da Retirada"
              name="CEP da Retirada"
              value={cep}
              onChange={(e) => formatCEP(e, setCep)}
              placeholder="(xxxxx-xxx)"
              required
            />
          </div>
          <div className={styles.navigation}>
            <NavigationButton
              elementRef={elementRef}
              type="prev"
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
            <NavigationButton
              elementRef={elementRef}
              currentField={2}
              type="next"
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
        </fieldset>

        <fieldset
          style={{
            opacity: currentIndex === 3 ? 1 : 0,
            pointerEvents: currentIndex === 3 ? "auto" : "none",
          }}
          className={styles.fieldset}
        >
          <legend>4. Local de Entrega</legend>
          {[
            "Contato da",
            "Telefone da",
            "Rua da",
            "Bairro da",
            "Cidade da",
            "Estado da",
            "Cep da",
          ].map((field, index) => (
            <div className={styles.inputGroup} key={field}>
              <label className={styles.mandatory} htmlFor={`delivery${field}`}>
                {field === "Contato da"
                  ? "Nome do contato"
                  : field === "Telefone da"
                  ? "Telefone/WhatsApp"
                  : field === "Rua da"
                  ? "Endereço (Rua e nº)"
                  : field === "Bairro da"
                  ? "Bairro"
                  : field === "Cidade da"
                  ? "Cidade"
                  : field === "Estado da"
                  ? "Estado"
                  : "CEP"}{" "}
                <span>*</span>
              </label>
              {field === "Telefone da" ? (
                <input
                  type="tel"
                  id={`Telefone da Entrega`}
                  name={`Telefone da Entrega`}
                  placeholder="Contato da pessoa que irá receber o produto"
                  inputMode="numeric"
                  value={deliveryPhone}
                  onChange={(e) => formatNumber(e, setDeliveryPhone)}
                  required
                />
              ) : field === "Cep da" ? (
                <input
                  type="numeric"
                  inputMode="numeric"
                  id="CEP da Entrega"
                  name="CEP da Entrega"
                  value={deliveryCep}
                  onChange={(e) => formatCEP(e, setDeliveryCep)}
                  placeholder="CEP de onde será realizada a entrega"
                  required
                />
              ) : field === "Rua da" ? (
                <input
                  type="text"
                  id={`Rua da Entrega`}
                  name={`Rua da Entrega`}
                  placeholder={placeholders[index]}
                  defaultValue=""
                  required
                  pattern="^.+\s+\d+.*$"
                  onInvalid={(e) =>
                    (e.currentTarget as HTMLInputElement).setCustomValidity(
                      "O endereço deve conter pelo menos um número."
                    )
                  }
                  onInput={(e) =>
                    (e.currentTarget as HTMLInputElement).setCustomValidity("")
                  }
                />
              ) : (
                <input
                  type="text"
                  id={`${field} Entrega`}
                  name={`${field} Entrega`}
                  placeholder={`${placeholders[index]}`}
                  defaultValue=""
                  required
                />
              )}
            </div>
          ))}
          <div className={styles.navigation}>
            <NavigationButton
              elementRef={elementRef}
              type="prev"
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
            <NavigationButton
              elementRef={elementRef}
              currentField={3}
              type="next"
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
        </fieldset>

        <fieldset
          style={{
            opacity: currentIndex === 4 ? 1 : 0,
            pointerEvents: currentIndex === 4 ? "auto" : "none",
          }}
          className={styles.fieldset}
        >
          <legend>5. Detalhes da Carga</legend>
          <div className={styles.inputGroup}>
            <label className={styles.mandatory} htmlFor="Tipo de Produto">
              Tipo de produto <span>*</span>
            </label>
            <input
              type="text"
              id="Tipo de Produto"
              name="Tipo de Produto"
              placeholder="Qual o produto"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.mandatory} htmlFor="Peso">
              Peso (kg) <span>*</span>
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="Peso"
              name="Peso"
              min="0"
              step="0.1"
              placeholder="Qual o peso do produto"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.mandatory} htmlFor="Volume">
              Volume (m³) <span>*</span>
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="Volume"
              name="Volume"
              min="0"
              step="0.01"
              placeholder="Qual o volume do produto"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.mandatory} htmlFor="Dimensões">
              Dimensões (L×A×P em cm) <span>*</span>
            </label>
            <input
              type="text"
              id="Dimensões"
              name="Dimensões"
              placeholder="LxAxP"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.mandatory} htmlFor="Data da Coleta">
              Data de coleta <span>*</span>
            </label>
            <input
              type="date"
              id="Data da Coleta"
              name="Data da Coleta"
              required
              placeholder="00/00/0000"
              className={styles.deliveryDate}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.mandatory} htmlFor="Janela de Horário">
              Janela de horário (ex:08:00 - 12:00) <span>*</span>
            </label>
            <input
              type="text"
              id="Janela de Horário"
              name="Janela de Horário"
              placeholder="ex: 08:00–12:00"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="Instruções Especiais">Instruções especiais</label>
            <textarea
              id="Instruções Especiais"
              name="Instruções Especiais"
              rows={4}
              placeholder="Informações extras sobre manuseio, acesso, etc."
            />
          </div>
          <div className={styles.navigation}>
            <NavigationButton
              elementRef={elementRef}
              type="prev"
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
            <NavigationButton
              elementRef={elementRef}
              currentField={4}
              type="next"
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              text="revisão"
            />
          </div>
        </fieldset>

        <fieldset
          style={{
            opacity: currentIndex === 5 ? 1 : 0,
            pointerEvents: currentIndex === 5 ? "auto" : "none",
            display: currentIndex === 5 ? "flex" : "none",
          }}
          className={styles.fieldset}
        >
          <legend>6. Revisar Dados</legend>
          <NavigationButton
            elementRef={elementRef}
            type="prev"
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
          <div className={styles.review}>{renderReviewData()}</div>
          <input
            type="hidden"
            name="Orçamento Estimado"
            value={`R$ ${estimate.toFixed(2)}`}
          />
          <p className={styles.estimateText}>
            Estimativa de valor: <strong>R$ {estimate.toFixed(2)}</strong>
          </p>
          <FormButton
            isSent={isSent}
            error={error}
            isSending={isSending}
            text="Solicitar Orçamento por email"
          />
          <FormButton onClick={() => openWhatsApp()} type="whatsapp" />
        </fieldset>
      </form>
    </div>
  );
};

export default Budget;
