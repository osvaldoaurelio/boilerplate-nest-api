import { Inject, Injectable } from '@nestjs/common';
import { compile } from 'handlebars';
import { readFile } from 'node:fs/promises';
import * as path from 'node:path';
import { CACHE_SERVICE, ICacheService } from '../cache/cache.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class TemplateService {
  constructor(
    @Inject(CACHE_SERVICE)
    private readonly cache: ICacheService<HandlebarsTemplateDelegate>,
    private readonly config: ConfigService,
  ) {}

  async compile(templateName: string, context: Record<string, unknown>) {
    const compiledTemplateCached = await this.cache.get(templateName);
    if (compiledTemplateCached) return compiledTemplateCached(context);

    const emailTemplatesDir = this.config.get<string>('EMAIL_TEMPLATES_DIR');
    const templatePath = path.join(emailTemplatesDir, `${templateName}.hbs`);
    const templateFile = await readFile(templatePath, 'utf-8');

    const compiledTemplate = compile(templateFile);
    this.cache.set(templateName, compiledTemplate);

    return compiledTemplate(context);
  }
}
