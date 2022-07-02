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
  Table,
  Tbody,
  Td,
  Tr,
  VStack,
  Text,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Input } from "../Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select } from "../Form/Select";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { queryClient } from "./../../services/queryClient";
import { Trash } from "phosphor-react";
import { RiAddLine } from "react-icons/ri";

type Requisitos = {
  requisito: string;
  descricao: string;
  perfil: number;
  peso: number;
};

type CreateVagaFormData = {
  cargo: string;
  descricao: string;
  requisitos: Requisitos[];
  empresa: string;
  cidade: string;
  estado: string;
  formaContratacao: string;
  periodoContratacao: Date;
  dataLimite: Date;
};

const createVagaFormSchema = yup.object().shape({
  cargo: yup.string().required("Cargo obrigatório"),
  descricao: yup.string().required("Descrição obrigatória"),
  cidade: yup.string().required("Cidade obrigatória"),
  estado: yup.string().required("Estado obrigatório"),
  formaContratacao: yup.string().required("Forma de Contratação obrigatória"),
  periodoContratacao: yup.date().required("Período de Contratação obrigatório"),
  dataLimite: yup.date().required("Data Limite obrigatória"),
});

export function VagasCreate() {
  const { user } = useContext(AuthContext);
  let [requisitosState, setRequisitosState] = useState<Requisitos[]>([]);
  const empresaId = user?.empresaId;
  const [formRequisitos, setFormRequisitos] = useState<Requisitos>({
    requisito: "",
    descricao: "",
    perfil: 1,
    peso: 1,
  });
  const valueInput = (value) =>
    setFormRequisitos({
      ...formRequisitos,
      [value.target.name]: value.target.value,
    });

  const mutation = useMutation(
    async (vaga: CreateVagaFormData) => {
      const response = await api.post("vagas", {
        cargo: vaga.cargo,
        descricao: vaga.descricao,
        requisitos: requisitosState,
        empresaId,
        cidade: vaga.cidade,
        estado: vaga.estado,
        formaContratacao: vaga.formaContratacao,
        periodoContratacao: vaga.periodoContratacao,
        dataLimite: vaga.dataLimite,
      });

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("vagas");
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<CreateVagaFormData>({
    resolver: yupResolver(createVagaFormSchema),
  });

  const handleCreateVaga: SubmitHandler<CreateVagaFormData> = async (
    values
  ) => {
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
        onSubmit={handleSubmit(handleCreateVaga)}
      >
        <Heading size="lg" fontWeight="normal">
          Criar nova vaga
        </Heading>
        <Divider my="6" borderColor="gray.700" />
        <VStack spacing={8}>
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              {...register("cargo")}
              error={errors.cargo}
              label="Cargo"
              type="txt"
            />
            <Input
              {...register("descricao")}
              error={errors.descricao}
              label="Descrição"
              type="txt"
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              {...register("cidade")}
              error={errors.cidade}
              label="Cidade"
              type="txt"
            />
            <Input
              {...register("estado")}
              error={errors.estado}
              label="Estado"
              type="txt"
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input
              {...register("periodoContratacao")}
              error={errors.periodoContratacao}
              label="Período de Contratação"
              type="date"
            />
            <Input
              {...register("dataLimite")}
              error={errors.dataLimite}
              label="Data Limite"
              type="date"
            />
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Select
              {...register("formaContratacao")}
              error={errors.formaContratacao}
              label="Forma de Contratação"
            >
              <option value="CLT" style={{ background: "#181B23" }}>
                CLT
              </option>
              <option value="PJ" style={{ background: "#181B23" }}>
                Pessoa Jurídica
              </option>
              <option value="Autonomo" style={{ background: "#181B23" }}>
                Autônomo
              </option>
            </Select>
            <div />
          </SimpleGrid>
        </VStack>

        <Divider my="6" borderColor="gray.400" />
        <Heading size="md" fontWeight="normal">
          Adicionar Requisitos
        </Heading>
        <HStack spacing={["6", "8"]} w="100%" mt="8">
          <Input
            name="requisito"
            id="requisito"
            label="Requisito"
            type="txt"
            onChange={valueInput}
          />
          <Input
            name="descricao"
            id="descricao"
            label="Descricao"
            type="txt"
            onChange={valueInput}
          />
          <Select
            name="perfil"
            id="perfil"
            label="Perfil"
            onChange={valueInput}
          >
            <option value="1" style={{ background: "#181B23" }}>
              Muito baixo
            </option>
            <option value="2" style={{ background: "#181B23" }}>
              Baixo
            </option>
            <option value="3" style={{ background: "#181B23" }}>
              Medio
            </option>
            <option value="4" style={{ background: "#181B23" }}>
              Alto
            </option>
            <option value="5" style={{ background: "#181B23" }}>
              Muito alto
            </option>
          </Select>
          <Select name="peso" id="peso" label="Peso" onChange={valueInput}>
            <option value="1" style={{ background: "#181B23" }}>
              Muito baixo
            </option>
            <option value="2" style={{ background: "#181B23" }}>
              Baixo
            </option>
            <option value="3" style={{ background: "#181B23" }}>
              Medio
            </option>
            <option value="4" style={{ background: "#181B23" }}>
              Alto
            </option>
            <option value="5" style={{ background: "#181B23" }}>
              Muito alto
            </option>
          </Select>
          <Flex mt="10">
            <Button
              onClick={() =>
                setRequisitosState((prevRequisitos) => [
                  ...prevRequisitos,
                  {
                    requisito: formRequisitos.requisito,
                    descricao: formRequisitos.descricao,
                    perfil: formRequisitos.perfil,
                    peso: formRequisitos.peso,
                  },
                ])
              }
              size="md"
              colorScheme="green"
            >
              <Icon as={RiAddLine} fontSize="20" />
            </Button>
          </Flex>
        </HStack>
        <Divider my="6" borderColor="gray.400" />
        <Table colorScheme="whiteAlpha" maxWidth="100%">
          <Tbody>
            {requisitosState!.map((requisito) => {
              return (
                <Tr key={requisito.requisito}>
                  <Td>
                    <Text fontWeight="bold">{requisito.requisito}</Text>
                  </Td>
                  <Td>
                    <Text fontWeight="bold">{requisito.descricao}</Text>
                  </Td>
                  <Td>
                    <Text fontWeight="bold">{requisito.perfil}</Text>
                  </Td>
                  <Td>
                    <Text fontWeight="bold">{requisito.peso}</Text>
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => {
                        setRequisitosState(
                          requisitosState.filter(
                            (item) => item.requisito !== requisito.requisito
                          )
                        );
                      }}
                    >
                      <Icon as={Trash} fontSize="16" />
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Button
              as={Link}
              to="/dashboard/vagas-publicadas"
              colorScheme="whiteAlpha"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              colorScheme="green"
              isLoading={formState.isSubmitting}
            >
              Publicar Vaga
            </Button>
          </HStack>
        </Flex>
        {mutation.isSuccess && (
          <Alert status="success" color="gray.900" borderRadius={8} mt="8">
            <AlertIcon />
            Vaga publicada com sucesso!
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
