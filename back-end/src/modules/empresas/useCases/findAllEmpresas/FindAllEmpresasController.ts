import { Request, Response } from 'express';
import { FindAllEmpresasUseCase } from './FindAllEmpresasUseCase';

export class FindAllEmpresasController {
  async handle(request: Request, response: Response) {
    const findAllEmpresasUseCase = new FindAllEmpresasUseCase();

    const empresas = await findAllEmpresasUseCase.execute();

    return response.json(empresas);
  }
}
