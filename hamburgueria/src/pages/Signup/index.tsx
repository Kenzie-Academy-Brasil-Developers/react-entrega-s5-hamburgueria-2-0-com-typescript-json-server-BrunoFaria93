import { Flex, useDisclosure, Image } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "../../providers/AuthContext";
import { SignupInfo } from "./Signupinfo";
import { SignupForm } from "./SignupForm";
import { api } from "../../services/api";
import { ModalSuccess } from "../../components/Modal/ModalSucess";
import { ModalError } from "../../components/Modal/ModalError";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from "@chakra-ui/react";
import LogoName from "../../assets/logo-name.svg";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup
    .string()
    .required("Email obrigatório")
    .email("Digite um email válido"),
  password: yup.string().required("Senha obrigatória"),
  confirm_password: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password")], "Senhas diferentes"),
});

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema),
  });
  const {
    isOpen: isModalSucccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();

  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure();

  const handleSignup = ({ name, email, password }: SignUpData) => {
    setLoading(true);
    api
      .post("/users", { name, email, password })
      .then((response) => {
        setLoading(false);
        onModalSuccessOpen();
      })
      .catch((err) => {
        setLoading(false);
        onModalErrorOpen();
      });
  };
  const [isDesktop] = useMediaQuery("(min-width: 1280px)");
  return (
    <>
      <motion.div
        className="form-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ModalSuccess
          buttonMessage="Ir para o login agora"
          message="Seu cadastro deu super certo, <b>vamos lá</b>!"
          secondaryText="Bateu a <b>fome</b>? Faça login e veja nossos lanches!"
          onClick={() => {
            history.push("/");
          }}
          isOpen={isModalSucccessOpen}
          onClose={onModalSuccessClose}
        />
        <ModalError
          isOpen={isModalErrorOpen}
          onClose={onModalErrorClose}
          error="Seu email já está em uso"
          secondaryText="Você já pode tentar novamente, <b>clicando</b> no botão acima ou aguarde alguns minutos..."
        />
        <Flex
          padding={["10px 15px", "10px 15px", "0px", "0px"]}
          alignItems="center"
          justifyContent="center"
          height={["auto", "auto", "100vh", "100vh"]}
          color="black"
        >
          <Flex
            w={["100%", "100%", "90%", "65%"]}
            justifyContent="center"
            flexDirection={["column", "column", "row", "row"]}
            alignItems="center"
          >
            {isDesktop ? (
              <SignupInfo />
            ) : (
              <Image
                src={LogoName}
                alt="burguer kenzie"
                boxSize="245px"
                h="100px"
              />
            )}

            <SignupForm
              errors={errors}
              handleSignup={handleSubmit(handleSignup)}
              loading={loading}
              register={register}
            />
          </Flex>
        </Flex>
      </motion.div>
    </>
  );
};
