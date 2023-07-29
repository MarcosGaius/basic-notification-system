import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Topic, TopicDocument } from "./topic.model";
import { CreateTopicDto } from "./topic.dto";
import { Model } from "mongoose";

@Injectable()
export class TopicService {
  constructor(@InjectModel(Topic.name) private topicModel: Model<TopicDocument>) {}

  async createTopic(createTopicDto: CreateTopicDto): Promise<Topic> {
    let { name } = createTopicDto;
    name = name.toLowerCase();

    const isNameTaken = await this.topicModel.findOne({ name });

    if (isNameTaken) {
      throw new BadRequestException("Tópico já existente");
    }

    return this.topicModel.create({ name });
  }
}
