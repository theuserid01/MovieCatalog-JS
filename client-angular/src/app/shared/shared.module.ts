import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
    declarations: [
        NavbarComponent,
        NotFoundComponent,
        PaginationComponent,
        SpinnerComponent,
        FilterPipe

    ],
    exports: [
        NavbarComponent,
        PaginationComponent,
        SpinnerComponent,
        FilterPipe
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
})
export class SharedModule { }
