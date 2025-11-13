import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-shipment-form',
  templateUrl: './shipment-form.component.html',
  styleUrls: ['./shipment-form.component.css']
})
export class ShipmentFormComponent implements OnInit {
  shipmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) {
    console.log('Hello World - ShipmentFormComponent initialized!');
    this.shipmentForm = this.fb.group({
      // Sender Information
      senderName: ['', Validators.required],
      senderPhone: ['', Validators.required],
      senderAddress: ['', Validators.required],
      senderCity: ['', Validators.required],
      senderPostalCode: ['', Validators.required],
      senderCountry: ['', Validators.required],
      
      // Receiver Information
      receiverName: ['', Validators.required],
      receiverPhone: ['', Validators.required],
      receiverAddress: ['', Validators.required],
      receiverCity: ['', Validators.required],
      receiverPostalCode: ['', Validators.required],
      
      // Package Details
      weight: ['', Validators.required],
      dimensions: ['', Validators.required],
      serviceType: ['', Validators.required],
      pickupDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('Hello World - Component ngOnInit called!');
  }

  onSubmit(): void {
    if (this.shipmentForm.valid) {
      console.log('Form submitted:', this.shipmentForm.value);
      // Show success notification
      this.notificationService.success(
        'Shipment form submitted successfully!',
        'Success',
        5000
      );
      // Reset form after successful submission
      this.shipmentForm.reset();
      // Reset validation state
      Object.keys(this.shipmentForm.controls).forEach(key => {
        this.shipmentForm.get(key)?.markAsUntouched();
      });
    } else {
      console.log('Form is invalid');
      // Show error notification
      this.notificationService.error(
        'Please fill in all required fields.',
        'Validation Error',
        5000
      );
      Object.keys(this.shipmentForm.controls).forEach(key => {
        this.shipmentForm.get(key)?.markAsTouched();
      });
    }
  }

  onReset(): void {
    this.shipmentForm.reset();
  }
}

