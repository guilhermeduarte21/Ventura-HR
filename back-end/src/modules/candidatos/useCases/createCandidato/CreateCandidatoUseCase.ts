import { prisma } from '../../../../database/prismaClient';
import { hash } from 'bcrypt';

interface ICreateCandidato {
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  senha: string;
  cpf: string;
  github: string;
}

export class CreateCandidatoUseCase {
  async execute({
    nome,
    endereco,
    telefone,
    email,
    senha,
    cpf,
    github,
  }: ICreateCandidato) {
    const candidatoExiste = await prisma.usuario.findFirst({
      where: {
        email: {
          contains: email,
          mode: 'insensitive',
        },
      },
    });

    if (candidatoExiste) {
      throw new Error('Candidato ja existe');
    }

    const hashSenha = await hash(senha, 10);

    const candidato = await prisma.usuario.create({
      data: {
        nome,
        endereco,
        telefone,
        email,
        senha: hashSenha,
        cpf,
        github,
        tipoConta: 'CANDIDATO',
        candidato: {
          create: {},
        },
      },
    });

    return candidato;
  }
}
