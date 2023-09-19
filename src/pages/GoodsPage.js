import React from "react";
import ListOfCoods from "../components/listOfCoods/listOfCoods";
import "./../styles/style.scss";

const GoodsPage = () => {
  return (
    <>
      <div className="container">
        <h2>Все товары</h2>
        <ListOfCoods />
      </div>
    </>
  );
};

export default GoodsPage;
