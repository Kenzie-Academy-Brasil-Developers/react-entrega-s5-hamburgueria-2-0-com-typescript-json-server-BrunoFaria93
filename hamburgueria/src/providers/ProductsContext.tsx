import { AxiosResponse } from "axios";
import { useCallback } from "react";
import { ReactNode, createContext, useContext, useState } from "react";
import { api } from "../services/api";

interface ProductsProviderProps {
  children: ReactNode;
}
interface Products {
  productId: string;
  title: string;
  img: string;
  type: string;
  price: number;
}
interface ProductsContextData {
  products: Products[];
  loadProducts: (accessToken: string) => Promise<void>;
  searchProducts: (title: string, accessToken: string) => Promise<void>;
  notFound: boolean;
  productsNotFound: string;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used within an ProductsProvider");
  }
  return context;
};

const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [productsNotFound, setProductsNotFound] = useState("");

  const loadProducts = useCallback(async (accessToken: string) => {
    try {
      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const searchProducts = useCallback(
    async (title: string, accessToken: string) => {
      const response = await api.get(`/products?title_like=${title}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.data.length) {
        setProductsNotFound(title);
        return setNotFound(true);
      }
      setNotFound(false);
      setProducts(response.data);
    },
    []
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        searchProducts,
        notFound,
        productsNotFound,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export { useProducts, ProductsProvider };
