import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
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

export async function getVaga(): Promise<Vaga[]> {
  const params = useParams();
  const { data } = await api.get(`vaga/${params.vagaId}`);

  return data;
}

export function useVaga() {
  return useQuery("vaga", getVaga, {
    staleTime: 1000 * 60 * 10,
  });
}
