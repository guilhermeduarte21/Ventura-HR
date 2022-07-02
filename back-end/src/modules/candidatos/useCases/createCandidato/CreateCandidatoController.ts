import { Request, Response } from 'express';
import { CreateCandidatoUseCase } from './CreateCandidatoUseCase';

export class CreateCandidatoController {
  async handle(request: Request, response: Response) {
    const { nome, endereco, telefone, email, senha, cpf, github } =
      request.body;

    const createCandidatoController = new CreateCandidatoUseCase();
    const result = await createCandidatoController.execute({
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
