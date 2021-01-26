import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule, ConfigService } from '../config';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from '../scheduler';
import { StoreModule } from '../domain/store';
import { ItemModule } from '../domain/item';
import { PriceModule } from '../domain/price';
import { ViewModule } from '../view';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: configService.get('DB_TYPE'),
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username:
                        configService.get('DB_AUTH') === 'true'
                            ? configService.get('DB_USERNAME')
                            : null,
                    password:
                        configService.get('DB_AUTH') === 'true'
                            ? configService.get('DB_PASSWORD')
                            : null,
                    database: configService.get('DB_DATABASE'),
                    entities: [__dirname + './../**/**.entity{.ts,.js}'],
                    synchronize: configService.isEnv('dev'),
                    migrationsTableName: 'migrations',
                    migrations: ['src/migrations/*.ts'],
                    cli: {
                        migrationsDir: 'src/migrations',
                    },
                    ssl: configService.isEnv('production'),
                    logging: configService.get('DB_LOGGING'),
                    cache:
                        configService.get('DB_CACHE') === 'true'
                            ? {
                                  duration: configService.get(
                                      'DB_CACHE_MILLIS',
                                  ),
                                  type: configService.get('DB_CACHE_TYPE'),
                                  options: {
                                      host: configService.get('DB_CACHE_HOST'),
                                      port: configService.get('DB_CACHE_PORT'),
                                      user:
                                          configService.get('DB_CACHE_AUTH') ===
                                          'true'
                                              ? configService.get(
                                                    'DB_CACHE_USER',
                                                )
                                              : null,
                                      password:
                                          configService.get('DB_CACHE_AUTH') ===
                                          'true'
                                              ? configService.get(
                                                    'DB_CACHE_PASSWORD',
                                                )
                                              : null,
                                      database: configService.get(
                                          'DB_CACHE_DATABASE',
                                      ),
                                  },
                              }
                            : null,
                } as TypeOrmModuleAsyncOptions;
            },
        }),
        TerminusModule,
        ConfigModule,
        ScheduleModule.forRoot(),
        SchedulerModule,
        StoreModule,
        ItemModule,
        PriceModule,
        ViewModule,
    ],
})
export class AppModule {}
