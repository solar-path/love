import { Injectable } from '@nestjs/common';
@Injectable()
export class ProcessService {
  create() {
    return 'This action adds a new sox';
  }

  findAll() {
    return `This action returns all sox`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sox`;
  }

  update(id: string) {
    return `This action updates a #${id} sox`;
  }

  remove(id: number) {
    return `This action removes a #${id} sox`;
  }
}
