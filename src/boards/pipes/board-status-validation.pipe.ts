import { BoardStatus } from './../boards.model';
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  private isStatusValid(status: any) {
    return this.StatusOptions.indexOf(status) !== -1;
  }

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(
        `${value} 는 적합하지 않은 status 옵션입니다`,
      );
    }
    return value;
  }
}
