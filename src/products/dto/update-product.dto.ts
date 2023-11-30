import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

//Expande todas la propiedades de CreateProductDto y las hace opcionales 
export class UpdateProductDto extends PartialType(CreateProductDto) { }
