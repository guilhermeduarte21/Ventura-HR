import {
  Text,
  Link as ChakraLink,
  Icon,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  const { pathname } = useLocation();
  let isActive = false;

  if (pathname == href) {
    isActive = true;
  }

  if (pathname.startsWith(String(href))) {
    isActive = true;
  }

  return (
    <ChakraLink
      color={isActive ? "green.400" : "gray.50"}
      as={Link}
      to={href}
      display="flex"
      align="center"
      {...rest}
    >
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </ChakraLink>
  );
}
