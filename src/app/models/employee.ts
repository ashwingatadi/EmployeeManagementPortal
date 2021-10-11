import { Department } from "./department";
import { Designation } from "./designation";
import { EmploymentType } from "./employmentType";

export class Employee{
    public id: number = 0;
    public firstName: string = "";
    public lastName: string = "";
    public dateOfBirth: string = "";

    public department: Department = new Department();
    public employmentType: EmploymentType = new EmploymentType();
    public designation: Designation = new Designation();
}