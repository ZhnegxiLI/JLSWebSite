import { Component } from '@angular/core';

@Component({
    selector: 'app-header-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {

    public searchText: string;
    constructor() { }
}
