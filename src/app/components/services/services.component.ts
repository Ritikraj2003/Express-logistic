import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, AfterViewInit {
  services = [
    {
      id: 'air-freight',
      icon: '✈️',
      title: 'Air Freight',
      description: 'Avail of our airport-to-airport service which is ideally suited to customers with a high volume of business requiring time-critical delivery. We provide air freight services based on your needs and schedules and even select the most appropriate carrier for your shipment giving you a head start over other air freight forwarding companies.',
      features: ['Time-critical delivery', 'High volume handling', 'Best carrier selection', 'Global network']
    },
    {
      id: 'road-freight',
      icon: '🚚',
      title: 'Road Freight',
      description: 'Our Road carriers provide efficient and reliable transportation solutions for your domestic and regional shipping needs. We offer flexible scheduling and route optimization to ensure timely delivery of your goods across land borders.',
      features: ['Flexible scheduling', 'Route optimization', 'Regional coverage', 'Cost-effective']
    },
    {
      id: 'ocean-freight',
      icon: '🚢',
      title: 'Ocean Freight',
      description: 'Our Sea carriers are available to meet the challenges and deadlines of your overseas shipping itinerary, whether it be automobiles or motorcycles shipping for individuals or shows. We can ship FCL (full container load) or LCL (less than container load) shipment anywhere in the world - door to door.',
      features: ['FCL & LCL options', 'Door to door service', 'Worldwide coverage', 'Flexible scheduling']
    }
  ];

  selectedServiceId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get service parameter from query string
    this.route.queryParams.subscribe(params => {
      if (params['service']) {
        this.selectedServiceId = params['service'];
      }
    });
  }

  ngAfterViewInit(): void {
    // Scroll to specific service if selected
    if (this.selectedServiceId) {
      setTimeout(() => {
        this.scrollToService(this.selectedServiceId!);
      }, 300);
    } else {
      // If no specific service, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  scrollToService(serviceId: string): void {
    const element = document.getElementById(serviceId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Add highlight effect
      element.classList.add('highlight');
      setTimeout(() => {
        element.classList.remove('highlight');
      }, 2000);
    }
  }
}

