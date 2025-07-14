export const showError = (element: HTMLElement, message: string) => {
  let error = element.parentElement?.querySelector(".error-message") as HTMLSpanElement | null;
  if (!error) {
    error = document.createElement("span");
    error.className = "error-message";
    error.style.color = "red";
    error.style.fontSize = "0.875rem";
    element.parentElement?.appendChild(error);
  }
  error.textContent = message;
};

export const clearErrors = (fieldset: HTMLElement) => {
  const errors = fieldset.querySelectorAll(".error-message");
  errors.forEach((e) => e.remove());
};