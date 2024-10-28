import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ParsEmailePipe implements PipeTransform {
  transform(value: string) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Invalid input: Email must be a string');
    }

    // تعبير منتظم للتحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      throw new BadRequestException('Invalid input: Email is not valid');
    }
    return value;
  }
}
