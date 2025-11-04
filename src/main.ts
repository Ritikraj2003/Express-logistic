import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

console.log('=== MAIN.TS: Starting Angular Bootstrap ===');
console.log('Hello World from main.ts!');

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    console.log('=== Angular Bootstrap Successful ===');
    console.log('Hello World - App is running!');
  })
  .catch(err => {
    console.error('=== BOOTSTRAP ERROR ===');
    console.error('Hello World - ERROR:', err);
    alert('Bootstrap Error: ' + err.message);
  });

