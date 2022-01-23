import { Grid, Image, Heading, Text, Flex, Box } from "@chakra-ui/react";
import { FaClipboard } from "react-icons/fa";
import LogoName from "../../assets/logo-name.svg";
import Bolinhas from "../../assets/bolinhas.svg";
import { theme } from "../../styles/theme";
import { useMediaQuery } from "@chakra-ui/react";

export const LoginInfo = () => {
  const [isDesktop] = useMediaQuery("(min-width: 1280px)");

  return (
    <Grid
      w={["100%", "100%", "50%", "50%"]}
      paddingRight="100px"
      ml={["0", "0", "60px", "60px"]}
    >
      <Flex
        justifyContent="center"
        direction="column"
        width={["90vw", "90vw", "100%", "100%"]}
      >
        <Image
          src={LogoName}
          alt="burguer kenzie"
          boxSize={["200px", "200px", "245px", "245px"]}
          h="80px"
        />
        <Flex
          height="50%"
          border="2px"
          color="gray.0"
          justifyContent="space-between"
          alignItems="center"
          borderWidth="4px"
          borderColor="gray.50"
          boxShadow="base"
          borderRadius="5px"
        >
          <Flex
            w={["90%", "90%", "100px", "100px"]}
            h="60px"
            bg="
            #E9F7EF
            "
            width="60px"
            justifyContent="center"
            alignItems="center"
            ml="10px"
            mr="10px"
          >
            <FaClipboard height="10px" color={theme.colors.green[200]} />
          </Flex>
          {isDesktop ? (
            <Text color="gray.200" m="10px" fontSize={[theme.fontSizes["md"]]}>
              A vida é como um sanduíche, é preciso recheá-la com os{" "}
              <b>melhores</b> ingredientes.
            </Text>
          ) : (
            <Text color="gray.200" m="10px" fontSize={[theme.fontSizes["xs"]]}>
              A vida é como um sanduíche, é preciso recheá-la com os{" "}
              <b>melhores</b> ingredientes.
            </Text>
          )}
        </Flex>
        {isDesktop ? (
          <Flex alignItems="center">
            <Flex mt="50px">
              <Image src={Bolinhas} alt="bolinhas"></Image>
            </Flex>
          </Flex>
        ) : (
          <> </>
        )}
      </Flex>
    </Grid>
  );
};
