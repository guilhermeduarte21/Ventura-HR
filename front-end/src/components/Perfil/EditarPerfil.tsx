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
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Form/Input";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

type EditarPerfilFormData = {
  nome: string;
  endereco: string;
  telefone: string;
  senha: string;
};

const EditarPerfilFormSchema = yup.object().shape({
  nome: yup.string().required("Nome obrigatório"),
  endereco: yup.string().required("Endereco obrigatória"),

  telefone: yup
    .string()
    .min(11, "Deve ser um número de telefone válido")
    .max(11, "Deve ser um número de telefone válido")
    .required("Telefone obrigatória"),

  senha: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Deve ter mais de 6 caracteres"),
});

export function EditarPerfil() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const mutation = useMutation(
    async (usuario: EditarPerfilFormData) => {
      const response = await api.put(`usuario/${user?.id}`, {
        nome: usuario.nome,
        endereco: usuario.endereco,
        telefone: usuario.telefone,
        senha: usuario.senha,
      });

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("usuarios");
        navigate("/dashboard/perfil");
        window.location.reload();
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<EditarPerfilFormData>({
    resolver: yupResolver(EditarPerfilFormSchema),
  });

  const handleEditarPerfil: SubmitHandler<EditarPerfilFormData> = async (
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
        onSubmit={handleSubmit(handleEditarPerfil)}
      >
        <Divider my="6" borderColor="gray.700" />
        <Heading size="lg" fontWeight="normal">
          Editar perfil
        </Heading>
        <VStack spacing={8}>
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              {...register("nome")}
              error={errors.nome}
              label="Nome"
              type="txt"
              defaultValue={user?.nome}
            />
            <Input
              {...register("endereco")}
              error={errors.endereco}
              label="Endereço"
              type="txt"
              defaultValue={user?.endereco}
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              {...register("telefone")}
              error={errors.telefone}
              label="Telefone"
              type="number"
              defaultValue={user?.telefone}
            />
            <Input
              {...register("senha")}
              error={errors.senha}
              label="Senha"
              type="password"
            />
          </SimpleGrid>
        </VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Button as={Link} to="/dashboard/perfil" colorScheme="whiteAlpha">
              Cancelar
            </Button>
            <Button
              type="submit"
              colorScheme="green"
              isLoading={formState.isSubmitting}
            >
              Salvar
            </Button>
          </HStack>
        </Flex>

        {mutation.isSuccess && (
          <Alert status="success" color="gray.900" borderRadius={8} mt="8">
            <AlertIcon />
            Perfil editado com sucesso!
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
