import { Request, Response } from 'express';
import { GetUsuarioAutenticadoUseCase } from './GetUsuarioAutenticadoUseCase';

export class GetUsuarioAutenticadoController {
  async handle(request: Request, response: Response) {
    const usuarioId = request.usuarioId;

    const getUsuarioAutenticadoUseCase = new GetUsuarioAutenticadoUseCase();
    const usuario = await getUsuarioAutenticadoUseCase.execute({
      usuarioId,
    });

    return response.json(usuario);
  }
}
