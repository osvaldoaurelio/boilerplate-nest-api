import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { compile, TemplateDelegate } from 'handlebars';
import { readFile } from 'node:fs/promises';
import * as path from 'node:path';
import { ConfigService } from '../config/config.service';

@Injectable()
export class TemplateService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
    private readonly config: ConfigService,
  ) {}

  async compile(templateName: string, context: Record<string, unknown>) {
    const TemplateCached = await this.cache.get<TemplateDelegate>(templateName);
    if (TemplateCached) return TemplateCached(context);

    const emailTemplatesDir = this.config.get<string>('EMAIL_TEMPLATES_DIR');
    const templatePath = path.join(emailTemplatesDir, `${templateName}.hbs`);
    const templateFile = await readFile(templatePath, 'utf-8');

    const compiledTemplate = compile(templateFile);
    this.cache.set(templateName, compiledTemplate);

    return compiledTemplate(context);
  }
}
