import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateExampleDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  last_name: string;
}
