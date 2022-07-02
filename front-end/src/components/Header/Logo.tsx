import { Flex, Img, Text } from "@chakra-ui/react";
import procurarEmpregoLogo from "../../assets/procurar-empregos-logo.png";

export function Logo() {
  return (
    <Flex>
      <Img
        height="3rem"
        src={procurarEmpregoLogo}
        alt="Logotipo do VenturaHR"
        fontSize={["2xl", "3xl"]}
      />

      <Text
        fontSize={["2xl", "3xl"]}
        fontWeight="bold"
        letterSpacing="tight"
        ml="2"
      >
        Ventura-HR
      </Text>
    </Flex>
  );
}
