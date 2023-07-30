import { IsNotEmpty } from "class-validator";

export class CreateTopicDto {
  @IsNotEmpty()
  name: string;
}

export class SendMessageDto {
  @IsNotEmpty()
  message: string;
}
