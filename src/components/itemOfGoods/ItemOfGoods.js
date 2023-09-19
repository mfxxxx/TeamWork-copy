import React from "react";
import st from "./ItemOfGoods.module.scss";
const ItemOfGoods = ({ item }) => {
  const { name, description, price, category, img } = item;
  return (
    <div className={st.item}>
      <p>{name}</p>
      <p>{description}</p>
      <p>{price}</p>
      <p>{category}</p>
      <img style={{ width: "200px" }} src={img} alt="" />
    </div>
  );
};

export default ItemOfGoods;
