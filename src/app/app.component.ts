import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '刘聃，福居温尼伯';
  constructor(
    public translateService: TranslateService,
    public auth: AuthService,
    private router: Router
  ) {
    auth.handleAuthentication();
    translateService.addLangs(['en', 'zh']);
    translateService.setDefaultLang('zh');
    translateService.use('zh');
  }
  
  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
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
