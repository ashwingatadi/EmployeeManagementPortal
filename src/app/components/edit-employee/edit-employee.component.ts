import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Department } from 'src/app/models/department';
import { Designation } from 'src/app/models/designation';
import { Employee } from 'src/app/models/employee';
import { EmploymentType } from 'src/app/models/employmentType';
import { EmployeeService } from 'src/app/services/employee.service';
import { OrganisationService } from 'src/app/services/organisation.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit, OnDestroy {

  public employee!: Employee;
  public departments!: Array<Department>;
  public designations!: Array<Designation>;
  public employmentTypes!: Array<EmploymentType>;

  public title: string = "";

  private GetEmployeeSubscription!: Subscription;
  private GetEmployeeTypesSubscription!: Subscription;
  private GetDesignationsSubscription!: Subscription;
  private GetDepartmentsSubscription!: Subscription;
  private AddEmployeeSubscription!: Subscription;


  public employeeForm!: FormGroup;

  public firstNameFormControl = new FormControl(null, Validators.required);
  public lastNameFormControl = new FormControl(null, Validators.required);
  public dateOfBirthFormControl = new FormControl(null, Validators.required);
  public departmentFormControl = new FormControl(null, Validators.required);
  public designationFormControl = new FormControl(null, Validators.required);
  public employmentTypeFormControl = new FormControl(null, Validators.required);

  constructor(private route:ActivatedRoute, private employeeService: EmployeeService, private organizationService: OrganisationService) { }

  private  get employeeId() : number {
    return +this.route.snapshot.params['id'];
  }
  

  ngOnInit(): void {
    let id: number = this.employeeId;
    if(id == 0){
      this.title = "Add Employee";
      this.employee = new Employee();
    }
    else{
      this.title = "Edit Employee";
      this.GetEmployeeSubscription = this.employeeService.GetEmployee(id).subscribe(x => {
        this.employee = x;
        this.employee.dateOfBirth = this.employee.dateOfBirth.split('T')[0]
      });
    }

    this.GetEmployeeTypesSubscription = this.organizationService.GetEmploymentTypes().subscribe(employeeTypes => {
      this.employmentTypes = employeeTypes;
    });

    this.GetDepartmentsSubscription = this.organizationService.GetDepartments().subscribe(departments => {
      this.departments = departments;
    });

    this.GetDesignationsSubscription = this.organizationService.GetDesignations().subscribe(designations => {
      this.designations = designations;
    });

    this.employeeForm = new FormGroup({
      'firstName': this.firstNameFormControl,
      'lastName': this.lastNameFormControl,
      'dateOfBirth': this.dateOfBirthFormControl,
      'department': this.departmentFormControl,
      'designation': this.designationFormControl,
      'employmentType': this.employmentTypeFormControl
    });

    console.log(this.firstNameFormControl);
  }

  ngOnDestroy(){
    if(this.GetEmployeeSubscription != null){
      this.GetEmployeeSubscription.unsubscribe();
    }
    
    if(this.GetEmployeeTypesSubscription != null){
      this.GetEmployeeTypesSubscription.unsubscribe();
    }

    if(this.GetDesignationsSubscription != null){
      this.GetDesignationsSubscription.unsubscribe();
    }

    if(this.GetDepartmentsSubscription != null){
      this.GetDepartmentsSubscription.unsubscribe();
    }

    if(this.AddEmployeeSubscription != null){
      this.AddEmployeeSubscription.unsubscribe();
    }
  }

  AddEmployee(employee: Employee){
    this.AddEmployeeSubscription = this.employeeService.AddEmployee(employee).subscribe(x => {
      if(x && this.employeeId == 0){
        alert('Employee added successfully');
      }
      else if(x && this.employeeId != 0){
        alert('Employee modified successfully');
      }
      else{
        alert('Failed to update employee record');
      }
    })
  }
}
