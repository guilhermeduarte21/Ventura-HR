import { prisma } from '../../../../database/prismaClient';

export class FindAllCandidatosUseCase {
  async execute() {
    const candidatos = await prisma.usuario.findMany({
      where: {
        tipoConta: 'CANDIDATO',
      },
      include: {
        candidato: true,
      },
    });

    return candidatos;
  }
}
