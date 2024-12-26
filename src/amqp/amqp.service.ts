import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import * as amqplib from 'amqplib';
import {Buffer} from 'buffer';

export enum Queues {
    PUSH = 'push',
    EMAIL = 'email',
    SMS = 'sms',
    TELEGRAM = 'telegram',
}

@Injectable()
export class AmqpService {
    private connection: amqplib.Connection;
    private channel: amqplib.Channel;

    constructor(private configService: ConfigService) {
    }

    async connect() {
        try {
            this.connection = await amqplib.connect(this.configService.get<string>('CLOUDAMQP_URL'));
            this.channel = await this.connection.createChannel();

            await this.channel.assertExchange('notifications.exchange', 'topic', {
                durable: true,
                autoDelete: false
            });

            const queues = [Queues];

            for (const queue of queues) {
                const queueName = `notifications.${queue}`;
                await this.channel.assertQueue(queueName, {
                    durable: true
                });

                await this.channel.bindQueue(
                    queueName,
                    'notifications.exchange',
                    `notification.*.${queue}`
                );
            }
        } catch (error) {
            throw new Error(`Failed to connect to RabbitMQ: ${error.message}`);
        }
    }

    async disconnect() {
        try {
            await this.channel?.close();
            await this.connection?.close();
        } catch (error) {
            throw new Error(`Failed to disconnect from RabbitMQ: ${error.message}`);
        }
    }

    async publish(exchange: string, routingKey: string, message: any) {
        try {
            return this.channel.publish(
                exchange,
                routingKey,
                Buffer.from(JSON.stringify(message)),
                {
                    persistent: true,
                    messageId: message.requestId,
                    correlationId: message.traceId
                }
            );
        } catch (error) {
            throw new Error(`Failed to publish message: ${error.message}`);
        }
    }
}
