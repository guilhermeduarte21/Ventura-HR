import { Request, Response } from 'express';
import { FindVagaByIdUseCase } from './FindVagaByIdUseCase';

export class FindVagaByIdController {
  async handle(request: Request, response: Response) {
    const { id: vagaId } = request.params;

    const findVagaByIdUseCase = new FindVagaByIdUseCase();
    const vaga = await findVagaByIdUseCase.execute({
      vagaId,
    });

    return response.json(vaga);
  }
}
