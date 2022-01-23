import {
  Center,
  Flex,
  Progress,
  Box,
  Text,
  HStack,
  Image,
  Button,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { useAuth } from "../../providers/AuthContext";
import { useCart } from "../../providers/CartContext";
import { theme } from "../../styles/theme";

interface Products {
  productId: string;
  title: string;
  img: string;
  type: string;
  price: number;
}

interface CartCardProps {
  products: Products;
  handleClick: (products: Products) => void;
  onClick: (products: Products) => void;
}

export const CartCard = ({ products, onClick, handleClick }: CartCardProps) => {
  const [isDesktop] = useMediaQuery("(min-width: 1280px)");

  const { removeFromCart, addToCart, addQtd, removeQtd} = useCart();

  const handleDelete = () => {
    removeFromCart(products);
  };

  const [count, setCount] = useState(1);
  const handleCountUp = () => {
    addQtd(products);
    addToCart(products);
    setCount(count + 1);
  };
  const handleCountDown = () => {
    if (count >= 1) {
      setCount(count - 1);
      removeQtd(products);
    }
    if (count === 1) {
      removeFromCart(products);
    }
  };
  return (
    <>
      <Flex>
        <Flex
          boxSize="100px"
          bg="gray.100"
          w="30%"
          justifyContent="center"
          borderRadius="5"
          wrap="wrap"
        >
          <Image src={products.img} width="80px" objectFit="contain" />
        </Flex>
        <Flex flexDir="column">
          <Heading as="h3" size={theme.fontSizes["md"]} ml="4" color="gray.600">
            {products.title}
          </Heading>
          <Flex h="25px" w="105px" mt="35%" ml="5">
            <Button
              bg="gray.100"
              w="5px"
              h="25px"
              color="negative.0"
              onClick={handleCountDown}
              borderRadius="0"
            >
              -
            </Button>
            <Flex
              justifyContent="center"
              alignItems="center"
              w="10px"
              h="25px"
              p="12px"
              color="negative.0"
            >
              {count}
            </Flex>
            <Button
              w="5px"
              h="25px"
              bg="gray.100"
              color="negative.0"
              borderRadius="0"
              onClick={handleCountUp}
            >
              +
            </Button>
          </Flex>
        </Flex>

        {isDesktop ? (
          <>
            <Center
              paddingTop="10px"
              as="button"
              w="15px"
              h="25px"
              bgColor="transparent"
              onClick={handleDelete}
              ml={["0", "0", "auto", "auto"]}
              mr="5%"
            >
              <FaTrash color="#BDBDBD" />
            </Center>
          </>
        ) : (
          <>
            <Center
              paddingTop="10px"
              as="button"
              w="15px"
              h="25px"
              bgColor="transparent"
              onClick={handleDelete}
              position="absolute"
              left="83vw"
            >
              <FaTrash color="#BDBDBD" />
            </Center>
          </>
        )}
      </Flex>
    </>
  );
};
