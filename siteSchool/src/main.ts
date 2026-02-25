import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import AOS from 'aos';

// ..
AOS.init();


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


  window.addEventListener('scroll', () => {
  document.querySelectorAll('.scroll-animate').forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
});