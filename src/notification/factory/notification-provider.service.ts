import {Injectable} from "@nestjs/common";
import {INotification, NotificationSourceType} from "../types/notification.types";
import {EmailNotification} from "../providers/email.notification";
import {PushNotification} from "../providers/push.notification";
import {SMSNotification} from "../providers/sms.notification";
import {TelegramNotification} from "../providers/telegram.notification";


@Injectable()
export class NotificationProviderService {
    createNotification(type: NotificationSourceType, data: INotification) {
        switch (type) {
            case NotificationSourceType.PUSH:
                return new PushNotification(data);
            case NotificationSourceType.EMAIL:
                return new EmailNotification(data);
            case NotificationSourceType.SMS:
                return new SMSNotification(data);
            case NotificationSourceType.TELEGRAM:
                return new TelegramNotification(data);
        }
    }
}
