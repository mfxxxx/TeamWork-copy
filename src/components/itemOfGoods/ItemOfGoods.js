import React from "react";
import st from "./ItemOfGoods.module.scss";
const ItemOfGoods = ({ item }) => {
  const { name, description, price, img } = item;
  return (
    <div className={st.item}>
      <p>{name}</p>
      <p>{description}</p>
      <div className={st.price}>
        <p> {price}</p> <p> ₽</p>
      </div>
      <img style={{ width: "200px" }} src={img} alt="" />
    </div>
  );
};

export default ItemOfGoods;
