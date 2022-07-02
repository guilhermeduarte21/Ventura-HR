import { prisma } from '../../../../database/prismaClient';

interface IFindVagasEmpresaUseCase {
  empresaId: string;
}

export class FindVagasEmpresaUseCase {
  async execute({ empresaId }: IFindVagasEmpresaUseCase) {
    console.log(empresaId);
    const vagas = await prisma.empresa.findUnique({
      where: {
        id: empresaId,
      },
      include: {
        vaga: true,
      },
    });

    return vagas;
  }
}
