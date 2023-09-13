import { ArgumentsHost, Catch, ValidationError } from '@nestjs/common';
import { getMetadataStorage } from 'class-validator';
import {
  I18nContext,
  I18nService,
  I18nValidationError,
  I18nValidationException,
  I18nValidationExceptionFilter,
  Path,
  TranslateOptions,
} from 'nestjs-i18n';

export type I18nCustomValidationError = ValidationError & {
  translationKey: string;
};

@Catch(I18nValidationException)
export class I18nExceptionFilter extends I18nValidationExceptionFilter {
  constructor() {
    super({ detailedErrors: false });
  }

  catch(exception: I18nValidationException, host: ArgumentsHost) {
    const i18n = I18nContext.current();

    const errors = formatI18nErrors(exception.errors ?? [], i18n!.service, {
      lang: i18n!.lang,
    });

    const response = host.switchToHttp().getResponse();
    return response.status(exception.getStatus()).send({
      statusCode: exception.getStatus(),
      message: exception.getResponse(),
      errors: this.normalizeValidationErrors(errors),
    });
  }

  protected normalizeValidationErrors(
    validationErrors: I18nValidationError[],
  ): object | ValidationError[] | string[] {
    const formatError = (error: I18nValidationError) => ({
      [error.property]: {
        _errors: error.constraints
          ? Object.values(error.constraints).map((x) => {
              const split = x.split('|');
              return {
                code: split[0],
                message: split[1],
              };
            })
          : [],
      },
    });

    if (validationErrors.length === 1) {
      const error = validationErrors[0];
      return {
        ...formatError(error),
      };
    }

    return validationErrors.map((error) => ({
      ...formatError(error),
    }));
  }
}

export function formatI18nErrors<K = Record<string, unknown>>(
  errors: I18nValidationError[],
  i18n: I18nService<K>,
  options?: TranslateOptions,
): I18nValidationError[] {
  return errors.map((error) => {
    const limits = getMetadataStorage()
      .getTargetValidationMetadatas(
        error.target!.constructor,
        error.target!.constructor.name,
        true,
        false,
      )
      .find(
        (meta) =>
          meta.target === error.target!.constructor &&
          meta.propertyName === error.property,
      );
    const constraints = Object.assign({}, limits?.constraints);
    error.children = formatI18nErrors(error.children ?? [], i18n, options);
    error.constraints = Object.keys(error.constraints!).reduce(
      (result, key) => {
        const [translationKey, argsString] = error.constraints![key].split('|');
        const args = !!argsString ? JSON.parse(argsString) : {};
        const translation = i18n.translate(translationKey as Path<K>, {
          ...options,
          args: {
            property: error.property,
            value: error.value,
            target: error.target,
            contexts: error.contexts,
            constraints: constraints,
            ...args,
          },
        });
        result[key] = `${translationKey.split('.').pop()}|${translation}`;
        return result;
      },
      {} as any,
    );
    return error;
  });
}
