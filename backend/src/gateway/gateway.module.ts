import { Module } from "@nestjs/common";
import { NotificationsGateway } from "./gateway";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [UserModule],
  providers: [NotificationsGateway],
})
export class GatewayModule {}
