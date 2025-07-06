import { motion } from "framer-motion";
import { messageVariants } from "./anime";
import styles from "./StatusIcon.module.scss";
import { TickCircleIcon } from "@/components/icons/TickCircleIcon";
import { ForbiddenIcon } from "@/components/icons/ForbiddenIcon";

const StatusIcon = ({ type }: { type: "success" | "error" }) => {
  return (
    <motion.div
      key={type}
      variants={messageVariants}
      animate="visible"
      exit="hidden"
      className={type === "success" ? styles.success : styles.error}
    >
      {type === "success" ? (
        <TickCircleIcon key="success" />
      ) : (
        <>
          <p>Erro. Tente novamente</p>
          <ForbiddenIcon key="error" />
        </>
      )}
    </motion.div>
  );
};

export default StatusIcon;
