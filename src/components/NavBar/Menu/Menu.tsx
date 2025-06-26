"use client";

import styles from "./Menu.module.scss";
import { motion } from "framer-motion";
import { menuVariants } from "./anime";
import { IoLogoWhatsapp } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import Link from "next/link";

const Menu = ({
  isMenuOpen,
  items,
}: {
  isMenuOpen: boolean;
  items: string[];
}) => {
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
              <div key={index} className={styles.item}>
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
                "mailto:halbuquerque2850@gmail.com?subject=Gostaria%20de%20um%20orçamento%20para%20um%20transporte"
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
                <span className={styles.whatsapp}>(19) 9 9205-5290.</span>
              </p>
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Menu;
