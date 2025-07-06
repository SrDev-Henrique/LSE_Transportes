import classNames from "classnames";
import styles from "./FormButton.module.scss";
import { AnimatePresence } from "framer-motion";
import StatusIcon from "./StatusIcon/StatusIcon";

const FormButton = ({
  isSent,
  error,
  isSending,
  text = "Enviar Mensagem",
  type = "email",
  onClick,
}: {
  isSent?: boolean;
  error?: boolean;
  isSending?: boolean;
  text?: string;
  type?: "email" | "whatsapp";
  onClick?: () => void;
}) => {
  return (
    <>
      {type === "email" ? (
        <button
          type="submit"
          className={classNames(
            styles.submitButton,
            "submitButton",
            isSent ? "isSent" : error && "error"
          )}
          disabled={isSending}
        >
          {isSending ? (
            <div className={styles.isSending}>
              <span className={styles.spinner} />
            </div>
          ) : (
            <p>{text}</p>
          )}
          {isSent && (
            <AnimatePresence>
              <StatusIcon type="success" />
            </AnimatePresence>
          )}
          {error && (
            <AnimatePresence>
              <StatusIcon type="error" />
            </AnimatePresence>
          )}
        </button>
      ) : (
        <button
          type="button"
          className={classNames(styles.whatsappButton, styles.whatsapp)}
          onClick={onClick}
        >
          <p>Solicitar orçamento por WhatsApp</p>
        </button>
      )}
    </>
  );
};

export default FormButton;
