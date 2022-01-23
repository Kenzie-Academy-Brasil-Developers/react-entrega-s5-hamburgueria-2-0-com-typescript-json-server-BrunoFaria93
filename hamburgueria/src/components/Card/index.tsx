import { Flex, Box, Text, Image, Button, Heading } from "@chakra-ui/react";

import { useCart } from "../../providers/CartContext";

interface Products {
  productId: string;
  title: string;
  img: string;
  type: string;
  price: number;
}

interface CardProps {
  products: Products;
  onClick: (products: Products) => void;
}

export const Card = ({ products, onClick }: CardProps) => {
  const { addToCart, addQtd } = useCart();

  const formatValue = (value: number) =>
    Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const handleAddCart = (products: Products) => {
    addQtd(products);

    addToCart(products);
  };
  return (
    <Box
      _hover={{
        transform: "translate(-7px)",
        border: "2px",
        borderColor: "green.100",
      }}
      transition="border 0.2s, ease 0s, transform 0.2s"
      borderWidth="2px"
      borderColor="gray.100"
      boxShadow="base"
      margin="0 auto"
      padding="7"
      w={["90%", "90%", "370px", "370px"]}
    >
      <Flex justify="space-between">
        <Flex
          boxSize="130px"
          mb="5px"
          bg="gray.0"
          w={["400px", "400px", "100%", "100%"]}
          justifyContent="center"
        >
          <Image src={products.img} width="160px" objectFit="contain" />
        </Flex>
      </Flex>
      <Box onClick={() => onClick(products)} w="100%" mt="4">
        <Heading as="h3" size="md">
          {products.title}
        </Heading>
        <Text color="gray.200" mt="3">
          {products.type}
        </Text>
        <Text color="green.200" fontWeight="bold" mt="3">
          {formatValue(products.price)}
        </Text>
        <Button
          mt="3"
          bg="green.200"
          color="white"
          _hover={{
            background: "green.300",
          }}
          onClick={() => handleAddCart(products)}
        >
          Adicionar
        </Button>
      </Box>
    </Box>
  );
};
