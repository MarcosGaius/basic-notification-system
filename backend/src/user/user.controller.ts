import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  Patch,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
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

  @Patch("/:id/topic/:topicId/subscribe")
  async subscribeUserToTopic(
    @Param("id") id: string,
    @Param("topicId") topicId: string,
    @Req() req
  ): Promise<User> {
    if (req.user.sub !== id) {
      throw new UnauthorizedException("Você não pode inscrever outros usuários");
    }

    return this.userService.subscribeUserToTopic(id, topicId);
  }
}
