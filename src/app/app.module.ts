import { /*LOCALE_ID, */NgModule } from '@angular/core';
// import { registerLocaleData } from '@angular/common';
// import localeIt from '@angular/common/locales/it';
//
// registerLocaleData(localeIt, 'it');

// modules (angular)
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';

// modules
import { AppRoutingModule } from './app-routing.module';
import { BlocksModule } from './modules/blocks/blocks.module';
import { FooterModule } from './modules/footer/footer.module';
import { HeaderModule } from './modules/header/header.module';
import { MobileModule } from './modules/mobile/mobile.module';
import { SharedModule } from './shared/shared.module';
import { WidgetsModule } from './modules/widgets/widgets.module';

// components
import { AppComponent } from './app.component';
import { RootComponent } from './components/root/root.component';

// pages
import { PageHomeOneComponent } from './pages/page-home-one/page-home-one.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageHomeTwoComponent } from './pages/page-home-two/page-home-two.component';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RootResolverService } from './components/root/root-resolver.service';
import { PageHomeOneResolverService } from './pages/page-home-one/page-home-one-resolver.service';
import { NgxLoadingModule } from 'ngx-loading';

export function createTranslateLoader(http: HttpClient) {
    //此出的路径需要和第二步新建的文件夹保持一致
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
@NgModule({
    declarations: [
        // components
        AppComponent,
        RootComponent,
        // pages
        PageHomeOneComponent,
        PageNotFoundComponent,
        PageHomeTwoComponent
    ],
    imports: [
        NgxLoadingModule.forRoot({}),
        TranslateModule.forRoot({
            defaultLanguage: 'fr',
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
          }),
        // modules (angular)
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        // modules (third-party)
        CarouselModule,
        ToastrModule.forRoot(),
        // modules
        AppRoutingModule,
        BlocksModule,
        FooterModule,
        HeaderModule,
        MobileModule,
        SharedModule,
        WidgetsModule
    ],
    providers: [
        // { provide: LOCALE_ID, useValue: 'it' }
        RootResolverService,
        PageHomeOneResolverService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
