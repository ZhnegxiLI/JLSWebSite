import { Component } from '@angular/core';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
    languages = [
        {name: 'English', image: 'united-states', code:'en'},
        {name: 'Français',  image: 'france', code:'fr'},
        {name: '中文',  image: 'china', code:'cn'}
    ];

    currencies = [
        {name: '€ Euro',           url: '', code: 'EUR', symbol: '€'}
    ];

    constructor(
        public currencyService: CurrencyService,
        public translateService: TranslateService
    ) { }

    setCurrency(currency): void {
        this.currencyService.options = {
            code: currency.code,
            display: currency.symbol,
        };
    }

    setLanguage(language): void {
        localStorage.setItem('lang',language.code);
        this.translateService.currentLang = language.code;
        this.translateService.setDefaultLang(language.code);
    }
}
