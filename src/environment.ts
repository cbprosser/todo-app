type ENVIRONMENT = {
  getFullHostUrl: () => string;
  ssl: boolean;
  host: string;
  port: number;
  api: API_ENVIRONMENT;
};

type API_ENVIRONMENT = {
  getFullHostUrl: () => string;
  ssl: boolean;
  host: string;
  port: number;
};

const env = import.meta.env;

export const environment: ENVIRONMENT = {
  getFullHostUrl() {
    return `http${this.ssl ? 's' : ''}://${this.host}:${this.port}`;
  },
  host: env.VITE_BASE_HOST,
  port: +(env.VITE_BASE_PORT ?? 0),
  ssl: env.VITE_BASE_SSL === 'true' ? true : false,
  api: {
    getFullHostUrl() {
      return `http${this.ssl ? 's' : ''}://${this.host}:${this.port}`;
    },
    host: env.VITE_API_HOST,
    port: +(env.VITE_API_PORT ?? 0),
    ssl: env.VITE_API_SSL === 'true' ? true : false,
  },
};
