import { Description } from '../domain/description';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Pipe({ name: 'description', pure: false })
export class DescriptionPipe implements PipeTransform {

    constructor(
        private translateService: TranslateService
    ) { }

    transform(description: Description): string {
        return this.translateService.currentLang === 'zh' ? description.chinese : description.english;
    }
}
