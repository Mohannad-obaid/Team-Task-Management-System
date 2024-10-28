import { Module, ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/config--validation';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema,
    }),
    DatabaseModule,
    UsersModule,
    TeamsModule,
  ],
  controllers: [],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
