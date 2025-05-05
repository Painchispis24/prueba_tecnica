import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LaravelHashService {
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    const nodeCompatibleHash = hashedPassword.replace(/^\$2y\$/, '$2a$');
    return await bcrypt.compare(password, nodeCompatibleHash);
  }

  async make(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }
}