import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit, OnDestroy {

  constructor(private employeeService: EmployeeService) { }

  public employeesList: Array<Employee> = new Array<Employee>();

  private GetEmployeesSubscription!: Subscription;

  ngOnInit(): void {
    this.GetEmployeesSubscription = this.employeeService.GetEmployees().subscribe(employees => {
      this.employeesList = employees;
    });
  }

  ngOnDestroy(){
    if(this.GetEmployeesSubscription != null){
      this.GetEmployeesSubscription.unsubscribe();
    }
  }
}
