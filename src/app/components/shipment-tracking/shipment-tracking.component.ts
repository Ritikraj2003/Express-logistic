import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shipment-tracking',
  templateUrl: './shipment-tracking.component.html',
  styleUrls: ['./shipment-tracking.component.css']
})
export class ShipmentTrackingComponent {
  trackingForm: FormGroup;
  trackingResult: any = null;

  constructor(private fb: FormBuilder) {
    this.trackingForm = this.fb.group({
      trackingNumber: [''],
      trackingType: ['awb'] // awb, forwarding, reference
    });
  }

  onTrack(): void {
    const trackingNumber = this.trackingForm.get('trackingNumber')?.value;
    const trackingType = this.trackingForm.get('trackingType')?.value;

    if (trackingNumber) {
      console.log('Tracking:', trackingType, trackingNumber);
      // TODO: Implement actual tracking API call
      // For now, show mock result
      this.trackingResult = {
        status: 'In Transit',
        location: 'Mumbai',
        estimatedDelivery: '2025-01-15',
        history: [
          { date: '2025-01-10', status: 'Picked up', location: 'Mumbai' },
          { date: '2025-01-11', status: 'In transit', location: 'Delhi' },
          { date: '2025-01-12', status: 'Out for delivery', location: 'Delhi' }
        ]
      };
    }
  }
}

