import {
  Button,
  Flex,
  Stack,
  Text,
  Link as ChakraLink,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Input } from "../components/Form/Input";
import { Logo } from "../components/Header/Logo";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext } from "./../contexts/AuthContext";

type SignInFormData = {
  email: string;
  senha: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  senha: yup.string().required("Senha obrigatória"),
});

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const { signIn, isAuthenticated } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await signIn({
      email: values.email,
      senha: values.senha,
    });
  };

  return (
    <Flex
      as="form"
      width="100%"
      p="8"
      bg="gray.800"
      borderRadius="8px"
      flexDir="column"
      onSubmit={handleSubmit(handleSignIn)}
    >
      <Flex align="center" justify="center" marginBottom="6">
        <Logo />
      </Flex>

      <Stack spacing="4">
        <Input
          type="email"
          label="E-mail"
          error={errors.email}
          {...register("email")}
        />

        <Input
          type="password"
          label="Senha"
          error={errors.senha}
          {...register("senha")}
        />
      </Stack>

      <Button
        type="submit"
        mt="6"
        colorScheme="green"
        size="lg"
        isLoading={formState.isSubmitting}
      >
        Entrar
      </Button>

      <Flex align="center" justify="center" mt="4">
        <Text>
          Não tem uma conta?
          <ChakraLink
            as={Link}
            to="/cadastro-candidato"
            ml="2"
            fontWeight="bold"
            color="green"
          >
            Registre-se
          </ChakraLink>
        </Text>
      </Flex>

      {isAuthenticated && formState.isSubmitted && (
        <Alert status="success" color="gray.900" borderRadius={8} mt="8">
          <AlertIcon />
          Login realizado com sucesso!
        </Alert>
      )}

      {!isAuthenticated &&
        formState.isSubmitted &&
        !errors.email &&
        !errors.senha && (
          <Alert status="error" color="gray.900" borderRadius={8} mt="8">
            <AlertIcon />
            Email ou senha invalidos!
          </Alert>
        )}
    </Flex>
  );
}
