import { Body, Req, Param, Controller, Post, ValidationPipe } from "@nestjs/common";
import { CreateTopicDto, SendMessageDto } from "./topic.dto";
import { TopicService } from "./topic.service";
import { Topic } from "./topic.model";

@Controller("topic")
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Post()
  createTopic(@Body(ValidationPipe) createTopicDto: CreateTopicDto): Promise<Topic> {
    return this.topicService.createTopic(createTopicDto);
  }

  @Post(":id/notification")
  // sendNotification(@Body(ValidationPipe) sendMessageDto: SendMessageDto): Promise<Topic> {}
  sendNotification(
    @Body(ValidationPipe) sendMessageDto: SendMessageDto,
    @Param("id") topicId: string,
    @Req() req
  ): Promise<Topic> {
    return this.topicService.sendNotification(sendMessageDto, topicId, req.user.sub);
  }
}
