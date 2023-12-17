/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_ENV?: 'prod' | 'stage' | 'dev' | 'local';
    readonly PORT: string;
    readonly NEXT_PUBLIC_SERVICE_HOSTNAME: string;
    readonly GRAPHQL_SERVER: string;
  }
}
