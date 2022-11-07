import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class ExampleIdDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
