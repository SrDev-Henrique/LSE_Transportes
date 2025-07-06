export const TickCircleIcon = () => {
  return (
    <svg
      className="tick-circle"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="tick-circle__circle"
        cx="12"
        cy="12"
        r="10"
        stroke="#ffffff"
        strokeWidth="2"
        fill="none"
      />
      <path
        className="tick-circle__check"
        d="M7.5 12L10.5 15L16.5 9"
        stroke="#ffffff"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
