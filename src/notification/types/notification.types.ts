export enum NotificationType {
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
}

export enum NotificationSourceType {
    PUSH = 'PUSH',
    EMAIL = 'EMAIL',
    SMS = 'SMS',
    TELEGRAM = 'TELEGRAM'
}

export interface INotification {
    notificationid: number;
    notificationtype: NotificationType;
    notificationsourcetype: NotificationSourceType;
    userid: number;
    duedate: number;
    data: any;
}
