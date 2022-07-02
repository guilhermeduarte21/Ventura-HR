import { Request, Response } from 'express';
import { CreateEmpresaUseCase } from './CreateEmpresaUseCase';

export class CreateEmpresaController {
  async handle(request: Request, response: Response) {
    const {
      nome,
      endereco,
      telefone,
      email,
      senha,
      cpf,
      github,
      razaoSocial,
      cnpj,
    } = request.body;

    const createEmpresaUseCase = new CreateEmpresaUseCase();
    const result = await createEmpresaUseCase.execute({
      nome,
      endereco,
      telefone,
      email,
      senha,
      cpf,
      github,
      razaoSocial,
      cnpj,
    });

    return response.json(result);
  }
}
