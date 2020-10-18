import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd, ParamMap } from '@angular/router';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { PageCategoryService } from '../../services/page-category.service';
import { PageCategoryService1 } from '../../services/page-category1.service';
import { Link } from '../../../../shared/interfaces/link';
import { RootService } from '../../../../shared/services/root.service';
import { of, Subject, timer, from } from 'rxjs';
import { debounce, mergeMap, takeUntil, flatMap, tap, switchMap, first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ShopService } from '../../../../shared/api/shop.service';
import { parseFilterValue } from '../../../../shared/helpers/filter';
import { ProductService } from 'src/app/shared/api/product.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-grid',
    templateUrl: './page-category.component.html',
    styleUrls: ['./page-category.component.scss'],
    providers: [
        { provide: PageCategoryService, useClass: PageCategoryService },
        { provide: ShopSidebarService, useClass: ShopSidebarService },
        { provide: PageCategoryService1, useClass: PageCategoryService1 }
    ]
})
export class PageCategoryComponent implements OnDestroy {
    destroy$: Subject<void> = new Subject<void>();

    columns: 3 | 4 | 5 = 3;
    viewMode: 'grid' | 'grid-with-features' | 'list' = 'grid';
    sidebarPosition: 'start' | 'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"
    breadcrumbs: Link[] = [];
    pageHeader: string;

    constructor(
        private root: RootService,
        private router: Router,
        private route: ActivatedRoute,
        private pageService1: PageCategoryService1,
        private productService: ProductService,
        private translateService: TranslateService
    ) {
        this.route.data.subscribe(data => {
            this.breadcrumbs = [
                { label: 'Home', url: this.root.home() },
                { label: 'Shop', url: this.root.shop() },
            ];

            // If categorySlug is undefined then this is a root catalog page.
            if (!this.getCategorySlug()) {
                this.pageHeader = 'Shop';
            } else {
                this.pageHeader = data.category.name;

                this.breadcrumbs = this.breadcrumbs.concat([
                    ...data.category.parents.map(
                        parent => ({ label: parent.name, url: this.root.category(parent) })
                    ),
                    { label: data.category.name, url: this.root.category(data.category) },
                ]);
            }

            /* Set the parameter of the first search */
            // route.queryParams.subscribe(param => {
            //     /* Todo find out a better solution */
            //     var criteria: any = {
            //         Begin: 0,
            //         Step: 12,
            //         Lang: localStorage.getItem('lang')
            //     };
            //     var categoryShortLabel = param.CategoryLabel;
            //     if (categoryShortLabel != null && categoryShortLabel == "MainCategory") {
            //         criteria.MainCategory = param.ReferenceItemId
            //     }
            //     else if (categoryShortLabel != null && categoryShortLabel == "SecondCategory") {
            //         criteria.SecondCategory = param.ReferenceItemId
            //     }

            //     var searchText = param.SearchText;
            //     if(searchText!=null){
            //         criteria.SearchText = searchText;
            //     }

            //     this.pageService1.setOptions(criteria, false);
            // });



            /* Build category page */
            this.columns = 'columns' in data ? data.columns : this.columns;
            this.viewMode = 'viewMode' in data ? data.viewMode : this.viewMode;
            this.sidebarPosition = 'sidebarPosition' in data ? data.sidebarPosition : this.sidebarPosition;
        });


        this.pageService1.optionsChange$.pipe(

            mergeMap(() => {
               // this.updateUrl();
                this.pageService1.setIsLoading(true);

                var criteria = this.pageService1.options;
                criteria.Lang = this.translateService.currentLang || localStorage.getItem('lang');

                return this.productService.AdvancedProductSearchClient(
                    criteria
                ).pipe(
                    takeUntil(this.pageService1.optionsChange$)
                );
            }),
            takeUntil(this.destroy$),
        ).subscribe(list => {

            var formatedData = {
                items: list.List,
                TotalCount: list.TotalCount
            }

            this.pageService1.setList(formatedData);
            //this.pageService1.setIsLoading(false);
        });
    }


    ngOnInit(): void {
        this.route.queryParamMap.subscribe((params: ParamMap) => {
           // this.pageService1.resetAllOptions(false);
            var criteria = this.pageService1.options;


            var categoryShortLabel = params.get('CategoryLabel');
            if (categoryShortLabel != null && categoryShortLabel == "MainCategory") {
                criteria.MainCategory = parseInt(params.get('ReferenceItemId'));
            }
            else if (categoryShortLabel != null && categoryShortLabel == "SecondCategory") {
                criteria.SecondCategory = parseInt(params.get('ReferenceItemId'));
            }
            var searchText = params.get('SearchText');
            if(searchText!=null){
                criteria.SearchText = searchText;
            }

            this.pageService1.setOptions(criteria, true);
        });
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    updateUrl(): void {
        // const tree = this.router.parseUrl(this.router.url);
        // tree.queryParams = this.getQueryParams();
        // this.location.replaceState(tree.toString());
    }

    // getQueryParams(): Params {
    //     const params: Params = {};
    //     const options =  this.pageService.options;
    //     const filterValues = options.filterValues;

    //     if ('page' in options && options.page !== 1) {
    //         params.page = options.page;
    //     }
    //     if ('limit' in options && options.limit !== 12) {
    //         params.limit = options.limit;
    //     }
    //     if ('sort' in options && options.sort !== 'default') {
    //         params.sort = options.sort;
    //     }
    //     if ('filterValues' in options) {
    //         this.pageService.filters.forEach(filter => {
    //             if (!(filter.slug in filterValues)) {
    //                 return;
    //             }

    //             const filterValue: any = parseFilterValue(filter.type as any, filterValues[filter.slug]);

    //             switch (filter.type) {
    //                 case 'range':
    //                     if (filter.min !== filterValue[0] || filter.max !== filterValue[1]) {
    //                         params[`filter_${filter.slug}`] = `${filterValue[0]}-${filterValue[1]}`;
    //                     }
    //                     break;
    //                 case 'check':
    //                 case 'color':
    //                     if (filterValue.length > 0) {
    //                         params[`filter_${filter.slug}`] = filterValues[filter.slug];
    //                     }
    //                     break;
    //                 case 'radio':
    //                     if (filterValue !== filter.items[0].slug) {
    //                         params[`filter_${filter.slug}`] = filterValue;
    //                     }
    //                     break;
    //             }
    //         });
    //     }

    //     return params;
    // }

    getCategorySlug(): string | null {
        return this.route.snapshot.params.categorySlug || this.route.snapshot.data.categorySlug || null;
    }
}
