import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthorizedComponent } from './components/authorized/authorized.component';
import { LogoutComponent } from './components/logout/logout.component';
import { StorageComponent } from './components/storage/storage.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authorized', component: AuthorizedComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'storage', component: StorageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
