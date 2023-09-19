import React from "react";
import ListOfCoods from "../components/listOfCoods/listOfCoods";
const GoodsPage = () => {
  return (
    <div>
      <h2>All goods</h2>
      <ListOfCoods/>
      <img
        src="https://catherineasquithgallery.com/uploads/posts/2021-03/1614636759_16-p-fon-gori-dlya-fotoshopa-20.jpg"
        alt="рандомное изображение"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default GoodsPage;
