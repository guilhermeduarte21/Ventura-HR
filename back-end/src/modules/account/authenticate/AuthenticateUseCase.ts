import { prisma } from '../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { auth } from '../../../config/config';

interface IAuthenticate {
  email: string;
  senha: string;
}

export class AuthenticateUseCase {
  async execute({ email, senha }: IAuthenticate) {
    const usuario = await prisma.usuario.findFirst({
      where: {
        email,
      },
    });

    if (!usuario) {
      throw new Error('Email invalido!');
    }

    const senhaCorresponde = await compare(senha, usuario.senha);

    if (!senhaCorresponde) {
      throw new Error('Senha invalida!');
    }

    //Gerar o Token
    const token = sign({ email }, auth.secret, {
      subject: usuario.id,
      expiresIn: '30d',
    });

    return { token: token };
  }
}
