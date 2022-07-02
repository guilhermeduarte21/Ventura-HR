import { Request, Response } from 'express';
import { FindUserEmpresaByIdUseCase } from './FindUserEmpresaByIdUseCase';

export class FindUserEmpresaByIdController {
  async handle(request: Request, response: Response) {
    const { id: empresaId } = request.params;

    const findUserEmpresaByIdUseCase = new FindUserEmpresaByIdUseCase();
    const usuario = await findUserEmpresaByIdUseCase.execute({
      empresaId,
    });

    return response.json(usuario);
  }
}
