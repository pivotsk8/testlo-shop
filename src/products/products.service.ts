import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  // Creacion de losg personalizados mas claros como los logs de nest
  private readonly logger = new Logger('ProductsService')

  constructor(
    //ayuda para la comunicacion con la base de datos
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>

  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      //Es un codigo grnade y redundante se puede crear un metodo ver Products.entity para entender la mejora 

      // if (!createProductDto.slug) {
      //   createProductDto.slug = createProductDto.title
      //     .toLowerCase()
      //     .replaceAll(' ', '_')
      //     .replaceAll("'", '')
      // } else {
      //   createProductDto.slug = createProductDto.slug
      //     .toLowerCase()
      //     .replaceAll(' ', '_')
      //     .replaceAll("'", '')
      // }

      //en esta linea solo esta creando el producto mas no lo esta guardando en la BD(crea una instancia del producto)
      const product = this.productRepository.create(createProductDto);

      //Aqui si estoy guardando esa instancia en la BD
      await this.productRepository.save(product);

      return product;

    } catch (error) {
      this.handleDBExceptions(error)
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

  private handleDBExceptions(error: any) {
    // Este if sale para validar error y dar un mejor detalle se saco viendo el console.log normal
    if (error.code === '23505') throw new InternalServerErrorException(error.detail);
    this.logger.error(error)

    // este es el console.log que se vio para poder ternee mas detalles y personalizar los logs
    // console.log(error)
    throw new InternalServerErrorException("Unexpected error, check server logs");
  }
}
