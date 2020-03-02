import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test-comp/test-comp.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: 'test',
        component: TestComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
