import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  private apiUrl = 'http://localhost:4500/enquiries'; // API Endpoint

  constructor(private http: HttpClient) {}

  // Get all enquiries
  getEnquiries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new enquiry
  addEnquiry(enquiry: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, enquiry);
  }
}
