import { useEffect } from "react";
import { useState } from "react";
import useAxiosHook from "./useAxiosHook";

const useAllProducts = () => {
  const axiosHook = useAxiosHook();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosHook
      .get("/products")
      .then((data) => {
        console.log(data.data);
        setProducts(data.data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [axiosHook]);

  return { products, loading, error };
};
export default useAllProducts;
