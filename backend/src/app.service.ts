import { Injectable } from "@nestjs/common";
import { Public } from "./auth/auth.decorator";

@Injectable()
export class AppService {
  @Public()
  getHello(): string {
    return "Hello World!";
  }
}
