import { cubicBezier } from "framer-motion";

export const menuVariants = {
  hidden: {
    left: "0",
    top: "0rem",
    width: "100%",
    height: "100%",
    borderRadius: "0.75rem",
    backgroundColor: "#212529",
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.76, 0, 0.24, 1),
    },
  },
  visible: {
    left: "-1%",
    top: "-0.5rem",
    width: "100vw",
    height: "100vh",
    borderRadius: "0rem",
    backgroundColor: "#0a0a0a",
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.76, 0, 0.24, 1),
    },
  },
};
