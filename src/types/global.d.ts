/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_HOST: string;
  readonly VITE_BASE_PORT: string;
  readonly VITE_BASE_SSL: string;
  readonly VITE_API_PORT: string;
  readonly VITE_API_HOST: string;
  readonly VITE_API_SSL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
