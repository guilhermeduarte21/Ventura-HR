import {
  Box,
  Button,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { Eye } from "phosphor-react";
import { RiAddLine } from "react-icons/ri";
import { Pagination } from "../Pagination";
import { Link } from "react-router-dom";
import { useVagas } from "../../services/hooks/useVagas";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface ListaVagasProps {
  title: string;
}

export function ListaVagas({ title }: ListaVagasProps) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { data, isLoading, error } = useVagas();

  async function handlePrefetchVaga(vagaId: string) {
    await queryClient.prefetchQuery(
      ["vaga", vagaId],
      async () => {
        const response = await api.get(`vaga/${vagaId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10,
      }
    );
  }

  return (
    <Box flex="1" borderRadius={8} bg="gray.800" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          {title}
        </Heading>
        {user?.tipoConta == "EMPRESA" && (
          <Button
            as={Link}
            to="/dashboard/nova-vaga"
            size="sm"
            fontSize="sm"
            colorScheme="green"
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          >
            Criar nova
          </Button>
        )}
      </Flex>

      {isLoading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify="center">
          <Text>Falha ao obter vagas publicadas.</Text>
        </Flex>
      ) : (
        <>
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Cargo</Th>
                <Th>Descricao</Th>
                <Th>Cidade</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data!.map((vaga) => {
                return (
                  <Tr key={vaga.id}>
                    <Td>
                      <Text fontWeight="bold">{vaga.cargo}</Text>
                    </Td>
                    <Td>
                      <Text fontWeight="bold">{vaga.descricao}</Text>
                    </Td>
                    <Td>
                      <Text fontWeight="bold">{vaga.cidade}</Text>
                    </Td>
                    <Td>
                      {isAuthenticated && (
                        <Button
                          as={Link}
                          to={`/dashboard/detalhar-vaga/${vaga.id}`}
                          key={vaga.id}
                          size="sm"
                          colorScheme="green"
                        >
                          <Icon as={Eye} fontSize="16" />
                        </Button>
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>

          <Pagination />
        </>
      )}
    </Box>
  );
}
