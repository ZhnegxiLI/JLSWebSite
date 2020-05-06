import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
    selector: 'app-main',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent {
    headerLayout: 'classic'|'compact';

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public storeService: StoreService
    ) {
        this.route.data.subscribe(data => {
            this.headerLayout = data.headerLayout
            storeService.storeInfo.next(data.initInfo[0]);
            storeService.categoryList.next(data.initInfo[1]);
            storeService.slideList.next(data.initInfo[2]);
            storeService.referenceCategoryList.next(data.initInfo[3].ReferenceCategoryList);
        });
    }
}
