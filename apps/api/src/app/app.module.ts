import { RefreshTokenService } from './core/security/refreshtoken.service';
import { Module } from '@nestjs/common';
import { EmailConfigModule } from './core/email/email-config/email-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { allDbEntity } from './db/DbEntity';
import { HrMainModule } from './modules/hr-main-module.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    EmailConfigModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'hr',
      logging: false,
      synchronize: false,
      entities: [...allDbEntity],
      migrations: ['dist/db/migration/**/*.js'],
    }),
    HrMainModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./env/dev.env', './env/prod.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
