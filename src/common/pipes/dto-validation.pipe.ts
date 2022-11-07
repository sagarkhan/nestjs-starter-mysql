import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  ValidatorOptions,
  ValidationError,
  validateSync,
} from 'class-validator';
interface PipeOptions extends ValidatorOptions {
  arrayOf?: Type<any> | undefined;
}
@Injectable()
export class DtoValidationPipe implements PipeTransform {
  constructor(private validationOptions: PipeOptions = {}) {}
  transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    if (metatype === Array && this.validationOptions.arrayOf) {
      if (!Array.isArray(value)) {
        console.log('Not an Array');
        return value;
      } else {
        const transformedValues = value.map((val) => {
          return plainToClass(this.validationOptions.arrayOf, val);
        });
        const parsedErrors = transformedValues.reduce((errorArray, val, i) => {
          const errors = validateSync(val, this.validationOptions);
          if (errors.length) {
            const reshapedErrors = this.parseErrors(errors);
            const indexedErrors = reshapedErrors.map(
              (error) => `${i}.${error}`,
            );
            errorArray.push(indexedErrors);
          }
          return errorArray;
        }, []);
        if (parsedErrors?.length) {
          throw new BadRequestException(
            parsedErrors,
            'Request validation failed',
          );
        }
        return transformedValues;
      }
    } else {
      const object = plainToClass(metatype, value);
      const errors = validateSync(object, this.validationOptions);
      if (errors?.length > 0) {
        const parsedErrors = this.parseErrors(errors);
        throw new BadRequestException(
          parsedErrors,
          'Request validation failed',
        );
      }
      const cleanedObj = this.removeUndefineds(object);
      return cleanedObj;
    }
  }
  removeUndefineds(value: any) {
    Object.keys(value).forEach((key) => {
      if (value[key] === undefined) {
        delete value[key];
      }
    });
    return value;
  }
  parseErrors(errors: ValidationError[], parent?) {
    const parsedErrors = errors.reduce(
      (prev: ValidationError[], errorDetails: ValidationError) => {
        let constraints = [];
        const propertyName =
          (parent ? parent + '.' : '') + errorDetails.property;
        if (errorDetails.children?.length) {
          constraints = this.parseErrors(errorDetails.children, propertyName);
        } else {
          constraints = Object.values(errorDetails.constraints).map(
            (constraint: string) =>
              constraint.replace(errorDetails.property, propertyName),
          );
        }
        return prev.concat([...constraints]);
      },
      [],
    );
    return parsedErrors;
  }
  private toValidate(metatype: any) {
    const types: any[] = [String, Boolean, Number, Object];
    return !types.includes(metatype);
  }
}
