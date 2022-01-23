import { useAuth } from "../../providers/AuthContext";
import {
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import { theme } from "../../styles/theme";
import { FaSearch } from "react-icons/fa";

import { Input } from "../Form/input";

import { useCart } from "../../providers/CartContext";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useProducts } from "../../providers/ProductsContext";

interface Products {
  productId: string;
  title: string;
  img: string;
  type: string;
  price: number;
}
interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}
interface SearchData {
  title: string;
}
export const Menu = ({ isOpen, onClose }: MenuProps) => {
  const { searchProducts } = useProducts();
  const { accessToken } = useAuth();

  const handleSearch = ({ title }: SearchData) => {
    searchProducts(title, accessToken);
  };
  const { register, handleSubmit } = useForm<SearchData>();

  return (
    <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay mt={["15vh", "12vh"]} />
      <DrawerContent ml="auto" mt="70px" w={["450px", "350px"]}>
        <DrawerBody>
          <Flex
            mt="5"
            w="100%"
            paddingBottom="3"
            borderBottomWidth="1px"
            borderColor="gray.50"
            flexDir={["column", "column", "row", "row"]}
          >
            <Flex as="form" onSubmit={handleSubmit(handleSearch)}>
              <Input
                placeholder="Digitar pesquisa"
                _placeholder={{ color: "gray.200" }}
                w="70vw"
                {...register("title")}
                borderRadius="8px"
              />
              <Center
                borderRadius="8px"
                as="button"
                ml="2"
                w="70px"
                h="60px"
                fontSize="2xl"
                bg="green.200"
                _hover={{
                  background: "green.300",
                }}
              >
                <FaSearch color={theme.colors.white} />
              </Center>
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
