// Values that will never be undefined. Eg: Values from .env file of type string | undefined
declare namespace NodeJS {
    export interface ProcessEnv {
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      FACEBOOK_CLIENT_ID: string
      FACEBOOK_CLIENT_SECRET: string
    }
  }