import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface EmailParams {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
}) 
// Email service for sending emails to the admin
// This service uses EmailJS to send emails
// The service ID and template ID are configured in the EmailJS dashboard
// The public key is configured in the EmailJS dashboard
// The service ID and template ID are configured in the EmailJS dashboard
export class EmailService {
  private readonly SERVICE_ID = 'service_8eje066';
  private readonly TEMPLATE_ID = 'template_kgu09ft';
  private readonly PUBLIC_KEY = 'GMxQVWfzpRvEfGaQq';

  sendEmail(params: EmailParams): Promise<any> {
    return emailjs.send(
      this.SERVICE_ID,
      this.TEMPLATE_ID,
      {
        name: params.name,
        number: params.phone,
        subject: params.subject,
        message: params.message,
        email: params.email,
      },
      {
        publicKey: this.PUBLIC_KEY
      }
    );
  }
}


