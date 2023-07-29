import { Body, Controller, Post, HttpCode, HttpStatus, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./auth.dto";
import { Public } from "./auth.decorator";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
