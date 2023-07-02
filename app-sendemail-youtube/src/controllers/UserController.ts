import { Request, Response } from 'express';
import MailService from '../services/MailService';

class UserController {
  findAll(req: Request, res: Response) {
    return res.send('<h1>Hello World!</h1>');
  }

  create(req: Request, res: Response) {
    const { name, email } = req.body;

    MailService.sendMail({
      to: {
        name,
        email,
      },
      message: {
        subject: 'Bem-vindo ao sistema',
        body: `Seja bem-vindo, ${name} segue seu email para confirmar sua inscricao: ${email}`,
      }
    });

    return res.json({
      name,
      email,
    })
  }
}

export default new UserController();