import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';
import { Designation } from '../models/designation';
import { EmploymentType } from '../models/employmentType';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private http: HttpClient) { }

  public GetDepartments(): Observable<Array<Department>>
  {
    let endpoint: string = 'https://localhost:44358/api/Organization/GetDepartments';
    let rheaders = new HttpHeaders();
    rheaders = rheaders.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<Array<Department>>(endpoint, { headers: rheaders });
  }

  public GetDesignations(): Observable<Array<Designation>>
  {
    let endpoint: string = 'https://localhost:44358/api/Organization/GetDesignations';
    let rheaders = new HttpHeaders();
    rheaders = rheaders.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<Array<Designation>>(endpoint, { headers: rheaders });
  }

  public GetEmploymentTypes(): Observable<Array<EmploymentType>>
  {
    let endpoint: string = 'https://localhost:44358/api/Organization/GetEmploymentTypes';
    let rheaders = new HttpHeaders();
    rheaders = rheaders.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<Array<EmploymentType>>(endpoint, { headers: rheaders });
  }
}
