import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as ChakraInput,
    InputProps as ChakraInputProps,
    InputLeftElement,
    InputGroup,
  } from "@chakra-ui/react";
  
  
  import {
    ForwardRefRenderFunction,
    useState,
    useEffect,
    useCallback,
    forwardRef,
  } from "react";
  import { FieldError } from "react-hook-form";
  import { IconType } from "react-icons/lib";
  
  interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError | null;
    icon?: IconType;
  }
  
  type inputVariationOptions = {
    [key: string]: string;
  };
  
  const InputVariation: inputVariationOptions = {
    error: "red.500",
    default: "gray.200",
    focus: "purple.800",
    filled: "green.500",
  };
  
  const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    { name, error = null, icon: Icon, label, ...rest },
    ref
  ) => {
    const [value, setValue] = useState("");
    const [variation, setVariation] = useState("default");
  
    useEffect(() => {
      if (error) {
        return setVariation("error");
      }
    }, [error]);
  
    const handleInputFocus = useCallback(() => {
      if (!error) {
        setVariation("focus");
      }
    }, [error]);
  
    const handleInputBlur = useCallback(() => {
      if (value.length > 1 && !error) {
        return setVariation("filled");
      }
    }, [error, value]);
  
    return (
      <FormControl isInvalid={!!error}>
        {label && <FormLabel color="gray.400">{label}</FormLabel>}
  
        <InputGroup flexDirection="column">
          {Icon && (
            <InputLeftElement color={InputVariation[variation]} mt="2.5">
              <Icon />
            </InputLeftElement>
          )}
  
          <ChakraInput
            id={name}
            name={name}
            onChangeCapture={(e) => setValue(e.currentTarget.value)}
            onBlurCapture={handleInputBlur}
            onFocus={handleInputFocus}
            borderColor={InputVariation[variation]}
            color={InputVariation[variation]}
            bg="gray.50"
            variant="outline"
            _hover={{ bgColor: "gray.100" }}
            _placeholder={{ color: "gray.300" }}
            _focus={{
              bg: "gray.100",
            }}
            size="lg"
            h="60px"
            ref={ref}
            {...rest}
          />
          {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </InputGroup>
      </FormControl>
    );
  };
  
  export const Input = forwardRef(InputBase);
  