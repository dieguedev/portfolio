/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly WEB3FORMS_ACCESS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
