import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/main';
import { ConfigService } from './modules/config';
import { join } from 'path';
import 'reflect-metadata';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // register `.tsx` as a view template engine
    // await register(app);

    const configService: ConfigService = app.get(ConfigService);

    // setupSwagger(app);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.useStaticAssets(join(__dirname, '..', 'public'));
    // app.setBaseViewsDir(join(__dirname, 'views'));
    // app.setViewEngine('hbs');

    await app.listen(configService.get('APP_PORT') || 3000);
}

bootstrap();
