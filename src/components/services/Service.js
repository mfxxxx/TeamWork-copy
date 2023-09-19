import { useHttp } from "./../../hooks/http.hook";
const Service = () => {
  const { loading, request, error, clearError } = useHttp();

  const getAllGoods = async () => {
    const res = await request("http://localhost:3002/goods");
    return res.map((item) => _transformItems(item));
  };

  const _transformItems = (item) => {
    const { id, image, name, description, price, category } = item;

    return {
      id: id,
      image: image,
      name: name,
      description: description
        ? `${item.description.slice(0, 130)}...`
        : "В данный момент описание о данном товаре отсутствует",
      price: price,
      category: category,
    };
  };

  return {
    loading,
    error,
    clearError,
    getAllGoods,
  };
};

export default Service;
