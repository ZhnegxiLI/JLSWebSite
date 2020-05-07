import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DirectionService } from '../../../shared/services/direction.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    ColorFilter,
    ColorFilterItem,
    Filter,
    SerializedFilterValues,
    CheckFilter,
    FilterItem, RadioFilter
} from '../../../shared/interfaces/filter';
import { RootService } from '../../../shared/services/root.service';
import { Subject } from 'rxjs';
import { PageCategoryService } from '../../shop/services/page-category.service';
import { map, takeUntil } from 'rxjs/operators';
import { PageCategoryService1 } from '../../shop/services/page-category1.service';
import { StoreService } from 'src/app/shared/services/store.service';

interface FormFilterValues {
    [filterSlug: string]: [number, number] | { [itemSlug: string]: boolean } | string;
}

@Component({
    selector: 'app-widget-filters',
    templateUrl: './widget-filters.component.html',
    styleUrls: ['./widget-filters.component.scss']
})
export class WidgetFiltersComponent implements OnInit, OnDestroy {
    @Input() offcanvas: 'always' | 'mobile' = 'mobile';

    destroy$: Subject<void> = new Subject<void>();

   

    priceInterval = {
        minValue: 0,
        maxValue: 2000
    }
    minQuantity: number = 200;

    filters: any[] = [];
    filtersForm: FormGroup;
    isPlatformBrowser = isPlatformBrowser(this.platformId);
    rightToLeft = false;
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private direction: DirectionService,
        private fb: FormBuilder,
        public root: RootService,
        public pageCategory: PageCategoryService,
        public pageCategory1: PageCategoryService1,
        public storeService: StoreService
    ) {
        this.rightToLeft = this.direction.isRTL();
    }

    ngOnInit(): void {
        /* todo Bind the filter change */
        // this.pageCategory.list$.pipe(
        //     map(x => x.filters),
        //     takeUntil(this.destroy$),
        // ).subscribe(filters => {
        //     this.filters = filters;
        //     this.filtersForm = this.makeFiltersForm(filters);


        // });


        this.storeService.categoryList.subscribe(result => {
            this.filters.push({
                name: 'Catégories',
                type: 'categories',
                items: result
            });
            this.filters.push({
                name: 'Prix',
                type: 'doubleRange',
                min: 0,
                max: 2000
            });
            this.filters.push({
                name: 'MinQuantity',
                type: 'singleRange',
                min: 0,
                max: 200
            })
        });

        /* TODO Bind the form change*/
        // this.filtersForm.valueChanges.subscribe(formValues => {
        //     // this.pageCategory.updateOptions({
        //     //     filterValues: this.convertFormToFilterValues(filters, formValues)
        //     // });
        // });
    }


    filterValueChange() {
        var options = this.pageCategory1.options;
        options.PriceIntervalLower = this.priceInterval.minValue;
        options.PriceIntervalUpper = this.priceInterval.maxValue;
        options.MinQuantity = this.minQuantity;

        this.pageCategory1.setOptions(options);
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    trackBySlug(index: number, item: { slug: string }): any {
        return item.slug;
    }

    isItemDisabled(filter: CheckFilter | RadioFilter | ColorFilter, item: FilterItem | ColorFilterItem): boolean {
        return item.count === 0 && (filter.type === 'radio' || !filter.value.includes(item.slug));
    }



    reset(): void {
        this.priceInterval = {
            minValue: 0,
            maxValue: 2000
        }
        this.minQuantity = 200;

        this.pageCategory1.resetPartialOptions(true);
    }
}
