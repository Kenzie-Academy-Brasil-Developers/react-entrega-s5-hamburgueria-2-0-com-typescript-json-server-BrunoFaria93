import { Center, Box, Heading, Text, Stack, Skeleton } from "@chakra-ui/react";

import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";

interface Products {
  productId: string;
  title: string;
  img: string;
  type: string;
  price: string
}

interface NotFoundProps {
  isProductDetailOpen: boolean;
  onProductDetailClose: () => void;
  selectedProduct: Products;
  productNotFound: string;
}

export const NotFound = ({
  isProductDetailOpen,
  onProductDetailClose,
  selectedProduct,
  productNotFound,
}: NotFoundProps) => {
  return (
    <>
      <Box>
        <Header />
        <SearchBox />
        <Center mt="40" textAlign="center" display="flex" flexDir="column">
          <Heading size="lg">Não encontramos resultados para:</Heading>
          <Text fontSize="xl" color="gray.300" fontWeight="bold">
            {productNotFound}
          </Text>
          <Box mt="6" w={["80%", "40%"]} p="6" boxShadow="base" bg="white">
            <Stack>
              <Skeleton
                startColor="gray.100"
                endColor="gray.200"
                h="20px"
                w="80%"
                borderRadius="20px"
              />
              <Skeleton
                startColor="gray.100"
                endColor="gray.200"
                h="20px"
                w="60%"
                borderRadius="20px"
              />
            </Stack>

            <Stack mt="8">
              <Skeleton
                startColor="gray.100"
                endColor="gray.200"
                h="15px"
                borderRadius="20px"
              />
              <Skeleton
                startColor="gray.100"
                endColor="gray.200"
                h="15px"
                borderRadius="20px"
              />
            </Stack>
          </Box>
        </Center>
      </Box>
    </>
  );
};
