export const ForbiddenIcon = () => {
  return (
    <svg
      className="error-circle"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="error-circle__circle"
        cx="12"
        cy="12"
        r="10"
        stroke="#ffff"
        strokeWidth="2"
        fill="none"
      />

      <path
        className="error-circle__line1"
        d="M8 8L16 16"
        stroke="#ffff"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        className="error-circle__line2"
        d="M16 8L8 16"
        stroke="#ffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
