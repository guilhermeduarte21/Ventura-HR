import { prisma } from '../../../../database/prismaClient';
import { hash } from 'bcrypt';

interface ICreateAdmin {
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  senha: string;
  cpf: string;
  github: string;
}

export class CreateAdminUseCase {
  async execute({
    nome,
    endereco,
    telefone,
    email,
    senha,
    cpf,
    github,
  }: ICreateAdmin) {
    const adminExiste = await prisma.usuario.findFirst({
      where: {
        email: {
          contains: email,
          mode: 'insensitive',
        },
      },
    });

    if (adminExiste) {
      throw new Error('Admin ja existe');
    }

    const hashSenha = await hash(senha, 10);

    const admin = await prisma.usuario.create({
      data: {
        nome,
        endereco,
        telefone,
        email,
        senha: hashSenha,
        cpf,
        github,
        tipoConta: 'ADMIN',
        admin: {
          create: {},
        },
      },
    });
    console.log(admin);
    return admin;
  }
}
