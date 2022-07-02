import { prisma } from '../../../../database/prismaClient';

interface IFindUsuarioByIdUseCase {
  usuarioId: string;
}

export class FindUsuarioByIdUseCase {
  async execute({ usuarioId }: IFindUsuarioByIdUseCase) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: usuarioId,
      },
    });

    return usuario;
  }
}
