import {
  Flex,
  Image,
  useDisclosure,
  Center,
  Button,
  Box,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import LogoName from "../../assets/logo-name.svg";
import { Menu } from "./Menu";
import { FaSearch, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { SearchBox } from "../Form/SearchBox";
import { useProducts } from "../../providers/ProductsContext";
import { useAuth } from "../../providers/AuthContext";
import { useCart } from "../../providers/CartContext";
import { ModalCart } from "../Modal/ModalCart";
import { useState } from "react";

export const Header = () => {
  const [isDesktop] = useMediaQuery("(min-width: 1280px)");
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();
  const { cart } = useCart();

  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();

  return (
    <>
      <ModalCart loading={loading} isOpen={isCartOpen} onClose={onCartClose} />
      <Flex
        h="12vh"
        borderBottom="1px"
        borderBottomColor="#f5f5f5"
        paddingX="8"
        bgColor="gray.0"
      >
        <Flex align="center">
          <Image
            src={LogoName}
            boxSize={["145px", "145px", "155px", "155px"]}
            ml={["0", "0", "50px", "50px"]}
          />
        </Flex>
        <Center ml="auto" fontSize="2rem">
          <>
            {isDesktop ? (
              <>
                <SearchBox />
                <Button
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  paddingX="10px"
                  marginRight="20px"
                  marginLeft="20px"
                  onClick={onCartOpen}
                >
                  <FaShoppingCart color="#BDBDBD" size="lg" />
                  <Box
                    mb="5"
                    bg="green.200"
                    padding="2px"
                    paddingX="4px"
                    borderRadius="4"
                    color="white"
                  >
                    {cart.length}
                  </Box>
                </Button>

                <Button
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  marginRight="20px"
                  marginLeft="20px"
                  paddingX="10px"
                  onClick={signOut}
                >
                  <FaSignOutAlt color="#BDBDBD" size="lg" />
                </Button>
              </>
            ) : (
              <Flex ml="6" alignItems="center" justifyContent="space-between">
                <Button
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  onClick={onToggle}
            
                >
                  <Menu isOpen={isOpen} onClose={onClose} />
                  <FaSearch color="#BDBDBD" size={theme.fontSizes["xl"]} />
                </Button>

                <Button
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  onClick={onCartOpen}
        
                >
                  <FaShoppingCart
                    color="#BDBDBD"
                    size={theme.fontSizes["xl"]}
                  />
                  <Box
                    mb="5"
                    bg="green.200"
                    padding="2px"
                    paddingX="4px"
                    borderRadius="4"
                    color="white"
                  >
                    {cart.length}
                  </Box>
                </Button>

                <Button
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  paddingX="10px"
                  onClick={signOut}
                >
                  <FaSignOutAlt color="#BDBDBD" size={theme.fontSizes["xl"]} />
                </Button>
              </Flex>
            )}
          </>
        </Center>
      </Flex>
    </>
  );
};
