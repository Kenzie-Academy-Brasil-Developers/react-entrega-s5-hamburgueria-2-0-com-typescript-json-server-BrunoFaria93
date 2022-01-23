import { Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "../../providers/AuthContext";
import { LoginInfo } from "./Logininfo";
import { LoginForm } from "./LoginForm";
import { motion } from "framer-motion";

const signInSchema = yup.object().shape({
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup.string().required("Senha obrigatória"),
});

interface SignInData {
  email: string;
  password: string;
}

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInData>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = ({ email, password }: SignInData) => {
    setLoading(true);
    signIn({ email, password })
      .then((_) => setLoading(false))
      .catch((err) => setLoading(false));
  };

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex
        padding={["10px 15px", "10px 15px", "0px", "0px"]}
        alignItems="center"
        justifyContent="center"
        height={["auto", "auto", "100vh", "100vh"]}
        bg="white"
        color="black"
      >
        <Flex
          w={["100%", "100%", "90%", "65%"]}
          justifyContent="center"
          flexDirection={["column-reverse", "column-reverse", "row", "row"]}
          alignItems="center"
        >
          <LoginForm
            errors={errors}
            handleSignIn={handleSubmit(handleSignIn)}
            loading={loading}
            register={register}
          />
          <LoginInfo />
        </Flex>
      </Flex>
    </motion.div>
  );
};
