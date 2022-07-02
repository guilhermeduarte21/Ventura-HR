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
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useCandidatos } from "../../services/hooks/useUsuarioCandidato";

export function ListaUsuariosCandidatos() {
  const { user } = useContext(AuthContext);
  const { data, isLoading, error } = useCandidatos();

  async function handlePrefetchUsuario(usuarioId: string) {
    await queryClient.prefetchQuery(
      ["usuario", usuarioId],
      async () => {
        const response = await api.get(`usuario/${usuarioId}`);
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
          Empresas cadastradas
        </Heading>
        {user?.tipoConta == "ADMIN" && (
          <Button
            as={Link}
            to="/dashboard/cadastrar-novo-candidato"
            size="sm"
            fontSize="sm"
            colorScheme="green"
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          >
            Criar candidato
          </Button>
        )}
      </Flex>

      {isLoading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify="center">
          <Text>Falha ao obter usuarios publicadas.</Text>
        </Flex>
      ) : (
        <>
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Usuário</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data!.map((usuario) => {
                return (
                  <Tr key={usuario.id}>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">{usuario.nome}</Text>
                        <Text fontSize="sm" color="gray.300">
                          {usuario.email}
                        </Text>
                      </Box>
                    </Td>
                    <Td>
                      <Button
                        as={Link}
                        to="detalhar-candidato"
                        size="sm"
                        colorScheme="green"
                        onMouseEnter={() => handlePrefetchUsuario(usuario.id)}
                      >
                        <Icon as={Eye} fontSize="16" />
                      </Button>
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
