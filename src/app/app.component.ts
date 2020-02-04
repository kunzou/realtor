import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '刘聃，福居温尼伯';

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'zh']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|zh/) ? browserLang : 'en');
  }

  switchLanguage(): void {
    if(this.translate.currentLang === 'en') {
      this.translate.use('zh');
    } else {
      this.translate.use('en');
    }
  }

  getDisplayLanguageLabel(): any{
    return this.translate.currentLang === 'en'?"中文":"English";
  }
}
