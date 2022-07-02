import { prisma } from '../../../../database/prismaClient';

export class FindAllEmpresasUseCase {
  async execute() {
    const empresas = await prisma.usuario.findMany({
      where: {
        tipoConta: 'EMPRESA',
      },
      include: {
        empresa: true,
      },
    });

    return empresas;
  }
}
