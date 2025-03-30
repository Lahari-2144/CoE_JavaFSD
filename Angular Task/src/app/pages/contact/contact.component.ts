// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-contact',
//   templateUrl: './contact.component.html',
//   styleUrl: './contact.component.css'
// })
// export class ContactComponent {

// }


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  newEnquiry = { name: '', email: '', message: '' };
  submitted = false;

  constructor(private http: HttpClient) {}

  // submitEnquiry() {
  //   this.http.post('http://localhost:4500/enquiries', this.newEnquiry).subscribe(response => {
  //     console.log('Enquiry sent:', response);
  //     this.submitted = true;
  //     this.newEnquiry = { name: '', email: '', message: '' }; // Reset form
  //   });
  // }

  submitEnquiry() {
    if (this.newEnquiry.name && this.newEnquiry.email && this.newEnquiry.message) {
      this.http.post('http://localhost:4500/enquiries', this.newEnquiry).subscribe(
        response => {
          console.log('Enquiry submitted:', response);
          this.submitted = true;
          alert("Message Sent Successfully! ✅");
          this.newEnquiry = { name: '', email: '', message: '' }; // Reset form
        },
        error => {
          console.error('Error submitting enquiry:', error);
          alert("Failed to Send Message ❌. Please try again.");
        }
      );
    } else {
      alert("Please fill all fields before submitting. 🚨");
    }
  }
}
