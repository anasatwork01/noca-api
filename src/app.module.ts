import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './configs/db-config';
import { RouterModule } from '@nestjs/core';
import { AdminModule } from './app/admin/admin.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthenticationModule } from './app/authentication/authentication.module';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        DBConfig.getConfigs(configService),
      inject: [ConfigService],
    }),
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
    ]),
    ScheduleModule.forRoot(),
    AuthenticationModule,
  ],
  controllers: [],
  providers: [UserRepository],
})
export class AppModule {}
