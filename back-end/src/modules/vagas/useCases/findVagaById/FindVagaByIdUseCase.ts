import { prisma } from '../../../../database/prismaClient';

interface IFindVagaByIdUseCase {
  vagaId: string;
}

export class FindVagaByIdUseCase {
  async execute({ vagaId }: IFindVagaByIdUseCase) {
    const vaga = await prisma.vaga.findUnique({
      where: {
        id: vagaId,
      },
      include: {
        empresa: true,
        candidatos: true,
      },
    });

    return vaga;
  }
}
