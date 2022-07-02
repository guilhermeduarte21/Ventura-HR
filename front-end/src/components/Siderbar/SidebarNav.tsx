import { Button, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import {
  RiAccountBoxLine,
  RiDashboardLine,
  RiListCheck2,
  RiLogoutBoxLine,
  RiUserLine,
} from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { destroyCookie } from "nookies";

export function SidebarNav() {
  const { user } = useContext(AuthContext);

  function deslogar() {
    destroyCookie(null, "ventura.token", {
      path: "/",
    });
  }

  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink href="/dashboard/vagas-publicadas" icon={RiDashboardLine}>
          Vagas Publicadas
        </NavLink>
        {user?.tipoConta == "ADMIN" && (
          <NavLink href="/dashboard/usuarios-empresas" icon={RiUserLine}>
            Usuários Empresas
          </NavLink>
        )}
        {user?.tipoConta == "ADMIN" && (
          <NavLink href="/dashboard/usuarios-candidatos" icon={RiUserLine}>
            Usuários Candidatos
          </NavLink>
        )}
      </NavSection>
      <NavSection title="PROFILE">
        <NavLink href="/dashboard/perfil" icon={RiAccountBoxLine}>
          Minha conta
        </NavLink>
        <NavLink href="/login" icon={RiLogoutBoxLine} onClick={deslogar}>
          Sair
        </NavLink>
      </NavSection>
    </Stack>
  );
}
