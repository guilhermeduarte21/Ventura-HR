import { Request, Response } from 'express';
import { AuthenticateUseCase } from './AuthenticateUseCase';

export class AuthenticateController {
  async handle(request: Request, response: Response) {
    const { email, senha } = request.body;

    const authenticateUseCase = new AuthenticateUseCase();
    const result = await authenticateUseCase.execute({
      email,
      senha,
    });

    return response.json(result);
  }
}
