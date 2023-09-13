import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { I18nValidationException } from 'nestjs-i18n';
import { PrismaService } from '../prisma/prisma.service';
import { Snowflake } from '../utils/Snowflake';
import { RegisterDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {
    return { message: 'login' };
  }

  async register(data: RegisterDto) {
    if (!data.consent) {
      throw new I18nValidationException([
        {
          property: 'consent',
          target: data,
          value: data.consent,
          constraints: {
            consent: 'common.field.CONSENT_REQUIRED',
          },
        },
      ]);
    }

    // check for existing user
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new I18nValidationException([
        {
          property: 'email',
          target: data,
          value: data.email,
          constraints: {
            consent: 'common.field.EMAIL_ALREADY_REGISTERED',
          },
        },
      ]);
    }

    // TODO: dob range check

    const id = Snowflake.generate();
    const hash = await argon.hash(data.password);
    const userData: any = {
      id: id,
      password: hash,
      global_name: data.global_name,
      email: data.email,
    };

    // TODO: configuration to toggle this
    if (data.unique_username_registration) {
      // use pomelo system
      const count = await this.prisma.user.count({
        where: {
          username: data.username,
        },
      });

      if (count) {
        // user name is not unique
        throw new I18nValidationException([
          {
            property: 'username',
            target: data,
            value: data.username,
            constraints: {
              consent: 'common.field.USERNAME_ALREADY_TAKEN',
            },
          },
        ]);
      }

      userData.username = data.username.toLowerCase();
    } else {
      // generate and assign a discriminator
      const discriminator = await this.generateDiscriminator(data.username);
      if (!discriminator) {
        throw new I18nValidationException([
          {
            property: 'username',
            target: data,
            value: data.username,
            constraints: {
              consent: 'common.field.USERNAME_TOO_MANY_USERS',
            },
          },
        ]);
      }

      userData.username = data.username;
      userData.discriminator = discriminator;
    }

    const user = await this.prisma.user.create({
      data: userData,
    });

    return user;
  }

  async generateDiscriminator(username: string) {
    for (let tries = 0; tries < 5; tries++) {
      const discriminator = (Math.floor(Math.random() * 10000) + 10000)
        .toString()
        .substring(1)
        .toString()
        .padStart(4, '0');
      const exists = await this.prisma.user.count({
        where: {
          username,
          discriminator,
        },
      });
      if (!exists) return discriminator;
    }
  }
}
