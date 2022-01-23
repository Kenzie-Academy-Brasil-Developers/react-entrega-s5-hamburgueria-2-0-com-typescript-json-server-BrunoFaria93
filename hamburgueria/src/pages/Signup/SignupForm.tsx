import { Grid, Heading, VStack, Button, Flex } from "@chakra-ui/react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "../../components/Form/input";
import { theme } from "../../styles/theme";
import { Link } from "react-router-dom";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirm_password?: string;
}

interface SignupFormProps {
  handleSignup: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<SignUpData>;
  loading: boolean;
}

export const SignupForm = ({
  handleSignup,
  errors,
  register,
  loading,
}: SignupFormProps) => (
  <Grid
    onSubmit={handleSignup}
    as="form"
    padding="40px 25px"
    border="2px solid"
    borderColor="gray.0"
    bg="white"
    color="gray.900"
    mt={["4", "4", "0"]}
    w={["100%", "100%", "40%", "40%"]}
  >
    <Flex w="100%" direction="row" justifyContent="space-between">
      <Heading size="md">Cadastro</Heading>
      <Link
        to="/"
        style={{
          fontWeight: "bold",
          textDecoration: "underline",
          color: theme.colors.gray[200],
          fontSize: theme.fontSizes["sm"],
        }}
      >
        Voltar
      </Link>
    </Flex>

    <VStack mt="6" spacing="6">
      <Input
        bgColor="gray.0"
        border="2px"
        placeholder="Digite seu nome"
        error={errors.name}
        {...register("name")}
      />
      <Input
        bgColor="gray.0"
        border="2px"
        placeholder="Digite seu login"
        type="email"
        error={errors.email}
        {...register("email")}
      />

      <Input
        placeholder="Digite sua senha"
        bgColor="gray.0"
        type="password"
        border="2px"
        error={errors.password}
        {...register("password")}
      />
      <Input
        bgColor="gray.0"
        border="2px"
        placeholder="Confirme sua senha"
        type="password"
        error={errors.confirm_password}
        {...register("confirm_password")}
      />
    </VStack>
    <Button
      mt="8"
      isLoading={loading}
      bg="gray.0"
      w="100%"
      color="gray.200"
      h="60px"
      borderRadius="8px"
      _hover={{
        background: "gray.100",
      }}
      type="submit"
    >
      Finalizar cadastro
    </Button>
  </Grid>
);
