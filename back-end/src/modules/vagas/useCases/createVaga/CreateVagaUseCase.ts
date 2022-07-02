import { prisma } from '../../../../database/prismaClient';

type Requisitos = {
  requisito: string;
  descricao: string;
  perfil: number;
  peso: number;
};

interface ICreateVaga {
  cargo: string;
  descricao: string;
  requisitos: Requisitos[];
  empresaId: string;
  cidade: string;
  estado: string;
  formaContratacao: string;
  periodoContratacao: Date;
  dataLimite: Date;
}

export class CreateVagaUseCase {
  async execute({
    cargo,
    descricao,
    empresaId,
    requisitos,
    cidade,
    estado,
    formaContratacao,
    periodoContratacao,
    dataLimite,
  }: ICreateVaga) {
    const vaga = await prisma.vaga.create({
      data: {
        cargo,
        descricao,
        requisitos,
        empresaId,
        cidade,
        estado,
        formaContratacao,
        periodoContratacao,
        dataLimite,
      },
    });

    return vaga;
  }
}
