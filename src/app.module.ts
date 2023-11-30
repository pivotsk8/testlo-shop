import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // para que tome las variables de entorno
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      // ayuda a que si hay cambios en la bd de datos por ejemplo si se borra una colomna,
      // con el synchronize se hacen el cambio en tiempo real
      // en prod no se una el synchronize no se usa en true
      synchronize: true,
    }),

    ProductsModule,

    CommonModule
  ],
})
export class AppModule { }
