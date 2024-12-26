import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'NOTIFICATION_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.CLOUDAMQP_URL],
                    queue: 'queueName',
                    queueOptions: {
                        durable: false
                    },
                    noAck: false,
                    prefetchCount: 1
                }
            }
        ])
    ],
    exports: [ClientsModule]
})
export class AmqpModule {
}
