"use client";

import Image from "next/image";
import styles from "./NavBar.module.scss";
import Link from "next/link";
import Menu from "./Menu/Menu";
import { IoMdArrowDropdownCircle, IoMdCloseCircle } from "react-icons/io";
import { useState } from "react";

const navigationItems = ["Serviços", "Sobre Nós", "Diferenciais", "Contato"];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/">
          <div className={styles.brand}>
            <div className={styles.icon}>
              <Image
                alt="LSE Serviço de Transporte"
                src="/images/logo_icon.webp"
                width={40}
                height={40}
              />
            </div>
            <h1>LSE Transportes</h1>
          </div>
        </Link>
        <div className={styles.navigation}>
          {navigationItems.map((item, index) => {
            return (
              <div key={index} className={styles.item}>
                <p>{item}</p>
              </div>
            );
          })}
        </div>
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={styles.openMenu}
          style={{
            backgroundColor: isMenuOpen ? "#212529" : "#0a0a0a",
          }}
        >
          <p>Menu</p>
          {isMenuOpen ? (
            <IoMdCloseCircle size={20} />
          ) : (
            <IoMdArrowDropdownCircle size={20} />
          )}
        </div>
      </nav>
      <Menu isMenuOpen={isMenuOpen} items={navigationItems} />
    </header>
  );
};

export default NavBar;
