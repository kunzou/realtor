import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from './domain/user';
import { UserService } from './service/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '刘聃，福居温尼伯';
  constructor(
    private userService: UserService,
    public translateService: TranslateService) {
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

  getDisplayLanguageLabel(): any{
    return this.translateService.currentLang === 'en'?"中文":"ENGLISH";
  }
}
