import { useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../providers/AuthContext";
import { useProducts } from "../../providers/ProductsContext";
import { ProductList } from "./ProductList";

interface Products {
  productId: string;
  title: string;
  img: string;
  type: string;
  price: number;
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();
  const { products, loadProducts, notFound, productsNotFound } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Products>(
    {} as Products
  );

  const {
    isOpen: isCartOpen,
    onOpen: onProductDetailOpen,
    onClose: onProductDetailClose,
  } = useDisclosure();

  useEffect(() => {
    loadProducts(accessToken).then((res) => setLoading(false));
  }, []);

  const handleClick = (product: Products) => {
    setSelectedProduct(product);
    onProductDetailOpen();
  };

  return (
    <>
      <motion.div
        className="form-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProductList
          handleClick={handleClick}
          loading={loading}
          products={products}
        />
      </motion.div>
    </>
  );
};
