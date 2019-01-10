import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import Eureka from 'eureka-js-client';

// TODO(KeloskY) discovery service is https - cheet for now
const key = 'NODE_TLS_REJECT_UNAUTHORIZED';
process.env[key] = '0';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);
  app.use('/swagger', (req, res, next) => res.send(document));
  app.use('/info', (req, res, next) => res.send({}));

  const client = new Eureka({
    requestMiddleware: (req, done) => {
      // console.log(req)
      // req.baseUrl = 'https://eureka:password@localhost:10011/eureka/apps',
      done(req);
    },
  });
  client.start();

  await app.listen(3002);
  // await app.listen(3001, '192.168.11.1');
}
bootstrap();
