import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  create(createProductDto: CreateProductDto) {
    const product = this.repo.create(createProductDto);
    return this.repo.save(product);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: {
        id,
      },
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.repo.update({ id }, updateProductDto);
  }

  remove(id: string) {
    return this.repo.delete({ id });
  }
}
