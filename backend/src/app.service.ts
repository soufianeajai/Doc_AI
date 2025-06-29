import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! im soufiane this is database ${typeof process.env.DATABASE_PORT}`;
  }
}
