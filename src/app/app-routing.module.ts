import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';

const routes: Routes = [
  {
    path: '',
    component: ListEmployeeComponent,
  },
  {
    path: 'employees',
    component: ListEmployeeComponent,
  },
  {
    path: 'employee/:id',
    component: ViewEmployeeComponent,
  },
  {
    path: 'edit-employee/:id',
    component: EditEmployeeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
