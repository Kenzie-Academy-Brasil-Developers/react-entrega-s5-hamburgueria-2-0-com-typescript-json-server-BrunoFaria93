import { Grid, Image, Text, Flex, Box } from "@chakra-ui/react";
import { FaClipboard } from "react-icons/fa";
import LogoName from "../../assets/logo-name.svg";
import Bolinhas from "../../assets/bolinhas.svg";
import { theme } from "../../styles/theme";

export const SignupInfo = () => (
  <Grid w={["100%", "100%", "50%", "50%"]} paddingRight="100px">
    <Flex justifyContent="center" direction="column" ml="40px">
      <Image src={LogoName} alt="burguer kenzie" boxSize="245px" />
      <Flex
        height="50%"
        border="2px"
        color="gray.0"
        justifyContent="space-between"
        alignItems="center"
        borderWidth="2px"
        borderColor="gray.50"
        boxShadow="md"
      >
        <Flex
          w="100px"
          h="50px"
          bg="green.100"
          p="10px"
          justifyContent="center"
          alignItems="center"
          ml="10px"
          mr="10px"
        >
          <FaClipboard height="10px" color={theme.colors.green[200]} />
        </Flex>
        <Text color="gray.200">
          A vida é como um sanduíche, é preciso recheá-la com os <b>melhores</b>{" "}
          ingredientes.
        </Text>
      </Flex>
      <Box mt="50px">
        <Image src={Bolinhas} alt="bolinhas"></Image>
      </Box>
    </Flex>
  </Grid>
);