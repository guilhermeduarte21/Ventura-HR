import { prisma } from '../../../../database/prismaClient';

interface IGetUsuarioAutenticadoUseCase {
  usuarioId: string;
}

export class GetUsuarioAutenticadoUseCase {
  async execute({ usuarioId }: IGetUsuarioAutenticadoUseCase) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: usuarioId,
      },
      include: {
        admin: true,
        empresa: true,
        candidato: true,
      },
    });

    return usuario;
  }
}
