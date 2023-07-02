interface IMailTo {
  name: string;
  email: string;
}

interface IMailMessage {
  subject: string;
  body: string;
  attachment?: string[];
}

type SendMailType = {
  to: IMailTo;
  message: IMailMessage;
};

class MailService {
  sendMail({ to, message }: SendMailType) {
    // Send mail
    return `Email enviado para ${to.name} com o assunto ${message.subject}`;
  }
}

export default new MailService();