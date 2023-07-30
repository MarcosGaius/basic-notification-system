import { Module } from "@nestjs/common";
import { TopicController } from "./topic.controller";
import { TopicService } from "./topic.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Topic, TopicSchema } from "./topic.model";
import { User, UserSchema } from "src/user/user.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
