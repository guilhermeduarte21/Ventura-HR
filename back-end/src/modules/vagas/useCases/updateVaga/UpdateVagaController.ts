import { Request, Response } from 'express';
import { UpdateVagaUseCase } from './UpdateVagaUseCase';

export class UpdateVagaController {
  async handle(request: Request, response: Response) {
    const { id: empresaId } = request.params;
    const { id: vagaId } = request.body;

    const updateVagaUseCase = new UpdateVagaUseCase();
    const vaga = await updateVagaUseCase.execute({
      vagaId,
      empresaId,
    });

    return response.json(vaga);
  }
}
