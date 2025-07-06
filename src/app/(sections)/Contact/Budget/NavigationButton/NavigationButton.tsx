import classNames from "classnames";
import styles from "./NavigationButton.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const NavigationButton = ({
  currentIndex,
  setCurrentIndex,
  currentField,
  type,
  elementRef,
  text = "próximo",
}: {
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
  currentField?: number;
  type: "next" | "prev";
  elementRef?: React.RefObject<HTMLDivElement | null>;
  text?: string;
}) => {
  const validateCurrentStep = () => {
    if (currentField === undefined) return true;

    const fieldsets = document.querySelectorAll("form fieldset");
    const currentFieldset = fieldsets[currentField] as HTMLElement;
    const inputs = currentFieldset.querySelectorAll("input, select, textarea");

    let isValid = true;

    for (const input of inputs) {
      const element = input as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement;

      if (element.type === "checkbox") {
        const checkboxes = currentFieldset.querySelectorAll(
          'input[type="checkbox"]'
        ) as NodeListOf<HTMLInputElement>;

        const oneChecked = Array.from(checkboxes).some((cb) => cb.checked);
        if (!oneChecked) {
          checkboxes[0].focus();
          isValid = false;
          break;
        }
      }

      if (element.type === "radio") {
        const radios = currentFieldset.querySelectorAll(
          `input[name="${element.name}"]`
        ) as NodeListOf<HTMLInputElement>;

        const oneSelected = Array.from(radios).some((r) => r.checked);
        if (!oneSelected) {
          radios[0].focus();
          isValid = false;
          break;
        }
      }

      if (element.required && !element.value.trim()) {
        element.focus();
        isValid = false;
        break;
      }

      if (
        element.type === "email" &&
        !element.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ) {
        element.focus();
        isValid = false;
        break;
      }

      if (
        element.name === "Rua da Entrega" &&
        !element.value.match(/^.+,\s*\d+.*$/)
      ) {
        element.focus();
        isValid = false;
        break;
      }

      if (
        element.name === "Rua da Retirada" &&
        !element.value.match(/^.+,\s*\d+.*$/)
      ) {
        element.focus();
        isValid = false;
        break;
      }
    }

    return isValid;
  };

  const handleClick = (direction: string) => {
    if (direction === "next") {
      if (!validateCurrentStep()) return;
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(currentIndex - 1);
    if (!elementRef) return;
    const container = elementRef.current;
    if (container) {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return type === "next" ? (
    <button
      type="button"
      onClick={() => handleClick("next")}
      className={styles.button}
    >
      {text}
      <FaArrowRight />
    </button>
  ) : (
    <button
      type="button"
      onClick={() => handleClick("prev")}
      className={classNames(styles.button, styles.prevButton)}
    >
      <FaArrowLeft />
      anterior
    </button>
  );
};

export default NavigationButton;
