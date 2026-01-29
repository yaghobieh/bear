/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMBER_API_URL: string;
  readonly VITE_ADMIN_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

