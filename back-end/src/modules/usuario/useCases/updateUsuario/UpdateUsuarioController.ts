import { Request, Response } from 'express';
import { UpdateUsuarioUseCase } from './UpdateUsuarioUseCase';

export class UpdateUsuarioController {
  async handle(request: Request, response: Response) {
    const { usuarioId } = request;
    const { nome, endereco, telefone, senha } = request.body;
    console.log(usuarioId);

    const updateUsuarioUseCase = new UpdateUsuarioUseCase();
    const usuarioUpdate = await updateUsuarioUseCase.execute({
      usuarioId,
      nome,
      endereco,
      telefone,
      senha,
    });

    return response.json(usuarioUpdate);
  }
}
