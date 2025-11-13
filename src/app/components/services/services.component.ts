import { Component, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface ServiceData {
  title: string;
  icon: string;
  image: string;
  intro: string;
  servicesSection: string;
  capabilitiesTitle: string;
  capabilities: string[];
  closing: string[];
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, AfterViewInit {
  selectedServiceId: string | null = null;
  selectedService: ServiceData | null = null;

  servicesData: { [key: string]: ServiceData } = {
    'air-freight': {
      title: 'Air Freight Services',
      icon: '✈️',
      image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&h=400&fit=crop',
      intro: 'Our Air Freight Solutions are designed for businesses that require fast, reliable, and time-critical delivery. With a strong global network and strategic partnerships with major airlines, we ensure your shipments move quickly, safely, and efficiently across international and domestic routes.',
      servicesSection: 'We offer airport-to-airport, door-to-door, and customized air cargo services tailored to your specific timelines and cargo requirements. Whether it\'s urgent manufacturing components, retail products, perishables, pharmaceuticals, or high-value cargo, our team ensures seamless coordination and end-to-end visibility throughout the journey.',
      capabilitiesTitle: 'Why Choose Our Air Freight Services?',
      capabilities: [
        'Flexible Scheduling based on your delivery commitments',
        'Tie-ups with Leading Air Carriers ensuring priority uplift',
        'Real-time Cargo Tracking & Status Updates',
        'Expert Handling of Sensitive, Perishable & Hazardous Goods',
        'Customs Clearance & Documentation Support',
        'Consolidation & Cost-Effective Freight Options'
      ],
      closing: [
        'By carefully selecting the most efficient carrier and routing for each shipment, we ensure speed, reliability, and optimized cost — setting your supply chain ahead of the competition.',
        'Our air freight team works round the clock to ensure your cargo reaches its destination on time, every time.'
      ]
    },
    'sea-freight': {
      title: 'Sea Freight Services',
      icon: '🚢',
      image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
      intro: 'Our Sea Freight Solutions are designed to handle global shipments with efficiency, cost-effectiveness, and reliability. Whether you\'re shipping commercial cargo, industrial equipment, vehicles, or consumer goods, we manage the entire logistics process with precision and care.',
      servicesSection: 'We offer both FCL (Full Container Load) and LCL (Less than Container Load) services, tailored to your shipment size and delivery deadlines. Through our strong partnerships with leading ocean carriers and agents worldwide, we ensure the best routing, competitive rates, and dependable transit schedules.',
      capabilitiesTitle: 'Our Sea Freight Capabilities:',
      capabilities: [
        'FCL & LCL Shipping Options for flexible cargo volumes',
        'Door-to-Door, Port-to-Port & Multimodal Transport Solutions',
        'Specialized Handling for Automobiles, Machinery & Heavy Equipment',
        'Dedicated Vehicle & Motorcycle Shipping Services (individual or bulk)',
        'Customs Brokerage & Documentation Management',
        'Cargo Consolidation & Deconsolidation Services',
        'Worldwide Agent Network for Smooth Coordination'
      ],
      closing: [
        'Whether you\'re shipping for business, exhibitions, trade shows, or personal relocation, we ensure your cargo reaches its destination safely and within schedule.',
        'Our team monitors each shipment closely and provides end-to-end support — ensuring a secure, transparent, and hassle-free ocean logistics experience.'
      ]
    },
    'door-to-door': {
      title: 'Door-to-Door Freight Services',
      icon: '🚚',
      image: 'https://images.unsplash.com/photo-1601581875036-c1922aaea8a2?w=800&h=400&fit=crop',
      intro: 'Our Door-to-Door Freight Solution is a complete end-to-end logistics service designed to make shipping simple, transparent, and stress-free for our customers. We handle every step of the shipping process—right from pick-up at the origin to final delivery at your destination.',
      servicesSection: 'This service covers transportation, documentation, customs clearance, duties, handling, warehousing, and final distribution, ensuring you don\'t have to coordinate with multiple vendors or deal with operational complexities.',
      capabilitiesTitle: 'What\'s Included in Our Door-to-Door Service?',
      capabilities: [
        'Pickup from supplier, factory, or warehouse',
        'Export documentation and clearance',
        'Air or Sea freight transportation',
        'Import customs clearance and duty management',
        'Local transportation and last-mile delivery',
        'Shipment tracking and ongoing status updates',
        'Hassle-free logistics with single-point coordination',
        'Clear cost structure with fewer hidden charges',
        'Faster turnaround with no delays caused by fragmented handling',
        'End-to-end visibility across the shipment journey',
        'Reduced operational burden for your team'
      ],
      closing: [
        'Unlike standard freight services (where charges often cover only port-to-port movement), our Door-to-Door service ensures that every cost and procedure is managed under one transparent and predictable solution — saving your business time, effort, and unexpected expenses.',
        'Our dedicated logistics specialists ensure your shipment arrives safely, smoothly, and on schedule — no matter the destination.'
      ]
    }
  };

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private modalService: NgbModal
  ) {}

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

  navigateToContact(): void {
   // this.router.navigate(['/contact']);
  }

  openServiceModal(serviceKey: string, content: TemplateRef<any>): void {
    this.selectedService = this.servicesData[serviceKey];
    if (this.selectedService) {
      this.modalService.open(content, { 
        centered: true,
        size: 'lg',
        backdrop: 'static'
      });
    }
  }
}

