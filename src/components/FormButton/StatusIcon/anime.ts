import { cubicBezier } from "framer-motion";

export const messageVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: cubicBezier(0.76, 0, 0.24, 1),
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: cubicBezier(0.76, 0, 0.24, 1),
    },
  },
};
