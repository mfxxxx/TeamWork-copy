import React from "react";
import ListOfCoods from "../components/listOfCoods/listOfCoods";
import "./../styles/style.scss";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const GoodsPage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <h2>Все товары</h2>
        <ListOfCoods />
      </div>
      <Footer />
    </>
  );
};

export default GoodsPage;
