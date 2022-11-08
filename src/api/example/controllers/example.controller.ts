import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import {
  LoggedInUser,
  RequestUser,
} from '../../../common/decorators/request-user.decorator';
import { CreateExampleDto } from '../dtos/create-example.dto';
import { ExampleIdDto } from '../dtos/example-id';
import { UpdateExampleDto } from '../dtos/update-example.dto';
import { ExampleCoreService } from '../services/example.core.service';

@ApiTags('Example')
@ApiBearerAuth()
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleCoreService: ExampleCoreService) {}

  @ApiOperation({
    summary: 'Get Example by id',
    description: 'This API returns the example object',
  })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.exampleCoreService.findById(Number(id));
  }

  @ApiOperation({
    summary: 'Get All Example',
    description: 'This API returns all the example object',
  })
  @Get()
  findAll() {
    return this.exampleCoreService.findAll();
  }

  @ApiOperation({
    summary: 'Create Example',
    description: 'This API creates the example object',
  })
  @ApiBody({ type: CreateExampleDto, required: true })
  @Post()
  create(
    @Body(new DtoValidationPipe()) payload: CreateExampleDto,
    @RequestUser() user: LoggedInUser,
  ) {
    return this.exampleCoreService.create(payload, user.id);
  }

  @ApiOperation({
    summary: 'Update Example',
    description: 'This API updates the example object',
  })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateExampleDto, required: true })
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body(new DtoValidationPipe()) payload: UpdateExampleDto,
    @RequestUser() user: LoggedInUser,
  ) {
    await this.exampleCoreService.updateById(Number(id), payload, user.id);
  }

  @ApiOperation({
    summary: 'Delete Example',
    description: 'This API deletes the example object',
  })
  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param() params: ExampleIdDto,
    @RequestUser() user: LoggedInUser,
  ) {
    await this.exampleCoreService.deleteById(Number(params.id), {
      deleted_by: user.id,
    });
  }
}
