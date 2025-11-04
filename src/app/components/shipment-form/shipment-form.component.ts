import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipment-form',
  templateUrl: './shipment-form.component.html',
  styleUrls: ['./shipment-form.component.css']
})
export class ShipmentFormComponent implements OnInit {
  shipmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      // Reset form after successful submission
      this.shipmentForm.reset();
      // Reset validation state
      Object.keys(this.shipmentForm.controls).forEach(key => {
        this.shipmentForm.get(key)?.markAsUntouched();
      });
    } else {
      console.log('Form is invalid');
      Object.keys(this.shipmentForm.controls).forEach(key => {
        this.shipmentForm.get(key)?.markAsTouched();
      });
    }
  }

  onReset(): void {
    this.shipmentForm.reset();
  }
}

