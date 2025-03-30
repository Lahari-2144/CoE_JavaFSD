/*import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent {
  enquiryForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.enquiryForm.valid) {
      this.submitted = true;
      alert('Enquiry submitted successfully!');
      this.enquiryForm.reset();
    }
  }
}*/

import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../../services/enquiry.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  enquiries: any[] = [];
  newEnquiry = { name: '', email: '', message: '' };
  submitted = false;

  constructor(private enquiryService: EnquiryService) {}

  ngOnInit(): void {
    this.loadEnquiries();
  }

  // Fetch enquiries
  loadEnquiries() {
    this.enquiryService.getEnquiries().subscribe(
      (data) => {
        this.enquiries = data;
      },
      (error) => {
        console.error('Error fetching enquiries:', error);
      }
    );
  }

  // Submit an enquiry
  submitEnquiry() {
    if (!this.newEnquiry.name || !this.newEnquiry.email || !this.newEnquiry.message) {
      alert('All fields are required!');
      return;
    }

    this.enquiryService.addEnquiry(this.newEnquiry).subscribe((response) => {
        alert('Enquiry submitted successfully!');
        this.newEnquiry = { name: '', email: '', message: '' }; 
        this.loadEnquiries(); 
        this.submitted = true; 
          setTimeout(() => (this.submitted = false), 5000); 
          this.newEnquiry = { name: '', email: '', message: '' }; 
      },
    );
  }
}

