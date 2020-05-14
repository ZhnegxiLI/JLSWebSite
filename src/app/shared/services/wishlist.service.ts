import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { Product, Product1 } from '../interfaces/product';
import { map, takeUntil, retry } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { ProductService } from '../api/product.service';

interface WishlistData {
    items: Product[];
}

@Injectable({
    providedIn: 'root'
})
export class WishlistService implements OnDestroy {
    private data: WishlistData = {
        items: []
    };

    private destroy$: Subject<void> = new Subject();
    private itemsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
    private onAddingSubject$: Subject<Product> = new Subject();

    readonly items$: Observable<Product[]> = this.itemsSubject$.pipe(takeUntil(this.destroy$));
    readonly count$: Observable<number> = this.itemsSubject$.pipe(map(items => items.length));
    readonly onAdding$: Observable<Product> = this.onAddingSubject$.asObservable();

    constructor(
        @Inject(PLATFORM_ID)
        private platformId: any,
        private productService: ProductService
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.load();
        }
    }

    addOrRemove(productId: number, IsFavorite: boolean): Observable<void> {
        return this.productService.AddIntoProductFavoriteList({
            UserId: localStorage.getItem('userId'),
            ProductId: productId,
            IsFavorite: IsFavorite
        });
    }

    remove(product: Product): Observable<void> {
        // timer only for demo
        return timer(1000).pipe(map(() => {
            const index = this.data.items.findIndex(item => item.id === product.id);

            if (index !== -1) {
                this.data.items.splice(index, 1);
                this.save();
            }
        }));
    }

    private save(): void {
        localStorage.setItem('wishlistItems', JSON.stringify(this.data.items));

        this.itemsSubject$.next(this.data.items);
    }

    private load(): void {
        const items = localStorage.getItem('wishlistItems');

        if (items) {
            this.data.items = JSON.parse(items);
            this.itemsSubject$.next(this.data.items);
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
