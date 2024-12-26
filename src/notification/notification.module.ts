import {Module} from '@nestjs/common';
import {NotificationService} from './notification.service';
import {NotificationController} from './notification.controller';
import {AmqpModule} from "../amqp/amqp.module";
import {ConfigService} from "@nestjs/config";
import {NotificationProviderService} from "./factory/notification-provider.service";

@Module({
    imports: [AmqpModule],
    controllers: [NotificationController],
    providers: [
        ConfigService,
        NotificationService,
        NotificationProviderService
    ],
    exports: [NotificationService]
})
export class NotificationModule {
}
