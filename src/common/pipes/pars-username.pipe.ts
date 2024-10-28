import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ParsUsernamePipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value !== 'string') {
      throw new BadRequestException('Invalid input: Username must be a string');
    }

    if (!/^[a-zA-Z0-9_ ]+$/.test(value)) {
      throw new BadRequestException(
        'Invalid input: Username contains invalid characters',
      );
    }

    return value.replace(/@.*/, '');
  }
}
