import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public GetEmployees(): Observable<Array<Employee>>
  {
    let endpoint: string = 'https://localhost:44358/api/employeemanagement/GetEmployees';
    let rheaders = new HttpHeaders();
    rheaders = rheaders.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<Array<Employee>>(endpoint, { headers: rheaders });
  }

  public GetEmployee(id: number): Observable<Employee>
  {
    let endpoint: string = `https://localhost:44358/api/employeemanagement/GetEmployee/${id}`;
    let rheaders = new HttpHeaders();
    rheaders = rheaders.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<Employee>(endpoint, { headers: rheaders });
  }

  public AddEmployee(employee: Employee): Observable<boolean>
  {
    let endpoint: string = 'https://localhost:44358/api/employeemanagement/UpsertEmployee';
    let rheaders = new HttpHeaders();
    rheaders = rheaders.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<boolean>(endpoint, employee, { headers: rheaders });
  }
}
