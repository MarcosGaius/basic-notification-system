import { Module } from "@nestjs/common";
import { TopicController } from "./topic.controller";
import { TopicService } from "./topic.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Topic, TopicSchema } from "./topic.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }])],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
