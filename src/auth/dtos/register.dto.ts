import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  IsString,
  Length,
  NotContains,
  ValidateIf,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class RegisterDto {
  @IsNotEmpty({
    message: i18nValidationMessage('common.field.BASE_TYPE_REQUIRED'),
  })
  @IsBoolean({
    message: i18nValidationMessage('common.field.BASE_TYPE_BOOLEAN'),
  })
  consent: boolean;
  @IsNotEmpty({
    message: i18nValidationMessage('common.field.BASE_TYPE_REQUIRED'),
  })
  @IsDateString()
  date_of_birth: string;
  @IsNotEmpty({
    message: i18nValidationMessage('common.field.BASE_TYPE_REQUIRED'),
  })
  @IsEmail(
    {},
    { message: i18nValidationMessage('common.field.EMAIL_TYPE_INVALID_EMAIL') },
  )
  email: string;
  @IsNotEmpty({
    message: i18nValidationMessage('common.field.BASE_TYPE_REQUIRED'),
  })
  @IsString({ message: i18nValidationMessage('common.field.BASE_TYPE_STRING') })
  @ValidateIf((_, value) => value !== null)
  fingerprint: string;
  @IsString({ message: i18nValidationMessage('common.field.BASE_TYPE_STRING') })
  @ValidateIf((_, value) => value !== null)
  gift_code_sku_id: string | null;
  @IsString({ message: i18nValidationMessage('common.field.BASE_TYPE_STRING') })
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  global_name: string;
  @IsString({ message: i18nValidationMessage('common.field.BASE_TYPE_STRING') })
  @ValidateIf((_, value) => value !== null)
  invite: string | null;
  @IsNotEmpty({
    message: i18nValidationMessage('common.field.BASE_TYPE_REQUIRED'),
  })
  @IsString({ message: i18nValidationMessage('common.field.BASE_TYPE_STRING') })
  @Length(8, undefined, {
    message: i18nValidationMessage(
      'common.field.PASSWORD_REQUIREMENTS_MIN_LENGTH|{"min":$constraint1}',
    ),
  })
  password: string;
  @IsNotEmpty({
    message: i18nValidationMessage('common.field.BASE_TYPE_REQUIRED'),
  })
  @IsString({ message: i18nValidationMessage('common.field.BASE_TYPE_STRING') })
  @IsNotIn(['everyone', 'here'], {
    message: i18nValidationMessage('common.field.USERNAME_ALREADY_TAKEN'),
  })
  @NotContains('discord', {
    message: i18nValidationMessage('common.field.USERNAME_ALREADY_TAKEN'),
  })
  @NotContains('@', {
    message: i18nValidationMessage('common.field.USERNAME_ALREADY_TAKEN'),
  })
  @NotContains('#', {
    message: i18nValidationMessage('common.field.USERNAME_ALREADY_TAKEN'),
  })
  @NotContains(':', {
    message: i18nValidationMessage('common.field.USERNAME_ALREADY_TAKEN'),
  })
  @NotContains('```', {
    message: i18nValidationMessage('common.field.USERNAME_ALREADY_TAKEN'),
  })
  @Length(2, 32, {
    message: i18nValidationMessage(
      'common.field.BASE_TYPE_BAD_LENGTH|{"min":$constraint1,"max":$constraint2}',
    ),
  })
  username: string;
}
