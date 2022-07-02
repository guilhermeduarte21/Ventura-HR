import { useQuery } from "react-query";
import { api } from "../api";

type Vaga = {
  id: string;
  cargo: string;
  descricao: string;
  empresaId: string;
  cidade: string;
  estado: string;
  formaContratacao: string;
  periodoContratacao: Date;
  dataLimite: Date;
};

export async function getVagas(): Promise<Vaga[]> {
  const { data } = await api.get("vagas");

  const vagas = data.map((vaga: Vaga) => {
    return {
      id: vaga.id,
      cargo: vaga.cargo,
      descricao: vaga.descricao,
      empresaId: vaga.empresaId,
      cidade: vaga.cidade,
      estado: vaga.estado,
      formaContratacao: vaga.formaContratacao,
      periodoContratacao: vaga.periodoContratacao,
      dataLimite: vaga.dataLimite,
    };
  });

  return vagas;
}

export function useVagas() {
  return useQuery("vagas", getVagas, {
    staleTime: 1000 * 60 * 10,
  });
}
