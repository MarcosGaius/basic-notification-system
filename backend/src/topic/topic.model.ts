import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TopicDocument = Topic & Document;

@Schema()
export class Topic {
  @Prop({ unique: true, required: true })
  name: string;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
