import { Request, Response } from 'express';
import { FindAllVagasUseCase } from './FindAllVagasUseCase';

export class FindAllVagasController {
  async handle(request: Request, response: Response) {
    const findAllVagasUseCase = new FindAllVagasUseCase();

    const vagas = await findAllVagasUseCase.execute();

    return response.json(vagas);
  }
}
