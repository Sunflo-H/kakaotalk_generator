import React, { useState } from "react";
import styles from "../../css/Category.module.css";

export default function Category({ categoryItem, setCategoryItem }) {
  return (
    <div className={styles.category}>
      <div
        className={categoryItem === "Talk" ? styles.active : ""}
        onClick={(e) => setCategoryItem(e.target.innerText)}
      >
        Talk
      </div>
      <div
        className={categoryItem === "Voice" ? styles.active : ""}
        onClick={(e) => setCategoryItem(e.target.innerText)}
      >
        Voice
      </div>
    </div>
  );
}
