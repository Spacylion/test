import * as Joi from "joi";

export interface IConfigService {
    readonly api: string;
}

export class ConfigService {
    private readonly config: IConfigService;

    constructor() {
        this.validateConfig();
        this.config = environment;
    }

    private validateConfig(): void {
        const schema = Joi.object({
            api: Joi.string().uri().required()
        });

        const {error} = schema.validate(environment);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
    }

    get apiUrl(): string {
        return this.config.api;
    }
}
