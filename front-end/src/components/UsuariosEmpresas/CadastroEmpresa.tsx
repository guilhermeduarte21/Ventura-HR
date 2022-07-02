import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

type CadastroEmpresaFormData = {
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  senha: string;
  comfirmarSenha: string;
  cpf: string;
  github: string;
  razaoSocial: string;
  cnpj: string;
};

const cadastroEmpresaFormSchema = yup.object().shape({
  nome: yup.string().required("Nome obrigatório"),
  razaoSocial: yup.string().required("Razão social obrigatório"),
  endereco: yup.string().required("Endereco obrigatória"),
  telefone: yup
    .string()
    .min(11, "Deve ser um número de telefone válido")
    .max(11, "Deve ser um número de telefone válido")
    .required("Telefone obrigatória"),
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  senha: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Deve ter mais de 6 caracteres"),
  comfirmarSenha: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Deve ter mais de 6 caracteres")
    .oneOf([yup.ref("senha"), null], "As senhas devem corresponder"),
  cpf: yup
    .string()
    .required("CPF obrigatória")
    .min(11, "Deve ser um cpf válido")
    .max(11, "Deve ser um cpf válido"),
  cnpj: yup
    .string()
    .required("CNPJ obrigatória")
    .min(14, "Deve ser um cnpj válido")
    .max(14, "Deve ser um cnpj válido"),
  github: yup.string().url("Deve ser um link válido").nullable(),
});

export function CadastroEmpresa() {
  const mutation = useMutation(
    async (empresa: CadastroEmpresaFormData) => {
      const response = await api.post("empresas", {
        nome: empresa.nome,
        endereco: empresa.endereco,
        telefone: empresa.telefone,
        email: empresa.email,
        senha: empresa.senha,
        cpf: empresa.cpf,
        github: empresa.github,
        razaoSocial: empresa.razaoSocial,
        cnpj: empresa.cnpj,
      });

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("usuarios");
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<CadastroEmpresaFormData>({
    resolver: yupResolver(cadastroEmpresaFormSchema),
  });

  const handleCreateEmpresa: SubmitHandler<CadastroEmpresaFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await mutation.mutateAsync(values);
  };

  return (
    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      <Box
        as="form"
        flex="1"
        borderRadius={8}
        bg="gray.800"
        p={["6", "8"]}
        onSubmit={handleSubmit(handleCreateEmpresa)}
      >
        <Heading size="lg" fontWeight="normal">
          Cadastre-se
        </Heading>
        <Text color="gray.300">É rápido e fácil.</Text>
        <Divider my="6" borderColor="gray.700" />
        <VStack spacing={8}>
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              {...register("nome")}
              error={errors.nome}
              label="Nome Completo"
              type="txt"
            />
            <Input
              {...register("endereco")}
              error={errors.endereco}
              label="Endereço completo"
              type="txt"
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              {...register("telefone")}
              error={errors.telefone}
              label="Telefone"
              type="number"
            />
            <Input
              {...register("email")}
              error={errors.email}
              label="E-mail"
              type="email"
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              {...register("senha")}
              error={errors.senha}
              label="Senha"
              type="password"
            />
            <Input
              {...register("comfirmarSenha")}
              error={errors.comfirmarSenha}
              label="Confirmar senha"
              type="password"
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              {...register("cpf")}
              error={errors.cpf}
              label="CPF"
              type="number"
            />
            <Input
              {...register("github")}
              error={errors.github}
              label="Link perfil GitHub (opcional)"
              type="txt"
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              {...register("razaoSocial")}
              error={errors.razaoSocial}
              label="Razão Social"
              type="txt"
            />
            <Input
              {...register("cnpj")}
              error={errors.cnpj}
              label="CNPJ"
              type="number"
            />
          </SimpleGrid>
        </VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Button as={Link} to="/login" colorScheme="whiteAlpha">
              Cancelar
            </Button>
            <Button
              type="submit"
              colorScheme="green"
              isLoading={formState.isSubmitting}
            >
              Cadastrar
            </Button>
          </HStack>
        </Flex>

        {mutation.isSuccess && (
          <Alert status="success" color="gray.900" borderRadius={8} mt="8">
            <AlertIcon />
            Empresa cadastrada com sucesso!
          </Alert>
        )}

        {mutation.isError && (
          <Alert status="error" color="gray.900" borderRadius={8} mt="8">
            <AlertIcon />
            {mutation.error.response.data.message}
          </Alert>
        )}
      </Box>
    </Flex>
  );
}
