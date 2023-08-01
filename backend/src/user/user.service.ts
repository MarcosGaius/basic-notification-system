import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "./user.model";
import { CreateUserDto } from "./user.dto";
import { Topic, TopicDocument } from "src/topic/topic.model";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Topic.name) private topicModel: Model<TopicDocument>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { name, email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException("E-mail já cadastrado");
    }

    const user = await this.userModel.create({ name, email, password });

    return user;
  }

  // async getAllUsers(): Promise<User[]> {
  //   return this.userModel.find();
  // }

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async getUserById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id);
  }

  async subscribeUserToTopic(userId: string, topicId: string): Promise<UserDocument> {
    const { subscribed_topics } = await this.userModel.findById(userId).select("subscribed_topics");
    if (subscribed_topics.length && subscribed_topics.some((id) => id.toString() === topicId))
      throw new BadRequestException("Usuário já inscrito no tópico");

    const topic = await this.topicModel.findById(topicId);
    if (!topic) throw new BadRequestException("Tópico não existente");

    await this.topicModel.findByIdAndUpdate(topicId, {
      $addToSet: {
        subscribed_users: new Types.ObjectId(userId),
      },
    });

    return this.userModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          subscribed_topics: new Types.ObjectId(topicId),
        },
      },
      { new: true }
    );
  }

  async getUserNofications(userId: string) {
    const user = await this.userModel.findById(userId).populate("subscribed_topics");

    const subscribedTopics = user.subscribed_topics;

    const messages = await this.topicModel
      .find({ _id: { $in: subscribedTopics } })
      .select("messages")
      .sort("-messages.createdAt");

    return messages;
  }
}
