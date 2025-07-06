import Link from "next/link";
import styles from "./Footer.module.scss";
import { HiOutlineMail } from "react-icons/hi";
import { IoLogoWhatsapp } from "react-icons/io";
import classNames from "classnames";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.brand}>
        <p>LSE</p>
      </div>
      <div className={styles.upperItems}>
        <div className={styles.footerItem}>
          <div className={styles.contactItems}>
            <h2>Contato</h2>
            <div className={classNames(styles.contactItem, styles.emailItem)}>
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
            <div
              className={classNames(styles.contactItem, styles.whatsappItem)}
            >
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
        </div>
        <div className={styles.footerItem}>
          <h2>Links rápidos</h2>
          <ul>
            <li className={styles.hover}>
              <a href="#services">Serviços</a>
            </li>
            <li className={styles.hover}>
              <a href="#about">Sobre</a>
            </li>
            <li className={styles.hover}>
              <a href="#differentials">Diferenciais</a>
            </li>
            <li className={styles.hover}>
              <a href="#contact">Contato</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerItem}>
        <h2>Créditos</h2>
        <div className={styles.credits}>
          <p>
            Desenvolvido por{" "}
            <a href="https://github.com/SrDev-Henrique" target="_blank">
              Henrique Albuquerque
            </a>
          </p>
          <p>
            API de geolocalização por{" "}
            <a
              href="https://opencagedata.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenCage
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
