import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.loading = true;
      const formValue = this.contactForm.value;
      
      this.emailService.sendEmail({
        name: formValue.name,
        email: formValue.email,
        phone: formValue.phone,
        subject: formValue.subject,
        message: formValue.message
      })
      .then(() => {
        this.submitted = true;
        this.contactForm.reset();
        this.loading = false;
        setTimeout(() => {
          this.submitted = false;
        }, 3000);
      })
      .catch((error) => {
        this.loading = false;
        alert('Failed to send email. Please try again.');
      });
    }
  }
}

