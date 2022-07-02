import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface IUpdateUsuario {
  usuarioId: string;
  nome: string;
  endereco: string;
  telefone: string;
  senha: string;
}

export class UpdateUsuarioUseCase {
  async execute({
    usuarioId,
    nome,
    endereco,
    telefone,
    senha,
  }: IUpdateUsuario) {
    const hashSenha = await hash(senha, 10);

    const result = await prisma.usuario.update({
      where: {
        id: usuarioId,
      },
      data: {
        nome,
        endereco,
        telefone,
        senha: hashSenha,
      },
    });

    return result;
  }
}
