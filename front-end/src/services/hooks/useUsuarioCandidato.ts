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
};

export async function getCandidatos(): Promise<Usuario[]> {
  const { data } = await api.get("candidatos");

  const usuarios = data.map((usuario: Usuario) => {
    return {
      id: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      endereco: usuario.endereco,
      telefone: usuario.telefone,
      cpf: usuario.cpf,
      github: usuario.github,
    };
  });

  return usuarios;
}

export function useCandidatos() {
  return useQuery("candidatos", getCandidatos, {
    staleTime: 1000 * 60 * 10,
  });
}
