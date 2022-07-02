import { Request, Response } from 'express';
import { CreateAdminUseCase } from './CreateAdminUseCase';

export class CreateAdminController {
  async handle(request: Request, response: Response) {
    const { nome, endereco, telefone, email, senha, cpf, github } =
      request.body;

    const createAdminController = new CreateAdminUseCase();
    const result = await createAdminController.execute({
      nome,
      endereco,
      telefone,
      email,
      senha,
      cpf,
      github,
    });

    return response.json(result);
  }
}
