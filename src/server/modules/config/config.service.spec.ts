import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './index';
import { ConfigModule } from './config.module';

describe('Config service', () => {
    let module: TestingModule;
    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [ConfigModule],
        }).compile();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    it('should be defined', () => {
        expect(ConfigService).toBeDefined();
    });

    it('should not get wrong key', () => {
        const configService = new ConfigService('.env');

        try {
            expect(configService.get('wrong_key')).toEqual(
                'ooops its wrong key!!!!!!!!!!!11',
            );
        } catch (e) {
            expect(e.message).toBe('config error - missing env.wrong_key');
        }
    });

    it('should get', () => {
        const configService = new ConfigService('.env');
        expect(configService.get('DB_TYPE')).toEqual('postgres');
    });

    it('should validate if variable is envoirment', () => {
        const configService = new ConfigService('.env');

        expect(configService.isEnv('dev')).toEqual(true);
    });

    it('should return typeorm config', () => {
        const configService = new ConfigService('./env_test/.env1');
        let getTypeOrmConfigResult = configService.getTypeOrmConfig();

        expect(getTypeOrmConfigResult.cli).toEqual({
            migrationsDir: 'src/migrations',
        });
    });

    it('should return typeorm config with nulls in DB_USERNAME/DB_PASSWORD if DB_AUTH === false', () => {
        const configService = new ConfigService('./env_test/.env1');
        let getTypeOrmConfigResult = configService.getTypeOrmConfig();
        expect(getTypeOrmConfigResult.password).toEqual(null);
        expect(getTypeOrmConfigResult.username).toEqual(null);
    });
});
