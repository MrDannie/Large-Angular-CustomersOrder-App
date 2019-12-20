import { NgModule } from '@angular/core';
import { NavBarComponent } from './navbar/navbar.component';
import { DataService } from './services/data.service';
import { FilterService } from './services/filter.service';
import { RouterModule } from '@angular/router';
import { LoggerService } from './services/logger.service';


@NgModule({
 imports: [ RouterModule ],
 declarations: [ NavBarComponent ],
 exports: [ NavBarComponent ],
 providers: [ DataService, FilterService, LoggerService]
})
export class CoreModule { }