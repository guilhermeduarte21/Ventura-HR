import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { useVaga } from "../../services/hooks/useVaga";

type Requisitos = {
  requisito: string;
  descricao: string;
  perfil: number;
  peso: number;
};

type Vaga = {
  id: string;
  cargo: string;
  descricao: string;
  empresaId: string;
  cidade: string;
  estado: string;
  formaContratacao: string;
  periodoContratacao: Date | null;
  dataLimite: Date | null;
  requisitos: Requisitos[];
  github: string;
  razaoSocial: string;
  nome: string;
};

export const VagaDetalhada: React.FC = () => {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const [vaga, setVaga] = useState<Vaga>({
    id: "",
    cargo: "",
    descricao: "",
    empresaId: "",
    cidade: "",
    estado: "",
    formaContratacao: "",
    periodoContratacao: null,
    dataLimite: null,
    requisitos: [],
    github: "",
    razaoSocial: "",
    nome: "",
  });

  async function getVaga() {
    const { data } = await api.get(`vaga/${params.vagaId}`);
    const { data: empresa } = await api.get(`empresas/${data.empresaId}`);
    const { usuario } = empresa;

    setVaga({
      id: data.id,
      cargo: data.cargo,
      descricao: data.descricao,
      empresaId: data.empresaId,
      cidade: data.cidade,
      estado: data.estado,
      formaContratacao: data.formaContratacao,
      periodoContratacao: data.periodoContratacao,
      dataLimite: data.dataLimite,
      requisitos: data.requisitos,
      github: usuario[0].github,
      razaoSocial: empresa.razaoSocial,
      nome: usuario[0].nome,
    });

    console.log(usuario);
  }

  useEffect(() => {
    getVaga();
  }, []);

  return (
    <Box as="article" bg="gray.800" borderRadius="8" width="100%" padding="8">
      <Heading
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex display="flex" alignItems="center" gap="1rem">
          <Avatar
            width="3.75rem"
            height="3.75rem"
            borderRadius="8px"
            border="4px"
            borderTopColor="gray.800"
            borderEndColor="gray.800"
            borderLeftColor="gray.800"
            borderBottomColor="gray.800"
            borderStyle="solid"
            outline="solid"
            outlineColor="green.500"
            outlineOffset="2px"
            name={user?.nome}
            src={vaga.github ? vaga.github + ".png" : ""}
          />
          <Flex flexDirection="column">
            <Text
              as="strong"
              display="block"
              color={"gray.100"}
              lineHeight="1.6"
              fontSize={["md", "lg"]}
            >
              {vaga.razaoSocial}
            </Text>
            <Text
              as="span"
              display="block"
              color={"gray.400"}
              lineHeight="1.6"
              fontSize={["sm", "md"]}
            >
              {vaga.nome}
            </Text>
          </Flex>
        </Flex>

        {/* <Flex
          as="time"
          title="11 de Maio às 08:13h"
          dateTime="2022-05-11 08:13:30"
          fontSize="0.875rem"
          color="gray.400"
        >
          PubLicado há 1h
        </Flex> */}
      </Heading>

      <Flex
        lineHeight="1.6"
        color="gray.300"
        mt="1.5rem"
        flexDirection="column"
      >
        <Text as="p" mt="1">
          {vaga?.cargo}
        </Text>
        <Text as="p" mt="1">
          {vaga?.descricao}
        </Text>
        <Text as="p" mt="1">
          {vaga?.cidade}
        </Text>
        <Divider my="6" borderColor="gray.400" />
        <Heading size="md" fontWeight="normal">
          Requisitos
        </Heading>
        <Table colorScheme="whiteAlpha" maxWidth="100%">
          <Tbody>
            {vaga?.requisitos.map((requisito) => {
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
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>

      {user?.tipoConta == "CANDIDATO" && (
        <Flex
          as="form"
          width="100%"
          mt="1.5rem"
          pt="1.5rem"
          borderTop="1px"
          borderTopStyle="solid"
          borderTopColor="gray.600"
        >
          <Button
            type="submit"
            fontWeight="bold"
            bg="green.500"
            textDecoration="none"
            padding="1.5rem"
            mt="1rem"
            borderRadius="8px"
            border={0}
            cursor="pointer"
            _hover={{ background: "green.300" }}
          >
            Candidatar-se
          </Button>
        </Flex>
      )}
    </Box>
  );
};
