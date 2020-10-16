import { Component, Input, OnInit } from '@angular/core';
import { ProductFeaturesSection, ProductDetail1 } from '../../../../shared/interfaces/product';
import { Review } from '../../../../shared/interfaces/review';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent implements OnInit {

    hideRatingModule = environment.hideRatingModule;
    
    private dataProduct: ProductDetail1;

    @Input() withSidebar = false;
    @Input() tab: 'description' | 'specification' | 'reviews' = 'description';

    @Input() product;

    constructor(public translateService: TranslateService) {
    }

    ngOnInit(): void {
    }

    getInformationList() {
        let list = [];
        Object.keys(this.product).map(key => {
            switch (key) {
                case 'Color':
                    list.push({
                        Label : this.translateService.instant('product.Color'),
                        Value: this.product[key]
                    });
                    break;
                case 'Material':
                    list.push({
                        Label : this.translateService.instant('product.Material'),
                        Value: this.product[key]
                    });
                    break;
                // case 'MinQuantity':
                //     list.push({
                //         Label : this.translateService.instant('product.minimumachats'),
                //         Value: this.product[key]
                //     });
                //     break;
                case 'QuantityPerBox':
                    list.push({
                        Label : this.translateService.instant('product.QuantityPerBox'),
                        Value: this.product[key]
                    });
                    break;
                case 'ReferenceCode':
                    list.push({
                        Label : this.translateService.instant('product.reference'),
                        Value: this.product[key]
                    });
                    break;
                case 'Size':
                    list.push({
                        Label : this.translateService.instant('product.Size'),
                        Value: this.product[key]
                    });
                    break;
            }
        });
        return list;
    }
}
