import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
  @IsString({ message: i18nValidationMessage('common.field.BASE_TYPE_STRING') })
  @ValidateIf((_, value) => value !== null && value !== undefined)
  gift_code_sku_id: string | null;
  @IsNotEmpty({
    message: i18nValidationMessage('common.field.BASE_TYPE_REQUIRED'),
  })
  @IsString({ message: i18nValidationMessage('common.field.BASE_TYPE_STRING') })
  @IsEmail(
    {},
    { message: i18nValidationMessage('common.field.EMAIL_TYPE_INVALID_EMAIL') },
  )
  login: string;
  @IsString({ message: i18nValidationMessage('common.field.BASE_TYPE_STRING') })
  @ValidateIf((_, value) => value !== null && value !== undefined)
  login_source: string | null;
  @IsNotEmpty({
    message: i18nValidationMessage('common.field.BASE_TYPE_REQUIRED'),
  })
  @IsString({ message: i18nValidationMessage('common.field.BASE_TYPE_STRING') })
  password: string;
  @IsNotEmpty({
    message: i18nValidationMessage('common.field.BASE_TYPE_REQUIRED'),
  })
  @IsBoolean({
    message: i18nValidationMessage('common.field.BASE_TYPE_BOOLEAN'),
  })
  @ValidateIf((_, value) => value !== null && value !== undefined)
  undelete: boolean;
}
