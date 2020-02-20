import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '刘聃，福居温尼伯';
  constructor(
    public translateService: TranslateService,
    public auth: AuthService,
  ) {
    auth.handleAuthentication();
    translateService.addLangs(['en', 'zh']);
    translateService.setDefaultLang('zh');
    translateService.use('zh');
  }

  switchLanguage(): void {
    if(this.translateService.currentLang === 'en') {
      this.translateService.use('zh');
    } else {
      this.translateService.use('en');
    }
  }

  getDisplayLanguageLabel(): any {
    return this.translateService.currentLang === 'en'?"中文":"ENGLISH";
  }
}
