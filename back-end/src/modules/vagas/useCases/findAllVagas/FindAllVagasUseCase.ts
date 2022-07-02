import { prisma } from '../../../../database/prismaClient';

export class FindAllVagasUseCase {
  async execute() {
    const vagas = await prisma.vaga.findMany();

    return vagas;
  }
}
