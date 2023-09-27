import React from "react";
import ListOfCoods from "../components/listOfCoods/listOfCoods";
import "./../styles/style.scss";

const GoodsPage = () => {
  return (
    <>
      <h2>Все товары</h2>
      <ListOfCoods />
    </>
  );
};

export default GoodsPage;
