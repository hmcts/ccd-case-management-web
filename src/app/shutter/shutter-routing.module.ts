import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShutterComponent } from './shutter.component';

const routes: Routes = [
  {
    path: '',
    component: ShutterComponent
  }
];

export const routing = RouterModule.forChild(routes);

@NgModule({
  imports: [routing],
  exports: [RouterModule]
})
export class ShutterRoutingModule { }
