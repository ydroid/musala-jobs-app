// `.env.ts` is generated by the `npm run env` command
// `npm run env` exposes environment variables as JSON for any usage you might
// want, like displaying the version or getting extra config from your CI bot, etc.
// This is useful for granularity you might need beyond just the environment.
// Note that as usual, any environment variables you expose through it will end up in your
// bundle, and you should not use it for any sensitive information like passwords or keys.
import { env } from './.env';

export const environment = {
  production: true,
  hmr: false,
  version: env.npm_package_version,
  serverUrl: 'https://musala-jobs.herokuapp.com/api/',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'fr-FR'],
  firebaseConfig: {
    apiKey: 'AIzaSyB9zr_u7hMnJ3f572C5r2UNsc8u6nvcRLY',
    authDomain: 'musala-52db9.firebaseapp.com',
    databaseURL: 'https://musala-52db9.firebaseio.com',
    projectId: 'musala-52db9',
    storageBucket: 'gs://musala-52db9.appspot.com',
    messagingSenderId: '532074365571',
    appId: '1:532074365571:web:e3599b72b868ca02a691b6',
    measurementId: 'G-BHEJ5QKG4P'
  }
};
