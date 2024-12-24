export interface RestSources extends Record<string, any> {
    //
}

export const API_CONFIG = {
    ws: {
        endpoints: {
            users: '/users'
        }
    },
    rest: {
        endpoints: {
            auth: '/auth',
            info: '/info'
        }
    }
} as const;
