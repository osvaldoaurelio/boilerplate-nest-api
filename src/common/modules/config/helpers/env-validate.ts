import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ConfigMap } from '../config.type';
import { ConfigDto } from '../dto/config.dto';

export function envValidate(config: ConfigMap) {
  const validatedConfig = plainToInstance(ConfigDto, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig);

  if (errors.length > 0) throw new Error(errors.toString());

  return validatedConfig;
}
