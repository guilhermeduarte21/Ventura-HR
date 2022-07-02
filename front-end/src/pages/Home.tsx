import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { ListaVagas } from "../components/Vagas/ListaVagas";
import { LoginForm } from "./../components/LoginForm";

export function Home() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Flex
      maxWidth="70rem"
      margin="2rem auto"
      padding="0 1rem"
      display="grid"
      gridTemplateColumns={!isWideVersion ? "1fr" : "360px 1fr"}
      gap="8"
      alignItems="flex-start"
    >
      <LoginForm />

      <ListaVagas title="10 Últimas Vagas Publicadas" />
    </Flex>
  );
}
