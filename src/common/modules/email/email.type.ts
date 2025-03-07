export type EmailOptions = {
  to: string;
  subject: string;
  template: string;
  context: Record<string, unknown>;
};
