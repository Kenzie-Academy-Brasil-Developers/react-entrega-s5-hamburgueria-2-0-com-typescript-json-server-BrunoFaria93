import {
  Button,
  Center,
  Modal,
  ModalBody,
  Grid,
  ModalContent,
  ModalFooter,
  Flex,
  ModalHeader,
  ModalOverlay,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { theme } from "../../styles/theme";

import { useAuth } from "../../providers/AuthContext";
import { useCart } from "../../providers/CartContext";
import { useProducts } from "../../providers/ProductsContext";
import { useState } from "react";
import { CartCard } from "../Card/CartCard";

interface Products {
  productId: string;
  title: string;
  img: string;
  type: string;
  price: number;
}
interface ModalCartProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
}

export const ModalCart = ({ loading, isOpen, onClose }: ModalCartProps) => {
  const { removeAllFromCart, totalPrice, newCart } = useCart();

  const formatValue = (value: number) =>
    Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const handleClick = (product: Products) => {
    console.log("oi");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        w="90%"
        ml="5"
        mr="5"
        p="0"
        bg="white"
        color="gray.800"
        borderRadius="0"
      >
        <ModalHeader display="flex" bg="green.200">
          <Text fontWeight="bold" ml="2" color="white">
            Carrinho de compras
          </Text>
          <Center
            onClick={onClose}
            as="button"
            ml="auto"
            w="32px"
            h="32px"
            fontWeight="100"
            fontSize="large"
          >
            <FaTimes color={theme.colors.white} />
          </Center>
        </ModalHeader>

        {newCart.length ? (
          <>
            <ModalBody textAlign="center">
              <Grid
                w="100%"
                templateColumns="repeat(auto-fill, minmax(420px, 1fr))"
                gap={5}
                mt="4"
              >
                {newCart.map((product) => (
                  <CartCard
                    key={product.productId}
                    products={product}
                    onClick={handleClick}
                    handleClick={handleClick}
                  />
                ))}
              </Grid>
            </ModalBody>
            <ModalFooter
              mt="4"
              borderTop="1px solid"
              color="gray.200"
              flexDirection="column"
            >
              <Flex justifyContent="space-between" w="100%">
                <Text color="gray.600" fontWeight="bold">
                  Total
                </Text>
                <Text color="gray.300">{formatValue(totalPrice)}</Text>
              </Flex>
              <Button
                type="submit"
                bg="gray.100"
                h="60px"
                w="100%"
                _hover={{ bg: "gray.0" }}
                onClick={removeAllFromCart}
              >
                Remover todos
              </Button>
            </ModalFooter>
          </>
        ) : (
          <ModalBody textAlign="center">
            <Grid
              w="100%"
              templateColumns="repeat(auto-fill, minmax(420px, 1fr))"
              gap={5}
              mt="4"
              justifyContent="center"
            >
              <Text as="h3" fontWeight="bold">
                Sua sacola está vazia
              </Text>
              <Text color="gray.200" fontSize="sm">
                Adicione itens
              </Text>
            </Grid>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};
