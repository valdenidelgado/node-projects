import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken);
  await dataSource.synchronize(true);

  const productRepo = dataSource.getRepository('Product');
  await productRepo.save({
    id: '2fe5e3e3-3b3e-4f3d-8f3e-3e3e3e3e3e3e',
    name: 'Product 1',
    description: 'Description 1',
    price: 100,
    image_url: 'https://via.placeholder.com/150',
  });

  await app.close();
}
bootstrap();
