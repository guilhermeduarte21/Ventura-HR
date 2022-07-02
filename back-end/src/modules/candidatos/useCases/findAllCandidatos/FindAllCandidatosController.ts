import { Request, Response } from 'express';
import { FindAllCandidatosUseCase } from './FindAllCandidatosUseCase';

export class FindAllCandidatosController {
  async handle(request: Request, response: Response) {
    const findAllCandidatosUseCase = new FindAllCandidatosUseCase();

    const candidatos = await findAllCandidatosUseCase.execute();

    return response.json(candidatos);
  }
}
