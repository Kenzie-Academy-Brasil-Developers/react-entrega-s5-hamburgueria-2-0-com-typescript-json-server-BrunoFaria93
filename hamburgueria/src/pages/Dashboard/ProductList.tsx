import { Box, Grid, useDisclosure } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { CardSkeleton } from "../../components/Skeleton/cardSkeleton";
import { motion } from "framer-motion";

interface Products {
  productId: string;
  title: string;
  img: string;
  type: string;
  price: number;
}
interface ProductListProps {
  loading: boolean;
  products: Products[];
  handleClick: (products: Products) => void;
}

export const ProductList = ({
  loading,
  products,
  handleClick,
}: ProductListProps) => {
  return (
    <>
      <motion.div
        className="form-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box>
          <Header />
          <Grid
            w="100%"
            templateColumns="repeat(auto-fill, minmax(420px, 1fr))"
            gap={5}
            paddingX="8"
            mt="8"
            flexDirection="row"
            display={["flex", "grid"]}
            overflow={["scroll", "scroll", "hidden", "hidden"]}
          >
            {loading ? (
              <CardSkeleton repeatCount={9} />
            ) : (
              products.map((products) => (
                <Card products={products} onClick={handleClick} />
              ))
            )}
          </Grid>
        </Box>
      </motion.div>
    </>
  );
};
