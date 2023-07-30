import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, now, Document } from "mongoose";
import { User } from "src/user/user.model";

export type TopicDocument = Topic & Document;

@Schema()
class Message {
  @Prop()
  sender: User;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  content: string;
}

@Schema()
export class Topic {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ default: [] })
  subscribed_users: Types.ObjectId[];

  @Prop()
  messages: Message[];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);

TopicSchema.pre("save", async function (next) {
  const topic = this as TopicDocument;
  if (topic.isModified()) {
    topic.updatedAt = new Date();
  }
  next();
});
