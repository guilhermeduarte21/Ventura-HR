import { prisma } from '../../../../database/prismaClient';

interface IFindUserEmpresaByIdUseCase {
  empresaId: string;
}

export class FindUserEmpresaByIdUseCase {
  async execute({ empresaId }: IFindUserEmpresaByIdUseCase) {
    const usuario = await prisma.empresa.findUnique({
      where: {
        id: empresaId,
      },
      include: {
        usuario: true,
      },
    });

    return usuario;
  }
}
