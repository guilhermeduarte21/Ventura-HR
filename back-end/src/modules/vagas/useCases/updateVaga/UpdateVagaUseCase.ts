import { prisma } from '../../../../database/prismaClient';

interface IUpdateVagaUseCase {
  vagaId: string;
  empresaId: string;
}

export class UpdateVagaUseCase {
  async execute({ vagaId, empresaId }: IUpdateVagaUseCase) {
    const vaga = await prisma.vaga.update({
      where: {
        id: vagaId,
      },
      data: {
        candidatos: empresaId,
      },
    });

    return vaga;
  }
}
