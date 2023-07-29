import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { CreateTopicDto } from "./topic.dto";
import { TopicService } from "./topic.service";

@Controller("topic")
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Post()
  createTopic(@Body(ValidationPipe) createTopicDto: CreateTopicDto): Promise<any> {
    return this.topicService.createTopic(createTopicDto);
  }
}
