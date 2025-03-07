import { EmailOptions } from './email.type';

export interface IEmailService {
  sendEmail(emailOptions: EmailOptions): Promise<void>;
}

export const EMAIL_SERVICE = Symbol('EMAIL_SERVICE');
