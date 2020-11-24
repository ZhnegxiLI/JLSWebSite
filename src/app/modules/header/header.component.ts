import { Component, Input } from '@angular/core';
import { StoreService } from '../../shared/services/store.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() layout: 'classic'|'compact' = 'classic';

    constructor(public store: StoreService) { }

    helpWindow(event) { 
        window.open('chat', '_blank', 'location=yes,height=570,width=600,scrollbars=yes,status=yes'); 
    } 
}
