import {INotification, NotificationSourceType, NotificationType} from "../types/notification.types";
import * as console from "console";

export class PushNotification implements INotification {
    data: any;
    duedate: number;
    notificationid: number;
    notificationsourcetype: NotificationSourceType;
    notificationtype: NotificationType;
    userid: number;

    constructor(data: INotification) {
        console.debug("Push Notification Data", data);
    }


}

