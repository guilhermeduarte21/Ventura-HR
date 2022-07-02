import { Request, Response } from 'express';
import { CreateVagaUseCase } from './CreateVagaUseCase';

export class CreateVagaController {
  async handle(request: Request, response: Response) {
    const {
      cargo,
      descricao,
      requisitos,
      empresaId,
      cidade,
      estado,
      formaContratacao,
      periodoContratacao,
      dataLimite,
    } = request.body;

    const createVagaUseCase = new CreateVagaUseCase();
    const result = await createVagaUseCase.execute({
      cargo,
      descricao,
      requisitos,
      empresaId,
      cidade,
      estado,
      formaContratacao,
      periodoContratacao,
      dataLimite,
    });

    return response.json(result);
  }
}
