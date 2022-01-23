import { Grid, Heading, Text, VStack, Box, Button } from "@chakra-ui/react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Input } from "../../components/Form/input";
import { useMediaQuery } from "@chakra-ui/react";
import { theme } from "../../styles/theme";

interface SignInData {
  email: string;
  password: string;
}

interface LoginFormProps {
  handleSignIn: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<SignInData>;
  loading: boolean;
}

export const LoginForm = ({
  handleSignIn,
  errors,
  register,
  loading,
}: LoginFormProps) => {
  const history = useHistory();
  const [isDesktop] = useMediaQuery("(min-width: 1280px)");
  return (
    <Grid
      onSubmit={handleSignIn}
      as="form"
      padding="30px 15px"
      border="2px solid"
      borderColor="gray.50"
      bg="white"
      color="gray.900"
      mt={["4", "4", "0"]}
      w={["100%", "100%", "40%", "40%"]}
      borderWidth="4px"
      boxShadow="base"
      borderRadius="5px"
    >
      <Heading size="md"> Login </Heading>

      <VStack mt="6" spacing="4">
        <Box w="100%">
          <Input
            border="2px"
            color="gray.600"
            placeholder="Digite seu email"
            label="E-mail"
            type="email"
            error={errors.email}
            {...register("email")}
          />
        </Box>
        <Input
          border="2px"
          color="gray.600"
          placeholder="Digite sua senha"
          label="Senha"
          type="password"
          error={errors.password}
          {...register("password")}
        />
      </VStack>
      <VStack mt="32px" spacing="5">
        <Button
          isLoading={loading}
          bg="green.200"
          w="100%"
          color="white"
          h="60px"
          borderRadius="8px"
          _hover={{
            background: "green.300",
          }}
          type="submit"
        >
          Logar
        </Button>
        {isDesktop ? (
          <Text color="gray.200" textAlign="center">
            Crie sua conta para saborear muitas delícias e matar sua fome!
          </Text>
        ) : (
          <Text
            color="gray.200"
            textAlign="center"
            fontSize={[theme.fontSizes["xs"]]}
          >
            Crie sua conta para saborear muitas delícias e matar sua fome!
          </Text>
        )}

        <Button
          bg="gray.0"
          w="100%"
          color="gray.200"
          h="60px"
          onClick={() => history.push("/signup")}
          borderRadius="8px"
          _hover={{
            background: "gray.100",
          }}
        >
          Cadastrar
        </Button>
      </VStack>
    </Grid>
  );
};
