import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(email: string, pwd: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user || !(await user.comparePassword(pwd))) {
      throw new UnauthorizedException("Credentials do not match");
    }

    const payload = { sub: user._id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: "7200s",
      }),
      user,
    };
  }
}
