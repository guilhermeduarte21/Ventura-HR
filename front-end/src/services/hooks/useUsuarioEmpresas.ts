import { useQuery } from "react-query";
import { api } from "../api";

type Usuario = {
  id: string;
  email: string;
  nome: string;
  endereco: string;
  telefone: string;
  cpf: string;
  github: string;
  empresa: {
    id: string;
    razaoSocial: string;
    cnpj: string;
  };
};

export async function getEmpresas(): Promise<Usuario[]> {
  const { data } = await api.get("empresas");

  const usuarios = data.map((usuario: Usuario) => {
    return {
      id: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      endereco: usuario.endereco,
      telefone: usuario.telefone,
      cpf: usuario.cpf,
      github: usuario.github,
      empresa: {
        id: usuario.empresa.id,
        razaoSocial: usuario.empresa.razaoSocial,
        cnpj: usuario.empresa.cnpj,
      },
    };
  });

  return usuarios;
}

export function useEmpresas() {
  return useQuery("empresas", getEmpresas, {
    staleTime: 1000 * 60 * 10,
  });
}
