import { Request, Response } from 'express';
import { FindUsuarioByIdUseCase } from './FindUsuarioByIdUseCase';

export class FindUsuarioByIdController {
  async handle(request: Request, response: Response) {
    const { id: usuarioId } = request.params;

    const findUsuarioByIdUseCase = new FindUsuarioByIdUseCase();
    const usuario = await findUsuarioByIdUseCase.execute({
      usuarioId,
    });

    return response.json(usuario);
  }
}
