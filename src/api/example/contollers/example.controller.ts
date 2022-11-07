import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DtoValidationPipe } from 'src/common/pipes/dto-validation.pipe';
import { CreateExampleDto } from '../dtos/create-example.dto';
import { ExampleIdDto } from '../dtos/example-id';
import { UpdateExampleDto } from '../dtos/update-example.dto';
import { ExampleService } from '../services/example.service';

@ApiTags('Example')
@ApiBearerAuth()
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @ApiOperation({
    summary: 'Get All Example',
    description: 'This API returns all the example object',
  })
  @Get()
  findAll() {
    return this.exampleService.findAll();
  }

  @ApiOperation({
    summary: 'Create Example',
    description: 'This API creates the example object',
  })
  @ApiBody({ type: CreateExampleDto, required: true })
  @Post()
  create(@Body(new DtoValidationPipe()) payload: CreateExampleDto) {
    return payload;
  }

  @ApiOperation({
    summary: 'Update Example',
    description: 'This API updates the example object',
  })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateExampleDto, required: true })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new DtoValidationPipe()) payload: UpdateExampleDto,
  ) {
    return { id, ...payload };
  }

  @ApiOperation({
    summary: 'Delete Example',
    description: 'This API deletes the example object',
  })
  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  delete(@Param() params: ExampleIdDto) {
    return params.id;
  }
}
