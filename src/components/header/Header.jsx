import React from "react";
import styles from "../../css/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src="/img/logo.jpg" alt="logo.jpg" />
      <div className={styles["logo-text"]}>카카오톡 생성기</div>
    </header>
  );
}
