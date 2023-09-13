import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // MikroOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     entities: ['./dist/entities'],
    //     entitiesTs: ['./src/entities'],
    //     debug: process.env.ENV !== 'production',
    //     autoLoadEntities: true,
    //     ...configService.get('database'),
    //   }),
    // }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    AuthModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
