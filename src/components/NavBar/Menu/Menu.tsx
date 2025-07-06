"use client";

import styles from "./Menu.module.scss";
import { motion } from "framer-motion";
import { menuVariants } from "./anime";
import { IoLogoWhatsapp } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import Link from "next/link";
import { sectionRefs } from "@/utils/sectionRefs";
import { useLocalLenis } from "@/context/LocalLenisContext";

const Menu = ({
  isMenuOpen,
  setIsMenuOpen,
  items,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  items: string[];
}) => {
  const { lenis } = useLocalLenis();

  const handleNavClick = (item: string) => {
    const sectionId = `${item.toLowerCase()}`;
    const section = sectionRefs.current[sectionId];
    if (section) {
      lenis?.stop();
      section.scrollIntoView({ behavior: "instant" });
      setTimeout(() => {
        lenis?.start();
        setIsMenuOpen(false);
      }, 100);
    }
  };
  return (
    <header className={styles.container}>
      <motion.div
        variants={menuVariants}
        animate={isMenuOpen ? "visible" : "hidden"}
        className={styles.menu}
      >
        <div className={styles.navigation}>
          {items.map((item, index) => {
            return (
              <div
                onClick={() => handleNavClick(item)}
                key={index}
                className={styles.item}
              >
                <p>{item}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.contact}>
          <div className={styles.contactItem}>
            <HiOutlineMail size={20} color={"#ff4c4c"} />
            <Link
              href={
                "mailto:l.a.tagliari@gmail.com?subject=Gostaria%20de%20um%20orçamento%20para%20um%20transporte"
              }
            >
              <p>
                Email:{" "}
                <span className={styles.email}>l.a.tagliari@gmail.com</span>
              </p>
            </Link>
          </div>
          <div className={styles.contactItem}>
            <IoLogoWhatsapp size={20} color={"#25d366"} />
            <Link
              href={
                "https://wa.me/5519992055290?text=Olá%2C+gostaria+de+solicitar+um+orçamento+para+transporte."
              }
            >
              <p>
                Whatsapp:{" "}
                <span className={styles.whatsapp}>(19) 9 9205-5290</span>
              </p>
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Menu;
