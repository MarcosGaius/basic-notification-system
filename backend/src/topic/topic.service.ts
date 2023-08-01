import {
  BadRequestException,
  NotFoundException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Topic, TopicDocument } from "./topic.model";
import { CreateTopicDto, SendMessageDto } from "./topic.dto";
import { Model } from "mongoose";
import * as amqp from "amqplib";
import { User, UserDocument } from "src/user/user.model";

@Injectable()
export class TopicService {
  private rabbitMQChannel: amqp.Channel;
  private EXCHANGE = "notifications";

  constructor(
    @InjectModel(Topic.name) private topicModel: Model<TopicDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {
    amqp
      .connect(process.env.RABBITMQ_URI)
      .then(async (connection) => {
        this.rabbitMQChannel = await connection.createChannel();
      })
      .catch((error) => {
        console.error("Error connecting to RabbitMQ", error);
      });
  }

  async createTopic(createTopicDto: CreateTopicDto): Promise<Topic> {
    let { name } = createTopicDto;
    name = name.toLowerCase();

    const isNameTaken = await this.topicModel.findOne({ name });

    if (isNameTaken) {
      throw new BadRequestException("Tópico já existente");
    }

    return this.topicModel.create({ name });
  }

  async sendNotification(
    sendMessageDto: SendMessageDto,
    topicId: string,
    userId: string
  ): Promise<TopicDocument> {
    const { message } = sendMessageDto;

    const topic = await this.topicModel.findById(topicId);
    if (!topic) throw new NotFoundException("Tópico não encontrado");

    let sender = await this.userModel.findById(userId);

    if (!sender) throw new UnauthorizedException("Usuário não identificado.");

    sender = sender.toJSON();

    if (!sender.subscribed_topics.some((topic) => topic._id.toString() === topicId))
      throw new BadRequestException(
        "Você não pode enviar notificações para tópicos que não está inscrito"
      );

    const newMessage = { sender: sender, content: message, createdAt: new Date() };

    await this.rabbitMQChannel.assertExchange(this.EXCHANGE, "topic", { durable: false });
    this.rabbitMQChannel.publish(
      this.EXCHANGE,
      topicId,
      Buffer.from(JSON.stringify({ ...newMessage, sender: { name: newMessage.sender.name } }))
    );

    return this.topicModel.findByIdAndUpdate(
      topicId,
      { $addToSet: { messages: newMessage } },
      { new: true }
    );
  }

  async listAllTopics(): Promise<TopicDocument[]> {
    return this.topicModel.find().select("name");
  }
}
