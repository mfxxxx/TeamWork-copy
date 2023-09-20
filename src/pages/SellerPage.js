import React from "react";
import GoodsList from "../components/seller/goodsList/GoodsList";
import "./../styles/style.scss";

const SellerPage = () => {
  return (
    <>
      <div className="container">
        <GoodsList />
      </div>
    </>
  );
};

export default SellerPage;
