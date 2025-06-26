import Image from "next/image";
import styles from "./NavBar.module.scss";
import Link from "next/link";

const NavBar = () => {
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
        <div className={styles.navigation}></div>
      </nav>
    </header>
  );
};

export default NavBar;
