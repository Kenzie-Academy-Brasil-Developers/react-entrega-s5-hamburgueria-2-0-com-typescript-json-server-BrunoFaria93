import { Center, Flex, useDisclosure } from "@chakra-ui/react";
import { Input } from "./input";
import { FaSearch } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { useForm } from "react-hook-form";
import { useProducts } from "../../providers/ProductsContext";
import { useAuth } from "../../providers/AuthContext";

interface SearchData {
  title: string;
}

export const SearchBox = () => {
  const { searchProducts } = useProducts();
  const { accessToken } = useAuth();

  const handleSearch = ({ title }: SearchData) => {
    searchProducts(title, accessToken);
  };
  const { register, handleSubmit } = useForm<SearchData>();

  return (
    <>
      <Flex
        mt="6"
        w="100%"
        paddingX={["4", "8"]}
        paddingY="2"
        paddingBottom="6"
        borderBottomWidth="1px"
        borderColor="gray.50"
        flexDir={["column", "column", "row", "row"]}
      >
        <Flex as="form" onSubmit={handleSubmit(handleSearch)}>
          <Input
            placeholder="Digitar pesquisa"
            _placeholder={{ color: "gray.100" }}
            _hover={{ bgColor: "gray.0" }}
            w={["10vw", "10vw", "25vw"]}
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
    </>
  );
};
