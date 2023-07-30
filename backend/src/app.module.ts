import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { AuthGuard } from "./auth/auth.guard";
import { TopicModule } from "./topic/topic.module";
import { GatewayModule } from "./gateway/gateway.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: process.env.MONGO_URI,
        };
      },
    }),
    GatewayModule,
    AuthModule,
    UserModule,
    TopicModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: "APP_GUARD", useClass: AuthGuard }],
})
export class AppModule {}
