import {Body, Controller, Post} from "@nestjs/common";
import {NotificationService} from "./notification.service";
import {ConfigService} from "@nestjs/config";

@Controller('notifications')
export class NotificationController {
    private readonly cloudAMQPUrl: string;

    constructor(
        private readonly notificationService: NotificationService,
        private readonly configService: ConfigService
    ) {
        this.cloudAMQPUrl = this.configService.get<string>('blockchain.birdeye.baseUrl');

    }

    @Post('send')
    async sendNotification(@Body() notification: Notification) {
        return await this.notificationService.sendOne(notification);
    }

    @Post('send-batch')
    async sendBatchNotifications(@Body() notifications: Notification[]) {
        return await this.notificationService.sendMultiple(notifications);
    }

    @Post('connect')
    async getAmqpInfo() {
        return {
            amqpInfo: {
                url: `${this.cloudAMQPUrl}`,
                exchange: 'notifications.exchange',
                queues: {
                    push: 'notifications.push',
                    email: 'notifications.email',
                    sms: 'notifications.sms',
                    telegram: 'notifications.telegram'
                }
            }
        };
    }
}
