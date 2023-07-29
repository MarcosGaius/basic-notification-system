import { Controller, Get, Post, Body, ValidationPipe, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./user.dto";
import { User } from "./user.model";
import { Public } from "src/auth/auth.decorator";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post()
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<User> {
    return this.userService.getUserById(id);
  }
}
