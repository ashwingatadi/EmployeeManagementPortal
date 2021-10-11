import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  public employee!: Employee;
  private GetEmployeeSubscription!: Subscription;

  constructor(private route:ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    let id: number = +this.route.snapshot.params['id'];
    if(id == 0){
      this.employee = new Employee();
    }
    else{
      this.GetEmployeeSubscription = this.employeeService.GetEmployee(id).subscribe(x => {
        this.employee = x;
      });
    }
  }

  ngOnDestroy(){
    if(this.GetEmployeeSubscription != null){
      this.GetEmployeeSubscription.unsubscribe();
    }
  }

}
