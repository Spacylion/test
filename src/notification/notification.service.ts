import {Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import {AmqpService} from '../amqp/amqp.service';
import {v4 as uuid} from 'uuid';
import {INotification} from "./types/notification.types";
import {NotificationProviderService} from "./factory/notification-provider.service";

@Injectable()
export class NotificationService implements OnModuleInit, OnModuleDestroy {
    constructor(
        private readonly amqpService: AmqpService,
        private readonly notificationProvider: NotificationProviderService,
    ) {
    }

    async onModuleInit() {
        await this.amqpService.connect();
    }

    async onModuleDestroy() {
        await this.amqpService.disconnect();
    }

    async sendOne(data: INotification) {
        const notification = this.notificationProvider.createNotification(
            data.notificationsourcetype,
            data
        );

        const message = {
            requestId: uuid(),
            traceId: uuid(),
            object: 'notification',
            event: 'send',
            body: notification
        };

        await this.amqpService.publish(
            'notifications.exchange',
            `notification.${data.notificationtype}.${data.notificationsourcetype}`,
            message
        );
    }

    async sendMultiple(notifications: INotification[]) {
        const message = {
            requestId: uuid(),
            traceId: uuid(),
            object: 'notification',
            event: 'send_batch',
            batch: true,
            body: notifications.map(n =>
                this.notificationProvider.createNotification(
                    n.notificationsourcetype,
                    n
                )
            )
        };

        await this.amqpService.publish(
            'notifications.exchange',
            'notification.batch',
            message
        );
    }
}
