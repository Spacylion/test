import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {NotificationModule} from './notification/notification.module';
import {AmqpModule} from './amqp/amqp.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        NotificationModule,
        AmqpModule
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {
}
