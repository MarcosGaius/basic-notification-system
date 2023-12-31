import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, now } from "mongoose";
import * as bcrypt from "bcrypt";

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.password;
    },
  },
})
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: [], ref: "Topic" })
  subscribed_topics: Types.ObjectId[];

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  async comparePassword(pwdToCompare: string): Promise<boolean> {
    return bcrypt.compare(pwdToCompare, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre("save", async function (next) {
  const user = this as UserDocument;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

UserSchema.pre("save", async function (next) {
  const user = this as UserDocument;
  if (user.isModified()) {
    user.updatedAt = new Date();
  }
  next();
});

UserSchema.method("comparePassword", async function (pwdToCompare: string): Promise<boolean> {
  return bcrypt.compare(pwdToCompare, this.password);
});
