import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import * as amqp from "amqplib";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { Types } from "mongoose";

@WebSocketGateway()
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private topicConnections = new Map<string, Set<Socket>>();
  private rabbitMQChannel: amqp.Channel;
  private EXCHANGE = "notifications";

  @WebSocketServer()
  server: Server;

  constructor(private userService: UserService, private jwtService: JwtService) {
    this.setupRabbitMQConsumer();
  }

  async setupRabbitMQConsumer() {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URI);
      this.rabbitMQChannel = await connection.createChannel();

      await this.rabbitMQChannel.assertExchange(this.EXCHANGE, "topic", { durable: false });

      const q = await this.rabbitMQChannel.assertQueue("notifications_queue", { exclusive: true });

      this.rabbitMQChannel.bindQueue(q.queue, this.EXCHANGE, "*");

      this.rabbitMQChannel.consume(
        q.queue,
        (msg) => {
          if (msg) {
            const { fields, content } = msg;
            const topicId = fields.routingKey.split(".").pop();
            const connections = this.topicConnections.get(topicId);
            if (connections) {
              connections.forEach((client) => {
                client.emit("newNotification", content.toString());
              });
            }
          }
        },
        // TODO: Adicionar acknowledgment
        { noAck: true }
      );
    } catch (error) {
      console.error("Error setting up RabbitMQ consumer:", error);
    }
  }

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers.authorization;
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      await this.onSubscribe(client, { userId: payload.sub });
    } catch (error) {
      client._error("Not authorized");
    }
  }

  handleDisconnect(client: Socket) {
    this.topicConnections.forEach((connections) => {
      connections.delete(client);
    });
  }

  @SubscribeMessage("subscribe")
  async onSubscribe(@ConnectedSocket() client: Socket, @MessageBody() data: { userId: string }) {
    const { userId } = data;
    const { subscribed_topics } = await this.userService.getUserById(userId);

    subscribed_topics.forEach((topicId: Types.ObjectId) => {
      const connections = this.topicConnections.get(`${topicId}`) || new Set();
      connections.add(client);
      this.topicConnections.set(`${topicId}`, connections);
    });
  }

  @SubscribeMessage("unsubscribe")
  async onUnsubscribe(@ConnectedSocket() client: Socket, @MessageBody() data: { userId: string }) {
    const { userId } = data;
    const { subscribed_topics } = await this.userService.getUserById(userId);

    subscribed_topics.forEach((topicId: Types.ObjectId) => {
      const connections = this.topicConnections.get(`${topicId}`);
      if (connections) {
        connections.delete(client);
      }
    });
  }
}
