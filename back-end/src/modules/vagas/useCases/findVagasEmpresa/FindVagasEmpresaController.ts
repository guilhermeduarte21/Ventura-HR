import { Request, Response } from 'express';
import { FindVagasEmpresaUseCase } from './FindVagasEmpresaUseCase';

export class FindVagasEmpresaController {
  async handle(request: Request, response: Response) {
    const { id: empresaId } = request.params;

    const findVagasEmpresaUseCase = new FindVagasEmpresaUseCase();
    const vaga = await findVagasEmpresaUseCase.execute({
      empresaId,
    });

    return response.json(vaga);
  }
}
