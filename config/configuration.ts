import * as Joi from 'joi';
import * as process from 'node:process';
import * as dotenv from 'dotenv';
import {join} from 'path';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({path: join(__dirname, '..', envFile)});
export default () => {
    const cloudAMQPUrl = process.env.CLOUDAMQP_URL;
    return {
        amqp: {
            url: cloudAMQPUrl,
        },
    }
};
export const configurationValidationSchema = Joi.object({
    amqp: Joi.object({
        url: Joi.string().required(),
    }),
    CLOUDAMQP_URL: Joi.string().required(),
});
