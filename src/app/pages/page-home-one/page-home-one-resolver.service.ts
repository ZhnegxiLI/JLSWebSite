import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';
import { RootService } from 'src/app/shared/services/root.service';
import { ReferenceService } from 'src/app/shared/api/reference.service';
import { ProductService } from 'src/app/shared/api/product.service';


@Injectable({
    providedIn: 'root'
})
export class PageHomeOneResolverService implements Resolve<any> {
    constructor(
        private root: RootService,
        private router: Router,
        private productService: ProductService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return  this.productService.GetMainPageForWebSite({
                Lang: localStorage.getItem('lang')} ).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 404) {
                    this.router.navigate([this.root.notFound()]).then();
                }

                return EMPTY;
            })
        );
    }
}
