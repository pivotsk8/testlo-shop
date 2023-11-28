import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  constructor(
    //ayuda para la comunicacion con la base de datos
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>

  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      //en esta linea solo esta creando el producto mas no lo esta guardando en la BD(crea una instancia del producto)
      const product = this.productRepository.create(createProductDto);

      //Aqui si estoy guardando esa instancia en la BD
      await this.productRepository.save(product);

      return product;

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException("ayuda");
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
