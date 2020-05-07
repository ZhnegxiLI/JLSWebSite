import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { PageCategoryService } from '../../services/page-category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PageCategoryService1 } from '../../services/page-category1.service';

export type Layout = 'grid' | 'grid-with-features' | 'list';

@Component({
    selector: 'app-products-view',
    templateUrl: './products-view.component.html',
    styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit, OnDestroy {
    @Input() layout: Layout = 'grid';
    @Input() grid: 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full' = 'grid-3-sidebar';
    @Input() offcanvas: 'always' | 'mobile' = 'mobile';

    destroy$: Subject<void> = new Subject<void>();

    listOptionsForm: FormGroup;
    filtersCount = 0;

    constructor(
        private fb: FormBuilder,
        public sidebar: ShopSidebarService,
        public pageService: PageCategoryService,
        public pageService1: PageCategoryService1
    ) { }

    ngOnInit(): void {
        /* Bind the form */
        this.listOptionsForm = this.fb.group({
            CurrentPage: this.fb.control(this.pageService1.CurrentPage),
            Step: this.fb.control(this.pageService1.Step),
            OrderBy: this.fb.control(this.pageService1.OrderBy || 'Default'),
        });
        /* Bind the change of Begin, Step, OrderBy */
        this.listOptionsForm.valueChanges.subscribe(value => {
            this.pageService1.updateOptions(value);
        });

        /* Todo when Begin, Step, OrderBy change reset the form */
        this.pageService1.optionsChange$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(
            (result) => {
                //this.filtersCount = Object.keys(filterValues).length;
                this.listOptionsForm.setValue(
                    { CurrentPage: this.pageService1.CurrentPage, Step: this.pageService1.Step, OrderBy: this.pageService1.OrderBy }, { emitEvent: false });
            }
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    setLayout(value: Layout): void {
        this.layout = value;
    }

    resetFilters(): void {
        //todo add a function in page-category.service for the reset
        //this.pageService1.updateOptions({});
    }
}
