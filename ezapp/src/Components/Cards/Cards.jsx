import React from "react";
import Styles from "./Cards.module.css";

const Cards = ({ item }) => {
  if (!item) return;
  const {  title, description, icon } = item;
  return (
    <div className={Styles.card}>
      <div className={Styles.iconWithTitle}>
        <img className={Styles.img} src={icon} alt={title} />
        <h4 className={Styles.title}>{title}</h4>
      </div>
      <p className={Styles.description}>{description}</p>
    </div>
  );
};

export default Cards;
