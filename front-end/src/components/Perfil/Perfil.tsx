import {
  Button,
  Flex,
  Icon,
  Text,
  Avatar,
  Stack,
  HStack,
  TagLeftIcon,
} from "@chakra-ui/react";
import { Envelope, MapPin, PencilSimple } from "phosphor-react";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export function Perfil() {
  const { user } = useContext(AuthContext);

  return (
    <Flex width="100%" p="4" bg="gray.800" borderRadius="8px" flexDir="column">
      <Flex align="center" justify="center" marginBottom="6">
        <Avatar
          size="2xl"
          name={user?.nome}
          src={user ? user.github + ".png" : ""}
        />
      </Flex>

      <Stack spacing="4" align="center" justify="center">
        <Text fontWeight="bold" fontSize={["xs", "sm", "md", "lg", "2xl"]}>
          {user?.nome}
        </Text>
        <Stack spacing="1" align="center" justify="center">
          <HStack spacing="1">
            <TagLeftIcon as={Envelope} />
            <Text fontSize="small">{user?.email}</Text>
          </HStack>
          <HStack spacing="1">
            <TagLeftIcon as={MapPin} />
            <Text fontSize="small">{user?.endereco}</Text>
          </HStack>
        </Stack>
      </Stack>

      <Stack direction={["column", "row"]} spacing="6" justify="flex-end">
        <Button
          as={Link}
          to="editar"
          size={["xs", "sm", "md", "lg"]}
          fontSize={["xs", "sm", "md", "lg"]}
          colorScheme="green"
          leftIcon={<Icon as={PencilSimple} fontSize="20" />}
        >
          Editar perfil
        </Button>
      </Stack>

      <Outlet />
    </Flex>
  );
}
