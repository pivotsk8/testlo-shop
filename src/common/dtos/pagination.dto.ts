import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    // En este caso no estamos transformando la data solo estamos verificando que tiene que ser opcional y positivo
    @IsOptional()
    @IsPositive()
    @Type(() => Number) // Con este decorador transformamos la data 
    limit?: number;


    @IsOptional()
    @IsPositive()
    @Type(() => Number) // Con este decorador transformamos la data 
    offset?: number;
}