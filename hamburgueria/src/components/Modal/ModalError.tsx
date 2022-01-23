import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Box,
} from "@chakra-ui/react";
import { FaExclamation, FaTimes } from "react-icons/fa";
import { theme } from "../../styles/theme";

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
  secondaryText: string;
}
export const ModalError = ({
  isOpen,
  onClose,
  error,
  secondaryText,
}: ModalErrorProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent color="gray.800">
      <ModalHeader display="flex">
        <Center bg="negative.0" w="30px" h="30px" borderRadius="5px">
          <FaExclamation color={theme.colors.white} />
        </Center>
        <Text fontWeight="bold" ml="2">
          Oops!
        </Text>
        <Center
          onClick={onClose}
          as="button"
          ml="auto"
          w="32px"
          h="32px"
          bg="negative.0"
          fontSize="large"
          borderRadius="md"
        >
          <FaTimes color={theme.colors.white} />
        </Center>
      </ModalHeader>

      <ModalBody textAlign="center" color="gray.400">
        <Text>
          Ocorreu algum erro! <b>{error}</b>
        </Text>
      </ModalBody>
      <ModalFooter display="column">
        <Button
          bg="negative.0"
          color="white"
          w="100%"
          h="60px"
          _hover={{ bg: "red.700" }}
          onClick={onClose}
        >
          Tentar novamente
        </Button>
        <Text mt="4" textAlign="center">
          <Box dangerouslySetInnerHTML={{ __html: secondaryText }} />
        </Text>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
