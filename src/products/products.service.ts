import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto
    try {
      const products = await this.productRepository.find({
        take: limit,
        skip: offset,
      })
      return products
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async findOne(id: string): Promise<any> {
    try {

      const product = await this.productRepository.findOneBy({ id })
      if (!product) throw new NotFoundException(`Product with id ${id} not found`)
      return product

    } catch (error) {
      console.log(error)
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    await this.productRepository.remove(product)
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
