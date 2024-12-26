# Rabbit MQ + Nest

> Проект: Масштабируемый и отказоустойчивый сервис уведомлений
> Канал подключения: RestAPI service-> api/connect -> RESPONSE { amqpInfo }
> Канал взаимодействия: AMQP

## 1. Отправка PUSH-уведомлений

Реализация NotificationService:

1. [ ]   Генерация сообщения через фабрику NotificationProviderService
2. [ ]   Создание уникальных идентификаторов (requestId, traceId)
3. [ ]   Отправка одиночного сообщения (sendOne)
4. [ ]   Массовая отправка (sendMultiple)

## 2. Отправка EMAIL-уведомлений

1. [ ] Создание exchange типа fanout для массовой рассылки email
2. [ ] Реализация EmailProvider в factory
3. [ ] Настройка очереди для email уведомлений

## 3. Отправка массовых EMAIL-уведомлений

1. [ ] Использование существующего fanout exchange
2. [ ] Реализация batch-обработки в EmailProvider
3. [ ] Настройка очереди для массовых рассылок

## 4. Отправка SMS-уведомлений

1. [ ] Создание exchange типа topic для SMS
2. [ ] Реализация SMSProvider в factory
3. [ ] Настройка маршрутизации по ключам

## 5. Отправка TG-уведомлений

1. [ ] Создание exchange типа direct для Telegram
2. [ ] Реализация TelegramProvider в factory
3. [ ] Настройка прямой маршрутизации
4. [ ] Лимитирование частоты сообщений на основании Telegram API( 48 per sec)
