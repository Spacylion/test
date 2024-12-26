import {INotification, NotificationSourceType, NotificationType} from "../types/notification.types";

export class EmailNotification implements INotification {
    data: any;
    duedate: number;
    notificationid: number;
    notificationsourcetype: NotificationSourceType;
    notificationtype: NotificationType;
    userid: number;

    constructor(data: INotification) {
        console.debug("Email notification constructor", data);
    }
}
