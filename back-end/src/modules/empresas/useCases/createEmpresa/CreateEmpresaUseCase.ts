import { prisma } from '../../../../database/prismaClient';
import { hash } from 'bcrypt';

interface ICreateEmpresa {
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  senha: string;
  cpf: string;
  github: string;
  razaoSocial: string;
  cnpj: string;
}

export class CreateEmpresaUseCase {
  async execute({
    nome,
    endereco,
    telefone,
    email,
    senha,
    cpf,
    github,
    razaoSocial,
    cnpj,
  }: ICreateEmpresa) {
    const empresaExiste = await prisma.usuario.findFirst({
      where: {
        email: {
          contains: email,
          mode: 'insensitive',
        },
      },
    });

    if (empresaExiste) {
      throw new Error('Empresa ja existe');
    }

    const hashSenha = await hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        endereco,
        telefone,
        email,
        senha: hashSenha,
        cpf,
        github,
        tipoConta: 'EMPRESA',
        empresa: {
          create: {
            razaoSocial,
            cnpj,
          },
        },
      },
    });

    return usuario;
  }
}
