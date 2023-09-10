import { Module } from '@nestjs/common';
import { EmailConfigModule } from './core/email/email-config/email-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { allDbEntity } from './db/DbEntity';
import { HrMainModule } from './modules/hr-main-module.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
