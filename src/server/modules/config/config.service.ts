import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor(filePath: string) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }

    public get(key: string, throwOnMissing = true): string {
        const value = this.envConfig[key];

        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value;
    }

    public isEnv(env: string) {
        return this.envConfig.APP_ENV === env;
    }

    public getTypeOrmConfig() {
        console.log('TYPEORM CONFIG', {
            type: this.get('DB_TYPE'),
            host: this.get('DB_HOST'),
            port: this.get('DB_PORT'),
            name: this.get('DB_NAME'),
            username:
                this.get('DB_AUTH') === 'true' ? this.get('DB_USERNAME') : null,
            password:
                this.get('DB_AUTH') === 'true' ? this.get('DB_PASSWORD') : null,
            database: this.get('DB_DATABASE'),

            entities: [__dirname + './../**/**.entity{.ts,.js}'],

            migrationsTableName: 'migrations',

            migrations: ['src/migrations/*.ts'],

            cli: {
                migrationsDir: 'src/migrations',
            },
            ssl: this.isEnv('production'),
            logging: this.get('DB_LOGGING'),
            cache:
                this.get('DB_CACHE') === 'true'
                    ? {
                          type: this.get('DB_CACHE_TYPE'),
                          options: {
                              host: this.get('DB_CACHE_HOST'),
                              port: this.get('DB_CACHE_PORT'),
                              user:
                                  this.get('DB_CACHE_AUTH') === 'true'
                                      ? this.get('DB_CACHE_USER')
                                      : null,
                              password:
                                  this.get('DB_CACHE_AUTH') === 'true'
                                      ? this.get('DB_CACHE_PASSWORD')
                                      : null,
                              database: this.get('DB_CACHE_DATABASE'),
                          },
                      }
                    : null,
        });
        return {
            type: this.get('DB_TYPE'),
            host: this.get('DB_HOST'),
            port: this.get('DB_PORT'),
            name: this.get('DB_NAME'),
            username:
                this.get('DB_AUTH') === 'true' ? this.get('DB_USERNAME') : null,
            password:
                this.get('DB_AUTH') === 'true' ? this.get('DB_PASSWORD') : null,
            database: this.get('DB_DATABASE'),

            entities: [__dirname + './../**/**.entity{.ts,.js}'],

            migrationsTableName: 'migrations',

            migrations: ['src/migrations/*.ts'],

            cli: {
                migrationsDir: 'src/migrations',
            },
            ssl: this.isEnv('production'),
            logging: this.get('DB_LOGGING'),
            cache:
                this.get('DB_CACHE') === 'true'
                    ? {
                          type: this.get('DB_CACHE_TYPE'),
                          options: {
                              host: this.get('DB_CACHE_HOST'),
                              port: this.get('DB_CACHE_PORT'),
                              user:
                                  this.get('DB_CACHE_AUTH') === 'true'
                                      ? this.get('DB_CACHE_USER')
                                      : null,
                              password:
                                  this.get('DB_CACHE_AUTH') === 'true'
                                      ? this.get('DB_CACHE_PASSWORD')
                                      : null,
                              database: this.get('DB_CACHE_DATABASE'),
                          },
                      }
                    : null,
        };
    }
}
